import { GARRI, TRADE_LIMIT } from "./constants";
import { explorerTxUrl, shortAddress, toNumber } from "./format";

export type LaunchpadState = {
  graduationPercentage: number | null;
  completed: boolean | null;
  completedAt: string | null;
};

export type GarriSummary = {
  priceUsd: number | null;
  marketCapUsd: number | null;
  fdvUsd: number | null;
  volume24hUsd: number | null;
  change24hPct: number | null;
  holders: number | null;
  liquidityUsd: number | null;
  imageUrl: string | null;
  launchpad: LaunchpadState;
  updatedAt: string;
};

export type GarriTrade = {
  id: string;
  timestamp: string;
  kind: "buy" | "sell";
  usdSize: number | null;
  wallet: string;
  walletShort: string;
  txHash: string;
  txUrl: string | null;
};

function attrs(payload: unknown): Record<string, unknown> {
  if (!payload || typeof payload !== "object") return {};
  const data = (payload as { data?: unknown }).data;
  if (!data || typeof data !== "object") return {};
  const attributes = (data as { attributes?: unknown }).attributes;
  if (!attributes || typeof attributes !== "object") return {};
  return attributes as Record<string, unknown>;
}

function parseLaunchpad(raw: unknown): LaunchpadState {
  if (!raw || typeof raw !== "object") {
    return { graduationPercentage: null, completed: null, completedAt: null };
  }
  const obj = raw as Record<string, unknown>;
  const completed =
    typeof obj.completed === "boolean" ? obj.completed : null;
  return {
    graduationPercentage: toNumber(obj.graduation_percentage),
    completed,
    completedAt:
      typeof obj.completed_at === "string" ? obj.completed_at : null,
  };
}

export function parseGarriSummary(
  tokenPayload: unknown,
  infoPayload: unknown,
  poolPayload: unknown,
  updatedAt = new Date().toISOString(),
): GarriSummary {
  const token = attrs(tokenPayload);
  const info = attrs(infoPayload);
  const pool = attrs(poolPayload);

  const imageFromInfo =
    info.image && typeof info.image === "object"
      ? ((info.image as Record<string, unknown>).large as unknown)
      : null;

  const imageUrl =
    (typeof token.image_url === "string" && token.image_url) ||
    (typeof info.image_url === "string" && info.image_url) ||
    (typeof imageFromInfo === "string" && imageFromInfo) ||
    null;

  const holdersObj =
    info.holders && typeof info.holders === "object"
      ? (info.holders as Record<string, unknown>)
      : null;

  const volumeToken =
    token.volume_usd && typeof token.volume_usd === "object"
      ? (token.volume_usd as Record<string, unknown>).h24
      : null;
  const volumePool =
    pool.volume_usd && typeof pool.volume_usd === "object"
      ? (pool.volume_usd as Record<string, unknown>).h24
      : null;

  const change =
    pool.price_change_percentage &&
    typeof pool.price_change_percentage === "object"
      ? (pool.price_change_percentage as Record<string, unknown>).h24
      : null;

  const launchpad = parseLaunchpad(
    token.launchpad_details ?? info.launchpad_details ?? pool.launchpad_details,
  );

  return {
    priceUsd: toNumber(token.price_usd) ?? toNumber(pool.base_token_price_usd),
    marketCapUsd: toNumber(token.market_cap_usd) ?? toNumber(pool.market_cap_usd),
    fdvUsd: toNumber(token.fdv_usd) ?? toNumber(pool.fdv_usd),
    volume24hUsd: toNumber(volumeToken) ?? toNumber(volumePool),
    change24hPct: toNumber(change),
    holders: holdersObj ? toNumber(holdersObj.count) : null,
    liquidityUsd:
      toNumber(token.total_reserve_in_usd) ?? toNumber(pool.reserve_in_usd),
    imageUrl,
    launchpad,
    updatedAt,
  };
}

export function parseTrades(payload: unknown): GarriTrade[] {
  if (!payload || typeof payload !== "object") return [];
  const data = (payload as { data?: unknown }).data;
  if (!Array.isArray(data)) return [];

  const trades: GarriTrade[] = [];
  for (const item of data) {
    if (!item || typeof item !== "object") continue;
    const row = item as { id?: unknown; attributes?: unknown };
    const a =
      row.attributes && typeof row.attributes === "object"
        ? (row.attributes as Record<string, unknown>)
        : {};
    const kindRaw = String(a.kind ?? "").toLowerCase();
    const kind: "buy" | "sell" = kindRaw === "sell" ? "sell" : "buy";
    const txHash = typeof a.tx_hash === "string" ? a.tx_hash : "";
    const wallet =
      typeof a.tx_from_address === "string" ? a.tx_from_address : "";
    const timestamp =
      typeof a.block_timestamp === "string" ? a.block_timestamp : "";
    if (!timestamp) continue;
    trades.push({
      id: typeof row.id === "string" ? row.id : `${txHash}-${timestamp}`,
      timestamp,
      kind,
      usdSize: toNumber(a.volume_in_usd),
      wallet,
      walletShort: shortAddress(wallet),
      txHash,
      txUrl: txHash ? explorerTxUrl(txHash, GARRI.explorerBase) : null,
    });
    if (trades.length >= TRADE_LIMIT) break;
  }
  return trades;
}

export function emptySummary(updatedAt = new Date().toISOString()): GarriSummary {
  return {
    priceUsd: null,
    marketCapUsd: null,
    fdvUsd: null,
    volume24hUsd: null,
    change24hPct: null,
    holders: null,
    liquidityUsd: null,
    imageUrl: null,
    launchpad: {
      graduationPercentage: null,
      completed: null,
      completedAt: null,
    },
    updatedAt,
  };
}
