// Exports the editable HTML composition as a static JPEG. No browser or font
// service is needed in production; regenerate only when the artwork changes.
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
const candidates = [process.env.CHROME_PATH, "C:/Program Files/Google/Chrome/Application/chrome.exe", "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe", "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", "/usr/bin/google-chrome", "/usr/bin/chromium", "/usr/bin/chromium-browser"].filter(Boolean);
const chrome = candidates.find(candidate => fs.existsSync(candidate));
if (!chrome) throw new Error("Chrome is required to export the artwork. Set CHROME_PATH to its executable.");
const cssDirectory = path.join(root, ".next/static/css");
if (!fs.existsSync(cssDirectory)) throw new Error("Run npm run build first to prepare the site's existing fonts.");
const css = fs.readdirSync(cssDirectory).filter(file => file.endsWith(".css")).map(file => fs.readFileSync(path.join(cssDirectory, file), "utf8")).join("\n");
const faces = [...css.matchAll(/@font-face\{[^}]+\}/g)].map(match => match[0]).filter(face => /font-family:(?:"Bodoni Moda"|Bodoni Moda|Geist);/.test(face) && face.includes("u+00??"));
if (faces.length < 3) throw new Error("The built Bodoni Moda regular/italic and Geist Latin fonts were not found.");
const fonts = [...new Set(faces)].map(face => face.replace(/url\(([^)]+)\)/g, (_, url) => {
  const file = path.basename(url.replace(/["']/g, ""));
  return `url(data:font/woff2;base64,${fs.readFileSync(path.join(root, ".next/static/media", file)).toString("base64")})`;
})).join("\n");
const source = fs.readFileSync(path.join(root, "design/social-preview.html"), "utf8");
const html = source.replace("/* FONT_FACES */", fonts).replace("{{CAMPAIGN_IMAGE}}", `data:image/png;base64,${fs.readFileSync(path.join(root, "public/images/campaign-editorial.png")).toString("base64")}`);
const profile = fs.mkdtempSync(path.join(os.tmpdir(), "uncorked-social-"));
const browser = spawn(chrome, ["--headless=new", "--disable-gpu", "--no-first-run", "--no-default-browser-check", "--remote-debugging-port=0", `--user-data-dir=${profile}`, "about:blank"], { windowsHide: true, stdio: "ignore" });
let socket;
try {
  let port;
  for (let i = 0; i < 100; i++) {
    const file = path.join(profile, "DevToolsActivePort");
    if (fs.existsSync(file)) { port = Number(fs.readFileSync(file, "utf8").split(/\r?\n/)[0]); break; }
    await delay(100);
  }
  if (!port) throw new Error("Chrome did not become ready.");
  const tabs = await (await fetch(`http://127.0.0.1:${port}/json`)).json();
  socket = new WebSocket(tabs.find(tab => tab.type === "page").webSocketDebuggerUrl);
  await new Promise((resolve, reject) => { socket.addEventListener("open", resolve, { once: true }); socket.addEventListener("error", reject, { once: true }); });
  let sequence = 0;
  const pending = new Map();
  socket.addEventListener("message", ({ data }) => {
    const message = JSON.parse(data);
    const request = pending.get(message.id);
    if (!request) return;
    clearTimeout(request.timer); pending.delete(message.id);
    message.error ? request.reject(new Error(message.error.message)) : request.resolve(message.result);
  });
  const send = (method, params = {}) => new Promise((resolve, reject) => {
    const id = ++sequence;
    const timer = setTimeout(() => { pending.delete(id); reject(new Error(`Chrome timed out: ${method}`)); }, 15000);
    pending.set(id, { resolve, reject, timer });
    socket.send(JSON.stringify({ id, method, params }));
  });
  const evaluate = async expression => {
    const result = await send("Runtime.evaluate", { expression, returnByValue: true, awaitPromise: true });
    if (result.exceptionDetails) throw new Error(JSON.stringify(result.exceptionDetails));
    return result.result.value;
  };
  await send("Page.enable");
  await send("Emulation.setDeviceMetricsOverride", { width: 1200, height: 630, deviceScaleFactor: 1, mobile: false });
  const { frameTree } = await send("Page.getFrameTree");
  await send("Page.setDocumentContent", { frameId: frameTree.frame.id, html });
  await evaluate("document.fonts.ready");
  await evaluate("Promise.all([...document.images].map(image => image.decode()))");
  const checks = await evaluate(`({ fonts: document.fonts.check('600 43px "Bodoni Moda"') && document.fonts.check('italic 500 78px "Bodoni Moda"') && document.fonts.check('400 21px Geist'), headlineFits: [...document.querySelectorAll('h1 span')].every(el => el.scrollWidth <= el.clientWidth), width: document.documentElement.scrollWidth, height: document.documentElement.scrollHeight })`);
  if (!checks.fonts || !checks.headlineFits || checks.width !== 1200 || checks.height !== 630) throw new Error(`Artwork validation failed: ${JSON.stringify(checks)}`);
  const capture = await send("Page.captureScreenshot", { format: "jpeg", quality: 95, captureBeyondViewport: false });
  const output = path.join(root, "public/images/social/uncorked-share-v1.jpg");
  fs.mkdirSync(path.dirname(output), { recursive: true });
  fs.writeFileSync(output, Buffer.from(capture.data, "base64"));
  console.log(`Exported ${path.relative(root, output)} — 1200 × 630, ${Math.round(fs.statSync(output).size / 1024)} KB`);
  await send("Browser.close").catch(() => {});
} finally {
  socket?.close(); browser.kill();
}
