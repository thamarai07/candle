import type { PlacedOrder } from "@/components/checkout-form";
import { cartTotals, resolveCart } from "@/lib/pricing";
import { appendRecord, newId } from "@/lib/records";
import { validateCheckout } from "@/lib/validation";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const check = validateCheckout(body);
  if (!check.ok) {
    return Response.json(
      { message: "Please check the highlighted fields.", errors: check.errors },
      { status: 400 },
    );
  }

  // Prices are recalculated from the catalog, never taken from the browser.
  const lines = resolveCart(check.data.items);
  // Never place part of an order: the customer agreed to the whole bag.
  if (lines.length !== check.data.items.length) {
    return Response.json(
      {
        message: "Some items in your bag are no longer available. Please refresh the page to update your bag.",
        errors: {},
      },
      { status: 400 },
    );
  }
  const totals = cartTotals(lines, check.data.giftPacking);

  const order: PlacedOrder = {
    orderId: newId("TLF"),
    createdAt: new Date().toISOString(),
    subtotal: totals.subtotal,
    shipping: totals.shipping,
    giftPacking: totals.giftPacking,
    total: totals.total,
    paymentMethod: check.data.paymentMethod,
    address: check.data.address,
    lines: lines.map((l) => ({
      name: l.product.name,
      size: l.size.label,
      quantity: l.quantity,
      lineTotal: l.lineTotal,
    })),
  };

  await appendRecord("orders", {
    ...order,
    status: "new",
    giftMessage: check.data.giftMessage,
    notes: check.data.notes,
  });

  return Response.json(order, { status: 201 });
}
