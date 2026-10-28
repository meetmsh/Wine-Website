import type { Metadata } from "next";
import Link from "next/link";
import { InfoPage } from "@/components/InfoPage";

export const metadata: Metadata = { title: "About Uncorked", description: "Uncorked Wines & Spirits is Hoboken's neighborhood wine shop and wine bar at 1450 Washington Street." };

// Copy follows the store's own About page on uncorkedhoboken.com (retrieved 2026-10-27).
export default function Page() {
  return <InfoPage crumb="About" title="A wine shop," emphasis="and a wine bar." lede="Take a bottle home, or stay for a glass. Uncorked is Hoboken’s neighborhood wine shop and bar on Washington Street, with an extensive selection of quality wines and spirits."
    image="/images/hero1.jpg" imageAlt="Friends raising glasses of red wine"
    sections={[
      { title: "The shop",
        body: <p>Our shelves hold an extensive assortment of wine and spirits, alongside craft beer, ready-to-drink cocktails and cigars. Stocking up for a wedding, planning a dinner party or just after a bottle for a quiet night in, we’ll help you find exactly what you’re looking for.</p> },
      { title: "Service first",
        body: <><p>Our business is built on service. Your complete satisfaction is our top priority, and our friendly, knowledgeable staff are here to help you choose the right bottle for any occasion.</p><p>Join us for a <Link href="/tastings">wine tasting</Link>, or <Link href="/vineyards">meet the vineyards</Link> behind the bottles on our shelves.</p></> },
    ]} />;
}
