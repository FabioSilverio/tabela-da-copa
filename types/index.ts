export interface Team {
  id: string;
  name: string;
  slug: string;
  code: string;
  flag?: string;
  group: string;
  ranking: number;
  form: ('W' | 'D' | 'L')[];
  goalsFor: number;
  goalsAgainst: number;
  recentGoalsFor: number;
  recentGoalsAgainst: number;
  titles: number;
  coach: string;
  squad: Player[];
}

export interface Player {
  name: string;
  position: string;
  number?: number;
  isStarter?: boolean;
}

export interface Group {
  letter: string;
  teams: TeamStanding[];
}

export interface TeamStanding extends Team {
  played: number;
  wins: number;
  draws: number;
  losses: number;
  points: number;
  goalDifference: number;
}

export interface Match {
  id: string;
  homeTeam: Team;
  awayTeam: Team;
  homeScore?: number;
  awayScore?: number;
  date: string;
  time: string;
  timezone: string;
  stadium: string;
  city: string;
  phase: string;
  status: 'not_started' | 'live' | 'finished';
  minute?: number;
  events?: MatchEvent[];
  tv?: string;
  radio?: string;
}

export interface MatchEvent {
  minute: number;
  type: 'goal' | 'yellow_card' | 'red_card' | 'substitution';
  player: string;
  team: 'home' | 'away';
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
