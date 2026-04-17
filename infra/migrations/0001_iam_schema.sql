-- 0001_iam_schema.sql
-- Creates the shared iam schema backing @ando/db.
-- Target: Postgres 14+ (Supabase Free compatible).
-- Rollback: see 0001_iam_schema.down.sql.

create extension if not exists citext;
create extension if not exists pgcrypto;

create schema if not exists iam;

create table iam.users (
  id          uuid primary key default gen_random_uuid(),
  email       citext not null unique,
  created_at  timestamptz not null default now(),
  disabled_at timestamptz
);

create table iam.app_access (
  user_id    uuid not null references iam.users(id) on delete cascade,
  app_slug   text not null check (app_slug in ('workspace', 'petty-cash', 'rider-payments')),
  role       text not null check (role in ('ADMIN', 'FINANCE', 'BRANCH_USER', 'VIEWER')),
  granted_by uuid references iam.users(id),
  granted_at timestamptz not null default now(),
  primary key (user_id, app_slug)
);

create index iam_app_access_app_slug_idx on iam.app_access (app_slug);

create table iam.audit_log (
  id        bigserial primary key,
  actor_id  uuid references iam.users(id),
  action    text not null,
  target    jsonb,
  at        timestamptz not null default now()
);

create index iam_audit_log_at_idx on iam.audit_log (at desc);
create index iam_audit_log_actor_at_idx on iam.audit_log (actor_id, at desc);
