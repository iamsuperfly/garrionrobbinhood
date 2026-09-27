"use client";

import { useEffect, useState } from "react";
import { formatCompactUsd, formatPct, formatPrice } from "@/lib/format";
import { UNAVAILABLE } from "@/lib/constants";
import { AnimatedNumber } from "./AnimatedNumber";
import { useLiveData } from "./LiveData";

export function StatusStrip() {
  const { summary } = useLiveData();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 280);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const curve =
    summary.launchpad.graduationPercentage === null
      ? UNAVAILABLE
      : `${summary.launchpad.graduationPercentage.toFixed(1)}%`;

  return (
    <div
      className={`fixed inset-x-0 top-[var(--header-height)] z-30 border-b border-charcoal/10 bg-charcoal text-cream transition-[transform,opacity] duration-300 ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none -translate-y-[calc(100%+var(--header-height))] opacity-0"
      }`}
      aria-hidden={!visible}
    >
      <div className="mx-auto flex max-w-6xl items-center gap-4 overflow-x-auto px-4 py-2 text-xs sm:text-sm">
        <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
          <span className="live-dot" />
          Live
        </span>
        <span className="whitespace-nowrap">
          Price <AnimatedNumber value={summary.priceUsd} format={formatPrice} className="font-semibold" />
        </span>
        <span className="whitespace-nowrap">
          Mcap{" "}
          <AnimatedNumber
            value={summary.marketCapUsd ?? summary.fdvUsd}
            format={formatCompactUsd}
            className="font-semibold"
          />
        </span>
        <span className="whitespace-nowrap">
          24h <AnimatedNumber value={summary.change24hPct} format={formatPct} className="font-semibold" />
        </span>
        <span className="whitespace-nowrap">
          Curve <span className="font-semibold">{curve}</span>
        </span>
      </div>
    </div>
  );
}
