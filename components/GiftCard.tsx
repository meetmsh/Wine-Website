"use client";
import Link from "next/link";
import { useRef, useState } from "react";
import { money } from "@/lib/store";
import { Icon } from "./Icon";
import styles from "./GiftCard.module.css";
import { useServices } from "./ServiceProvider";

const PRESETS = [25, 50, 75, 100, 150, 250];
const MIN = 10, MAX = 500;

export function GiftCard() {
  const services = useServices();
  const request = useRef<{ payload: string; key: string } | null>(null);
  const submitting = useRef(false);
  const [amount, setAmount] = useState(50);
  const [custom, setCustom] = useState("");
  const [to, setTo] = useState("");
  const [status, setStatus] = useState<{ kind: "idle" | "sending" | "error" | "done"; message?: string }>({ kind: "idle" });
  const value = custom ? (/^\d+$/.test(custom.trim()) ? Number(custom) : NaN) : amount;
  const valid = Number.isInteger(value) && value >= MIN && value <= MAX;

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!valid || services.loading || submitting.current) return;
    if (!services.giftCards) {
      setStatus({ kind: "error", message: "Online gift-card payment is not connected yet. No payment was taken. Call (908) 382-2133 to arrange your gift." });
      return;
    }
    submitting.current = true;
    const d = new FormData(e.currentTarget);
    setStatus({ kind: "sending" });
    try {
      const payload = JSON.stringify({
        amount: value, recipientName: d.get("recipientName"), recipientEmail: d.get("recipientEmail"), senderName: d.get("senderName"), senderEmail: d.get("senderEmail"),
        ageConfirmed: d.get("age") === "on",
      });
      if (request.current?.payload !== payload) request.current = { payload, key: crypto.randomUUID() };
      const response = await fetch("/api/gift-cards", { method: "POST", headers: { "Content-Type": "application/json", "Idempotency-Key": request.current.key }, body: payload });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.message || "We couldn’t complete your gift card. Please try again.");
      if (result.checkoutUrl) { window.location.href = result.checkoutUrl; return; }
      if (result.issued !== true) throw new Error("Your gift card has not been confirmed. Please contact the shop before trying again.");
      setStatus({ kind: "done" });
    } catch (error) { setStatus({ kind: "error", message: error instanceof Error ? error.message : "We couldn’t complete your gift card." }); }
    finally { submitting.current = false; }
  }

  if (status.kind === "done") return <section className={`container ${styles.done}`}>
    <span className={styles.doneMark} aria-hidden="true"><svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="m5 12.5 4.5 4.5L19 7.5" /></svg></span>
    <h1>Your gift is <em>on its way.</em></h1>
    <p>We’ll email the {money(value)} eGift card to {to || "your recipient"}, and a receipt to you.</p>
    <Link href="/shop?type=Wine" className="btn">Keep exploring <Icon name="arrow" width="17" /></Link>
  </section>;

  return <section className={`container ${styles.page}`}>
    <nav className={styles.crumbs} aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><span>eGift cards</span></nav>
    <div className={styles.layout}>
      <div className={styles.intro}>
        <h1>Give a <em>good bottle.</em></h1>
        <p>An Uncorked eGift card, delivered by email and spent on anything in the shop: wine, spirits, craft beer and more.</p>
        <div className={styles.preview} aria-hidden="true">
          <div className={styles.card}>
            <span className={styles.cardBrand}>Uncorked<small>Wines &amp; Spirits</small></span>
            <span className={styles.cardAmount}>{valid ? money(value).replace(".00", "") : "$—"}</span>
            <span className={styles.cardMeta}><span>{to ? `For ${to}` : "eGift card"}</span><span>Hoboken, NJ</span></span>
          </div>
        </div>
      </div>

      <form className={styles.form} onSubmit={submit}>
        <fieldset className={styles.step} disabled={status.kind === "sending"}>
          <legend><b>Choose an amount</b></legend>
          <div className={styles.amounts} role="radiogroup" aria-label="Gift card amount">
            {PRESETS.map(p => <label key={p} className={styles.amount} data-on={!custom && amount === p}><input type="radio" name="preset" value={p} checked={!custom && amount === p} onChange={() => { setAmount(p); setCustom(""); }} />{money(p).replace(".00", "")}</label>)}
          </div>
          <div className={styles.other}>
            <label className={styles.otherField} data-on={Boolean(custom)} data-invalid={Boolean(custom) && !valid}>
              <span className={styles.otherLabel}>Other amount</span>
              <span className={styles.otherInput}><i aria-hidden="true">$</i><input inputMode="numeric" placeholder="0" maxLength={12} value={custom} onChange={e => setCustom(e.target.value)} aria-invalid={Boolean(custom) && !valid} aria-label={`Other amount, ${MIN} to ${MAX} whole dollars`} aria-describedby="gift-range" /></span>
            </label>
            <span id="gift-range" className={styles.range} data-invalid={Boolean(custom) && !valid}>{custom && !valid ? `Enter whole dollars from $${MIN} to $${MAX}; no cents or symbols.` : `Whole-dollar amounts from $${MIN} to $${MAX}`}</span>
          </div>
        </fieldset>

        <fieldset className={styles.step} disabled={status.kind === "sending"}>
          <legend><b>Who’s it for?</b></legend>
          <div className={styles.grid}>
            <label className={styles.field}><span>Recipient’s name</span><input name="recipientName" required maxLength={80} autoComplete="off" value={to} onChange={e => setTo(e.target.value)} /></label>
            <label className={styles.field}><span>Recipient’s email</span><input name="recipientEmail" type="email" required maxLength={254} autoComplete="off" /></label>
          </div>
        </fieldset>

        <fieldset className={styles.step} disabled={status.kind === "sending"}>
          <legend><b>From you</b></legend>
          <div className={styles.grid}>
            <label className={styles.field}><span>Your name</span><input name="senderName" required maxLength={80} autoComplete="name" /></label>
            <label className={styles.field}><span>Your email</span><input name="senderEmail" type="email" required maxLength={254} autoComplete="email" /></label>
          </div>
        </fieldset>

        <label className={styles.age}><input type="checkbox" name="age" required disabled={status.kind === "sending"} /><span>I confirm I am <b>21 or older</b>.</span></label>
        {status.kind === "error" && <p className={styles.error} role="alert">{status.message}</p>}

        {/* Checkout block: a deep wine panel that holds the order, the total and the action */}
        <div className={styles.checkout}>
          <dl className={styles.summary}>
            <div><dt>eGift card{to ? ` for ${to}` : ""}</dt><dd>{valid ? money(value) : "—"}</dd></div>
            <div><dt>Delivery</dt><dd>Free, by email</dd></div>
            <div className={styles.summaryTotal}><dt>Total</dt><dd>{valid ? money(value) : "—"}</dd></div>
          </dl>
          <button type="submit" className={styles.pay} disabled={!valid || services.loading || status.kind === "sending"} aria-describedby="gift-payment-note">
            <span>{status.kind === "sending" ? "Processing…" : "Pay and send"}</span><Icon name="arrow" width="18" height="18" />
          </button>
          <p id="gift-payment-note" className={styles.secure}><Icon name="glass" width="14" height="14" /><span>{services.loading ? "Checking payment availability…" : services.giftCards ? "Payment is completed with the shop’s payment provider. We don’t collect card details on this page." : <>Online payment isn’t connected yet. No payment will be taken. <a href="tel:+19083822133">Call the shop to arrange your gift.</a></>}</span></p>
        </div>
        <p className={styles.fine}>Confirm redemption terms with the shop before purchase. <Link href="/terms">Shopping information</Link></p>
      </form>
    </div>
  </section>;
}
