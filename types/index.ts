import { TeamData } from "@/data/teams";
import { MatchData } from "@/data/matches";

export type Team = TeamData;
export type Match = MatchData & {
  homeTeam?: TeamData;
  awayTeam?: TeamData;
};

export interface Player {
  name: string;
  position: string;
  number?: number;
  isStarter?: boolean;
}

export interface MatchEvent {
  minute: number;
  type: "goal" | "yellow_card" | "red_card" | "substitution";
  player: string;
  team: "home" | "away";
  detail?: string;
}

export interface SimulationResult {
  homeWin: number;
  draw: number;
  awayWin: number;
  summary: string;
  expectedGoalsHome: number;
  expectedGoalsAway: number;
}
