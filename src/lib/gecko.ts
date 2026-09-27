import { CACHE_SECONDS, GECKO } from "./constants";
import {
  emptySummary,
  parseGarriSummary,
  parseTrades,
  type GarriSummary,
  type GarriTrade,
} from "./parse";

const headers = {
  Accept: "application/json;version=20230203",
};

async function getJson(url: string): Promise<unknown | null> {
  try {
    const res = await fetch(url, {
      headers,
      next: { revalidate: CACHE_SECONDS },
    });
    if (!res.ok) return null;
    return (await res.json()) as unknown;
  } catch {
    return null;
  }
}

export async function fetchGarriSummary(): Promise<GarriSummary> {
  const [token, info, pool] = await Promise.all([
    getJson(GECKO.token),
    getJson(GECKO.tokenInfo),
    getJson(GECKO.pool),
  ]);
  if (!token && !info && !pool) {
    return emptySummary();
  }
  return parseGarriSummary(token ?? {}, info ?? {}, pool ?? {});
}

export async function fetchGarriTrades(): Promise<GarriTrade[]> {
  const payload = await getJson(GECKO.trades);
  if (!payload) return [];
  return parseTrades(payload);
}
