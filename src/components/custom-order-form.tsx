"use client";

import Link from "next/link";
import { useState, type FormEvent, type ReactNode } from "react";
import { AddressFields, emptyAddress } from "@/components/address-fields";
import { CandleArt } from "@/components/candle-art";
import { CheckIcon } from "@/components/icons";
import { QuantityStepper } from "@/components/quantity-stepper";
import { SelectField, TextAreaField, TextField, buttonClass } from "@/components/ui";
import { customOptions, customVessel, customWax } from "@/data/custom";
import { formatPrice } from "@/lib/format";
import { focusFirstError, postJson } from "@/lib/submit";
import {
  validateCustomOrder,
  type Address,
  type FieldErrors,
} from "@/lib/validation";

type Choices = {
  occasion: string;
  vessel: string;
  scent: string;
  waxColor: string;
  quantity: number;
  labelText: string;
  neededBy: string;
  details: string;
};

// Bulk orders get a small discount on the estimate.
function discountFor(quantity: number) {
  if (quantity >= 100) return 0.15;
  if (quantity >= 25) return 0.1;
  return 0;
}

export function CustomOrderForm() {
  const [choices, setChoices] = useState<Choices>({
    occasion: "",
    vessel: "glass-jar",
    scent: "",
    waxColor: "ivory",
    quantity: 1,
    labelText: "",
    neededBy: "",
    details: "",
  });
  const [address, setAddress] = useState<Address>(emptyAddress);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formMessage, setFormMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [requestId, setRequestId] = useState<string | null>(null);

  const clearError = (key: string) => {
    if (!errors[key]) return;
    setErrors((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const set = <K extends keyof Choices>(key: K, value: Choices[K]) => {
    setChoices((c) => ({ ...c, [key]: value }));
    clearError(key);
  };

  const vessel = customVessel(choices.vessel) ?? customOptions.vessel[0];
  const wax = customWax(choices.waxColor) ?? customOptions.waxColor[0];
  const discount = discountFor(choices.quantity);
  const estimate = Math.round(vessel.price * choices.quantity * (1 - discount));

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const payload = { ...choices, address };
    const check = validateCustomOrder(payload);
    if (!check.ok) {
      setErrors(check.errors);
      setFormMessage("Please fix the highlighted fields.");
      focusFirstError(check.errors);
      return;
    }
    setSubmitting(true);
    setFormMessage("");
    const result = await postJson<{ requestId: string }>("/api/custom-orders", payload);
    setSubmitting(false);
    if (!result.ok) {
      setErrors(result.errors);
      setFormMessage(result.message);
      focusFirstError(result.errors);
      return;
    }
    setRequestId(result.data.requestId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (requestId) {
    return (
      <div className="mt-12 rounded-[2rem] bg-linen/70 px-6 py-16 text-center">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-sage text-cream">
          <CheckIcon width={26} height={26} />
        </span>
        <h2 className="mt-6 font-display text-4xl">Request received!</h2>
        <p className="mx-auto mt-3 max-w-md text-mocha">
          Thank you, {address.fullName.split(" ")[0]}. We&apos;ll send a mock-up and final quote to{" "}
          <strong className="text-cocoa">+91 {address.phone}</strong> on WhatsApp within 24 hours.
        </p>
        <p className="mt-4 inline-block rounded-full bg-cream px-4 py-1.5 text-sm">
          Reference <span className="font-medium">{requestId}</span>
        </p>
        <div className="mt-8">
          <Link href="/shop" className={buttonClass("primary")}>Browse ready-made candles</Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="mt-12 grid gap-10 lg:grid-cols-[1fr_400px]">
      <div className="space-y-8">
        <Panel title="What's the occasion?">
          <ChipGroup
            name="occasion"
            options={customOptions.occasion}
            value={choices.occasion}
            onChange={(v) => set("occasion", v)}
            error={errors.occasion}
          />
        </Panel>

        <Panel title="Choose a vessel">
          <fieldset>
            <legend className="sr-only">Vessel</legend>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-5">
              {customOptions.vessel.map((v) => {
                const active = v.id === choices.vessel;
                return (
                  <label
                    key={v.id}
                    className={`flex cursor-pointer flex-col items-center rounded-2xl border p-3 text-center transition has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ember/40 ${active ? "border-ember bg-white shadow-soft" : "border-sand bg-white/40 hover:border-oat"}`}
                  >
                    <input
                      type="radio"
                      name="vessel"
                      value={v.id}
                      checked={active}
                      onChange={() => set("vessel", v.id)}
                      className="sr-only"
                    />
                    <CandleArt art={{ shape: v.shape, wax: wax.hex, vessel: vesselTone(v.shape) }} lit={false} className="w-20" />
                    <span className="mt-2 text-sm font-medium text-cocoa">{v.label}</span>
                    <span className="text-xs text-mocha">{v.detail} · {formatPrice(v.price)}</span>
                  </label>
                );
              })}
            </div>
          </fieldset>
        </Panel>

        <Panel title="Scent & colour">
          <div className="grid gap-6 sm:grid-cols-2">
            <SelectField
              label="Scent"
              name="scent"
              value={choices.scent}
              error={errors.scent}
              onChange={(e) => set("scent", e.target.value)}
            >
              <option value="">Choose a scent</option>
              {customOptions.scent.map((s) => (
                <option key={s.id} value={s.id}>{s.label}</option>
              ))}
            </SelectField>
            <fieldset>
              <legend className="mb-1.5 text-sm font-medium text-cocoa">
                Wax colour <span className="font-normal text-mocha">· {wax.label}</span>
              </legend>
              <div className="flex flex-wrap gap-2.5 pt-1">
                {customOptions.waxColor.map((w) => {
                  const active = w.id === choices.waxColor;
                  return (
                    <label
                      key={w.id}
                      title={w.label}
                      className={`relative h-10 w-10 cursor-pointer rounded-full border-2 transition has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ember/40 ${active ? "scale-110 border-cocoa" : "border-white shadow-soft hover:scale-105"}`}
                      style={{ background: w.hex }}
                    >
                      <input
                        type="radio"
                        name="waxColor"
                        value={w.id}
                        checked={active}
                        onChange={() => set("waxColor", w.id)}
                        className="sr-only"
                      />
                      <span className="sr-only">{w.label}</span>
                    </label>
                  );
                })}
              </div>
            </fieldset>
          </div>
        </Panel>

        <Panel title="Personalise it">
          <div className="grid gap-5 sm:grid-cols-2">
            <TextField
              label="Label text"
              name="labelText"
              optional
              maxLength={40}
              placeholder="Ananya ♡ Rohan · 12.02"
              hint={`${choices.labelText.length}/40 characters`}
              value={choices.labelText}
              onChange={(e) => set("labelText", e.target.value)}
            />
            <TextField
              label="Needed by"
              name="neededBy"
              type="date"
              optional
              hint="Custom orders take 7–10 days"
              value={choices.neededBy}
              error={errors.neededBy}
              onChange={(e) => set("neededBy", e.target.value)}
            />
            <div className="space-y-1.5">
              <p className="text-sm font-medium text-cocoa">Quantity</p>
              <div className="flex items-center gap-3">
                <QuantityStepper value={choices.quantity} max={500} onChange={(q) => set("quantity", q)} />
                <input
                  type="number"
                  name="quantity"
                  min={1}
                  max={500}
                  aria-label="Quantity"
                  value={choices.quantity}
                  onChange={(e) => set("quantity", Math.max(1, Math.min(500, Number(e.target.value) || 1)))}
                  className="w-24 rounded-xl border border-sand bg-white/70 px-3 py-2.5 text-sm focus:border-ember focus:ring-2 focus:ring-ember/30 focus:outline-none"
                />
              </div>
              {errors.quantity ? (
                <p className="text-xs text-red-600">{errors.quantity}</p>
              ) : (
                <p className="text-xs text-mocha">10% off 25+, 15% off 100+</p>
              )}
            </div>
            <TextAreaField
              label="Anything else?"
              name="details"
              optional
              rows={3}
              className="sm:col-span-2"
              placeholder="Theme colours, ribbon, packaging, a reference photo link…"
              value={choices.details}
              onChange={(e) => set("details", e.target.value)}
            />
          </div>
        </Panel>

        <Panel title="Your details & delivery address">
          <AddressFields
            value={address}
            errors={errors}
            onChange={(field, value) => {
              setAddress((a) => ({ ...a, [field]: value }));
              clearError(field);
            }}
          />
        </Panel>
      </div>

      <aside className="lg:sticky lg:top-32 lg:self-start">
        <div className="overflow-hidden rounded-[var(--radius-card)] bg-linen/70">
          <div className="relative aspect-[4/3] bg-gradient-to-b from-blush/60 to-linen">
            <CandleArt
              art={{
                shape: vessel.shape,
                wax: wax.hex,
                vessel: vesselTone(vessel.shape),
                label: vessel.shape === "jar" ? choices.labelText.slice(0, 12) || "Your name" : undefined,
              }}
              className="absolute inset-x-[22%] bottom-[4%]"
            />
          </div>
          <div className="space-y-4 p-6">
            <h2 className="font-display text-2xl">Your candle</h2>
            <dl className="space-y-2 text-sm">
              <Row label="Vessel" value={`${vessel.label} · ${vessel.detail}`} />
              <Row label="Scent" value={customOptions.scent.find((s) => s.id === choices.scent)?.label ?? "—"} />
              <Row label="Colour" value={wax.label} />
              {choices.labelText && <Row label="Label" value={choices.labelText} />}
              <Row label="Quantity" value={String(choices.quantity)} />
            </dl>
            <div className="border-t border-sand pt-4">
              <div className="flex items-baseline justify-between">
                <span className="text-sm text-mocha">Estimated total</span>
                <span className="font-display text-3xl">{formatPrice(estimate)}</span>
              </div>
              {discount > 0 && (
                <p className="mt-1 text-right text-xs text-sage">Includes {discount * 100}% bulk discount</p>
              )}
              <p className="mt-2 text-xs text-mocha">Final quote confirmed on WhatsApp. No payment now.</p>
            </div>
            {formMessage && (
              <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{formMessage}</p>
            )}
            <button type="submit" disabled={submitting} className={buttonClass("primary", "w-full py-4")}>
              {submitting ? "Sending…" : "Request my custom candle"}
            </button>
          </div>
        </div>
      </aside>
    </form>
  );
}

function vesselTone(shape: string) {
  if (shape === "tumbler") return "#a8693e";
  if (shape === "tin") return "#c9c2b6";
  if (shape === "bowl") return "#c49a4f";
  return "#e9dccb";
}

function Panel({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="rounded-[var(--radius-card)] border border-sand bg-white/40 p-6 sm:p-8">
      <h2 className="mb-5 font-display text-2xl text-cocoa">{title}</h2>
      {children}
    </section>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-mocha">{label}</dt>
      <dd className="text-right text-cocoa">{value}</dd>
    </div>
  );
}

function ChipGroup({
  name,
  options,
  value,
  onChange,
  error,
}: {
  name: string;
  options: readonly { id: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  error?: string;
}) {
  return (
    <fieldset>
      <legend className="sr-only">{name}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => {
          const active = o.id === value;
          return (
            <label
              key={o.id}
              className={`cursor-pointer rounded-full border px-4 py-2.5 text-sm transition has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ember/40 ${active ? "border-cocoa bg-cocoa text-cream" : "border-sand bg-white/60 text-cocoa hover:border-cocoa/50"}`}
            >
              <input
                type="radio"
                name={name}
                value={o.id}
                checked={active}
                onChange={() => onChange(o.id)}
                className="sr-only"
              />
              {o.label}
            </label>
          );
        })}
      </div>
      {error && <p className="mt-2 text-xs text-red-600">{error}</p>}
    </fieldset>
  );
}
