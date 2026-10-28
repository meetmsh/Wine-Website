"use client";
import Link from "next/link";
import { useState } from "react";
import { money } from "@/lib/store";
import { Icon } from "./Icon";
import styles from "./GiftCard.module.css";

const PRESETS = [25, 50, 75, 100, 150, 250];
const MIN = 10, MAX = 500;

export function GiftCard() {
  const [amount, setAmount] = useState(50);
  const [custom, setCustom] = useState("");
  const [to, setTo] = useState("");
  const [from, setFrom] = useState("");
  const [note, setNote] = useState("");
  const [status, setStatus] = useState<{ kind: "idle" | "sending" | "error" | "done"; message?: string }>({ kind: "idle" });
  const value = custom ? Number(custom) : amount;
  const valid = Number.isInteger(value) && value >= MIN && value <= MAX;

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!valid || status.kind === "sending") return;
    const d = new FormData(e.currentTarget);
    setStatus({ kind: "sending" });
    try {
      const response = await fetch("/api/gift-cards", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({
        amount: value, recipientName: d.get("recipientName"), recipientEmail: d.get("recipientEmail"), senderName: d.get("senderName"), senderEmail: d.get("senderEmail"),
        message: note, sendOn: d.get("sendOn") || null, ageConfirmed: d.get("age") === "on",
      }) });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.message || "We couldn’t complete your gift card. Please try again.");
      if (result.checkoutUrl) { window.location.href = result.checkoutUrl; return; }
      setStatus({ kind: "done" });
    } catch (error) { setStatus({ kind: "error", message: error instanceof Error ? error.message : "We couldn’t complete your gift card." }); }
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
          {note && <p className={styles.cardNote}>“{note}”{from && <span>— {from}</span>}</p>}
        </div>
      </div>

      <form className={styles.form} onSubmit={submit}>
        <fieldset className={styles.step}>
          <legend><b>Choose an amount</b></legend>
          <div className={styles.amounts} role="radiogroup" aria-label="Gift card amount">
            {PRESETS.map(p => <label key={p} className={styles.amount} data-on={!custom && amount === p}><input type="radio" name="preset" value={p} checked={!custom && amount === p} onChange={() => { setAmount(p); setCustom(""); }} />{money(p).replace(".00", "")}</label>)}
          </div>
          <label className={styles.custom} data-on={Boolean(custom)}>
            <span>Or enter an amount</span>
            <span className={styles.customInput}><i>$</i><input inputMode="numeric" placeholder={`${MIN}–${MAX}`} value={custom} onChange={e => setCustom(e.target.value.replace(/\D/g, "").slice(0, 3))} aria-label={`Custom amount, ${MIN} to ${MAX} dollars`} /></span>
          </label>
          {custom && !valid && <p className={styles.warn}>Choose an amount between ${MIN} and ${MAX}.</p>}
        </fieldset>

        <fieldset className={styles.step}>
          <legend><b>Who’s it for?</b></legend>
          <div className={styles.grid}>
            <label className={styles.field}><span>Recipient’s name</span><input name="recipientName" required maxLength={80} autoComplete="off" value={to} onChange={e => setTo(e.target.value)} /></label>
            <label className={styles.field}><span>Recipient’s email</span><input name="recipientEmail" type="email" required maxLength={254} autoComplete="off" /></label>
            <label className={`${styles.field} ${styles.wide}`}><span>Message<em> optional</em></span><textarea rows={3} maxLength={240} value={note} onChange={e => setNote(e.target.value)} placeholder="Cheers to you…" /><small>{240 - note.length} characters left</small></label>
            <label className={styles.field}><span>Send on<em> optional</em></span><input name="sendOn" type="date" min={new Date().toISOString().slice(0, 10)} /></label>
          </div>
        </fieldset>

        <fieldset className={styles.step}>
          <legend><b>From you</b></legend>
          <div className={styles.grid}>
            <label className={styles.field}><span>Your name</span><input name="senderName" required maxLength={80} autoComplete="name" value={from} onChange={e => setFrom(e.target.value)} /></label>
            <label className={styles.field}><span>Your email</span><input name="senderEmail" type="email" required maxLength={254} autoComplete="email" /></label>
          </div>
        </fieldset>

        <div className={styles.payment}>
          <Icon name="glass" width="18" height="18" />
          <p><b>Secure card payment connects here.</b> Online payment isn’t switched on in this preview yet, so no card will be charged. Until it is, buy a gift card in store or by phone at <a href="tel:+19083822133">(908) 382-2133</a>.</p>
        </div>

        <label className={styles.age}><input type="checkbox" name="age" required /><span>I confirm I am <b>21 or older</b>.</span></label>
        {status.kind === "error" && <p className={styles.error} role="alert">{status.message}</p>}
        <button type="submit" className={styles.pay} disabled={!valid || status.kind === "sending"}>
          <span>{status.kind === "sending" ? "Processing…" : "Pay and send"}</span><span className={styles.payTotal}>{valid ? money(value) : "—"}</span>
        </button>
        <p className={styles.fine}>eGift cards are delivered by email and can be used online or in store. Questions about a balance? Call (908) 382-2133.</p>
      </form>
    </div>
  </section>;
}
