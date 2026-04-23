import { Match, Team } from '@/types';
import { teams } from './teams';

const STADIUMS = [
  { name: 'Azteca', city: 'Cidade do México' },
  { name: 'SoFi Stadium', city: 'Los Angeles' },
  { name: 'MetLife Stadium', city: 'Nova York' },
  { name: 'AT&T Stadium', city: 'Dallas' },
  { name: 'Hard Rock Stadium', city: 'Miami' },
  { name: 'BC Place', city: 'Vancouver' },
  { name: 'Estadio BBVA', city: 'Monterrey' },
  { name: 'Lumen Field', city: 'Seattle' },
  { name: 'Mercedes-Benz Stadium', city: 'Atlanta' },
  { name: 'Levi\'s Stadium', city: 'San Francisco' },
  { name: 'Gillette Stadium', city: 'Boston' },
  { name: 'BMO Field', city: 'Toronto' },
];

function getStadium(index: number) {
  return STADIUMS[index % STADIUMS.length];
}

function generateGroupMatches(): Match[] {
  const groups = teams.reduce((acc, team) => {
    if (!acc[team.group]) acc[team.group] = [];
    acc[team.group].push(team);
    return acc;
  }, {} as Record<string, Team[]>);

  const matches: Match[] = [];
  let matchIndex = 0;

  const baseDate = new Date('2026-06-11');

  Object.values(groups).forEach((groupTeams) => {
    const combos: [Team, Team][] = [];
    for (let i = 0; i < groupTeams.length; i++) {
      for (let j = i + 1; j < groupTeams.length; j++) {
        combos.push([groupTeams[i], groupTeams[j]]);
      }
    }

    combos.forEach(([t1, t2], idx) => {
      const date = new Date(baseDate);
      date.setDate(baseDate.getDate() + Math.floor(matchIndex / 4));
      const stadium = getStadium(matchIndex);
      const times = ['13:00', '16:00', '19:00', '22:00'];
      const time = times[matchIndex % times.length];

      matches.push({
        id: `g-${t1.id}-${t2.id}`,
        homeTeam: t1,
        awayTeam: t2,
        date: date.toISOString().split('T')[0],
        time,
        timezone: 'UTC',
        stadium: stadium.name,
        city: stadium.city,
        phase: `Grupo ${t1.group}`,
        status: 'not_started',
        tv: 'a confirmar',
        radio: 'a confirmar',
      });
      matchIndex++;
    });
  });

  return matches;
}

function generateKnockoutMatches(): Match[] {
  // Mock knockout bracket placeholders (round of 32)
  const roundOf32Teams = teams.slice(0, 64); // placeholder
  const matches: Match[] = [];
  const baseDate = new Date('2026-06-29');

  for (let i = 0; i < 16; i++) {
    const date = new Date(baseDate);
    date.setDate(baseDate.getDate() + Math.floor(i / 4));
    const stadium = getStadium(i + 100);
    const times = ['13:00', '16:00', '19:00', '22:00'];
    const time = times[i % times.length];

    const t1 = roundOf32Teams[i * 2] || teams[0];
    const t2 = roundOf32Teams[i * 2 + 1] || teams[1];

    matches.push({
      id: `k-r32-${i + 1}`,
      homeTeam: t1,
      awayTeam: t2,
      date: date.toISOString().split('T')[0],
      time,
      timezone: 'UTC',
      stadium: stadium.name,
      city: stadium.city,
      phase: 'Oitavas de Final',
      status: 'not_started',
      tv: 'a confirmar',
      radio: 'a confirmar',
    });
  }

  return matches;
}

export const allMatches: Match[] = [...generateGroupMatches(), ...generateKnockoutMatches()];

export function getMatchById(id: string): Match | undefined {
  return allMatches.find((m) => m.id === id);
}

export function getMatchesByTeam(teamId: string): Match[] {
  return allMatches.filter((m) => m.homeTeam.id === teamId || m.awayTeam.id === teamId);
}

export function getLiveMatches(): Match[] {
  // Mock: no live matches for now; in production this would fetch from API
  return [];
}
