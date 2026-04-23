import { NextResponse } from "next/server";
import { dataProvider } from "@/services/data-provider";

export const dynamic = "force-dynamic";

export async function POST() {
  const result = await dataProvider.syncWithExternalAPI();
  return NextResponse.json(result);
}
