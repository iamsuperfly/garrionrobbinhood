import { afterEach, describe, expect, it, vi } from "vitest";
import { GET as getSummary } from "../src/app/api/garri/route";
import { GET as getTrades } from "../src/app/api/garri/trades/route";

const tokenBody = {
  data: {
    attributes: {
      price_usd: "0.0001",
      fdv_usd: "100000",
      market_cap_usd: null,
      total_reserve_in_usd: "5000",
      volume_usd: { h24: "900" },
      image_url: "https://assets.geckoterminal.com/garri.png",
      launchpad_details: {
        graduation_percentage: 40,
        completed: false,
        completed_at: null,
      },
    },
  },
};

const infoBody = {
  data: {
    attributes: {
      holders: { count: 12 },
    },
  },
};

const poolBody = {
  data: {
    attributes: {
      price_change_percentage: { h24: "-2.5" },
    },
  },
};

const tradesBody = {
  data: [
    {
      id: "t1",
      attributes: {
        block_timestamp: "2026-09-27T18:00:00Z",
        tx_hash: "0xdead",
        tx_from_address: "0xabcabcabcabcabcabcabcabcabcabcabcabcabca",
        kind: "buy",
        volume_in_usd: "4.2",
      },
    },
  ],
};

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("API smoke", () => {
  it("GET /api/garri returns a parsed summary", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async (url: string) => {
        if (String(url).endsWith("/info")) {
          return { ok: true, json: async () => infoBody };
        }
        if (String(url).includes("/pools/")) {
          return { ok: true, json: async () => poolBody };
        }
        return { ok: true, json: async () => tokenBody };
      }),
    );

    const res = await getSummary();
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.priceUsd).toBeCloseTo(0.0001);
    expect(body.holders).toBe(12);
    expect(body.change24hPct).toBeCloseTo(-2.5);
    expect(body.imageUrl).toContain("geckoterminal.com");
    expect(body.launchpad.graduationPercentage).toBe(40);
  });

  it("GET /api/garri/trades returns recent trades", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => ({
        ok: true,
        json: async () => tradesBody,
      })),
    );

    const res = await getTrades();
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.trades).toHaveLength(1);
    expect(body.trades[0].kind).toBe("buy");
    expect(body.trades[0].txUrl).toContain("/tx/0xdead");
  });
});
