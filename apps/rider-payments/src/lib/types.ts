// Shared types for the Rider Payments app.

export type RunStatus = 'processing' | 'complete' | 'error';

export interface PaymentRun {
  id: string;
  period_start: string; // ISO date
  period_end: string; // ISO date
  period_label: string;
  created_by: string;
  created_by_email: string;
  created_at: string;
  status: RunStatus;
  rider_count: number | null;
  order_count: number | null;
  total_amount: number | null;
  file_path: string | null;
  error_message: string | null;
}

export interface PaymentRunRider {
  id: string;
  run_id: string;
  rider_name: string;
  rider_username: string | null;
  order_count: number;
  total_earnings: number;
  deposit: number;
  welfare: number;
  grand_total: number;
}

// Parsed CSV row shapes.

export interface AuditingRow {
  id?: string | number;
  kitchen_code?: string;
  rider_username?: string;
  rider_name?: string;
  kitchen_name?: string;
  status?: string;
  order_id?: string;
  order_accepted_time?: string;
  order_source?: string;
  payment_status?: string;
  customer_name?: string;
  customer_number?: string;
  customer_address?: string;
  estimated_delivery_time?: string | number;
  estimated_delivery_distance?: string | number;
  order_amount?: string | number;
  vehicle_type?: string;
  brand_name?: string;
  is_bulk?: string | boolean;
  is_earnings_processed?: string | boolean;
  assigned_at?: string;
  rejected_at?: string;
  delivery_fees?: string | number;
  // Catch-all for extra columns from Looker exports.
  [key: string]: unknown;
}

export interface PlatformOrderRow {
  OrderDate?: string;
  Hour?: string | number;
  OrderID?: string;
  Alternate_Id?: string;
  Restaurant?: string;
  Location?: string;
  Platform?: string;
  TotalSales?: string | number;
  [key: string]: unknown;
}

// Glovo rows vary widely. Column B holds the Order ID (the VLOOKUP target).
export type GlovoRawRow = Record<string, unknown>;

// API payloads.

export interface PreviewPayload {
  ok: true;
  periodLabel: string;
  auditing: {
    rowCount: number;
    uniqueRiders: number;
    uniqueKitchens: number;
    nonGlovoOrders: number;
    glovoOrders: number;
    parseErrors: string[];
  };
  platform: {
    rowCount: number;
    parseErrors: string[];
  };
  glovo: {
    rowCount: number;
    parseErrors: string[];
  };
  match: {
    matchedInPlatform: number;
    matchedInGlovo: number;
    notMatched: number;
    specialCases: number; // Pick-up, Staff drop-off, Replacements, Central Stores Dispatch
  };
  summary: {
    riderCount: number;
    orderCount: number;
    totalAmount: number;
  };
}

export interface GenerateResult {
  ok: true;
  run: PaymentRun;
}

export interface ApiErrorBody {
  error: string;
}

// Riders' Deposit and Welfare defaults (KES).
export const DEFAULT_DEPOSIT = 50;
export const DEFAULT_WELFARE = 50;
