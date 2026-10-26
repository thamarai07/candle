"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { QuantityStepper } from "@/components/quantity-stepper";
import { buttonClass } from "@/components/ui";
import { cart } from "@/lib/cart-store";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/lib/types";

export function ProductPurchase({ product }: { product: Product }) {
  const router = useRouter();
  const [sizeId, setSizeId] = useState(product.sizes[0].id);
  const [quantity, setQuantity] = useState(1);
  const size = product.sizes.find((s) => s.id === sizeId) ?? product.sizes[0];

  return (
    <div className="space-y-6">
      <div className="flex items-baseline gap-3">
        <p className="font-display text-4xl text-cocoa">{formatPrice(size.price)}</p>
        {product.compareAtPrice && product.sizes.length === 1 && (
          <p className="text-mocha/70 line-through">{formatPrice(product.compareAtPrice)}</p>
        )}
        <p className="text-xs text-mocha">Inclusive of all taxes</p>
      </div>

      {product.sizes.length > 1 && (
        <fieldset>
          <legend className="mb-3 text-sm font-medium text-cocoa">Size</legend>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((s) => {
              const active = s.id === sizeId;
              return (
                <label
                  key={s.id}
                  className={`cursor-pointer rounded-full border px-4 py-2.5 text-sm transition has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ember/40 ${active ? "border-cocoa bg-cocoa text-cream" : "border-sand bg-white/60 text-cocoa hover:border-cocoa/50"}`}
                >
                  <input
                    type="radio"
                    name="size"
                    value={s.id}
                    checked={active}
                    onChange={() => setSizeId(s.id)}
                    className="sr-only"
                  />
                  {s.label}
                  <span className={active ? "text-cream/70" : "text-mocha"}> · {formatPrice(s.price)}</span>
                </label>
              );
            })}
          </div>
        </fieldset>
      )}

      <div className="flex flex-wrap items-center gap-3">
        <QuantityStepper value={quantity} onChange={setQuantity} />
        <button
          type="button"
          className={buttonClass("primary", "flex-1 py-4")}
          onClick={() => {
            cart.add(product.id, size.id, quantity);
            cart.openDrawer();
          }}
        >
          Add to bag · {formatPrice(size.price * quantity)}
        </button>
      </div>
      <button
        type="button"
        className={buttonClass("outline", "w-full py-4")}
        onClick={() => {
          cart.add(product.id, size.id, quantity);
          router.push("/checkout");
        }}
      >
        Buy now
      </button>
    </div>
  );
}
