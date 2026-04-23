"use client";

import { SectionTitle } from "@/components/SectionTitle";
import { GroupTable } from "@/components/GroupTable";
import { useStandings } from "@/hooks/useApi";
import { Loader2 } from "lucide-react";

export default function GroupsPage() {
  const { data, loading, error } = useStandings();

  return (
    <div className="space-y-8">
      <SectionTitle subtitle="Classificação da fase de grupos">
        Grupos da Copa 2026
      </SectionTitle>

      {loading && (
        <div className="flex items-center gap-2 text-xs uppercase tracking-wider opacity-70">
          <Loader2 className="w-4 h-4 animate-spin" /> Carregando classificação...
        </div>
      )}

      {error && (
        <div className="panel p-4 text-xs uppercase tracking-wider text-red-800">
          Erro ao carregar dados: {error}
        </div>
      )}

      {data && (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {data.standings.map((group) => (
            <GroupTable key={group.letter} group={group} />
          ))}
        </div>
      )}
    </div>
  );
}
