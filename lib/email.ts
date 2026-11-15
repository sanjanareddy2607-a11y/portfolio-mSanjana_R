import "server-only";

import { db } from "@/lib/supabase-server";

const RESEND_ENDPOINT = "https://api.resend.com/emails";

const apiKey = (process.env.RESEND_API_KEY ?? "").trim();
export const notificationRecipient = (process.env.NOTIFICATION_EMAIL ?? "").trim();
const sender = (process.env.NOTIFICATION_FROM_EMAIL ?? "").trim() || "onboarding@resend.dev";

export const isEmailConfigured = Boolean(apiKey && notificationRecipient);

export type NotificationKind =
  | "visitor_registered"
  | "visitor_signed_in"
  | "contact_submission";

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

type SendArgs = {
  kind: NotificationKind;
  subject: string;
  /** Plain-text body lines; rendered into a minimal HTML email. */
  lines: { label: string; value: string }[];
  entityId?: string | null;
};

async function recordDelivery(args: {
  kind: NotificationKind;
  entityId?: string | null;
  status: "sent" | "failed" | "skipped";
  providerId?: string | null;
  error?: string | null;
}) {
  if (!db) return;
  try {
    await db.from("email_deliveries").insert({
      kind: args.kind,
      entity_id: args.entityId ?? null,
      recipient: notificationRecipient || null,
      status: args.status,
      provider_id: args.providerId ?? null,
      error: args.error ? args.error.slice(0, 500) : null,
    });
  } catch (error) {
    console.error("email_deliveries insert failed", error);
  }
}

export async function sendNotification({
  kind,
  subject,
  lines,
  entityId,
}: SendArgs): Promise<{ ok: boolean; providerId?: string; error?: string }> {
  if (!isEmailConfigured) {
    const error = "Resend is not configured (RESEND_API_KEY / NOTIFICATION_EMAIL missing)";
    console.warn(`${subject} — ${error}`);
    await recordDelivery({ kind, entityId, status: "skipped", error });
    return { ok: false, error };
  }

  const rows = lines
    .map(
      (line) =>
        `<tr><td style="padding:4px 12px 4px 0;color:#5b7370;font:12px/1.5 monospace;vertical-align:top">${escapeHtml(
          line.label
        )}</td><td style="padding:4px 0;color:#0d2b2b;font:13px/1.5 -apple-system,Segoe UI,sans-serif">${escapeHtml(
          line.value
        )}</td></tr>`
    )
    .join("");

  const html = `<div style="background:#f4f8f7;padding:24px"><div style="max-width:560px;margin:0 auto;background:#ffffff;border:1px solid #d8e4e2;border-radius:4px;padding:24px"><p style="margin:0 0 4px;font:11px/1.4 monospace;letter-spacing:.14em;text-transform:uppercase;color:#0f8f80">Portfolio signal</p><h1 style="margin:0 0 18px;font:22px/1.25 Georgia,serif;color:#07201f">${escapeHtml(
    subject
  )}</h1><table style="border-collapse:collapse">${rows}</table><p style="margin:20px 0 0;font:11px/1.5 monospace;color:#7d9391">Sent automatically by sanjanareddy2607 portfolio</p></div></div>`;

  try {
    const response = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: sender,
        to: [notificationRecipient],
        subject,
        html,
      }),
    });

    const payload = (await response.json().catch(() => null)) as
      | { id?: string; message?: string; name?: string }
      | null;

    if (!response.ok) {
      const error = payload?.message ?? payload?.name ?? `Resend responded ${response.status}`;
      console.error("Resend send failed", response.status, error);
      await recordDelivery({ kind, entityId, status: "failed", error });
      return { ok: false, error };
    }

    await recordDelivery({ kind, entityId, status: "sent", providerId: payload?.id ?? null });
    return { ok: true, providerId: payload?.id };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown email transport error";
    console.error("Resend request error", message);
    await recordDelivery({ kind, entityId, status: "failed", error: message });
    return { ok: false, error: message };
  }
}
