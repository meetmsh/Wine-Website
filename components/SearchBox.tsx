"use client";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { products, type Product } from "@/lib/catalog";
import { bestSellers } from "@/lib/content";
import { fold, matches, money, onSale, priceOf, wineCategories } from "@/lib/store";
import { attrs, shopHref } from "@/lib/taxonomy";
import { Icon } from "./Icon";
import header from "./Header.module.css";
import styles from "./SearchBox.module.css";

// Wine leads the empty state: four styles, a few searches that return real bottles, and trending wines.
const STYLES = [
  { label: "Red", note: "Bold, structured", href: shopHref({ type: "Wine", style: "Red" }), swatch: "#5b1626" },
  { label: "White", note: "Crisp to golden", href: shopHref({ type: "Wine", style: "White" }), swatch: "#e2cf8f" },
  { label: "Rosé", note: "Dry and pale", href: shopHref({ type: "Wine", style: "Rosé & Blush" }), swatch: "#eaa294" },
  { label: "Sparkling", note: "For the toast", href: shopHref({ type: "Wine", style: "Champagne & Sparkling" }), swatch: "#e9dcae" },
];
const POPULAR = ["Chianti", "Chardonnay", "Provence rosé", "Prosecco", "Tuscany"];
const OTHER = [{ label: "Spirits", href: shopHref({ type: "Spirits" }) }, { label: "Beer", href: shopHref({ type: "Beer" }) }, { label: "Cigars", href: shopHref({ collection: "cigars" }) }];

type Suggestion = { label: string; meta: string; count: number; href: string; swatch?: string };

// Searchable categories: the four wine styles, the other departments, then grapes, regions and countries found in the catalog.
function buildIndex(): Suggestion[] {
  const count = (fn: (p: Product) => boolean) => products.filter(fn).length;
  const out: Suggestion[] = [
    ...STYLES.map(s => ({ label: `${s.label} wine`, meta: "Wine style", count: count(p => attrs[p.id]?.style?.startsWith(s.label === "Sparkling" ? "Champagne" : s.label) ?? false), href: s.href, swatch: s.swatch })),
    { label: "Spirits", meta: "Department", count: count(p => attrs[p.id]?.type === "Spirits"), href: shopHref({ type: "Spirits" }) },
    { label: "Beer", meta: "Department", count: count(p => attrs[p.id]?.type === "Beer"), href: shopHref({ type: "Beer" }) },
    { label: "Ready to drink", meta: "Department", count: count(p => attrs[p.id]?.type === "Ready to drink"), href: shopHref({ type: "Ready to drink" }) },
  ];
  const seen = new Map<string, Suggestion>();
  for (const p of products) {
    const a = attrs[p.id];
    if (!a) continue;
    for (const [key, meta] of [["varietal", a.type === "Wine" ? "Grape" : a.type], ["region", "Region"], ["country", "Country"]] as const) {
      const value = a[key];
      if (!value || value === "Cocktail") continue;
      const id = `${a.type}|${key}|${value}`;
      const hit = seen.get(id);
      if (hit) hit.count++;
      else seen.set(id, { label: value, meta: a.type === "Wine" ? meta : `${meta} · ${a.type}`, count: 1, href: shopHref({ type: a.type, [key]: value }) });
    }
  }
  // A grape that only repeats a style name ("Rosé") would show twice, so styles win.
  const styleNames = new Set(STYLES.map(s => fold(s.label)));
  return [...out, ...[...seen.values()].filter(s => !styleNames.has(fold(s.label)))].filter(s => s.count > 0);
}

// Bold the part of a label that matches the query, so the eye lands on why it matched.
function Highlight({ text, query }: { text: string; query: string }) {
  const i = fold(text).indexOf(fold(query));
  if (!query || i < 0) return <>{text}</>;
  return <>{text.slice(0, i)}<mark>{text.slice(i, i + query.length)}</mark>{text.slice(i + query.length)}</>;
}

