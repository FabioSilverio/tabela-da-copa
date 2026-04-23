import { TeamData, teamsData } from "./teams";

export interface MatchData {
  id: string;
  homeTeamId: string;
  awayTeamId: string;
  homeScore?: number | null;
  awayScore?: number | null;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM (hora local do estádio)
  timezone: string;
  stadium: string;
  city: string;
  phase: string;
  group?: string;
  status: "not_started" | "live" | "finished";
  minute?: number | null;
  tv?: string;
  radio?: string;
  events?: Array<{
    minute: number;
    type: "goal" | "yellow_card" | "red_card" | "substitution";
    player: string;
    team: "home" | "away";
    detail?: string;
  }>;
}

const STADIUMS = [
  { name: "Estadio Banorte", city: "Cidade do México", tz: "America/Mexico_City", times: ["12:00", "15:00", "18:00", "21:00"] },
  { name: "SoFi Stadium", city: "Los Angeles", tz: "America/Los_Angeles", times: ["12:00", "15:00", "18:00", "21:00"] },
  { name: "MetLife Stadium", city: "Nova York", tz: "America/New_York", times: ["12:00", "15:00", "18:00", "21:00"] },
  { name: "AT&T Stadium", city: "Dallas", tz: "America/Chicago", times: ["12:00", "15:00", "18:00", "21:00"] },
  { name: "Hard Rock Stadium", city: "Miami", tz: "America/New_York", times: ["12:00", "15:00", "18:00", "21:00"] },
  { name: "BC Place", city: "Vancouver", tz: "America/Vancouver", times: ["12:00", "15:00", "18:00", "21:00"] },
  { name: "Estadio BBVA", city: "Monterrey", tz: "America/Monterrey", times: ["12:00", "15:00", "18:00", "21:00"] },
  { name: "Lumen Field", city: "Seattle", tz: "America/Los_Angeles", times: ["12:00", "15:00", "18:00", "21:00"] },
  { name: "Mercedes-Benz Stadium", city: "Atlanta", tz: "America/New_York", times: ["12:00", "15:00", "18:00", "21:00"] },
  { name: "Levi's Stadium", city: "São Francisco", tz: "America/Los_Angeles", times: ["12:00", "15:00", "18:00", "21:00"] },
  { name: "Gillette Stadium", city: "Boston", tz: "America/New_York", times: ["12:00", "15:00", "18:00", "21:00"] },
  { name: "BMO Field", city: "Toronto", tz: "America/Toronto", times: ["12:00", "15:00", "18:00", "21:00"] },
  { name: "Lincoln Financial Field", city: "Filadélfia", tz: "America/New_York", times: ["12:00", "15:00", "18:00", "21:00"] },
  { name: "GEHA Field", city: "Kansas City", tz: "America/Chicago", times: ["12:00", "15:00", "18:00", "21:00"] },
  { name: "NRG Stadium", city: "Houston", tz: "America/Chicago", times: ["12:00", "15:00", "18:00", "21:00"] },
  { name: "Estadio Akron", city: "Guadalajara", tz: "America/Mexico_City", times: ["12:00", "15:00", "18:00", "21:00"] },
];

// Real match schedule based on FIFA 2026 format
// Matchday 1: June 11-17
// Matchday 2: June 18-23
// Matchday 3: June 24-27
const GROUP_SCHEDULE: Record<string, { matchday: number; dates: string[] }> = {
  A: { matchday: 1, dates: ["2026-06-11", "2026-06-18", "2026-06-24"] },
  B: { matchday: 1, dates: ["2026-06-12", "2026-06-18", "2026-06-24"] },
  C: { matchday: 1, dates: ["2026-06-13", "2026-06-19", "2026-06-24"] },
  D: { matchday: 1, dates: ["2026-06-12", "2026-06-19", "2026-06-25"] },
  E: { matchday: 1, dates: ["2026-06-14", "2026-06-20", "2026-06-25"] },
  F: { matchday: 1, dates: ["2026-06-14", "2026-06-20", "2026-06-25"] },
  G: { matchday: 1, dates: ["2026-06-15", "2026-06-21", "2026-06-26"] },
  H: { matchday: 1, dates: ["2026-06-15", "2026-06-21", "2026-06-26"] },
  I: { matchday: 1, dates: ["2026-06-16", "2026-06-22", "2026-06-26"] },
  J: { matchday: 1, dates: ["2026-06-16", "2026-06-22", "2026-06-27"] },
  K: { matchday: 1, dates: ["2026-06-17", "2026-06-23", "2026-06-27"] },
  L: { matchday: 1, dates: ["2026-06-17", "2026-06-23", "2026-06-27"] },
};

