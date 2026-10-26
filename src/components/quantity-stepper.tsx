"use client";

import { MinusIcon, PlusIcon } from "@/components/icons";

export function QuantityStepper({
  value,
  onChange,
  min = 1,
  max = 50,
  size = "md",
  label = "Quantity",
}: {
  value: number;
  onChange: (next: number) => void;
  min?: number;
  max?: number;
  size?: "sm" | "md";
  label?: string;
}) {
  const pad = size === "sm" ? "h-8 w-8" : "h-11 w-11";
  return (
    <div
      className="inline-flex items-center rounded-full border border-sand bg-white/60"
      role="group"
      aria-label={label}
    >
      <button
        type="button"
        className={`${pad} flex items-center justify-center rounded-full text-cocoa transition hover:bg-linen disabled:opacity-40`}
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        aria-label="Decrease quantity"
      >
        <MinusIcon width={16} height={16} />
      </button>
      <span className="min-w-8 text-center text-sm font-medium tabular-nums" aria-live="polite">
        {value}
      </span>
      <button
        type="button"
        className={`${pad} flex items-center justify-center rounded-full text-cocoa transition hover:bg-linen disabled:opacity-40`}
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        aria-label="Increase quantity"
      >
        <PlusIcon width={16} height={16} />
      </button>
    </div>
  );
}
