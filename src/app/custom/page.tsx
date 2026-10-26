import type { Metadata } from "next";
import { CustomOrderForm } from "@/components/custom-order-form";
import { Eyebrow } from "@/components/ui";

export const metadata: Metadata = {
  title: "Custom candles",
  description:
    "Design your own candle for weddings, birthdays, baby showers and corporate gifting. Choose the vessel, scent, colour and label.",
};

export default function CustomPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 lg:px-8 lg:pt-16">
      <header className="max-w-2xl space-y-3">
        <Eyebrow>Custom orders</Eyebrow>
        <h1 className="font-display text-5xl leading-tight font-medium text-cocoa sm:text-6xl">
          Design your own <em className="text-ember">candle</em>
        </h1>
        <p className="text-mocha">
          One candle with a name on it, or 300 wedding favours. Build it below and we&apos;ll
          send you a final quote and mock-up on WhatsApp within 24 hours.
        </p>
      </header>
      <CustomOrderForm />
    </div>
  );
}
