"use client";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { bestSellerRank } from "@/lib/content";
import { products, type Product } from "@/lib/catalog";
import { matches, onSale, priceOf } from "@/lib/store";
import { attrs, collections, FACETS, PRICE_BANDS, type FacetKey } from "@/lib/taxonomy";
import { ProductCard } from "./Storefront";
import { Icon } from "./Icon";
import shelf from "./Storefront.module.css";
import styles from "./Shop.module.css";

type Filters = { sets: Partial<Record<FacetKey, string[]>>; sale: boolean; isNew: boolean; min?: number; max?: number; q: string; brand?: string; collection?: string; sort: string };
type Skip = FacetKey | "sale" | "new" | "price";

// Older links use ?category=…; translate them into facet params.
const legacy: Record<string, Record<string, string>> = {
  red: { type: "Wine", style: "Red" }, white: { type: "Wine", style: "White" }, rose: { type: "Wine", style: "Rosé & Blush" }, sparkling: { type: "Wine", style: "Champagne & Sparkling" },
  wine: { type: "Wine" }, beer: { type: "Beer" }, spirits: { type: "Spirits" }, rtd: { type: "Ready to drink" }, cigars: { collection: "cigars" },
};
const SORTS: [string, string][] = [["best", "Best sellers"], ["new", "Newest"], ["low", "Price: low to high"], ["high", "Price: high to low"], ["name", "Name: A–Z"]];

