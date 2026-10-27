"use client";

import { useCellar } from "./CellarProvider";
import { Arrow } from "./Arrow";

export function AddToCellar({ slug, price, className }: { slug: string; price: number; className?: string }) {
  const { add, items } = useCellar();
  const inCellar = items[slug] ?? 0;

  return (
    <button className={["btn", className].filter(Boolean).join(" ")} onClick={() => add(slug)}>
      Add to cellar — £{price}
      {inCellar > 0 ? <span style={{ opacity: 0.6 }}>({inCellar})</span> : <Arrow />}
    </button>
  );
}
