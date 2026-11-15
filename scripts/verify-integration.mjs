#!/usr/bin/env node
/**
 * Read-only integration check for Supabase, Resend and Clerk.
 * Prints masked status only — never the credential values.
 *
 *   node --env-file=.env.local scripts/verify-integration.mjs
 */
import { createClient } from "@supabase/supabase-js";

const TABLES = ["visitors", "login_events", "contact_submissions", "webhook_events", "email_deliveries"];

const env = (name) => (process.env[name] ?? "").trim();

const supabaseUrl = env("NEXT_PUBLIC_SUPABASE_URL");
const serviceKey = env("SUPABASE_SERVICE_ROLE_KEY") || env("SUPABASE_SECRET_KEY");
const resendKey = env("RESEND_API_KEY");
const clerkSecret = env("CLERK_SECRET_KEY");
const clerkPublishable = env("NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY");
const clerkWebhookSecret = env("CLERK_WEBHOOK_SIGNING_SECRET");
const adminId = env("ADMIN_CLERK_USER_ID");

let failures = 0;

function report(ok, label, detail = "") {
  if (!ok) failures += 1;
  const mark = ok ? "PASS" : "FAIL";
  console.log(`${mark}  ${label}${detail ? ` — ${detail}` : ""}`);
}

function decodeJwtRole(key) {
  if (!key.startsWith("eyJ")) return null;
  try {
    const payload = JSON.parse(Buffer.from(key.split(".")[1], "base64url").toString("utf8"));
    return typeof payload.role === "string" ? payload.role : null;
  } catch {
    return null;
  }
}

function keyKind(key) {
  if (!key) return "missing";
  if (key.startsWith("sb_secret_")) return "secret key (sb_secret_)";
  if (key.startsWith("sb_publishable_")) return "publishable key (sb_publishable_)";
  const role = decodeJwtRole(key);
  if (role) return `jwt (${role})`;
  return `unknown prefix (${key.slice(0, 4)}…)`;
}

function shape(key) {
  return key ? `${keyKind(key)}, length ${key.length}` : "missing";
}

console.log("— Supabase —");
report(/^https:\/\/[a-z0-9-]+\.supabase\.co$/i.test(supabaseUrl), "project URL", supabaseUrl ? supabaseUrl.replace(/\/\/.*/, "//<project>.supabase.co") : "missing");
report(Boolean(supabaseUrl) && supabaseUrl.startsWith("https://"), "project URL is https");

const looksClientSide = serviceKey.startsWith("sb_publishable_") || decodeJwtRole(serviceKey) === "anon";
report(Boolean(serviceKey) && !looksClientSide, "server key is privileged", shape(serviceKey));
if (looksClientSide) {
  console.log("      That key cannot write these tables (RLS is enabled). Use the secret key / service_role key.");
}

if (supabaseUrl && serviceKey && !looksClientSide) {
  const db = createClient(supabaseUrl, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  for (const table of TABLES) {
    const { count, error } = await db.from(table).select("id", { count: "exact", head: true });
    report(!error, `table ${table}`, error ? `${error.code ?? ""} ${error.message}` : `${count ?? 0} rows`);
  }
}

console.log("\n— Clerk —");

function decodePublishableKey(key) {
  if (!/^pk_(test|live)_/.test(key)) return null;
  try {
    const encoded = key.slice(key.indexOf("_", 3) + 1);
    const raw = Buffer.from(encoded, "base64").toString("utf8").trim();
    // Older keys encode "<frontend-api>$"; newer ones encode JSON.
    if (raw.startsWith("{")) {
      const parsed = JSON.parse(raw);
      return { domain: String(parsed.domain ?? "").replace(/\$$/, "") };
    }
    const domain = raw.replace(/\$$/, "");
    return /^[a-z0-9.-]+$/i.test(domain) ? { domain } : null;
  } catch {
    return null;
  }
}

const pub = decodePublishableKey(clerkPublishable);
const pubEnv = clerkPublishable.startsWith("pk_live_") ? "live" : clerkPublishable.startsWith("pk_test_") ? "test" : null;
const secEnv = clerkSecret.startsWith("sk_live_") ? "live" : clerkSecret.startsWith("sk_test_") ? "test" : null;
report(
  Boolean(pub),
  "publishable key",
  pub
    ? `${pubEnv} · ${pub.domain ?? "host unknown"}`
    : clerkPublishable
      ? `malformed — prefix ${clerkPublishable.slice(0, 8)}…, length ${clerkPublishable.length}`
      : "missing"
);
report(Boolean(pubEnv && secEnv && pubEnv === secEnv), "publishable and secret keys are the same environment", pubEnv && secEnv ? `${pubEnv} / ${secEnv}` : "cannot compare");
report(Boolean(clerkWebhookSecret), "webhook signing secret", clerkWebhookSecret ? `set, length ${clerkWebhookSecret.length}` : "missing — add the endpoint before testing webhooks");
report(Boolean(clerkSecret), "secret key", shape(clerkSecret));

if (pub?.domain) {
  try {
    const response = await fetch(`https://${pub.domain}/.well-known/jwks.json`);
    const payload = await response.json().catch(() => null);
    report(
      response.ok && Array.isArray(payload?.keys),
      "frontend API reachable",
      response.ok ? `${pub.domain} (${payload?.keys?.length ?? 0} key(s))` : `${response.status} from ${pub.domain}`
    );
  } catch (error) {
    report(false, "frontend API reachable", error instanceof Error ? error.message : "network error");
  }
}

if (clerkSecret) {
  try {
    const response = await fetch("https://api.clerk.com/v1/users?limit=1", {
      headers: { Authorization: `Bearer ${clerkSecret}` },
    });
    const payload = await response.json().catch(() => null);
    report(
      response.ok,
      "API reachable",
      response.ok
        ? `${payload?.total_count ?? 0} user(s) in the instance`
        : `${response.status} ${payload?.errors?.[0]?.message ?? "unknown error"}`
    );
  } catch (error) {
    report(false, "API reachable", error instanceof Error ? error.message : "network error");
  }
}

report(Boolean(adminId), "ADMIN_CLERK_USER_ID", adminId ? `set (${adminId.slice(0, 8)}…)` : "empty — nobody is an admin yet");

console.log("\n— Resend —");
report(Boolean(resendKey), "API key", resendKey ? `set, length ${resendKey.length}` : "missing");

if (resendKey) {
  try {
    const response = await fetch("https://api.resend.com/domains", {
      headers: { Authorization: `Bearer ${resendKey}` },
    });
    const payload = await response.json().catch(() => null);
    const domains = Array.isArray(payload?.data) ? payload.data : [];
    report(
      response.ok,
      "API reachable",
      response.ok
        ? domains.length
          ? `${domains.length} verified/added domain(s)`
          : "no domains yet — the onboarding@resend.dev test sender delivers to the account owner only"
        : `${response.status} ${payload?.message ?? payload?.name ?? "unknown error"}`
    );
  } catch (error) {
    report(false, "API reachable", error instanceof Error ? error.message : "network error");
  }
}

console.log(`\n${failures === 0 ? "All checks passed." : `${failures} check(s) failed.`}`);
process.exit(failures === 0 ? 0 : 1);
