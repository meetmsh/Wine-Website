"use client";
import { useState } from "react";
import { Icon } from "./Icon";
import styles from "./Newsletter.module.css";
export function Newsletter() {
  const [status, setStatus] = useState<"idle" | "pending" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  return <form className={styles.form} aria-label="Join the Uncorked email list" aria-busy={status === "pending"} onSubmit={async e => {
    e.preventDefault(); if (status === "pending") return;
    const form = e.currentTarget; const data = new FormData(form); setStatus("pending"); setMessage("");
    try { const response = await fetch("/api/newsletter", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: data.get("name"), email: data.get("email"), consent: true }) }); const result = await response.json(); if (!response.ok) throw new Error(result.message || "We couldn’t save your subscription. Please try again."); setStatus("success"); setMessage("You’re on the list. Keep an eye on your inbox."); form.reset(); } catch (error) { setStatus("error"); setMessage(error instanceof Error ? error.message : "We couldn’t connect. Please try again."); }
  }}>
    <div className={styles.fields}><div className={styles.field}><label htmlFor="newsletter-name">Full name</label><input id="newsletter-name" name="name" placeholder="Your full name" required maxLength={100} autoComplete="name" /></div><div className={styles.field}><label htmlFor="newsletter-email">Email address</label><input id="newsletter-email" name="email" type="email" placeholder="you@example.com" required maxLength={254} autoComplete="email" /></div><button type="submit" className={`btn ${styles.submit}`} disabled={status === "pending" || status === "success"}>{status === "pending" ? "Joining…" : status === "success" ? "You’re on the list" : "Subscribe"}<span className={styles.arrow} aria-hidden="true"><Icon name="arrow" width="18" /></span></button></div>
    <p className={styles.privacy}>By signing up, you agree to receive emails from Uncorked. Unsubscribe anytime. <a href="https://www.uncorkedhoboken.com/privacy">Privacy policy</a></p>
    <p className={styles.connection}>Email signup connection coming soon.</p>
    {message && <p className={styles.message} role={status === "error" ? "alert" : "status"}>{message}</p>}
  </form>;
}
