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
  if (lines.length === 0) {
    return Response.json(
      { message: "These items are no longer available.", errors: {} },
      { status: 400 },
    );
  }
  const totals = cartTotals(lines);

  const order: PlacedOrder = {
    orderId: newId("WB"),
    createdAt: new Date().toISOString(),
    subtotal: totals.subtotal,
    shipping: totals.shipping,
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
