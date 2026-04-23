import { TeamData, teamsData } from "@/data/teams";
import { MatchData, allMatchesData, enrichMatch } from "@/data/matches";

// ============================================================
// DATA PROVIDER - Backend centralizado
// ============================================================
// Este serviço abstrai a origem dos dados.
// HOJE: lê de arquivos locais (data/teams.ts, data/matches.ts)
// FUTURO: pode ser trocado para buscar de API externa
//          (API-Football, Football-Data, etc.)
// ============================================================

export interface StandingEntry {
  team: TeamData;
  played: number;
  wins: number;
  draws: number;
  losses: number;
  points: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
}

export interface GroupStandings {
  letter: string;
  teams: StandingEntry[];
}

class DataProvider {
  private teams: TeamData[] = teamsData;
  private matches: MatchData[] = allMatchesData;

  // --- TEAMS ---
  getAllTeams(): TeamData[] {
    return this.teams;
  }

  getTeamById(id: string): TeamData | undefined {
    return this.teams.find((t) => t.id === id);
  }

  getTeamBySlug(slug: string): TeamData | undefined {
    return this.teams.find((t) => t.slug === slug);
  }

  getTeamsByGroup(): Record<string, TeamData[]> {
    return this.teams.reduce((acc, team) => {
      if (!acc[team.group]) acc[team.group] = [];
      acc[team.group].push(team);
      return acc;
    }, {} as Record<string, TeamData[]>);
  }

  // --- MATCHES ---
  private enrichMatch(match: MatchData) {
    return {
      ...match,
      homeTeam: this.getTeamById(match.homeTeamId),
      awayTeam: this.getTeamById(match.awayTeamId),
    };
  }

  getAllMatches() {
    return this.matches.map((m) => this.enrichMatch(m));
  }

  getMatchById(id: string) {
    const match = this.matches.find((m) => m.id === id);
    return match ? this.enrichMatch(match) : undefined;
  }

  getMatchesByTeamId(teamId: string) {
    return this.matches
      .filter((m) => m.homeTeamId === teamId || m.awayTeamId === teamId)
      .map((m) => this.enrichMatch(m));
  }

  getMatchesByGroup(group: string) {
    return this.matches.filter((m) => m.group === group).map((m) => this.enrichMatch(m));
  }

  getUpcomingMatches(limit = 10) {
    return this.matches
      .filter((m) => m.status === "not_started")
      .sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time))
      .slice(0, limit)
      .map((m) => this.enrichMatch(m));
  }

  getLiveMatches() {
    return this.matches.filter((m) => m.status === "live").map((m) => this.enrichMatch(m));
  }

  getRecentFinished(limit = 10) {
    return this.matches
      .filter((m) => m.status === "finished")
      .sort((a, b) => b.date.localeCompare(a.date) || b.time.localeCompare(a.time))
      .slice(0, limit)
      .map((m) => this.enrichMatch(m));
  }

  // --- STANDINGS (calculado dinamicamente dos resultados) ---
  getStandings(): GroupStandings[] {
    const groups = this.getTeamsByGroup();
    const groupMatches = this.matches.filter((m) => m.group && m.status === "finished");

    return Object.entries(groups).map(([letter, teams]) => {
      const standings: Record<string, StandingEntry> = {};

      teams.forEach((team) => {
        standings[team.id] = {
          team,
          played: 0,
          wins: 0,
          draws: 0,
          losses: 0,
          points: 0,
          goalsFor: 0,
          goalsAgainst: 0,
          goalDifference: 0,
        };
      });

      groupMatches
        .filter((m) => m.group === letter)
        .forEach((match) => {
          const home = standings[match.homeTeamId];
          const away = standings[match.awayTeamId];
          if (!home || !away || match.homeScore == null || match.awayScore == null) return;

          home.played++;
          away.played++;
          home.goalsFor += match.homeScore;
          home.goalsAgainst += match.awayScore;
          away.goalsFor += match.awayScore;
          away.goalsAgainst += match.homeScore;

          if (match.homeScore > match.awayScore) {
            home.wins++;
            home.points += 3;
            away.losses++;
          } else if (match.awayScore > match.homeScore) {
            away.wins++;
            away.points += 3;
            home.losses++;
          } else {
            home.draws++;
            away.draws++;
            home.points += 1;
            away.points += 1;
          }
        });

      const sorted = Object.values(standings).sort((a, b) => {
        if (b.points !== a.points) return b.points - a.points;
        if (b.goalDifference !== a.goalDifference) return b.goalDifference - a.goalDifference;
        return b.goalsFor - a.goalsFor;
      });

      sorted.forEach((s) => {
        s.goalDifference = s.goalsFor - s.goalsAgainst;
      });

      return { letter, teams: sorted };
    });
  }

  // --- SEARCH ---
  searchTeams(query: string): TeamData[] {
    const q = query.toLowerCase();
    return this.teams.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.slug.includes(q) ||
        t.group.toLowerCase().includes(q) ||
        t.confederation.toLowerCase().includes(q)
    );
  }

  // --- SYNC (placeholder para futura integração com API externa) ---
  async syncWithExternalAPI(): Promise<{ updated: number; message: string }> {
    // TODO: quando houver API externa configurada (API-Football, etc.),
    // buscar dados reais e atualizar this.matches / this.teams
    return {
      updated: 0,
      message: "Nenhuma API externa configurada. Usando dados locais.",
    };
  }
}

// Singleton export
export const dataProvider = new DataProvider();
