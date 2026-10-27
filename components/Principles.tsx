import { Reveal } from "./Reveal";
import { SectionHead } from "./SectionHead";
import styles from "./Principles.module.css";

const principles = [
  {
    numeral: "i",
    title: "Blind first, then the vineyard.",
    body: "Every wine is tasted without its label by three of us. Only the ones that survive go on the visit list, and we don’t buy from anyone whose rows we haven’t walked.",
  },
  {
    numeral: "ii",
    title: "Farming over marketing.",
    body: "Organic or biodynamic in practice, certified or not. Native yeasts, little added sulphur where the wine can take it, and no apologies for vintage variation.",
  },
  {
    numeral: "iii",
    title: "Fair at both ends.",
    body: "We pay growers on order, not on sale, and price every bottle at the same flat margin. If a wine costs us more, it costs you more. It never works the other way round.",
  },
];

export function Principles() {
  return (
    <section className={styles.section}>
      <div className="container">
        <SectionHead index="04" label="How we choose">
          Three rules we haven’t <em>broken yet.</em>
        </SectionHead>

        <ol className={styles.list}>
          {principles.map((p, i) => (
            <Reveal as="li" key={p.numeral} className={styles.item} delay={i * 100}>
              <span className={styles.numeral}>{p.numeral}.</span>
              <h3 className={styles.title}>{p.title}</h3>
              <p className={styles.body}>{p.body}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
