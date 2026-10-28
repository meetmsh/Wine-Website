import { createHash } from "node:crypto";

type Reply = { status: number; body: Record<string, unknown> };
type Entry = { hash: string; expires: number; reply: Promise<Reply> };
const requests = new Map<string, Entry>();

// Coalesce retries in this process. The provider must also honor the forwarded
// Idempotency-Key across server instances and deployments.
export async function idempotent(request: Request, payload: unknown, send: (key: string) => Promise<Reply>): Promise<Reply> {
  const key = request.headers.get("Idempotency-Key");
  if (!key || !/^[a-z0-9-]{16,80}$/i.test(key)) return { status: 400, body: { message: "Refresh this page before sending your request." } };
  const hash = createHash("sha256").update(JSON.stringify(payload)).digest("hex");
  const now = Date.now();
  for (const [id, entry] of requests) if (entry.expires < now) requests.delete(id);
  const id = `${new URL(request.url).pathname}:${key}`;
  const previous = requests.get(id);
  if (previous) return previous.hash === hash ? previous.reply : { status: 409, body: { message: "This request changed. Refresh the page before trying again." } };
  if (requests.size >= 500) return { status: 503, body: { message: "The shop is receiving many requests. Please try again shortly." } };
  const reply = send(key).then(result => { if (result.status >= 500) requests.delete(id); return result; }).catch(() => {
    requests.delete(id);
    return { status: 502, body: { message: "The shop could not confirm this request. Please contact us before trying again." } };
  });
  requests.set(id, { hash, expires: now + 5 * 60_000, reply });
  return reply;
}
