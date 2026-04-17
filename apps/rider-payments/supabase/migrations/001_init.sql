-- Ando Rider Payments — Initial Schema
-- Run this in the Supabase SQL editor against the same project as the influencer_tool.
-- Uses a separate schema `rider_payments` to isolate data.

-- =============================================================================
-- SCHEMA
-- =============================================================================
create schema if not exists rider_payments;
grant usage on schema rider_payments to authenticated, service_role;
-- Make the schema discoverable via PostgREST for the Supabase client.
alter default privileges in schema rider_payments grant all on tables to authenticated, service_role;
alter default privileges in schema rider_payments grant all on sequences to authenticated, service_role;

-- =============================================================================
-- TABLES
-- =============================================================================

create table if not exists rider_payments.payment_runs (
  id              uuid primary key default gen_random_uuid(),
  period_start    date not null,
  period_end      date not null,
  period_label    text not null,
  created_by      uuid not null references auth.users(id) on delete restrict,
  created_by_email text not null,
  created_at      timestamptz not null default now(),
  status          text not null default 'processing'
                    check (status in ('processing', 'complete', 'error')),
  rider_count     integer,
  order_count     integer,
  total_amount    numeric(12, 2),
  file_path       text,
  error_message   text,
  check (period_end >= period_start)
);

create index if not exists payment_runs_created_at_idx
  on rider_payments.payment_runs(created_at desc);

create table if not exists rider_payments.payment_run_riders (
  id              uuid primary key default gen_random_uuid(),
  run_id          uuid not null references rider_payments.payment_runs(id) on delete cascade,
  rider_name      text not null,
  rider_username  text,
  order_count     integer not null default 0,
  total_earnings  numeric(10, 2) not null default 0,
  deposit         numeric(10, 2) not null default 50,
  welfare         numeric(10, 2) not null default 50,
  grand_total     numeric(10, 2) not null default 0
);

create index if not exists payment_run_riders_run_id_idx
  on rider_payments.payment_run_riders(run_id);

-- =============================================================================
-- RLS
-- =============================================================================
-- Simple policy: any authenticated user can read/write. The app is restricted
-- to @andofoods.co email domain at login. Only 2-3 finance team members use it.
-- =============================================================================

alter table rider_payments.payment_runs enable row level security;
alter table rider_payments.payment_run_riders enable row level security;

drop policy if exists "authenticated can read payment_runs"
  on rider_payments.payment_runs;
create policy "authenticated can read payment_runs"
  on rider_payments.payment_runs for select
  to authenticated
  using (true);

drop policy if exists "authenticated can insert payment_runs"
  on rider_payments.payment_runs;
create policy "authenticated can insert payment_runs"
  on rider_payments.payment_runs for insert
  to authenticated
  with check (auth.uid() = created_by);

drop policy if exists "authenticated can update own payment_runs"
  on rider_payments.payment_runs;
create policy "authenticated can update own payment_runs"
  on rider_payments.payment_runs for update
  to authenticated
  using (true);

drop policy if exists "authenticated can read payment_run_riders"
  on rider_payments.payment_run_riders;
create policy "authenticated can read payment_run_riders"
  on rider_payments.payment_run_riders for select
  to authenticated
  using (true);

drop policy if exists "authenticated can insert payment_run_riders"
  on rider_payments.payment_run_riders;
create policy "authenticated can insert payment_run_riders"
  on rider_payments.payment_run_riders for insert
  to authenticated
  with check (true);

-- =============================================================================
-- STORAGE BUCKET
-- =============================================================================
-- Create a private bucket named 'payment-workbooks' in the Supabase Storage UI.
-- Then add these policies to restrict access to authenticated users.
-- =============================================================================

-- Policies for storage.objects on the 'payment-workbooks' bucket:
-- (Run these once the bucket exists.)
--
-- drop policy if exists "authenticated can read payment-workbooks" on storage.objects;
-- create policy "authenticated can read payment-workbooks"
--   on storage.objects for select
--   to authenticated
--   using (bucket_id = 'payment-workbooks');
--
-- drop policy if exists "authenticated can upload payment-workbooks" on storage.objects;
-- create policy "authenticated can upload payment-workbooks"
--   on storage.objects for insert
--   to authenticated
--   with check (bucket_id = 'payment-workbooks');
