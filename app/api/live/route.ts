import { NextResponse } from "next/server";
import { dataProvider } from "@/services/data-provider";

export const dynamic = "force-dynamic";

export async function GET() {
  const live = dataProvider.getLiveMatches();
  const recent = dataProvider.getRecentFinished(10);

  return NextResponse.json({
    live,
    recent,
    timestamp: new Date().toISOString(),
  });
}
