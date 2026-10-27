import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { products } from "@/lib/catalog";
import { details } from "@/lib/details";
import { categories, money, onSale, priceOf, wineCategories } from "@/lib/store";
import { ProductCard } from "@/components/Storefront";
import { ProductPurchase } from "@/components/ProductPurchase";
import { Icon } from "@/components/Icon";
import shelf from "@/components/Storefront.module.css";
import styles from "./page.module.css";
type Props = { params: Promise<{ id: string }> };
export function generateStaticParams() { return products.map(p => ({ id: p.id })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params; const product = products.find(p => p.id === id);
  return product ? { title: `${product.brand} ${product.name}`, description: details[id]?.description } : { title: "Product not found" };
}
export default async function ProductPage({ params }: Props) {
  const { id } = await params; const product = products.find(p => p.id === id); if (!product) notFound();
  const info = details[id];
  const category = categories.find(c => c.id === product.category)!;
  const sale = onSale(product);
  const glance = info?.specs.filter(([k]) => ["Style", "Grape", "Grapes", "Base", "Region", "Brewery", "Size", "Contents"].includes(k)).slice(0, 3) ?? [];
  const related = products.filter(p => p.category === product.category && p.id !== id).slice(0,4);
  // Always four: same category first, then fill from the rest of the catalog.
  const recommendations = [...related, ...products.filter(p => p.id !== id && !related.includes(p))].slice(0, 4);
  return <section className={`container ${styles.page}`}>
    <div className={styles.breadcrumb}><Link href="/shop">Shop</Link><span>/</span><Link href={category.href}>{category.label}</Link><span>/</span><span>{product.brand}</span></div>
    <div className={styles.product}>
      <div className={styles.gallery}><div className={styles.image}>
        <div className={styles.badges}>{info?.staffPick && <span className={styles.pickTag}><Icon name="glass" width="13" height="13" />Staff pick</span>}{sale && <span className={styles.saleTag}>Sale</span>}</div>
        <Image src={product.image} alt={`${product.brand} ${product.name}`} width={900} height={900} sizes="(max-width: 700px) 92vw, 50vw" quality={90} priority />
      </div></div>
      <div className={styles.copy}>
        <Link href={category.href} className={styles.category}>{category.label}</Link>
        <h1>{product.brand}<br /><em>{product.name}</em></h1>
        <p className={styles.detail}>{product.detail}</p>
        <p className={styles.price} data-sale={sale}>{sale && <span className="sr-only">Sale price </span>}{money(priceOf(product))}{sale && <s><span className="sr-only">Regular price </span>{money(product.price)}</s>}</p>
        {info && <p className={styles.description}>{info.description}</p>}
        {glance.length > 0 && <dl className={styles.glance}>{glance.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>}
        {info?.staffPick && <figure className={styles.staffNote}><figcaption><Icon name="glass" width="15" height="15" />Why we love it</figcaption><blockquote>“{info.staffPick}”</blockquote><span>The Uncorked team · sample note</span></figure>}
        <ProductPurchase id={product.id} name={`${product.brand} ${product.name}`} price={priceOf(product)} />
        <div className={styles.perks}>
          <p className={styles.perk}><Icon name="truck" width="17" height="17" /><span><b>Free local delivery</b> on orders over $40 in Hoboken and nearby.</span></p>
          {wineCategories.includes(product.category) && <Link href="/shop?category=wine" className={styles.perk}><Icon name="glass" width="17" height="17" /><span><b>Mix 4+ bottles of wine</b> and save 15–22%.</span><Icon name="arrow" width="15" /></Link>}
        </div>
        <div className={styles.visit}><Icon name="pin" width="18" /><span>Pick it up at 1450 Washington Street, Hoboken. <a href={product.externalHref}>Check live availability</a> or <a href="tel:+19083822133">call (908) 382-2133</a>.</span></div>
      </div>
    </div>
    {info && <div className={styles.story} data-reveal="self">
      <div className={styles.notesBlock}><h2>Tasting notes</h2><dl className={styles.notes}><div><dt>Nose</dt><dd>{info.notes.nose}</dd></div><div><dt>Palate</dt><dd>{info.notes.palate}</dd></div><div><dt>Finish</dt><dd>{info.notes.finish}</dd></div></dl></div>
      <div className={styles.storyGrid}>
        <div><h3>Profile</h3><ul className={styles.profile}>{info.profile.map(([label, value]) => <li key={label}><span>{label}</span><span className={styles.meter} role="img" aria-label={`${label}: ${value} out of 5`}>{[1,2,3,4,5].map(n => <i key={n} data-on={n <= value} />)}</span></li>)}</ul></div>
        <div><h3>Pairs well with</h3><ul className={styles.pairings}>{info.pairings.map(p => <li key={p}>{p}</li>)}</ul></div>
        <div><h3>The details</h3><dl className={styles.specs}>{info.specs.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl></div>
      </div>
      <p className={styles.storyNote}>Sample tasting notes and details, written as our impressions of the style. Product, pricing and availability are illustrative; always check the label.</p>
    </div>}
    <div className={styles.related}><h2>A little more to explore</h2><div className={`${shelf.products} ${styles.relatedGrid}`} data-reveal>{recommendations.map(p => <ProductCard key={p.id} product={p} />)}</div></div>
  </section>;
}
