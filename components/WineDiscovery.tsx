import Image from "next/image";
import Link from "next/link";
import { products } from "@/lib/catalog";
import { money, onSale, priceOf } from "@/lib/store";
import { Icon } from "./Icon";
import styles from "./WineDiscovery.module.css";

const stylesOfWine = [
  { id: "red", name: "Red", note: "Depth & character" },
  { id: "white", name: "White", note: "Bright & expressive" },
  { id: "rose", name: "Rosé", note: "A little sunshine" },
  { id: "sparkling", name: "Sparkling", note: "Make it an occasion" },
];

export function HeroBottle({ id }: { id: string }) {
  const product = products.find(p => p.id === id);
  if (!product) return null;
  return <Link href={`/products/${product.id}`} className={styles.heroBottle} aria-label={`Explore ${product.brand} ${product.name}, ${money(priceOf(product))}`}>
    <div className={styles.bottleStage}><Image src={product.image} alt="" width={160} height={180} sizes="160px" quality={90} /></div>
    <div className={styles.bottleCopy}><h2>{product.brand} <em>{product.name}</em></h2><p>{product.detail}</p></div>
    <span className={styles.bottleFoot}><span>{money(priceOf(product))}{onSale(product) && <s>{money(product.price)}</s>}</span><span>Explore bottle <Icon name="arrow" width="15" height="15" /></span></span>
  </Link>;
}

export function WineDiscovery() {
  return <section className={`container ${styles.discovery}`} aria-labelledby="wine-discovery-title">
    <h2 id="wine-discovery-title">Find your <em>kind of wine.</em></h2>
    <nav aria-label="Explore wine styles"><ul>{stylesOfWine.map(wine => <li key={wine.id}>
      <Link href={`/shop?category=${wine.id}`}><span className={styles.wineName}>{wine.name}<Icon name="arrow" width="18" height="18" /></span><span className={styles.wineNote}>{wine.note}</span></Link>
    </li>)}</ul></nav>
  </section>;
}
