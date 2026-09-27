import { describe, expect, it } from "vitest";
import { UNAVAILABLE } from "../src/lib/constants";
import {
  explorerTxUrl,
  formatCompactUsd,
  formatPct,
  formatPrice,
  formatUsd,
  shortAddress,
  toNumber,
} from "../src/lib/format";

describe("toNumber", () => {
  it("parses numeric strings", () => {
    expect(toNumber("0.00003047")).toBeCloseTo(0.00003047);
  });
  it("returns null for junk", () => {
    expect(toNumber("nope")).toBeNull();
    expect(toNumber(undefined)).toBeNull();
  });
});

describe("shortAddress", () => {
  it("shortens a 42-char address", () => {
    expect(shortAddress("0xdDDF7AB756C35b4d0537825497e6932780710241")).toBe(
      "0xdDDF…0241",
    );
  });
});

describe("formatters", () => {
  it("marks missing values as unavailable", () => {
    expect(formatUsd(null)).toBe(UNAVAILABLE);
    expect(formatCompactUsd(undefined)).toBe(UNAVAILABLE);
    expect(formatPct(null)).toBe(UNAVAILABLE);
    expect(formatPrice(null)).toBe(UNAVAILABLE);
  });

  it("formats percent with a sign", () => {
    expect(formatPct(12.345)).toBe("+12.35%");
    expect(formatPct(-3.2)).toBe("-3.20%");
  });

  it("builds a HoodExplorer tx link", () => {
    expect(explorerTxUrl("0xabc", "https://hoodexplorer.io")).toBe(
      "https://hoodexplorer.io/tx/0xabc",
    );
  });
});
