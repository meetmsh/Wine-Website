import { Arrow } from "./Arrow";
import { Reveal } from "./Reveal";
import { SectionHead } from "./SectionHead";
import styles from "./Journal.module.css";

const entries = [
  {
    date: "12 Oct 2026",
    kind: "Field notes",
    title: "Harvest week on the Mosel’s steepest slate",
    read: "8 min",
  },
  {
    date: "28 Sep 2026",
    kind: "Primer",
    title: "Orange wine, without the mysticism",
    read: "6 min",
  },
  {
    date: "09 Sep 2026",
    kind: "Interview",
    title: "Hervé Lassalle on why he stopped sweetening his Champagne",
    read: "11 min",
  },
];

export function Journal() {
  return (
    <section id="journal" className={styles.section}>
      <div className="container">
        <SectionHead index="06" label="Journal">
          Notes from <em>the cellar.</em>
        </SectionHead>

        <ul className={styles.list}>
          {entries.map((e, i) => (
            <Reveal as="li" key={e.title} delay={i * 80}>
              <a href="#journal" className={styles.entry}>
                <span className={`label ${styles.date}`}>{e.date}</span>
                <span className={`label ${styles.kind}`}>{e.kind}</span>
                <span className={styles.title}>{e.title}</span>
                <span className={`label ${styles.read}`}>
                  {e.read} <Arrow />
                </span>
              </a>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
