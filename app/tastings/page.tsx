import type { Metadata } from "next";
import { TastingsPage } from "@/components/Tastings";

export const metadata: Metadata = { title: "Wine tastings", description: "Try before you buy at Uncorked Wines & Spirits in Hoboken: relaxed in-store wine and spirits tastings at 1450 Washington Street." };
export default function Page() { return <TastingsPage />; }