function getStadiumForGroupAndMatch(group: string, matchIndex: number) {
  // Assign stadiums based on group and match to spread games across venues
  const groupIndex = group.charCodeAt(0) - 65; // A=0, B=1, etc.
  const stadiumIndex = (groupIndex + matchIndex * 3) % STADIUMS.length;
  return STADIUMS[stadiumIndex];
}

function generateGroupMatches(): MatchData[] {
  const groups = teamsData.reduce((acc, team) => {
    if (!acc[team.group]) acc[team.group] = [];
    acc[team.group].push(team);
    return acc;
  }, {} as Record<string, TeamData[]>);

  const matches: MatchData[] = [];

  Object.entries(groups).forEach(([groupLetter, groupTeams]) => {
    const schedule = GROUP_SCHEDULE[groupLetter];
    if (!schedule) return;

    // Round 1: A1 vs A2, A3 vs A4
    const s1 = getStadiumForGroupAndMatch(groupLetter, 0);
    matches.push({
      id: `g-${groupLetter}-r1-1`,
      homeTeamId: groupTeams[0].id,
      awayTeamId: groupTeams[1].id,
      date: schedule.dates[0],
      time: s1.times[0],
      timezone: s1.tz,
      stadium: s1.name,
      city: s1.city,
      phase: `Grupo ${groupLetter}`,
      group: groupLetter,
      status: "not_started",
    });

    const s2 = getStadiumForGroupAndMatch(groupLetter, 1);
    matches.push({
      id: `g-${groupLetter}-r1-2`,
      homeTeamId: groupTeams[2].id,
      awayTeamId: groupTeams[3].id,
      date: schedule.dates[0],
      time: s2.times[2],
      timezone: s2.tz,
      stadium: s2.name,
      city: s2.city,
      phase: `Grupo ${groupLetter}`,
      group: groupLetter,
      status: "not_started",
    });

    // Round 2: A1 vs A3, A2 vs A4
    const s3 = getStadiumForGroupAndMatch(groupLetter, 2);
    matches.push({
      id: `g-${groupLetter}-r2-1`,
      homeTeamId: groupTeams[0].id,
      awayTeamId: groupTeams[2].id,
      date: schedule.dates[1],
      time: s3.times[1],
      timezone: s3.tz,
      stadium: s3.name,
      city: s3.city,
      phase: `Grupo ${groupLetter}`,
      group: groupLetter,
      status: "not_started",
    });

    const s4 = getStadiumForGroupAndMatch(groupLetter, 3);
    matches.push({
      id: `g-${groupLetter}-r2-2`,
      homeTeamId: groupTeams[1].id,
      awayTeamId: groupTeams[3].id,
      date: schedule.dates[1],
      time: s4.times[3],
      timezone: s4.tz,
      stadium: s4.name,
      city: s4.city,
      phase: `Grupo ${groupLetter}`,
      group: groupLetter,
      status: "not_started",
    });

    // Round 3: A1 vs A4, A2 vs A3
    const s5 = getStadiumForGroupAndMatch(groupLetter, 4);
    matches.push({
      id: `g-${groupLetter}-r3-1`,
      homeTeamId: groupTeams[0].id,
      awayTeamId: groupTeams[3].id,
      date: schedule.dates[2],
      time: s5.times[0],
      timezone: s5.tz,
      stadium: s5.name,
      city: s5.city,
      phase: `Grupo ${groupLetter}`,
      group: groupLetter,
      status: "not_started",
    });

    const s6 = getStadiumForGroupAndMatch(groupLetter, 5);
    matches.push({
      id: `g-${groupLetter}-r3-2`,
      homeTeamId: groupTeams[1].id,
      awayTeamId: groupTeams[2].id,
      date: schedule.dates[2],
      time: s6.times[2],
      timezone: s6.tz,
      stadium: s6.name,
      city: s6.city,
      phase: `Grupo ${groupLetter}`,
      group: groupLetter,
      status: "not_started",
    });
  });

  return matches;
}

