"use client";

import { UNAVAILABLE } from "@/lib/constants";
import { formatRelative, formatUsd } from "@/lib/format";
import { useLiveData } from "./LiveData";

export function RecentTrades() {
  const { trades } = useLiveData();

  return (
    <section id="trades" className="section-pad">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="font-display text-4xl">Recent trades</h2>
        <p className="mt-2 text-sm text-charcoal/70">Last {trades.length || 12} prints from the official pool.</p>
        <div className="mt-6 overflow-hidden rounded-3xl border border-charcoal/10 bg-white">
          {trades.length === 0 ? (
            <p className="px-5 py-8 text-charcoal/70">{UNAVAILABLE}</p>
          ) : (
            <ul>
              {trades.map((trade) => (
                <li
                  key={trade.id}
                  className="trade-row grid min-w-0 grid-cols-[auto_minmax(0,1fr)_auto] gap-x-3 gap-y-1.5 border-b border-charcoal/8 px-4 py-3 last:border-b-0 sm:grid-cols-[5.5rem_minmax(0,1fr)_minmax(0,1fr)_auto] sm:items-center sm:gap-2 sm:px-5"
                >
                  <span
                    className={`inline-flex h-8 w-16 items-center justify-center rounded-full text-xs font-semibold uppercase ${
                      trade.kind === "buy" ? "bg-buy/15 text-buy" : "bg-palm/15 text-palm"
                    }`}
                  >
                    {trade.kind}
                  </span>
                  <span className="min-w-0 break-words font-medium">
                    {trade.usdSize === null ? UNAVAILABLE : formatUsd(trade.usdSize)}
                  </span>
                  <span className="break-anywhere col-span-full min-w-0 font-mono text-xs text-charcoal/70 sm:col-span-1">
                    {trade.walletShort || "—"} · {formatRelative(trade.timestamp)}
                  </span>
                  {trade.txUrl ? (
                    <a
                      href={trade.txUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm font-medium text-palm underline-offset-2 hover:underline"
                    >
                      Tx
                    </a>
                  ) : (
                    <span className="text-sm text-charcoal/40"> </span>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
