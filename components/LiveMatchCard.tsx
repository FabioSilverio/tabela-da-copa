import { Match } from "@/types";
import { formatTimeBR, getTeamFlagUrl } from "@/lib/utils";
import { Activity } from "lucide-react";

export function LiveMatchCard({ match }: { match: Match }) {
  return (
    <div className="panel-dark p-0">
      <div className="flex items-center justify-between px-3 py-2 border-b border-white/10">
        <span className="text-[10px] uppercase tracking-widest font-bold flex items-center gap-2">
          <Activity className="w-3 h-3" />
          Ao Vivo
        </span>
        <span className="text-[10px] uppercase tracking-wider">
          {match.minute ?? 0}' min
        </span>
      </div>

      <div className="px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1 flex flex-col items-center gap-1 text-center">
            <img
              src={getTeamFlagUrl(match.homeTeam.code)}
              alt={match.homeTeam.name}
              className="w-8 h-5 object-cover border border-white/20"
            />
            <span className="text-xs font-bold uppercase">{match.homeTeam.name}</span>
          </div>

          <div className="text-2xl font-bold tracking-wider">
            {match.homeScore ?? 0} × {match.awayScore ?? 0}
          </div>

          <div className="flex-1 flex flex-col items-center gap-1 text-center">
            <img
              src={getTeamFlagUrl(match.awayTeam.code)}
              alt={match.awayTeam.name}
              className="w-8 h-5 object-cover border border-white/20"
            />
            <span className="text-xs font-bold uppercase">{match.awayTeam.name}</span>
          </div>
        </div>

        {match.events && match.events.length > 0 && (
          <div className="mt-4 border-t border-white/10 pt-3 space-y-1">
            {match.events.slice(0, 5).map((ev, i) => (
              <div key={i} className="flex items-center gap-2 text-[10px] uppercase tracking-wider">
                <span className="opacity-60">{ev.minute}'</span>
                <span className="font-bold">{ev.type === "goal" ? "⚽" : ev.type === "red_card" ? "🟥" : "🟨"}</span>
                <span>{ev.player} ({ev.team === "home" ? match.homeTeam.name : match.awayTeam.name})</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="px-3 py-2 border-t border-white/10 text-[10px] uppercase tracking-wider opacity-70">
        {match.stadium}, {match.city} — {formatTimeBR(match.time)} (BR)
      </div>
    </div>
  );
}
