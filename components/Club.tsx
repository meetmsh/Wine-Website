import { Arrow } from "./Arrow";
import { Reveal } from "./Reveal";
import { SectionHead } from "./SectionHead";
import styles from "./Club.module.css";

const tiers = [
  {
    name: "Cellar Six",
    price: 165,
    bottles: 6,
    perks: ["Six bottles each season", "Printed grower notes", "10% off the shop"],
    tag: null,
  },
  {
    name: "Cellar Twelve",
    price: 310,
    bottles: 12,
    perks: ["Twelve bottles each season", "First call on small allocations", "Annual growers’ dinner in London"],
    tag: "Includes allocations",
  },
];

export function Club() {
  return (
    <section id="club" className={styles.section}>
      <div className="container">
        <SectionHead
          index="05"
          label="The Club"
          aside="Four boxes a year, timed with each release. Skip a season or cancel whenever you like, from your account."
        >
          We choose. You open. <em>Four times a year.</em>
        </SectionHead>

        <div className={styles.tiers}>
          {tiers.map((tier, i) => (
            <Reveal key={tier.name} className={styles.tier} delay={i * 120}>
              <div className={styles.tierHead}>
                <span className="label">{String(tier.bottles).padStart(2, "0")} bottles</span>
                {tier.tag && <span className={`label ${styles.tag}`}>{tier.tag}</span>}
              </div>
              <h3 className={styles.name}>{tier.name}</h3>
              <p className={styles.price}>
                £{tier.price}
                <span> per season</span>
              </p>
              <ul className={styles.perks}>
                {tier.perks.map((perk) => (
                  <li key={perk}>{perk}</li>
                ))}
              </ul>
              <a href="#club" className={`btn ${styles.cta}`}>
                Join {tier.name} <Arrow />
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
