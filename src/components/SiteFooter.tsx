"use client";

import { GARRI } from "@/lib/constants";

export function SiteFooter() {
  return (
    <footer className="border-t border-charcoal/10 bg-charcoal text-cream">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 sm:px-6 md:grid-cols-2">
        <div>
          <p className="font-display text-3xl">GARRI</p>
          <p className="mt-2 text-sm text-cream/70">
            {GARRI.chain} · Chain ID {GARRI.chainId}
          </p>
          <p className="break-anywhere mt-3 font-mono text-xs text-cream/80">
            Official contract only: {GARRI.contract}
          </p>
        </div>
        <div className="md:text-right">
          <p className="text-sm text-cream/75">This site is not Robinhood and not Pons.</p>
          <div className="mt-4 flex flex-wrap gap-4 md:justify-end">
            <a className="underline-offset-2 hover:underline" href={GARRI.explorerTokenUrl} target="_blank" rel="noreferrer">
              HoodExplorer
            </a>
            <a className="underline-offset-2 hover:underline" href={GARRI.geckoPoolUrl} target="_blank" rel="noreferrer">
              GeckoTerminal
            </a>
            <a className="underline-offset-2 hover:underline" href={GARRI.buyUrl} target="_blank" rel="noreferrer">
              Pons
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
