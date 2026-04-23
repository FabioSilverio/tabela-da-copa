import Link from "next/link";
import { SectionTitle } from "@/components/SectionTitle";
import { MatchCard } from "@/components/MatchCard";
import { TeamCard } from "@/components/TeamCard";
import { SimulationBlock } from "@/components/SimulationBlock";
import { teams } from "@/data/teams";
import { allMatches } from "@/data/matches";
import { Calendar, Trophy, Tv, BarChart3, ChevronRight } from "lucide-react";

export default function HomePage() {
  const upcomingMatches = allMatches.filter((m) => m.status === "not_started").slice(0, 4);
  const featuredTeams = teams.filter((t) => ["bra", "arg", "fra", "eng", "ger", "esp"].includes(t.id));

  return (
    <div className="space-y-12">
      {/* Hero discreto */}
      <section className="panel p-6 sm:p-8">
        <div className="flex items-center gap-2 mb-3">
          <Trophy className="w-5 h-5" />
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold opacity-70">
            Copa do Mundo FIFA 2026
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold uppercase tracking-[0.1em] mb-3">
          Tabela da Copa
        </h1>
        <p className="text-sm leading-relaxed max-w-2xl opacity-90">
          Acompanhe a maior competição de futebol do planeta com um visual retrô inspirado nos
          jornais e terminais clássicos. Tabelas, confrontos, resultados ao vivo, escalações
          e simulações estatísticas em um só lugar.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/grupos" className="retro-btn no-underline">
            <Calendar className="w-3 h-3" /> Ver Grupos
          </Link>
          <Link href="/mata-mata" className="retro-btn no-underline">
            <Trophy className="w-3 h-3" /> Mata-Mata
          </Link>
          <Link href="/ao-vivo" className="retro-btn no-underline">
            <Tv className="w-3 h-3" /> Ao Vivo
          </Link>
          <Link href="/simulador" className="retro-btn no-underline">
            <BarChart3 className="w-3 h-3" /> Simulador
          </Link>
        </div>
      </section>

      {/* Próximos jogos */}
      <section>
        <SectionTitle subtitle="Confrontos programados da fase de grupos">
          Próximos Jogos
        </SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {upcomingMatches.map((match) => (
            <MatchCard key={match.id} match={match} />
          ))}
        </div>
        <div className="mt-4">
          <Link href="/mata-mata" className="text-xs uppercase tracking-wider flex items-center gap-1 no-underline hover:opacity-70">
            Ver todos os jogos <ChevronRight className="w-3 h-3" />
          </Link>
        </div>
      </section>

      {/* Seleções em destaque */}
      <section>
        <SectionTitle subtitle="Principais candidatas ao título">
          Seleções em Destaque
        </SectionTitle>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {featuredTeams.map((team) => (
            <TeamCard key={team.id} team={team} />
          ))}
        </div>
        <div className="mt-4">
          <Link href="/selecoes" className="text-xs uppercase tracking-wider flex items-center gap-1 no-underline hover:opacity-70">
            Ver todas as seleções <ChevronRight className="w-3 h-3" />
          </Link>
        </div>
      </section>

      {/* Simulador rápido */}
      <section>
        <SectionTitle subtitle="Compare duas seleções com base em estatísticas">
          Simulador Rápido
        </SectionTitle>
        <SimulationBlock teams={teams} />
      </section>
    </div>
  );
}
