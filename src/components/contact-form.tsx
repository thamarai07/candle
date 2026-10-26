"use client";

import { useState, type FormEvent } from "react";
import { CheckIcon } from "@/components/icons";
import { TextAreaField, TextField, buttonClass } from "@/components/ui";
import { focusFirstError, postJson } from "@/lib/submit";
import { validateEnquiry, type EnquiryData, type FieldErrors } from "@/lib/validation";

const empty: EnquiryData = { name: "", email: "", phone: "", message: "" };

export function ContactForm() {
  const [values, setValues] = useState<EnquiryData>(empty);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [formMessage, setFormMessage] = useState("");

  const bind = (field: keyof EnquiryData) => ({
    name: field,
    value: values[field],
    error: errors[field],
    onChange: (e: { target: { value: string } }) => {
      setValues((v) => ({ ...v, [field]: e.target.value }));
      if (errors[field]) {
        setErrors((prev) => {
          const next = { ...prev };
          delete next[field];
          return next;
        });
      }
    },
  });

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const check = validateEnquiry(values);
    if (!check.ok) {
      setErrors(check.errors);
      focusFirstError(check.errors);
      return;
    }
    setStatus("sending");
    const result = await postJson("/api/enquiries", values);
    if (!result.ok) {
      setStatus("idle");
      setErrors(result.errors);
      setFormMessage(result.message);
      return;
    }
    setStatus("sent");
  }

  if (status === "sent") {
    return (
      <div className="flex flex-col items-center justify-center rounded-[2rem] bg-linen/70 p-10 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-sage text-cream">
          <CheckIcon width={26} height={26} />
        </span>
        <h2 className="mt-6 font-display text-3xl">Message sent</h2>
        <p className="mt-2 text-mocha">Thanks, {values.name.split(" ")[0]}! We&apos;ll get back to you within a day.</p>
        <button
          type="button"
          className={buttonClass("outline", "mt-6")}
          onClick={() => {
            setValues(empty);
            setStatus("idle");
          }}
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5 rounded-[2rem] border border-sand bg-white/50 p-6 shadow-soft sm:p-10">
      <h2 className="font-display text-3xl text-cocoa">Send us a message</h2>
      <TextField label="Your name" autoComplete="name" {...bind("name")} />
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField label="Email" type="email" autoComplete="email" {...bind("email")} />
        <TextField label="Phone" type="tel" autoComplete="tel-national" optional {...bind("phone")} />
      </div>
      <TextAreaField label="Message" rows={5} placeholder="Tell us what you're looking for…" {...bind("message")} />
      {formMessage && <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{formMessage}</p>}
      <button type="submit" disabled={status === "sending"} className={buttonClass("primary", "w-full py-4")}>
        {status === "sending" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
