import Image from "next/image";
import Link from "next/link";
import { products } from "@/lib/catalog";
import { money, onSale, priceOf } from "@/lib/store";
import { Icon } from "./Icon";
import styles from "./WineDiscovery.module.css";


export function HeroBottle({ id }: { id: string }) {
  const product = products.find(p => p.id === id);
  if (!product) return null;
  return <Link href={`/products/${product.id}`} className={styles.heroBottle} aria-label={`Explore ${product.brand} ${product.name}, ${money(priceOf(product))}`}>
    <div className={styles.bottleStage}><Image src={product.image} alt="" width={160} height={180} sizes="160px" quality={90} /></div>
    <div className={styles.bottleCopy}><h2>{product.brand} <em>{product.name}</em></h2><p>{product.detail}</p></div>
    <span className={styles.bottleFoot}><span>{money(priceOf(product))}{onSale(product) && <s>{money(product.price)}</s>}</span><span>Explore bottle <Icon name="arrow" width="15" height="15" /></span></span>
  </Link>;
}

