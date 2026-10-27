export type WineType = "red" | "white" | "orange" | "sparkling";
export type BottleShape = "bordeaux" | "burgundy" | "flute" | "champagne";

export type Wine = {
  slug: string;
  no: string;
  name: string;
  /** Short name printed on the bottle label */
  short: string;
  producer: string;
  region: string;
  country: string;
  grape: string;
  vintage: string;
  type: WineType;
  price: number;
  abv: number;
  notes: [string, string, string];
  description: string;
  soil: string;
  elevation: string;
  farming: string;
  production: string;
  drink: string;
  bottle: {
    shape: BottleShape;
    glass: string;
    capsule: string;
    label: string;
    ink: string;
  };
};

export const wines: Wine[] = [
  {
    slug: "les-cailloux-blancs",
    no: "01",
    name: "Les Cailloux Blancs",
    short: "Cailloux",
    producer: "Domaine Arnaud Vey",
    region: "Savennières, Loire",
    country: "France",
    grape: "Chenin Blanc",
    vintage: "2022",
    type: "white",
    price: 34,
    abv: 13,
    notes: ["Quince", "Wet stone", "Beeswax"],
    description:
      "From the oldest rows on a schist ridge above the river, fermented slowly in old 500-litre barrels. Taut and almost salty now, it will fill out over the next decade.",
    soil: "Blue schist, volcanic seams",
    elevation: "140 m",
    farming: "Biodynamic, uncertified",
    production: "4,200 bottles",
    drink: "2025 – 2034",
    bottle: { shape: "burgundy", glass: "#7D6B34", capsule: "#1B1614", label: "#F4EEE3", ink: "#1B1614" },
  },
  {
    slug: "terra-rossa-riserva",
    no: "02",
    name: "Terra Rossa Riserva",
    short: "Terra Rossa",
    producer: "Podere Lucignano",
    region: "Chianti Classico, Tuscany",
    country: "Italy",
    grape: "Sangiovese",
    vintage: "2019",
    type: "red",
    price: 48,
    abv: 14,
    notes: ["Sour cherry", "Dried rose", "Cedar"],
    description:
      "Thirty months in large Slavonian casks, never new oak. Grown on iron-red clay at the southern edge of Gaiole, picked a week later than the neighbours.",
    soil: "Galestro and red clay",
    elevation: "480 m",
    farming: "Certified organic",
    production: "6,800 bottles",
    drink: "2024 – 2036",
    bottle: { shape: "bordeaux", glass: "#2A0C12", capsule: "#7A1A2C", label: "#EDE4D3", ink: "#2A0C12" },
  },
  {
    slug: "skin-and-bone",
    no: "03",
    name: "Skin & Bone",
    short: "Skin & Bone",
    producer: "Marani Gelati",
    region: "Kakheti",
    country: "Georgia",
    grape: "Rkatsiteli",
    vintage: "2021",
    type: "orange",
    price: 29,
    abv: 12.5,
    notes: ["Apricot skin", "Black tea", "Walnut"],
    description:
      "Six months on skins in buried clay qvevri, the way the family has made it for four generations. Grippy, savoury and best with food rather than on its own.",
    soil: "Alluvial clay over limestone",
    elevation: "420 m",
    farming: "Organic, hand-harvested",
    production: "3,100 bottles",
    drink: "Now – 2029",
    bottle: { shape: "burgundy", glass: "#8E4A1C", capsule: "#D9C7A7", label: "#1B1614", ink: "#EADFC9" },
  },
  {
    slug: "blanc-de-craie",
    no: "04",
    name: "Blanc de Craie",
    short: "Craie",
    producer: "Champagne Hervé Lassalle",
    region: "Côte des Blancs, Champagne",
    country: "France",
    grape: "Chardonnay",
    vintage: "NV",
    type: "sparkling",
    price: 62,
    abv: 12,
    notes: ["Brioche", "Lemon pith", "Chalk"],
    description:
      "A grower Champagne with zero dosage, built on a solera of reserve wines going back to 2008. Five years on lees before disgorgement.",
    soil: "Belemnite chalk",
    elevation: "190 m",
    farming: "Organic in conversion",
    production: "9,000 bottles",
    drink: "Now – 2030",
    bottle: { shape: "champagne", glass: "#1F2B20", capsule: "#C9B27C", label: "#F6F1E7", ink: "#1F2B20" },
  },
  {
    slug: "old-vine-cinsault",
    no: "05",
    name: "Old Vine Cinsault",
    short: "Cinsault",
    producer: "Swartland Rows",
    region: "Swartland",
    country: "South Africa",
    grape: "Cinsault",
    vintage: "2021",
    type: "red",
    price: 26,
    abv: 12.5,
    notes: ["Wild strawberry", "Fynbos", "White pepper"],
    description:
      "Dry-farmed bush vines planted in 1968, whole-bunch fermented and bottled young. Light enough to chill, serious enough to keep.",
    soil: "Decomposed granite",
    elevation: "260 m",
    farming: "Dry-farmed, no irrigation",
    production: "5,400 bottles",
    drink: "Now – 2028",
    bottle: { shape: "bordeaux", glass: "#3A0F18", capsule: "#B08D57", label: "#E7D9C1", ink: "#3A0F18" },
  },
  {
    slug: "steillage-kabinett",
    no: "06",
    name: "Steillage Kabinett",
    short: "Steillage",
    producer: "Weingut Ehrenhof",
    region: "Mosel",
    country: "Germany",
    grape: "Riesling",
    vintage: "2023",
    type: "white",
    price: 27,
    abv: 8.5,
    notes: ["Green apple", "Slate", "Lime blossom"],
    description:
      "From a 65-degree slope worked entirely by hand. A whisper of sweetness held in place by electric acidity, and only eight and a half percent alcohol.",
    soil: "Grey Devonian slate",
    elevation: "210 m",
    farming: "Sustainable, hand-worked",
    production: "7,500 bottles",
    drink: "Now – 2040",
    bottle: { shape: "flute", glass: "#5E6B2E", capsule: "#2F4A6B", label: "#F4EEE3", ink: "#2F4A6B" },
  },
  {
    slug: "pet-nat-rose",
    no: "07",
    name: "Pét-Nat Rosé",
    short: "Pét-Nat",
    producer: "Clos des Merles",
    region: "Jura",
    country: "France",
    grape: "Poulsard",
    vintage: "2023",
    type: "sparkling",
    price: 24,
    abv: 11,
    notes: ["Redcurrant", "Blood orange", "Yeast"],
    description:
      "Bottled mid-fermentation under crown cap, so the bubbles are its own. Unfined, unfiltered and a little cloudy, the way it should be.",
    soil: "Marl and limestone",
    elevation: "330 m",
    farming: "Biodynamic, certified",
    production: "2,600 bottles",
    drink: "Now – 2026",
    bottle: { shape: "burgundy", glass: "#B86C6A", capsule: "#F1E7D6", label: "#5B1324", ink: "#F1E7D6" },
  },
  {
    slug: "gamay-vieilles-vignes",
    no: "08",
    name: "Gamay Vieilles Vignes",
    short: "Gamay V.V.",
    producer: "Domaine du Pré Brûlé",
    region: "Morgon, Beaujolais",
    country: "France",
    grape: "Gamay",
    vintage: "2022",
    type: "red",
    price: 31,
    abv: 13,
    notes: ["Black cherry", "Peony", "Iron"],
    description:
      "Ninety-year-old vines on the Côte du Py. Semi-carbonic, no added sulphur until bottling, and much more structure than people expect from Beaujolais.",
    soil: "Decomposed blue schist",
    elevation: "300 m",
    farming: "Organic, horse-ploughed",
    production: "4,900 bottles",
    drink: "2024 – 2032",
    bottle: { shape: "burgundy", glass: "#33101A", capsule: "#3B4A3A", label: "#F2E9DA", ink: "#33101A" },
  },
];

export function getWine(slug: string) {
  return wines.find((w) => w.slug === slug);
}

export const typeLabels: Record<WineType, string> = {
  red: "Red",
  white: "White",
  orange: "Orange",
  sparkling: "Sparkling",
};
