// Mock shop taxonomy: per-product filter attributes and the mega-menu structure.
// Attributes are illustrative until a real inventory feed supplies them.
export type Attrs = { type: string; style?: string; varietal?: string; country?: string; state?: string; region?: string; subRegion?: string; vintage?: string; isNew?: boolean };

export const attrs: Record<string, Attrs> = {
  "mazzei-ser-lapo-chianti-classico-riserva-2020-750-ml": { type: "Wine", style: "Red", varietal: "Sangiovese", country: "Italy", region: "Tuscany", subRegion: "Chianti Classico", vintage: "2020" },
  "justin-chardonnay-2023-750-ml": { type: "Wine", style: "White", varietal: "Chardonnay", country: "United States", state: "California", region: "Paso Robles", vintage: "2023", isNew: true },
  "saint-aix-aix-rose-2025-750-ml": { type: "Wine", style: "Rosé & Blush", varietal: "Rosé", country: "France", region: "Provence", subRegion: "Coteaux d’Aix-en-Provence", vintage: "2025", isNew: true },
  "cupcake-vineyards-prosecco-750-ml": { type: "Wine", style: "Champagne & Sparkling", varietal: "Glera", country: "Italy", region: "Veneto" },
  "belching-beaver-peanut-butter-milk-stout": { type: "Beer", varietal: "Stout", country: "United States", state: "California" },
  "alvarado-street-mai-tai-pa-tropical-ipa": { type: "Beer", varietal: "IPA", country: "United States", state: "California" },
  "prairie-sweet-heat-sour": { type: "Beer", varietal: "Ale", country: "United States", state: "Oklahoma" },
  "other-half-nectar-diamonds-double-dry-hopped-ipa": { type: "Beer", varietal: "IPA", country: "United States", state: "New York", isNew: true },
  "fortaleza-blanco-tequila": { type: "Spirits", varietal: "Tequila", country: "Mexico", region: "Jalisco" },
  "black-maple-hill-oregon-bourbon-whiskey": { type: "Spirits", varietal: "Whiskey", country: "United States", state: "Oregon" },
  "accompani-crimson-snap-amaro": { type: "Spirits", varietal: "Liqueur", country: "United States" },
  "humboldt-distillery-vodka": { type: "Spirits", varietal: "Vodka", country: "United States", state: "California" },
  "old-fashioned": { type: "Ready to drink", varietal: "Cocktail", country: "United States" },
  "margarita": { type: "Ready to drink", varietal: "Cocktail", country: "United States" },
  "negroni": { type: "Ready to drink", varietal: "Cocktail", country: "United States" },
  "espresso-martini": { type: "Ready to drink", varietal: "Cocktail", country: "United States", isNew: true },
};

export const FACETS = [
  { key: "type", label: "Type" },
  { key: "style", label: "Wine style" },
  { key: "varietal", label: "Varietal & style" },
  { key: "country", label: "Country" },
  { key: "state", label: "State" },
  { key: "region", label: "Region" },
  { key: "subRegion", label: "Sub region" },
  { key: "vintage", label: "Vintage" },
] as const;
export type FacetKey = (typeof FACETS)[number]["key"];

export const PRICE_BANDS: [number, number, string][] = [[0, 15, "$0 to $15"], [15, 30, "$15 to $30"], [30, 60, "$30 to $60"], [60, 100, "$60 to $100"]];

// Shelves that exist in the menu but not yet in the mock catalog.
export const collections: Record<string, { title: string; text: string }> = {
  natural: { title: "Natural wine", text: "Low-intervention bottles are on their way to this preview. Ask us in store for today’s natural picks." },
  "non-alcoholic": { title: "Non-alcoholic", text: "Alcohol-free wine, beer and spirits are coming to this preview soon." },
  "gift-cards": { title: "eGift cards", text: "Digital gift cards will be available here once checkout is connected. Until then, gift cards are available in store." },
  cigars: { title: "Cigars", text: "Our cigar selection is available through the live store. Take a look or stop by Washington Street." },
};

export const shopHref = (params: Record<string, string>) => `/shop?${new URLSearchParams(params)}`;

