"use client";

import { useState, useCallback } from "react";
import { getTeamFlagUrl } from "@/lib/utils";
import { getAllMarketData, getMarketData } from "@/data/prediction-markets";
import { Loader2, Trophy, BarChart3, AlertTriangle, Play, TrendingUp, Activity } from "lucide-react";

interface TeamStat {
  teamId: string;
  teamName: string;
  teamCode: string;
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

export function TournamentSimulator() {
  const [running, setRunning] = useState(false);
  const [results, setResults] = useState<TeamStat[] | null>(null);
  const [iterations, setIterations] = useState(1000);
  const [progress, setProgress] = useState(0);
  const [showMarkets, setShowMarkets] = useState(true);

  const marketData = getAllMarketData();

  const runSimulation = useCallback(async () => {
    setRunning(true);
    setProgress(0);
    setResults(null);

    const { runMonteCarlo } = await import("@/lib/tournament");
    
    const chunkSize = 100;
    const totalChunks = Math.ceil(iterations / chunkSize);
    let allStats = new Map<string, TeamStat>();

    for (let chunk = 0; chunk < totalChunks; chunk++) {
      const currentIterations = Math.min(chunkSize, iterations - chunk * chunkSize);
      const result = runMonteCarlo(currentIterations);

      result.teamStats.forEach((stat) => {
        const existing = allStats.get(stat.team.id);
        if (!existing) {
          allStats.set(stat.team.id, {
            teamId: stat.team.id,
            teamName: stat.team.name,
            teamCode: stat.team.code,
            champion: stat.champion,
            second: stat.second,
            third: stat.third,
            fourth: stat.fourth,
            semifinal: stat.semifinal,
            quarterfinal: stat.quarterfinal,
            roundOf16: stat.roundOf16,
            groupStage: stat.groupStage,
            avgPoints: stat.avgPoints,
            avgGoalsFor: stat.avgGoalsFor,
            avgGoalsAgainst: stat.avgGoalsAgainst,
          });
        } else {
          const totalWeight = chunk * chunkSize + currentIterations;
          const w1 = (chunk * chunkSize) / totalWeight;
          const w2 = currentIterations / totalWeight;
          existing.champion = existing.champion * w1 + stat.champion * w2;
          existing.second = existing.second * w1 + stat.second * w2;
          existing.third = existing.third * w1 + stat.third * w2;
          existing.fourth = existing.fourth * w1 + stat.fourth * w2;
          existing.semifinal = existing.semifinal * w1 + stat.semifinal * w2;
          existing.quarterfinal = existing.quarterfinal * w1 + stat.quarterfinal * w2;
          existing.roundOf16 = existing.roundOf16 * w1 + stat.roundOf16 * w2;
          existing.groupStage = existing.groupStage * w1 + stat.groupStage * w2;
          existing.avgPoints = existing.avgPoints * w1 + stat.avgPoints * w2;
          existing.avgGoalsFor = existing.avgGoalsFor * w1 + stat.avgGoalsFor * w2;
          existing.avgGoalsAgainst = existing.avgGoalsAgainst * w1 + stat.avgGoalsAgainst * w2;
        }
      });

      setProgress(Math.round(((chunk + 1) / totalChunks) * 100));
      await new Promise((r) => setTimeout(r, 10));
    }

    const sorted = Array.from(allStats.values()).sort((a, b) => b.champion - a.champion);
    setResults(sorted);
    setRunning(false);
    setProgress(100);
  }, [iterations]);

  return (
    <div className="space-y-6">
      {/* Mercados de Previsao */}
      {showMarkets && (
        <div className="panel p-4 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-widest flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Chances de Mercado (Polymarket / Kalshi)
            </h3>
            <span className="text-[9px] uppercase tracking-wider opacity-50">
              Dados: Abr/2026
            </span>
          </div>
          
          <div className="space-y-2">
            {marketData.slice(0, 15).map((market) => (
              <div key={market.teamId} className="flex items-center gap-3 text-xs">
                <span className="w-32 font-bold uppercase truncate">
                  {market.teamId.toUpperCase()}
                </span>
                <div className="flex-1 bg-black/5 h-4 border border-foreground/10 relative">
                  <div
                    className="h-full bg-accent/80"
                    style={{ width: `${Math.min(market.championImplied * 5, 100)}%` }}
                  />
                </div>
                <div className="w-24 text-right">
                  <span className="font-bold">{market.championImplied.toFixed(1)}%</span>
                  <span className="text-[9px] opacity-50 ml-1">(odds {market.championOdds})</span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-[9px] uppercase tracking-wider opacity-50 pt-2 border-t border-foreground/10">
            Fonte: Sintese Polymarket + Kalshi + casas de apostas. Probabilidades implicitas calculadas de odds decimais.
          </div>
        </div>
      )}

      {/* Simulacao Monte Carlo */}
      <div className="panel p-4 space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-widest flex items-center gap-2">
          <Activity className="w-4 h-4" />
          Simulacao Monte Carlo (Nosso Modelo)
        </h3>

        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-wider font-bold block">
            Numero de simulacoes: {iterations.toLocaleString()}
          </label>
          <input
            type="range"
            min="100"
            max="10000"
            step="100"
            value={iterations}
            onChange={(e) => setIterations(Number(e.target.value))}
            className="w-full accent-foreground"
          />
          <div className="flex justify-between text-[10px] uppercase tracking-wider opacity-60">
            <span>100</span>
            <span>10.000</span>
          </div>
        </div>

        <button
          onClick={runSimulation}
          disabled={running}
          className="retro-btn retro-btn-primary w-full flex items-center justify-center gap-2"
        >
          {running ? (
            <>
              <Loader2 className="w-3 h-3 animate-spin" />
              Simulando... {progress}%
            </>
          ) : (
            <>
              <Play className="w-3 h-3" />
              Simular Copa Inteira
            </>
          )}
        </button>

        {running && (
          <div className="w-full bg-panel-dark/10 h-2 border border-foreground/20">
            <div
              className="h-full bg-foreground transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </div>

      {/* Resultados */}
      {results && (
        <div className="space-y-4">
          {/* Comparacao: Modelo vs Mercado */}
          <div className="panel p-4 overflow-x-auto">
            <h4 className="text-xs font-bold uppercase tracking-widest mb-3 flex items-center gap-2">
              <BarChart3 className="w-3 h-3" />
              Comparacao: Modelo vs Mercado (% Campeao)
            </h4>
            <table className="w-full text-[10px] uppercase tracking-wider">
              <thead>
                <tr className="border-b border-foreground/20">
                  <th className="text-left px-2 py-1">Selecao</th>
                  <th className="text-center px-1 py-1">Mercado</th>
                  <th className="text-center px-1 py-1">Modelo</th>
                  <th className="text-center px-1 py-1">Diferenca</th>
                </tr>
              </thead>
              <tbody>
                {results.slice(0, 15).map((stat) => {
                  const market = getMarketData(stat.teamId);
                  const marketProb = market?.championImplied ?? 0;
                  const diff = stat.champion - marketProb;
                  return (
                    <tr key={stat.teamId} className="border-b border-foreground/5">
                      <td className="px-2 py-1">
                        <span className="font-bold">{stat.teamName}</span>
                      </td>
                      <td className="text-center px-1 py-1">{marketProb.toFixed(1)}%</td>
                      <td className="text-center px-1 py-1 font-bold">{stat.champion.toFixed(1)}%</td>
                      <td className={`text-center px-1 py-1 font-bold ${diff > 0 ? 'text-green-700' : diff < 0 ? 'text-red-700' : ''}`}>
                        {diff > 0 ? '+' : ''}{diff.toFixed(1)}%
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Chances de campeao (modelo) */}
          <div className="panel p-4">
            <h4 className="text-xs font-bold uppercase tracking-widest mb-3 flex items-center gap-2">
              <Trophy className="w-3 h-3" />
              Chances de ser Campeao (Modelo)
            </h4>
            <div className="space-y-2">
              {results.slice(0, 10).map((stat) => (
                <div key={stat.teamId} className="flex items-center gap-3 text-xs">
                  <span className="w-32 font-bold uppercase truncate">{stat.teamName}</span>
                  <div className="flex-1 bg-black/5 h-4 border border-foreground/10 relative">
                    <div
                      className="h-full bg-foreground/80"
                      style={{ width: `${Math.min(stat.champion * 5, 100)}%` }}
                    />
                  </div>
                  <span className="w-12 text-right font-bold">{stat.champion.toFixed(1)}%</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-start gap-2 text-[10px] uppercase tracking-wider opacity-70 panel p-3">
            <AlertTriangle className="w-3 h-3 mt-0.5 shrink-0" />
            <p>
              Simulacao baseada em {iterations.toLocaleString()} execucoes Monte Carlo.
              Mercado = sintese Polymarket + Kalshi + casas de apostas.
              Diferencas positivas (verde) indicam que o modelo avalia a selecao melhor que o mercado.
              Nao constitui previsao garantida.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
