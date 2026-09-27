"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  value: number | null;
  format: (n: number | null) => string;
  className?: string;
};

export function AnimatedNumber({ value, format, className }: Props) {
  const [display, setDisplay] = useState<number | null>(value);
  const fromRef = useRef<number | null>(value);

  useEffect(() => {
    if (value === null || fromRef.current === null) {
      setDisplay(value);
      fromRef.current = value;
      return;
    }
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setDisplay(value);
      fromRef.current = value;
      return;
    }

    const from = fromRef.current;
    const to = value;
    const start = performance.now();
    const duration = 700;
    let frame = 0;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(from + (to - from) * eased);
      if (t < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        fromRef.current = to;
      }
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value]);

  return <span className={className}>{format(display)}</span>;
}
