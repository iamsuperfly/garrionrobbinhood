import { UNAVAILABLE } from "./constants";

export function toNumber(value: unknown): number | null {
  if (value === null || value === undefined || value === "") return null;
  if (typeof value === "number") {
    return Number.isFinite(value) ? value : null;
  }
  if (typeof value === "string") {
    const n = Number(value);
    return Number.isFinite(n) ? n : null;
  }
  return null;
}

export function shortAddress(address: string, left = 6, right = 4): string {
  if (!address) return "";
  if (address.length <= left + right + 2) return address;
  return `${address.slice(0, left)}…${address.slice(-right)}`;
}

export function formatUsd(value: number | null | undefined, digits = 2): string {
  if (value === null || value === undefined || !Number.isFinite(value)) {
    return UNAVAILABLE;
  }
  const abs = Math.abs(value);
  if (abs > 0 && abs < 0.0001) {
    return `$${value.toExponential(2)}`;
  }
  if (abs > 0 && abs < 1) {
    return `$${value.toPrecision(4)}`;
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: digits,
    minimumFractionDigits: digits,
  }).format(value);
}

export function formatCompactUsd(value: number | null | undefined): string {
  if (value === null || value === undefined || !Number.isFinite(value)) {
    return UNAVAILABLE;
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatPrice(value: number | null | undefined): string {
  if (value === null || value === undefined || !Number.isFinite(value)) {
    return UNAVAILABLE;
  }
  if (value === 0) return "$0.00";
  if (value < 0.000001) return `$${value.toExponential(2)}`;
  if (value < 0.01) {
    const text = value.toFixed(10).replace(/0+$/, "").replace(/\.$/, "");
    return `$${text}`;
  }
  return formatUsd(value, 4);
}

export function formatPct(value: number | null | undefined): string {
  if (value === null || value === undefined || !Number.isFinite(value)) {
    return UNAVAILABLE;
  }
  const sign = value > 0 ? "+" : "";
  return `${sign}${value.toFixed(2)}%`;
}

export function formatCount(value: number | null | undefined): string {
  if (value === null || value === undefined || !Number.isFinite(value)) {
    return UNAVAILABLE;
  }
  return new Intl.NumberFormat("en-US").format(Math.round(value));
}

export function formatTime(iso: string | null | undefined): string {
  if (!iso) return UNAVAILABLE;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return UNAVAILABLE;
  return d.toLocaleString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    month: "short",
    day: "numeric",
  });
}

export function formatRelative(iso: string | null | undefined): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const diff = Date.now() - d.getTime();
  const sec = Math.max(0, Math.round(diff / 1000));
  if (sec < 60) return `${sec}s ago`;
  const min = Math.round(sec / 60);
  if (min < 60) return `${min}m ago`;
  const hr = Math.round(min / 60);
  return `${hr}h ago`;
}

export function explorerTxUrl(hash: string, base: string): string {
  return `${base.replace(/\/$/, "")}/tx/${hash}`;
}

export function explorerAddressUrl(address: string, base: string): string {
  return `${base.replace(/\/$/, "")}/address/${address}`;
}
