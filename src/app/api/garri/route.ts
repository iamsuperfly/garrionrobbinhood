import { NextResponse } from "next/server";
import { fetchGarriSummary } from "@/lib/gecko";

export const revalidate = 18;

export async function GET() {
  const summary = await fetchGarriSummary();
  return NextResponse.json(summary, {
    headers: {
      "Cache-Control": "public, s-maxage=18, stale-while-revalidate=30",
    },
  });
}
