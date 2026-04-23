"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";

export function SearchBar() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/selecoes?q=${encodeURIComponent(query.trim())}`);
      setQuery("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-0">
      <input
        type="text"
        placeholder="Buscar seleção..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="retro-input text-xs h-8 w-40 sm:w-56"
      />
      <button type="submit" className="retro-btn h-8 px-2" aria-label="Buscar">
        <Search className="w-3 h-3" />
      </button>
    </form>
  );
}
