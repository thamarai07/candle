"use client";

import Link from "next/link";
import { CandleArt } from "@/components/candle-art";
import { OrderSummary } from "@/components/order-summary";
import { QuantityStepper } from "@/components/quantity-stepper";
import { buttonClass } from "@/components/ui";
import { getCategory } from "@/data/catalog";
import { cart, useCart, useHydrated } from "@/lib/cart-store";
import { formatPrice } from "@/lib/format";
import { resolveCart } from "@/lib/pricing";

export default function CartPage() {
  const hydrated = useHydrated();
  const lines = resolveCart(useCart());

  return (
    <div className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 lg:px-8 lg:pt-16">
      <h1 className="font-display text-5xl font-medium text-cocoa">Your bag</h1>

      {!hydrated ? (
        <div className="mt-10 h-64 animate-pulse rounded-[var(--radius-card)] bg-linen" />
      ) : lines.length === 0 ? (
        <div className="mt-12 flex flex-col items-center gap-4 rounded-[var(--radius-card)] bg-linen/60 px-6 py-20 text-center">
          <CandleArt art={{ shape: "jar", wax: "#f3e6d1", vessel: "#e9dccb" }} lit={false} className="w-28" />
          <p className="font-display text-3xl">Nothing here yet</p>
          <p className="text-mocha">Your bag is waiting for something cosy.</p>
          <Link href="/shop" className={buttonClass("primary", "mt-2")}>Browse candles</Link>
        </div>
      ) : (
        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_400px]">
          <ul className="divide-y divide-sand border-y border-sand">
            {lines.map(({ product, size, quantity, lineTotal }) => (
              <li key={`${product.id}-${size.id}`} className="flex gap-5 py-6">
                <Link
                  href={`/products/${product.slug}`}
                  className="flex h-32 w-28 shrink-0 items-end rounded-2xl"
                  style={{ background: getCategory(product.categorySlug)?.tint }}
                >
                  <CandleArt art={product.art} lit={false} className="w-full" />
                </Link>
                <div className="flex flex-1 flex-col">
                  <div className="flex justify-between gap-4">
                    <div>
                      <Link href={`/products/${product.slug}`} className="font-display text-2xl text-cocoa hover:text-ember">
                        {product.name}
                      </Link>
                      <p className="text-sm text-mocha">{size.label} · {formatPrice(size.price)} each</p>
                    </div>
                    <p className="font-medium">{formatPrice(lineTotal)}</p>
                  </div>
                  <div className="mt-auto flex items-center gap-6 pt-4">
                    <QuantityStepper
                      value={quantity}
                      min={0}
                      onChange={(q) => cart.setQuantity(product.id, size.id, q)}
                    />
                    <button
                      type="button"
                      onClick={() => cart.remove(product.id, size.id)}
                      className="text-sm text-mocha underline-offset-4 hover:text-ember hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="lg:sticky lg:top-32 lg:self-start">
            <OrderSummary lines={lines}>
              <Link href="/checkout" className={buttonClass("primary", "mt-6 w-full py-4")}>
                Proceed to checkout
              </Link>
              <Link href="/shop" className="mt-4 block text-center text-sm text-mocha hover:text-cocoa">
                Continue shopping
              </Link>
            </OrderSummary>
          </div>
        </div>
      )}
    </div>
  );
}
