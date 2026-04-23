import { TeamData, teamsData } from "@/data/teams";

export interface SimulationMatch {
  home: TeamData;
  away: TeamData;
  homeGoals: number;
  awayGoals: number;
  winner: "home" | "away" | "draw";
}

export interface GroupResult {
  letter: string;
  standings: Array<{
    team: TeamData;
    points: number;
    wins: number;
    draws: number;
    losses: number;
    gf: number;
    ga: number;
    gd: number;
  }>;
}

export interface KnockoutRound {
  name: string;
  matches: SimulationMatch[];
}

export interface TournamentResult {
  champion: TeamData;
  second: TeamData;
  third: TeamData;
  fourth: TeamData;
  rounds: KnockoutRound[];
  groupResults: GroupResult[];
}

export interface AggregateResult {
  simulations: number;
  teamStats: Map<
    string,
    {
      team: TeamData;
      champion: number;
      second: number;
      third: number;
      fourth: number;
      semifinal: number;
      quarterfinal: number;
      roundOf16: number;
      groupStage: number;
      avgPoints: number;
      avgGoalsFor: number;
      avgGoalsAgainst: number;
    }
  >;
}

// Team strength rating based on multiple factors
function getTeamRating(team: TeamData): number {
  const rankingScore = Math.max(0, 100 - team.ranking * 0.8);
  const formScore = team.form.reduce((acc, r) => acc + (r === "W" ? 3 : r === "D" ? 1 : 0), 0) * 3;
  const attackScore = team.recentGoalsFor * 4;
  const defenseScore = Math.max(0, 20 - team.recentGoalsAgainst) * 2;
  const titlesBonus = team.titles * 3;
  return rankingScore + formScore + attackScore + defenseScore + titlesBonus + 50;
}

// Poisson distribution for goal simulation
function poisson(lambda: number): number {
  const L = Math.exp(-lambda);
  let p = 1.0;
  let k = 0;
  do {
    k++;
    p *= Math.random();
  } while (p > L);
  return k - 1;
}

function simulateGame(home: TeamData, away: TeamData, neutral = true): SimulationMatch {
  const homeRating = getTeamRating(home);
  const awayRating = getTeamRating(away);

  // Base expected goals
  let homeLambda = 1.2 + (home.recentGoalsFor / 15) - (away.recentGoalsAgainst / 20);
  let awayLambda = 1.2 + (away.recentGoalsFor / 15) - (home.recentGoalsAgainst / 20);

  // Rating adjustment
  const ratingDiff = (homeRating - awayRating) / 100;
  homeLambda += ratingDiff * 0.4;
  awayLambda -= ratingDiff * 0.4;

  // Neutral field (Copa 2026 has no home advantage)
  if (neutral) {
    homeLambda *= 0.95;
    awayLambda *= 0.95;
  }

  // Randomness
  homeLambda *= 0.85 + Math.random() * 0.3;
  awayLambda *= 0.85 + Math.random() * 0.3;

  const homeGoals = poisson(Math.max(0.1, homeLambda));
  const awayGoals = poisson(Math.max(0.1, awayLambda));

  let winner: "home" | "away" | "draw";
  if (homeGoals > awayGoals) winner = "home";
  else if (awayGoals > homeGoals) winner = "away";
  else winner = "draw";

  return { home, away, homeGoals, awayGoals, winner };
}

function simulateGroup(teams: TeamData[]): GroupResult {
  const standings = teams.map((team) => ({
    team,
    points: 0,
    wins: 0,
    draws: 0,
    losses: 0,
    gf: 0,
    ga: 0,
    gd: 0,
  }));

  // All vs All (6 games per group of 4)
  for (let i = 0; i < teams.length; i++) {
    for (let j = i + 1; j < teams.length; j++) {
      const match = simulateGame(teams[i], teams[j]);
      const homeTeam = standings.find((s) => s.team.id === match.home.id)!;
      const awayTeam = standings.find((s) => s.team.id === match.away.id)!;

      homeTeam.gf += match.homeGoals;
      homeTeam.ga += match.awayGoals;
      awayTeam.gf += match.awayGoals;
      awayTeam.ga += match.homeGoals;

      if (match.winner === "home") {
        homeTeam.points += 3;
        homeTeam.wins += 1;
        awayTeam.losses += 1;
      } else if (match.winner === "away") {
        awayTeam.points += 3;
        awayTeam.wins += 1;
        homeTeam.losses += 1;
      } else {
        homeTeam.points += 1;
        awayTeam.points += 1;
        homeTeam.draws += 1;
        awayTeam.draws += 1;
      }
    }
  }

  // Calculate goal difference
  standings.forEach((s) => (s.gd = s.gf - s.ga));

  // Sort: points -> goal difference -> goals for
  standings.sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    if (b.gd !== a.gd) return b.gd - a.gd;
    return b.gf - a.gf;
  });

  return { letter: teams[0].group, standings };
}

