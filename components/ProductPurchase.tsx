"use client";
import { useEffect, useRef, useState } from "react";
import { money } from "@/lib/store";
import { useCellar } from "./CellarProvider";
import { Icon } from "./Icon";
import styles from "./ProductPurchase.module.css";

const MAX = 24;

// Quantity stepper + add button; the button carries the running total so the price of the choice is always visible.
// On phones a slim bar keeps the add button reachable once the main controls scroll away.
export function ProductPurchase({ id, name, price }: { id: string; name: string; price: number }) {
  const { add } = useCellar();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [stuck, setStuck] = useState(false);
  const row = useRef<HTMLDivElement>(null);
  useEffect(() => { if (!added) return; const t = setTimeout(() => setAdded(false), 2000); return () => clearTimeout(t); }, [added]);
  useEffect(() => {
    const el = row.current;
    if (!el || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(([e]) => setStuck(!e.isIntersecting && e.boundingClientRect.top < 0));
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const step = (d: number) => setQuantity(q => Math.min(MAX, Math.max(1, q + d)));
  const addAll = () => { for (let i = 0; i < quantity; i++) add(id); setAdded(true); };
  const label = (compact = false) => <span className={styles.addLabel}>{added ? <><svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="m4 10 4 4 8-8" /></svg>{compact ? "Added" : "Added to bag"}</> : "Add to bag"}</span>;
  return <>
    <div ref={row} className={styles.purchase}>
      <div className={styles.stepper} role="group" aria-label="Quantity">
        <button type="button" onClick={() => step(-1)} disabled={quantity <= 1} aria-label="Decrease quantity"><Icon name="minus" width="16" height="16" /></button>
        <output aria-live="polite" aria-label={`Quantity ${quantity}`}>{quantity}</output>
        <button type="button" onClick={() => step(1)} disabled={quantity >= MAX} aria-label="Increase quantity"><Icon name="plus" width="16" height="16" /></button>
      </div>
      <button type="button" className={styles.add} data-added={added} aria-label={`Add ${quantity} ${name} to bag, ${money(price * quantity)}`} onClick={addAll}>
        {label()}<span className={styles.addPrice}>{money(price * quantity)}</span>
      </button>
    </div>
    <div className={styles.sticky} data-visible={stuck} aria-hidden={!stuck}>
      <span className={styles.stickyName}>{name}<b>{money(price * quantity)}{quantity > 1 && <small> · {quantity} items</small>}</b></span>
      <button type="button" className={styles.add} data-added={added} tabIndex={stuck ? 0 : -1} onClick={addAll}>{label(true)}</button>
    </div>
  </>;
}
