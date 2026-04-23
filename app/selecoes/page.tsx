import { SectionTitle } from "@/components/SectionTitle";
import { TeamCard } from "@/components/TeamCard";
import { teams } from "@/data/teams";

export const metadata = {
  title: "Seleções",
  description: "Todas as seleções da Copa do Mundo 2026: elencos, histórico e estatísticas.",
};

export default function TeamsPage({ searchParams }: { searchParams?: { q?: string } }) {
  const query = (searchParams?.q ?? "").toLowerCase();
  const filtered = query
    ? teams.filter(
        (t) =>
          t.name.toLowerCase().includes(query) ||
          t.group.toLowerCase().includes(query) ||
          t.slug.includes(query)
      )
    : teams;

  return (
    <div className="space-y-8">
      <SectionTitle subtitle="Todas as 48 seleções classificadas">
        Seleções
      </SectionTitle>

      {query && (
        <p className="text-xs uppercase tracking-wider opacity-70">
          Resultados para: &quot;{query}&quot;
        </p>
      )}

      {filtered.length === 0 ? (
        <div className="panel p-8 text-center">
          <p className="text-sm uppercase tracking-wider opacity-70">
            Nenhuma seleção encontrada.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((team) => (
            <TeamCard key={team.id} team={team} />
          ))}
        </div>
      )}
    </div>
  );
}
