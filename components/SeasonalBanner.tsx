"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { products, type Product } from "@/lib/catalog";
import { bannerFor, type Banner } from "@/lib/content";
import { money, onSale, priceOf } from "@/lib/store";
import { useCellar } from "./CellarProvider";
import { Icon } from "./Icon";
import styles from "./SeasonalBanner.module.css";

function Pick({ product }: { product: Product }) {
  const { add } = useCellar();
  const [added, setAdded] = useState(false);
  useEffect(() => { if (!added) return; const t = setTimeout(() => setAdded(false), 1600); return () => clearTimeout(t); }, [added]);
  return <li className={styles.pick}>
    <Link href={`/products/${product.id}`} className={styles.pickThumb}><img src={product.image} alt="" width="44" height="58" loading="lazy" /></Link>
    <Link href={`/products/${product.id}`} className={styles.pickInfo}><small>{product.brand}</small>{product.name}<span>{money(priceOf(product))}{onSale(product) && <s>{money(product.price)}</s>}</span></Link>
    <button type="button" className={styles.pickAdd} data-added={added} onClick={() => { add(product.id); setAdded(true); }} aria-label={`Add ${product.brand} ${product.name} to bag`}>{added ? <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="m4 10 4 4 8-8" /></svg> : <Icon name="plus" width="14" height="14" />}</button>
  </li>;
}

// Renders the scheduled banner for a placement; resolved on the client so a cached page never shows an expired offer.
export function SeasonalBanner({ placement }: { placement: Banner["placement"] }) {
  const [banner, setBanner] = useState<Banner>();
  const [daysLeft, setDaysLeft] = useState<number>();
  useEffect(() => {
    const b = bannerFor(placement);
    setBanner(b);
    if (b) setDaysLeft(Math.max(0, Math.ceil((new Date(b.ends).getTime() - Date.now()) / 86_400_000)));
  }, [placement]);
  if (!banner) return null;
  const picks = (banner.picks ?? []).map(id => products.find(p => p.id === id)).filter((p): p is Product => Boolean(p));
  return <section className={styles.banner} data-theme={banner.theme} aria-labelledby={`banner-${banner.id}`}>
    <div className={styles.copy}>
      <p className={styles.meta}><span className={styles.date}>{banner.eyebrow}</span>{daysLeft !== undefined && <span className={styles.left}><i aria-hidden="true" />{daysLeft <= 1 ? "Last day" : `${daysLeft} days left`}</span>}</p>
      <h2 id={`banner-${banner.id}`}>{banner.headline} {banner.emphasis && <em>{banner.emphasis}</em>}</h2>
      <p className={styles.body}>{banner.body}</p>
      <Link href={banner.cta.href} className={styles.cta}>{banner.cta.label}<span aria-hidden="true"><Icon name="arrow" width="16" /></span></Link>
    </div>
    <div className={styles.visual}>
      <Image src={banner.image} alt="" fill sizes="(max-width: 900px) 100vw, 55vw" quality={85} loading="eager" className={styles.photo} />
      {picks.length > 0 && <div className={styles.picks}><p>Picks for the 31st</p><ul>{picks.map(p => <Pick key={p.id} product={p} />)}</ul></div>}
    </div>
  </section>;
}
