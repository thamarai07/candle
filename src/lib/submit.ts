import type { FieldErrors } from "@/lib/validation";

export type SubmitResult<T> =
  | { ok: true; data: T }
  | { ok: false; errors: FieldErrors; message: string };

// POSTs JSON to one of our API routes and normalises the response.
export async function postJson<T>(url: string, body: unknown): Promise<SubmitResult<T>> {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const json = await res.json().catch(() => ({}));
    if (res.ok) return { ok: true, data: json as T };
    return {
      ok: false,
      errors: json.errors ?? {},
      message: json.message ?? "Please check the highlighted fields.",
    };
  } catch {
    return {
      ok: false,
      errors: {},
      message: "We couldn't reach the server. Check your connection and try again.",
    };
  }
}

/** Scrolls the first invalid field into view and focuses it. */
export function focusFirstError(errors: FieldErrors) {
  const first = Object.keys(errors)[0];
  if (!first) return;
  requestAnimationFrame(() => {
    const el = document.getElementsByName(first)[0] as HTMLElement | undefined;
    el?.scrollIntoView({ behavior: "smooth", block: "center" });
    el?.focus({ preventScroll: true });
  });
}
