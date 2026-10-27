import type { Metadata } from "next";
import { VineyardsPage } from "@/components/Vineyards";

export const metadata: Metadata = { title: "Wine by vineyard", description: "Meet the producers on Uncorked’s shelves and the places behind their wine, from Tuscany and Provence to California and the Veneto." };
export default function Page() { return <VineyardsPage />; }
