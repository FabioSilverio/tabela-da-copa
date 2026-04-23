import { SectionTitle } from "@/components/SectionTitle";
import { SimulationBlock } from "@/components/SimulationBlock";
import { teams } from "@/data/teams";
import { Info } from "lucide-react";

export const metadata = {
  title: "Simulador",
  description: "Simule confrontos entre seleções da Copa 2026 com base em estatísticas e ranking.",
};

export default function SimulatorPage() {
  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <SectionTitle subtitle="Compare duas seleções e veja probabilidades estimadas">
        Simulador de Confrontos
      </SectionTitle>

      <div className="panel p-4 flex items-start gap-3">
        <Info className="w-4 h-4 mt-0.5 shrink-0 opacity-70" />
        <div className="text-xs leading-relaxed opacity-90 space-y-2">
          <p>
            Nossa engine de simulação combina ranking FIFA, forma recente, média de gols marcados
            e sofridos nos últimos 5 anos, além de peso de recência. O cálculo usa uma função logística
            para converter vantagens em probabilidades.
          </p>
          <p>
            O resultado é uma estimativa estatística, não uma previsão garantida. O futebol
            frequentemente desafia os números.
          </p>
        </div>
      </div>

      <SimulationBlock teams={teams} />
    </div>
  );
}
