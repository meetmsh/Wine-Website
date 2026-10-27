import Image from "next/image";
import Link from "next/link";
import { products } from "@/lib/catalog";
import { vineyards } from "@/lib/vineyards";
import { shopHref } from "@/lib/taxonomy";
import { ProductCard } from "./Storefront";
import { Icon } from "./Icon";
import styles from "./Vineyards.module.css";

// Homepage: a slim, photographic banner that opens the full vineyards page.
export function VineyardsBanner() {
  return <section className={`container ${styles.bannerWrap}`} aria-labelledby="vineyards-banner-title">
    <Link href="/vineyards" className={styles.banner}>
      <Image src="/images/stock/vineyard-tuscany.jpg" alt="" fill sizes="(max-width: 700px) 100vw, 1280px" quality={90} className={styles.bannerPhoto} />
      <span className={styles.bannerCopy}>
        <span id="vineyards-banner-title" className={styles.bannerTitle}>Wine by <em>vineyard.</em></span>
        <span className={styles.bannerText}>Meet the places behind the bottles, from Tuscany to Provence.</span>
      </span>
      <span className={styles.bannerPlaces} aria-hidden="true">{vineyards.map(v => <span key={v.id}>{v.region}</span>)}</span>
      <span className={styles.bannerCta}>Explore the vineyards<Icon name="arrow" width="16" height="16" /></span>
    </Link>
  </section>;
}

const EXPLORE = [
  { title: "Every wine on our shelves", text: "Filter by vineyard, region, grape or price.", cta: "Shop all wine", href: shopHref({ type: "Wine" }), image: "/images/stock/varietal-pinot-noir.jpg", position: "center 45%" },
  { title: "Taste it in store", text: "Pour a few with us on Washington Street.", cta: "See upcoming tastings", href: "/tastings", image: "/images/stock/tasting-tuscan-reds.jpg", position: "center 40%" },
  { title: "Mix any four wines", text: "Save 15% on four, up to 22% on twelve.", cta: "Build your case", href: shopHref({ type: "Wine" }), image: "/images/stock/signup-rose-pour.jpg", position: "center 40%" },
];

// Full page: one chapter per producer, photograph and story alternating sides, with the bottles to buy.
export function VineyardsPage() {
  return <div className={styles.page}>
    <header className={`container ${styles.intro}`}>
      <nav className={styles.crumbs} aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><span>Vineyards</span></nav>
      <h1>Wine by <em>vineyard.</em></h1>
      <p>Every bottle starts somewhere. Here are the producers on our shelves and the places that shape their wine.</p>
      <ol className={styles.index}>{vineyards.map(v => <li key={v.id}><a href={`#${v.id}`}><span><b>{v.producer}</b><small>{v.region}, {v.country}</small></span></a></li>)}</ol>
    </header>
    {vineyards.map((v, i) => {
      const bottles = v.products.map(id => products.find(p => p.id === id)).filter(p => p !== undefined);
      return <article key={v.id} id={v.id} className={styles.chapter} data-flip={i % 2 === 1} data-reveal="self">
        <div className={styles.photo}><Image src={v.image} alt={`Vineyards in ${v.region}, ${v.country}`} fill sizes="(max-width: 900px) 100vw, 58vw" quality={90} style={{ objectPosition: v.position }} /></div>
        <div className={styles.copy}>
          <h2>{v.producer}<span className={styles.place}>{v.region}, {v.country}</span></h2>
          <p className={styles.lede}>{v.lede}</p>
          <p className={styles.story}>{v.story}</p>
          <dl className={styles.facts}>{v.facts.map(([k, val]) => <div key={k}><dt>{k}</dt><dd>{val}</dd></div>)}</dl>
          <div className={styles.bottles}>{bottles.map(p => <ProductCard key={p.id} product={p} />)}</div>
          <div className={styles.explore}>
            <Link href={shopHref({ type: "Wine", vineyard: v.producer })}>All {v.producer} wines<Icon name="arrow" width="15" height="15" /></Link>
            <Link href={shopHref(v.more.params)}>{v.more.label}<Icon name="arrow" width="15" height="15" /></Link>
          </div>
        </div>
      </article>;
    })}
    <section className={`container ${styles.more}`} aria-labelledby="vineyards-more-title">
      <h2 id="vineyards-more-title">Keep <em>exploring.</em></h2>
      <div className={styles.moreGrid}>{EXPLORE.map(e => <Link key={e.title} href={e.href} className={styles.moreCard}>
        <Image src={e.image} alt="" fill sizes="(max-width: 900px) 100vw, 33vw" quality={90} className={styles.morePhoto} style={{ objectPosition: e.position }} />
        <span className={styles.moreCopy}><b>{e.title}</b><small>{e.text}</small><span className={styles.moreCta}>{e.cta}<Icon name="arrow" width="15" height="15" /></span></span>
      </Link>)}</div>
    </section>
    <p className={`container ${styles.note}`}>Region photographs are representative of each area, not of the producers’ own estates.</p>
  </div>;
}
