"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { products, type Product } from "@/lib/catalog";
import { details } from "@/lib/details";
import { shopHref } from "@/lib/taxonomy";
import { money, onSale, percent, priceOf, wineDeal, WINE_TIERS } from "@/lib/store";
import { useCellar } from "./CellarProvider";
import { Icon } from "./Icon";
import { TastingsTeaser } from "./Tastings";
import { Subscribe } from "./Subscribe";
import { SeasonalBanner } from "./SeasonalBanner";
import { bestSellers } from "@/lib/content";
import styles from "./Storefront.module.css";

const slides = [
  { image: "/images/hero1.jpg", position: "center 64%", positionMobile: "28% center", title: <>Uncork a<br /><em>better evening.</em></>, text: "The familiar favorite. The unexpected find. Wine, craft beer, and spirits for whatever’s next.", cta: "Find your next favorite", href: "/shop", name: "Your neighborhood bottle shop" },
  { image: "/images/hero2.jpg", position: "center 48%", positionMobile: "34% center", title: <>Meet your<br />new <em>house favorite.</em></>, text: "From bold reds to bright whites, explore a world of wine. Your next go-to bottle is waiting.", cta: "Explore the wines", href: "/shop?category=wine", name: "Discover our wines" },
];

export function WineDeal() {
  const { items } = useCellar();
  const deal = wineDeal(items);
  const bottleWord = (n: number) => `${n} ${n === 1 ? "bottle" : "bottles"}`;
  const status = !deal.bottles ? `Add ${WINE_TIERS[0].bottles} bottles of wine to start saving.`
    : !deal.tier ? `${bottleWord(deal.bottles)} in your bag. Add ${deal.remaining} more for ${percent(deal.next!.rate)} off.`
    : deal.next ? `${percent(deal.tier.rate)} off unlocked. Add ${deal.remaining} more for ${percent(deal.next.rate)}.`
    : `${percent(deal.tier.rate)} off unlocked, our best case price.`;
  return <section className={styles.caseDeal} aria-labelledby="deal-title">
    <div className={styles.caseCopy}><h2 id="deal-title">Mix any wine. <em>Save up to {percent(WINE_TIERS[WINE_TIERS.length - 1].rate)}.</em></h2><p>Red, white, rosé or sparkling, in any combination. Your discount applies automatically in the bag.</p></div>
    <div className={styles.caseLadder}>
      <ol>{WINE_TIERS.map((t, i) => {
        const from = i ? WINE_TIERS[i - 1].bottles : 0;
        const fill = Math.min(1, Math.max(0, (deal.bottles - from) / (t.bottles - from)));
        return <li key={t.bottles} data-reached={deal.bottles >= t.bottles} data-current={deal.tier === t}><b>{percent(t.rate)}<small> off</small></b><span>{t.bottles} bottles</span><i aria-hidden="true"><i style={{ transform: `scaleX(${fill})`, transitionDelay: `${i * 90}ms` }} /></i></li>;
      })}</ol>
      <p aria-live="polite">{status}</p>
      <p className={styles.caseTerms}>Regular-priced wine only; sale bottles excluded. Terms and conditions apply.</p>
    </div>
    <Link href="/shop?category=wine" className="btn">Shop wine <Icon name="arrow" width="18" /></Link>
  </section>;
}

