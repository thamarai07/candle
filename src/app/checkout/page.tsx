import type { Metadata } from "next";
import { CheckoutForm } from "@/components/checkout-form";

export const metadata: Metadata = {
  title: "Checkout",
};

export default function CheckoutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 lg:px-8 lg:pt-16">
      <h1 className="font-display text-5xl font-medium text-cocoa">Checkout</h1>
      <p className="mt-2 text-mocha">Almost there. Tell us where to send your candles.</p>
      <CheckoutForm />
    </div>
  );
}
