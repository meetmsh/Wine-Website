// Sample product-page content: staff-style tasting impressions and safe, style-level specs.
// Exact ABV and vintage are intentionally omitted until confirmed against real inventory.
export type ProductDetails = {
  description: string;
  notes: { nose: string; palate: string; finish: string };
  profile: [string, number][];
  pairings: string[];
  specs: [string, string][];
  staffPick?: string;
};

const wineServe = (temp: string, glass: string): [string, string][] => [["Serve at", temp], ["Glass", glass]];

export const details: Record<string, ProductDetails> = {
  "mazzei-ser-lapo-chianti-classico-riserva-2020-750-ml": {
    description: "A Chianti Classico Riserva from a family that has farmed in Tuscany for generations. Structured enough for the Sunday roast, polished enough to open on a weeknight.",
    notes: { nose: "Sour cherry, violets and a little cedar.", palate: "Red fruit with fine, firm tannins and bright Tuscan acidity.", finish: "Savory and long, with a touch of spice." },
    profile: [["Body", 4], ["Tannin", 4], ["Acidity", 4], ["Sweetness", 1]],
    pairings: ["Bistecca or a good steak", "Wild mushroom pasta", "Aged pecorino", "Pizza night"],
    specs: [["Style", "Chianti Classico Riserva"], ["Grape", "Sangiovese-led"], ["Region", "Tuscany, Italy"], ["Size", "750 ml"], ...wineServe("60–65°F", "Large red wine glass")],
    staffPick: "The bottle we reach for when someone asks for “a real Italian red.” Give it 20 minutes in the glass.",
  },
  "justin-chardonnay-2023-750-ml": {
    description: "California Chardonnay with sunshine in it: ripe, round and generous, with enough freshness to keep you coming back for the next glass.",
    notes: { nose: "Baked apple, pear and a hint of vanilla.", palate: "Creamy texture with citrus lifting the ripe fruit.", finish: "Soft and lightly toasty." },
    profile: [["Body", 4], ["Oak", 3], ["Acidity", 3], ["Sweetness", 1]],
    pairings: ["Roast chicken", "Lobster rolls", "Creamy risotto", "Brie"],
    specs: [["Style", "Barrel-touched white"], ["Grape", "Chardonnay"], ["Region", "California"], ["Size", "750 ml"], ...wineServe("48–52°F", "White wine glass")],
  },
  "saint-aix-aix-rose-2025-750-ml": {
    description: "Pale, dry Provence rosé: the kind that turns a Tuesday into an occasion. Crisp, mineral and dangerously easy.",
    notes: { nose: "Wild strawberry, watermelon and white flowers.", palate: "Dry and delicate, with crunchy red fruit.", finish: "Clean and mineral, with a little salinity." },
    profile: [["Body", 2], ["Fruit", 3], ["Acidity", 4], ["Sweetness", 1]],
    pairings: ["Salade niçoise", "Grilled shrimp", "Charcuterie", "Goat cheese"],
    specs: [["Style", "Dry Provence rosé"], ["Grapes", "Grenache, Cinsault and Syrah"], ["Region", "Provence, France"], ["Size", "750 ml"], ...wineServe("45–50°F", "White wine glass")],
    staffPick: "Our house pour from the first warm day until well into fall. Buy two; the second one always goes faster.",
  },
  "cupcake-vineyards-prosecco-750-ml": {
    description: "Bright, frothy Prosecco for toasts, brunches and spritzes. Light on its feet and easy to love.",
    notes: { nose: "Green apple, pear and honeysuckle.", palate: "Lively bubbles with crisp citrus and a soft fruity middle.", finish: "Fresh and gently off-dry." },
    profile: [["Body", 2], ["Bubbles", 4], ["Acidity", 3], ["Sweetness", 2]],
    pairings: ["Brunch", "Aperol spritz", "Prosciutto and melon", "Fried snacks"],
    specs: [["Style", "Sparkling"], ["Grape", "Glera"], ["Region", "Veneto, Italy"], ["Size", "750 ml"], ...wineServe("40–45°F", "Flute or white wine glass")],
  },
  "belching-beaver-peanut-butter-milk-stout": {
    description: "Dessert in a can: a smooth milk stout with roasted malt and a big, nutty peanut butter character.",
    notes: { nose: "Roasted peanuts, cocoa and coffee.", palate: "Silky and sweet-leaning, like a peanut butter cup.", finish: "Roasty, with lingering chocolate." },
    profile: [["Body", 4], ["Bitterness", 2], ["Roast", 4], ["Sweetness", 3]],
    pairings: ["Burgers", "BBQ ribs", "Chocolate desserts", "Vanilla ice cream"],
    specs: [["Style", "Milk stout"], ["Brewery", "Belching Beaver, California"], ["Size", "12 oz can"], ["Serve at", "45–50°F"], ["Glass", "Pint or tulip"]],
  },
  "alvarado-street-mai-tai-pa-tropical-ipa": {
    description: "A tropical, juicy IPA that leans into its tiki name, bursting with island fruit and a soft bitterness.",
    notes: { nose: "Mango, pineapple and citrus zest.", palate: "Juicy tropical fruit over a light malt base.", finish: "Clean, with gentle hop bitterness." },
    profile: [["Body", 3], ["Bitterness", 3], ["Hops", 4], ["Sweetness", 2]],
    pairings: ["Fish tacos", "Thai curry", "Poke bowls", "Spicy wings"],
    specs: [["Style", "Tropical IPA"], ["Brewery", "Alvarado Street, California"], ["Size", "16 oz can"], ["Serve at", "40–45°F"], ["Glass", "Pint or tulip"]],
  },
  "prairie-sweet-heat-sour": {
    description: "A fruited sour with a playful twist: ripe fruit up front and a gentle warmth from chili behind it.",
    notes: { nose: "Apricot, tart citrus and a hint of pepper.", palate: "Tangy and fruity, with a soft kick of heat.", finish: "Bright and refreshing." },
    profile: [["Body", 2], ["Tartness", 4], ["Heat", 2], ["Sweetness", 2]],
    pairings: ["Ceviche", "Tacos al pastor", "Fresh goat cheese", "Salty snacks"],
    specs: [["Style", "Fruited sour"], ["Brewery", "Prairie Artisan Ales, Oklahoma"], ["Size", "12 oz can"], ["Serve at", "40–45°F"], ["Glass", "Tulip or stemmed glass"]],
  },
  "other-half-nectar-diamonds-double-dry-hopped-ipa": {
    description: "Hazy, double dry-hopped IPA from one of New York’s most talked-about breweries. Soft, juicy and loaded with aroma.",
    notes: { nose: "Peach, orange and fresh-cut hops.", palate: "Pillowy and juicy, with ripe stone fruit.", finish: "Soft, with a gentle resinous bite." },
    profile: [["Body", 3], ["Bitterness", 2], ["Hops", 5], ["Haze", 4]],
    pairings: ["Spicy fried chicken", "Banh mi", "Sharp cheddar", "Pizza"],
    specs: [["Style", "Double dry-hopped IPA"], ["Brewery", "Other Half, New York"], ["Size", "16 oz can"], ["Serve at", "40–45°F"], ["Glass", "Tulip or teku"]],
    staffPick: "Hazy IPA fans keep coming back for this one. Drink it fresh and cold.",
  },
  "fortaleza-blanco-tequila": {
    description: "Traditionally made blanco tequila with a cult following: cooked agave, citrus and a texture worth sipping neat.",
    notes: { nose: "Cooked agave, lime and cracked pepper.", palate: "Sweet agave, olive brine and a buttery texture.", finish: "Long, peppery and clean." },
    profile: [["Intensity", 3], ["Agave", 5], ["Spice", 3], ["Sweetness", 2]],
    pairings: ["Sip neat with orange", "A classic margarita", "Grilled fish tacos", "Ceviche"],
    specs: [["Style", "Blanco tequila"], ["Base", "100% blue agave"], ["Region", "Jalisco, Mexico"], ["Size", "750 ml"], ["Serve", "Neat, or in a margarita"], ["Glass", "Copita or rocks glass"]],
    staffPick: "If you think you don’t like tequila, start here. Sip it neat once before you mix it.",
  },
  "black-maple-hill-oregon-bourbon-whiskey": {
    description: "A small-batch bourbon with rich caramel and oak, made for slow sipping or a seriously good Old Fashioned.",
    notes: { nose: "Caramel, toasted oak and orange peel.", palate: "Honeyed corn sweetness with baking spice.", finish: "Warm, with lingering vanilla and pepper." },
    profile: [["Intensity", 4], ["Oak", 4], ["Spice", 3], ["Sweetness", 3]],
    pairings: ["Old Fashioned", "Smoked brisket", "Dark chocolate", "Pecan pie"],
    specs: [["Style", "Bourbon whiskey"], ["Base", "Corn-led mash"], ["Region", "Oregon"], ["Size", "750 ml"], ["Serve", "Neat, one large cube, or stirred"], ["Glass", "Rocks or Glencairn"]],
  },
  "accompani-crimson-snap-amaro": {
    description: "A bittersweet botanical amaro with ruby-red color and a bright, zesty edge. A natural for spritzes and Negronis.",
    notes: { nose: "Blood orange, rhubarb and herbs.", palate: "Bittersweet citrus with gentle botanical depth.", finish: "Pleasantly bitter and refreshing." },
    profile: [["Bitterness", 4], ["Citrus", 4], ["Herbal", 3], ["Sweetness", 3]],
    pairings: ["Spritz with soda", "Negroni twist", "After dinner, over ice", "Salty olives"],
    specs: [["Style", "Botanical amaro"], ["Base", "Botanical infusion"], ["Size", "750 ml"], ["Serve", "Over ice or in a spritz"], ["Glass", "Rocks or wine glass"]],
  },
  "humboldt-distillery-vodka": {
    description: "Clean, smooth organic vodka from Northern California, made for martinis that taste of something.",
    notes: { nose: "Clean grain with a hint of citrus.", palate: "Smooth and soft, with a light, rounded sweetness.", finish: "Crisp and clean." },
    profile: [["Intensity", 2], ["Smoothness", 4], ["Spice", 1], ["Sweetness", 2]],
    pairings: ["Dirty martini", "Vodka soda with lime", "Oysters", "Smoked salmon"],
    specs: [["Style", "Organic vodka"], ["Region", "California"], ["Size", "750 ml"], ["Serve", "Ice-cold, or in a martini"], ["Glass", "Martini or rocks glass"]],
  },
  "old-fashioned": {
    description: "A bar-quality Old Fashioned, measured and ready. Pour over a big cube, add an orange twist, and you’re done.",
    notes: { nose: "Orange peel, bitters and warm whiskey.", palate: "Rich and balanced, sweet and spirit-forward.", finish: "Smooth, with a whisper of spice." },
    profile: [["Strength", 4], ["Sweetness", 2], ["Bitterness", 2], ["Citrus", 2]],
    pairings: ["Steak night", "Salted nuts", "Dark chocolate", "Fireside evenings"],
    specs: [["Style", "Ready-to-drink cocktail"], ["Contents", "8 × 100 ml"], ["Serve", "Over one large ice cube"], ["Garnish", "Orange twist"], ["Glass", "Rocks glass"]],
  },
  "margarita": {
    description: "A bright, tart margarita without the squeezing. Shake with ice or pour over the rocks.",
    notes: { nose: "Fresh lime and agave.", palate: "Tart citrus balanced by soft sweetness.", finish: "Crisp and refreshing." },
    profile: [["Strength", 3], ["Sweetness", 2], ["Tartness", 4], ["Citrus", 4]],
    pairings: ["Tacos", "Chips and guacamole", "Grilled shrimp", "Sunny afternoons"],
    specs: [["Style", "Ready-to-drink cocktail"], ["Contents", "8 × 100 ml"], ["Serve", "Shaken or on the rocks"], ["Garnish", "Lime wheel, salt rim"], ["Glass", "Rocks glass"]],
  },
  "negroni": {
    description: "The classic bittersweet aperitivo, perfectly balanced. Pour over ice and add an orange slice.",
    notes: { nose: "Orange, juniper and bitter herbs.", palate: "Equal parts bitter, sweet and botanical.", finish: "Long and bittersweet." },
    profile: [["Strength", 4], ["Sweetness", 2], ["Bitterness", 4], ["Herbal", 3]],
    pairings: ["Aperitivo snacks", "Olives", "Salumi", "Parmesan"],
    specs: [["Style", "Ready-to-drink cocktail"], ["Contents", "8 × 100 ml"], ["Serve", "Over ice"], ["Garnish", "Orange slice"], ["Glass", "Rocks glass"]],
  },
  "espresso-martini": {
    description: "Rich coffee, smooth vodka and a little sweetness. Shake hard with ice for that signature foam.",
    notes: { nose: "Freshly brewed espresso and cocoa.", palate: "Bold coffee with a smooth, sweet middle.", finish: "Roasty and velvety." },
    profile: [["Strength", 3], ["Sweetness", 3], ["Coffee", 5], ["Bitterness", 2]],
    pairings: ["Dessert", "Tiramisu", "After-dinner", "Late nights"],
    specs: [["Style", "Ready-to-drink cocktail"], ["Contents", "8 × 100 ml"], ["Serve", "Shaken hard with ice"], ["Garnish", "Three coffee beans"], ["Glass", "Coupe"]],
  },
};
