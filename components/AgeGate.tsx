"use client";
import { useEffect, useRef, useState } from "react";
import { Icon } from "./Icon";
import { Wordmark } from "./Wordmark";
import styles from "./AgeGate.module.css";

// Self-attested 21+ check, asked on every visit; a "yes" lasts only for this browser session.
export function AgeGate({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = useState<"checking" | "ask" | "ok" | "entered">("checking");
  const [denied, setDenied] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const accepted = useRef(false);
  useEffect(() => {
    try {
      localStorage.removeItem("uncorked:age-verified");
      if (sessionStorage.getItem("uncorked:age-session") === "yes") { setStatus("ok"); return; }
    } catch {}
    setStatus("ask");
  }, []);
  useEffect(() => {
    if (status !== "ask") return;
    dialog.current?.showModal();
    dialog.current?.focus(); // focus the dialog itself so no button starts out selected
    document.documentElement.style.overflow = "hidden";
  }, [status]);
  function accept() {
    accepted.current = true;
    try { sessionStorage.setItem("uncorked:age-session", "yes"); } catch {}
    dialog.current?.close();
    document.documentElement.style.overflow = "";
    setStatus("entered"); // keep the dialog mounted so its exit transition can play
  }
  return <>{children}{(status === "ask" || status === "entered") && <dialog ref={dialog} className={styles.gate} aria-labelledby="age-title" aria-describedby="age-text" tabIndex={-1} onKeyDown={e => { if (e.key === "Escape") { e.preventDefault(); e.stopPropagation(); } }} onCancel={e => e.preventDefault()} onClose={() => { if (status === "ask" && !accepted.current) dialog.current?.showModal(); }}>
    <Wordmark size="large" />
    <h2 id="age-title">Are you <em>21 or older?</em></h2>
    <p id="age-text">You must be of legal drinking age to enter Uncorked Wines &amp; Spirits.</p>
    {denied ? <>
        <p className={styles.denied} role="alert">Thanks for being honest. This website is for adults 21 and older, so we can’t let you in just yet.</p>
        <button className={`${styles.under} ${styles.back}`} onClick={() => setDenied(false)}>Go back</button>
      </> : <div className={styles.actions}>
        <button className="btn" onClick={accept}>Yes, I’m 21+ <Icon name="arrow" width="18" /></button>
        <button className={styles.under} onClick={() => setDenied(true)}>No</button>
      </div>}
    <small>Enjoy thoughtfully. Please drink responsibly.</small>
  </dialog>}</>;
}
