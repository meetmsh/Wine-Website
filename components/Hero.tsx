import Link from "next/link";
import { Arrow } from "./Arrow";
import { Bottle } from "./Bottle";
import { wines } from "@/lib/wines";
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section className={styles.hero}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.content}>
          <p className={`label ${styles.eyebrow}`}><span /> INDEPENDENT SPIRIT. EXCEPTIONAL WINE.</p>
          <h1 className={styles.title}>Good wine.<br />Great <em>company.</em></h1>
          <p className={styles.lede}>For the dinner that runs late. The just-because toast.<br className={styles.desktopBreak} /> The people who make an ordinary evening extraordinary.<br className={styles.desktopBreak} /> Find a bottle worth sharing.</p>
          <div className={styles.actions}><Link href="#release" className={`btn ${styles.cta}`}>Explore the collection <Arrow /></Link><Link href="#grower" className={styles.story}>Meet the makers <span>↗</span></Link></div>
          <div className={styles.footnote}><span className={styles.flower}>✳</span><p>Small growers. Beautiful places.<br /><strong>A story in every bottle.</strong></p></div>
        </div>
        <div className={styles.visual}>
          <div className={styles.image} role="img" aria-label="Golden sunlight across rolling vineyard hills" />
          <div className={styles.imageCaption}><span className="label">A LITTLE CLOSER TO THE VINE</span><span>47°23′ N · 0°39′ W</span></div>
          <div className={styles.seal}><span>ROOTED IN</span><span className={styles.sealIcon}>✳</span><span>GOOD TASTE</span></div>
          <Link href="/wines/terra-rossa-riserva" className={styles.featured}><Bottle wine={wines[1]} className={styles.featureBottle} /><div><span className="label">THE SEASON’S POUR</span><h2>Terra Rossa<br /><em>Riserva, 2019</em></h2><p>Tuscany, Italy <span>£48</span></p></div><span className={styles.featureArrow}><Arrow /></span></Link>
        </div>
      </div>
      <div className={`container ${styles.values}`}>
        <span><i>♧</i> Independent growers</span><span><i>✧</i> Thoughtfully selected</span><span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 5h12v13H2ZM14 9h4l4 5v4h-8M5 18a2 2 0 1 0 4 0m7 0a2 2 0 1 0 4 0" /></svg>Free delivery over £120</span><span><i>♡</i> Made for sharing</span>
      </div>
    </section>
  );
}
