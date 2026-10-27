import { wines } from "./wines";
import { products, type Product } from "./catalog";

export const categories = [
  { id: "red", label: "Red", href: "/shop?category=red", live: "https://www.uncorkedhoboken.com/wine?tags=4zzuimnf76isv-red" },
  { id: "white", label: "White", href: "/shop?category=white", live: "https://www.uncorkedhoboken.com/wine?tags=4zzuimnf76it4-white" },
  { id: "rose", label: "Rosé", href: "/shop?category=rose", live: "https://www.uncorkedhoboken.com/wine?tags=4zzuimnf76ita-rose" },
  { id: "sparkling", label: "Sparkling", href: "/shop?category=sparkling", live: "https://www.uncorkedhoboken.com/wine?tags=4zzuimnf76itn-sparkling" },
  { id: "spirits", label: "Spirits", href: "/shop?category=spirits", live: "https://www.uncorkedhoboken.com/spirits" },
  { id: "beer", label: "Beer", href: "/shop?category=beer", live: "https://www.uncorkedhoboken.com/beer" },
  { id: "rtd", label: "Ready to drink", href: "/shop?category=rtd", live: "https://www.uncorkedhoboken.com/ready-to-drink" },
  { id: "cigars", label: "Cigars", href: "/shop?category=cigars", live: "https://www.uncorkedhoboken.com/products?collections=paffdmuvt4tzd-cigars" },
];
export const wineCategories: Product["category"][] = ["red", "white", "rose", "sparkling"];
export const fold = (text: string) => text.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();
// Word-start match, so "rose" finds Rosé but not Prosecco.
export const matches = (text: string, query: string) => { const q = fold(query.trim()); return !q || fold(text).split(/[^a-z0-9]+/).some((_, i, words) => words.slice(i).join(" ").startsWith(q)); };
export const money = (amount: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);
export const priceOf = (p: Pick<Product, "price" | "salePrice">) => p.salePrice ?? p.price;
export const onSale = (p: Pick<Product, "price" | "salePrice">) => p.salePrice !== undefined && p.salePrice < p.price;
export const storeItems = [
  ...products.map(p => ({ id: p.id, name: p.name, price: priceOf(p), was: onSale(p) ? p.price : undefined, wine: wineCategories.includes(p.category), image: p.image, detail: p.detail, href: `/products/${p.id}` })),
  ...wines.map(w => ({ id: w.slug, name: w.name, price: w.price, was: undefined, wine: true, image: "", detail: `${w.producer} · ${w.vintage}`, href: `/wines/${w.slug}` })),
];
export const getStoreItem = (id: string) => storeItems.find(p => p.id === id);

// Store-supplied delivery offer: free local delivery in Hoboken and nearby on orders of $40 or more.
export const FREE_DELIVERY = 40;
export const FREE_DELIVERY_LINE = "Free local delivery on orders over $40 in Hoboken and nearby";

// Loyalty: 1 point for every whole dollar spent, after discounts and before tax.
export const loyaltyPoints = (total: number) => Math.max(0, Math.floor(total));

// Mix-and-match case discount supplied by the store: the more bottles of wine, the bigger the saving.
// Only regular-priced wine counts toward the tiers and receives the discount; sale bottles are excluded.
export const WINE_TIERS = [{ bottles: 4, rate: 0.15 }, { bottles: 6, rate: 0.2 }, { bottles: 12, rate: 0.22 }];
export const percent = (rate: number) => `${Math.round(rate * 100)}%`;
export function wineDeal(items: Record<string, number>) {
  let bottles = 0, subtotal = 0;
  for (const [id, quantity] of Object.entries(items)) {
    const item = getStoreItem(id);
    if (!item?.wine || item.was) continue;
    bottles += quantity;
    subtotal += item.price * quantity;
  }
  const tier = [...WINE_TIERS].reverse().find(t => bottles >= t.bottles);
  const next = WINE_TIERS.find(t => bottles < t.bottles);
  return { bottles, tier, next, remaining: next ? next.bottles - bottles : 0, unlocked: Boolean(tier), discount: tier ? Math.round(subtotal * tier.rate * 100) / 100 : 0 };
}
