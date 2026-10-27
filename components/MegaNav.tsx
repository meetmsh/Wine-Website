"use client";
import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { products } from "@/lib/catalog";
import { money, onSale, priceOf } from "@/lib/store";
import { navMenu } from "@/lib/taxonomy";
import { Icon } from "./Icon";
import styles from "./Header.module.css";

// Stripe-style navigation: one dropdown surface that morphs between menus while the pointer moves along the bar.
export function MegaNav() {
  const [active, setActive] = useState<number | null>(null);
  const [moving, setMoving] = useState(false);
  const [geo, setGeo] = useState({ x: 0, w: 0, h: 0, caret: 0 });
  const wrap = useRef<HTMLDivElement>(null);
  const triggers = useRef<(HTMLAnchorElement | null)[]>([]);
  const panels = useRef<(HTMLDivElement | null)[]>([]);
  const openTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const closeTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  useLayoutEffect(() => {
    if (active === null) return;
    const t = triggers.current[active], p = panels.current[active], w = wrap.current;
    if (!t || !p || !w) return;
    const wr = w.getBoundingClientRect(), tr = t.getBoundingClientRect();
    const center = tr.left + tr.width / 2 - wr.left;
    const edge = parseFloat(getComputedStyle(w).paddingLeft) || 12; // keep the panel inside the page gutters
    const x = Math.min(Math.max(center - p.offsetWidth / 2, edge), wr.width - p.offsetWidth - edge);
    setGeo({ x, w: p.offsetWidth, h: p.offsetHeight, caret: center - x });
  }, [active]);
  useEffect(() => {
    if (active === null) return;
    const escape = (e: KeyboardEvent) => { if (e.key === "Escape") { triggers.current[active]?.focus(); setActive(null); } };
    window.addEventListener("keydown", escape);
    return () => window.removeEventListener("keydown", escape);
  }, [active]);
  useEffect(() => () => { clearTimeout(openTimer.current); clearTimeout(closeTimer.current); }, []);
  function enter(i: number, e: React.PointerEvent) {
    if (e.pointerType !== "mouse") return;
    clearTimeout(closeTimer.current);
    clearTimeout(openTimer.current);
    if (!navMenu[i].groups) { closeTimer.current = setTimeout(() => setActive(null), 80); return; }
    if (active === null) openTimer.current = setTimeout(() => { setMoving(false); setActive(i); }, 80);
    else if (active !== i) { setMoving(true); setActive(i); }
  }
  function leave() { clearTimeout(openTimer.current); closeTimer.current = setTimeout(() => setActive(null), 140); }
  const close = () => setActive(null);
  return <div ref={wrap} className={`container ${styles.navWrap}`} onBlur={e => { if (!e.currentTarget.contains(e.relatedTarget)) close(); }} onPointerLeave={leave} onPointerEnter={() => clearTimeout(closeTimer.current)}>
    <nav className={styles.nav} aria-label="Shop by category" data-open={active !== null}>
      {navMenu.map((item, i) => <Link key={item.id} ref={el => { triggers.current[i] = el; }} href={item.href} data-active={active === i} aria-haspopup={item.groups ? "true" : undefined} aria-expanded={item.groups ? active === i : undefined} aria-controls={item.groups ? `category-panel-${i}` : undefined} onKeyDown={e => { if (item.groups && e.key === "ArrowDown") { e.preventDefault(); clearTimeout(closeTimer.current); setActive(i); requestAnimationFrame(() => panels.current[i]?.querySelector<HTMLAnchorElement>("a")?.focus()); } }} onPointerEnter={e => enter(i, e)} onClick={close}>{item.label}{item.groups && <Icon name="chevron" width="12" height="12" strokeWidth="1.8" />}</Link>)}
    </nav>
    <div className={styles.dropdown} data-open={active !== null} aria-hidden={active === null}>
      <div className={styles.dropdownBox} data-moving={moving} style={{ width: geo.w, height: geo.h, transform: `translateX(${geo.x}px)` }}>
        <span className={styles.caret} style={{ transform: `translateX(${geo.caret - 7}px) rotate(45deg)` }} />
        <div className={styles.dropdownClip}>
          {navMenu.map((item, i) => {
            if (!item.groups) return null;
            const featured = item.featured ? products.filter(p => p.category === item.featured).slice(0, 2) : [];
            const state = active === null ? "after" : i === active ? "active" : i < active ? "before" : "after";
            return <div key={item.id} id={`category-panel-${i}`} ref={el => { panels.current[i] = el; }} className={styles.panel} data-state={state} aria-hidden={active !== i} inert={active !== i}>
              <div className={styles.panelMain}>
                <div className={styles.panelHead}><p className={styles.panelTitle}>{item.label}</p><p className={styles.panelText}>{item.intro}</p></div>
                <div className={styles.panelCols}>{item.groups.map(g => <div key={g.title} className={styles.panelCol}><p>{g.title}</p><ul>{g.links.map(l => <li key={l.label}><Link href={l.href} tabIndex={active === i ? 0 : -1} onClick={close}>{l.label}</Link></li>)}</ul></div>)}</div>
                {item.deal && <Link href={item.href} tabIndex={active === i ? 0 : -1} className={styles.panelDeal} onClick={close}><b>Mix 4+ bottles, save up to 22%</b> · applied automatically in your bag <Icon name="arrow" width="14" height="14" /></Link>}
              </div>
              {featured.length > 0 && <ul className={styles.panelProducts}>{featured.map(p => <li key={p.id}><Link href={`/products/${p.id}`} tabIndex={active === i ? 0 : -1} onClick={close}>
                <span className={styles.panelThumb}><img src={p.image} alt="" width="52" height="68" loading="lazy" /></span>
                <span className={styles.panelProduct}><small>{p.brand}</small>{p.name}<span>{onSale(p) && <em>Sale</em>}{money(priceOf(p))}{onSale(p) && <s>{money(p.price)}</s>}</span></span>
              </Link></li>)}</ul>}
            </div>;
          })}
        </div>
      </div>
    </div>
  </div>;
}
