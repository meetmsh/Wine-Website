import { NextResponse } from "next/server";
import { serviceAvailability } from "@/lib/services";

export const dynamic = "force-dynamic";
export function GET() {
  return NextResponse.json(serviceAvailability(), { headers: { "Cache-Control": "no-store" } });
}
