import { notFound } from "next/navigation";
import { SectionTitle } from "@/components/SectionTitle";
import { getTeamBySlug } from "@/data/teams";
import { getMatchesByTeam } from "@/data/matches";
import { getTeamFlagUrl, formatDateBR } from "@/lib/utils";
import { MatchCard } from "@/components/MatchCard";
import { AIInsight } from "@/components/AIInsight";
import { Trophy, Users, BarChart3 } from "lucide-react";

export function generateStaticParams() {
  const { teams } = require("@/data/teams");
  return teams.map((t: { slug: string }) => ({ slug: t.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const team = getTeamBySlug(params.slug);
  if (!team) return { title: "Seleção não encontrada" };
  return {
    title: team.name,
    description: `Elenco, jogos e estatísticas de ${team.name} na Copa do Mundo 2026.`,
  };
}

export default function TeamDetailPage({ params }: { params: { slug: string } }) {
  const team = getTeamBySlug(params.slug);
  if (!team) return notFound();

  const matches = getMatchesByTeam(team.id);

  return (
    <div className="space-y-10">
      <section className="panel p-6 sm:p-8">
        <div className="flex items-center gap-4 mb-4">
          <img
            src={getTeamFlagUrl(team.code)}
            alt={team.name}
            className="w-14 h-9 object-cover border border-foreground/30"
          />
          <div>
            <h1 className="text-xl sm:text-2xl font-bold uppercase tracking-[0.1em]">
              {team.name}
            </h1>
            <p className="text-xs uppercase tracking-wider opacity-70">
              Grupo {team.group} — Ranking FIFA {team.ranking}º
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          <div className="panel p-3 flex items-center gap-3">
            <Trophy className="w-4 h-4 opacity-70" />
            <div>
              <p className="text-[10px] uppercase tracking-wider opacity-60">Títulos</p>
              <p className="text-sm font-bold">{team.titles}</p>
            </div>
          </div>
          <div className="panel p-3 flex items-center gap-3">
            <Users className="w-4 h-4 opacity-70" />
            <div>
              <p className="text-[10px] uppercase tracking-wider opacity-60">Treinador</p>
              <p className="text-sm font-bold">{team.coach}</p>
            </div>
          </div>
          <div className="panel p-3 flex items-center gap-3">
            <BarChart3 className="w-4 h-4 opacity-70" />
            <div>
              <p className="text-[10px] uppercase tracking-wider opacity-60">Forma recente</p>
              <p className="text-sm font-bold tracking-widest">
                {team.form.join("-")}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <SectionTitle subtitle="Jogos programados e resultados">
          Confrontos
        </SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {matches.slice(0, 6).map((match) => (
            <MatchCard key={match.id} match={match} />
          ))}
        </div>
      </section>

      <section>
        <SectionTitle subtitle="Elenco principal">
          Jogadores
        </SectionTitle>
        <div className="panel p-6 text-center">
          <p className="text-sm uppercase tracking-wider opacity-70">
            Escalações serão disponibilizadas próximo aos jogos.
          </p>
        </div>
      </section>

      <section>
        <AIInsight prompt={`Faça uma análise técnica resumida da seleção ${team.name} para a Copa do Mundo 2026. Fale sobre expectativas, pontos fortes e desafios.`} />
      </section>
    </div>
  );
}
