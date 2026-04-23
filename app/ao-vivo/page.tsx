"use client";

import { SectionTitle } from "@/components/SectionTitle";
import { LiveMatchCard } from "@/components/LiveMatchCard";
import { MatchCard } from "@/components/MatchCard";
import { useLive } from "@/hooks/useApi";
import { Radio, Loader2 } from "lucide-react";

export default function LivePage() {
  const { data, loading, error } = useLive();
  const liveMatches = data?.live || [];
  const recentFinished = data?.recent || [];

  return (
    <div className="space-y-10">
      <section>
        <SectionTitle subtitle="Placar em tempo real e eventos da partida">
          Jogos ao Vivo
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

        {!loading && liveMatches.length === 0 && (
          <div className="panel p-8 text-center space-y-3">
            <Radio className="w-6 h-6 mx-auto opacity-50" />
            <p className="text-sm uppercase tracking-wider opacity-70">
              Nenhum jogo ao vivo no momento.
            </p>
            <p className="text-xs uppercase tracking-wider opacity-50">
              Quando houver partidas em andamento, os dados aparecerão automaticamente aqui.
            </p>
          </div>
        )}

        {liveMatches.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {liveMatches.map((match) => (
              <LiveMatchCard key={match.id} match={match} />
            ))}
          </div>
        )}
      </section>

      {recentFinished.length > 0 && (
        <section>
          <SectionTitle subtitle="Últimos resultados">
            Encerrados Recentemente
          </SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recentFinished.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
