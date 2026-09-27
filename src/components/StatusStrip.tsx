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
      className={`sticky top-16 z-30 border-b border-charcoal/10 bg-charcoal text-cream transition-transform duration-300 sm:top-[4.25rem] ${
        visible ? "translate-y-0" : "-translate-y-[120%]"
      }`}
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
