import "server-only";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = (process.env.NEXT_PUBLIC_SUPABASE_URL ?? "").trim();
// The dashboard now calls this the "secret key" (sb_secret_…); older projects
// expose the same privileged credential as the service_role JWT. Either name is
// accepted, but only server code may read it.
const serviceRoleKey = (
  process.env.SUPABASE_SERVICE_ROLE_KEY ??
  process.env.SUPABASE_SECRET_KEY ??
  ""
).trim();

export const isDatabaseConfigured = Boolean(
  supabaseUrl.startsWith("https://") && serviceRoleKey.length > 0
);

/**
 * Server-only client. The service role key bypasses row level security, so this
 * module must never be imported from a client component or be given a
 * NEXT_PUBLIC_ name.
 */
export const db: SupabaseClient | null = isDatabaseConfigured
  ? createClient(supabaseUrl, serviceRoleKey, {
      auth: { persistSession: false, autoRefreshToken: false },
      global: { headers: { "X-Client-Info": "portfolio-server" } },
    })
  : null;
