"use client";

import { useState } from "react";
import { SectionTitle } from "@/components/SectionTitle";
import { SimulationBlock } from "@/components/SimulationBlock";
import { TournamentSimulator } from "@/components/TournamentSimulator";
import { useTeams } from "@/hooks/useApi";
import { Info, Loader2, Swords, Trophy } from "lucide-react";

export default function SimulatorPage() {
  const [tab, setTab] = useState<"confronto" | "copa">("confronto");
  const { data, loading } = useTeams();
  const teams = data?.teams || [];

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <SectionTitle subtitle="Simule confrontos ou a competição inteira">
        Simulador
      </SectionTitle>

      {/* Tabs */}
      <div className="flex border border-foreground retro-border">
        <button
          onClick={() => setTab("confronto")}
          className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs uppercase tracking-wider font-bold transition-colors ${
            tab === "confronto" ? "bg-foreground text-background" : "hover:bg-black/5"
          }`}
        >
          <Swords className="w-3 h-3" />
          Confronto
        </button>
        <button
          onClick={() => setTab("copa")}
          className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs uppercase tracking-wider font-bold transition-colors ${
            tab === "copa" ? "bg-foreground text-background" : "hover:bg-black/5"
          }`}
        >
          <Trophy className="w-3 h-3" />
          Copa Inteira
        </button>
      </div>

      {tab === "confronto" && (
        <>
          <div className="panel p-4 flex items-start gap-3">
            <Info className="w-4 h-4 mt-0.5 shrink-0 opacity-70" />
            <div className="text-xs leading-relaxed opacity-90 space-y-2">
              <p>
                Nossa engine de simulação combina ranking FIFA, forma recente, média de gols marcados
                e sofridos nos últimos 5 anos, além de peso de recência. O cálculo usa uma função logística
                para converter vantagens em probabilidades.
              </p>
              <p>
                O resultado é uma estimativa estatística, não uma previsão garantida. O futebol
                frequentemente desafia os números.
              </p>
            </div>
          </div>

          {loading ? (
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider opacity-70">
              <Loader2 className="w-4 h-4 animate-spin" /> Carregando seleções...
            </div>
          ) : (
            <SimulationBlock teams={teams} />
          )}
        </>
      )}

      {tab === "copa" && <TournamentSimulator />}
    </div>
  );
}
