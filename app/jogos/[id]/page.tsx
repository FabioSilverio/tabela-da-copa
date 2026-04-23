import { notFound } from "next/navigation";
import { SectionTitle } from "@/components/SectionTitle";
import { getMatchById } from "@/data/matches";
import { getTeamFlagUrl, formatDateBR, formatTimeBR } from "@/lib/utils";
import { Tv, Radio, MapPin, Calendar, Clock } from "lucide-react";
import { AIInsight } from "@/components/AIInsight";

export function generateStaticParams() {
  const { allMatches } = require("@/data/matches");
  return allMatches.map((m: { id: string }) => ({ id: m.id }));
}

export function generateMetadata({ params }: { params: { id: string } }) {
  const match = getMatchById(params.id);
  if (!match) return { title: "Jogo não encontrado" };
  return {
    title: `${match.homeTeam.name} x ${match.awayTeam.name}`,
    description: `Detalhes do confronto entre ${match.homeTeam.name} e ${match.awayTeam.name} na Copa 2026.`,
  };
}

export default function MatchDetailPage({ params }: { params: { id: string } }) {
  const match = getMatchById(params.id);
  if (!match) return notFound();

  const isFinished = match.status === "finished";
  const isLive = match.status === "live";

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <div className="panel p-0">
        <div className="px-4 py-2 border-b border-foreground retro-border bg-black/5 flex items-center justify-between">
          <span className="text-[10px] uppercase tracking-widest font-bold">{match.phase}</span>
          <span className="text-[10px] uppercase tracking-wider">
            {isFinished ? "Encerrado" : isLive ? `Ao Vivo ${match.minute ?? ""}'` : "Programado"}
          </span>
        </div>

        <div className="px-6 py-8">
          <div className="flex items-center justify-between gap-6">
            <div className="flex-1 flex flex-col items-center gap-2 text-center">
              <img
                src={getTeamFlagUrl(match.homeTeam.code)}
                alt={match.homeTeam.name}
                className="w-12 h-8 object-cover border border-foreground/30"
              />
              <h2 className="text-sm font-bold uppercase tracking-wider">{match.homeTeam.name}</h2>
            </div>

            <div className="flex flex-col items-center gap-2 min-w-[100px]">
              <div className="text-3xl sm:text-4xl font-bold tracking-wider">
                {match.homeScore ?? "—"} × {match.awayScore ?? "—"}
              </div>
            </div>

            <div className="flex-1 flex flex-col items-center gap-2 text-center">
              <img
                src={getTeamFlagUrl(match.awayTeam.code)}
                alt={match.awayTeam.name}
                className="w-12 h-8 object-cover border border-foreground/30"
              />
              <h2 className="text-sm font-bold uppercase tracking-wider">{match.awayTeam.name}</h2>
            </div>
          </div>
        </div>

        <div className="px-4 py-3 border-t border-foreground retro-border grid grid-cols-1 sm:grid-cols-2 gap-3 text-[10px] uppercase tracking-wider opacity-80">
          <div className="flex items-center gap-2">
            <Calendar className="w-3 h-3" />
            {formatDateBR(match.date)}
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-3 h-3" />
            {formatTimeBR(match.time)} (Horário de Brasília)
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-3 h-3" />
            {match.stadium}, {match.city}
          </div>
          <div className="flex items-center gap-2">
            <Tv className="w-3 h-3" />
            TV: {match.tv}
          </div>
          <div className="flex items-center gap-2">
            <Radio className="w-3 h-3" />
            Rádio: {match.radio}
          </div>
        </div>
      </div>

      <section>
        <SectionTitle subtitle="Titulares e reservas">
          Escalações
        </SectionTitle>
        <div className="panel p-6 text-center">
          <p className="text-sm uppercase tracking-wider opacity-70">
            Escalações serão confirmadas antes da partida.
          </p>
        </div>
      </section>

      {match.events && match.events.length > 0 && (
        <section>
          <SectionTitle subtitle="Gols, cartões e substituições">
            Eventos
          </SectionTitle>
          <div className="panel p-4 space-y-2">
            {match.events.map((ev, i) => (
              <div key={i} className="flex items-center gap-3 text-xs uppercase tracking-wider">
                <span className="opacity-60 w-8">{ev.minute}'</span>
                <span className="font-bold">
                  {ev.type === "goal" ? "⚽" : ev.type === "red_card" ? "🟥" : "🟨"}
                </span>
                <span>{ev.player}</span>
                <span className="opacity-60">
                  ({ev.team === "home" ? match.homeTeam.name : match.awayTeam.name})
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      <section>
        <AIInsight prompt={`Analise o confronto entre ${match.homeTeam.name} e ${match.awayTeam.name} na Copa do Mundo 2026. Fale sobre histórico, estilo de jogo e o que esperar da partida.`} />
      </section>
    </div>
  );
}
