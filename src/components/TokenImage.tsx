"use client";

import { useState } from "react";

type Props = {
  src: string | null;
  size?: number;
  className?: string;
};

export function TokenImage({ src, size = 128, className = "" }: Props) {
  const [failed, setFailed] = useState(false);
  const showImage = Boolean(src) && !failed;

  return (
    <div
      className={`relative overflow-hidden rounded-full border-4 border-cassava bg-cream shadow-[0_12px_30px_rgba(42,33,24,0.12)] ${className}`}
      style={{ width: size, height: size }}
    >
      {showImage ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src ?? ""}
          alt="GARRI token"
          width={size}
          height={size}
          className="h-full w-full object-cover"
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-cassava font-display text-[clamp(1.1rem,3vw,1.8rem)] font-semibold tracking-wide text-charcoal">
          GARRI
        </div>
      )}
    </div>
  );
}
