import { NextResponse } from "next/server";
import { dataProvider } from "@/services/data-provider";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const group = searchParams.get("group");
  const teamId = searchParams.get("team");
  const upcoming = searchParams.get("upcoming");
  const limit = parseInt(searchParams.get("limit") || "100", 10);

  let matches;

  if (group) {
    matches = dataProvider.getMatchesByGroup(group);
  } else if (teamId) {
    matches = dataProvider.getMatchesByTeamId(teamId);
  } else if (upcoming === "true") {
    matches = dataProvider.getUpcomingMatches(limit);
  } else {
    matches = dataProvider.getAllMatches();
  }

  return NextResponse.json({ matches });
}
