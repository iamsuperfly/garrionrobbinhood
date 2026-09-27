"use client";

import { GARRI, UNAVAILABLE } from "@/lib/constants";
import { formatCompactUsd, formatCount, formatPct, formatPrice, formatTime } from "@/lib/format";
import { AnimatedNumber } from "./AnimatedNumber";
import { useLiveData } from "./LiveData";

export function LiveMarket() {
  const { summary, loading } = useLiveData();
  const displayCap = summary.marketCapUsd ?? summary.fdvUsd;
  const capLabel = summary.marketCapUsd !== null ? "Market cap" : "FDV";
  const pct = summary.launchpad.graduationPercentage;
  const graduated = summary.launchpad.completed === true;

  return (
    <section id="live" className="section-pad pt-4">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-6 flex flex-col items-start gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
          <div>
            <h2 className="font-display text-3xl sm:text-4xl">Live market</h2>
            <p className="mt-2 text-sm text-charcoal/70">
              Last updated {formatTime(summary.updatedAt)}
              {loading ? " · loading" : ""}
            </p>
          </div>
          <span className="inline-flex max-w-full items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-medium">
            <span className="live-dot" />
            Refreshing every 20s
          </span>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Stat label="Price" value={<AnimatedNumber value={summary.priceUsd} format={formatPrice} />} />
          <Stat label={capLabel} value={<AnimatedNumber value={displayCap} format={formatCompactUsd} />} />
          <Stat label="24h volume" value={<AnimatedNumber value={summary.volume24hUsd} format={formatCompactUsd} />} />
          <Stat
            label="24h change"
            value={
              <AnimatedNumber
                value={summary.change24hPct}
                format={formatPct}
                className={
                  summary.change24hPct === null ? "" : summary.change24hPct >= 0 ? "text-buy" : "text-palm"
                }
              />
            }
          />
          <Stat label="Holders" value={<AnimatedNumber value={summary.holders} format={formatCount} />} />
          <Stat label="Liquidity" value={<AnimatedNumber value={summary.liquidityUsd} format={formatCompactUsd} />} />
        </div>

        <div className="mt-6 rounded-3xl border border-charcoal/10 bg-white p-5 sm:p-7">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="font-display text-2xl">Bonding curve</h3>
              <p className="mt-1 text-sm text-charcoal/70">
                Graduates at {GARRI.graduationEth} ETH of real reserves.
              </p>
            </div>
            <p className="font-display text-2xl">
              {graduated ? "Graduated" : pct === null ? UNAVAILABLE : `${pct.toFixed(2)}%`}
            </p>
          </div>
          <div
            className="mt-4 h-3 overflow-hidden rounded-full bg-cream"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={pct ?? undefined}
            aria-label="Launchpad graduation progress"
          >
            <div
              className="h-full rounded-full bg-gradient-to-r from-cassava to-palm transition-[width] duration-700"
              style={{ width: `${Math.max(0, Math.min(100, pct ?? 0))}%` }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="min-w-0 rounded-3xl border border-charcoal/10 bg-white p-5">
      <p className="text-sm text-charcoal/65">{label}</p>
      <p className="mt-2 break-words font-display text-2xl tracking-tight sm:text-3xl">{value}</p>
    </div>
  );
}
