"use client";

import { SectionTitle } from "@/components/SectionTitle";
import { MatchCard } from "@/components/MatchCard";
import { useMatches } from "@/hooks/useApi";
import { Loader2 } from "lucide-react";

export default function KnockoutPage() {
  const { data, loading, error } = useMatches();
  const matches = data?.matches || [];
  const groupMatches = matches.filter((m) => m.group);
  const knockoutMatches = matches.filter((m) => !m.group && m.phase !== "Final" && m.phase !== "Disputa de 3º Lugar");
  const finalMatches = matches.filter((m) => m.phase === "Final" || m.phase === "Disputa de 3º Lugar");

  return (
    <div className="space-y-10">
      <section>
        <SectionTitle subtitle="Todos os jogos da fase de grupos">
          Fase de Grupos
        </SectionTitle>
        {loading && (
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider opacity-70">
            <Loader2 className="w-4 h-4 animate-spin" /> Carregando...
          </div>
        )}
        {error && (
          <div className="panel p-4 text-xs uppercase tracking-wider text-red-800">
            Erro: {error}
          </div>
        )}
        {data && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {groupMatches.slice(0, 12).map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        )}
      </section>

      <section>
        <SectionTitle subtitle="Chaveamento das eliminatórias">
          Fase Eliminatoria
        </SectionTitle>
        {knockoutMatches.length === 0 ? (
          <div className="panel p-8 text-center">
            <p className="text-sm uppercase tracking-wider opacity-70">
              A fase eliminatória será definida após o término dos grupos.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {knockoutMatches.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        )}
      </section>

      {finalMatches.length > 0 && (
        <section>
          <SectionTitle subtitle="Finais">
            Decisões
          </SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {finalMatches.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
