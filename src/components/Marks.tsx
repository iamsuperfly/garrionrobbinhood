export function BowlMark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <ellipse cx="32" cy="18" rx="18" ry="7" fill="#F3D27A" />
      <ellipse cx="32" cy="18" rx="14" ry="4.5" fill="#E8B84A" />
      <circle cx="24" cy="17.5" r="1.6" fill="#C9892A" />
      <circle cx="30" cy="16.2" r="1.4" fill="#C9892A" />
      <circle cx="36" cy="17.8" r="1.5" fill="#B77822" />
      <circle cx="28" cy="19.5" r="1.2" fill="#B77822" />
      <path d="M12 24c2 16 10 26 20 26s18-10 20-26" stroke="#8C2A16" strokeWidth="3" strokeLinecap="round" />
      <path d="M14 24c1.6 13 8.4 22 18 22s16.4-9 18-22" fill="#C23B22" />
      <path d="M16 24c1.2 8 6.4 14 16 14s14.8-6 16-14" fill="#E8B84A" opacity="0.35" />
    </svg>
  );
}

export function MeasureMark({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <rect x="14" y="10" width="36" height="44" rx="6" stroke="#2A2118" strokeWidth="2.5" fill="#F7F0E4" />
      <path d="M14 22h36M14 34h36M14 46h36" stroke="#C9892A" strokeWidth="1.5" />
      <path d="M22 22v24" stroke="#8C2A16" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function GrainMark({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <ellipse cx="20" cy="28" rx="7" ry="5" fill="#E8B84A" />
      <ellipse cx="32" cy="22" rx="8" ry="5.5" fill="#F3D27A" />
      <ellipse cx="44" cy="28" rx="7" ry="5" fill="#D4A03A" />
      <ellipse cx="26" cy="38" rx="7.5" ry="5" fill="#C9892A" />
      <ellipse cx="40" cy="38" rx="7" ry="5" fill="#E8B84A" />
    </svg>
  );
}
