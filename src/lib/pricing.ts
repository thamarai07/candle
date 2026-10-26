import { getProductById } from "@/data/catalog";
import { site } from "@/lib/site";
import type { CartItem, Product, ProductSize } from "@/lib/types";

export type ResolvedLine = {
  product: Product;
  size: ProductSize;
  quantity: number;
  lineTotal: number;
};

// Turns raw cart items into priced lines using the catalog. The server runs
// the same code on checkout, so prices never come from the browser.
export function resolveCart(items: CartItem[]): ResolvedLine[] {
  const lines: ResolvedLine[] = [];
  for (const item of items) {
    const product = getProductById(item.productId);
    const size = product?.sizes.find((s) => s.id === item.sizeId);
    if (!product || !size || item.quantity < 1) continue;
    lines.push({
      product,
      size,
      quantity: item.quantity,
      lineTotal: size.price * item.quantity,
    });
  }
  return lines;
}

export function cartTotals(lines: ResolvedLine[]) {
  const subtotal = lines.reduce((sum, l) => sum + l.lineTotal, 0);
  const shipping =
    subtotal === 0 || subtotal >= site.shipping.freeAbove
      ? 0
      : site.shipping.flatRate;
  return {
    subtotal,
    shipping,
    total: subtotal + shipping,
    remainingForFreeShipping: Math.max(0, site.shipping.freeAbove - subtotal),
  };
}
