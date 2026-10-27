import { NextResponse } from "next/server";
export async function POST(request: Request) {
  let data;
  try { data = await request.json(); } catch { return NextResponse.json({ message: "Please enter your name and a valid email address." }, { status: 400 }); }
  if (!data || typeof data.name !== "string" || !data.name.trim() || data.name.length > 100 || typeof data.email !== "string" || data.email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email) || data.consent !== true) return NextResponse.json({ message: "Please enter your full name and a valid email address." }, { status: 400 });
  const endpoint = process.env.NEWSLETTER_WEBHOOK_URL;
  if (!endpoint) return NextResponse.json({ message: "Our email list is not connected yet. Please try again later or visit us in store." }, { status: 503 });
  try {
    if (!endpoint.startsWith("https://")) throw new Error("Newsletter endpoint must use HTTPS");
    const response = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json", ...(process.env.NEWSLETTER_WEBHOOK_TOKEN ? { Authorization: `Bearer ${process.env.NEWSLETTER_WEBHOOK_TOKEN}` } : {}) }, body: JSON.stringify({ name: data.name.trim(), email: data.email.trim().toLowerCase(), consent: true, source: "uncorked-storefront" }), signal: AbortSignal.timeout(8000) });
    if (!response.ok) throw new Error("Provider unavailable");
    return NextResponse.json({ subscribed: true });
  } catch { return NextResponse.json({ message: "We couldn’t save your subscription. Please try again in a moment." }, { status: 502 }); }
}
