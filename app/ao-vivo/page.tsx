import { SectionTitle } from "@/components/SectionTitle";
import { LiveMatchCard } from "@/components/LiveMatchCard";
import { MatchCard } from "@/components/MatchCard";
import { allMatches, getLiveMatches } from "@/data/matches";
import { Radio } from "lucide-react";

export const metadata = {
  title: "Ao Vivo",
  description: "Resultados em tempo real da Copa do Mundo 2026.",
};

export default function LivePage() {
  const liveMatches = getLiveMatches();
  const recentFinished = allMatches
    .filter((m) => m.status === "finished")
    .slice(0, 4);

  return (
    <div className="space-y-10">
      <section>
        <SectionTitle subtitle="Placar em tempo real e eventos da partida">
          Jogos ao Vivo
        </SectionTitle>

        {liveMatches.length === 0 ? (
          <div className="panel p-8 text-center space-y-3">
            <Radio className="w-6 h-6 mx-auto opacity-50" />
            <p className="text-sm uppercase tracking-wider opacity-70">
              Nenhum jogo ao vivo no momento.
            </p>
            <p className="text-xs uppercase tracking-wider opacity-50">
              Quando houver partidas em andamento, os dados aparecerão automaticamente aqui.
            </p>
          </div>
        ) : (
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
