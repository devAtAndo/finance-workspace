// Types shared across the reconciliation workflow.
//
// Mirrors the Postgres tables in supabase/migrations/002_reconciliation.sql.
// We keep DB row shapes (snake_case) and normalized in-memory shapes
// (snake_case as well, for symmetry with the existing types.ts style).

export type ReconciliationStatus = 'draft' | 'ingested' | 'matched' | 'exported' | 'error';

export type DispatchPlatform = 'ando' | 'uber' | 'glovo' | 'limetray' | 'other';

export type PaymentType = 'cash' | 'paid' | 'unknown';

export type PaymentSource =
  | 'kopokopo'
  | 'paystack'
  | 'pesapal'
  | 'ando_rider_settlement'
  | 'ando_customer_settlement'
  | 'limetray'
  | 'other';

export type MatchStatus =
  | 'matched'
  | 'amount_mismatch'
  | 'missing_payment'
  | 'no_dispatch'
  | 'cancelled'
  | 'mislabeled_cash'
  | 'mislabeled_paid'
  | 'pesapal_pending'
  | 'orphan_payment';

// Human-readable labels for the UI filter chips.
export const MATCH_STATUS_LABELS: Record<MatchStatus, string> = {
  matched: 'Matched',
  amount_mismatch: 'Amount mismatch',
  missing_payment: 'Missing payment',
  no_dispatch: 'Payment without dispatch',
  cancelled: 'Cancelled',
  mislabeled_cash: 'Labelled paid, was cash',
  mislabeled_paid: 'Labelled cash, was paid',
  pesapal_pending: 'Pesapal — check backend',
  orphan_payment: 'Orphan payment (no order id)',
};

// Statuses treated as "exceptions" (i.e. require finance follow-up).
export const EXCEPTION_STATUSES: ReadonlySet<MatchStatus> = new Set<MatchStatus>([
  'amount_mismatch',
  'missing_payment',
  'no_dispatch',
  'mislabeled_cash',
  'mislabeled_paid',
  'pesapal_pending',
  'orphan_payment',
]);

// ---------- Table row shapes ----------

export interface ReconciliationRun {
  id: string;
  period_start: string;
  period_end: string;
  period_label: string;
  created_by: string;
  created_by_email: string;
  created_at: string;
  status: ReconciliationStatus;
  dispatched_total: number | null;
  matched_count: number | null;
  exception_count: number | null;
  error_message: string | null;
  exported_sheet_url: string | null;
}

export interface DispatchedOrder {
  id: string;
  run_id: string;
  platform: DispatchPlatform;
  order_id: string;
  external_order_id: string | null;
  branch: string | null;
  dispatched_at: string | null;
  payment_type: PaymentType;
  expected_amount: number | null;
  mpesa_code_on_dispatch: string | null;
  rider_name: string | null;
  rider_username: string | null;
  raw: unknown;
}

export interface PaymentRecord {
  id: string;
  run_id: string;
  source: PaymentSource;
  order_id: string | null;
  mpesa_code: string | null;
  reference: string | null;
  amount: number | null;
  paid_at: string | null;
  status: string | null;
  phone: string | null;
  raw: unknown;
}

export interface ReconciliationRow {
  id: string;
  run_id: string;
  dispatched_order_id: string | null;
  order_id: string;
  branch: string | null;
  rider_name: string | null;
  platform: string | null;
  payment_type: PaymentType;
  expected_amount: number | null;
  matched_payment_id: string | null;
  matched_source: string | null;
  matched_amount: number | null;
  matched_mpesa_code: string | null;
  match_status: MatchStatus;
  exception_notes: string | null;
  resolved: boolean;
  resolved_by: string | null;
  resolved_at: string | null;
}

// ---------- Insert shapes (omit server-generated fields) ----------

export type DispatchedOrderInsert = Omit<DispatchedOrder, 'id'>;
export type PaymentRecordInsert = Omit<PaymentRecord, 'id'>;
export type ReconciliationRowInsert = Omit<
  ReconciliationRow,
  'id' | 'resolved' | 'resolved_by' | 'resolved_at'
> & { resolved?: boolean };
