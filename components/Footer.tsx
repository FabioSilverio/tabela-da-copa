import { Globe } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t border-foreground retro-border mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs uppercase tracking-wider opacity-80">
          © 2026 Tabela da Copa — Dados ilustrativos / Mock
        </p>
        <div className="flex items-center gap-4 text-xs uppercase tracking-wider opacity-80">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 no-underline hover:opacity-100"
          >
            <Globe className="w-3 h-3" />
            GitHub
          </a>
          <span>Next.js 15 + Tailwind</span>
        </div>
      </div>
    </footer>
  );
}
