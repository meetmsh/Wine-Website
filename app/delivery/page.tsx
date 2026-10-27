import type { Metadata } from "next";
import Link from "next/link";
import { InfoPage } from "@/components/InfoPage";
import { FREE_DELIVERY, money } from "@/lib/store";

export const metadata: Metadata = { title: "Delivery policy", description: "Free local delivery from Uncorked Wines & Spirits on orders over $40 in Hoboken and nearby, or pick up in store at 1450 Washington Street." };

// Only owner-confirmed terms are stated (free delivery over $40, Hoboken and nearby, 21+).
// Zones, delivery windows and the fee under $40 are routed to a phone call until the store confirms them.
export default function Page() {
  return <InfoPage crumb="Delivery policy" title="Delivered," emphasis="from around the corner." lede={`Free local delivery on orders over ${money(FREE_DELIVERY)} in Hoboken and nearby, or pick up your order at the shop on Washington Street.`}
    image="/images/vineyard.jpg" imageAlt="Vineyard rows at golden hour"
    sections={[
      { title: "Free local delivery", image: "/images/stock/signup-rose-pour.jpg", imageAlt: "Rosé poured at a café table", position: "center 40%", body: <><p>Orders over <b>{money(FREE_DELIVERY)}</b> after discounts are delivered free in Hoboken and nearby. Your bag shows how close you are as you shop.</p><p>For orders under {money(FREE_DELIVERY)}, we’ll confirm any delivery fee with you before your order goes out.</p></> },
      { title: "Where we deliver", body: <p>We deliver throughout Hoboken and to nearby neighborhoods. Not sure if you’re in range? Call us at <a href="tel:+19083822133">(908) 382-2133</a> and we’ll tell you right away.</p> },
      { title: "21+ and ID", body: <ul><li>Every order must be placed by someone 21 or older.</li><li>Someone 21 or older with a valid photo ID must be present to receive the delivery.</li></ul> },
      { title: "Pick up in store", image: "/images/stock/varietal-chardonnay.jpg", imageAlt: "A glass of white wine", position: "center 45%", body: <p>Prefer to collect it yourself? Choose pickup at <Link href="/checkout">checkout</Link> and come by during opening hours. Please bring a valid photo ID.</p> },
      { title: "Questions", body: <p>For delivery times, changes to an order or anything else, call the shop at <a href="tel:+19083822133">(908) 382-2133</a>.</p> },
    ]} />;
}
