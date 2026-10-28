import type { MetadataRoute } from "next";
import { products } from "@/lib/catalog";
import { wines } from "@/lib/wines";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/shop", "/gift-cards", "/vineyards", "/tastings", "/about", "/delivery", "/shipping", "/privacy", "/terms", ...products.map(p => `/products/${p.id}`), ...wines.map(w => `/wines/${w.slug}`)];
  return routes.map(route => ({ url: `${siteUrl}${route}`, priority: route === "" ? 1 : route === "/shop" ? 0.9 : 0.6 }));
}
