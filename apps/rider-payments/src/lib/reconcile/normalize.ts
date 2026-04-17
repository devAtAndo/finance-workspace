// Shared normalisation helpers used across adapters.
//
// The most important decision is the canonical `order_id` used for matching.
// We standardise on the uppercase last 5 characters of the order's UUID,
// because:
//   - Looker dispatch data exposes that 5-char id as `order_id` (e.g. "A6DF5").
//   - Uber exports both a UUID (`Alternate_Id`) and that same 5-char
//     `OrderID` — both point at the same order.
//   - Riders and customers quote the 5-char id in MPESA / support tickets.
//
// Glovo uses a completely different numeric id (e.g. 101475401774). Glovo
// orders are matched by their own id; we keep Glovo in its own namespace.

import type { PaymentType } from './types';

export function normalizeOrderId(raw: unknown): string {
  if (raw === null || raw === undefined) return '';
  let s = String(raw).trim();
  // Some exports present IDs in scientific notation (e.g. "1.01475401774E11")
  // because they opened the CSV in Excel before saving. Re-coerce.
  if (/^[0-9]+(\.[0-9]+)?[eE][+-]?[0-9]+$/.test(s)) {
    const n = Number(s);
    if (Number.isFinite(n)) s = Math.round(n).toString();
  }
  return s.toUpperCase();
}

/**
 * For Looker / Uber short IDs, derive the canonical 5-char suffix from a UUID
 * if that's what we got. If the input is already 5 chars, pass it through.
 */
export function shortOrderId(raw: unknown): string {
  const s = normalizeOrderId(raw);
  if (!s) return '';
  // UUID shape -> last 5 chars (strip dashes).
  if (s.length >= 32 && /[0-9A-F-]{30,}/.test(s)) {
    return s.replace(/-/g, '').slice(-5).toUpperCase();
  }
  return s;
}

export function normalizeMpesaCode(raw: unknown): string | null {
  if (raw === null || raw === undefined) return null;
  const s = String(raw).trim().toUpperCase();
  // M-PESA confirmation codes are 10 chars alphanumeric (e.g. "SFB5C2A8QN").
  if (s.length < 6) return null;
  return s;
}

export function parsePaymentType(raw: unknown): PaymentType {
  if (raw === null || raw === undefined) return 'unknown';
  const s = String(raw).trim().toLowerCase();
  if (s === 'paid' || s === 'online' || s === 'prepaid' || s === 'card') {
    return 'paid';
  }
  if (s === 'unpaid' || s === 'cash' || s === 'cod' || s === 'cash on delivery') {
    return 'cash';
  }
  return 'unknown';
}

export function parseAmount(raw: unknown): number | null {
  if (raw === null || raw === undefined || raw === '') return null;
  const n = typeof raw === 'number' ? raw : Number(String(raw).replace(/,/g, ''));
  return Number.isFinite(n) ? n : null;
}

/**
 * Parse Looker's quirky "Nov 6, 2025, 9:45:14 PM" timestamps without relying
 * on the browser locale. Falls back to Date.parse for ISO inputs.
 */
export function parseLookerTimestamp(raw: unknown): string | null {
  if (!raw) return null;
  const s = String(raw).trim();
  const direct = Date.parse(s);
  if (!Number.isNaN(direct)) return new Date(direct).toISOString();
  // "Nov 6, 2025, 9:45:14 PM" — strip the extra comma and retry.
  const cleaned = s.replace(/,([^ ])/g, ', $1');
  const retry = Date.parse(cleaned);
  return Number.isNaN(retry) ? null : new Date(retry).toISOString();
}

/** Two amounts are considered equal within 1 KES to absorb rounding. */
export function amountsMatch(
  expected: number | null,
  actual: number | null,
  tolerance = 1,
): boolean {
  if (expected === null || actual === null) return false;
  return Math.abs(expected - actual) <= tolerance;
}
