import { Team } from '@/types';

export const teams: Team[] = [
  // Grupo A
  { id: 'mex', name: 'México', slug: 'mexico', code: 'MX', group: 'A', ranking: 14, form: ['W','D','W','L','W'], goalsFor: 12, goalsAgainst: 6, recentGoalsFor: 8, recentGoalsAgainst: 4, titles: 0, coach: 'Jaime Lozano', squad: [] },
  { id: 'can', name: 'Canadá', slug: 'canada', code: 'CA', group: 'A', ranking: 48, form: ['W','W','L','D','W'], goalsFor: 9, goalsAgainst: 7, recentGoalsFor: 6, recentGoalsAgainst: 5, titles: 0, coach: 'Jesse Marsch', squad: [] },
  { id: 'ecu', name: 'Equador', slug: 'equador', code: 'EC', group: 'A', ranking: 31, form: ['D','W','W','L','D'], goalsFor: 7, goalsAgainst: 5, recentGoalsFor: 5, recentGoalsAgainst: 4, titles: 0, coach: 'Félix Sánchez', squad: [] },
  { id: 'wal', name: 'País de Gales', slug: 'pais-de-gales', code: 'GB-WLS', group: 'A', ranking: 29, form: ['L','D','W','W','L'], goalsFor: 6, goalsAgainst: 8, recentGoalsFor: 4, recentGoalsAgainst: 6, titles: 0, coach: 'Craig Bellamy', squad: [] },

  // Grupo B
  { id: 'esp', name: 'Espanha', slug: 'espanha', code: 'ES', group: 'B', ranking: 3, form: ['W','W','W','D','W'], goalsFor: 15, goalsAgainst: 4, recentGoalsFor: 11, recentGoalsAgainst: 3, titles: 1, coach: 'Luis de la Fuente', squad: [] },
  { id: 'cro', name: 'Croácia', slug: 'croacia', code: 'HR', group: 'B', ranking: 7, form: ['D','W','L','W','D'], goalsFor: 10, goalsAgainst: 7, recentGoalsFor: 7, recentGoalsAgainst: 5, titles: 0, coach: 'Zlatko Dalić', squad: [] },
  { id: 'mar', name: 'Marrocos', slug: 'marrocos', code: 'MA', group: 'B', ranking: 13, form: ['W','D','W','W','L'], goalsFor: 11, goalsAgainst: 5, recentGoalsFor: 8, recentGoalsAgainst: 4, titles: 0, coach: 'Walid Regragui', squad: [] },
  { id: 'irq', name: 'Iraque', slug: 'iraque', code: 'IQ', group: 'B', ranking: 63, form: ['L','W','D','L','W'], goalsFor: 5, goalsAgainst: 9, recentGoalsFor: 4, recentGoalsAgainst: 7, titles: 0, coach: 'Jesús Casas', squad: [] },

  // Grupo C
  { id: 'bra', name: 'Brasil', slug: 'brasil', code: 'BR', group: 'C', ranking: 5, form: ['W','D','W','W','L'], goalsFor: 14, goalsAgainst: 6, recentGoalsFor: 10, recentGoalsAgainst: 4, titles: 5, coach: 'Dorival Júnior', squad: [] },
  { id: 'cmr', name: 'Camarões', slug: 'camaroes', code: 'CM', group: 'C', ranking: 51, form: ['D','W','L','D','W'], goalsFor: 8, goalsAgainst: 8, recentGoalsFor: 6, recentGoalsAgainst: 6, titles: 0, coach: 'Marc Brys', squad: [] },
  { id: 'rou', name: 'Romênia', slug: 'romenia', code: 'RO', group: 'C', ranking: 45, form: ['W','W','D','L','D'], goalsFor: 7, goalsAgainst: 6, recentGoalsFor: 5, recentGoalsAgainst: 5, titles: 0, coach: 'Edward Iordănescu', squad: [] },
  { id: 'hon', name: 'Honduras', slug: 'honduras', code: 'HN', group: 'C', ranking: 78, form: ['L','D','W','L','D'], goalsFor: 4, goalsAgainst: 10, recentGoalsFor: 3, recentGoalsAgainst: 7, titles: 0, coach: 'Reinaldo Rueda', squad: [] },

  // Grupo D
  { id: 'usa', name: 'Estados Unidos', slug: 'estados-unidos', code: 'US', group: 'D', ranking: 11, form: ['W','L','W','D','W'], goalsFor: 11, goalsAgainst: 7, recentGoalsFor: 8, recentGoalsAgainst: 5, titles: 0, coach: 'Mauricio Pochettino', squad: [] },
  { id: 'jpn', name: 'Japão', slug: 'japao', code: 'JP', group: 'D', ranking: 15, form: ['W','W','D','W','L'], goalsFor: 13, goalsAgainst: 5, recentGoalsFor: 9, recentGoalsAgainst: 4, titles: 0, coach: 'Hajime Moriyasu', squad: [] },
  { id: 'sui', name: 'Suíça', slug: 'suica', code: 'CH', group: 'D', ranking: 19, form: ['D','W','L','W','D'], goalsFor: 9, goalsAgainst: 7, recentGoalsFor: 6, recentGoalsAgainst: 5, titles: 0, coach: 'Murat Yakin', squad: [] },
  { id: 'bol', name: 'Bolívia', slug: 'bolivia', code: 'BO', group: 'D', ranking: 83, form: ['L','L','D','L','W'], goalsFor: 3, goalsAgainst: 12, recentGoalsFor: 2, recentGoalsAgainst: 9, titles: 0, coach: 'Óscar Villegas', squad: [] },

  // Grupo E
  { id: 'arg', name: 'Argentina', slug: 'argentina', code: 'AR', group: 'E', ranking: 1, form: ['W','W','D','W','W'], goalsFor: 16, goalsAgainst: 3, recentGoalsFor: 12, recentGoalsAgainst: 2, titles: 3, coach: 'Lionel Scaloni', squad: [] },
  { id: 'sen', name: 'Senegal', slug: 'senegal', code: 'SN', group: 'E', ranking: 20, form: ['W','D','W','L','W'], goalsFor: 10, goalsAgainst: 6, recentGoalsFor: 7, recentGoalsAgainst: 4, titles: 0, coach: 'Aliou Cissé', squad: [] },
  { id: 'srp', name: 'Sérvia', slug: 'servia', code: 'RS', group: 'E', ranking: 30, form: ['L','W','D','W','L'], goalsFor: 8, goalsAgainst: 8, recentGoalsFor: 6, recentGoalsAgainst: 6, titles: 0, coach: 'Dragan Stojković', squad: [] },
  { id: 'pan', name: 'Panamá', slug: 'panama', code: 'PA', group: 'E', ranking: 43, form: ['D','W','L','D','W'], goalsFor: 6, goalsAgainst: 8, recentGoalsFor: 5, recentGoalsAgainst: 6, titles: 0, coach: 'Thomas Christiansen', squad: [] },

  // Grupo F
  { id: 'fra', name: 'França', slug: 'franca', code: 'FR', group: 'F', ranking: 2, form: ['W','D','W','W','D'], goalsFor: 14, goalsAgainst: 5, recentGoalsFor: 10, recentGoalsAgainst: 4, titles: 2, coach: 'Didier Deschamps', squad: [] },
  { id: 'kor', name: 'Coreia do Sul', slug: 'coreia-do-sul', code: 'KR', group: 'F', ranking: 23, form: ['W','L','W','D','W'], goalsFor: 11, goalsAgainst: 7, recentGoalsFor: 8, recentGoalsAgainst: 5, titles: 0, coach: 'Hong Myung-bo', squad: [] },
  { id: 'crc', name: 'Costa Rica', slug: 'costa-rica', code: 'CR', group: 'F', ranking: 52, form: ['D','W','L','L','D'], goalsFor: 5, goalsAgainst: 9, recentGoalsFor: 4, recentGoalsAgainst: 7, titles: 0, coach: 'Gustavo Alfaro', squad: [] },
  { id: 'nzl', name: 'Nova Zelândia', slug: 'nova-zelandia', code: 'NZ', group: 'F', ranking: 104, form: ['W','D','L','W','L'], goalsFor: 6, goalsAgainst: 10, recentGoalsFor: 4, recentGoalsAgainst: 8, titles: 0, coach: 'Darren Bazeley', squad: [] },

  // Grupo G
  { id: 'eng', name: 'Inglaterra', slug: 'inglaterra', code: 'GB-ENG', group: 'G', ranking: 4, form: ['W','W','D','W','D'], goalsFor: 13, goalsAgainst: 4, recentGoalsFor: 9, recentGoalsAgainst: 3, titles: 1, coach: 'Thomas Tuchel', squad: [] },
  { id: 'alg', name: 'Argélia', slug: 'argelia', code: 'DZ', group: 'G', ranking: 34, form: ['D','W','W','L','W'], goalsFor: 9, goalsAgainst: 6, recentGoalsFor: 7, recentGoalsAgainst: 5, titles: 0, coach: 'Vladimir Petković', squad: [] },
  { id: 'nor', name: 'Noruega', slug: 'noruega', code: 'NO', group: 'G', ranking: 43, form: ['W','W','L','D','W'], goalsFor: 10, goalsAgainst: 7, recentGoalsFor: 8, recentGoalsAgainst: 5, titles: 0, coach: 'Ståle Solbakken', squad: [] },
  { id: 'tun', name: 'Tunísia', slug: 'tunisia', code: 'TN', group: 'G', ranking: 41, form: ['L','D','W','W','L'], goalsFor: 5, goalsAgainst: 7, recentGoalsFor: 4, recentGoalsAgainst: 6, titles: 0, coach: 'Montasser Louhichi', squad: [] },

  // Grupo H
  { id: 'ger', name: 'Alemanha', slug: 'alemanha', code: 'DE', group: 'H', ranking: 16, form: ['W','D','W','L','W'], goalsFor: 12, goalsAgainst: 6, recentGoalsFor: 9, recentGoalsAgainst: 4, titles: 4, coach: 'Julian Nagelsmann', squad: [] },
  { id: 'uru', name: 'Uruguai', slug: 'uruguai', code: 'UY', group: 'H', ranking: 11, form: ['W','W','D','W','D'], goalsFor: 11, goalsAgainst: 5, recentGoalsFor: 8, recentGoalsAgainst: 4, titles: 2, coach: 'Marcelo Bielsa', squad: [] },
  { id: 'gha', name: 'Gana', slug: 'gana', code: 'GH', group: 'H', ranking: 68, form: ['D','L','W','D','W'], goalsFor: 7, goalsAgainst: 8, recentGoalsFor: 5, recentGoalsAgainst: 6, titles: 0, coach: 'Otto Addo', squad: [] },
  { id: 'qat', name: 'Catar', slug: 'catar', code: 'QA', group: 'H', ranking: 58, form: ['L','W','D','L','D'], goalsFor: 5, goalsAgainst: 9, recentGoalsFor: 4, recentGoalsAgainst: 7, titles: 0, coach: 'Luis García', squad: [] },

  // Grupo I
  { id: 'por', name: 'Portugal', slug: 'portugal', code: 'PT', group: 'I', ranking: 6, form: ['W','W','W','D','W'], goalsFor: 15, goalsAgainst: 4, recentGoalsFor: 11, recentGoalsAgainst: 3, titles: 0, coach: 'Roberto Martínez', squad: [] },
  { id: 'egy', name: 'Egito', slug: 'egito', code: 'EG', group: 'I', ranking: 36, form: ['W','D','L','W','W'], goalsFor: 9, goalsAgainst: 6, recentGoalsFor: 7, recentGoalsAgainst: 5, titles: 0, coach: 'Hossam Hassan', squad: [] },
  { id: 'cmr2', name: 'Camarões', slug: 'camaroes-i', code: 'CM', group: 'I', ranking: 51, form: ['D','W','L','D','W'], goalsFor: 8, goalsAgainst: 8, recentGoalsFor: 6, recentGoalsAgainst: 6, titles: 0, coach: 'Marc Brys', squad: [] },
  { id: 'jam', name: 'Jamaica', slug: 'jamaica', code: 'JM', group: 'I', ranking: 63, form: ['L','D','W','L','D'], goalsFor: 4, goalsAgainst: 10, recentGoalsFor: 3, recentGoalsAgainst: 7, titles: 0, coach: 'Heimir Hallgrímsson', squad: [] },

  // Grupo J
  { id: 'ned', name: 'Holanda', slug: 'holanda', code: 'NL', group: 'J', ranking: 7, form: ['W','D','W','W','L'], goalsFor: 13, goalsAgainst: 6, recentGoalsFor: 9, recentGoalsAgainst: 4, titles: 0, coach: 'Ronald Koeman', squad: [] },
  { id: 'aus', name: 'Austrália', slug: 'australia', code: 'AU', group: 'J', ranking: 24, form: ['W','W','D','L','W'], goalsFor: 10, goalsAgainst: 7, recentGoalsFor: 7, recentGoalsAgainst: 5, titles: 0, coach: 'Tony Popovic', squad: [] },
  { id: 'irn', name: 'Irã', slug: 'ira', code: 'IR', group: 'J', ranking: 20, form: ['D','W','W','D','L'], goalsFor: 8, goalsAgainst: 6, recentGoalsFor: 6, recentGoalsAgainst: 5, titles: 0, coach: 'Amir Ghalenoei', squad: [] },
  { id: 'slv', name: 'El Salvador', slug: 'el-salvador', code: 'SV', group: 'J', ranking: 75, form: ['L','D','L','W','D'], goalsFor: 4, goalsAgainst: 11, recentGoalsFor: 3, recentGoalsAgainst: 8, titles: 0, coach: 'Hernán Darío Gómez', squad: [] },

  // Grupo K
  { id: 'ita', name: 'Itália', slug: 'italia', code: 'IT', group: 'K', ranking: 9, form: ['W','W','D','L','W'], goalsFor: 12, goalsAgainst: 6, recentGoalsFor: 8, recentGoalsAgainst: 4, titles: 4, coach: 'Luciano Spalletti', squad: [] },
  { id: 'col', name: 'Colômbia', slug: 'colombia', code: 'CO', group: 'K', ranking: 12, form: ['W','D','W','W','D'], goalsFor: 11, goalsAgainst: 5, recentGoalsFor: 8, recentGoalsAgainst: 4, titles: 0, coach: 'Néstor Lorenzo', squad: [] },
  { id: 'civ', name: 'Costa do Marfim', slug: 'costa-do-marfim', code: 'CI', group: 'K', ranking: 38, form: ['D','W','L','W','W'], goalsFor: 8, goalsAgainst: 7, recentGoalsFor: 6, recentGoalsAgainst: 5, titles: 0, coach: 'Emerse Faé', squad: [] },
  { id: 'png', name: 'Papua-Nova Guiné', slug: 'papua-nova-guine', code: 'PG', group: 'K', ranking: 165, form: ['L','L','D','L','L'], goalsFor: 2, goalsAgainst: 15, recentGoalsFor: 1, recentGoalsAgainst: 11, titles: 0, coach: 'Felipe Vega-Arango', squad: [] },

  // Grupo L
  { id: 'bel', name: 'Bélgica', slug: 'belgica', code: 'BE', group: 'L', ranking: 8, form: ['W','L','D','W','W'], goalsFor: 12, goalsAgainst: 7, recentGoalsFor: 9, recentGoalsAgainst: 5, titles: 0, coach: 'Domenico Tedesco', squad: [] },
  { id: 'den', name: 'Dinamarca', slug: 'dinamarca', code: 'DK', group: 'L', ranking: 21, form: ['D','W','W','L','D'], goalsFor: 9, goalsAgainst: 6, recentGoalsFor: 6, recentGoalsAgainst: 5, titles: 0, coach: 'Kasper Hjulmand', squad: [] },
  { id: 'par', name: 'Paraguai', slug: 'paraguai', code: 'PY', group: 'L', ranking: 49, form: ['W','D','L','D','W'], goalsFor: 6, goalsAgainst: 7, recentGoalsFor: 5, recentGoalsAgainst: 6, titles: 0, coach: 'Gustavo Alfaro', squad: [] },
  { id: 'uae', name: 'Emirados Árabes', slug: 'emirados-arabes', code: 'AE', group: 'L', ranking: 69, form: ['L','W','D','L','D'], goalsFor: 5, goalsAgainst: 10, recentGoalsFor: 4, recentGoalsAgainst: 8, titles: 0, coach: 'Paulo Bento', squad: [] },
];

export function getTeamsByGroup(): Record<string, Team[]> {
  return teams.reduce((acc, team) => {
    if (!acc[team.group]) acc[team.group] = [];
    acc[team.group].push(team);
    return acc;
  }, {} as Record<string, Team[]>);
}

export function getTeamBySlug(slug: string): Team | undefined {
  return teams.find((t) => t.slug === slug);
}

export function getTeamById(id: string): Team | undefined {
  return teams.find((t) => t.id === id);
}
