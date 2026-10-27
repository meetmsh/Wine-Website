"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { percent, WINE_TIERS } from "@/lib/store";
import { Newsletter } from "./Newsletter";
import styles from "./Subscribe.module.css";

const perks = ["First word on tastings", `Wine offers up to ${percent(WINE_TIERS[WINE_TIERS.length - 1].rate)} off`, "Unsubscribe anytime"];

export function Subscribe() {
  return <section id="newsletter" className={styles.subscribe} aria-labelledby="newsletter-title">
    <div className={styles.photo}><Image src="/images/stock/signup-rose-pour.jpg" alt="" fill sizes="(max-width: 900px) 100vw, 40vw" quality={80} /></div>
    <div className={styles.panel}>
      <h2 id="newsletter-title">A little good taste, <em>in your inbox.</em></h2>
      <p className={styles.lede}>New arrivals, bottles worth knowing and a little inspiration for your next pour, about twice a month.</p>
      <ul className={styles.perks}>{perks.map(p => <li key={p}>{p}</li>)}</ul>
      <Newsletter />
    </div>
  </section>;
}

// Every page except home ends with the signup; home places it mid-page.
export function FooterSubscribe() {
  return usePathname() === "/" ? null : <div className={styles.footerSpot}><Subscribe /></div>;
}
