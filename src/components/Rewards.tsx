"use client";

import { GARRI } from "@/lib/constants";
import { CopyButton } from "./CopyButton";
import { GrainMark } from "./Marks";

export function Rewards() {
  return (
    <section id="rewards" className="section-pad">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="rounded-3xl border border-charcoal/10 bg-white p-6 sm:p-8">
          <div className="flex min-w-0 items-center gap-3">
            <GrainMark className="h-7 w-7 shrink-0" />
            <h2 className="min-w-0 font-display text-3xl sm:text-4xl">Rewards</h2>
          </div>
          <p className="mt-4 max-w-3xl leading-7 text-charcoal/80">
            Creator fees collected at the fee wallet can be shared with holders
            and with people who make GARRI content. There is no form on this
            site. Post proof on X and tag {GARRI.xHandle}.
          </p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
            <p className="break-all font-mono text-sm">{GARRI.feeWallet}</p>
            <CopyButton value={GARRI.feeWallet} label="Copy fee wallet" />
          </div>
        </div>
      </div>
    </section>
  );
}
