import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Bodoni_Moda } from "next/font/google";
import { CellarProvider } from "@/components/CellarProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AgeGate } from "@/components/AgeGate";
import { MotionRoot } from "@/components/MotionRoot";
import "./globals.css";
const serif = Bodoni_Moda({ subsets: ["latin"], style: ["normal", "italic"], variable: "--font-serif", display: "swap" });
const sans = Geist({ subsets: ["latin"], variable: "--font-sans" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" });
export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover", interactiveWidget: "resizes-content", themeColor: "#fbfaf7" };
export const metadata: Metadata = { title: { default: "Uncorked Wines & Spirits | Your Neighborhood Bottle Shop, Hoboken", template: "%s | Uncorked Hoboken" }, description: "Explore wine, craft beer, spirits and ready-to-drink favorites at Uncorked Wines & Spirits. Visit your neighborhood bottle shop at 1450 Washington Street, Hoboken, NJ. For adults 21+." };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en" className={`${serif.variable} ${sans.variable} ${mono.variable}`}><body><AgeGate><CellarProvider><Header /><main id="main-content">{children}</main><Footer /><MotionRoot /></CellarProvider></AgeGate></body></html>;
}
