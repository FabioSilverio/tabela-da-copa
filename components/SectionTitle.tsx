import { ReactNode } from "react";

export function SectionTitle({ children, subtitle }: { children: ReactNode; subtitle?: string }) {
  return (
    <div className="mb-6">
      <h2 className="text-lg font-bold uppercase tracking-[0.15em] border-b-2 border-foreground pb-1 inline-block">
        {children}
      </h2>
      {subtitle && (
        <p className="text-xs uppercase tracking-wider opacity-70 mt-1">{subtitle}</p>
      )}
    </div>
  );
}
