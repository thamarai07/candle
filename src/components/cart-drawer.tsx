"use client";

import Link from "next/link";
import { useEffect } from "react";
import { CandleArt } from "@/components/candle-art";
import { CloseIcon } from "@/components/icons";
import { QuantityStepper } from "@/components/quantity-stepper";
import { buttonClass } from "@/components/ui";
import { cart, useCart, useCartDrawer } from "@/lib/cart-store";
import { formatPrice } from "@/lib/format";
import { cartTotals, resolveCart } from "@/lib/pricing";
import { site } from "@/lib/site";
import { getCategory } from "@/data/catalog";

export function CartDrawer() {
  const open = useCartDrawer();
  const lines = resolveCart(useCart());
  const totals = cartTotals(lines);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && cart.closeDrawer();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const progress = Math.min(100, (totals.subtotal / site.shipping.freeAbove) * 100);

  return (
    <div
      className={`fixed inset-0 z-50 transition ${open ? "visible" : "invisible"}`}
      aria-hidden={!open}
    >
      <button
        type="button"
        tabIndex={-1}
        aria-label="Close bag"
        onClick={cart.closeDrawer}
        className={`absolute inset-0 bg-cocoa/30 backdrop-blur-sm transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Shopping bag"
        className={`absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-cream shadow-lift transition-transform duration-300 ease-out ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between border-b border-sand px-6 py-5">
          <h2 className="font-display text-2xl font-medium">Your bag</h2>
          <button
            type="button"
            onClick={cart.closeDrawer}
            className="rounded-full p-2 hover:bg-linen"
            aria-label="Close bag"
          >
            <CloseIcon />
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <CandleArt
              art={{ shape: "jar", wax: "#f3e6d1", vessel: "#e9dccb" }}
              lit={false}
              className="w-32"
            />
            <p className="font-display text-2xl">Your bag is empty</p>
            <p className="text-sm text-mocha">Find a scent you love, or design your own.</p>
            <Link href="/shop" onClick={cart.closeDrawer} className={buttonClass("primary", "mt-2")}>
              Shop candles
            </Link>
          </div>
        ) : (
          <>
            <div className="border-b border-sand bg-linen/60 px-6 py-4">
              <p className="text-xs text-mocha">
                {totals.remainingForFreeShipping > 0
                  ? <>You&apos;re <strong className="text-cocoa">{formatPrice(totals.remainingForFreeShipping)}</strong> away from free shipping</>
                  : "You've unlocked free shipping ✨"}
              </p>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-sand">
                <div className="h-full rounded-full bg-sage transition-all duration-500" style={{ width: `${progress}%` }} />
              </div>
            </div>

            <ul className="flex-1 divide-y divide-sand overflow-y-auto px-6">
              {lines.map(({ product, size, quantity, lineTotal }) => (
                <li key={`${product.id}-${size.id}`} className="flex gap-4 py-5">
                  <Link
                    href={`/products/${product.slug}`}
                    onClick={cart.closeDrawer}
                    className="flex h-24 w-20 shrink-0 items-end justify-center rounded-xl"
                    style={{ background: getCategory(product.categorySlug)?.tint }}
                  >
                    <CandleArt art={product.art} lit={false} className="w-full" />
                  </Link>
                  <div className="flex flex-1 flex-col">
                    <div className="flex justify-between gap-2">
                      <div>
                        <p className="font-display text-lg leading-tight">{product.name}</p>
                        <p className="text-xs text-mocha">{size.label}</p>
                      </div>
                      <p className="text-sm font-medium">{formatPrice(lineTotal)}</p>
                    </div>
                    <div className="mt-auto flex items-center justify-between pt-3">
                      <QuantityStepper
                        size="sm"
                        value={quantity}
                        min={0}
                        onChange={(q) => cart.setQuantity(product.id, size.id, q)}
                      />
                      <button
                        type="button"
                        onClick={() => cart.remove(product.id, size.id)}
                        className="text-xs text-mocha underline-offset-4 hover:text-ember hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="space-y-4 border-t border-sand px-6 py-6">
              <div className="flex justify-between text-sm">
                <span className="text-mocha">Subtotal</span>
                <span className="font-medium">{formatPrice(totals.subtotal)}</span>
              </div>
              <p className="text-xs text-mocha">Shipping is calculated at checkout.</p>
              <Link href="/checkout" onClick={cart.closeDrawer} className={buttonClass("primary", "w-full py-4")}>
                Checkout · {formatPrice(totals.subtotal)}
              </Link>
              <Link href="/cart" onClick={cart.closeDrawer} className="block text-center text-sm text-mocha underline-offset-4 hover:text-cocoa hover:underline">
                View full bag
              </Link>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
