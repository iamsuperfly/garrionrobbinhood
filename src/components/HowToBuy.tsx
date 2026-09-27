"use client";

import { GARRI } from "@/lib/constants";

export function HowToBuy() {
  const steps = [
    "Use an EVM wallet that can add a custom network.",
    `Add Robinhood Chain. Chain ID is ${GARRI.chainId}. Native gas token is ETH. Public RPC: ${GARRI.rpcUrl}.`,
    "Hold a small amount of ETH on Robinhood Chain for gas.",
    "Open the official Pons launchpad link from this site.",
    "Confirm the exact contract 0xdDDF7AB756C35b4d0537825497e6932780710241 before you buy.",
    "Buy GARRI on Pons.",
    `Hold, post proof on X, and tag ${GARRI.xHandle} to be considered for fee rewards.`,
  ];

  return (
    <section id="buy" className="section-pad">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="font-display text-3xl sm:text-4xl">How to buy</h2>
        <ol className="mt-6 space-y-3">
          {steps.map((step, i) => (
            <li key={step} className="flex gap-4 rounded-3xl border border-charcoal/10 bg-white p-5">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cassava font-display text-lg">
                {i + 1}
              </span>
              <p className="min-w-0 flex-1 break-words wrap-anywhere pt-1.5 leading-7 text-charcoal/85">{step}</p>
            </li>
          ))}
        </ol>
        <a href={GARRI.buyUrl} target="_blank" rel="noreferrer" className="btn-primary mt-6 inline-flex w-full sm:w-auto">
          Open official Pons link
        </a>
      </div>
    </section>
  );
}
