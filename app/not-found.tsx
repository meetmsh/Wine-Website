import Link from "next/link";
import { Icon } from "@/components/Icon";
import styles from "./not-found.module.css";

export default function NotFound() {
  return <section className={`container ${styles.missing}`}>
    <h1>This one’s <em>off the shelf.</em></h1>
    <p>We couldn’t find that page. There’s plenty more to explore in the shop.</p>
    <div><Link className="btn" href="/shop">Browse the shop <Icon name="arrow" width="18" /></Link><Link className="textlink" href="/">Back to home</Link></div>
  </section>;
}
