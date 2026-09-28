"use client";

import { GARRI } from "@/lib/constants";
import { formatPrice } from "@/lib/format";
import { AnimatedNumber } from "./AnimatedNumber";
import { CopyButton } from "./CopyButton";
import { useLiveData } from "./LiveData";
import { TokenImage } from "./TokenImage";

export function Hero() {
  const { summary } = useLiveData();
  return (
    <section id="top" className="section-pad">
      <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 sm:gap-10 sm:px-6 lg:grid-cols-[auto_minmax(0,1fr)]">
        <div className="rise-in flex justify-center lg:justify-start">
          <TokenImage src={summary.imageUrl} size={168} />
        </div>
        <div className="rise-in delay-1 text-center lg:text-left">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.22em] text-palm">
            {GARRI.ticker} · {GARRI.chain}
          </p>
          <h1 className="font-display text-[clamp(3.75rem,15vw,4.5rem)] leading-none text-charcoal sm:text-7xl">
            {GARRI.name}
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg text-charcoal/80 lg:mx-0">
            {GARRI.tagline}
          </p>
          <p className="mt-6 font-display text-3xl sm:text-4xl">
            <AnimatedNumber value={summary.priceUsd} format={formatPrice} />
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center lg:justify-start">
            <a href={GARRI.buyUrl} target="_blank" rel="noreferrer" className="btn-primary w-full sm:w-auto">
              Buy on Pons
            </a>
            <CopyButton value={GARRI.contract} label="Copy contract" className="w-full sm:w-auto" />
            <a href={GARRI.xUrl} target="_blank" rel="noreferrer" className="btn-ghost w-full sm:w-auto">
              Open X
            </a>
            <a href={GARRI.telegramUrl} target="_blank" rel="noreferrer" className="btn-ghost w-full sm:w-auto">
              Open Telegram
            </a>
          </div>
          <p className="break-anywhere mt-6 font-mono text-xs text-charcoal/70 sm:text-sm">{GARRI.contract}</p>
        </div>
      </div>
    </section>
  );
}
