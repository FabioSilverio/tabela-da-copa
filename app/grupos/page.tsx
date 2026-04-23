import { SectionTitle } from "@/components/SectionTitle";
import { GroupTable } from "@/components/GroupTable";
import { teams } from "@/data/teams";
import { Group } from "@/types";

export const metadata = {
  title: "Grupos",
  description: "Tabela completa dos grupos da Copa do Mundo 2026 com pontuação, saldo de gols e classificação.",
};

export default function GroupsPage() {
  const groupsMap = teams.reduce((acc, team) => {
    if (!acc[team.group]) acc[team.group] = [];
    acc[team.group].push({
      ...team,
      played: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      points: 0,
      goalDifference: 0,
      goalsFor: 0,
    });
    return acc;
  }, {} as Record<string, Group["teams"]>);

  const groups: Group[] = Object.entries(groupsMap).map(([letter, t]) => ({
    letter,
    teams: t,
  }));

  return (
    <div className="space-y-8">
      <SectionTitle subtitle="Classificação da fase de grupos">
        Grupos da Copa 2026
      </SectionTitle>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {groups.map((group) => (
          <GroupTable key={group.letter} group={group} />
        ))}
      </div>
    </div>
  );
}
