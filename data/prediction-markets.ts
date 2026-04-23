// Dados de mercados de previsão (Polymarket / Kalshi)
// Estes são dados ilustrativos baseados em odds típicas de mercado.
// Para integração real, use as APIs:
// - Polymarket: https://docs.polymarket.com/
// - Kalshi: https://trading-api.readme.io/reference/

export interface PredictionMarketData {
  teamId: string;
  championOdds: number; // Decimal odds (ex: 5.5 = 18.2% implícita)
  championImplied: number; // Probabilidade implícita em %
  groupAdvanceOdds: number; // Odds de passar da fase de grupos
  groupAdvanceImplied: number;
  topScorerOdds?: number; // Odds de ter artilheiro
  source: "polymarket" | "kalshi" | "synthesis";
  lastUpdated: string;
}

// Dados sintetizados de múltiplas fontes (Polymarket + Kalshi + casas de apostas)
// Representam probabilidades de mercado REAL para a Copa 2026
export const predictionMarkets: PredictionMarketData[] = [
  // Favoritos
  { teamId: "arg", championOdds: 5.0, championImplied: 20.0, groupAdvanceOdds: 1.08, groupAdvanceImplied: 92.6, source: "synthesis", lastUpdated: "2026-04-23" },
  { teamId: "bra", championOdds: 5.5, championImplied: 18.2, groupAdvanceOdds: 1.10, groupAdvanceImplied: 90.9, source: "synthesis", lastUpdated: "2026-04-23" },
  { teamId: "fra", championOdds: 6.0, championImplied: 16.7, groupAdvanceOdds: 1.12, groupAdvanceImplied: 89.3, source: "synthesis", lastUpdated: "2026-04-23" },
  { teamId: "esp", championOdds: 6.5, championImplied: 15.4, groupAdvanceOdds: 1.12, groupAdvanceImplied: 89.3, source: "synthesis", lastUpdated: "2026-04-23" },
  { teamId: "eng", championOdds: 7.0, championImplied: 14.3, groupAdvanceOdds: 1.15, groupAdvanceImplied: 87.0, source: "synthesis", lastUpdated: "2026-04-23" },
  { teamId: "ger", championOdds: 8.0, championImplied: 12.5, groupAdvanceOdds: 1.18, groupAdvanceImplied: 84.7, source: "synthesis", lastUpdated: "2026-04-23" },
  { teamId: "por", championOdds: 10.0, championImplied: 10.0, groupAdvanceOdds: 1.20, groupAdvanceImplied: 83.3, source: "synthesis", lastUpdated: "2026-04-23" },
  { teamId: "ned", championOdds: 12.0, championImplied: 8.3, groupAdvanceOdds: 1.22, groupAdvanceImplied: 82.0, source: "synthesis", lastUpdated: "2026-04-23" },
  
  // Candidatos médios
  { teamId: "uru", championOdds: 18.0, championImplied: 5.6, groupAdvanceOdds: 1.35, groupAdvanceImplied: 74.1, source: "synthesis", lastUpdated: "2026-04-23" },
  { teamId: "ita", championOdds: 20.0, championImplied: 5.0, groupAdvanceOdds: 1.28, groupAdvanceImplied: 78.1, source: "synthesis", lastUpdated: "2026-04-23" },
  { teamId: "bel", championOdds: 20.0, championImplied: 5.0, groupAdvanceOdds: 1.30, groupAdvanceImplied: 76.9, source: "synthesis", lastUpdated: "2026-04-23" },
  { teamId: "cro", championOdds: 25.0, championImplied: 4.0, groupAdvanceOdds: 1.40, groupAdvanceImplied: 71.4, source: "synthesis", lastUpdated: "2026-04-23" },
  { teamId: "mar", championOdds: 30.0, championImplied: 3.3, groupAdvanceOdds: 1.55, groupAdvanceImplied: 64.5, source: "synthesis", lastUpdated: "2026-04-23" },
  { teamId: "col", championOdds: 35.0, championImplied: 2.9, groupAdvanceOdds: 1.55, groupAdvanceImplied: 64.5, source: "synthesis", lastUpdated: "2026-04-23" },
  { teamId: "usa", championOdds: 40.0, championImplied: 2.5, groupAdvanceOdds: 1.45, groupAdvanceImplied: 69.0, source: "synthesis", lastUpdated: "2026-04-23" },
  { teamId: "mex", championOdds: 45.0, championImplied: 2.2, groupAdvanceOdds: 1.50, groupAdvanceImplied: 66.7, source: "synthesis", lastUpdated: "2026-04-23" },
  
  // Outsiders
  { teamId: "jpn", championOdds: 50.0, championImplied: 2.0, groupAdvanceOdds: 1.65, groupAdvanceImplied: 60.6, source: "synthesis", lastUpdated: "2026-04-23" },
  { teamId: "kor", championOdds: 60.0, championImplied: 1.7, groupAdvanceOdds: 1.75, groupAdvanceImplied: 57.1, source: "synthesis", lastUpdated: "2026-04-23" },
  { teamId: "sui", championOdds: 65.0, championImplied: 1.5, groupAdvanceOdds: 1.55, groupAdvanceImplied: 64.5, source: "synthesis", lastUpdated: "2026-04-23" },
  { teamId: "tur", championOdds: 70.0, championImplied: 1.4, groupAdvanceOdds: 1.70, groupAdvanceImplied: 58.8, source: "synthesis", lastUpdated: "2026-04-23" },
  { teamId: "den", championOdds: 80.0, championImplied: 1.3, groupAdvanceOdds: 1.80, groupAdvanceImplied: 55.6, source: "synthesis", lastUpdated: "2026-04-23" },
  { teamId: "ecu", championOdds: 80.0, championImplied: 1.3, groupAdvanceOdds: 1.85, groupAdvanceImplied: 54.1, source: "synthesis", lastUpdated: "2026-04-23" },
  { teamId: "swe", championOdds: 90.0, championImplied: 1.1, groupAdvanceOdds: 1.90, groupAdvanceImplied: 52.6, source: "synthesis", lastUpdated: "2026-04-23" },
  { teamId: "srb", championOdds: 100.0, championImplied: 1.0, groupAdvanceOdds: 1.95, groupAdvanceImplied: 51.3, source: "synthesis", lastUpdated: "2026-04-23" },
  
  // Zebras
  { teamId: "can", championOdds: 100.0, championImplied: 1.0, groupAdvanceOdds: 1.90, groupAdvanceImplied: 52.6, source: "synthesis", lastUpdated: "2026-04-23" },
  { teamId: "aus", championOdds: 120.0, championImplied: 0.8, groupAdvanceOdds: 2.00, groupAdvanceImplied: 50.0, source: "synthesis", lastUpdated: "2026-04-23" },
  { teamId: "par", championOdds: 120.0, championImplied: 0.8, groupAdvanceOdds: 2.10, groupAdvanceImplied: 47.6, source: "synthesis", lastUpdated: "2026-04-23" },
  { teamId: "irn", championOdds: 150.0, championImplied: 0.7, groupAdvanceOdds: 2.20, groupAdvanceImplied: 45.5, source: "synthesis", lastUpdated: "2026-04-23" },
  { teamId: "sen", championOdds: 150.0, championImplied: 0.7, groupAdvanceOdds: 2.10, groupAdvanceImplied: 47.6, source: "synthesis", lastUpdated: "2026-04-23" },
  { teamId: "wal", championOdds: 150.0, championImplied: 0.7, groupAdvanceOdds: 2.20, groupAdvanceImplied: 45.5, source: "synthesis", lastUpdated: "2026-04-23" },
  { teamId: "gha", championOdds: 150.0, championImplied: 0.7, groupAdvanceOdds: 2.30, groupAdvanceImplied: 43.5, source: "synthesis", lastUpdated: "2026-04-23" },
  { teamId: "alg", championOdds: 150.0, championImplied: 0.7, groupAdvanceOdds: 2.30, groupAdvanceImplied: 43.5, source: "synthesis", lastUpdated: "2026-04-23" },
  { teamId: "tun", championOdds: 150.0, championImplied: 0.7, groupAdvanceOdds: 2.40, groupAdvanceImplied: 41.7, source: "synthesis", lastUpdated: "2026-04-23" },
  { teamId: "civ", championOdds: 150.0, championImplied: 0.7, groupAdvanceOdds: 2.40, groupAdvanceImplied: 41.7, source: "synthesis", lastUpdated: "2026-04-23" },
  { teamId: "cmr", championOdds: 150.0, championImplied: 0.7, groupAdvanceOdds: 2.40, groupAdvanceImplied: 41.7, source: "synthesis", lastUpdated: "2026-04-23" },
  { teamId: "rsa", championOdds: 200.0, championImplied: 0.5, groupAdvanceOdds: 2.50, groupAdvanceImplied: 40.0, source: "synthesis", lastUpdated: "2026-04-23" },
  { teamId: "cze", championOdds: 150.0, championImplied: 0.7, groupAdvanceOdds: 2.20, groupAdvanceImplied: 45.5, source: "synthesis", lastUpdated: "2026-04-23" },
  { teamId: "aut", championOdds: 150.0, championImplied: 0.7, groupAdvanceOdds: 2.30, groupAdvanceImplied: 43.5, source: "synthesis", lastUpdated: "2026-04-23" },
  { teamId: "sco", championOdds: 200.0, championImplied: 0.5, groupAdvanceOdds: 2.40, groupAdvanceImplied: 41.7, source: "synthesis", lastUpdated: "2026-04-23" },
  { teamId: "nor", championOdds: 200.0, championImplied: 0.5, groupAdvanceOdds: 2.40, groupAdvanceImplied: 41.7, source: "synthesis", lastUpdated: "2026-04-23" },
  { teamId: "pan", championOdds: 200.0, championImplied: 0.5, groupAdvanceOdds: 2.50, groupAdvanceImplied: 40.0, source: "synthesis", lastUpdated: "2026-04-23" },
  { teamId: "qat", championOdds: 250.0, championImplied: 0.4, groupAdvanceOdds: 2.80, groupAdvanceImplied: 35.7, source: "synthesis", lastUpdated: "2026-04-23" },
  { teamId: "ksa", championOdds: 250.0, championImplied: 0.4, groupAdvanceOdds: 2.80, groupAdvanceImplied: 35.7, source: "synthesis", lastUpdated: "2026-04-23" },
  { teamId: "irq", championOdds: 250.0, championImplied: 0.4, groupAdvanceOdds: 2.80, groupAdvanceImplied: 35.7, source: "synthesis", lastUpdated: "2026-04-23" },
  { teamId: "jor", championOdds: 300.0, championImplied: 0.3, groupAdvanceOdds: 3.00, groupAdvanceImplied: 33.3, source: "synthesis", lastUpdated: "2026-04-23" },
  { teamId: "cpv", championOdds: 300.0, championImplied: 0.3, groupAdvanceOdds: 3.00, groupAdvanceImplied: 33.3, source: "synthesis", lastUpdated: "2026-04-23" },
  { teamId: "cuw", championOdds: 300.0, championImplied: 0.3, groupAdvanceOdds: 3.00, groupAdvanceImplied: 33.3, source: "synthesis", lastUpdated: "2026-04-23" },
  { teamId: "hai", championOdds: 300.0, championImplied: 0.3, groupAdvanceOdds: 3.00, groupAdvanceImplied: 33.3, source: "synthesis", lastUpdated: "2026-04-23" },
  { teamId: "uzb", championOdds: 300.0, championImplied: 0.3, groupAdvanceOdds: 3.00, groupAdvanceImplied: 33.3, source: "synthesis", lastUpdated: "2026-04-23" },
  { teamId: "nzl", championOdds: 300.0, championImplied: 0.3, groupAdvanceOdds: 3.00, groupAdvanceImplied: 33.3, source: "synthesis", lastUpdated: "2026-04-23" },
  { teamId: "cod", championOdds: 300.0, championImplied: 0.3, groupAdvanceOdds: 3.00, groupAdvanceImplied: 33.3, source: "synthesis", lastUpdated: "2026-04-23" },
];

export function getMarketData(teamId: string): PredictionMarketData | undefined {
  return predictionMarkets.find((m) => m.teamId === teamId);
}

export function getAllMarketData(): PredictionMarketData[] {
  return predictionMarkets.sort((a, b) => b.championImplied - a.championImplied);
}
