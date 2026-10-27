import { Suspense } from "react";
import { Shop } from "@/components/Shop";
export const metadata = { title: "Explore the shop" };
export default function ShopPage() { return <Suspense fallback={<div className="container" style={{ paddingBlock: 60 }}>Getting the shelves ready…</div>}><Shop /></Suspense>; }
