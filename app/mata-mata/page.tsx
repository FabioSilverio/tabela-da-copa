import { SectionTitle } from "@/components/SectionTitle";
import { MatchCard } from "@/components/MatchCard";
import { allMatches } from "@/data/matches";

export const metadata = {
  title: "Mata-Mata",
  description: "Chaveamento completo da fase eliminatória da Copa do Mundo 2026.",
};

export default function KnockoutPage() {
  const groupMatches = allMatches.filter((m) => m.phase.startsWith("Grupo"));
  const knockoutMatches = allMatches.filter((m) => !m.phase.startsWith("Grupo"));

  return (
    <div className="space-y-10">
      <section>
        <SectionTitle subtitle="Todos os jogos da fase de grupos">
          Fase de Grupos
        </SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {groupMatches.slice(0, 12).map((match) => (
            <MatchCard key={match.id} match={match} />
          ))}
        </div>
      </section>

      <section>
        <SectionTitle subtitle="Chaveamento das eliminatórias">
          Fase Eliminatoria
        </SectionTitle>
        {knockoutMatches.length === 0 ? (
          <div className="panel p-8 text-center">
            <p className="text-sm uppercase tracking-wider opacity-70">
              A fase eliminatória será definida após o término dos grupos.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {knockoutMatches.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
