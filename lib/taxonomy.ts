// Mock shop taxonomy: per-product filter attributes and the mega-menu structure.
// Attributes are illustrative until a real inventory feed supplies them.
export type Attrs = { type: string; vineyard?: string; style?: string; varietal?: string; country?: string; state?: string; region?: string; subRegion?: string; vintage?: string; isNew?: boolean };

export const attrs: Record<string, Attrs> = {
  "mazzei-ser-lapo-chianti-classico-riserva-2020-750-ml": { type: "Wine", vineyard: "Mazzei", style: "Red", varietal: "Sangiovese", country: "Italy", region: "Tuscany", subRegion: "Chianti Classico", vintage: "2020" },
  "justin-chardonnay-2023-750-ml": { type: "Wine", vineyard: "Justin", style: "White", varietal: "Chardonnay", country: "United States", state: "California", region: "Paso Robles", vintage: "2023", isNew: true },
  "saint-aix-aix-rose-2025-750-ml": { type: "Wine", vineyard: "AIX", style: "Rosé & Blush", varietal: "Rosé", country: "France", region: "Provence", subRegion: "Coteaux d’Aix-en-Provence", vintage: "2025", isNew: true },
  "cupcake-vineyards-prosecco-750-ml": { type: "Wine", vineyard: "Cupcake Vineyards", style: "Champagne & Sparkling", varietal: "Glera", country: "Italy", region: "Veneto" },
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
  { key: "vineyard", label: "Vineyard" },
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

// Main menu: wine leads with a panel per style, then spirits, beer, ready to drink, cigars and gift cards.
const wineStyle = (style: string, extra: Record<string, string> = {}) => wine({ style, ...extra });
export const navMenu: NavItem[] = [
  { id: "red", label: "Red", href: wineStyle("Red"), intro: "Structured, generous, made for the table.", featured: "red", deal: true, groups: [
    { title: "Grapes", links: links("varietal", ["Cabernet Sauvignon", "Pinot Noir", "Sangiovese", "Merlot", "Malbec", "Red Blends"], { type: "Wine", style: "Red" }) },
    { title: "Regions", links: links("region", ["Tuscany", "Bordeaux", "Burgundy", "Napa Valley", "Rioja"], { type: "Wine", style: "Red" }) },
    { title: "Shop", links: [{ label: "On sale", href: wineStyle("Red", { sale: "1" }) }, { label: "New arrivals", href: wineStyle("Red", { new: "1" }) }, { label: "All red wine", href: wineStyle("Red") }] },
  ] },
  { id: "white", label: "White", href: wineStyle("White"), intro: "From crisp and mineral to round and golden.", featured: "white", deal: true, groups: [
    { title: "Grapes", links: links("varietal", ["Chardonnay", "Sauvignon Blanc", "Pinot Grigio", "Riesling", "Albariño"], { type: "Wine", style: "White" }) },
    { title: "Regions", links: links("region", ["Burgundy", "Loire Valley", "Napa Valley", "Paso Robles", "Marlborough"], { type: "Wine", style: "White" }) },
    { title: "Shop", links: [{ label: "On sale", href: wineStyle("White", { sale: "1" }) }, { label: "New arrivals", href: wineStyle("White", { new: "1" }) }, { label: "All white wine", href: wineStyle("White") }] },
  ] },
  { id: "rose", label: "Rosé", href: wineStyle("Rosé & Blush"), intro: "Pale, dry and made for every season.", featured: "rose", deal: true, groups: [
    { title: "Regions", links: links("region", ["Provence", "Loire Valley", "Tavel", "California"], { type: "Wine", style: "Rosé & Blush" }) },
    { title: "Shop", links: [{ label: "On sale", href: wineStyle("Rosé & Blush", { sale: "1" }) }, { label: "New arrivals", href: wineStyle("Rosé & Blush", { new: "1" }) }, { label: "All rosé", href: wineStyle("Rosé & Blush") }] },
  ] },
  { id: "sparkling", label: "Sparkling", href: wineStyle("Champagne & Sparkling"), intro: "For the toast, or just a Tuesday.", featured: "sparkling", deal: true, groups: [
    { title: "Styles", links: ["Champagne", "Prosecco", "Cava", "Crémant"].map(label => ({ label, href: wineStyle("Champagne & Sparkling", { q: label }) })) },
    { title: "Shop", links: [{ label: "On sale", href: wineStyle("Champagne & Sparkling", { sale: "1" }) }, { label: "All sparkling", href: wineStyle("Champagne & Sparkling") }] },
  ] },
  { id: "spirits", label: "Spirits", href: shopHref({ type: "Spirits" }), intro: "For your bar cart and your next great cocktail.", featured: "spirits", groups: [
    { title: "By type", links: links("varietal", ["Whiskey", "Tequila", "Vodka", "Gin", "Rum", "Liqueur"], { type: "Spirits" }) },
    { title: "Shop", links: [{ label: "On sale", href: shopHref({ type: "Spirits", sale: "1" }) }, { label: "New arrivals", href: shopHref({ type: "Spirits", new: "1" }) }, { label: "All spirits", href: shopHref({ type: "Spirits" }) }] },
  ] },
  { id: "beer", label: "Beer", href: shopHref({ type: "Beer" }), intro: "Independent minds. Very good brews.", featured: "beer", groups: [
    { title: "By type", links: links("varietal", ["IPA", "Lager", "Pilsner", "Stout", "Ale", "Hard Seltzer"], { type: "Beer" }) },
    { title: "Shop", links: [{ label: "New arrivals", href: shopHref({ type: "Beer", new: "1" }) }, { label: "All beer", href: shopHref({ type: "Beer" }) }] },
  ] },
  { id: "rtd", label: "Ready to drink", href: shopHref({ type: "Ready to drink" }) },
  { id: "cigars", label: "Cigars", href: shopHref({ collection: "cigars" }) },
  { id: "gift-cards", label: "eGift Cards", href: "/gift-cards" },
];
