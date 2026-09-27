import { describe, expect, it } from "vitest";
import { parseGarriSummary, parseTrades } from "../src/lib/parse";

const token = {
  data: {
    attributes: {
      price_usd: "0.00003047",
      fdv_usd: "30472.37",
      market_cap_usd: null,
      total_reserve_in_usd: "11955.33",
      volume_usd: { h24: "51988.90" },
      image_url: "https://assets.geckoterminal.com/token.png",
      launchpad_details: {
        graduation_percentage: 62.36,
        completed: false,
        completed_at: null,
      },
    },
  },
};

const info = {
  data: {
    attributes: {
      holders: { count: 842 },
      image_url: "https://assets.geckoterminal.com/info.png",
    },
  },
};

const pool = {
  data: {
    attributes: {
      price_change_percentage: { h24: "12.5" },
      reserve_in_usd: "18947.20",
      volume_usd: { h24: "52176.30" },
    },
  },
};

describe("parseGarriSummary", () => {
  it("maps GeckoTerminal fields", () => {
    const summary = parseGarriSummary(token, info, pool, "2026-09-27T00:00:00Z");
    expect(summary.priceUsd).toBeCloseTo(0.00003047);
    expect(summary.fdvUsd).toBeCloseTo(30472.37);
    expect(summary.marketCapUsd).toBeNull();
    expect(summary.volume24hUsd).toBeCloseTo(51988.9);
    expect(summary.change24hPct).toBeCloseTo(12.5);
    expect(summary.holders).toBe(842);
    expect(summary.liquidityUsd).toBeCloseTo(11955.33);
    expect(summary.imageUrl).toBe("https://assets.geckoterminal.com/token.png");
    expect(summary.launchpad.graduationPercentage).toBeCloseTo(62.36);
    expect(summary.launchpad.completed).toBe(false);
  });

  it("falls back when payloads are empty", () => {
    const summary = parseGarriSummary({}, {}, {});
    expect(summary.priceUsd).toBeNull();
    expect(summary.holders).toBeNull();
    expect(summary.launchpad.graduationPercentage).toBeNull();
  });
});

describe("parseTrades", () => {
  it("keeps the latest twelve buys and sells", () => {
    const payload = {
      data: [
        {
          id: "1",
          attributes: {
            block_timestamp: "2026-09-27T18:05:03Z",
            tx_hash: "0xaaa",
            tx_from_address: "0x1111111111111111111111111111111111111111",
            kind: "buy",
            volume_in_usd: "1.56",
          },
        },
        {
          id: "2",
          attributes: {
            block_timestamp: "2026-09-27T18:04:37Z",
            tx_hash: "0xbbb",
            tx_from_address: "0x2222222222222222222222222222222222222222",
            kind: "sell",
            volume_in_usd: "13.00",
          },
        },
      ],
    };
    const trades = parseTrades(payload);
    expect(trades).toHaveLength(2);
    expect(trades[0].kind).toBe("buy");
    expect(trades[1].kind).toBe("sell");
    expect(trades[0].txUrl).toBe("https://hoodexplorer.io/tx/0xaaa");
    expect(trades[0].walletShort).toMatch(/0x1111/);
  });

  it("returns an empty list for malformed payloads", () => {
    expect(parseTrades(null)).toEqual([]);
    expect(parseTrades({ data: "nope" })).toEqual([]);
  });
});
