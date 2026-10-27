"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { typeLabels, wines, type WineType } from "@/lib/wines";
import { Bottle } from "./Bottle";
import { Arrow } from "./Arrow";
import { useCellar } from "./CellarProvider";
import styles from "./ReleaseIndex.module.css";

type Filter = "all" | WineType;
const filters: Filter[] = ["all", "red", "white", "orange", "sparkling"];

export function ReleaseIndex() {
  const { add } = useCellar();
  const [filter, setFilter] = useState<Filter>("all");
  const [expanded, setExpanded] = useState(false);
  const visible = useMemo(() => filter === "all" ? wines : wines.filter(w => w.type === filter), [filter]);
  const selection = expanded ? visible : visible.slice(0, 4);
  return (
    <section id="release" className={styles.section}>
      <div className="container">
        <div className={styles.heading}>
          <div><p className={`label ${styles.eyebrow}`}>THE AUTUMN EDIT · RELEASE NO. 14</p><h2>A season of <em>good taste.</em></h2></div>
          <p>For long evenings, full tables, and the moments<br /> in between. Meet your next favourite bottle.</p>
        </div>
        <div className={styles.toolbar}>
          <div className={styles.filters} role="group" aria-label="Filter wines by style">
            {filters.map(f => <button key={f} aria-pressed={filter === f} onClick={() => { setFilter(f); setExpanded(false); }}>{f === "all" ? "All wines" : typeLabels[f]}<sup>{f === "all" ? wines.length : wines.filter(w => w.type === f).length}</sup></button>)}
          </div>
          <span className={`label ${styles.selected}`}>SMALL BATCH. BIG CHARACTER.</span>
        </div>
        <div className={styles.cards}>
          {selection.map(wine => <article key={wine.slug} className={styles.card}>
            <Link href={`/wines/${wine.slug}`} className={styles.stage} data-type={wine.type} aria-label={`Discover ${wine.name}`}>
              <span className={styles.badge}>{wine.type === "white" ? "Fresh & expressive" : wine.type === "red" ? "Rich & soulful" : wine.type === "orange" ? "A little unexpected" : "A reason to celebrate"}</span>
              <span className={styles.number}>0{wines.indexOf(wine) + 1}</span>
              <Bottle wine={wine} className={styles.bottle} />
              <span className={styles.discover}>Discover the bottle <Arrow /></span>
            </Link>
            <div className={styles.origin}><span>{wine.country} · {wine.grape}</span><span className={styles.typeDot} data-type={wine.type} />{typeLabels[wine.type]}</div>
            <Link href={`/wines/${wine.slug}`}><h3>{wine.name}</h3></Link>
            <p className={styles.producer}>{wine.producer} · {wine.vintage}</p>
            <p className={styles.tasting}>{wine.notes.join(" · ")}</p>
            <div className={styles.bottom}><span className={styles.price}>£{wine.price.toFixed(2)} <small>/ 750ml</small></span><button onClick={() => add(wine.slug)} aria-label={`Add ${wine.name} to cellar`}>Add to cellar <span>+</span></button></div>
          </article>)}
        </div>
        {visible.length > 4 && <div className={styles.more}><button className="textlink" onClick={() => setExpanded(!expanded)}>{expanded ? "Show the edit" : `Explore all ${visible.length} wines`} <Arrow /></button></div>}
      </div>
    </section>
  );
}
