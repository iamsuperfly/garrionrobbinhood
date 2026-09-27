"use client";

import { useState } from "react";

type Props = {
  value: string;
  label?: string;
  className?: string;
  compact?: boolean;
};

export function CopyButton({
  value,
  label = "Copy",
  className = "",
  compact = false,
}: Props) {
  const [copied, setCopied] = useState(false);

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button
      type="button"
      onClick={onCopy}
      className={`inline-flex items-center justify-center gap-2 rounded-full border border-charcoal/15 bg-cream font-medium text-charcoal transition hover:border-palm/40 hover:bg-white active:scale-[0.98] ${
        compact ? "h-10 px-3 text-sm" : "h-12 min-h-12 px-4 text-sm"
      } ${className}`}
      aria-label={`${label} ${value}`}
    >
      {copied ? (
        <span className="inline-flex items-center gap-2 text-palm">
          <CheckIcon />
          Copied
        </span>
      ) : (
        <span className="inline-flex items-center gap-2">
          <CopyIcon />
          {label}
        </span>
      )}
    </button>
  );
}

function CopyIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="8" y="8" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M4 16V6a2 2 0 0 1 2-2h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M5 12.5 9.5 17 19 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
