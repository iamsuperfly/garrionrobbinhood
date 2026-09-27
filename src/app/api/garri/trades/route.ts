import { NextResponse } from "next/server";
import { fetchGarriTrades } from "@/lib/gecko";

export const revalidate = 18;

export async function GET() {
  const trades = await fetchGarriTrades();
  return NextResponse.json(
    { trades },
    {
      headers: {
        "Cache-Control": "public, s-maxage=18, stale-while-revalidate=30",
      },
    },
  );
}
