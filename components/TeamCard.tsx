import Link from "next/link";
import { Team } from "@/types";
import { getTeamFlagUrl } from "@/lib/utils";
import { Users, BarChart3 } from "lucide-react";

export function TeamCard({ team }: { team: Team }) {
  return (
    <Link href={`/selecoes/${team.slug}`} className="no-underline hover:bg-transparent">
      <div className="panel p-4 flex flex-col gap-3 hover:bg-black/[0.02] transition-colors cursor-pointer">
        <div className="flex items-center gap-3">
          <img
            src={getTeamFlagUrl(team.code)}
            alt={team.name}
            className="w-10 h-6 object-cover border border-foreground/30"
          />
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider">{team.name}</h4>
            <p className="text-[10px] uppercase tracking-wider opacity-70">
              Ranking FIFA: {team.ranking}º
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between text-[10px] uppercase tracking-wider opacity-80">
          <span className="flex items-center gap-1">
            <Users className="w-3 h-3" />
            Grupo {team.group}
          </span>
          <span className="flex items-center gap-1">
            <BarChart3 className="w-3 h-3" />
            {team.titles} título{team.titles !== 1 ? "s" : ""}
          </span>
        </div>
      </div>
    </Link>
  );
}
