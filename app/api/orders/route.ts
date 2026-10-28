import { NextResponse } from "next/server";
import { FREE_DELIVERY, getStoreItem, wineDeal } from "@/lib/store";
import { configuredEndpoint } from "@/lib/services";
import { idempotent } from "@/lib/idempotency";

// Order intake: validates the order, re-prices it on the server, then forwards it to the store's POS / order system.
// Until ORDER_WEBHOOK_URL is configured, it refuses honestly instead of pretending an order was placed.
const TAX_RATE = 0.06625; // New Jersey sales tax

type Body = {
  contact?: { name?: unknown; email?: unknown; phone?: unknown };
  fulfillment?: unknown;
  address?: { line1?: unknown; line2?: unknown; city?: unknown; zip?: unknown; notes?: unknown };
  items?: unknown;
  ageConfirmed?: unknown;
};

const text = (v: unknown, max: number) => (typeof v === "string" && v.trim() && v.length <= max ? v.trim() : null);

export async function POST(request: Request) {
  let body: Body;
  try { body = await request.json(); } catch { return NextResponse.json({ message: "We couldn’t read your order. Please try again." }, { status: 400 }); }
  if (!body || typeof body !== "object" || Array.isArray(body)) return NextResponse.json({ message: "Please send a valid order request." }, { status: 400 });

  const name = text(body.contact?.name, 100), email = text(body.contact?.email, 254), phone = text(body.contact?.phone, 30);
  if (!name || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !phone) return NextResponse.json({ message: "Please add your name, email and phone number." }, { status: 400 });
  if (body.ageConfirmed !== true) return NextResponse.json({ message: "Please confirm you are 21 or older." }, { status: 400 });
  const fulfillment = body.fulfillment === "delivery" ? "delivery" : body.fulfillment === "pickup" ? "pickup" : null;
  if (!fulfillment) return NextResponse.json({ message: "Choose pickup or delivery." }, { status: 400 });
  const address = fulfillment === "delivery" ? { line1: text(body.address?.line1, 120), line2: text(body.address?.line2, 120), city: text(body.address?.city, 60), zip: text(body.address?.zip, 10), notes: text(body.address?.notes, 300) } : null;
  if (address && (!address.line1 || !address.city || !address.zip || !/^\d{5}$/.test(address.zip))) return NextResponse.json({ message: "Please add a full delivery address with a 5-digit ZIP code." }, { status: 400 });

  // Re-price from the catalog; never trust client prices.
  const items: Record<string, number> = {};
  if (!body.items || typeof body.items !== "object" || Array.isArray(body.items)) return NextResponse.json({ message: "Please review the items in your bag." }, { status: 400 });
  for (const [id, q] of Object.entries(body.items as Record<string, unknown>)) {
    if (!getStoreItem(id) || !Number.isSafeInteger(q) || (q as number) < 1 || (q as number) > 999) return NextResponse.json({ message: "An item in your bag has changed. Please review your bag before sending the request." }, { status: 400 });
    items[id] = q as number;
  }
  const lines = Object.entries(items).map(([id, quantity]) => { const item = getStoreItem(id)!; return { id, name: item.name, brand: item.brand, quantity, unitPrice: item.price }; });
  if (!lines.length) return NextResponse.json({ message: "Your bag is empty." }, { status: 400 });
  const subtotal = lines.reduce((s, l) => s + l.unitPrice * l.quantity, 0);
  const discount = wineDeal(items).discount;
  const tax = Math.round((subtotal - discount) * TAX_RATE * 100) / 100;
  const order = { source: "uncorked-storefront", contact: { name, email, phone }, fulfillment, address, lines, subtotal, discount, tax, total: Math.round((subtotal - discount + tax) * 100) / 100, freeDelivery: fulfillment === "delivery" && subtotal - discount > FREE_DELIVERY, ageConfirmed: true };

  const endpoint = configuredEndpoint(process.env.ORDER_WEBHOOK_URL);
  if (!endpoint) return NextResponse.json({ message: "Online ordering isn’t connected yet, so this order wasn’t placed. Call us at (908) 382-2133 and we’ll take it by phone." }, { status: 503 });
  const reply = await idempotent(request, order, async key => { try {
    const response = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json", "Idempotency-Key": key, ...(process.env.ORDER_WEBHOOK_TOKEN ? { Authorization: `Bearer ${process.env.ORDER_WEBHOOK_TOKEN}` } : {}) }, body: JSON.stringify(order), signal: AbortSignal.timeout(10000) });
    if (!response.ok) throw new Error("Order system unavailable");
    const result = await response.json().catch(() => ({}));
    const reference = typeof result?.reference === "string" && result.reference.trim() ? result.reference : null;
    if (result?.accepted !== true && !reference) throw new Error("Order request not acknowledged");
    return { status: 200, body: { placed: true, reference, total: order.total } };
  } catch { return { status: 502, body: { message: "We couldn’t confirm your request. Your bag is saved; call (908) 382-2133 before trying again." } }; } });
  return NextResponse.json(reply.body, { status: reply.status });
}
