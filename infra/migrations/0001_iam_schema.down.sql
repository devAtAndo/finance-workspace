-- Rollback for 0001_iam_schema.sql. Destructive — data loss.

drop index if exists iam.iam_audit_log_actor_at_idx;
drop index if exists iam.iam_audit_log_at_idx;
drop table if exists iam.audit_log;

drop index if exists iam.iam_app_access_app_slug_idx;
drop table if exists iam.app_access;

drop table if exists iam.users;
drop schema if exists iam;
