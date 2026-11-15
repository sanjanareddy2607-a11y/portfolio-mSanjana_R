-- Portfolio persistent schema (stage 2: auth, visitors, contact, email log).
-- Apply with: supabase db push   OR   paste into the Supabase SQL editor.
-- All tables are written only by server-side code holding the service role key.
-- RLS is enabled with no permissive policies, so the anon and authenticated
-- roles cannot read or write these tables directly.

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- Webhook idempotency: one row per processed Clerk event.
-- ---------------------------------------------------------------------------
create table if not exists public.webhook_events (
  id text primary key,
  type text not null,
  received_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Visitors: one row per Clerk user, created from user.created / session.created.
-- ---------------------------------------------------------------------------
create table if not exists public.visitors (
  id uuid primary key default gen_random_uuid(),
  clerk_user_id text not null unique,
  email text,
  full_name text,
  image_url text,
  first_seen_at timestamptz not null default now(),
  last_seen_at timestamptz not null default now()
);

create index if not exists visitors_last_seen_idx on public.visitors (last_seen_at desc);

-- ---------------------------------------------------------------------------
-- Login events: one row per successful Clerk session, unique per event so a
-- retried webhook can never create a second notification.
-- ---------------------------------------------------------------------------
create table if not exists public.login_events (
  id uuid primary key default gen_random_uuid(),
  clerk_event_id text not null unique,
  visitor_id uuid references public.visitors (id) on delete cascade,
  clerk_user_id text not null,
  clerk_session_id text,
  email text,
  occurred_at timestamptz not null default now()
);

create index if not exists login_events_user_idx on public.login_events (clerk_user_id, occurred_at desc);

-- ---------------------------------------------------------------------------
-- Contact submissions: durable record of every message that reports success.
-- ---------------------------------------------------------------------------
create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  organisation text,
  opportunity_type text not null default 'General',
  subject text not null,
  message text not null,
  status text not null default 'new',
  visitor_id uuid references public.visitors (id) on delete set null,
  clerk_user_id text,
  created_at timestamptz not null default now()
);

create index if not exists contact_submissions_created_idx on public.contact_submissions (created_at desc);
create index if not exists contact_submissions_status_idx on public.contact_submissions (status);

-- ---------------------------------------------------------------------------
-- Email delivery log: every notification attempt and its provider outcome.
-- ---------------------------------------------------------------------------
create table if not exists public.email_deliveries (
  id uuid primary key default gen_random_uuid(),
  kind text not null,
  entity_id text,
  recipient text,
  status text not null,
  provider_id text,
  error text,
  created_at timestamptz not null default now()
);

create index if not exists email_deliveries_created_idx on public.email_deliveries (created_at desc);

-- ---------------------------------------------------------------------------
-- Lock down direct access. The service role bypasses RLS by design; every other
-- role is denied until an explicit policy exists.
-- ---------------------------------------------------------------------------
alter table public.webhook_events enable row level security;
alter table public.visitors enable row level security;
alter table public.login_events enable row level security;
alter table public.contact_submissions enable row level security;
alter table public.email_deliveries enable row level security;

revoke all on public.webhook_events from anon, authenticated;
revoke all on public.visitors from anon, authenticated;
revoke all on public.login_events from anon, authenticated;
revoke all on public.contact_submissions from anon, authenticated;
revoke all on public.email_deliveries from anon, authenticated;
