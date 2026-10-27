import { Reveal } from "./Reveal";
import styles from "./SectionHead.module.css";

type Props = {
  index: string;
  label: string;
  children: React.ReactNode;
  aside?: React.ReactNode;
};

export function SectionHead({ index, label, children, aside }: Props) {
  return (
    <header className={styles.head}>
      <div className={styles.meta}>
        <span className="label">§ {index}</span>
        <span className="label">{label}</span>
      </div>
      <div className={styles.body}>
        <Reveal as="h2" className={styles.title}>
          {children}
        </Reveal>
        {aside && (
          <Reveal delay={120} className={styles.aside}>
            {aside}
          </Reveal>
        )}
      </div>
    </header>
  );
}
