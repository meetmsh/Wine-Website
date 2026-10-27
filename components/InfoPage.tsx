import Image from "next/image";
import Link from "next/link";
import { Icon } from "./Icon";
import styles from "./InfoPage.module.css";

export type InfoSection = { title: string; body: React.ReactNode; image?: string; imageAlt?: string; position?: string };

// Shared layout for store pages (About, Delivery, Shipping): title, optional photograph, ruled sections and a visit panel.
export function InfoPage({ crumb, title, emphasis, lede, image, imageAlt, sections, aside }: { crumb: string; title: string; emphasis: string; lede: string; image?: string; imageAlt?: string; sections: InfoSection[]; aside?: React.ReactNode }) {
  return <article className={`container ${styles.page}`}>
    <nav className={styles.crumbs} aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><span>{crumb}</span></nav>
    <header className={styles.head}>
      <h1>{title} <em>{emphasis}</em></h1>
      <p>{lede}</p>
    </header>
    {image && <div className={styles.photo}><Image src={image} alt={imageAlt ?? ""} fill sizes="(max-width: 700px) 100vw, 1280px" quality={90} priority /></div>}
    <div className={styles.body}>
      <div className={styles.sections}>{sections.map(s => <section key={s.title} className={styles.section}><h2>{s.title}</h2><div className={styles.text}>{s.image && <div className={styles.sectionPhoto}><Image src={s.image} alt={s.imageAlt ?? ""} fill sizes="(max-width: 700px) 100vw, 560px" quality={90} style={{ objectPosition: s.position }} /></div>}{s.body}</div></section>)}</div>
      <aside className={styles.aside}>{aside ?? <VisitPanel />}</aside>
    </div>
  </article>;
}

export function VisitPanel() {
  return <div className={styles.visit}>
    <h2>Visit us</h2>
    <a href="https://maps.google.com/?q=1450+Washington+St+Hoboken+NJ" target="_blank" rel="noreferrer" className={styles.visitRow}><Icon name="pin" width="17" height="17" /><span>1450 Washington Street<br />Hoboken, NJ 07030</span></a>
    <a href="tel:+19083822133" className={styles.visitRow}><Icon name="phone" width="17" height="17" /><span>(908) 382-2133</span></a>
    <dl className={styles.hours}>
      <div><dt>Mon–Thu</dt><dd>11am–10pm</dd></div>
      <div><dt>Fri–Sat</dt><dd>10am–10pm</dd></div>
      <div><dt>Sunday</dt><dd>11am–8pm</dd></div>
    </dl>
    <a href="https://www.instagram.com/uncorkedwineshoboken/" target="_blank" rel="noreferrer" className={styles.visitRow}><Icon name="instagram" width="17" height="17" /><span>@uncorkedwineshoboken</span></a>
    <p className={styles.age}>21+ only. Please bring a valid photo ID.</p>
  </div>;
}
