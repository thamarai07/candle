"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent, type ReactNode } from "react";
import { AddressFields, emptyAddress } from "@/components/address-fields";
import { OrderSummary } from "@/components/order-summary";
import { TextAreaField, buttonClass } from "@/components/ui";
import { useCart, useHydrated } from "@/lib/cart-store";
import { formatPrice } from "@/lib/format";
import { cartTotals, resolveCart } from "@/lib/pricing";
import { focusFirstError, postJson } from "@/lib/submit";
import {
  paymentMethods,
  validateCheckout,
  type Address,
  type FieldErrors,
  type PaymentMethod,
} from "@/lib/validation";

const SAVED_ADDRESS_KEY = "wick-bloom-address";
export const LAST_ORDER_KEY = "wick-bloom-last-order";

export type PlacedOrder = {
  orderId: string;
  createdAt: string;
  total: number;
  subtotal: number;
  shipping: number;
  paymentMethod: PaymentMethod;
  address: Address;
  lines: { name: string; size: string; quantity: number; lineTotal: number }[];
};

export function CheckoutForm() {
  const hydrated = useHydrated();
  const items = useCart();

  if (!hydrated) {
    return <div className="mt-10 h-96 animate-pulse rounded-[var(--radius-card)] bg-linen" />;
  }

  if (items.length === 0) {
    return (
      <div className="mt-10 rounded-[var(--radius-card)] bg-linen/60 px-6 py-16 text-center">
        <p className="font-display text-3xl">Your bag is empty</p>
        <p className="mt-2 text-mocha">Add a candle or two before checking out.</p>
        <Link href="/shop" className={buttonClass("primary", "mt-6")}>Shop candles</Link>
      </div>
    );
  }

  return <CheckoutFormInner />;
}

function readSavedAddress(): Address {
  try {
    const raw = window.localStorage.getItem(SAVED_ADDRESS_KEY);
    return raw ? { ...emptyAddress, ...JSON.parse(raw) } : emptyAddress;
  } catch {
    return emptyAddress;
  }
}

function CheckoutFormInner() {
  const router = useRouter();
  const items = useCart();
  const lines = resolveCart(items);
  const totals = cartTotals(lines);

  const [address, setAddress] = useState<Address>(readSavedAddress);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("upi");
  const [giftMessage, setGiftMessage] = useState("");
  const [notes, setNotes] = useState("");
  const [saveAddress, setSaveAddress] = useState(true);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formMessage, setFormMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const updateAddress = (field: keyof Address, value: string) => {
    setAddress((a) => ({ ...a, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const payload = { address, paymentMethod, giftMessage, notes, items };

    const check = validateCheckout(payload);
    if (!check.ok) {
      setErrors(check.errors);
      setFormMessage("Please fix the highlighted fields.");
      focusFirstError(check.errors);
      return;
    }

    setSubmitting(true);
    setFormMessage("");
    const result = await postJson<PlacedOrder>("/api/orders", payload);
    if (!result.ok) {
      setSubmitting(false);
      setErrors(result.errors);
      setFormMessage(result.message);
      focusFirstError(result.errors);
      return;
    }

    try {
      if (saveAddress) {
        window.localStorage.setItem(SAVED_ADDRESS_KEY, JSON.stringify(check.data.address));
      } else {
        window.localStorage.removeItem(SAVED_ADDRESS_KEY);
      }
      window.sessionStorage.setItem(LAST_ORDER_KEY, JSON.stringify(result.data));
    } catch {
      // Storage is optional; the order is already placed.
    }
    // The confirmation page clears the bag, so this form never flashes empty.
    router.push("/order-confirmed");
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="mt-10 grid gap-10 lg:grid-cols-[1fr_420px]">
      <div className="space-y-8">
        <Step n={1} title="Contact & delivery address">
          <AddressFields value={address} errors={errors} onChange={updateAddress} />
          <label className="mt-5 flex items-center gap-3 text-sm text-mocha">
            <input
              type="checkbox"
              checked={saveAddress}
              onChange={(e) => setSaveAddress(e.target.checked)}
              className="h-4 w-4 rounded accent-ember"
            />
            Save these details on this device for next time
          </label>
        </Step>

        <Step n={2} title="Make it special" subtitle="Optional">
          <div className="grid gap-5">
            <TextAreaField
              label="Gift message"
              name="giftMessage"
              rows={3}
              optional
              maxLength={300}
              placeholder="Happy housewarming! Love, Kavya"
              hint="We'll handwrite this on a card inside the box."
              value={giftMessage}
              onChange={(e) => setGiftMessage(e.target.value)}
            />
            <TextAreaField
              label="Delivery notes"
              name="notes"
              rows={2}
              optional
              maxLength={500}
              placeholder="Call before delivery, leave with security, etc."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
        </Step>

        <Step n={3} title="Payment">
          <fieldset>
            <legend className="sr-only">Payment method</legend>
            <div className="grid gap-3">
              {paymentMethods.map((m) => {
                const active = paymentMethod === m.id;
                return (
                  <label
                    key={m.id}
                    className={`flex cursor-pointer items-start gap-4 rounded-2xl border p-5 transition has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ember/40 ${active ? "border-ember bg-white" : "border-sand bg-white/50 hover:border-oat"}`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={m.id}
                      checked={active}
                      onChange={() => setPaymentMethod(m.id)}
                      className="mt-0.5 h-4 w-4 accent-ember"
                    />
                    <span>
                      <span className="block text-sm font-medium text-cocoa">{m.label}</span>
                      <span className="mt-0.5 block text-xs text-mocha">{m.hint}</span>
                    </span>
                  </label>
                );
              })}
            </div>
            {errors.paymentMethod && <p className="mt-2 text-xs text-red-600">{errors.paymentMethod}</p>}
          </fieldset>
        </Step>
      </div>

      <div className="lg:sticky lg:top-32 lg:self-start">
        <OrderSummary lines={lines}>
          {formMessage && (
            <p role="alert" className="mt-6 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
              {formMessage}
            </p>
          )}
          <button type="submit" disabled={submitting} className={buttonClass("primary", "mt-6 w-full py-4")}>
            {submitting ? "Placing order…" : `Place order · ${formatPrice(totals.total)}`}
          </button>
          <p className="mt-4 text-center text-xs text-mocha">
            We&apos;ll confirm your order on WhatsApp before dispatch.
          </p>
        </OrderSummary>
      </div>
    </form>
  );
}

function Step({
  n,
  title,
  subtitle,
  children,
}: {
  n: number;
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-[var(--radius-card)] border border-sand bg-white/40 p-6 sm:p-8">
      <div className="mb-6 flex items-center gap-3">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-cocoa text-sm text-cream">{n}</span>
        <h2 className="font-display text-2xl text-cocoa">{title}</h2>
        {subtitle && <span className="text-xs text-mocha">{subtitle}</span>}
      </div>
      {children}
    </section>
  );
}
