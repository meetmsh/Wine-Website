import Link from "next/link";
import { FooterSubscribe } from "./Subscribe";
import { categories } from "@/lib/store";
import { Icon } from "./Icon";
import { Wordmark } from "./Wordmark";
import styles from "./Footer.module.css";
export function Footer() {
  return <>
    <FooterSubscribe />
    <footer className={styles.footer} id="visit"><div className="container"><div className={styles.footerTop}>
      <div className={styles.brand}><Link href="/" aria-label="Uncorked Wines & Spirits, home"><Wordmark size="large" /></Link><p>Your neighborhood. Your next favorite.</p><a href="https://www.instagram.com/uncorkedwineshoboken/" target="_blank" rel="noreferrer" className={styles.insta} aria-label="Follow @uncorkedwineshoboken on Instagram (opens in a new tab)"><Icon name="instagram" width="18" height="18" /><span><span className={styles.instaLabel}>Follow our latest pours</span><b>@uncorkedwineshoboken</b></span><Icon name="external" width="14" height="14" /></a></div>
      <nav aria-label="Footer shop navigation"><h3>Find your pour</h3><div className={styles.footerLinks}>{categories.map(c => <Link key={c.id} href={c.href}>{c.label}</Link>)}</div></nav>
      <div className={styles.visit}><h3>Come say hello</h3><a href="https://maps.google.com/?q=1450+Washington+St+Hoboken+NJ" target="_blank" rel="noreferrer">1450 Washington Street<br />Hoboken, NJ 07030</a><a href="tel:+19083822133">(908) 382-2133</a><p>Mon–Thu: 11am–10pm<br />Fri–Sat: 10am–10pm<br />Sunday: 11am–8pm</p></div>
      <nav aria-label="Store information"><h3>A little more</h3><Link href="/about">About Uncorked</Link><Link href="/vineyards">Wine by vineyard</Link><Link href="/tastings">Wine tastings</Link><Link href="/delivery">Delivery policy</Link><Link href="/shipping">Shipping policy</Link></nav>
    </div><div className={styles.bottom}><span>© {new Date().getFullYear()} Uncorked Wines & Spirits</span><span>21+ only. Good times, enjoyed responsibly.</span><div><Link href="/privacy">Privacy information</Link><Link href="/terms">Shopping information</Link></div></div></div></footer>
  </>;
}
