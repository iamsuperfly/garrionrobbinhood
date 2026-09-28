"use client";

import { useEffect, useRef, useState } from "react";
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
  { href: "#live", label: "Live" },
  { href: "#details", label: "Details" },
  { href: "#buy", label: "How to buy" },
  { href: "#how", label: "How it works" },
  { href: "#rewards", label: "Rewards" },
  { href: "#community", label: "Community" },
  { href: GARRI.explorerTokenUrl, label: "Explorer", external: true },
  { href: GARRI.geckoPoolUrl, label: "GeckoTerminal", external: true },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const hasOpenedRef = useRef(false);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    if (open) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (open) {
      hasOpenedRef.current = true;
      closeButtonRef.current?.focus();
    } else if (hasOpenedRef.current) {
      menuButtonRef.current?.focus();
    }
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-charcoal/10 bg-cream/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:h-[4.25rem] sm:px-6">
        <a href="#top" className="flex items-center gap-2.5 text-charcoal">
          <BowlMark className="h-9 w-9" />
          <span className="font-display text-2xl tracking-tight">GARRI</span>
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

        <div className="flex items-center gap-2 lg:hidden">
          <a
            href={GARRI.buyUrl}
            target="_blank"
            rel="noreferrer"
            className="btn-primary h-11 px-4 text-sm"
          >
            Buy
          </a>
          <button
            type="button"
            ref={menuButtonRef}
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

      <div
        className={`fixed inset-0 z-50 overflow-hidden lg:hidden ${open ? "pointer-events-auto" : "pointer-events-none"}`}
        aria-hidden={!open}
      >
        <button
          type="button"
          className={`absolute inset-0 bg-charcoal/40 transition-opacity ${open ? "opacity-100" : "opacity-0"}`}
          aria-label="Close menu overlay"
          onClick={() => setOpen(false)}
        />
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          className={`absolute right-0 top-0 flex h-full w-[min(22rem,calc(100vw-1rem))] max-w-full flex-col bg-cream shadow-2xl transition-transform duration-300 ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between border-b border-charcoal/10 px-5 py-4">
            <span className="font-display text-xl">Menu</span>
            <button
              type="button"
              ref={closeButtonRef}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-charcoal/15"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
            >
              ×
            </button>
          </div>
          <nav className="flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto overscroll-contain px-5 py-4" aria-label="Mobile">
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
    </header>
  );
}