export function StoreHero() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [reduced, setReduced] = useState(true);
  const [instant, setInstant] = useState(false);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  useEffect(() => { const query = matchMedia("(prefers-reduced-motion: reduce)"); const update = () => setReduced(query.matches); update(); query.addEventListener("change", update); return () => query.removeEventListener("change", update); }, []);
  useEffect(() => { if (paused || hovered || focused || reduced) return; const timer = setInterval(() => setActive(n => (n + 1) % slides.length), 7000); return () => clearInterval(timer); }, [paused, hovered, focused, reduced]);
  const slide = slides[active];
  return <section className={styles.hero} data-instant={instant} data-playing={!(paused || hovered || focused || reduced)} aria-label="Featured collections" aria-roledescription="carousel" onPointerDown={e => { if (e.pointerType === "touch" && e.isPrimary) touchStart.current = { x: e.clientX, y: e.clientY }; }} onPointerCancel={() => { touchStart.current = null; }} onPointerUp={e => { const start = touchStart.current; touchStart.current = null; if (!start) return; const dx = e.clientX - start.x; const dy = e.clientY - start.y; if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.3) { setInstant(false); setActive(n => (n + (dx < 0 ? 1 : slides.length - 1)) % slides.length); } }} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onFocusCapture={() => setFocused(true)} onBlurCapture={e => { if (!e.currentTarget.contains(e.relatedTarget)) setFocused(false); }}>
    {slides.map((s,i) => <Image key={s.image} className={`${styles.heroPhoto} ${i === active ? styles.activePhoto : ""}`} src={s.image} alt="" aria-hidden="true" fill sizes="100vw" quality={82} priority={i === 0} style={{ "--pos": s.position, "--pos-m": s.positionMobile } as React.CSSProperties} />)}
    <div className={styles.shade} />
    <div className={`container ${styles.heroInner}`}><div className={styles.campaign} key={active}><h1>{slide.title}</h1><p>{slide.text}</p><Link href={slide.href} className="btn">{slide.cta}<Icon name="arrow" width="18" /></Link><Link href="#wines-of-the-week" className={styles.heroSecondary}>Discover this week’s wines</Link></div>
      <div className={styles.heroBottom}><div className={styles.slideControls}><div role="group" aria-label="Choose a slide">{slides.map((s,i) => <button key={s.name} onClick={e => { setInstant(e.detail === 0); setActive(i); }} aria-label={`Show slide ${i+1}: ${s.name}`} aria-pressed={active === i}><span /></button>)}</div><button className={styles.pause} onClick={() => setPaused(!paused)} aria-label={paused ? "Play slideshow" : "Pause slideshow"}>{paused ? <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><path d="m4 2 8 5-8 5Z" fill="currentColor" /></svg> : <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><path d="M4 2v10M10 2v10" stroke="currentColor" strokeWidth="2" /></svg>}</button></div><span className={styles.heroLocation}>YOUR NEIGHBORHOOD. YOUR NEXT FAVORITE.</span><div className={styles.arrows}><button onClick={e => { setInstant(e.detail === 0); setActive(n => (n + slides.length - 1) % slides.length); }} aria-label="Previous slide"><Icon name="arrow" style={{ transform: "rotate(180deg)" }} width="17" /></button><button onClick={e => { setInstant(e.detail === 0); setActive(n => (n + 1) % slides.length); }} aria-label="Next slide"><Icon name="arrow" width="17" /></button></div></div>
    </div>
  </section>;
}

// Top varietal categories, each with an editorial photograph (Unsplash, see public/images/stock/provenance.json).
const collections = [
  { id: "cabernet-sauvignon", label: "Cabernet Sauvignon", note: "Bold & structured", image: "/images/stock/varietal-cabernet.jpg" },
  { id: "sauvignon-blanc", label: "Sauvignon Blanc", note: "Crisp & zesty", image: "/images/stock/varietal-sauvignon-blanc.jpg" },
  { id: "pinot-noir", label: "Pinot Noir", note: "Silky & bright", image: "/images/stock/varietal-pinot-noir.jpg" },
  { id: "chardonnay", label: "Chardonnay", note: "Round & golden", image: "/images/stock/varietal-chardonnay.jpg" },
];
export function Collections() {
  const track = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(1);
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const update = () => {
      if (!el.clientWidth) return;
      const count = Math.max(1, Math.ceil((el.scrollWidth - 2) / el.clientWidth));
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 2;
      setPages(count);
      setPage(atEnd ? count - 1 : Math.round(el.scrollLeft / el.clientWidth));
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => { el.removeEventListener("scroll", update); window.removeEventListener("resize", update); };
  }, []);
  function goTo(next: number, instant: boolean) {
    const el = track.current;
    if (!el) return;
    const smooth = !instant && !matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollTo({ left: Math.max(0, Math.min(pages - 1, next)) * el.clientWidth, behavior: smooth ? "smooth" : "auto" });
  }
  return <section className={`container ${styles.collections}`} aria-labelledby="collections-title">
    <h2 id="collections-title">Top categories for you</h2>
    <div ref={track} className={styles.collectionTrack} role="group" aria-label="Shop by collection">
      {collections.map(c => <Link key={c.id} href={shopHref({ type: "Wine", varietal: c.label })} className={`${styles.collection} ${styles.varietal}`}><Image src={c.image} alt="" fill sizes="(max-width: 700px) 48vw, 25vw" quality={80} className={styles.varietalPhoto} /><span className={styles.varietalText}><span className={styles.collectionName}>{c.label}</span><span className={styles.collectionNote}>{c.note}</span></span></Link>)}
    </div>
    {pages > 1 && <div className={styles.collectionNav}>
      <button onClick={e => goTo(page - 1, e.detail === 0)} disabled={page === 0} aria-label="Previous collections"><Icon name="chevron" width="18" height="18" style={{ transform: "rotate(90deg)" }} /></button>
      <div>{Array.from({ length: pages }, (_, i) => <button key={i} onClick={e => goTo(i, e.detail === 0)} aria-label={`Show collections page ${i + 1}`} aria-current={page === i ? "true" : undefined}><span /></button>)}</div>
      <button onClick={e => goTo(page + 1, e.detail === 0)} disabled={page === pages - 1} aria-label="Next collections"><Icon name="chevron" width="18" height="18" style={{ transform: "rotate(-90deg)" }} /></button>
    </div>}
  </section>;
}