export function SearchBox() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const input = useRef<HTMLInputElement>(null);
  const index = useMemo(buildIndex, []);
  const q = query.trim();
  const isWine = (p: Product) => wineCategories.includes(p.category);
  const categoryHits = q ? index.filter(s => matches(s.label, q)).slice(0, 3) : [];
  const productHits = q ? products.filter(p => matches(`${p.brand} ${p.name} ${p.detail} ${Object.values(attrs[p.id] ?? {}).join(" ")}`, q)).sort((a, b) => Number(isWine(b)) - Number(isWine(a))).slice(0, 5) : [];
  const options = [...categoryHits.map(s => s.href), ...productHits.map(p => `/products/${p.id}`)];
  const trending = bestSellers.map(id => products.find(p => p.id === id)).filter((p): p is Product => Boolean(p && isWine(p))).slice(0, 3);

  useEffect(() => {
    const key = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (e.key !== "/" || e.metaKey || e.ctrlKey || target.closest("input,textarea,select,[contenteditable=true]")) return;
      e.preventDefault();
      input.current?.focus();
    };
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, []);
  useEffect(() => setActive(-1), [q]);

  function go(href: string) { setOpen(false); input.current?.blur(); router.push(href); }
  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown" && options.length) { e.preventDefault(); setOpen(true); setActive(i => Math.min(i + 1, options.length - 1)); }
    else if (e.key === "ArrowUp" && options.length) { e.preventDefault(); setActive(i => Math.max(i - 1, -1)); }
    else if (e.key === "Escape") { if (open) setOpen(false); else setQuery(""); }
    else if (e.key === "Enter" && active >= 0 && options[active]) { e.preventDefault(); go(options[active]); }
  }
  const optionId = (i: number) => `search-option-${i}`;
  const close = () => setOpen(false);

  return <form action="/shop" role="search" className={`${header.searchSlot} ${styles.box}`} data-open={open} onSubmit={close} onBlur={e => { if (!e.currentTarget.contains(e.relatedTarget)) close(); }}>
    <Icon name="search" width="18" height="18" className={styles.icon} />
    <label className="sr-only" htmlFor="store-search">Search wine, spirits, beer and more</label>
    <input ref={input} id="store-search" type="search" name="q" placeholder="Search wine, spirits, beer…" maxLength={120} autoComplete="off" spellCheck={false} value={query}
      onChange={e => { setQuery(e.target.value); setOpen(true); }} onFocus={() => setOpen(true)} onKeyDown={onKeyDown}
      role="combobox" aria-haspopup={q && options.length ? "listbox" : "dialog"} aria-expanded={open} aria-controls={q && options.length ? "search-results" : "search-panel"} aria-autocomplete="list" aria-activedescendant={open && active >= 0 && options[active] ? optionId(active) : undefined} />
    {query ? <button type="button" className={styles.clear} onClick={() => { setQuery(""); input.current?.focus(); }} aria-label="Clear search"><Icon name="close" width="14" height="14" /></button>
      : <kbd className={styles.kbd} aria-hidden="true">/</kbd>}

    <div id="search-panel" className={styles.panel} hidden={!open} role={q && options.length ? undefined : "dialog"} aria-label={q && options.length ? undefined : "Discover wines"} onMouseDown={e => e.preventDefault()} onKeyDown={e => { if (e.key === "Escape") { e.preventDefault(); input.current?.focus(); setOpen(false); } }}>
      {!q ? <>
        <div className={styles.discover}>
          <section aria-labelledby="search-wine">
            <p id="search-wine" className={styles.heading}>Shop wine</p>
            <div className={styles.styles}>{STYLES.map(s => <Link key={s.label} href={s.href} onClick={close} className={styles.style}>
              <span className={styles.swatch} style={{ "--swatch": s.swatch } as React.CSSProperties} aria-hidden="true" />
              <span><b>{s.label}</b><small>{s.note}</small></span>
            </Link>)}</div>
            <p className={styles.heading}>Popular searches</p>
            <div className={styles.chips}>{POPULAR.map(term => <Link key={term} href={shopHref({ q: term })} onClick={close}>{term}</Link>)}</div>
          </section>
          <section aria-labelledby="search-trending" className={styles.trending}>
            <p id="search-trending" className={styles.heading}>Trending wines</p>
            <ul>{trending.map(p => <li key={p.id}><Link href={`/products/${p.id}`} onClick={close} className={styles.row}>
              <span className={styles.thumb}><Image src={p.image} alt="" width={80} height={104} quality={85} /></span>
              <span className={styles.rowText}><small>{p.brand}</small>{p.name}</span>
              <span className={styles.price}>{money(priceOf(p))}{onSale(p) && <s>{money(p.price)}</s>}</span>
            </Link></li>)}</ul>
          </section>
        </div>
        <div className={styles.foot}>
          <Link href={shopHref({ type: "Wine" })} onClick={close} className={styles.deal}><b>Mix any 4+ wines, save up to 22%</b><Icon name="arrow" width="14" height="14" /></Link>
          <span className={styles.other}>Also {OTHER.map((o, i) => <span key={o.label}>{i ? " · " : ""}<Link href={o.href} onClick={close}>{o.label}</Link></span>)}</span>
        </div>
      </> : options.length ? <>
        <ul id="search-results" role="listbox" aria-label={`Suggestions for ${q}`} className={styles.results}>
          {categoryHits.length > 0 && <li role="presentation" className={styles.group}>Categories</li>}
          {categoryHits.map((s, i) => <li key={s.href} id={optionId(i)} role="option" aria-selected={active === i} onMouseEnter={() => setActive(i)} onClick={() => go(s.href)} className={styles.row}>
            <span className={styles.catIcon} aria-hidden="true">{s.swatch ? <span className={styles.swatch} style={{ "--swatch": s.swatch } as React.CSSProperties} /> : <Icon name={s.meta === "Grape" ? "glass" : "search"} width="16" height="16" />}</span>
            <span className={styles.rowText}><small>{s.meta}</small><Highlight text={s.label} query={q} /></span>
            <span className={styles.count}>{s.count} {s.count === 1 ? "bottle" : "bottles"}</span>
          </li>)}
          {productHits.length > 0 && <li role="presentation" className={styles.group}>Bottles</li>}
          {productHits.map((p, j) => { const i = categoryHits.length + j; return <li key={p.id} id={optionId(i)} role="option" aria-selected={active === i} onMouseEnter={() => setActive(i)} onClick={() => go(`/products/${p.id}`)} className={styles.row}>
            <span className={styles.thumb}><Image src={p.image} alt="" width={80} height={104} quality={85} /></span>
            <span className={styles.rowText}><small>{p.brand}</small><Highlight text={p.name} query={q} /></span>
            <span className={styles.price}>{money(priceOf(p))}{onSale(p) && <s>{money(p.price)}</s>}</span>
          </li>; })}
        </ul>
        <button type="submit" className={styles.all}><span>See all results for “{q}”</span><kbd aria-hidden="true">↵</kbd></button>
      </> : <div className={styles.empty}>
        <p>No bottles match “{q}” yet.</p>
        <span>Try a grape, a region or a style:</span>
        <div className={styles.chips}>{STYLES.map(s => <Link key={s.label} href={s.href} onClick={close}>{s.label}</Link>)}{POPULAR.slice(0, 3).map(term => <Link key={term} href={shopHref({ q: term })} onClick={close}>{term}</Link>)}</div>
      </div>}
    </div>
  </form>;
}
