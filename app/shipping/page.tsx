import type { Metadata } from "next";
import Link from "next/link";
import { InfoPage } from "@/components/InfoPage";
import { FREE_DELIVERY, money } from "@/lib/store";

export const metadata: Metadata = { title: "Shipping policy", description: "How to get your order from Uncorked Wines & Spirits: free local delivery over $40 in Hoboken and nearby, in-store pickup, and help with anything further afield." };

// The store has not published shipping terms; this page states only confirmed options and routes the rest to the shop.
export default function Page() {
  return <InfoPage crumb="Shipping policy" title="Getting it" emphasis="to you." lede="Most orders are picked up in store or delivered locally. For anything further afield, talk to us first."
    image="/images/stock/vineyard-veneto.jpg" imageAlt="Vineyard hills in the Veneto"
    sections={[
      { title: "Local delivery", image: "/images/stock/tasting-thanksgiving.jpg", imageAlt: "A table set for dinner with wine", position: "center 50%", body: <p>Free in Hoboken and nearby on orders over {money(FREE_DELIVERY)}. See our <Link href="/delivery">delivery policy</Link> for the details.</p> },
      { title: "In-store pickup", body: <p>Choose pickup at <Link href="/checkout">checkout</Link> and collect your order at 1450 Washington Street during opening hours.</p> },
      { title: "Beyond our area", body: <p>Shipping alcohol depends on the destination state’s laws. If you’d like a bottle sent outside our delivery area, call us at <a href="tel:+19083822133">(908) 382-2133</a> and we’ll let you know what’s possible.</p> },
      { title: "21+ only", body: <p>Alcohol is sold only to adults 21 and older. A valid photo ID is required at pickup and on delivery.</p> },
    ]} />;
}
