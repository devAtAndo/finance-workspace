// CSV parsers for the three Looker / platform / Glovo exports.
// Server-only: uses Node's Buffer and papaparse.
import 'server-only';

import Papa from 'papaparse';
import type { AuditingRow, PlatformOrderRow, GlovoRawRow } from '@/lib/types';

export interface ParseOutcome<T> {
  rows: T[];
  headers: string[];
  errors: string[];
}

/**
 * Expected columns on the Looker Auditing export. The real Looker export
 * does NOT include validated_id or duplicate — those are added by this app.
 * Column order can vary; we index by header name.
 */
const AUDITING_REQUIRED_COLUMNS = [
  'kitchen_code',
  'rider_username',
  'rider_name',
  'kitchen_name',
  'status',
  'order_id',
  'order_accepted_time',
  'order_source',
  'payment_status',
  'order_amount',
  'delivery_fees',
] as const;

const PLATFORM_REQUIRED_COLUMNS = ['OrderDate', 'OrderID', 'Alternate_Id'] as const;

export function parseAuditingCsv(text: string): ParseOutcome<AuditingRow> {
  const errors: string[] = [];
  const result = Papa.parse<Record<string, string>>(text, {
    header: true,
    skipEmptyLines: 'greedy',
    transformHeader: (h) => h.trim(),
  });

  if (result.errors.length > 0) {
    for (const err of result.errors.slice(0, 10)) {
      errors.push(`Row ${err.row ?? '?'}: ${err.message}`);
    }
  }

  const headers = result.meta.fields?.map((h) => h.trim()) ?? [];
  const missing = AUDITING_REQUIRED_COLUMNS.filter((c) => !headers.includes(c));
  if (missing.length > 0) {
    errors.push(`Missing required columns in Auditing CSV: ${missing.join(', ')}`);
  }

  const rows: AuditingRow[] = result.data
    .filter((r) => r.order_id && r.order_id.trim() !== '')
    .map((r) => {
      const row: AuditingRow = { ...r };
      row.estimated_delivery_time = toNumber(r.estimated_delivery_time);
      row.estimated_delivery_distance = toNumber(r.estimated_delivery_distance);
      row.order_amount = toNumber(r.order_amount);
      row.delivery_fees = toNumber(r.delivery_fees);
      row.is_bulk = toBool(r.is_bulk);
      row.is_earnings_processed = toBool(r.is_earnings_processed);
      return row;
    });

  return { rows, headers, errors };
}

export function parsePlatformCsv(text: string): ParseOutcome<PlatformOrderRow> {
  const errors: string[] = [];
  const result = Papa.parse<Record<string, string>>(text, {
    header: true,
    skipEmptyLines: 'greedy',
    transformHeader: (h) => h.trim(),
  });

  if (result.errors.length > 0) {
    for (const err of result.errors.slice(0, 10)) {
      errors.push(`Row ${err.row ?? '?'}: ${err.message}`);
    }
  }

  const headers = result.meta.fields?.map((h) => h.trim()) ?? [];
  const missing = PLATFORM_REQUIRED_COLUMNS.filter((c) => !headers.includes(c));
  if (missing.length > 0) {
    errors.push(`Missing required columns in Platform CSV: ${missing.join(', ')}`);
  }

  const rows: PlatformOrderRow[] = result.data
    .filter((r) => r.OrderID || r.Alternate_Id)
    .map((r) => ({
      ...r,
      Hour: toNumber(r.Hour),
      TotalSales: toNumber(r.TotalSales),
    }));

  return { rows, headers, errors };
}

/**
 * Glovo exports have a multi-row header: row 1 is a category band (Order
 * Metadata, Operations, ...) and row 2 is the real column names. We treat
 * row 2 as the header and preserve all columns.
 *
 * Column B ("Order ID") is the VLOOKUP target used by Auditing formulas.
 */
export function parseGlovoCsv(text: string): ParseOutcome<GlovoRawRow> {
  const errors: string[] = [];

  // Detect and handle the two-row header: if the second non-empty row looks
  // like actual field names, use it. Otherwise fall back to row 1.
  const stripped = text.replace(/^\uFEFF/, '');
  const firstLine = stripped.split(/\r?\n/, 1)[0] ?? '';
  const isCategoryRow =
    firstLine.toLowerCase().includes('order metadata') ||
    firstLine.toLowerCase().includes('operations');

  const csvText = isCategoryRow ? stripped.split(/\r?\n/).slice(1).join('\n') : stripped;

  const result = Papa.parse<Record<string, string>>(csvText, {
    header: true,
    skipEmptyLines: 'greedy',
    transformHeader: (h) => h.trim(),
  });

  if (result.errors.length > 0) {
    for (const err of result.errors.slice(0, 10)) {
      errors.push(`Row ${err.row ?? '?'}: ${err.message}`);
    }
  }

  const headers = result.meta.fields?.map((h) => h.trim()) ?? [];

  // Find the "Order ID" column (Glovo's header text for column B).
  const orderIdHeader = headers.find(
    (h) => h.toLowerCase() === 'order id' || h.toLowerCase() === 'orderid',
  );
  if (!orderIdHeader) {
    errors.push(
      "Glovo CSV missing an 'Order ID' column. Check the export from Glovo Manager Portal.",
    );
  }

  // Keep only rows that have an Order ID.
  const rows: GlovoRawRow[] = orderIdHeader
    ? result.data.filter((r) => {
        const v = r[orderIdHeader];
        return v && String(v).trim() !== '';
      })
    : [];

  return { rows, headers, errors };
}

// -------- helpers --------

function toNumber(v: unknown): number | undefined {
  if (v === null || v === undefined || v === '') return undefined;
  const n = Number(v);
  return Number.isFinite(n) ? n : undefined;
}

function toBool(v: unknown): boolean | undefined {
  if (v === null || v === undefined || v === '') return undefined;
  const s = String(v).toLowerCase().trim();
  if (s === 'true') return true;
  if (s === 'false') return false;
  return undefined;
}
