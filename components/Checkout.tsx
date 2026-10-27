"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { FREE_DELIVERY, loyaltyPoints, money, percent, storeItems, wineDeal } from "@/lib/store";
import { useCellar } from "./CellarProvider";
import { Icon } from "./Icon";
import styles from "./Checkout.module.css";

const TAX_RATE = 0.06625; // New Jersey sales tax, shown as an estimate

type Status = { kind: "idle" | "sending" | "error" | "placed"; message?: string; reference?: string | null };

function Field({ label, name, type = "text", autoComplete, required = true, half = false, inputMode, placeholder, maxLength = 120 }: { label: string; name: string; type?: string; autoComplete?: string; required?: boolean; half?: boolean; inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"]; placeholder?: string; maxLength?: number }) {
  return <label className={styles.field} data-half={half}>
    <span>{label}{!required && <em> optional</em>}</span>
    <input name={name} type={type} autoComplete={autoComplete} required={required} inputMode={inputMode} placeholder={placeholder} maxLength={maxLength} />
  </label>;
}

export function Checkout() {
  const { items, add, remove, removeAll, count } = useCellar();
  const [fulfillment, setFulfillment] = useState<"pickup" | "delivery">("pickup");
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const lines = storeItems.filter(p => items[p.id]);
  const subtotal = lines.reduce((s, p) => s + p.price * items[p.id], 0);
  const deal = wineDeal(items);
  const afterDiscount = subtotal - deal.discount;
  const tax = Math.round(afterDiscount * TAX_RATE * 100) / 100;
  const total = afterDiscount + tax;
  const freeDelivery = afterDiscount > FREE_DELIVERY;

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status.kind === "sending") return;
    const d = new FormData(e.currentTarget);
    const get = (k: string) => String(d.get(k) ?? "");
    setStatus({ kind: "sending" });
    try {
      const response = await fetch("/api/orders", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({
        contact: { name: get("name"), email: get("email"), phone: get("phone") },
        fulfillment,
        address: fulfillment === "delivery" ? { line1: get("line1"), line2: get("line2"), city: get("city"), zip: get("zip"), notes: get("notes") } : undefined,
        items, ageConfirmed: d.get("age") === "on",
      }) });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.message || "We couldn’t place your order. Please try again.");
      setStatus({ kind: "placed", reference: result.reference });
      for (const id of Object.keys(items)) removeAll(id);
    } catch (error) {
      setStatus({ kind: "error", message: error instanceof Error ? error.message : "We couldn’t place your order. Please try again." });
    }
  }

  if (status.kind === "placed") return <section className={`container ${styles.done}`}>
    <span className={styles.doneMark} aria-hidden="true"><svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="m5 12.5 4.5 4.5L19 7.5" /></svg></span>
    <h1>Thank you. <em>Your order is in.</em></h1>
    <p>{status.reference ? <>Order <b>{status.reference}</b>. </> : null}We’ll be in touch by email or phone to confirm {fulfillment === "pickup" ? "pickup" : "delivery"}. Please bring a valid ID; everyone collecting or receiving alcohol must be 21 or older.</p>
    <Link href="/shop" className="btn">Keep exploring <Icon name="arrow" width="17" /></Link>
  </section>;

  if (!count) return <section className={`container ${styles.done}`}>
    <h1>Your bag <em>is empty.</em></h1>
    <p>Find a bottle you love, then come back here to check out.</p>
    <Link href="/shop?type=Wine" className="btn">Shop wine <Icon name="arrow" width="17" /></Link>
  </section>;

  return <section className={`container ${styles.page}`}>
    <nav className={styles.crumbs} aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><span>Checkout</span></nav>
    <h1 className={styles.title}>Checkout</h1>
    <div className={styles.layout}>
      <form className={styles.form} onSubmit={submit} noValidate={false}>
        <fieldset className={styles.step}>
          <legend><b>Contact</b><span>We’ll send your order details here.</span></legend>
          <div className={styles.grid}>
            <Field label="Full name" name="name" autoComplete="name" />
            <Field label="Email" name="email" type="email" autoComplete="email" half />
            <Field label="Phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" half maxLength={30} />
          </div>
        </fieldset>

        <fieldset className={styles.step}>
          <legend><b>Pickup or delivery</b><span>Same address, two easy ways to get it.</span></legend>
          <div className={styles.choices} role="radiogroup" aria-label="Fulfillment">
            <label className={styles.choice} data-on={fulfillment === "pickup"}>
              <input type="radio" name="fulfillment" value="pickup" checked={fulfillment === "pickup"} onChange={() => setFulfillment("pickup")} />
              <Icon name="bag" width="20" height="20" />
              <span><b>Pick up in store</b><small>1450 Washington St, Hoboken</small></span>
              <strong>Free</strong>
            </label>
            <label className={styles.choice} data-on={fulfillment === "delivery"}>
              <input type="radio" name="fulfillment" value="delivery" checked={fulfillment === "delivery"} onChange={() => setFulfillment("delivery")} />
              <Icon name="truck" width="20" height="20" />
              <span><b>Local delivery</b><small>Hoboken and nearby</small></span>
              <strong>{freeDelivery ? "Free" : "See note"}</strong>
            </label>
          </div>
          {fulfillment === "pickup" ? <p className={styles.hint}><Icon name="pin" width="16" height="16" />Open Mon–Thu 11am–10pm, Fri–Sat 10am–10pm, Sun 11am–8pm. We’ll contact you when your order is ready.</p>
            : <>
              <div className={styles.grid}>
                <Field label="Street address" name="line1" autoComplete="address-line1" />
                <Field label="Apartment, suite, floor" name="line2" autoComplete="address-line2" required={false} />
                <Field label="City" name="city" autoComplete="address-level2" half placeholder="Hoboken" maxLength={60} />
                <Field label="ZIP code" name="zip" autoComplete="postal-code" inputMode="numeric" half placeholder="07030" maxLength={10} />
                <label className={styles.field}><span>Delivery notes<em> optional</em></span><textarea name="notes" rows={2} maxLength={300} placeholder="Buzzer, doorman, best time…" /></label>
              </div>
              <p className={styles.hint} data-tone={freeDelivery ? "good" : undefined}><Icon name="truck" width="16" height="16" />{freeDelivery ? "Free local delivery on this order." : <>Free delivery on orders over {money(FREE_DELIVERY)}; add {money(FREE_DELIVERY + 0.01 - afterDiscount)} more. Below that, we’ll confirm any delivery fee with you before your order goes out.</>}</p>
            </>}
        </fieldset>

        <fieldset className={styles.step}>
          <legend><b>Payment</b><span>Card details are handled by our secure payment provider.</span></legend>
          <div className={styles.payment}>
            <Icon name="glass" width="18" height="18" />
            <p><b>Secure card payment connects here.</b> Online payment isn’t switched on in this preview yet, so placing an order won’t charge a card. Until it is, we’ll take your order by phone at <a href="tel:+19083822133">(908) 382-2133</a>.</p>
          </div>
        </fieldset>

        <label className={styles.age}>
          <input type="checkbox" name="age" required />
          <span>I confirm I am <b>21 or older</b>. A valid photo ID is required at {fulfillment === "pickup" ? "pickup" : "delivery"}.</span>
        </label>

        {status.kind === "error" && <p className={styles.error} role="alert">{status.message}</p>}
        <button type="submit" className={styles.place} disabled={status.kind === "sending"}>
          <span>{status.kind === "sending" ? "Placing your order…" : "Place order"}</span><span className={styles.placeTotal}>{money(total)}</span>
        </button>
        <p className={styles.fine}>Prices are samples in this preview. Tax is estimated at the New Jersey rate and confirmed on your receipt.</p>
      </form>

      <aside className={styles.summary} aria-label="Order summary">
        <div className={styles.summaryHead}><h2>Your order</h2><span>{count} {count === 1 ? "item" : "items"}</span></div>
        <ul className={styles.lines}>{lines.map(p => <li key={p.id}>
          <span className={styles.thumb}>{p.image && <Image src={p.image} alt="" width={96} height={128} quality={90} />}<b>{items[p.id]}</b></span>
          <span className={styles.lineText}><small>{p.brand}</small>{p.name}
            <span className={styles.qty}><button type="button" onClick={() => remove(p.id)} aria-label={`Remove one ${p.name}`}><Icon name="minus" width="12" /></button><span>{items[p.id]}</span><button type="button" onClick={() => add(p.id)} aria-label={`Add one ${p.name}`}><Icon name="plus" width="12" /></button></span>
          </span>
          <span className={styles.linePrice}>{p.was && <s>{money(p.was * items[p.id])}</s>}{money(p.price * items[p.id])}</span>
        </li>)}</ul>
        {deal.next && <p className={styles.nudge}>Add {deal.remaining} more regular-priced {deal.remaining === 1 ? "wine" : "wines"} to save {percent(deal.next.rate)}.</p>}
        <dl className={styles.totals}>
          <div><dt>Subtotal</dt><dd>{money(subtotal)}</dd></div>
          {deal.discount > 0 && <div className={styles.saving}><dt>{deal.tier && `${percent(deal.tier.rate)} off ${deal.tier.bottles}+ wines`}</dt><dd>−{money(deal.discount)}</dd></div>}
          <div><dt>{fulfillment === "pickup" ? "Pickup" : "Delivery"}</dt><dd>{fulfillment === "pickup" || freeDelivery ? "Free" : "Confirmed by the store"}</dd></div>
          <div><dt>Estimated tax</dt><dd>{money(tax)}</dd></div>
          <div className={styles.grand}><dt>Total</dt><dd>{money(total)}</dd></div>
        </dl>
        <p className={styles.points}><Icon name="glass" width="15" height="15" />You’ll earn <b>{loyaltyPoints(afterDiscount)} points</b> on this order.</p>
      </aside>
    </div>
  </section>;
}
