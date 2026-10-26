"use client";

import type { ChangeEvent } from "react";
import { SelectField, TextField } from "@/components/ui";
import { indianStates } from "@/data/india";
import type { Address, FieldErrors } from "@/lib/validation";

export const emptyAddress: Address = {
  fullName: "",
  phone: "",
  email: "",
  line1: "",
  line2: "",
  landmark: "",
  city: "",
  state: "",
  pincode: "",
};

export function AddressFields({
  value,
  errors,
  onChange,
  showContact = true,
}: {
  value: Address;
  errors: FieldErrors;
  onChange: (field: keyof Address, value: string) => void;
  showContact?: boolean;
}) {
  const bind = (field: keyof Address) => ({
    name: field,
    value: value[field],
    error: errors[field],
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      onChange(field, e.target.value),
  });

  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {showContact && (
        <>
          <TextField
            label="Email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            {...bind("email")}
          />
          <TextField
            label="Mobile number"
            type="tel"
            inputMode="tel"
            autoComplete="tel-national"
            placeholder="98765 43210"
            hint="We'll confirm your order on WhatsApp"
            {...bind("phone")}
          />
        </>
      )}
      <TextField
        label="Full name"
        autoComplete="name"
        placeholder="Name on the parcel"
        className="sm:col-span-2"
        {...bind("fullName")}
      />
      <TextField
        label="House / flat no., building, street"
        autoComplete="address-line1"
        placeholder="12B, Lotus Apartments, 4th Cross Street"
        className="sm:col-span-2"
        {...bind("line1")}
      />
      <TextField
        label="Area / locality"
        autoComplete="address-line2"
        placeholder="Adyar"
        optional
        {...bind("line2")}
      />
      <TextField
        label="Landmark"
        placeholder="Near Gandhi Nagar bus stop"
        optional
        {...bind("landmark")}
      />
      <TextField
        label="Pincode"
        inputMode="numeric"
        autoComplete="postal-code"
        maxLength={6}
        placeholder="600020"
        {...bind("pincode")}
        onChange={(e) => onChange("pincode", e.target.value.replace(/\D/g, ""))}
      />
      <TextField
        label="City / town"
        autoComplete="address-level2"
        placeholder="Chennai"
        {...bind("city")}
      />
      <SelectField
        label="State"
        autoComplete="address-level1"
        className="sm:col-span-2"
        {...bind("state")}
      >
        <option value="">Select state</option>
        {indianStates.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </SelectField>
    </div>
  );
}
