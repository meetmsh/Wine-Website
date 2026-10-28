import type { Metadata } from "next";
import { GiftCard } from "@/components/GiftCard";

export const metadata: Metadata = { title: "eGift cards", description: "Send an Uncorked Wines & Spirits eGift card by email, from $10 to $500." };
export default function Page() { return <GiftCard />; }
