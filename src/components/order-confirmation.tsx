"use client";

import Link from "next/link";
import { useEffect, useSyncExternalStore } from "react";
import { CandleArt } from "@/components/candle-art";
import { LAST_ORDER_KEY, type PlacedOrder } from "@/components/checkout-form";
import { CheckIcon } from "@/components/icons";
import { buttonClass } from "@/components/ui";
import { cart } from "@/lib/cart-store";
import { formatPrice } from "@/lib/format";
import { paymentMethods } from "@/lib/validation";
import { site } from "@/lib/site";

const noopSubscribe = () => () => {};

function readLastOrder() {
  try {
    return window.sessionStorage.getItem(LAST_ORDER_KEY);
  } catch {
    return null;
  }
}

export function OrderConfirmation() {
  // Raw string snapshot keeps the value stable between renders.
  const raw = useSyncExternalStore(noopSubscribe, readLastOrder, () => undefined);
  const order: PlacedOrder | null = raw ? JSON.parse(raw) : null;

  useEffect(() => {
    if (raw) cart.clear();
  }, [raw]);

  if (raw === undefined) {
    return <div className="mx-auto mt-16 h-96 max-w-3xl animate-pulse rounded-[var(--radius-card)] bg-linen" />;
  }

  if (!order) {
    return (
      <div className="mx-auto max-w-xl px-4 pt-24 text-center">
        <h1 className="font-display text-4xl">No recent order found</h1>
        <p className="mt-3 text-mocha">If you just placed an order, check WhatsApp for our confirmation message.</p>
        <Link href="/shop" className={buttonClass("primary", "mt-8")}>Back to shop</Link>
      </div>
    );
  }

  const payment = paymentMethods.find((m) => m.id === order.paymentMethod);
  const whatsappText = encodeURIComponent(`Hi! I just placed order ${order.orderId} on ${site.name}.`);

  return (
    <div className="mx-auto max-w-3xl px-4 pt-14 sm:px-6">
      <div className="text-center">
        <div className="relative mx-auto w-28">
          <CandleArt art={{ shape: "jar", wax: "#f3e6d1", vessel: "#e9dccb" }} className="w-full" />
          <span className="absolute right-0 bottom-3 flex h-9 w-9 items-center justify-center rounded-full bg-sage text-cream shadow-soft">
            <CheckIcon width={18} height={18} />
          </span>
        </div>
        <p className="mt-6 text-xs uppercase tracking-[0.25em] text-ember">Order placed</p>
        <h1 className="mt-2 font-display text-5xl text-cocoa">Thank you, {order.address.fullName.split(" ")[0]}!</h1>
        <p className="mx-auto mt-3 max-w-md text-mocha">
          Your candles are being lined up for pouring. We&apos;ll message you on WhatsApp at{" "}
          <strong className="text-cocoa">+91 {order.address.phone}</strong> to confirm.
        </p>
        <p className="mt-4 inline-block rounded-full bg-linen px-4 py-1.5 text-sm">
          Order ID <span className="font-medium text-cocoa">{order.orderId}</span>
        </p>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        <div className="rounded-[var(--radius-card)] bg-linen/70 p-6">
          <h2 className="font-display text-xl">Items</h2>
          <ul className="mt-4 space-y-3 text-sm">
            {order.lines.map((l) => (
              <li key={`${l.name}-${l.size}`} className="flex justify-between gap-4">
                <span>
                  {l.name} <span className="text-mocha">× {l.quantity}</span>
                  <span className="block text-xs text-mocha">{l.size}</span>
                </span>
                <span>{formatPrice(l.lineTotal)}</span>
              </li>
            ))}
          </ul>
          <dl className="mt-4 space-y-1 border-t border-sand pt-4 text-sm">
            <div className="flex justify-between"><dt className="text-mocha">Shipping</dt><dd>{order.shipping ? formatPrice(order.shipping) : "Free"}</dd></div>
            <div className="flex justify-between font-medium"><dt>Total</dt><dd>{formatPrice(order.total)}</dd></div>
          </dl>
        </div>
        <div className="rounded-[var(--radius-card)] bg-linen/70 p-6 text-sm">
          <h2 className="font-display text-xl">Delivering to</h2>
          <address className="mt-4 leading-relaxed text-mocha not-italic">
            <span className="text-cocoa">{order.address.fullName}</span><br />
            {order.address.line1}<br />
            {order.address.line2 && <>{order.address.line2}<br /></>}
            {order.address.landmark && <>Near {order.address.landmark}<br /></>}
            {order.address.city}, {order.address.state} {order.address.pincode}
          </address>
          <h2 className="mt-6 font-display text-xl">Payment</h2>
          <p className="mt-2 text-mocha">{payment?.label}</p>
          <p className="text-xs text-mocha">{payment?.hint}</p>
        </div>
      </div>

      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <a
          href={`https://wa.me/${site.whatsapp}?text=${whatsappText}`}
          target="_blank"
          rel="noreferrer"
          className={buttonClass("primary")}
        >
          Message us on WhatsApp
        </a>
        <Link href="/shop" className={buttonClass("outline")}>Continue shopping</Link>
      </div>
    </div>
  );
}
