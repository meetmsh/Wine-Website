import type { Metadata } from "next";
import { InfoPage } from "@/components/InfoPage";

export const metadata: Metadata = { title: "Privacy information", description: "How this Uncorked website handles shopping information and how to contact the shop about privacy." };
export default function PrivacyPage() {
  return <InfoPage crumb="Privacy" title="Your information," emphasis="handled thoughtfully." lede="Here is what this website uses while you browse, and what is shared when an online service is available."
    sections={[
      { title: "Saved on your device", body: <><p>Your shopping bag is saved in your browser so it stays with you when you return on the same device. You can remove items in the bag or clear this website’s data through your browser settings.</p><p>Your 21+ confirmation lasts for the browser session. It is a self-attestation; the shop still requires a valid photo ID when alcohol is collected or delivered.</p></> },
      { title: "Order requests", body: <p>When online ordering is available, the details you submit include your contact information, bag and, for delivery, your address and delivery notes. These are sent to the shop’s order service so it can confirm your request. This page does not collect card details.</p> },
      { title: "Gift cards", body: <p>When online gift cards are available, recipient and sender details and the selected amount are shared with the shop’s gift-card service. Any card payment is completed with the payment provider.</p> },
      { title: "Email updates", body: <p>When email signup is available, your name, email address and signup consent are sent to the shop’s email service. Signing up is optional. You can unsubscribe from future email updates.</p> },
      { title: "External websites", body: <p>Links to Instagram, maps and payment services take you to another website. Its own privacy information applies to what you do there.</p> },
      { title: "Privacy questions", body: <p>For the shop’s current service providers, record-retention practices or help with information you have shared, call <a href="tel:+19083822133">(908) 382-2133</a> or visit 1450 Washington Street, Hoboken. This page describes the website’s operation; the shop can provide its complete business privacy terms.</p> },
    ]} />;
}
