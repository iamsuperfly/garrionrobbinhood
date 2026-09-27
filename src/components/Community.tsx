"use client";

import { GARRI } from "@/lib/constants";

export function Community() {
  return (
    <section id="community" className="section-pad">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="font-display text-3xl sm:text-4xl">Community</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <a
            href={GARRI.xUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-3xl border border-charcoal/10 bg-white p-6 transition hover:border-palm/40"
          >
            <p className="text-sm uppercase tracking-widest text-charcoal/55">X</p>
            <p className="mt-2 break-words font-display text-2xl sm:text-3xl">{GARRI.xHandle}</p>
            <p className="mt-2 text-sm text-charcoal/70">Open the official X account.</p>
          </a>
          <a
            href={GARRI.telegramUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-3xl border border-charcoal/10 bg-white p-6 transition hover:border-palm/40"
          >
            <p className="text-sm uppercase tracking-widest text-charcoal/55">Telegram</p>
            <p className="mt-2 break-words font-display text-2xl sm:text-3xl">WWDegenbro</p>
            <p className="mt-2 text-sm text-charcoal/70">Join the official Telegram group.</p>
          </a>
        </div>
      </div>
    </section>
  );
}
