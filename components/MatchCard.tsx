import Link from "next/link";
import { Match } from "@/types";
import { formatDateBR, formatTimeBR, getTeamFlagUrl } from "@/lib/utils";
import { Tv, Radio } from "lucide-react";

export function MatchCard({ match }: { match: Match }) {
  const isFinished = match.status === "finished";
  const isLive = match.status === "live";
  const home = match.homeTeam;
  const away = match.awayTeam;

  return (
    <div className="panel p-0">
      <div className="flex items-center justify-between px-3 py-1.5 border-b border-foreground retro-border bg-black/5">
        <span className="text-[10px] uppercase tracking-widest font-bold">{match.phase}</span>
        <div className="flex items-center gap-2">
          {isLive && <span className="status-dot status-live" />}
          <span className="text-[10px] uppercase tracking-wider">
            {isFinished ? "Encerrado" : isLive ? `Ao Vivo ${match.minute ?? ""}'` : formatDateBR(match.date)}
          </span>
        </div>
      </div>

      <div className="px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1 flex flex-col items-center gap-1 text-center">
            {home ? (
              <>
                <img
                  src={getTeamFlagUrl(home.code)}
                  alt={home.name}
                  className="w-8 h-5 object-cover border border-foreground/30"
                />
                <span className="text-xs font-bold uppercase">{home.name}</span>
              </>
            ) : (
              <span className="text-xs font-bold uppercase opacity-50">A definir</span>
            )}
          </div>

          <div className="flex flex-col items-center gap-1 min-w-[80px]">
            <div className="text-2xl font-bold tracking-wider">
              {match.homeScore ?? "—"} × {match.awayScore ?? "—"}
            </div>
            <span className="text-[10px] uppercase tracking-wider opacity-70">
              {formatTimeBR(match.time)} (BR)
            </span>
          </div>

          <div className="flex-1 flex flex-col items-center gap-1 text-center">
            {away ? (
              <>
                <img
                  src={getTeamFlagUrl(away.code)}
                  alt={away.name}
                  className="w-8 h-5 object-cover border border-foreground/30"
                />
                <span className="text-xs font-bold uppercase">{away.name}</span>
              </>
            ) : (
              <span className="text-xs font-bold uppercase opacity-50">A definir</span>
            )}
          </div>
        </div>
      </div>

      <div className="px-3 py-2 border-t border-foreground retro-border flex flex-wrap items-center justify-between gap-2 text-[10px] uppercase tracking-wider opacity-80">
        <span>{match.stadium}, {match.city}</span>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <Tv className="w-3 h-3" /> {match.tv || "a confirmar"}
          </span>
          <span className="flex items-center gap-1">
            <Radio className="w-3 h-3" /> {match.radio || "a confirmar"}
          </span>
        </div>
      </div>
    </div>
  );
}
