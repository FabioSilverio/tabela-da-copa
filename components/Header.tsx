"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Trophy } from "lucide-react";
import { SearchBar } from "./SearchBar";

const navItems = [
  { href: "/", label: "Início" },
  { href: "/grupos", label: "Grupos" },
  { href: "/mata-mata", label: "Mata-Mata" },
  { href: "/ao-vivo", label: "Ao Vivo" },
  { href: "/selecoes", label: "Seleções" },
  { href: "/simulador", label: "Simulador" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full border-b border-foreground retro-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 no-underline hover:bg-transparent">
            <Trophy className="w-5 h-5" />
            <span className="text-sm font-bold tracking-widest uppercase">Tabela da Copa</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-3 py-1 text-xs uppercase tracking-wider no-underline hover:bg-black/5"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:block">
            <SearchBar />
          </div>

          <button
            type="button"
            className="md:hidden retro-btn p-2"
            onClick={() => setOpen((prev) => !prev)}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
          >
            {open ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      <div
        className={`md:hidden border-t border-foreground retro-border bg-panel transition-all duration-200 overflow-hidden ${open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
        aria-hidden={!open}
      >
        <div className="px-4 py-3 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block px-2 py-1 text-xs uppercase tracking-wider no-underline hover:bg-black/5"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <div className="pt-2">
            <SearchBar />
          </div>
        </div>
      </div>
    </header>
  );
}