// Custom sort menu: a button that opens a listbox anchored beneath it (arrow keys, Enter, Escape).
function SortMenu({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const wrap = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const list = useRef<HTMLUListElement>(null);
  const current = SORTS.find(([v]) => v === value) ?? SORTS[0];
  useEffect(() => {
    if (!open) return;
    setActive(Math.max(0, SORTS.findIndex(([v]) => v === current[0])));
    list.current?.focus();
    const outside = (e: PointerEvent) => { if (!wrap.current?.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("pointerdown", outside);
    return () => document.removeEventListener("pointerdown", outside);
  }, [open, current]);
  function choose(i: number) { onChange(SORTS[i][0]); setOpen(false); button.current?.focus(); }
  function onKey(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") { e.preventDefault(); setActive(i => Math.min(i + 1, SORTS.length - 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setActive(i => Math.max(i - 1, 0)); }
    else if (e.key === "Home") { e.preventDefault(); setActive(0); }
    else if (e.key === "End") { e.preventDefault(); setActive(SORTS.length - 1); }
    else if (e.key === "Enter" || e.key === " ") { e.preventDefault(); choose(active); }
    else if (e.key === "Escape" || e.key === "Tab") { setOpen(false); if (e.key === "Escape") button.current?.focus(); }
  }
  return <div ref={wrap} className={styles.sortMenu} data-open={open}>
    <button ref={button} type="button" className={styles.sortButton} aria-haspopup="listbox" aria-expanded={open} onClick={() => setOpen(o => !o)} onKeyDown={e => { if (e.key === "ArrowDown" || e.key === "ArrowUp") { e.preventDefault(); setOpen(true); } }}>
      <span className={styles.sortLabel}>Sort</span><span className={styles.sortValue}>{current[1]}</span><Icon name="chevron" width="14" height="14" />
    </button>
    {open && <ul ref={list} role="listbox" tabIndex={-1} aria-label="Sort products" aria-activedescendant={`sort-${SORTS[active][0]}`} className={styles.sortList} onKeyDown={onKey}>
      {SORTS.map(([v, label], i) => <li key={v} id={`sort-${v}`} role="option" aria-selected={v === current[0]} data-active={i === active} onPointerEnter={() => setActive(i)} onClick={() => choose(i)}>{label}<svg viewBox="0 0 12 12" aria-hidden="true"><path d="m2.5 6.2 2.3 2.3 4.7-4.9" /></svg></li>)}
    </ul>}
  </div>;
}
const typeTitles: Record<string, string> = { Wine: "All wine", Beer: "All beer", Spirits: "All spirits", "Ready to drink": "Alternative beverages" };

function normalize(params: URLSearchParams) {
  const next = new URLSearchParams(params.toString());
  const mapped = legacy[next.get("category") || ""];
  next.delete("category");
  if (mapped) for (const [k, v] of Object.entries(mapped)) if (!next.has(k)) next.set(k, v);
  return next;
}
function read(params: URLSearchParams): Filters {
  const p = normalize(params);
  const num = (k: string) => { const v = p.get(k); return v === null || v === "" || isNaN(Number(v)) ? undefined : Number(v); };
  return {
    sets: Object.fromEntries(FACETS.map(({ key }) => [key, (p.get(key) || "").split(",").filter(Boolean)])),
    sale: p.get("sale") === "1", isNew: p.get("new") === "1", min: num("min"), max: num("max"),
    q: (p.get("q") || "").slice(0, 120), brand: p.get("brand") || undefined, collection: p.get("collection") || undefined, sort: p.get("sort") === "trending" ? "best" : p.get("sort") || "best",
  };
}
function passes(product: Product, f: Filters, skip?: Skip) {
  const a = attrs[product.id];
  if (!a || f.collection) return false;
  if (f.q && !matches(`${product.name} ${product.brand} ${product.detail} ${Object.values(a).join(" ")}`, f.q)) return false;
  if (f.brand && product.brand !== f.brand) return false;
  if (skip !== "sale" && f.sale && !onSale(product)) return false;
  if (skip !== "new" && f.isNew && !a.isNew) return false;
  if (skip !== "price") { const v = priceOf(product); if (f.min !== undefined && v < f.min) return false; if (f.max !== undefined && v > f.max) return false; }
  for (const { key } of FACETS) { const want = f.sets[key]; if (key !== skip && want?.length && !want.includes(String(a[key] ?? ""))) return false; }
  return true;
}
function titleFor(f: Filters) {
  if (f.collection) return collections[f.collection]?.title ?? "Collection";
  const one = (k: FacetKey) => (f.sets[k]?.length === 1 ? f.sets[k]![0] : undefined);
  const style = one("style"), varietal = one("varietal"), region = one("region"), country = one("country"), type = one("type");
  if (f.sale) { const what = (typeTitles[type ?? ""] ?? type ?? "").replace("All ", ""); return what ? `${what[0].toUpperCase()}${what.slice(1)} on sale` : "On sale"; }
  if (f.isNew) return "New arrivals";
  if (style) return ["Red", "White"].includes(style) ? `${style} wine` : style;
  if (varietal) return varietal;
  if (region) return region;
  if (country) return `From ${country}`;
  if (f.brand) return f.brand;
  if (type) return typeTitles[type] ?? type;
  return "All the good stuff";
}

function Check({ checked, label, count, onChange }: { checked: boolean; label: string; count: number; onChange: () => void }) {
  return <label className={styles.check} data-empty={count === 0 && !checked}><input type="checkbox" checked={checked} onChange={onChange} /><span className={styles.box} aria-hidden="true"><svg viewBox="0 0 12 12"><path d="m2.5 6.2 2.3 2.3 4.7-4.9" /></svg></span><span className={styles.checkLabel}>{label}</span><span className={styles.count}>{count}</span></label>;
}

function Group({ title, children, defaultOpen = true }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  return <details className={styles.group} open={defaultOpen}><summary>{title}<Icon name="chevron" width="14" height="14" /></summary><div className={styles.groupBody}>{children}</div></details>;
}

function Options({ options, selected, onToggle }: { options: [string, number][]; selected: string[]; onToggle: (v: string) => void }) {
  const [more, setMore] = useState(false);
  const shown = more ? options : options.slice(0, 5);
  return <>{shown.map(([v, n]) => <Check key={v} checked={selected.includes(v)} label={v} count={n} onChange={() => onToggle(v)} />)}{options.length > 5 && <button type="button" className={styles.more} onClick={() => setMore(!more)}>{more ? "Show less" : `Show ${options.length - 5} more`}</button>}</>;
}

export function Shop() {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const f = useMemo(() => read(params), [params]);
  const [sheet, setSheet] = useState(false);
  const [price, setPrice] = useState({ min: "", max: "" });
  useEffect(() => setPrice({ min: f.min?.toString() ?? "", max: f.max?.toString() ?? "" }), [f.min, f.max]);
  useEffect(() => { document.documentElement.style.overflow = sheet ? "hidden" : ""; return () => { document.documentElement.style.overflow = ""; }; }, [sheet]);

  function update(mutate: (p: URLSearchParams) => void) {
    const next = normalize(params);
    mutate(next);
    const qs = next.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }
  const toggle = (key: FacetKey, value: string) => update(p => {
    const set = new Set((p.get(key) || "").split(",").filter(Boolean));
    if (set.has(value)) set.delete(value); else set.add(value);
    if (set.size) p.set(key, [...set].join(",")); else p.delete(key);
  });
  const flag = (key: "sale" | "new") => update(p => { if (p.get(key) === "1") p.delete(key); else p.set(key, "1"); });
  const setRange = (min?: number, max?: number) => update(p => { if (min === undefined) p.delete("min"); else p.set("min", String(min)); if (max === undefined) p.delete("max"); else p.set("max", String(max)); });
  const clearAll = () => update(p => { for (const k of [...p.keys()]) if (k !== "q" && k !== "sort") p.delete(k); });

  const results = products.filter(p => passes(p, f)).sort((a, b) =>
    f.sort === "low" ? priceOf(a) - priceOf(b) : f.sort === "high" ? priceOf(b) - priceOf(a) : f.sort === "name" ? a.name.localeCompare(b.name) : f.sort === "new" ? Number(!!attrs[b.id]?.isNew) - Number(!!attrs[a.id]?.isNew) : bestSellerRank(a.id) - bestSellerRank(b.id));
  const pool = (skip: Skip) => products.filter(p => passes(p, f, skip));
  const facetOptions = (key: FacetKey): [string, number][] => {
    const counts = new Map<string, number>();
    for (const p of pool(key)) { const v = attrs[p.id]?.[key]; if (v !== undefined && v !== "") counts.set(String(v), (counts.get(String(v)) ?? 0) + 1); }
    for (const v of f.sets[key] ?? []) if (!counts.has(v)) counts.set(v, 0);
    return [...counts].sort((a, b) => key === "vintage" ? b[0].localeCompare(a[0]) : b[1] - a[1] || a[0].localeCompare(b[0]));
  };
  const saleCount = pool("sale").filter(onSale).length;
  const newCount = pool("new").filter(p => attrs[p.id]?.isNew).length;
  const pricePool = pool("price");

  const chips: { label: string; remove: () => void }[] = [
    ...(f.sale ? [{ label: "On sale", remove: () => flag("sale") }] : []),
    ...(f.isNew ? [{ label: "New arrivals", remove: () => flag("new") }] : []),
    ...FACETS.flatMap(({ key }) => (f.sets[key] ?? []).map(v => ({ label: v, remove: () => toggle(key, v) }))),
    ...(f.min !== undefined || f.max !== undefined ? [{ label: `${f.min !== undefined ? `$${f.min}` : "$0"} – ${f.max !== undefined ? `$${f.max}` : "any"}`, remove: () => setRange() }] : []),
    ...(f.brand ? [{ label: f.brand, remove: () => update(p => p.delete("brand")) }] : []),
    ...(f.collection ? [{ label: collections[f.collection]?.title ?? f.collection, remove: () => update(p => p.delete("collection")) }] : []),
  ];
  const title = titleFor(f);
  const collection = f.collection ? collections[f.collection] : undefined;

  const panel = <div className={styles.panel}>
    <div className={styles.panelTop}><h2>Filters</h2>{chips.length > 0 && <button type="button" onClick={clearAll}>Clear all</button>}</div>
    <Group title="Show"><Check checked={f.sale} label="On sale" count={saleCount} onChange={() => flag("sale")} /><Check checked={f.isNew} label="New arrivals" count={newCount} onChange={() => flag("new")} /></Group>
    {FACETS.map(({ key, label }) => { const options = facetOptions(key); return options.length ? <Group key={key} title={label} defaultOpen={!["subRegion", "state"].includes(key)}><Options options={options} selected={f.sets[key] ?? []} onToggle={v => toggle(key, v)} /></Group> : null; })}
    <Group title="Price range">
      <form className={styles.range} onSubmit={e => { e.preventDefault(); const min = price.min === "" ? undefined : Math.max(0, Number(price.min)); const max = price.max === "" ? undefined : Math.max(0, Number(price.max)); setRange(min, max); }}>
        <label><span className="sr-only">Minimum price</span><i>$</i><input inputMode="decimal" placeholder="Min" value={price.min} onChange={e => setPrice(s => ({ ...s, min: e.target.value.replace(/[^\d.]/g, "") }))} /></label>
        <span aria-hidden="true">–</span>
        <label><span className="sr-only">Maximum price</span><i>$</i><input inputMode="decimal" placeholder="Max" value={price.max} onChange={e => setPrice(s => ({ ...s, max: e.target.value.replace(/[^\d.]/g, "") }))} /></label>
        <button type="submit">Go</button>
      </form>
      {PRICE_BANDS.map(([lo, hi, label]) => { const n = pricePool.filter(p => priceOf(p) >= lo && priceOf(p) < hi).length; const on = f.min === lo && f.max === hi; return <Check key={label} checked={on} label={label} count={n} onChange={() => on ? setRange() : setRange(lo, hi)} />; })}
    </Group>
  </div>;

  return <section className={`container ${styles.shop}`}>
    <nav className={styles.crumbs} aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><Link href="/shop">Shop</Link>{title !== "All the good stuff" && <><span aria-hidden="true">/</span><span>{title}</span></>}</nav>
    <div className={styles.heading}><div><h1>{f.q ? <>Search: <em>“{f.q}”</em></> : title}</h1><p>{collection ? collection.text : "Something familiar. Something unexpected. Find your favorite."}</p></div></div>
    <div className={styles.layout}>
      <aside className={styles.sidebar} aria-label="Filters">{panel}</aside>
      <div className={styles.results}>
        <div className={styles.toolbar}>
          <button type="button" className={styles.filterButton} onClick={() => setSheet(true)}><Icon name="menu" width="16" height="16" />Filters{chips.length > 0 && <b>{chips.length}</b>}</button>
          <p aria-live="polite">{results.length} {results.length === 1 ? "product" : "products"}</p>
          <SortMenu value={f.sort} onChange={v => update(p => { if (v === "best") p.delete("sort"); else p.set("sort", v); })} />
        </div>
        {chips.length > 0 && <div className={styles.chips}>{chips.map(c => <button type="button" key={c.label} onClick={c.remove} aria-label={`Remove filter ${c.label}`}>{c.label}<Icon name="close" width="12" height="12" /></button>)}<button type="button" className={styles.clearChips} onClick={clearAll}>Clear all</button></div>}
        <p className={styles.sample}>Sample selection, prices and filters. For current stock, visit our live store.</p>
        {results.length ? <div className={`${shelf.products} ${styles.grid}`}>{results.map(p => <ProductCard key={p.id} product={p} />)}</div>
          : <div className={styles.empty}><Icon name="search" width="34" height="34" /><h2>{collection ? "Coming soon to this preview." : "Nothing matches just yet."}</h2><p>{collection ? collection.text : "This mock catalog is small, so some filters come up empty. Try removing a filter or browse everything."}</p>{chips.length > 0 ? <button type="button" className="btn" onClick={clearAll}>Clear all filters <Icon name="arrow" width="17" /></button> : <Link href="/shop" className="btn">Browse all products <Icon name="arrow" width="17" /></Link>}</div>}
      </div>
    </div>
    {sheet && <div className={styles.sheet} role="dialog" aria-modal="true" aria-label="Filters">
      <div className={styles.sheetBody}>{panel}</div>
      <div className={styles.sheetFoot}><button type="button" className={styles.sheetClose} onClick={() => setSheet(false)} aria-label="Close filters"><Icon name="close" width="18" height="18" /></button><button type="button" className="btn" onClick={() => setSheet(false)}>Show {results.length} {results.length === 1 ? "result" : "results"}<Icon name="arrow" width="17" /></button></div>
    </div>}
  </section>;
}