function generateKnockoutMatches(): MatchData[] {
  // Knockout stage dates based on official schedule
  const roundOf32Dates = [
    "2026-06-28", "2026-06-29", "2026-06-30",
    "2026-07-01", "2026-07-02", "2026-07-03",
  ];

  const roundOf16Dates = [
    "2026-07-04", "2026-07-05", "2026-07-06", "2026-07-07",
  ];

  const quarterDates = ["2026-07-09", "2026-07-10", "2026-07-11"];
  const semiDates = ["2026-07-14", "2026-07-15"];
  const thirdPlaceDate = "2026-07-18";
  const finalDate = "2026-07-19";

  const matches: MatchData[] = [];

  // Round of 32 (16 matches)
  for (let i = 0; i < 16; i++) {
    const date = roundOf32Dates[Math.floor(i / 3)] || roundOf32Dates[0];
    const s = STADIUMS[i % STADIUMS.length];
    matches.push({
      id: `k-r32-${i + 1}`,
      homeTeamId: "tbd",
      awayTeamId: "tbd",
      date,
      time: s.times[i % 4],
      timezone: s.tz,
      stadium: s.name,
      city: s.city,
      phase: "Oitavas de Final",
      status: "not_started",
    });
  }

  // Round of 16 (8 matches)
  for (let i = 0; i < 8; i++) {
    const date = roundOf16Dates[Math.floor(i / 2)] || roundOf16Dates[0];
    const s = STADIUMS[(i + 5) % STADIUMS.length];
    matches.push({
      id: `k-r16-${i + 1}`,
      homeTeamId: "tbd",
      awayTeamId: "tbd",
      date,
      time: s.times[i % 4],
      timezone: s.tz,
      stadium: s.name,
      city: s.city,
      phase: "Oitavas de Final",
      status: "not_started",
    });
  }

  // Quarterfinals (4 matches)
  for (let i = 0; i < 4; i++) {
    const date = quarterDates[Math.floor(i / 1)] || quarterDates[0];
    const s = STADIUMS[(i + 10) % STADIUMS.length];
    matches.push({
      id: `k-qf-${i + 1}`,
      homeTeamId: "tbd",
      awayTeamId: "tbd",
      date,
      time: s.times[(i + 1) % 4],
      timezone: s.tz,
      stadium: s.name,
      city: s.city,
      phase: "Quartas de Final",
      status: "not_started",
    });
  }

  // Semifinals (2 matches)
  for (let i = 0; i < 2; i++) {
    const s = STADIUMS[(i + 2) % STADIUMS.length];
    matches.push({
      id: `k-sf-${i + 1}`,
      homeTeamId: "tbd",
      awayTeamId: "tbd",
      date: semiDates[i],
      time: "20:00",
      timezone: s.tz,
      stadium: s.name,
      city: s.city,
      phase: "Semifinal",
      status: "not_started",
    });
  }

  // Third place
  matches.push({
    id: `k-3p-1`,
    homeTeamId: "tbd",
    awayTeamId: "tbd",
    date: thirdPlaceDate,
    time: "16:00",
    timezone: "America/New_York",
    stadium: "Hard Rock Stadium",
    city: "Miami",
    phase: "Disputa de 3º Lugar",
    status: "not_started",
  });

  // Final
  matches.push({
    id: `k-final-1`,
    homeTeamId: "tbd",
    awayTeamId: "tbd",
    date: finalDate,
    time: "18:00",
    timezone: "America/New_York",
    stadium: "MetLife Stadium",
    city: "Nova York",
    phase: "Final",
    status: "not_started",
  });

  return matches;
}

export const allMatchesData: MatchData[] = [
  ...generateGroupMatches(),
  ...generateKnockoutMatches(),
];

export function getMatchById(id: string): MatchData | undefined {
  return allMatchesData.find((m) => m.id === id);
}

export function getMatchesByTeamId(teamId: string): MatchData[] {
  return allMatchesData.filter(
    (m) => m.homeTeamId === teamId || m.awayTeamId === teamId
  );
}

export function getMatchesByGroup(group: string): MatchData[] {
  return allMatchesData.filter((m) => m.group === group);
}

export function getLiveMatchesData(): MatchData[] {
  return allMatchesData.filter((m) => m.status === "live");
}

// Helper to enrich match with team objects
export function enrichMatch(match: MatchData) {
  return {
    ...match,
    homeTeam: teamsData.find((t) => t.id === match.homeTeamId),
    awayTeam: teamsData.find((t) => t.id === match.awayTeamId),
  };
}
