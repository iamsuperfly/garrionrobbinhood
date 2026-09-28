"use client";

import { GARRI } from "@/lib/constants";
import { CopyButton } from "./CopyButton";
import { MeasureMark } from "./Marks";

export function OfficialDetails() {
  const rows = [
    { label: "Name", value: GARRI.name },
    { label: "Ticker", value: GARRI.ticker },
    { label: "Chain", value: GARRI.chain },
    { label: "Chain ID", value: String(GARRI.chainId) },
    { label: "Contract", value: GARRI.contract },
    { label: "Total supply", value: GARRI.totalSupplyLabel },
    { label: "Launchpad", value: GARRI.launchpad },
    { label: "Fee wallet", value: GARRI.feeWallet },
    { label: "Creator allocation", value: GARRI.creatorAllocation },
    { label: "Pool", value: GARRI.poolAddress },
    { label: "Graduation", value: GARRI.graduationRule },
  ];

  return (
    <section id="details" className="section-pad">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-6 flex items-center gap-3">
          <MeasureMark />
          <h2 className="font-display text-4xl">Official details</h2>
        </div>
        <div className="overflow-hidden rounded-3xl border border-charcoal/10 bg-white">
          {rows.map((row) => (
            <div
              key={row.label}
              className="grid min-w-0 gap-2 border-b border-charcoal/8 px-5 py-4 last:border-b-0 sm:grid-cols-[12rem_minmax(0,1fr)_auto] sm:items-center"
            >
              <p className="text-sm font-medium text-charcoal/60">{row.label}</p>
              <p className="break-anywhere min-w-0 font-mono text-sm text-charcoal">{row.value}</p>
              <CopyButton value={row.value} label="Copy" compact className="justify-self-start sm:justify-self-end" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
