"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { products } from "@/lib/catalog";
import { EVENTS_URL, eventDay, eventLong, eventMonth, eventWeekday, tastings, type Tasting } from "@/lib/events";
import { money, onSale, priceOf } from "@/lib/store";
import { useCellar } from "./CellarProvider";
import { Icon } from "./Icon";
import styles from "./Tastings.module.css";

function DateTile({ date }: { date: string }) {
  return <span className={styles.dateTile} aria-hidden="true"><b>{eventDay(date)}</b><span>{eventMonth(date)}</span></span>;
}

function useAdded() {
  const [added, setAdded] = useState(false);
  useEffect(() => { if (!added) return; const t = setTimeout(() => setAdded(false), 1700); return () => clearTimeout(t); }, [added]);
  return [added, () => setAdded(true)] as const;
}

export function TastingsTeaser() {
  const [next, ...rest] = tastings;
  return <section className={styles.teaser} aria-labelledby="tastings-title"><div className="container">
    <div className={styles.teaserHead}>
      <div><h2 id="tastings-title">Taste it first. <em>Then take it home.</em></h2><p>Pull up to the counter, pour a few with us, and leave with a new favorite.</p></div>
      <Link href="/tastings" className={styles.allLink}>See all tastings <Icon name="arrow" width="17" /></Link>
    </div>
    <div className={styles.teaserGrid}>
      <Link href={`/tastings#${next.id}`} className={styles.feature}>
        <Image src={next.image} alt="" fill sizes="(max-width: 700px) 100vw, 60vw" quality={80} className={styles.featurePhoto} />
        <DateTile date={next.date} />
        <span className={styles.featureCopy}><span className={styles.when}>Next up · {eventWeekday(next.date)}, {next.time}</span><span className={styles.featureTitle}>{next.title} <em>{next.emphasis}</em></span><span className={styles.featureCta}>Details and lineup <Icon name="arrow" width="16" /></span></span>
      </Link>
      <div className={styles.upcomingWrap}><ul className={styles.upcoming}>{rest.map(e => <li key={e.id}><Link href={`/tastings#${e.id}`}><DateTile date={e.date} /><span><b>{e.title} {e.emphasis}</b><small>{eventWeekday(e.date)} · {e.time}</small></span><Icon name="arrow" width="17" /></Link></li>)}</ul><p className={styles.sampleNote}>Sample dates. Reserve on our <a href={EVENTS_URL}>live events page</a> for current tastings.</p></div>
    </div>
  </div></section>;
}

function LineupBottle({ id }: { id: string }) {
  const { add } = useCellar();
  const [added, flash] = useAdded();
  const p = products.find(x => x.id === id);
  if (!p) return null;
  return <li className={styles.bottle}>
    <Link href={`/products/${p.id}`} className={styles.bottlePhoto} aria-label={`View ${p.brand} ${p.name}`}><img src={p.image} alt="" width="56" height="76" loading="lazy" /></Link>
    <span className={styles.bottleInfo}><small>{p.brand}</small><Link href={`/products/${p.id}`}>{p.name}</Link><span className={styles.bottlePrice}>{onSale(p) && <em>Sale</em>}{money(priceOf(p))}{onSale(p) && <s>{money(p.price)}</s>}</span></span>
    <button onClick={() => { add(p.id); flash(); }} data-added={added} aria-label={`Add ${p.brand} ${p.name} to bag`}>{added ? <svg width="15" height="15" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="m4 10 4 4 8-8" /></svg> : <Icon name="plus" width="15" height="15" />}<span>{added ? "Added" : "Add"}</span></button>
  </li>;
}

function TastingEvent({ event }: { event: Tasting }) {
  const { add } = useCellar();
  const [added, flash] = useAdded();
  const lineup = event.bottles.map(id => products.find(p => p.id === id)).filter(Boolean);
  const total = lineup.reduce((sum, p) => sum + priceOf(p!), 0);
  return <article id={event.id} className={styles.event}>
    <div className={styles.eventPhoto}><Image src={event.image} alt="" fill sizes="(max-width: 700px) 100vw, 45vw" quality={80} priority={event.id === tastings[0].id} /><DateTile date={event.date} /></div>
    <div className={styles.eventBody}>
      <p className={styles.when}>{eventLong(event.date)} · {event.time}</p>
      <h2>{event.title} <em>{event.emphasis}</em></h2>
      <p className={styles.eventText}>{event.description}</p>
      <div className={styles.lineup}><h3>On the table</h3><ul>{event.bottles.map(id => <LineupBottle key={id} id={id} />)}</ul>
        <button className={styles.addAll} data-added={added} onClick={() => { event.bottles.forEach(id => add(id)); flash(); }}>{added ? "Lineup added to your bag" : <>Add the whole lineup · {money(total)}</>}<Icon name={added ? "bag" : "plus"} width="16" height="16" /></button>
      </div>
      <div className={styles.eventActions}><a href={EVENTS_URL} className="btn">Reserve your spot <Icon name="arrow" width="18" /></a><span><Icon name="pin" width="15" height="15" />In store at 1450 Washington St</span></div>
    </div>
  </article>;
}

export function TastingsPage() {
  return <div className={`container ${styles.page}`}>
    <nav className={styles.crumbs} aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><span>Wine tastings</span></nav>
    <header className={styles.pageHead}>
      <h1>Taste it first. <em>Then take it home.</em></h1>
      <p>Our tastings are a relaxed way to try before you buy: a few bottles open on the counter, the people who chose them, and plenty of time for questions. Every bottle poured is on the shelf, so your favorite can come home with you.</p>
      <p className={styles.sample}>Sample tasting calendar. Dates and lineups are illustrative; reserve on our <a href={EVENTS_URL}>live events page</a> for current tastings.</p>
    </header>
    <div className={styles.events}>{tastings.map(e => <TastingEvent key={e.id} event={e} />)}</div>
  </div>;
}
