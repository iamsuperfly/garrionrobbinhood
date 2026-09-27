"use client";

import { useEffect, useState } from "react";
import { GARRI } from "@/lib/constants";
import { CopyButton } from "./CopyButton";
import { BowlMark } from "./Marks";

const DESKTOP_LINKS = [
  { href: "#live", label: "Live" },
  { href: "#buy", label: "Buy" },
  { href: "#details", label: "Details" },
  { href: "#community", label: "Community" },
];

const MENU_LINKS = [
  { href: "#buy", label: "How to buy" },
  { href: "#how", label: "How it works" },
  { href: "#rewards", label: "Rewards" },
  { href: "#community", label: "Community" },
  { href: GARRI.explorerTokenUrl, label: "Explorer", external: true },
  { href: GARRI.geckoPoolUrl, label: "GeckoTerminal", external: true },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-40 overflow-x-hidden border-b border-charcoal/10">
        <div className="bg-cream/90 backdrop-blur-md">
          <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-2 px-3 sm:h-[4.25rem] sm:gap-4 sm:px-6">
            <a href="#top" className="flex min-w-0 items-center gap-2 text-charcoal sm:gap-2.5">
              <BowlMark className="h-8 w-8 shrink-0 sm:h-9 sm:w-9" />
              <span className="truncate font-display text-xl tracking-tight sm:text-2xl">GARRI</span>
            </a>

            <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
              {DESKTOP_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-charcoal/80 transition hover:text-palm"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="hidden items-center gap-2 lg:flex">
              <CopyButton value={GARRI.contract} label="Copy contract" compact />
              <a
                href={GARRI.buyUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-primary h-10 px-5 text-sm"
              >
                Buy on Pons
              </a>
            </div>

            <div className="flex shrink-0 items-center gap-2 lg:hidden">
              <a
                href={GARRI.buyUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-primary h-11 min-w-[3.25rem] px-3 text-sm sm:px-4"
              >
                Buy
              </a>
              <button
                type="button"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-charcoal/15 bg-white"
                aria-expanded={open}
                aria-controls="mobile-menu"
                aria-label={open ? "Close menu" : "Open menu"}
                onClick={() => setOpen((v) => !v)}
              >
                <span className="sr-only">Menu</span>
                <span className="relative block h-3.5 w-5">
                  <span className={`absolute left-0 h-0.5 w-5 bg-charcoal transition ${open ? "top-1.5 rotate-45" : "top-0"}`} />
                  <span className={`absolute left-0 top-1.5 h-0.5 w-5 bg-charcoal transition ${open ? "opacity-0" : "opacity-100"}`} />
                  <span className={`absolute left-0 h-0.5 w-5 bg-charcoal transition ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-[80] overflow-hidden lg:hidden ${
          open ? "pointer-events-auto" : "pointer-events-none invisible"
        }`}
      >
        <button
          type="button"
          className={`absolute inset-0 bg-charcoal/40 transition-opacity ${open ? "opacity-100" : "opacity-0"}`}
          aria-label="Close menu overlay"
          onClick={() => setOpen(false)}
        />
        <div
          id="mobile-menu"
          className={`absolute right-0 top-0 flex h-full w-[min(22rem,88vw)] flex-col bg-cream shadow-2xl transition-transform duration-300 ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between border-b border-charcoal/10 px-5 py-4">
            <span className="font-display text-xl">Menu</span>
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-charcoal/15"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
            >
              ×
            </button>
          </div>
          <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-5 py-4" aria-label="Mobile">
            {MENU_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noreferrer" : undefined}
                className="flex min-h-12 items-center rounded-xl px-3 text-base font-medium text-charcoal hover:bg-cassava/40"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="space-y-3 border-t border-charcoal/10 px-5 py-5">
            <CopyButton value={GARRI.contract} label="Copy contract" className="w-full" />
            <a href={GARRI.buyUrl} target="_blank" rel="noreferrer" className="btn-primary flex w-full">
              Buy on Pons
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
