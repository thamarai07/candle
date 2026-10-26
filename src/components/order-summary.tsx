"use client";

import type { ReactNode } from "react";
import { CandleArt } from "@/components/candle-art";
import { getCategory } from "@/data/catalog";
import { formatPrice } from "@/lib/format";
import { cartTotals, type ResolvedLine } from "@/lib/pricing";

export function OrderSummary({
  lines,
  children,
}: {
  lines: ResolvedLine[];
  children?: ReactNode;
}) {
  const totals = cartTotals(lines);

  return (
    <div className="rounded-[var(--radius-card)] bg-linen/70 p-6 sm:p-8">
      <h2 className="font-display text-2xl text-cocoa">Order summary</h2>
      <ul className="mt-6 space-y-4">
        {lines.map(({ product, size, quantity, lineTotal }) => (
          <li key={`${product.id}-${size.id}`} className="flex items-center gap-4">
            <div
              className="relative flex h-16 w-14 shrink-0 items-end rounded-lg"
              style={{ background: getCategory(product.categorySlug)?.tint }}
            >
              <CandleArt art={product.art} lit={false} className="w-full" />
              <span className="absolute -top-2 -right-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-cocoa px-1 text-[10px] text-cream">
                {quantity}
              </span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-cocoa">{product.name}</p>
              <p className="text-xs text-mocha">{size.label}</p>
            </div>
            <p className="text-sm text-cocoa">{formatPrice(lineTotal)}</p>
          </li>
        ))}
      </ul>
      <dl className="mt-6 space-y-2 border-t border-sand pt-6 text-sm">
        <div className="flex justify-between">
          <dt className="text-mocha">Subtotal</dt>
          <dd>{formatPrice(totals.subtotal)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-mocha">Shipping</dt>
          <dd>{totals.shipping === 0 ? <span className="text-sage">Free</span> : formatPrice(totals.shipping)}</dd>
        </div>
        {totals.remainingForFreeShipping > 0 && (
          <p className="text-xs text-mocha">
            Add {formatPrice(totals.remainingForFreeShipping)} more for free shipping.
          </p>
        )}
        <div className="flex justify-between border-t border-sand pt-4 text-base font-medium">
          <dt>Total</dt>
          <dd className="font-display text-2xl">{formatPrice(totals.total)}</dd>
        </div>
      </dl>
      {children}
    </div>
  );
}
