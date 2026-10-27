import type { Metadata } from "next";
import Link from "next/link";
import { InfoPage } from "@/components/InfoPage";

export const metadata: Metadata = { title: "About Uncorked", description: "Uncorked Wines & Spirits is a wine shop and wine bar at 1450 Washington Street, Hoboken, built on three principles: service, service and service." };

// Copy follows the store's own About page on uncorkedhoboken.com (retrieved 2026-10-27).
export default function Page() {
  return <InfoPage crumb="About" title="Service, service" emphasis="and service." lede="Uncorked Wines & Spirits is a neighborhood wine shop and wine bar on Washington Street in Hoboken, with an extensive selection of quality wines and spirits."
    image="/images/hero2.jpg" imageAlt="Red wine being poured at Uncorked"
    sections={[
      { title: "The shop", body: <><p>Our shelves hold an extensive assortment of wine and spirits, alongside craft beer, ready-to-drink cocktails and cigars. Whether you’re stocking up for a wedding, planning a dinner party or just want a bottle for a quiet night in, we’ll help you find exactly what you’re looking for.</p></> },
      { title: "The wine bar", body: <p>Stay for a glass. Our bar pours fine wines by the glass, cocktails and a big selection of beers on tap, including imports, so you can taste a favorite before you head home.</p> },
      { title: "How we work", body: <><p>Everything we do comes back to three principles: <b>service, service and service</b>. Your complete satisfaction is our top priority, and our friendly, knowledgeable staff are here to help you choose the right bottle for any occasion.</p><p>Join us for a <Link href="/tastings">wine tasting</Link>, or <Link href="/vineyards">meet the vineyards</Link> behind the bottles on our shelves.</p></> },
    ]} />;
}
