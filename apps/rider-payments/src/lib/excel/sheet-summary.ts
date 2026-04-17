import type { Workbook, Cell } from 'exceljs';
import type { AuditingRow } from '@/lib/types';
import { DEFAULT_DEPOSIT, DEFAULT_WELFARE } from '@/lib/types';
import { autoWidth, styleHeader, CURRENCY_FORMAT } from './styles';

export interface RiderSummary {
  rider_name: string;
  rider_username: string | null;
  order_count: number;
  total_earnings: number;
  deposit: number;
  welfare: number;
  grand_total: number;
  /** per-kitchen delivery fee totals */
  byKitchen: Record<string, number>;
}

export interface SummaryResult {
  riders: RiderSummary[];
  kitchens: string[];
  totals: {
    riderCount: number;
    orderCount: number;
    totalEarnings: number;
    grandTotal: number;
  };
}

/**
 * Build the payment summary sheet. ExcelJS can't create native pivot tables,
 * so we pre-compute the rider x kitchen matrix server-side and write it as a
 * table with SUM formulas for Total Earnings and Grand Total.
 *
 * Pivot logic matches the historical workbook:
 *   rows    = rider_name
 *   columns = kitchen_name
 *   values  = SUM(delivery_fees)
 *
 * Plus three columns on the right:
 *   Total Earnings = SUM of all kitchen columns
 *   Deposit        = KES 50 (default)
 *   Welfare        = KES 50 (default)
 *   Grand Total    = Total Earnings - Deposit - Welfare
 */
export function buildSummarySheet(
  wb: Workbook,
  sheetName: string,
  auditingRows: AuditingRow[],
): SummaryResult {
  // Aggregate by rider x kitchen.
  const riderMap = new Map<string, RiderSummary>();
  const kitchenSet = new Set<string>();

  for (const row of auditingRows) {
    const riderName = String(row.rider_name ?? '').trim();
    const kitchenName = String(row.kitchen_name ?? '').trim();
    if (!riderName) continue;
    const fees = typeof row.delivery_fees === 'number' ? row.delivery_fees : 0;

    kitchenSet.add(kitchenName || '(unknown)');

    if (!riderMap.has(riderName)) {
      riderMap.set(riderName, {
        rider_name: riderName,
        rider_username: (row.rider_username as string) ?? null,
        order_count: 0,
        total_earnings: 0,
        deposit: DEFAULT_DEPOSIT,
        welfare: DEFAULT_WELFARE,
        grand_total: 0,
        byKitchen: {},
      });
    }
    const r = riderMap.get(riderName)!;
    r.order_count += 1;
    r.total_earnings += fees;
    const k = kitchenName || '(unknown)';
    r.byKitchen[k] = (r.byKitchen[k] ?? 0) + fees;
  }

  // Compute grand totals.
  const riders = Array.from(riderMap.values()).sort((a, b) =>
    a.rider_name.localeCompare(b.rider_name),
  );
  for (const r of riders) {
    r.grand_total = r.total_earnings - r.deposit - r.welfare;
  }

  const kitchens = Array.from(kitchenSet).sort((a, b) => a.localeCompare(b));

  // Write the sheet.
  const ws = wb.addWorksheet(sheetName);

  const header = ['Rider', ...kitchens, 'Total Earnings', 'Deposit', 'Welfare', 'Grand Total'];
  ws.addRow(header);

  riders.forEach((rider, idx) => {
    const excelRow = idx + 2;
    const data: (string | number)[] = [rider.rider_name];
    for (const k of kitchens) {
      data.push(rider.byKitchen[k] ?? 0);
    }
    // Placeholders; we overwrite these cells with formulas below.
    data.push(0, rider.deposit, rider.welfare, 0);

    const added = ws.addRow(data);

    // Total Earnings = SUM of kitchen columns.
    const firstKitchenCol = colLetter(2);
    const lastKitchenCol = colLetter(1 + kitchens.length);
    const totalEarningsCol = colLetter(2 + kitchens.length);
    const depositCol = colLetter(3 + kitchens.length);
    const welfareCol = colLetter(4 + kitchens.length);
    const grandTotalCol = colLetter(5 + kitchens.length);

    (added.getCell(totalEarningsCol) as Cell).value = {
      formula: `SUM(${firstKitchenCol}${excelRow}:${lastKitchenCol}${excelRow})`,
    };
    (added.getCell(grandTotalCol) as Cell).value = {
      formula: `${totalEarningsCol}${excelRow}-${depositCol}${excelRow}-${welfareCol}${excelRow}`,
    };
  });

  // Column formatting — currency on all numeric columns.
  for (let c = 2; c <= header.length; c++) {
    ws.getColumn(c).numFmt = CURRENCY_FORMAT;
  }

  // Totals row at the bottom.
  if (riders.length > 0) {
    const firstDataRow = 2;
    const lastDataRow = riders.length + 1;
    const totalsRow = ws.addRow([]);
    (totalsRow.getCell(1) as Cell).value = 'TOTAL';
    (totalsRow.getCell(1) as Cell).font = { bold: true };
    for (let c = 2; c <= header.length; c++) {
      const colL = colLetter(c);
      (totalsRow.getCell(colL) as Cell).value = {
        formula: `SUM(${colL}${firstDataRow}:${colL}${lastDataRow})`,
      };
      (totalsRow.getCell(colL) as Cell).font = { bold: true };
    }
    totalsRow.border = {
      top: { style: 'medium', color: { argb: 'FF0F172A' } },
    };
  }

  styleHeader(ws);
  autoWidth(ws, 20);
  // Make the rider name column a bit wider.
  ws.getColumn(1).width = 28;

  const totalEarnings = riders.reduce((s, r) => s + r.total_earnings, 0);
  const grandTotal = riders.reduce((s, r) => s + r.grand_total, 0);
  const orderCount = riders.reduce((s, r) => s + r.order_count, 0);

  return {
    riders,
    kitchens,
    totals: {
      riderCount: riders.length,
      orderCount,
      totalEarnings,
      grandTotal,
    },
  };
}

function colLetter(n: number): string {
  if (n <= 0) return '';
  let s = '';
  while (n > 0) {
    const r = (n - 1) % 26;
    s = String.fromCharCode(65 + r) + s;
    n = Math.floor((n - 1) / 26);
  }
  return s;
}