function simulateKnockoutMatch(teamA: TeamData, teamB: TeamData): TeamData {
  const match = simulateGame(teamA, teamB);
  if (match.winner === "home") return teamA;
  if (match.winner === "away") return teamB;
  // Draw -> penalty shootout (50/50 with slight rating advantage)
  const ratingA = getTeamRating(teamA);
  const ratingB = getTeamRating(teamB);
  const probA = 0.45 + (ratingA - ratingB) / 1000;
  return Math.random() < probA ? teamA : teamB;
}

function simulateKnockout(qualified: TeamData[]): TournamentResult["rounds"] {
  const rounds: TournamentResult["rounds"] = [];
  let currentTeams = [...qualified];

  const roundNames = [
    "Oitavas de Final",
    "Quartas de Final",
    "Semifinal",
    "Final",
  ];

  // Round of 32 (extra round since 32 teams qualify)
  if (currentTeams.length === 32) {
    const matches: SimulationMatch[] = [];
    const nextRound: TeamData[] = [];
    for (let i = 0; i < 16; i++) {
      const winner = simulateKnockoutMatch(currentTeams[i * 2], currentTeams[i * 2 + 1]);
      const match = simulateGame(currentTeams[i * 2], currentTeams[i * 2 + 1]);
      matches.push(match);
      nextRound.push(winner);
    }
    rounds.push({ name: "Oitavas de Final", matches });
    currentTeams = nextRound;
  }

  // Standard knockout rounds
  for (let round = 0; round < roundNames.length; round++) {
    const matches: SimulationMatch[] = [];
    const nextRound: TeamData[] = [];

    for (let i = 0; i < currentTeams.length / 2; i++) {
      const t1 = currentTeams[i * 2];
      const t2 = currentTeams[i * 2 + 1];
      const match = simulateGame(t1, t2);
      matches.push(match);

      if (match.winner === "home") nextRound.push(t1);
      else if (match.winner === "away") nextRound.push(t2);
      else {
        // Penalties
        const ratingA = getTeamRating(t1);
        const ratingB = getTeamRating(t2);
        const probA = 0.45 + (ratingA - ratingB) / 1000;
        nextRound.push(Math.random() < probA ? t1 : t2);
      }
    }

    rounds.push({ name: roundNames[round], matches });
    currentTeams = nextRound;
  }

  return rounds;
}

function getQualifiedTeams(groupResults: GroupResult[]): TeamData[] {
  const qualified: TeamData[] = [];
  const thirdPlaceTeams: Array<{ team: TeamData; points: number; gd: number; gf: number }> = [];

  groupResults.forEach((group) => {
    // 1st and 2nd place automatically qualify
    qualified.push(group.standings[0].team);
    qualified.push(group.standings[1].team);

    // 3rd place goes to pool
    if (group.standings[2]) {
      thirdPlaceTeams.push({
        team: group.standings[2].team,
        points: group.standings[2].points,
        gd: group.standings[2].gd,
        gf: group.standings[2].gf,
      });
    }
  });

  // Sort 3rd place teams and take best 8
  thirdPlaceTeams.sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    if (b.gd !== a.gd) return b.gd - a.gd;
    return b.gf - a.gf;
  });

  thirdPlaceTeams.slice(0, 8).forEach((t) => qualified.push(t.team));

  return qualified;
}

