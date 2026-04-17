-- Ando Finance Reconciliation — schema additions
-- Extends the rider_payments schema with reconciliation tables.
-- Run this after 001_init.sql.

-- =============================================================================
-- TABLES
-- =============================================================================

-- One row per reconciliation job (on-demand run for a given date range).
create table if not exists rider_payments.reconciliation_runs (
  id                uuid primary key default gen_random_uuid(),
  period_start      date not null,
  period_end        date not null,
  period_label      text not null,
  created_by        uuid not null references auth.users(id) on delete restrict,
  created_by_email  text not null,
  created_at        timestamptz not null default now(),
  -- Lifecycle: draft (created) -> ingested (sources loaded) -> matched
  --            (reconciliation_rows populated) -> exported (google sheet) -> error
  status            text not null default 'draft'
                      check (status in ('draft','ingested','matched','exported','error')),
  -- Cached counts for the list view so we don't aggregate on every page load.
  dispatched_total  integer,
  matched_count     integer,
  exception_count   integer,
  error_message     text,
  exported_sheet_url text,
  check (period_end >= period_start)
);

create index if not exists reconciliation_runs_created_at_idx
  on rider_payments.reconciliation_runs(created_at desc);

-- One row per order that appears in any dispatch source (Ando / Uber / Glovo /
-- Limetray). Multiple rows per order_id are expected (same order shows up in
-- Looker AND the platform's own CSV). The matching pipeline collapses them.
create table if not exists rider_payments.dispatched_orders (
  id                     uuid primary key default gen_random_uuid(),
  run_id                 uuid not null references rider_payments.reconciliation_runs(id) on delete cascade,
  platform               text not null
                           check (platform in ('ando','uber','glovo','limetray','other')),
  order_id               text not null,     -- normalized short id (matches what the rider types)
  external_order_id      text,              -- raw platform id (Glovo long numeric, Uber UUID, etc.)
  branch                 text,
  dispatched_at          timestamptz,
  payment_type           text not null default 'unknown'
                           check (payment_type in ('cash','paid','unknown')),
  expected_amount        numeric(12,2),
  mpesa_code_on_dispatch text,               -- from Limetray POS input
  rider_name             text,
  rider_username         text,
  raw                    jsonb
);

create index if not exists dispatched_orders_run_idx
  on rider_payments.dispatched_orders(run_id);
create index if not exists dispatched_orders_run_order_idx
  on rider_payments.dispatched_orders(run_id, order_id);
create index if not exists dispatched_orders_run_platform_idx
  on rider_payments.dispatched_orders(run_id, platform);

-- One row per payment record from any source (KopoKopo, Paystack, Pesapal,
-- Ando rider/customer settlements, Limetray).
create table if not exists rider_payments.payment_records (
  id          uuid primary key default gen_random_uuid(),
  run_id      uuid not null references rider_payments.reconciliation_runs(id) on delete cascade,
  source      text not null
                check (source in ('kopokopo','paystack','pesapal',
                                   'ando_rider_settlement','ando_customer_settlement',
                                   'limetray','other')),
  order_id    text,           -- nullable; some payments arrive without an order link
  mpesa_code  text,           -- MPESA confirmation code (nullable)
  reference   text,           -- KopoKopo reference, Paystack ref, etc.
  amount      numeric(12,2),
  paid_at     timestamptz,
  status      text,
  phone       text,
  raw         jsonb
);

create index if not exists payment_records_run_idx
  on rider_payments.payment_records(run_id);
create index if not exists payment_records_run_order_idx
  on rider_payments.payment_records(run_id, order_id);
create index if not exists payment_records_run_mpesa_idx
  on rider_payments.payment_records(run_id, mpesa_code);

-- The reconciled output — one row per *dispatched* order in the canonical
-- dispatch source (Ando/Looker). Match status drives the exception review UI.
create table if not exists rider_payments.reconciliation_rows (
  id                    uuid primary key default gen_random_uuid(),
  run_id                uuid not null references rider_payments.reconciliation_runs(id) on delete cascade,
  dispatched_order_id   uuid references rider_payments.dispatched_orders(id) on delete set null,
  order_id              text not null,
  branch                text,
  rider_name            text,
  platform              text,           -- which platform surfaced this order
  payment_type          text not null
                          check (payment_type in ('cash','paid','unknown')),
  expected_amount       numeric(12,2),
  matched_payment_id    uuid references rider_payments.payment_records(id) on delete set null,
  matched_source        text,
  matched_amount        numeric(12,2),
  matched_mpesa_code    text,
  match_status          text not null
                          check (match_status in (
                            'matched',
                            'amount_mismatch',
                            'missing_payment',
                            'no_dispatch',
                            'cancelled',
                            'mislabeled_cash',
                            'mislabeled_paid',
                            'pesapal_pending',
                            'orphan_payment'
                          )),
  exception_notes       text,
  resolved              boolean not null default false,
  resolved_by           text,
  resolved_at           timestamptz
);

create index if not exists reconciliation_rows_run_idx
  on rider_payments.reconciliation_rows(run_id);
create index if not exists reconciliation_rows_run_status_idx
  on rider_payments.reconciliation_rows(run_id, match_status);
create index if not exists reconciliation_rows_run_resolved_idx
  on rider_payments.reconciliation_rows(run_id, resolved);

-- =============================================================================
-- RLS — same model as 001: any authenticated @andofoods.co user.
-- =============================================================================

alter table rider_payments.reconciliation_runs   enable row level security;
alter table rider_payments.dispatched_orders     enable row level security;
alter table rider_payments.payment_records       enable row level security;
alter table rider_payments.reconciliation_rows   enable row level security;

-- reconciliation_runs
drop policy if exists "auth read reconciliation_runs"
  on rider_payments.reconciliation_runs;
create policy "auth read reconciliation_runs"
  on rider_payments.reconciliation_runs for select to authenticated using (true);

drop policy if exists "auth insert reconciliation_runs"
  on rider_payments.reconciliation_runs;
create policy "auth insert reconciliation_runs"
  on rider_payments.reconciliation_runs for insert to authenticated
  with check (auth.uid() = created_by);

drop policy if exists "auth update reconciliation_runs"
  on rider_payments.reconciliation_runs;
create policy "auth update reconciliation_runs"
  on rider_payments.reconciliation_runs for update to authenticated using (true);

-- dispatched_orders / payment_records / reconciliation_rows — server-side
-- inserts happen with the service-role key (bypasses RLS), so we only need
-- read/update policies for authenticated callers.
drop policy if exists "auth read dispatched_orders" on rider_payments.dispatched_orders;
create policy "auth read dispatched_orders"
  on rider_payments.dispatched_orders for select to authenticated using (true);

drop policy if exists "auth read payment_records" on rider_payments.payment_records;
create policy "auth read payment_records"
  on rider_payments.payment_records for select to authenticated using (true);

drop policy if exists "auth read reconciliation_rows" on rider_payments.reconciliation_rows;
create policy "auth read reconciliation_rows"
  on rider_payments.reconciliation_rows for select to authenticated using (true);

drop policy if exists "auth update reconciliation_rows" on rider_payments.reconciliation_rows;
create policy "auth update reconciliation_rows"
  on rider_payments.reconciliation_rows for update to authenticated using (true);
