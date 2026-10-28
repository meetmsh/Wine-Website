import type { Metadata } from "next";
import Link from "next/link";
import { InfoPage } from "@/components/InfoPage";

export const metadata: Metadata = { title: "Shopping information", description: "What to expect when browsing, requesting an order or arranging a gift with Uncorked." };
export default function ShoppingInformationPage() {
  return <InfoPage crumb="Shopping information" title="A few details," emphasis="before you order." lede="A clear guide to this website’s current shopping services. Contact the shop to confirm purchase-specific terms."
    sections={[
      { title: "The preview catalog", body: <p>The selection, prices and tasting calendar on this website are illustrative. Confirm current stock, prices and event details with the shop before purchasing or making plans.</p> },
      { title: "Order requests", body: <p>Submitting an online order request does not charge a card or confirm that an item is in stock. The shop confirms availability, the final price, payment and collection or delivery details. When online requests are unavailable, call <a href="tel:+19083822133">(908) 382-2133</a>.</p> },
      { title: "Delivery and pickup", body: <p>See our <Link href="/delivery">delivery information</Link> and <Link href="/shipping">shipping information</Link>. Delivery eligibility, timing and any applicable fee are confirmed by the shop.</p> },
      { title: "Gift cards", body: <p>Online gift-card purchases are available only when the gift-card service is connected. Payment and issuance must be confirmed by the provider. Ask the shop about redemption, expiry, returns and cancellations before purchasing.</p> },
      { title: "21+ and valid ID", body: <p>Anyone placing, collecting or receiving an alcohol order must be 21 or older. A valid photo ID is required at pickup and delivery.</p> },
      { title: "Changes and questions", body: <p>For current purchase terms, a change to a request, or questions about returns and cancellations, contact the shop at <a href="tel:+19083822133">(908) 382-2133</a>. This page explains the website’s operation and does not replace the shop’s complete purchasing terms.</p> },
    ]} />;
}
