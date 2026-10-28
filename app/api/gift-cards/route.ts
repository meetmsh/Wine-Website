import { NextResponse } from "next/server";
import { configuredEndpoint } from "@/lib/services";
import { idempotent } from "@/lib/idempotency";

// eGift card purchase intake. Validates the request, then forwards it to the store's payment / gift card system.
// Until GIFTCARD_WEBHOOK_URL is configured it declines honestly: no card is charged and no gift card is issued.
const GIFT_MIN = 10, GIFT_MAX = 500;
const text = (v: unknown, max: number) => (typeof v === "string" && v.trim() && v.length <= max ? v.trim() : null);
const email = (v: unknown) => { const e = text(v, 254); return e && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e) ? e.toLowerCase() : null; };

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try { body = await request.json(); } catch { return NextResponse.json({ message: "We couldn’t read your gift card. Please try again." }, { status: 400 }); }
  if (!body || typeof body !== "object" || Array.isArray(body)) return NextResponse.json({ message: "Please send a valid gift-card request." }, { status: 400 });
  const amount = Number(body.amount);
  if (!Number.isInteger(amount) || amount < GIFT_MIN || amount > GIFT_MAX) return NextResponse.json({ message: `Choose an amount between $${GIFT_MIN} and $${GIFT_MAX}.` }, { status: 400 });
  const recipientName = text(body.recipientName, 80), recipientEmail = email(body.recipientEmail), senderName = text(body.senderName, 80), senderEmail = email(body.senderEmail);
  if (!recipientName || !recipientEmail) return NextResponse.json({ message: "Add the recipient’s name and email." }, { status: 400 });
  if (!senderName || !senderEmail) return NextResponse.json({ message: "Add your name and email for the receipt." }, { status: 400 });
  if (body.ageConfirmed !== true) return NextResponse.json({ message: "Please confirm you are 21 or older." }, { status: 400 });
  const message = typeof body.message === "string" ? body.message.trim().slice(0, 240) : "";

  const endpoint = configuredEndpoint(process.env.GIFTCARD_WEBHOOK_URL);
  if (!endpoint) return NextResponse.json({ message: "Online gift card payments aren’t connected yet, so no card was charged. Call us at (908) 382-2133 or visit the shop to buy a gift card today." }, { status: 503 });
  const gift = { source: "uncorked-storefront", amount, recipient: { name: recipientName, email: recipientEmail }, sender: { name: senderName, email: senderEmail }, message };
  const reply = await idempotent(request, gift, async key => { try {
    const response = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json", "Idempotency-Key": key, ...(process.env.GIFTCARD_WEBHOOK_TOKEN ? { Authorization: `Bearer ${process.env.GIFTCARD_WEBHOOK_TOKEN}` } : {}) }, body: JSON.stringify(gift), signal: AbortSignal.timeout(10000) });
    if (!response.ok) throw new Error("Gift card system unavailable");
    const result = await response.json().catch(() => ({}));
    const checkoutUrl = configuredEndpoint(typeof result?.checkoutUrl === "string" ? result.checkoutUrl : undefined);
    if (!checkoutUrl && result?.issued !== true) throw new Error("Gift card not confirmed");
    return { status: 200, body: { issued: result?.issued === true, checkoutUrl } };
  } catch { return { status: 502, body: { message: "We couldn’t confirm your gift card. Call (908) 382-2133 before trying again; no success has been confirmed here." } }; } });
  return NextResponse.json(reply.body, { status: reply.status });
}
