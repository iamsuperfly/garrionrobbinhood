"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { REFRESH_MS } from "@/lib/constants";
import { emptySummary, type GarriSummary, type GarriTrade } from "@/lib/parse";

type LiveState = {
  summary: GarriSummary;
  trades: GarriTrade[];
  loading: boolean;
  error: boolean;
  refresh: () => void;
};

const LiveContext = createContext<LiveState | null>(null);

export function LiveDataProvider({ children }: { children: React.ReactNode }) {
  const [summary, setSummary] = useState<GarriSummary>(emptySummary);
  const [trades, setTrades] = useState<GarriTrade[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const refresh = useCallback(async () => {
    try {
      const [sRes, tRes] = await Promise.all([
        fetch("/api/garri", { cache: "no-store" }),
        fetch("/api/garri/trades", { cache: "no-store" }),
      ]);
      if (!sRes.ok) throw new Error("summary");
      const sJson = (await sRes.json()) as GarriSummary;
      setSummary(sJson);
      if (tRes.ok) {
        const tJson = (await tRes.json()) as { trades?: GarriTrade[] };
        setTrades(Array.isArray(tJson.trades) ? tJson.trades : []);
      }
      setError(false);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
    const id = window.setInterval(() => {
      void refresh();
    }, REFRESH_MS);
    return () => window.clearInterval(id);
  }, [refresh]);

  return (
    <LiveContext.Provider value={{ summary, trades, loading, error, refresh }}>
      {children}
    </LiveContext.Provider>
  );
}

export function useLiveData(): LiveState {
  const ctx = useContext(LiveContext);
  if (!ctx) {
    throw new Error("useLiveData must be used within LiveDataProvider");
  }
  return ctx;
}
