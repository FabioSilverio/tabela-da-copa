"use client";

import { SectionTitle } from "@/components/SectionTitle";
import { TeamCard } from "@/components/TeamCard";
import { useTeams } from "@/hooks/useApi";
import { Loader2 } from "lucide-react";

export default function TeamsPage({ searchParams }: { searchParams?: { q?: string } }) {
  const query = searchParams?.q ?? "";
  const { data, loading, error } = useTeams(query || undefined);
  const teams = data?.teams || [];

  return (
    <div className="space-y-8">
      <SectionTitle subtitle="Todas as 48 seleções classificadas">
        Seleções
      </SectionTitle>

      {loading && (
        <div className="flex items-center gap-2 text-xs uppercase tracking-wider opacity-70">
          <Loader2 className="w-4 h-4 animate-spin" /> Carregando...
        </div>
      )}

      {error && (
        <div className="panel p-4 text-xs uppercase tracking-wider text-red-800">
          Erro: {error}
        </div>
      )}

      {query && (
        <p className="text-xs uppercase tracking-wider opacity-70">
          Resultados para: &quot;{query}&quot;
        </p>
      )}

      {teams.length === 0 && !loading ? (
        <div className="panel p-8 text-center">
          <p className="text-sm uppercase tracking-wider opacity-70">
            Nenhuma seleção encontrada.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {teams.map((team) => (
            <TeamCard key={team.id} team={team} />
          ))}
        </div>
      )}
    </div>
  );
}
