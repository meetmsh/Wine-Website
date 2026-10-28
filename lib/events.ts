// Sample tasting calendar; dates and lineups are illustrative until the live events feed is connected.
export type Tasting = {
  id: string;
  title: string;
  emphasis: string;
  date: string;
  time: string;
  description: string;
  image: string;
  bottles: string[];
};

export const EVENTS_URL = "https://www.uncorkedhoboken.com/events";

export const tastings: Tasting[] = [
  { id: "tuscan-reds", title: "An evening of", emphasis: "Tuscan reds", date: "2026-10-29", time: "6 – 8 pm", description: "A closer look at Chianti Classico, with Sangiovese, food-pairing ideas and time for your questions. Bring a friend.", image: "/images/stock/tasting-tuscan-reds.jpg", bottles: ["mazzei-ser-lapo-chianti-classico-riserva-2020-750-ml"] },
  { id: "bubbles-rose", title: "Bubbles &", emphasis: "rosé before the holidays", date: "2026-11-06", time: "6 – 8 pm", description: "Find your house sparkling before the party invitations arrive. Prosecco, Provence rosé and a few surprises on the counter.", image: "/images/stock/tasting-bubbles.jpg", bottles: ["cupcake-vineyards-prosecco-750-ml", "saint-aix-aix-rose-2025-750-ml"] },
  { id: "bourbon-amaro", title: "Bourbon &", emphasis: "amaro afternoon", date: "2026-11-14", time: "2 – 5 pm", description: "A slow Saturday pour through small-batch bourbon and a bittersweet amaro, with ideas for your next cocktail.", image: "/images/stock/tasting-bourbon.jpg", bottles: ["black-maple-hill-oregon-bourbon-whiskey", "accompani-crimson-snap-amaro"] },
  { id: "thanksgiving-table", title: "Wines for the", emphasis: "Thanksgiving table", date: "2026-11-19", time: "6 – 8 pm", description: "One white, one red, one sparkling: the short list that works with everything on the table, from turkey to pie.", image: "/images/stock/tasting-thanksgiving.jpg", bottles: ["justin-chardonnay-2023-750-ml", "mazzei-ser-lapo-chianti-classico-riserva-2020-750-ml", "cupcake-vineyards-prosecco-750-ml"] },
];

const at = (date: string) => new Date(`${date}T12:00:00-05:00`);
export const eventDay = (date: string) => at(date).toLocaleDateString("en-US", { day: "numeric", timeZone: "America/New_York" });
export const eventMonth = (date: string) => at(date).toLocaleDateString("en-US", { month: "short", timeZone: "America/New_York" });
export const eventWeekday = (date: string) => at(date).toLocaleDateString("en-US", { weekday: "long", timeZone: "America/New_York" });
export const eventLong = (date: string) => at(date).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", timeZone: "America/New_York" });