type NavLink = { label: string; href: string };
export type NavItem = { id: string; label: string; href: string; intro?: string; groups?: { title: string; links: NavLink[] }[]; featured?: string; deal?: boolean };

const wine = (extra: Record<string, string>) => shopHref({ type: "Wine", ...extra });
const links = (key: string, values: string[], base: Record<string, string>) => values.map(v => ({ label: v, href: shopHref({ ...base, [key]: v }) }));

export const navMenu: NavItem[] = [
  { id: "wine", label: "Wine", href: wine({}), intro: "From weeknight reds to bottles worth saving.", deal: true, groups: [
    { title: "By style", links: [...links("style", ["Red", "White", "Rosé & Blush", "Champagne & Sparkling", "Dessert & Port"], { type: "Wine" }), { label: "Other wines", href: wine({ style: "Other" }) }] },
    { title: "By varietal", links: [...links("varietal", ["Cabernet Sauvignon", "Chardonnay", "Sauvignon Blanc", "Red Blends", "Pinot Noir", "Pinot Grigio"], { type: "Wine" }), { label: "Rosé", href: wine({ varietal: "Rosé" }) }] },
    { title: "By country", links: links("country", ["France", "Italy", "Spain", "Germany", "Argentina", "United States", "New Zealand"], { type: "Wine" }) },
    { title: "By region", links: links("region", ["Bordeaux", "Tuscany", "Rioja", "Burgundy", "Napa Valley"], { type: "Wine" }) },
    { title: "Explore", links: [{ label: "New arrivals", href: wine({ new: "1" }) }, { label: "On sale", href: wine({ sale: "1" }) }, { label: "Non-alcoholic wine", href: shopHref({ collection: "non-alcoholic" }) }, { label: "All wine", href: wine({}) }] },
  ] },
  { id: "beer", label: "Beer", href: shopHref({ type: "Beer" }), intro: "Independent minds. Very good brews.", featured: "beer", groups: [
    { title: "By type", links: links("varietal", ["IPA", "Hard Seltzer", "Ale", "Lager", "Pilsner", "Stout"], { type: "Beer" }) },
    { title: "Explore", links: [{ label: "Kane Brewing Co.", href: shopHref({ type: "Beer", brand: "Kane Brewing Co." }) }, { label: "New arrivals", href: shopHref({ type: "Beer", new: "1" }) }, { label: "Non-alcoholic beer", href: shopHref({ collection: "non-alcoholic" }) }, { label: "All beer", href: shopHref({ type: "Beer" }) }] },
  ] },
  { id: "spirits", label: "Spirits", href: shopHref({ type: "Spirits" }), intro: "For your bar cart and your next great cocktail.", featured: "spirits", groups: [
    { title: "By type", links: links("varietal", ["Vodka", "Whiskey", "Sake", "Tequila", "Rum", "Gin", "Brandy", "Liqueur"], { type: "Spirits" }) },
    { title: "By country", links: links("country", ["United States", "France", "Ireland", "Japan", "Italy", "Mexico"], { type: "Spirits" }) },
    { title: "Explore", links: [{ label: "New arrivals", href: shopHref({ type: "Spirits", new: "1" }) }, { label: "On sale", href: shopHref({ type: "Spirits", sale: "1" }) }, { label: "Non-alcoholic spirits", href: shopHref({ collection: "non-alcoholic" }) }, { label: "All spirits", href: shopHref({ type: "Spirits" }) }] },
  ] },
  { id: "cigars", label: "Cigars", href: shopHref({ collection: "cigars" }) },
  { id: "natural", label: "Natural Wine", href: shopHref({ collection: "natural" }) },
  { id: "alternative", label: "Alternative Beverages", href: shopHref({ type: "Ready to drink" }) },
  { id: "non-alcoholic", label: "Non-Alcoholic", href: shopHref({ collection: "non-alcoholic" }) },
  { id: "gift-cards", label: "eGift Cards", href: shopHref({ collection: "gift-cards" }) },
  { id: "events", label: "Events", href: "/tastings" },
];
