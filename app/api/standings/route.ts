import { NextResponse } from "next/server";
import { dataProvider } from "@/services/data-provider";

export const dynamic = "force-dynamic";

export async function GET() {
  const standings = dataProvider.getStandings();
  return NextResponse.json({ standings });
}
