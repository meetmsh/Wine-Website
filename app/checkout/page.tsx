import type { Metadata } from "next";
import { Checkout } from "@/components/Checkout";

export const metadata: Metadata = { title: "Checkout", robots: { index: false } };
export default function Page() { return <Checkout />; }
