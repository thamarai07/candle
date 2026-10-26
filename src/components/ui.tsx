import type {
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";

const buttonBase =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium tracking-wide transition duration-200 disabled:cursor-not-allowed disabled:opacity-60";

const buttonVariants = {
  primary: "bg-ember text-cream shadow-soft hover:bg-ember-dark hover:shadow-lift",
  dark: "bg-cocoa text-cream hover:bg-mocha",
  outline: "border border-cocoa/25 text-cocoa hover:border-cocoa hover:bg-cocoa hover:text-cream",
  ghost: "text-cocoa hover:bg-linen",
};

export function buttonClass(
  variant: keyof typeof buttonVariants = "primary",
  extra = "",
) {
  return `${buttonBase} ${buttonVariants[variant]} ${extra}`;
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="text-xs font-medium uppercase tracking-[0.25em] text-ember">
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
}) {
  return (
    <div
      className={`max-w-2xl space-y-3 ${align === "center" ? "mx-auto text-center" : ""}`}
    >
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="font-display text-4xl leading-tight font-medium text-cocoa sm:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="text-base leading-relaxed text-mocha">{description}</p>
      )}
    </div>
  );
}

const fieldBase =
  "w-full rounded-xl border bg-white/70 px-4 py-3 text-sm text-cocoa placeholder:text-mocha/50 transition focus:bg-white focus:outline-none focus:ring-2 focus:ring-ember/30";

function fieldClass(error?: string) {
  return `${fieldBase} ${error ? "border-red-400 focus:border-red-400" : "border-sand focus:border-ember"}`;
}

type FieldShellProps = {
  label: string;
  name: string;
  error?: string;
  hint?: string;
  optional?: boolean;
  className?: string;
  children: ReactNode;
};

function FieldShell({
  label,
  name,
  error,
  hint,
  optional,
  className = "",
  children,
}: FieldShellProps) {
  return (
    <div className={`space-y-1.5 ${className}`}>
      <label htmlFor={name} className="flex items-baseline justify-between text-sm font-medium text-cocoa">
        {label}
        {optional && <span className="text-xs font-normal text-mocha/70">Optional</span>}
      </label>
      {children}
      {error ? (
        <p id={`${name}-error`} className="text-xs text-red-600">
          {error}
        </p>
      ) : hint ? (
        <p className="text-xs text-mocha/80">{hint}</p>
      ) : null}
    </div>
  );
}

type Common = {
  label: string;
  name: string;
  error?: string;
  hint?: string;
  optional?: boolean;
  className?: string;
};

export function TextField({
  label,
  name,
  error,
  hint,
  optional,
  className,
  ...props
}: Common & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <FieldShell {...{ label, name, error, hint, optional, className }}>
      <input
        id={name}
        name={name}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${name}-error` : undefined}
        className={fieldClass(error)}
        {...props}
      />
    </FieldShell>
  );
}

export function SelectField({
  label,
  name,
  error,
  hint,
  optional,
  className,
  children,
  ...props
}: Common & SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <FieldShell {...{ label, name, error, hint, optional, className }}>
      <div className="relative">
        <select
          id={name}
          name={name}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${name}-error` : undefined}
          className={`${fieldClass(error)} appearance-none pr-10`}
          {...props}
        >
          {children}
        </select>
        <svg
          viewBox="0 0 24 24"
          width="16"
          height="16"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-mocha"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </div>
    </FieldShell>
  );
}

export function TextAreaField({
  label,
  name,
  error,
  hint,
  optional,
  className,
  ...props
}: Common & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <FieldShell {...{ label, name, error, hint, optional, className }}>
      <textarea
        id={name}
        name={name}
        rows={4}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${name}-error` : undefined}
        className={fieldClass(error)}
        {...props}
      />
    </FieldShell>
  );
}

export function Stars({ rating }: { rating: number }) {
  return (
    <span className="inline-flex items-center gap-0.5 text-gold" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <svg key={n} viewBox="0 0 24 24" width="14" height="14" fill="currentColor" opacity={n <= Math.round(rating) ? 1 : 0.25} aria-hidden="true">
          <path d="m12 3.5 2.6 5.4 5.9.8-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8-4.3-4.1 5.9-.8L12 3.5Z" />
        </svg>
      ))}
    </span>
  );
}