export function ProductCard({ product }: { product: Product }) {
  const { add } = useCellar();
  const [added, setAdded] = useState(false);
  useEffect(() => { if (!added) return; const timer = setTimeout(() => setAdded(false), 1700); return () => clearTimeout(timer); }, [added]);
  const sale = onSale(product);
  const pick = Boolean(details[product.id]?.staffPick);
  return <article className={styles.product}>
    <Link href={`/products/${product.id}`} className={styles.productPhoto} data-spotlight aria-label={`View ${product.brand} ${product.name}${pick ? ", staff pick" : ""}${sale ? ", on sale" : ""}`}>{(sale || pick) && <span className={styles.cardBadges} aria-hidden="true">{pick && <span className={styles.pickTag}><Icon name="glass" width="12" height="12" />Staff pick</span>}{sale && <span className={styles.saleTag}>Sale</span>}</span>}<Image src={product.image} alt={`${product.brand} ${product.name}`} width={600} height={600} sizes="(max-width: 700px) 52vw, (max-width: 1100px) 33vw, 25vw" quality={90} /><span className={styles.view}>Take a closer look <Icon name="arrow" width="15" /></span></Link>
    <div className={styles.productInfo}><p className={styles.brand}>{product.brand}</p><Link href={`/products/${product.id}`}><h3>{product.name}</h3></Link><p className={styles.detail}>{product.detail}</p><div className={styles.productBottom}><span className={styles.price} data-sale={sale}>{sale && <span className="sr-only">Sale price </span>}{money(priceOf(product))}{sale && <s><span className="sr-only">Regular price </span>{money(product.price)}</s>}</span><button onClick={() => { add(product.id); setAdded(true); }} aria-label={`Add ${product.brand} ${product.name} to bag`} className={added ? styles.added : ""}><span>{added ? "Added" : "Add to bag"}</span>{added ? <svg width="15" height="15" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="m4 10 4 4 8-8" /></svg> : <Icon name="plus" width="15" height="15" />}</button></div></div>
  </article>;
}

const shelves = [
  { id: "wines-of-the-week", title: "Wines of the week", text: "A few bottles to get to know a little better.", category: "wine", link: "Shop all wine" },
  { id: "craft-beer", title: "Curated craft beer", text: "Independent minds. Very good brews.", category: "beer", link: "Explore craft beer" },
  { id: "craft-spirits", title: "Featured craft spirits", text: "For your bar cart. And your next great cocktail.", category: "spirits", link: "Discover spirits" },
  { id: "ready-to-drink", title: "Ready to drink", text: "Good taste. Zero mixing required.", category: "rtd", link: "Shop ready to drink" },
];
export function ProductShelf({ index }: { index: number }) {
  const shelf = shelves[index];
  const selection = products.filter(p => shelf.category === "wine" ? ["red","white","rose","sparkling"].includes(p.category) : p.category === shelf.category);
  return <section id={shelf.id} className={`${styles.shelf} ${index === 1 ? styles.beerShelf : ""} ${index === 2 ? styles.spiritsShelf : ""} ${index === 3 ? styles.rtdShelf : ""}`}><div className="container"><div className={styles.sectionHeading}><div><h2>{shelf.title}</h2><p>{shelf.text}</p></div><Link href={`/shop?category=${shelf.category}`} className={styles.viewAll}>{shelf.link}<Icon name="arrow" width="17" /></Link></div><div className={styles.products} role="group" tabIndex={0} aria-label={`${shelf.title} products`}>{selection.map(p => <ProductCard key={p.id} product={p} />)}</div><p className={styles.swipeHint}>Swipe to explore <Icon name="arrow" width="16" /></p></div></section>;
}
// Ranked by the POS from the last 30 days of sales; sample order for now.
export function BestSellers() {
  const top = bestSellers.map(id => products.find(p => p.id === id)).filter((p): p is Product => Boolean(p)).slice(0, 4);
  return <section id="best-sellers" className={`${styles.shelf} ${styles.bestShelf}`}><div className="container"><div className={styles.sectionHeading}><div><h2>Best sellers</h2><p>What Hoboken is pouring this month.</p></div><Link href="/shop?sort=best" className={styles.viewAll}>See all best sellers<Icon name="arrow" width="17" /></Link></div><ol className={`${styles.products} ${styles.bestList}`} data-reveal>{top.map(p => <li key={p.id} className={styles.bestItem}><ProductCard product={p} /></li>)}</ol></div></section>;
}

export function Storefront() {
  return <><WineDeal /><StoreHero /><div className={`container ${styles.previewNote}`}>A taste of what’s possible. Product selections and prices shown are samples; visit our live store for current availability.</div><ProductShelf index={0} /><SeasonalBanner placement="home-top" /><Collections /><BestSellers /><TastingsTeaser /><ProductShelf index={1} /><div className={styles.subscribeSpot}><Subscribe /></div><ProductShelf index={2} /><ProductShelf index={3} /></>;
}
