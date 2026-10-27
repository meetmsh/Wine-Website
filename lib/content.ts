// Store-managed content. Today this is sample data; in production it is replaced by a POS feed
// with the same fields (see "Uncorked website: content your POS should control").

export type Banner = {
  id: string;
  placement: "home-top" | "home-mid" | "shop-top";
  eyebrow?: string;
  headline: string;
  emphasis?: string;
  body: string;
  cta: { label: string; href: string };
  image: string;
  theme: "night" | "wine" | "cream";
  picks?: string[];
  starts: string;
  ends: string;
  priority: number;
  active: boolean;
};

export const banners: Banner[] = [
  {
    id: "halloween-2026",
    placement: "home-top",
    eyebrow: "Through Saturday, Oct 31",
    headline: "Halloween,",
    emphasis: "uncorked.",
    body: "Blood-red wines, party-size picks and a few treats for the 31st. Stock up before the doorbell rings.",
    cta: { label: "Shop Halloween picks", href: "/shop?type=Wine&style=Red" },
    image: "/images/stock/halloween.jpg",
    theme: "night",
    picks: ["mazzei-ser-lapo-chianti-classico-riserva-2020-750-ml", "negroni", "espresso-martini"],
    starts: "2026-10-15T00:00:00-04:00",
    ends: "2026-10-31T23:59:59-04:00",
    priority: 10,
    active: true,
  },
];

// The banner shown in a placement right now: active, inside its dates, highest priority first.
export function bannerFor(placement: Banner["placement"], now = new Date()) {
  return banners
    .filter(b => b.active && b.placement === placement && new Date(b.starts) <= now && now <= new Date(b.ends))
    .sort((a, b) => b.priority - a.priority)[0];
}

// POS sales ranking (last 30 days, in stock), in display order. Sample order for now.
export const bestSellers: string[] = [
  "saint-aix-aix-rose-2025-750-ml",
  "mazzei-ser-lapo-chianti-classico-riserva-2020-750-ml",
  "fortaleza-blanco-tequila",
  "other-half-nectar-diamonds-double-dry-hopped-ipa",
  "justin-chardonnay-2023-750-ml",
  "espresso-martini",
  "black-maple-hill-oregon-bourbon-whiskey",
  "cupcake-vineyards-prosecco-750-ml",
];
export const bestSellerRank = (id: string) => { const i = bestSellers.indexOf(id); return i === -1 ? Infinity : i; };