export function simulateTournament(): TournamentResult {
  // Group teams
  const groups: Record<string, TeamData[]> = {};
  teamsData.forEach((team) => {
    if (!groups[team.group]) groups[team.group] = [];
    groups[team.group].push(team);
  });

  // Simulate groups
  const groupResults = Object.values(groups).map((groupTeams) => simulateGroup(groupTeams));

  // Get qualified teams (32)
  const qualified = getQualifiedTeams(groupResults);

  // Shuffle qualified teams for bracket (simplified bracket)
  const shuffled = [...qualified].sort(() => Math.random() - 0.5);

  // Simulate knockout
  const rounds = simulateKnockout(shuffled);

  // Extract final positions from rounds
  const finalMatch = rounds[rounds.length - 1].matches[0];
  const semiMatches = rounds[rounds.length - 2].matches;

  let champion: TeamData;
  let second: TeamData;

  if (finalMatch.winner === "home") {
    champion = finalMatch.home;
    second = finalMatch.away;
  } else if (finalMatch.winner === "away") {
    champion = finalMatch.away;
    second = finalMatch.home;
  } else {
    // Penalties
    const ratingH = getTeamRating(finalMatch.home);
    const ratingA = getTeamRating(finalMatch.away);
    champion = Math.random() < 0.5 + (ratingH - ratingA) / 1000 ? finalMatch.home : finalMatch.away;
    second = champion.id === finalMatch.home.id ? finalMatch.away : finalMatch.home;
  }

  // 3rd place from semifinal losers
  const semiLosers = semiMatches.map((m) => {
    if (m.winner === "home") return m.away;
    if (m.winner === "away") return m.home;
    const ratingH = getTeamRating(m.home);
    const ratingA = getTeamRating(m.away);
    return Math.random() < 0.5 + (ratingH - ratingA) / 1000 ? m.away : m.home;
  });

  const thirdPlaceMatch = simulateKnockoutMatch(semiLosers[0], semiLosers[1]);
  const fourth = thirdPlaceMatch.id === semiLosers[0].id ? semiLosers[1] : semiLosers[0];

  return {
    champion,
    second,
    third: thirdPlaceMatch,
    fourth,
    rounds,
    groupResults,
  };
}

export function runMonteCarlo(iterations: number): AggregateResult {
  const stats = new Map<
    string,
    {
      team: TeamData;
      champion: number;
      second: number;
      third: number;
      fourth: number;
      semifinal: number;
      quarterfinal: number;
      roundOf16: number;
      groupStage: number;
      totalPoints: number;
      totalGF: number;
      totalGA: number;
    }
  >();

  // Initialize stats for all teams
  teamsData.forEach((team) => {
    stats.set(team.id, {
      team,
      champion: 0,
      second: 0,
      third: 0,
      fourth: 0,
      semifinal: 0,
      quarterfinal: 0,
      roundOf16: 0,
      groupStage: 0,
      totalPoints: 0,
      totalGF: 0,
      totalGA: 0,
    });
  });

  for (let i = 0; i < iterations; i++) {
    const result = simulateTournament();

    // Champion
    stats.get(result.champion.id)!.champion++;

    // Second place
    stats.get(result.second.id)!.second++;

    // Third place
    stats.get(result.third.id)!.third++;

    // Fourth place
    stats.get(result.fourth.id)!.fourth++;

    // Semifinalists (from semi round matches)
    const semiTeams = result.rounds[result.rounds.length - 2].matches.flatMap((m) => [m.home, m.away]);
    semiTeams.forEach((t) => stats.get(t.id)!.semifinal++);

    // Quarterfinalists
    const quarterTeams = result.rounds[result.rounds.length - 3].matches.flatMap((m) => [m.home, m.away]);
    quarterTeams.forEach((t) => stats.get(t.id)!.quarterfinal++);

    // Round of 16
    const r16Teams = result.rounds[result.rounds.length - 4]?.matches.flatMap((m) => [m.home, m.away]) || [];
    r16Teams.forEach((t) => stats.get(t.id)!.roundOf16++);

    // Group stage stats
    result.groupResults.forEach((group) => {
      group.standings.forEach((s) => {
        const teamStats = stats.get(s.team.id)!;
        teamStats.groupStage++;
        teamStats.totalPoints += s.points;
        teamStats.totalGF += s.gf;
        teamStats.totalGA += s.ga;
      });
    });
  }

  type TeamStat = {
    team: TeamData;
    champion: number;
    second: number;
    third: number;
    fourth: number;
    semifinal: number;
    quarterfinal: number;
    roundOf16: number;
    groupStage: number;
    avgPoints: number;
    avgGoalsFor: number;
    avgGoalsAgainst: number;
  };

  // Convert to final format with averages
  const teamStats = new Map<string, TeamStat>();

  stats.forEach((value, key) => {
    teamStats.set(key, {
      team: value.team,
      champion: (value.champion / iterations) * 100,
      second: (value.second / iterations) * 100,
      third: (value.third / iterations) * 100,
      fourth: (value.fourth / iterations) * 100,
      semifinal: (value.semifinal / iterations) * 100,
      quarterfinal: (value.quarterfinal / iterations) * 100,
      roundOf16: (value.roundOf16 / iterations) * 100,
      groupStage: (value.groupStage / iterations) * 100,
      avgPoints: value.totalPoints / iterations,
      avgGoalsFor: value.totalGF / iterations,
      avgGoalsAgainst: value.totalGA / iterations,
    });
  });

  return { simulations: iterations, teamStats };
}
