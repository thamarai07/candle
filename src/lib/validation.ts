import { indianStates } from "@/data/india";
import { customOptions } from "@/data/custom";
import type { CartItem } from "@/lib/types";

// Shared by the forms (instant feedback) and the API routes (the real check).

export type FieldErrors = Record<string, string>;

export type Address = {
  fullName: string;
  phone: string;
  email: string;
  line1: string;
  line2: string;
  landmark: string;
  city: string;
  state: string;
  pincode: string;
};

export const paymentMethods = [
  {
    id: "upi",
    label: "UPI (GPay, PhonePe, Paytm)",
    hint: "We confirm your order on WhatsApp and send a UPI payment link.",
  },
  {
    id: "cod",
    label: "Cash on delivery",
    hint: "Pay when your candles arrive. Available on most pincodes.",
  },
] as const;

export type PaymentMethod = (typeof paymentMethods)[number]["id"];

export type CheckoutData = {
  address: Address;
  paymentMethod: PaymentMethod;
  giftMessage: string;
  notes: string;
  items: CartItem[];
};

export type CustomOrderData = {
  occasion: string;
  vessel: string;
  scent: string;
  waxColor: string;
  quantity: number;
  labelText: string;
  neededBy: string;
  details: string;
  address: Address;
};

export type EnquiryData = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

type Result<T> = { ok: true; data: T } | { ok: false; errors: FieldErrors };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PINCODE = /^[1-9]\d{5}$/;

function text(value: unknown, max = 200) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export function normalizePhone(value: string) {
  const digits = value.replace(/\D/g, "");
  if (digits.length === 12 && digits.startsWith("91")) return digits.slice(2);
  if (digits.length === 11 && digits.startsWith("0")) return digits.slice(1);
  return digits;
}

function checkPhone(phone: string, errors: FieldErrors, key: string) {
  if (!phone) errors[key] = "Enter a mobile number";
  else if (!/^[6-9]\d{9}$/.test(phone))
    errors[key] = "Enter a valid 10-digit Indian mobile number";
}

function checkEmail(email: string, errors: FieldErrors, key: string) {
  if (!email) errors[key] = "Enter your email";
  else if (!EMAIL.test(email)) errors[key] = "Enter a valid email address";
}

function readAddress(raw: Record<string, unknown>, errors: FieldErrors): Address {
  const address: Address = {
    fullName: text(raw.fullName, 80),
    phone: normalizePhone(text(raw.phone, 20)),
    email: text(raw.email, 120).toLowerCase(),
    line1: text(raw.line1, 150),
    line2: text(raw.line2, 150),
    landmark: text(raw.landmark, 100),
    city: text(raw.city, 60),
    state: text(raw.state, 60),
    pincode: text(raw.pincode, 6),
  };

  // Checked in the order the fields appear, so the first error gets focus.
  checkEmail(address.email, errors, "email");
  checkPhone(address.phone, errors, "phone");
  if (address.fullName.length < 2) errors.fullName = "Enter your full name";
  if (address.line1.length < 5)
    errors.line1 = "Enter your house / flat number and street";
  if (!PINCODE.test(address.pincode))
    errors.pincode = "Enter a valid 6-digit pincode";
  if (address.city.length < 2) errors.city = "Enter your city";
  if (!(indianStates as readonly string[]).includes(address.state))
    errors.state = "Choose your state";

  return address;
}

function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object"
    ? (value as Record<string, unknown>)
    : {};
}

export function validateCheckout(input: unknown): Result<CheckoutData> {
  const raw = asRecord(input);
  const errors: FieldErrors = {};
  const address = readAddress(asRecord(raw.address), errors);

  const paymentMethod = text(raw.paymentMethod) as PaymentMethod;
  if (!paymentMethods.some((m) => m.id === paymentMethod))
    errors.paymentMethod = "Choose a payment method";

  const items: CartItem[] = Array.isArray(raw.items)
    ? raw.items
        .map(asRecord)
        .map((i) => ({
          productId: text(i.productId, 40),
          sizeId: text(i.sizeId, 40),
          quantity: Math.min(50, Math.max(0, Math.floor(Number(i.quantity) || 0))),
        }))
        .filter((i) => i.productId && i.sizeId && i.quantity > 0)
    : [];
  if (items.length === 0) errors.items = "Your bag is empty";

  if (Object.keys(errors).length) return { ok: false, errors };
  return {
    ok: true,
    data: {
      address,
      paymentMethod,
      giftMessage: text(raw.giftMessage, 300),
      notes: text(raw.notes, 500),
      items,
    },
  };
}

export function validateCustomOrder(input: unknown): Result<CustomOrderData> {
  const raw = asRecord(input);
  const errors: FieldErrors = {};

  const pick = (key: keyof typeof customOptions, message: string) => {
    const value = text(raw[key], 60);
    const options = customOptions[key] as readonly { id: string }[];
    if (!options.some((o) => o.id === value)) errors[key] = message;
    return value;
  };

  const occasion = pick("occasion", "Choose an occasion");
  const vessel = pick("vessel", "Choose a vessel");
  const scent = pick("scent", "Choose a scent");
  const waxColor = pick("waxColor", "Choose a wax colour");

  const quantity = Math.floor(Number(raw.quantity) || 0);
  if (quantity < 1 || quantity > 500)
    errors.quantity = "Quantity must be between 1 and 500";

  const neededBy = text(raw.neededBy, 10);
  if (neededBy && Number.isNaN(Date.parse(neededBy)))
    errors.neededBy = "Enter a valid date";

  // The address section comes last on the form, so it is checked last.
  const address = readAddress(asRecord(raw.address), errors);

  if (Object.keys(errors).length) return { ok: false, errors };
  return {
    ok: true,
    data: {
      occasion,
      vessel,
      scent,
      waxColor,
      quantity,
      labelText: text(raw.labelText, 40),
      neededBy,
      details: text(raw.details, 1000),
      address,
    },
  };
}

export function validateEnquiry(input: unknown): Result<EnquiryData> {
  const raw = asRecord(input);
  const errors: FieldErrors = {};
  const data: EnquiryData = {
    name: text(raw.name, 80),
    email: text(raw.email, 120).toLowerCase(),
    phone: normalizePhone(text(raw.phone, 20)),
    message: text(raw.message, 1500),
  };
  if (data.name.length < 2) errors.name = "Enter your name";
  checkEmail(data.email, errors, "email");
  if (data.phone) checkPhone(data.phone, errors, "phone");
  if (data.message.length < 10)
    errors.message = "Tell us a little more (at least 10 characters)";

  if (Object.keys(errors).length) return { ok: false, errors };
  return { ok: true, data };
}
