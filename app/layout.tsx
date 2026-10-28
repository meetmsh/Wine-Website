import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Bodoni_Moda } from "next/font/google";
import { CellarProvider } from "@/components/CellarProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AgeGate } from "@/components/AgeGate";
import { MotionRoot } from "@/components/MotionRoot";
import { ServiceProvider } from "@/components/ServiceProvider";
import { siteUrl } from "@/lib/site";
import "./globals.css";
const serif = Bodoni_Moda({ subsets: ["latin"], style: ["normal", "italic"], variable: "--font-serif", display: "swap" });
const sans = Geist({ subsets: ["latin"], variable: "--font-sans" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" });
const business = {
  "@context": "https://schema.org", "@type": "LocalBusiness", name: "Uncorked Wines & Spirits", url: siteUrl,
  telephone: "+19083822133", image: `${siteUrl}/images/uncorkedstore.png`,
  address: { "@type": "PostalAddress", streetAddress: "1450 Washington Street", addressLocality: "Hoboken", addressRegion: "NJ", postalCode: "07030", addressCountry: "US" },
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover", interactiveWidget: "resizes-content", themeColor: "#fbfaf7" };
export const metadata: Metadata = { metadataBase: new URL(siteUrl), openGraph: { type: "website", siteName: "Uncorked Wines & Spirits", locale: "en_US", images: [{ url: "/images/vineyard.jpg", alt: "Vineyard landscape at sunset" }] }, twitter: { card: "summary_large_image", images: ["/images/vineyard.jpg"] }, title: { default: "Uncorked Wines & Spirits | Your Neighborhood Bottle Shop, Hoboken", template: "%s | Uncorked Hoboken" }, description: "Explore wine, craft beer, spirits and ready-to-drink favorites at Uncorked Wines & Spirits. Visit your neighborhood bottle shop at 1450 Washington Street, Hoboken, NJ. For adults 21+." };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en" className={`${serif.variable} ${sans.variable} ${mono.variable}`}><body><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(business).replace(/</g, "\u003c") }} /><AgeGate><CellarProvider><ServiceProvider><Header /><main id="main-content">{children}</main><Footer /><MotionRoot /></ServiceProvider></CellarProvider></AgeGate></body></html>;
}
