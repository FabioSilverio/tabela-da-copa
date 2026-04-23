export interface TeamData {
  id: string;
  name: string;
  slug: string;
  code: string;
  group: string;
  ranking: number;
  form: ('W' | 'D' | 'L')[];
  goalsFor: number;
  goalsAgainst: number;
  recentGoalsFor: number;
  recentGoalsAgainst: number;
  titles: number;
  coach: string;
  confederation: string;
}

// Dados baseados no sorteio oficial da FIFA (dezembro/2025)
// e rankings FIFA de novembro/2025
export const teamsData: TeamData[] = [
  // Grupo A
  { id: 'mex', name: 'México', slug: 'mexico', code: 'MX', group: 'A', ranking: 15, form: ['W','D','W','L','W'], goalsFor: 12, goalsAgainst: 6, recentGoalsFor: 8, recentGoalsAgainst: 4, titles: 0, coach: 'Jaime Lozano', confederation: 'CONCACAF' },
  { id: 'rsa', name: 'África do Sul', slug: 'africa-do-sul', code: 'ZA', group: 'A', ranking: 61, form: ['D','W','L','D','W'], goalsFor: 6, goalsAgainst: 8, recentGoalsFor: 4, recentGoalsAgainst: 6, titles: 0, coach: 'Hugo Broos', confederation: 'CAF' },
  { id: 'kor', name: 'Coreia do Sul', slug: 'coreia-do-sul', code: 'KR', group: 'A', ranking: 22, form: ['W','L','W','D','W'], goalsFor: 11, goalsAgainst: 7, recentGoalsFor: 8, recentGoalsAgainst: 5, titles: 0, coach: 'Hong Myung-bo', confederation: 'AFC' },
  { id: 'cze', name: 'República Checa', slug: 'republica-checa', code: 'CZ', group: 'A', ranking: 42, form: ['W','W','D','L','D'], goalsFor: 9, goalsAgainst: 7, recentGoalsFor: 6, recentGoalsAgainst: 5, titles: 0, coach: 'Ivan Hašek', confederation: 'UEFA' },

  // Grupo B
  { id: 'can', name: 'Canadá', slug: 'canada', code: 'CA', group: 'B', ranking: 27, form: ['W','W','L','D','W'], goalsFor: 9, goalsAgainst: 7, recentGoalsFor: 6, recentGoalsAgainst: 5, titles: 0, coach: 'Jesse Marsch', confederation: 'CONCACAF' },
  { id: 'bih', name: 'Bósnia e Herzegovina', slug: 'bosnia-e-herzegovina', code: 'BA', group: 'B', ranking: 74, form: ['D','W','L','W','D'], goalsFor: 7, goalsAgainst: 9, recentGoalsFor: 5, recentGoalsAgainst: 7, titles: 0, coach: 'Sergej Barbarez', confederation: 'UEFA' },
  { id: 'qat', name: 'Catar', slug: 'catar', code: 'QA', group: 'B', ranking: 51, form: ['L','W','D','L','D'], goalsFor: 5, goalsAgainst: 9, recentGoalsFor: 4, recentGoalsAgainst: 7, titles: 0, coach: 'Luis García', confederation: 'AFC' },
  { id: 'sui', name: 'Suíça', slug: 'suica', code: 'CH', group: 'B', ranking: 17, form: ['D','W','L','W','D'], goalsFor: 9, goalsAgainst: 7, recentGoalsFor: 6, recentGoalsAgainst: 5, titles: 0, coach: 'Murat Yakin', confederation: 'UEFA' },

  // Grupo C
  { id: 'bra', name: 'Brasil', slug: 'brasil', code: 'BR', group: 'C', ranking: 5, form: ['W','D','W','W','L'], goalsFor: 14, goalsAgainst: 6, recentGoalsFor: 10, recentGoalsAgainst: 4, titles: 5, coach: 'Dorival Júnior', confederation: 'CONMEBOL' },
  { id: 'mar', name: 'Marrocos', slug: 'marrocos', code: 'MA', group: 'C', ranking: 11, form: ['W','D','W','W','L'], goalsFor: 11, goalsAgainst: 5, recentGoalsFor: 8, recentGoalsAgainst: 4, titles: 0, coach: 'Walid Regragui', confederation: 'CAF' },
  { id: 'hai', name: 'Haiti', slug: 'haiti', code: 'HT', group: 'C', ranking: 84, form: ['L','D','W','L','D'], goalsFor: 4, goalsAgainst: 11, recentGoalsFor: 3, recentGoalsAgainst: 8, titles: 0, coach: 'Sébastien Migné', confederation: 'CONCACAF' },
  { id: 'sco', name: 'Escócia', slug: 'escocia', code: 'GB-SCT', group: 'C', ranking: 36, form: ['W','D','L','W','W'], goalsFor: 10, goalsAgainst: 7, recentGoalsFor: 7, recentGoalsAgainst: 5, titles: 0, coach: 'Steve Clarke', confederation: 'UEFA' },

  // Grupo D
  { id: 'usa', name: 'Estados Unidos', slug: 'estados-unidos', code: 'US', group: 'D', ranking: 14, form: ['W','L','W','D','W'], goalsFor: 11, goalsAgainst: 7, recentGoalsFor: 8, recentGoalsAgainst: 5, titles: 0, coach: 'Mauricio Pochettino', confederation: 'CONCACAF' },
  { id: 'par', name: 'Paraguai', slug: 'paraguai', code: 'PY', group: 'D', ranking: 39, form: ['W','D','L','D','W'], goalsFor: 6, goalsAgainst: 7, recentGoalsFor: 5, recentGoalsAgainst: 6, titles: 0, coach: 'Gustavo Alfaro', confederation: 'CONMEBOL' },
  { id: 'aus', name: 'Austrália', slug: 'australia', code: 'AU', group: 'D', ranking: 26, form: ['W','W','D','L','W'], goalsFor: 10, goalsAgainst: 7, recentGoalsFor: 7, recentGoalsAgainst: 5, titles: 0, coach: 'Tony Popovic', confederation: 'AFC' },
  { id: 'tur', name: 'Turquia', slug: 'turquia', code: 'TR', group: 'D', ranking: 28, form: ['W','W','D','W','L'], goalsFor: 12, goalsAgainst: 8, recentGoalsFor: 9, recentGoalsAgainst: 6, titles: 0, coach: 'Vincenzo Montella', confederation: 'UEFA' },

  // Grupo E
  { id: 'ger', name: 'Alemanha', slug: 'alemanha', code: 'DE', group: 'E', ranking: 9, form: ['W','D','W','L','W'], goalsFor: 12, goalsAgainst: 6, recentGoalsFor: 9, recentGoalsAgainst: 4, titles: 4, coach: 'Julian Nagelsmann', confederation: 'UEFA' },
  { id: 'cuw', name: 'Curaçao', slug: 'curacao', code: 'CW', group: 'E', ranking: 82, form: ['L','W','D','L','D'], goalsFor: 4, goalsAgainst: 10, recentGoalsFor: 3, recentGoalsAgainst: 8, titles: 0, coach: 'Dick Advocaat', confederation: 'CONCACAF' },
  { id: 'civ', name: 'Costa do Marfim', slug: 'costa-do-marfim', code: 'CI', group: 'E', ranking: 42, form: ['D','W','L','W','W'], goalsFor: 8, goalsAgainst: 7, recentGoalsFor: 6, recentGoalsAgainst: 5, titles: 0, coach: 'Emerse Faé', confederation: 'CAF' },
  { id: 'ecu', name: 'Equador', slug: 'equador', code: 'EC', group: 'E', ranking: 23, form: ['D','W','W','L','D'], goalsFor: 7, goalsAgainst: 5, recentGoalsFor: 5, recentGoalsAgainst: 4, titles: 0, coach: 'Félix Sánchez', confederation: 'CONMEBOL' },

  // Grupo F
  { id: 'ned', name: 'Holanda', slug: 'holanda', code: 'NL', group: 'F', ranking: 7, form: ['W','D','W','W','L'], goalsFor: 13, goalsAgainst: 6, recentGoalsFor: 9, recentGoalsAgainst: 4, titles: 0, coach: 'Ronald Koeman', confederation: 'UEFA' },
  { id: 'jpn', name: 'Japão', slug: 'japao', code: 'JP', group: 'F', ranking: 18, form: ['W','W','D','W','L'], goalsFor: 13, goalsAgainst: 5, recentGoalsFor: 9, recentGoalsAgainst: 4, titles: 0, coach: 'Hajime Moriyasu', confederation: 'AFC' },
  { id: 'swe', name: 'Suécia', slug: 'suecia', code: 'SE', group: 'F', ranking: 29, form: ['W','W','L','D','W'], goalsFor: 10, goalsAgainst: 7, recentGoalsFor: 8, recentGoalsAgainst: 5, titles: 0, coach: 'Janne Andersson', confederation: 'UEFA' },
  { id: 'tun', name: 'Tunísia', slug: 'tunisia', code: 'TN', group: 'F', ranking: 40, form: ['L','D','W','W','L'], goalsFor: 5, goalsAgainst: 7, recentGoalsFor: 4, recentGoalsAgainst: 6, titles: 0, coach: 'Montasser Louhichi', confederation: 'CAF' },

  // Grupo G
  { id: 'bel', name: 'Bélgica', slug: 'belgica', code: 'BE', group: 'G', ranking: 8, form: ['W','L','D','W','W'], goalsFor: 12, goalsAgainst: 7, recentGoalsFor: 9, recentGoalsAgainst: 5, titles: 0, coach: 'Domenico Tedesco', confederation: 'UEFA' },
  { id: 'egy', name: 'Egito', slug: 'egito', code: 'EG', group: 'G', ranking: 34, form: ['W','D','L','W','W'], goalsFor: 9, goalsAgainst: 6, recentGoalsFor: 7, recentGoalsAgainst: 5, titles: 0, coach: 'Hossam Hassan', confederation: 'CAF' },
  { id: 'irn', name: 'Irã', slug: 'ira', code: 'IR', group: 'G', ranking: 20, form: ['D','W','W','D','L'], goalsFor: 8, goalsAgainst: 6, recentGoalsFor: 6, recentGoalsAgainst: 5, titles: 0, coach: 'Amir Ghalenoei', confederation: 'AFC' },
  { id: 'nzl', name: 'Nova Zelândia', slug: 'nova-zelandia', code: 'NZ', group: 'G', ranking: 86, form: ['W','D','L','W','L'], goalsFor: 6, goalsAgainst: 10, recentGoalsFor: 4, recentGoalsAgainst: 8, titles: 0, coach: 'Darren Bazeley', confederation: 'OFC' },

  // Grupo H
  { id: 'esp', name: 'Espanha', slug: 'espanha', code: 'ES', group: 'H', ranking: 1, form: ['W','W','W','D','W'], goalsFor: 15, goalsAgainst: 4, recentGoalsFor: 11, recentGoalsAgainst: 3, titles: 1, coach: 'Luis de la Fuente', confederation: 'UEFA' },
  { id: 'cpv', name: 'Cabo Verde', slug: 'cabo-verde', code: 'CV', group: 'H', ranking: 68, form: ['D','W','L','D','W'], goalsFor: 7, goalsAgainst: 8, recentGoalsFor: 5, recentGoalsAgainst: 6, titles: 0, coach: 'Bubista', confederation: 'CAF' },
  { id: 'ksa', name: 'Arábia Saudita', slug: 'arabia-saudita', code: 'SA', group: 'H', ranking: 60, form: ['L','D','W','L','D'], goalsFor: 5, goalsAgainst: 10, recentGoalsFor: 4, recentGoalsAgainst: 8, titles: 0, coach: 'Hervé Renard', confederation: 'AFC' },
  { id: 'uru', name: 'Uruguai', slug: 'uruguai', code: 'UY', group: 'H', ranking: 16, form: ['W','W','D','W','D'], goalsFor: 11, goalsAgainst: 5, recentGoalsFor: 8, recentGoalsAgainst: 4, titles: 2, coach: 'Marcelo Bielsa', confederation: 'CONMEBOL' },

  // Grupo I
  { id: 'fra', name: 'França', slug: 'franca', code: 'FR', group: 'I', ranking: 3, form: ['W','D','W','W','D'], goalsFor: 14, goalsAgainst: 5, recentGoalsFor: 10, recentGoalsAgainst: 4, titles: 2, coach: 'Didier Deschamps', confederation: 'UEFA' },
  { id: 'sen', name: 'Senegal', slug: 'senegal', code: 'SN', group: 'I', ranking: 19, form: ['W','D','W','L','W'], goalsFor: 10, goalsAgainst: 6, recentGoalsFor: 7, recentGoalsAgainst: 4, titles: 0, coach: 'Aliou Cissé', confederation: 'CAF' },
  { id: 'irq', name: 'Iraque', slug: 'iraque', code: 'IQ', group: 'I', ranking: 63, form: ['L','W','D','L','W'], goalsFor: 5, goalsAgainst: 9, recentGoalsFor: 4, recentGoalsAgainst: 7, titles: 0, coach: 'Jesús Casas', confederation: 'AFC' },
  { id: 'nor', name: 'Noruega', slug: 'noruega', code: 'NO', group: 'I', ranking: 29, form: ['W','W','L','D','W'], goalsFor: 10, goalsAgainst: 7, recentGoalsFor: 8, recentGoalsAgainst: 5, titles: 0, coach: 'Ståle Solbakken', confederation: 'UEFA' },

  // Grupo J
  { id: 'arg', name: 'Argentina', slug: 'argentina', code: 'AR', group: 'J', ranking: 2, form: ['W','W','D','W','W'], goalsFor: 16, goalsAgainst: 3, recentGoalsFor: 12, recentGoalsAgainst: 2, titles: 3, coach: 'Lionel Scaloni', confederation: 'CONMEBOL' },
  { id: 'alg', name: 'Argélia', slug: 'argelia', code: 'DZ', group: 'J', ranking: 35, form: ['D','W','W','L','W'], goalsFor: 9, goalsAgainst: 6, recentGoalsFor: 7, recentGoalsAgainst: 5, titles: 0, coach: 'Vladimir Petković', confederation: 'CAF' },
  { id: 'aut', name: 'Áustria', slug: 'austria', code: 'AT', group: 'J', ranking: 24, form: ['W','D','W','L','W'], goalsFor: 11, goalsAgainst: 7, recentGoalsFor: 8, recentGoalsAgainst: 5, titles: 0, coach: 'Ralf Rangnick', confederation: 'UEFA' },
  { id: 'jor', name: 'Jordânia', slug: 'jordania', code: 'JO', group: 'J', ranking: 66, form: ['W','D','L','W','L'], goalsFor: 6, goalsAgainst: 9, recentGoalsFor: 4, recentGoalsAgainst: 7, titles: 0, coach: 'Hussein Ammouta', confederation: 'AFC' },

  // Grupo K
  { id: 'por', name: 'Portugal', slug: 'portugal', code: 'PT', group: 'K', ranking: 6, form: ['W','W','W','D','W'], goalsFor: 15, goalsAgainst: 4, recentGoalsFor: 11, recentGoalsAgainst: 3, titles: 0, coach: 'Roberto Martínez', confederation: 'UEFA' },
  { id: 'cod', name: 'RD Congo', slug: 'rd-congo', code: 'CD', group: 'K', ranking: 65, form: ['D','W','L','D','W'], goalsFor: 7, goalsAgainst: 8, recentGoalsFor: 5, recentGoalsAgainst: 6, titles: 0, coach: 'Sébastien Desabre', confederation: 'CAF' },
  { id: 'uzb', name: 'Uzbequistão', slug: 'uzbequistao', code: 'UZ', group: 'K', ranking: 50, form: ['W','D','W','L','D'], goalsFor: 8, goalsAgainst: 8, recentGoalsFor: 6, recentGoalsAgainst: 6, titles: 0, coach: 'Timur Kapadze', confederation: 'AFC' },
  { id: 'col', name: 'Colômbia', slug: 'colombia', code: 'CO', group: 'K', ranking: 13, form: ['W','D','W','W','D'], goalsFor: 11, goalsAgainst: 5, recentGoalsFor: 8, recentGoalsAgainst: 4, titles: 0, coach: 'Néstor Lorenzo', confederation: 'CONMEBOL' },

  // Grupo L
  { id: 'eng', name: 'Inglaterra', slug: 'inglaterra', code: 'GB-ENG', group: 'L', ranking: 4, form: ['W','W','D','W','D'], goalsFor: 13, goalsAgainst: 4, recentGoalsFor: 9, recentGoalsAgainst: 3, titles: 1, coach: 'Thomas Tuchel', confederation: 'UEFA' },
  { id: 'cro', name: 'Croácia', slug: 'croacia', code: 'HR', group: 'L', ranking: 10, form: ['D','W','L','W','D'], goalsFor: 10, goalsAgainst: 7, recentGoalsFor: 7, recentGoalsAgainst: 5, titles: 0, coach: 'Zlatko Dalić', confederation: 'UEFA' },
  { id: 'gha', name: 'Gana', slug: 'gana', code: 'GH', group: 'L', ranking: 72, form: ['D','L','W','D','W'], goalsFor: 7, goalsAgainst: 8, recentGoalsFor: 5, recentGoalsAgainst: 6, titles: 0, coach: 'Otto Addo', confederation: 'CAF' },
  { id: 'pan', name: 'Panamá', slug: 'panama', code: 'PA', group: 'L', ranking: 30, form: ['D','W','L','D','W'], goalsFor: 6, goalsAgainst: 8, recentGoalsFor: 5, recentGoalsAgainst: 6, titles: 0, coach: 'Thomas Christiansen', confederation: 'CONCACAF' },
];

export function getTeamsByGroup(): Record<string, TeamData[]> {
  return teamsData.reduce((acc, team) => {
    if (!acc[team.group]) acc[team.group] = [];
    acc[team.group].push(team);
    return acc;
  }, {} as Record<string, TeamData[]>);
}

export function getTeamBySlug(slug: string): TeamData | undefined {
  return teamsData.find((t) => t.slug === slug);
}

export function getTeamById(id: string): TeamData | undefined {
  return teamsData.find((t) => t.id === id);
}
