"use client";

import { useState } from "react";
import { cart } from "@/lib/cart-store";
import { CheckIcon } from "@/components/icons";

export function QuickAddButton({
  productId,
  sizeId,
}: {
  productId: string;
  sizeId: string;
}) {
  const [added, setAdded] = useState(false);

  return (
    <button
      type="button"
      onClick={() => {
        cart.add(productId, sizeId);
        cart.openDrawer();
        setAdded(true);
        setTimeout(() => setAdded(false), 1600);
      }}
      className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-cocoa py-2.5 text-sm text-cream transition hover:bg-ember"
    >
      {added ? (
        <>
          <CheckIcon width={16} height={16} /> Added
        </>
      ) : (
        "Add to bag"
      )}
    </button>
  );
}
