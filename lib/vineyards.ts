// Producers on our shelves, grouped by where their wine is grown.
// Copy is written as the shop's impressions of each place and style; no founding dates or awards are claimed.
export type Vineyard = {
  id: string;
  producer: string;
  region: string;
  country: string;
  image: string;
  position?: string;
  lede: string;
  story: string;
  facts: [string, string][];
  products: string[];
};

export const vineyards: Vineyard[] = [
  {
    id: "mazzei",
    producer: "Mazzei",
    region: "Tuscany",
    country: "Italy",
    image: "/images/stock/vineyard-tuscany.jpg",
    position: "center 78%",
    lede: "Sangiovese from the hills of Chianti Classico.",
    story: "Cypress-lined roads, old stone and slopes of Sangiovese: the Chianti Classico hills between Florence and Siena are where Tuscan red finds its savory, cherry-bright voice. Mazzei’s Ser Lapo is the bottle we reach for when someone asks for a real Italian red.",
    facts: [["Region", "Chianti Classico, Tuscany"], ["Signature grape", "Sangiovese"], ["Style", "Savory, structured red"]],
    products: ["mazzei-ser-lapo-chianti-classico-riserva-2020-750-ml"],
  },
  {
    id: "aix",
    producer: "AIX",
    region: "Provence",
    country: "France",
    image: "/images/stock/vineyard-provence.jpg",
    position: "center 55%",
    lede: "Pale, dry rosé from the south of France.",
    story: "Sun, sea breeze and the scent of garrigue: Provence has made pale, dry rosé its signature. AIX is crisp and mineral, with wild strawberry and a clean, salty finish, a bottle that turns an ordinary evening into a long one.",
    facts: [["Region", "Coteaux d’Aix-en-Provence"], ["Grapes", "Grenache, Cinsault, Syrah"], ["Style", "Dry Provence rosé"]],
    products: ["saint-aix-aix-rose-2025-750-ml"],
  },
  {
    id: "justin",
    producer: "Justin",
    region: "California",
    country: "United States",
    image: "/images/stock/vineyard-california.jpg",
    position: "center 65%",
    lede: "Sunny, generous wines from California’s Central Coast.",
    story: "Warm days, cool nights and rolling hills give Central Coast wines their ripe fruit and easy generosity. Justin’s Chardonnay is round and golden, with baked apple, pear and a touch of toast.",
    facts: [["Region", "Central Coast, California"], ["Signature grape", "Chardonnay"], ["Style", "Round, barrel-touched white"]],
    products: ["justin-chardonnay-2023-750-ml"],
  },
  {
    id: "cupcake",
    producer: "Cupcake Vineyards",
    region: "Veneto",
    country: "Italy",
    image: "/images/stock/vineyard-veneto.jpg",
    position: "center 55%",
    lede: "Prosecco from the green hills of northeastern Italy.",
    story: "Prosecco is grown on the steep, green hills of the Veneto, where the Glera grape makes bright, frothy sparkling wine for toasts, brunches and spritzes. Light on its feet and easy to love.",
    facts: [["Region", "Veneto, Italy"], ["Signature grape", "Glera"], ["Style", "Bright, frothy sparkling"]],
    products: ["cupcake-vineyards-prosecco-750-ml"],
  },
];
