import { useState, useEffect } from "react";

interface UseApiResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export function useApi<T>(url: string, options?: RequestInit): UseApiResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchData() {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(url, options);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        if (!cancelled) setData(json);
      } catch (e: unknown) {
        if (!cancelled) setError(e instanceof Error ? e.message : "Erro");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchData();

    return () => {
      cancelled = true;
    };
  }, [url]);

  return { data, loading, error };
}

export function useMatches(params?: string) {
  const url = `/api/matches${params ? `?${params}` : ""}`;
  return useApi<{ matches: import("@/data/matches").MatchData[] }>(url);
}

export function useStandings() {
  return useApi<{ standings: import("@/services/data-provider").GroupStandings[] }>("/api/standings");
}

export function useLive() {
  return useApi<{
    live: import("@/data/matches").MatchData[];
    recent: import("@/data/matches").MatchData[];
    timestamp: string;
  }>("/api/live");
}

export function useTeams(query?: string) {
  const url = query ? `/api/teams?q=${encodeURIComponent(query)}` : "/api/teams";
  return useApi<{ teams: import("@/data/teams").TeamData[] }>(url);
}
