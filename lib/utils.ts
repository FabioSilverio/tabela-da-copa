import { SimulationResult, Team } from '@/types';

export function formatDateBR(dateString: string): string {
  const date = new Date(dateString + 'T00:00:00');
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

export function formatTimeBR(timeString: string, timezone: string = 'UTC'): string {
  // Simplified conversion to Brazil time (UTC-3)
  const [hours, minutes] = timeString.split(':').map(Number);
  const brazilHours = (hours - 3 + 24) % 24;
  return `${String(brazilHours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function simulateMatch(home: Team, away: Team): SimulationResult {
  // Ranking weight: lower ranking number = better team
  const rankingDiff = (away.ranking - home.ranking) * 1.5;

  // Form calculation: W=3, D=1, L=0
  const formPoints = (team: Team) =>
    team.form.reduce((acc, r) => acc + (r === 'W' ? 3 : r === 'D' ? 1 : 0), 0);
  const formDiff = formPoints(home) - formPoints(away);

  // Goals difference (recent performance)
  const goalsDiffHome = home.recentGoalsFor - home.recentGoalsAgainst;
  const goalsDiffAway = away.recentGoalsFor - away.recentGoalsAgainst;
  const goalsDiff = goalsDiffHome - goalsDiffAway;

  // Weighted score
  const homeScore = rankingDiff + formDiff * 0.8 + goalsDiff * 0.5 + 2; // +2 for home advantage (neutral field reduces it)
  const awayScore = -rankingDiff - formDiff * 0.8 - goalsDiff * 0.5 + 2;

  // Logistic function to convert scores to probabilities
  const expHome = Math.exp(homeScore / 10);
  const expAway = Math.exp(awayScore / 10);
  const expDraw = Math.exp((homeScore + awayScore) / 20) * 0.6;

  const total = expHome + expAway + expDraw;

  const homeWin = Math.round((expHome / total) * 100);
  const awayWin = Math.round((expAway / total) * 100);
  const draw = 100 - homeWin - awayWin;

  // Generate summary text
  let summary = '';
  if (home.ranking < away.ranking && formPoints(home) >= formPoints(away)) {
    summary = `${home.name} chega com melhor ranking e forma recente, aparecendo com vantagem estatística.`;
  } else if (away.ranking < home.ranking && formPoints(away) >= formPoints(home)) {
    summary = `${away.name} possui ranking superior e melhor forma recente, levando vantagem neste confronto.`;
  } else if (home.ranking < away.ranking) {
    summary = `${home.name} tem ranking superior, mas ${away.name} mostra forma recente competitiva.`;
  } else if (away.ranking < home.ranking) {
    summary = `${away.name} leva vantagem no ranking, embora ${home.name} busque equilibrar pelo histórico.`;
  } else {
    summary = 'Confronto equilibrado estatisticamente, com ambas as seleções próximas em ranking e forma.';
  }

  // Expected goals (simplified Poisson-like)
  const expectedGoalsHome = Math.max(0.5, 1.2 + (home.recentGoalsFor / 10) - (away.recentGoalsAgainst / 10));
  const expectedGoalsAway = Math.max(0.5, 1.2 + (away.recentGoalsFor / 10) - (home.recentGoalsAgainst / 10));

  return {
    homeWin,
    draw,
    awayWin,
    summary,
    expectedGoalsHome: Number(expectedGoalsHome.toFixed(2)),
    expectedGoalsAway: Number(expectedGoalsAway.toFixed(2)),
  };
}

export function getTeamFlagUrl(code: string): string {
  return `https://flagcdn.com/w80/${code.toLowerCase()}.png`;
}
