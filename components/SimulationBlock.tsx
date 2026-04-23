"use client";

import { useState } from "react";
import { Team, SimulationResult } from "@/types";
import { simulateMatch, getTeamFlagUrl } from "@/lib/utils";
import { TrendingUp, AlertTriangle } from "lucide-react";

export function SimulationBlock({ teams }: { teams: Team[] }) {
  const [home, setHome] = useState<Team | null>(null);
  const [away, setAway] = useState<Team | null>(null);
  const [result, setResult] = useState<SimulationResult | null>(null);

  const handleSimulate = () => {
    if (home && away && home.id !== away.id) {
      setResult(simulateMatch(home, away));
    }
  };

  return (
    <div className="panel p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold uppercase tracking-widest flex items-center gap-2">
          <TrendingUp className="w-4 h-4" />
          Simulação de Confronto
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-wider font-bold">Seleção A</label>
          <select
            className="retro-input w-full text-xs"
            value={home?.id ?? ""}
            onChange={(e) => setHome(teams.find((t) => t.id === e.target.value) ?? null)}
          >
            <option value="">Selecione...</option>
            {teams.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-wider font-bold">Seleção B</label>
          <select
            className="retro-input w-full text-xs"
            value={away?.id ?? ""}
            onChange={(e) => setAway(teams.find((t) => t.id === e.target.value) ?? null)}
          >
            <option value="">Selecione...</option>
            {teams.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        onClick={handleSimulate}
        disabled={!home || !away || home.id === away.id}
        className="retro-btn retro-btn-primary w-full disabled:opacity-40"
      >
        Simular Confronto
      </button>

      {result && home && away && (
        <div className="border-t border-foreground retro-border pt-4 space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1 flex flex-col items-center gap-1">
              <img src={getTeamFlagUrl(home.code)} alt={home.name} className="w-8 h-5 object-cover border border-foreground/30" />
              <span className="text-xs font-bold uppercase">{home.name}</span>
              <span className="text-lg font-bold">{result.homeWin}%</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="text-[10px] uppercase tracking-wider">Empate</span>
              <span className="text-lg font-bold">{result.draw}%</span>
            </div>
            <div className="flex-1 flex flex-col items-center gap-1">
              <img src={getTeamFlagUrl(away.code)} alt={away.name} className="w-8 h-5 object-cover border border-foreground/30" />
              <span className="text-xs font-bold uppercase">{away.name}</span>
              <span className="text-lg font-bold">{result.awayWin}%</span>
            </div>
          </div>

          <div className="text-center text-xs uppercase tracking-wider opacity-80">
            Gols esperados: {home.name} {result.expectedGoalsHome} × {result.expectedGoalsAway} {away.name}
          </div>

          <div className="panel-dark p-3 text-xs leading-relaxed">
            <p className="uppercase tracking-wider font-bold mb-1">Análise resumida</p>
            <p>{result.summary}</p>
          </div>

          <div className="flex items-start gap-2 text-[10px] uppercase tracking-wider opacity-70">
            <AlertTriangle className="w-3 h-3 mt-0.5 shrink-0" />
            <p>
              Esta simulação é baseada em estatísticas históricas e modelagem probabilística simples.
              Não constitui previsão garantida. O futebol é imprevisível.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
