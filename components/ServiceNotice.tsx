import { Icon } from "./Icon";
import styles from "./ServiceNotice.module.css";

export function ServiceNotice({ loading, gift = false }: { loading: boolean; gift?: boolean }) {
  return <section className={styles.notice} aria-live="polite">
    {loading ? <p>Checking online availability…</p> : <>
      <h2>{gift ? "A gift from the shop." : "Let’s take your order."}</h2>
      <p>{gift ? "Online gift-card purchases are currently unavailable. Choose an amount, then call the shop to arrange your gift." : "Online ordering is currently unavailable. Your bag is saved on this device; call the shop to check stock and arrange pickup or delivery."}</p>
      <a className="btn" href="tel:+19083822133">Call (908) 382-2133 <Icon name="phone" width="17" height="17" /></a>
    </>}
  </section>;
}
