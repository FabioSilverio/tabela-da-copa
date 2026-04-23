"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { Menu, X, Trophy, Settings } from "lucide-react";
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
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <header className="w-full border-b border-foreground retro-border" ref={menuRef}>
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
            <Link
              href="/configuracoes"
              className="px-3 py-1 text-xs uppercase tracking-wider no-underline hover:bg-black/5 flex items-center gap-1"
            >
              <Settings className="w-3 h-3" />
            </Link>
          </nav>

          <div className="hidden md:block">
            <SearchBar />
          </div>

          <button
            type="button"
            className="md:hidden retro-btn p-2"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
          >
            {open ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-foreground retro-border bg-panel">
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
            <Link
              href="/configuracoes"
              className="block px-2 py-1 text-xs uppercase tracking-wider no-underline hover:bg-black/5"
              onClick={() => setOpen(false)}
            >
              <Settings className="w-3 h-3 inline mr-1" />
              Configurações
            </Link>
            <div className="pt-2">
              <SearchBar />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
