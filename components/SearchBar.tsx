"use client";

import { useState, useRef, useEffect } from "react";
import { Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTeams } from "@/hooks/useApi";

export function SearchBar() {
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const { data } = useTeams();
  const allTeams = data?.teams || [];

  const suggestions = query.trim().length > 0
    ? allTeams.filter((team) =>
        team.name.toLowerCase().includes(query.toLowerCase()) ||
        team.slug.includes(query.toLowerCase()) ||
        team.group.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5)
    : [];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/selecoes?q=${encodeURIComponent(query.trim())}`);
      setShowSuggestions(false);
      setQuery("");
    }
  };

  const handleSelect = (slug: string) => {
    router.push(`/selecoes/${slug}`);
    setShowSuggestions(false);
    setQuery("");
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <form onSubmit={handleSubmit} className="flex items-center gap-0">
        <input
          type="text"
          placeholder="Buscar seleção..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowSuggestions(true);
          }}
          onFocus={() => setShowSuggestions(true)}
          className="retro-input text-xs h-8 w-40 sm:w-56"
        />
        {query && (
          <button
            type="button"
            onClick={() => { setQuery(""); setShowSuggestions(false); }}
            className="absolute right-8 top-1.5 p-0.5 opacity-50 hover:opacity-100"
          >
            <X className="w-3 h-3" />
          </button>
        )}
        <button type="submit" className="retro-btn h-8 px-2" aria-label="Buscar">
          <Search className="w-3 h-3" />
        </button>
      </form>

      {/* Sugestões */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 panel z-50 border border-foreground retro-border">
          {suggestions.map((team) => (
            <button
              key={team.id}
              onClick={() => handleSelect(team.slug)}
              className="w-full text-left px-3 py-2 text-xs uppercase tracking-wider hover:bg-black/5 flex items-center gap-2 border-b border-foreground/10 last:border-0"
            >
              <img
                src={`https://flagcdn.com/w40/${team.code.toLowerCase()}.png`}
                alt={team.name}
                className="w-5 h-3 object-cover border border-foreground/30"
              />
              <span className="font-bold">{team.name}</span>
              <span className="opacity-50 ml-auto">Grupo {team.group}</span>
            </button>
          ))}
          <button
            onClick={handleSubmit}
            className="w-full text-left px-3 py-2 text-[10px] uppercase tracking-wider hover:bg-black/5 opacity-70 border-t border-foreground/10"
          >
            Ver todos os resultados para "{query}"
          </button>
        </div>
      )}

      {showSuggestions && query.trim().length > 0 && suggestions.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 panel z-50 border border-foreground retro-border p-3">
          <p className="text-xs uppercase tracking-wider opacity-70">
            Nenhuma seleção encontrada para "{query}"
          </p>
        </div>
      )}
    </div>
  );
}
