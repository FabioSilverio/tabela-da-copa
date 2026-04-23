import { NextResponse } from "next/server";
import { dataProvider } from "@/services/data-provider";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");
  const id = searchParams.get("id");
  const slug = searchParams.get("slug");

  let teams;

  if (id) {
    const team = dataProvider.getTeamById(id);
    teams = team ? [team] : [];
  } else if (slug) {
    const team = dataProvider.getTeamBySlug(slug);
    teams = team ? [team] : [];
  } else if (query) {
    teams = dataProvider.searchTeams(query);
  } else {
    teams = dataProvider.getAllTeams();
  }

  return NextResponse.json({ teams });
}
