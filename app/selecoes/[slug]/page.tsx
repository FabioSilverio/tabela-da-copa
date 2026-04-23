"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { SectionTitle } from "@/components/SectionTitle";
import { MatchCard } from "@/components/MatchCard";
import { getTeamFlagUrl } from "@/lib/utils";
import { useMatches, useTeams } from "@/hooks/useApi";
import { getSquad, getPositionLabel } from "@/data/squads";
import { getMarketData } from "@/data/prediction-markets";
import { AIInsight } from "@/components/AIInsight";
import { Trophy, Users, BarChart3, Calendar, Shield, Search, ChevronRight, Loader2, Shirt, Goal, Star, TrendingUp, DollarSign } from "lucide-react";

export default function TeamDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [activeTab, setActiveTab] = useState<"visao" | "jogadores" | "jogos" | "estatisticas">("visao");

  const { data: teamsData } = useTeams();
  const { data: matchesData } = useMatches();

  const team = teamsData?.teams.find((t) => t.slug === slug);
  const allMatches = matchesData?.matches || [];
  const teamMatches = team ? allMatches.filter(
    (m) => m.homeTeamId === team.id || m.awayTeamId === team.id
  ) : [];
  const squad = team ? getSquad(team.id) : undefined;

  if (!team) {
    return (
      <div className="panel p-8 text-center">
        <p className="text-sm uppercase tracking-wider opacity-70">Seleção não encontrada</p>
      </div>
    );
  }

  const starters = squad?.players.filter((p) => p.isStarter) || [];
  const bench = squad?.players.filter((p) => !p.isStarter) || [];

  const tabs = [
    { id: "visao" as const, label: "Visão Geral", icon: Shield },
    { id: "jogadores" as const, label: "Jogadores", icon: Shirt },
    { id: "jogos" as const, label: "Jogos", icon: Calendar },
    { id: "estatisticas" as const, label: "Estatísticas", icon: BarChart3 },
  ];

  return (
    <div className="space-y-8">
      {/* Header da Seleção */}
      <section className="panel p-6 sm:p-8">
        <div className="flex items-center gap-4 mb-4">
          <img
            src={getTeamFlagUrl(team.code)}
            alt={team.name}
            className="w-16 h-10 object-cover border border-foreground/30"
          />
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold uppercase tracking-[0.1em]">
              {team.name}
            </h1>
            <p className="text-xs uppercase tracking-wider opacity-70 mt-1">
              Grupo {team.group} — Ranking FIFA {team.ranking}º — {team.confederation}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
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
              <p className="text-sm font-bold">{squad?.coach ?? team.coach}</p>
            </div>
          </div>
          <div className="panel p-3 flex items-center gap-3">
            <Shield className="w-4 h-4 opacity-70" />
            <div>
              <p className="text-[10px] uppercase tracking-wider opacity-60">Esquema</p>
              <p className="text-sm font-bold">{squad?.formation ?? "4-3-3"}</p>
            </div>
          </div>
          <div className="panel p-3 flex items-center gap-3">
            <BarChart3 className="w-4 h-4 opacity-70" />
            <div>
              <p className="text-[10px] uppercase tracking-wider opacity-60">Forma</p>
              <p className="text-sm font-bold tracking-widest">{team.form.join("-")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <div className="flex border border-foreground retro-border overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 text-[10px] sm:text-xs uppercase tracking-wider font-bold transition-colors whitespace-nowrap ${
              activeTab === tab.id ? "bg-foreground text-background" : "hover:bg-black/5"
            }`}
          >
            <tab.icon className="w-3 h-3" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Conteúdo das abas */}
      {activeTab === "visao" && (
        <div className="space-y-8">
          <section>
            <SectionTitle subtitle="Resumo da seleção">
              Visão Geral
            </SectionTitle>
            <div className="panel p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs uppercase tracking-wider">
                <div className="space-y-2">
                  <div className="flex justify-between border-b border-foreground/10 pb-1">
                    <span className="opacity-60">Ranking FIFA</span>
                    <span className="font-bold">{team.ranking}º</span>
                  </div>
                  <div className="flex justify-between border-b border-foreground/10 pb-1">
                    <span className="opacity-60">Confederação</span>
                    <span className="font-bold">{team.confederation}</span>
                  </div>
                  <div className="flex justify-between border-b border-foreground/10 pb-1">
                    <span className="opacity-60">Grupo</span>
                    <span className="font-bold">{team.group}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between border-b border-foreground/10 pb-1">
                    <span className="opacity-60">Títulos Mundiais</span>
                    <span className="font-bold">{team.titles}</span>
                  </div>
                  <div className="flex justify-between border-b border-foreground/10 pb-1">
                    <span className="opacity-60">Treinador</span>
                    <span className="font-bold">{squad?.coach ?? team.coach}</span>
                  </div>
                  <div className="flex justify-between border-b border-foreground/10 pb-1">
                    <span className="opacity-60">Esquema Tático</span>
                    <span className="font-bold">{squad?.formation ?? "4-3-3"}</span>
                  </div>
                </div>
              </div>

              {squad && (
                <div className="pt-4 border-t border-foreground/10">
                  <h4 className="text-[10px] font-bold uppercase tracking-widest mb-3">Titulares Prováveis</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                    {starters.slice(0, 8).map((player) => (
                      <div key={player.name} className="panel p-2 text-center">
                        <div className="text-lg font-bold">{player.number}</div>
                        <div className="text-[10px] font-bold uppercase truncate">{player.name}</div>
                        <div className="text-[9px] opacity-60 uppercase">{getPositionLabel(player.position)}</div>
                        <div className="text-[9px] opacity-50">{player.club}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>

          <section>
            <SectionTitle subtitle="Próximos confrontos">
              Jogos
            </SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {teamMatches.slice(0, 4).map((match) => (
                <MatchCard key={match.id} match={match} />
              ))}
            </div>
            <div className="mt-4">
              <button
                onClick={() => setActiveTab("jogos")}
                className="text-xs uppercase tracking-wider flex items-center gap-1 no-underline hover:opacity-70 bg-transparent border-none cursor-pointer font-mono"
              >
                Ver todos os jogos <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </section>

          <AIInsight prompt={`Faça uma análise técnica resumida da seleção ${team.name} para a Copa do Mundo 2026. Fale sobre expectativas, pontos fortes e desafios.`} />
        </div>
      )}

      {activeTab === "jogadores" && (
        <div className="space-y-6">
          {squad ? (
            <>
              <div className="panel p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold uppercase tracking-widest flex items-center gap-2">
                    <Star className="w-4 h-4" />
                    Titulares ({starters.length})
                  </h3>
                  <span className="text-[10px] uppercase tracking-wider opacity-60">
                    Esquema: {squad.formation}
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {starters.map((player) => (
                    <PlayerCard key={player.name} player={player} />
                  ))}
                </div>
              </div>

              <div className="panel p-4">
                <h3 className="text-sm font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Reservas ({bench.length})
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {bench.map((player) => (
                    <PlayerCard key={player.name} player={player} />
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="panel p-8 text-center">
              <Shirt className="w-8 h-8 mx-auto opacity-30 mb-3" />
              <p className="text-sm uppercase tracking-wider opacity-70">
                Escalação detalhada não disponível para esta seleção.
              </p>
              <p className="text-xs uppercase tracking-wider opacity-50 mt-2">
                Dados serão atualizados próximo ao início da competição.
              </p>
            </div>
          )}
        </div>
      )}

      {activeTab === "jogos" && (
        <div className="space-y-6">
          <SectionTitle subtitle="Todos os jogos da seleção na Copa 2026">
            Confrontos
          </SectionTitle>
          {teamMatches.length === 0 ? (
            <div className="panel p-8 text-center">
              <Calendar className="w-8 h-8 mx-auto opacity-30 mb-3" />
              <p className="text-sm uppercase tracking-wider opacity-70">
                Nenhum jogo encontrado para esta seleção.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {teamMatches.map((match) => (
                <MatchCard key={match.id} match={match} />
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === "estatisticas" && (
        <div className="space-y-6">
          <SectionTitle subtitle="Dados de desempenho">
            Estatísticas
          </SectionTitle>

          <div className="panel p-6">
            <h3 className="text-sm font-bold uppercase tracking-widest mb-4">Desempenho Recente</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <StatBox label="Gols Marcados" value={team.goalsFor} icon={Goal} />
              <StatBox label="Gols Sofridos" value={team.goalsAgainst} icon={Goal} />
              <StatBox label="Média Gols Pró" value={team.recentGoalsFor} icon={Star} />
              <StatBox label="Média Gols Contra" value={team.recentGoalsAgainst} icon={Shield} />
            </div>
          </div>

          {/* Dados de Mercado */}
          {(() => {
            const market = team ? getMarketData(team.id) : undefined;
            if (!market) return null;
            return (
              <div className="panel p-6">
                <h3 className="text-sm font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Chances de Mercado
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="panel p-3 text-center">
                    <Trophy className="w-4 h-4 mx-auto mb-1 opacity-60" />
                    <div className="text-lg font-bold">{market.championImplied.toFixed(1)}%</div>
                    <div className="text-[9px] uppercase tracking-wider opacity-60">Campea</div>
                    <div className="text-[9px] opacity-50">Odds {market.championOdds}</div>
                  </div>
                  <div className="panel p-3 text-center">
                    <BarChart3 className="w-4 h-4 mx-auto mb-1 opacity-60" />
                    <div className="text-lg font-bold">{market.groupAdvanceImplied.toFixed(1)}%</div>
                    <div className="text-[9px] uppercase tracking-wider opacity-60">Passa Grupo</div>
                    <div className="text-[9px] opacity-50">Odds {market.groupAdvanceOdds}</div>
                  </div>
                  <div className="panel p-3 text-center">
                    <DollarSign className="w-4 h-4 mx-auto mb-1 opacity-60" />
                    <div className="text-lg font-bold">{market.source.toUpperCase()}</div>
                    <div className="text-[9px] uppercase tracking-wider opacity-60">Fonte</div>
                    <div className="text-[9px] opacity-50">{market.lastUpdated}</div>
                  </div>
                </div>
                <p className="text-[9px] uppercase tracking-wider opacity-40 mt-3">
                  Fonte: Sintese Polymarket + Kalshi + casas de apostas. Dados ilustrativos.
                </p>
              </div>
            );
          })()}

          <div className="panel p-6">
            <h3 className="text-sm font-bold uppercase tracking-widest mb-4">Forma (Últimos 5 Jogos)</h3>
            <div className="flex items-center gap-3">
              {team.form.map((result, i) => (
                <div
                  key={i}
                  className={`w-10 h-10 flex items-center justify-center text-xs font-bold border border-foreground ${
                    result === "W" ? "bg-foreground text-background" : result === "D" ? "bg-black/10" : "border-dashed"
                  }`}
                >
                  {result === "W" ? "V" : result === "D" ? "E" : "D"}
                </div>
              ))}
            </div>
            <div className="flex items-center gap-6 mt-3 text-[10px] uppercase tracking-wider opacity-60">
              <span>V = Vitória</span>
              <span>E = Empate</span>
              <span>D = Derrota</span>
            </div>
          </div>

          {squad && (
            <div className="panel p-6">
              <h3 className="text-sm font-bold uppercase tracking-widest mb-4">Estatísticas do Elenco</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold">{squad.players.length}</div>
                  <div className="text-[10px] uppercase tracking-wider opacity-60">Jogadores</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">
                    {Math.round(squad.players.reduce((acc, p) => acc + p.age, 0) / squad.players.length)}
                  </div>
                  <div className="text-[10px] uppercase tracking-wider opacity-60">Média de Idade</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">
                    {squad.players.reduce((acc, p) => acc + p.caps, 0)}
                  </div>
                  <div className="text-[10px] uppercase tracking-wider opacity-60">Total de Caps</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">
                    {squad.players.reduce((acc, p) => acc + p.goals, 0)}
                  </div>
                  <div className="text-[10px] uppercase tracking-wider opacity-60">Gols na Seleção</div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function PlayerCard({ player }: { player: import("@/data/squads").PlayerInfo }) {
  return (
    <div className="panel p-3 flex items-center gap-3 hover:bg-black/[0.02]">
      <div className="w-10 h-10 flex items-center justify-center border border-foreground font-bold text-sm shrink-0">
        {player.number}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-xs font-bold uppercase truncate">{player.name}</div>
        <div className="text-[10px] opacity-60 uppercase">{getPositionLabel(player.position)}</div>
        <div className="text-[10px] opacity-50">{player.club}</div>
      </div>
      <div className="text-right text-[10px] opacity-60 hidden sm:block">
        <div>{player.age} anos</div>
        <div>{player.caps} jogos</div>
        <div>{player.goals} gols</div>
      </div>
    </div>
  );
}

function StatBox({ label, value, icon: Icon }: { label: string; value: number; icon: typeof Goal }) {
  return (
    <div className="panel p-3 text-center">
      <Icon className="w-4 h-4 mx-auto mb-1 opacity-60" />
      <div className="text-lg font-bold">{value}</div>
      <div className="text-[9px] uppercase tracking-wider opacity-60">{label}</div>
    </div>
  );
}
