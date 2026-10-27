"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useCellar } from "./CellarProvider";
import { categories, FREE_DELIVERY, FREE_DELIVERY_LINE, money, percent, storeItems, wineDeal } from "@/lib/store";
import { Icon } from "./Icon";
import { SearchBox } from "./SearchBox";
import { MegaNav } from "./MegaNav";
import { Wordmark } from "./Wordmark";
import { navMenu } from "@/lib/taxonomy";
import styles from "./Header.module.css";

export function Header() {
  const { count, items, add, remove, removeAll } = useCellar();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const update = () => setScrolled(scrollY > 8);
    update();
    addEventListener("scroll", update, { passive: true });
    return () => removeEventListener("scroll", update);
  }, []);
  const bag = useRef<HTMLDialogElement>(null);
  const selected = storeItems.filter(p => items[p.id]);
  const subtotal = selected.reduce((sum,p) => sum + p.price * items[p.id], 0);
  const deal = wineDeal(items);
  const total = subtotal - deal.discount;
  useEffect(() => {
    if (!open) return;
    const escape = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", escape);
    return () => window.removeEventListener("keydown", escape);
  }, [open]);
  function closeBag() { bag.current?.close(); document.body.style.overflow = ""; }
  return <>
    <a href="#main-content" className={styles.skip}>Skip to content</a>
    <div className={styles.notice}><div className="container"><span className={styles.delivery}><Icon name="truck" width="16" height="16" /><span><b>Free local delivery</b> on orders over $40<span className={styles.deliveryArea}> · Hoboken and nearby</span></span></span><a className={styles.noticeAddress} href="https://maps.google.com/?q=1450+Washington+St+Hoboken+NJ" target="_blank" rel="noreferrer"><Icon name="pin" width="13" height="13" />1450 Washington St, Hoboken</a><span className={styles.noticeLinks}><Link href="/tastings"><Icon name="glass" width="14" height="14" />Wine tastings</Link><a href="/#newsletter">Join the email list</a><a href="https://www.instagram.com/uncorkedwineshoboken/" target="_blank" rel="noreferrer" aria-label="Instagram @uncorkedwineshoboken"><Icon name="instagram" width="14" height="14" />@uncorkedwineshoboken</a></span></div></div>
    <header className={styles.header} data-scrolled={scrolled}>
      <div className={`container ${styles.top}`}>
        <button className={styles.menu} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(!open)}><Icon name={open ? "close" : "menu"} /></button>
        <Link href="/" className={styles.logo} aria-label="Uncorked Wines & Spirits, home"><Wordmark /></Link>
        <SearchBox />
        <div className={styles.actions}><a className={styles.visit} href="/#visit"><Icon name="pin" width="19" height="19" /><span>Come say hello<small>Hoboken, NJ</small></span></a><button className={styles.bagButton} aria-label={`Open shopping bag, ${count} items`} onClick={e => { if (bag.current) bag.current.dataset.instant = String(e.detail === 0); bag.current?.showModal(); document.body.style.overflow = "hidden"; }}><Icon name="bag" width="19" height="19" />{count ? <><span className={styles.bagTotal}>{money(subtotal - deal.discount)}</span><b className={styles.bagCount}>{count}</b></> : <span className={styles.bagTotal}>Bag</span>}</button></div>
      </div>
      <MegaNav />
      {open && <nav id="mobile-menu" className={styles.mobileNav} aria-label="Mobile categories">{navMenu.map(item => item.groups
        ? <details key={item.id} className={styles.mobileGroup}><summary>{item.label}<Icon name="chevron" width="18" height="18" /></summary>
            <div className={styles.mobileGroupBody}>{item.groups.map(g => <div key={g.title}><p>{g.title}</p><ul>{g.links.map(l => <li key={l.label}><Link href={l.href} onClick={() => setOpen(false)}>{l.label}</Link></li>)}</ul></div>)}<Link href={item.href} className={styles.mobileAll} onClick={() => setOpen(false)}>Shop all {item.label.toLowerCase()}<Icon name="arrow" width="16" height="16" /></Link></div>
          </details>
        : <Link key={item.id} href={item.href} className={styles.mobileLink} onClick={() => setOpen(false)}>{item.label}<Icon name="arrow" width="17" height="17" /></Link>)}<Link href="/shop?category=wine" className={styles.mobileDeal} onClick={() => setOpen(false)}><span><b>Mix wine, save up to 22%</b> · from 4 bottles</span><Icon name="arrow" width="17" height="17" /></Link><Link href="/tastings" className={styles.mobileDeal} onClick={() => setOpen(false)}><span><b>Wine tastings</b> · see what’s pouring</span><Icon name="arrow" width="17" height="17" /></Link></nav>}
    </header>
    <dialog ref={bag} className={styles.bag} onCancel={() => { if (bag.current) bag.current.dataset.instant = "true"; closeBag(); }} onClick={e => { if (e.target === bag.current) closeBag(); }} aria-labelledby="bag-title"><div className={styles.bagContent}>
      <div className={styles.bagHeading}><h2 id="bag-title">Your bag <span>({count})</span></h2><button onClick={closeBag} aria-label="Close shopping bag"><Icon name="close" /></button></div>
      {selected.length ? <><div>{selected.map(p => <article className={styles.bagItem} key={p.id}><Link href={p.href} onClick={closeBag}>{p.image && <img src={p.image} alt={p.name} width="75" height="110" />}</Link><div><Link href={p.href} onClick={closeBag}><small className={styles.bagBrand}>{p.brand}</small><h3>{p.name}</h3></Link><p>{p.detail}</p><div className={styles.bagControls}><div className={styles.quantity}><button onClick={() => remove(p.id)} aria-label={`Remove one ${p.name}`}><Icon name="minus" width="13" /></button><span>{items[p.id]}</span><button onClick={() => add(p.id)} aria-label={`Add one ${p.name}`}><Icon name="plus" width="13" /></button></div><button className={styles.removeItem} onClick={() => removeAll(p.id)}>Remove</button></div></div><strong>{p.was && <s>{money(p.was * items[p.id])}</s>}{money(p.price * items[p.id])}{items[p.id] > 1 && <small>{money(p.price)} each</small>}</strong></article>)}</div>
        <div className={styles.delivery} data-unlocked={total > FREE_DELIVERY}><p><Icon name="truck" width="18" height="18" />{total > FREE_DELIVERY ? <span><b>Free local delivery unlocked.</b> We deliver to Hoboken and nearby.</span> : <span>Add <b>{money(Math.max(0.01, FREE_DELIVERY + 0.01 - total))}</b> more for free local delivery.</span>}</p><div className={styles.meter} aria-hidden="true"><span style={{ transform: `scaleX(${Math.min(1, total / FREE_DELIVERY)})` }} /></div></div>
        {deal.bottles > 0 && <div className={styles.bagDeal} data-unlocked={deal.unlocked}><div className={styles.dealSlots} aria-hidden="true">{Array.from({ length: Math.min(12, deal.next ? deal.next.bottles : deal.bottles) }, (_, i) => <span key={i} data-filled={i < deal.bottles} />)}</div><p>{deal.tier ? <><b>{percent(deal.tier.rate)} case discount applied.</b>{deal.next && <> Add {deal.remaining} more for {percent(deal.next.rate)}.</>}</> : <>Add {deal.remaining} more regular-priced {deal.remaining === 1 ? "bottle" : "bottles"} of wine to save {percent(deal.next!.rate)}.</>}</p></div>}
        <div className={styles.checkout}><div className={styles.totals}><div><span>Subtotal</span><span>{money(subtotal)}</span></div>{deal.unlocked && <div className={styles.saving}><span>{deal.tier && `${percent(deal.tier.rate)} off ${deal.tier.bottles}+ wines`}</span><span>−{money(deal.discount)}</span></div>}<div className={styles.total}><span>Total</span><span>{money(subtotal - deal.discount)}</span></div></div>
        <p className={styles.note}>Sample selection and pricing. Your bag is saved on this device; checkout is not connected.</p><a href="https://www.uncorkedhoboken.com/" className="btn">Shop the live store <Icon name="arrow" /></a></div></> : <div className={styles.empty}><Icon name="bag" width="44" height="44" /><h3>Let’s find your next favorite.</h3><p>A great bottle, a new brew, a little something for the weekend.</p><p className={styles.emptyPerk}><Icon name="truck" width="16" height="16" />{FREE_DELIVERY_LINE}.</p></div>}
      <Link href="/shop" onClick={closeBag} className={styles.keepShopping}>Keep exploring <Icon name="arrow" width="16" /></Link>
    </div></dialog>
  </>;
}
