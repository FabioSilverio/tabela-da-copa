import { GroupStandings } from "@/services/data-provider";
import { getTeamFlagUrl } from "@/lib/utils";

export function GroupTable({ group }: { group: GroupStandings }) {
  return (
    <div className="panel mb-6">
      <div className="px-4 py-2 border-b border-foreground retro-border bg-black/5">
        <h3 className="text-sm font-bold tracking-widest">Grupo {group.letter}</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-foreground/20">
              <th className="text-left px-3 py-2 font-bold uppercase tracking-wider">#</th>
              <th className="text-left px-3 py-2 font-bold uppercase tracking-wider">Seleção</th>
              <th className="text-center px-2 py-2 font-bold uppercase tracking-wider">P</th>
              <th className="text-center px-2 py-2 font-bold uppercase tracking-wider">J</th>
              <th className="text-center px-2 py-2 font-bold uppercase tracking-wider">V</th>
              <th className="text-center px-2 py-2 font-bold uppercase tracking-wider">E</th>
              <th className="text-center px-2 py-2 font-bold uppercase tracking-wider">D</th>
              <th className="text-center px-2 py-2 font-bold uppercase tracking-wider">SG</th>
              <th className="text-center px-2 py-2 font-bold uppercase tracking-wider">GP</th>
            </tr>
          </thead>
          <tbody>
            {group.teams.map((team, idx) => (
              <tr
                key={team.team.id}
                className={`border-b border-foreground/10 ${idx < 2 ? "bg-black/[0.03]" : ""}`}
              >
                <td className="px-3 py-2 font-bold">{idx + 1}</td>
                <td className="px-3 py-2 flex items-center gap-2">
                  <img
                    src={getTeamFlagUrl(team.team.code)}
                    alt={team.team.name}
                    className="w-5 h-3 object-cover border border-foreground/30"
                  />
                  <span className="font-bold">{team.team.name}</span>
                </td>
                <td className="text-center px-2 py-2 font-bold">{team.points}</td>
                <td className="text-center px-2 py-2">{team.played}</td>
                <td className="text-center px-2 py-2">{team.wins}</td>
                <td className="text-center px-2 py-2">{team.draws}</td>
                <td className="text-center px-2 py-2">{team.losses}</td>
                <td className="text-center px-2 py-2 font-bold">{team.goalDifference}</td>
                <td className="text-center px-2 py-2">{team.goalsFor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
