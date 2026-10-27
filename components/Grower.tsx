import Link from "next/link";
import { Arrow } from "./Arrow";
import { Contours } from "./Contours";
import { Reveal } from "./Reveal";
import { SectionHead } from "./SectionHead";
import styles from "./Grower.module.css";

const stats = [
  { value: "9.2", unit: "ha", label: "Under vine" },
  { value: "146", unit: "m", label: "Highest row" },
  { value: "18k", unit: "", label: "Bottles a year" },
  { value: "1987", unit: "", label: "First vintage" },
];

export function Grower() {
  return (
    <section id="grower" className={styles.section}>
      <div className="container">
        <SectionHead index="03" label="Grower of the season">
          Arnaud Vey farms nine hectares of schist and <em>refuses to irrigate any of it.</em>
        </SectionHead>

        <div className={styles.grid}>
          <Reveal className={styles.mapWrap}>
            <Contours className={styles.map} />
            <div className={styles.coords}>
              <span className="label">47°23′N</span>
              <span className="label">0°39′W</span>
            </div>
          </Reveal>

          <div className={styles.copy}>
            <Reveal as="blockquote" className={styles.quote}>
              <p>
                “The vintage tells me what to make. My job is mostly to stay out of the way, and to say no to the
                things that would make it easier.”
              </p>
              <footer className="label">Arnaud Vey, Savennières</footer>
            </Reveal>

            <Reveal delay={120}>
              <p className={styles.body}>
                Arnaud took over his father’s vines in 1987, when Savennières was unfashionable and most of the slope
                was being sold off for houses. He kept the oldest parcels, ploughs between the rows with a single
                horse, and picks each block in up to four passes. His Cailloux Blancs is the wine we have reordered
                every year since we started.
              </p>
              <Link href="/wines/les-cailloux-blancs" className={`textlink ${styles.link}`}>
                Taste Les Cailloux Blancs <Arrow />
              </Link>
            </Reveal>
          </div>
        </div>

        <dl className={styles.stats}>
          {stats.map((s, i) => (
            <Reveal key={s.label} className={styles.stat} delay={i * 80}>
              <dt className="label">{s.label}</dt>
              <dd>
                {s.value}
                {s.unit && <span>{s.unit}</span>}
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
