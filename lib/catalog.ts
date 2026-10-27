// Sample merchandising selection; prices are illustrative, not live store inventory.
export type Product = {
  id: string;
  name: string;
  brand: string;
  category: 'red' | 'white' | 'rose' | 'sparkling' | 'beer' | 'spirits' | 'rtd';
  detail: string;
  price: number;
  /** Sample sale price; when set, the card shows a Sale tag and the regular price struck through. */
  salePrice?: number;
  image: string;
  externalHref: string;
};

export const products: Product[] = [
    {
        "id":  "mazzei-ser-lapo-chianti-classico-riserva-2020-750-ml",
        "name":  "Ser Lapo Chianti Classico",
        "brand":  "Mazzei",
        "category":  "red",
        "detail":  "Tuscany, Italy · 750 ml",
        "price":  24.99,
        "salePrice":  19.99,
        "image":  "/images/products/mazzei-ser-lapo-chianti-classico-riserva-2020-750-ml.jpg",
        "externalHref":  "https://www.uncorkedhoboken.com/wine?tags=4zzuimnf76isv-red"
    },
    {
        "id":  "justin-chardonnay-2023-750-ml",
        "name":  "Chardonnay",
        "brand":  "Justin",
        "category":  "white",
        "detail":  "California · 750 ml",
        "price":  19.99,
        "image":  "/images/products/justin-chardonnay-2023-750-ml.png",
        "externalHref":  "https://www.uncorkedhoboken.com/wine?tags=4zzuimnf76it4-white"
    },
    {
        "id":  "saint-aix-aix-rose-2025-750-ml",
        "name":  "Provence Rosé",
        "brand":  "AIX",
        "category":  "rose",
        "detail":  "Provence, France · 750 ml",
        "price":  22.99,
        "salePrice":  18.99,
        "image":  "/images/products/saint-aix-aix-rose-2025-750-ml.png",
        "externalHref":  "https://www.uncorkedhoboken.com/wine?tags=4zzuimnf76ita-rose"
    },
    {
        "id":  "cupcake-vineyards-prosecco-750-ml",
        "name":  "Prosecco",
        "brand":  "Cupcake Vineyards",
        "category":  "sparkling",
        "detail":  "Veneto, Italy · 750 ml",
        "price":  14.99,
        "image":  "/images/products/cupcake-vineyards-prosecco-750-ml.jpg",
        "externalHref":  "https://www.uncorkedhoboken.com/wine?tags=4zzuimnf76itn-sparkling"
    },
    {
        "id":  "belching-beaver-peanut-butter-milk-stout",
        "name":  "Peanut Butter Milk Stout",
        "brand":  "Belching Beaver",
        "category":  "beer",
        "detail":  "Milk stout · 12 oz can",
        "price":  3.99,
        "image":  "/images/products/belching-beaver-peanut-butter-milk-stout.jpg",
        "externalHref":  "https://www.uncorkedhoboken.com/beer"
    },
    {
        "id":  "alvarado-street-mai-tai-pa-tropical-ipa",
        "name":  "Mai Tai Tropical IPA",
        "brand":  "Alvarado Street",
        "category":  "beer",
        "detail":  "Tropical IPA · 16 oz can",
        "price":  5.99,
        "image":  "/images/products/alvarado-street-mai-tai-pa-tropical-ipa.jpg",
        "externalHref":  "https://www.uncorkedhoboken.com/beer"
    },
    {
        "id":  "prairie-sweet-heat-sour",
        "name":  "Sweet Heat",
        "brand":  "Prairie Artisan Ales",
        "category":  "beer",
        "detail":  "Fruited sour · 12 oz can",
        "price":  5.49,
        "image":  "/images/products/prairie-sweet-heat-sour.jpg",
        "externalHref":  "https://www.uncorkedhoboken.com/beer"
    },
    {
        "id":  "other-half-nectar-diamonds-double-dry-hopped-ipa",
        "name":  "Nectar Diamonds",
        "brand":  "Other Half",
        "category":  "beer",
        "detail":  "Double dry hopped IPA · 16 oz can",
        "price":  6.99,
        "image":  "/images/products/other-half-nectar-diamonds-double-dry-hopped-ipa.jpg",
        "externalHref":  "https://www.uncorkedhoboken.com/beer"
    },
    {
        "id":  "fortaleza-blanco-tequila",
        "name":  "Blanco Tequila",
        "brand":  "Fortaleza",
        "category":  "spirits",
        "detail":  "Jalisco, Mexico · 750 ml",
        "price":  69.99,
        "image":  "/images/products/fortaleza-blanco-tequila.jpg",
        "externalHref":  "https://www.uncorkedhoboken.com/spirits"
    },
    {
        "id":  "black-maple-hill-oregon-bourbon-whiskey",
        "name":  "Oregon Bourbon",
        "brand":  "Black Maple Hill",
        "category":  "spirits",
        "detail":  "Oregon · 750 ml",
        "price":  59.99,
        "salePrice":  49.99,
        "image":  "/images/products/black-maple-hill-oregon-bourbon-whiskey.jpg",
        "externalHref":  "https://www.uncorkedhoboken.com/spirits"
    },
    {
        "id":  "accompani-crimson-snap-amaro",
        "name":  "Crimson Snap Amaro",
        "brand":  "Accompani",
        "category":  "spirits",
        "detail":  "Botanical amaro · 750 ml",
        "price":  32.99,
        "image":  "/images/products/accompani-crimson-snap-amaro.jpg",
        "externalHref":  "https://www.uncorkedhoboken.com/spirits"
    },
    {
        "id":  "humboldt-distillery-vodka",
        "name":  "Organic Vodka",
        "brand":  "Humboldt Distillery",
        "category":  "spirits",
        "detail":  "California · 750 ml",
        "price":  24.99,
        "image":  "/images/products/humboldt-distillery-vodka.jpg",
        "externalHref":  "https://www.uncorkedhoboken.com/spirits"
    },
    {
        "id":  "old-fashioned",
        "name":  "Old Fashioned",
        "brand":  "Tip Top",
        "category":  "rtd",
        "detail":  "Ready to pour · 8 × 100 ml",
        "price":  39.99,
        "salePrice":  34.99,
        "image":  "/images/products/old-fashioned.png",
        "externalHref":  "https://www.uncorkedhoboken.com/ready-to-drink"
    },
    {
        "id":  "margarita",
        "name":  "Margarita",
        "brand":  "Tip Top",
        "category":  "rtd",
        "detail":  "Ready to pour · 8 × 100 ml",
        "price":  39.99,
        "image":  "/images/products/margarita.png",
        "externalHref":  "https://www.uncorkedhoboken.com/ready-to-drink"
    },
    {
        "id":  "negroni",
        "name":  "Negroni",
        "brand":  "Tip Top",
        "category":  "rtd",
        "detail":  "Ready to pour · 8 × 100 ml",
        "price":  39.99,
        "image":  "/images/products/negroni.png",
        "externalHref":  "https://www.uncorkedhoboken.com/ready-to-drink"
    },
    {
        "id":  "espresso-martini",
        "name":  "Espresso Martini",
        "brand":  "Tip Top",
        "category":  "rtd",
        "detail":  "Ready to pour · 8 × 100 ml",
        "price":  39.99,
        "image":  "/images/products/espresso-martini.png",
        "externalHref":  "https://www.uncorkedhoboken.com/ready-to-drink"
    }
];
