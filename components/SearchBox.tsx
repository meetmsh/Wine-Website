"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { products } from "@/lib/catalog";
import { fold, matches, money, onSale, priceOf } from "@/lib/store";
import { Icon } from "./Icon";
import styles from "./Header.module.css";

const popular = ["Chianti", "Prosecco", "Rosé", "Bourbon", "IPA", "Tequila"];

export function SearchBox() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const input = useRef<HTMLInputElement>(null);
  const q = fold(query.trim());
  const results = q ? products.filter(p => matches(`${p.brand} ${p.name} ${p.detail} ${p.category}`, q)).slice(0, 5) : [];
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
    if (e.key === "ArrowDown" && results.length) { e.preventDefault(); setOpen(true); setActive(i => Math.min(i + 1, results.length - 1)); }
    else if (e.key === "ArrowUp" && results.length) { e.preventDefault(); setActive(i => Math.max(i - 1, -1)); }
    else if (e.key === "Escape") { if (open) setOpen(false); else setQuery(""); }
    else if (e.key === "Enter" && active >= 0 && results[active]) { e.preventDefault(); go(`/products/${results[active].id}`); }
  }
  return <form action="/shop" role="search" className={styles.search} data-open={open} onSubmit={() => setOpen(false)} onBlur={e => { if (!e.currentTarget.contains(e.relatedTarget)) setOpen(false); }}>
    <Icon name="search" width="18" height="18" className={styles.searchIcon} />
    <label className="sr-only" htmlFor="store-search">Search wines, beer, spirits and more</label>
    <input ref={input} id="store-search" type="search" name="q" placeholder="" maxLength={120} autoComplete="off" value={query} onChange={e => { setQuery(e.target.value); setOpen(true); }} onFocus={() => { setOpen(true); }} onKeyDown={onKeyDown} role="combobox" aria-expanded={open} aria-controls={q && results.length ? "search-results" : "search-panel"} aria-autocomplete="list" aria-activedescendant={open && active >= 0 && results[active] ? `search-option-${active}` : undefined} />
    {!query && <span className={styles.hint} aria-hidden="true">Search wine, beer, spirits…</span>}
    {query ? <button type="button" className={styles.clear} onClick={() => { setQuery(""); input.current?.focus(); }} aria-label="Clear search"><Icon name="close" width="15" height="15" /></button> : <><kbd className={styles.kbd} aria-hidden="true">/</kbd><kbd className={`${styles.kbd} ${styles.kbdEsc}`} aria-hidden="true">esc</kbd></>}
    <div id="search-panel" className={styles.searchPanel} hidden={!open} onMouseDown={e => e.preventDefault()}>
      {!q ? <div className={styles.popular}><p>Popular right now</p><div>{popular.map(term => <Link key={term} href={`/shop?q=${encodeURIComponent(term)}`} onClick={() => setOpen(false)}>{term}</Link>)}</div></div>
        : results.length ? <><ul id="search-results" role="listbox" aria-label="Suggested products" className={styles.results}>{results.map((p, i) => <li key={p.id} id={`search-option-${i}`} role="option" aria-selected={active === i} onMouseEnter={() => setActive(i)} onClick={() => go(`/products/${p.id}`)}>
            <img src={p.image} alt="" width="40" height="52" /><span><small>{p.brand}</small>{p.name}</span><span className={styles.resultPrice}>{onSale(p) && <s>{money(p.price)}</s>}{money(priceOf(p))}</span>
          </li>)}</ul><button type="submit" className={styles.allResults}>See all results for “{query.trim()}” <Icon name="arrow" width="15" height="15" /></button></>
        : <p className={styles.noResults}>No bottles match “{query.trim()}” yet. Try a brand, a grape or a style.</p>}
    </div>
  </form>;
}
