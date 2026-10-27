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

export const banners: Banner[] = [];

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
