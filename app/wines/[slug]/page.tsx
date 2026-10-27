import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AddToCellar } from "@/components/AddToCellar";
import { Arrow } from "@/components/Arrow";
import { Bottle } from "@/components/Bottle";
import { Reveal } from "@/components/Reveal";
import { getWine, typeLabels, wines } from "@/lib/wines";
import styles from "./page.module.css";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return wines.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const wine = getWine(slug);
  if (!wine) return {};
  return {
    title: `${wine.name} ${wine.vintage} — ${wine.producer} · Uncorked`,
    description: wine.description,
  };
}

export default async function WinePage({ params }: Props) {
  const { slug } = await params;
  const wine = getWine(slug);
  if (!wine) notFound();

  const index = wines.indexOf(wine);
  const related = [1, 2, 3].map((n) => wines[(index + n) % wines.length]);

  const specs: [string, string][] = [
    ["Grape", wine.grape],
    ["Origin", `${wine.region}, ${wine.country}`],
    ["Soil", wine.soil],
    ["Elevation", wine.elevation],
    ["Farming", wine.farming],
    ["Alcohol", `${wine.abv}%`],
    ["Production", wine.production],
    ["Drink", wine.drink],
  ];

  return (
    <>
      <section className={styles.product}>
        <div className="container">
          <div className={styles.crumbs}>
            <Link href="/#release" className="label">
              ← The Release
            </Link>
            <span className="label">
              No. {wine.no} / {String(wines.length).padStart(2, "0")}
            </span>
          </div>

          <div className={styles.grid}>
            <Reveal className={styles.stage}>
              <Bottle wine={wine} className={styles.bottle} />
              <span className={`label ${styles.stageLeft}`}>{typeLabels[wine.type]}</span>
              <span className={`label ${styles.stageRight}`}>75 cl</span>
            </Reveal>

            <div className={styles.info}>
              <Reveal>
                <p className={`label ${styles.producer}`}>{wine.producer}</p>
                <h1 className={styles.title}>
                  {wine.name} <em>{wine.vintage}</em>
                </h1>
                <p className={styles.notes}>{wine.notes.join(" · ")}</p>
              </Reveal>

              <Reveal delay={120}>
                <p className={styles.description}>{wine.description}</p>
                <div className={styles.buy}>
                  <AddToCellar slug={wine.slug} price={wine.price} />
                  <span className="label">Ships 24 October</span>
                </div>
              </Reveal>

              <Reveal delay={200}>
                <dl className={styles.specs}>
                  {specs.map(([k, v]) => (
                    <div key={k}>
                      <dt className="label">{k}</dt>
                      <dd>{v}</dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.related}>
        <div className="container">
          <div className={styles.relatedHead}>
            <h2 className={styles.relatedTitle}>
              Also in <em>this release</em>
            </h2>
            <Link href="/#release" className="textlink">
              All eight wines <Arrow />
            </Link>
          </div>

          <ul className={styles.cards}>
            {related.map((w) => (
              <li key={w.slug}>
                <Link href={`/wines/${w.slug}`} className={styles.card}>
                  <div className={styles.cardStage}>
                    <Bottle wine={w} className={styles.cardBottle} />
                  </div>
                  <div className={styles.cardMeta}>
                    <span className="label">No. {w.no}</span>
                    <span className="label">£{w.price}</span>
                  </div>
                  <span className={styles.cardName}>
                    {w.name} <em>{w.vintage}</em>
                  </span>
                  <span className={styles.cardProducer}>{w.producer}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
