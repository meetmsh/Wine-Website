import styles from "./Wordmark.module.css";

// Typeset store lockup: shop-sign capitals over an italic trade line framed by brass rules.
export function Wordmark({ size = "regular" }: { size?: "regular" | "large" }) {
  return <span className={styles.wordmark} data-size={size}><span className={styles.name}>Uncorked</span><span className={styles.trade} aria-hidden="true"><i />Wines &amp; Spirits<i /></span><span className="sr-only"> Wines &amp; Spirits</span></span>;
}
