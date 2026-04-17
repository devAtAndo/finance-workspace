import type { Workbook, Cell } from 'exceljs';
import type { AuditingRow } from '@/lib/types';
import { autoWidth, styleHeader } from './styles';

/**
 * Auditing sheet builder.
 *
 * The input CSV has columns from the Looker export (no validated_id or
 * duplicate). This builder inserts two formula columns between `order_id`
 * and `order_accepted_time`, preserving the historical workbook layout.
 *
 * validated_id formula (column G when output layout is standard):
 *   =IF(K2="Pick-up","PICKUPS",
 *     IF(K2="Staff drop-off","STAFF_DROPOFF",
 *     IF(K2="Replacements","REPLACEMENT",
 *     IF(K2="Central Stores Dispatch","CENTRAL STORES DISPATCH",
 *     IFNA(IFNA(VLOOKUP(F2,'Raw Platform [period]'!C:C,1,FALSE),
 *               VLOOKUP(F2,'Raw Platform [period]'!D:D,1,FALSE)),
 *          IFNA(VLOOKUP(F2,'Glovo Raw [period]'!B:B,1,FALSE),"Not Matched"))))))
 *
 * Where:
 *   F = order_id column
 *   K = payment_status column
 */

export interface BuildAuditingOptions {
  sheetName: string;
  platformSheetName: string;
  glovoSheetName: string;
  rows: AuditingRow[];
  inputHeaders: string[];
}

export function buildAuditingSheet(wb: Workbook, opts: BuildAuditingOptions) {
  const { sheetName, platformSheetName, glovoSheetName, rows, inputHeaders } = opts;
  const ws = wb.addWorksheet(sheetName);

  // Build the output column list: preserve input order, inject validated_id
  // and duplicate_check immediately after order_id. If the input already has
  // those columns (defensive: a prior run's file re-uploaded), don't duplicate.
  const outputHeaders = buildOutputHeaders(inputHeaders);

  ws.columns = outputHeaders.map((h) => ({ header: h, key: h }));

  // Find column letters for the formulas.
  const orderIdCol = colLetter(outputHeaders.indexOf('order_id') + 1);
  const paymentStatusCol = colLetter(outputHeaders.indexOf('payment_status') + 1);
  const validatedIdCol = colLetter(outputHeaders.indexOf('validated_id') + 1);
  const duplicateCol = colLetter(outputHeaders.indexOf('duplicate') + 1);

  if (!orderIdCol || !paymentStatusCol || !validatedIdCol || !duplicateCol) {
    throw new Error(
      'Auditing sheet: required columns missing (order_id, payment_status, validated_id, duplicate)',
    );
  }

  // Quote sheet names containing spaces / special chars per Excel convention.
  const platformRef = quoteSheetName(platformSheetName);
  const glovoRef = quoteSheetName(glovoSheetName);

  rows.forEach((row, idx) => {
    const excelRow = idx + 2; // row 1 = headers
    const rowObj: Record<string, unknown> = {};
    for (const h of outputHeaders) {
      if (h === 'validated_id' || h === 'duplicate') continue;
      rowObj[h] = row[h as keyof AuditingRow];
    }
    const added = ws.addRow(rowObj);

    const orderIdRef = `${orderIdCol}${excelRow}`;
    const paymentStatusRef = `${paymentStatusCol}${excelRow}`;

    const validatedFormula =
      `IF(${paymentStatusRef}="Pick-up","PICKUPS",` +
      `IF(${paymentStatusRef}="Staff drop-off","STAFF_DROPOFF",` +
      `IF(${paymentStatusRef}="Replacements","REPLACEMENT",` +
      `IF(${paymentStatusRef}="Central Stores Dispatch","CENTRAL STORES DISPATCH",` +
      `IFNA(IFNA(VLOOKUP(${orderIdRef},${platformRef}!C:C,1,FALSE),` +
      `VLOOKUP(${orderIdRef},${platformRef}!D:D,1,FALSE)),` +
      `IFNA(VLOOKUP(${orderIdRef},${glovoRef}!B:B,1,FALSE),"Not Matched"))))))`;

    const duplicateFormula = `COUNTIF(${orderIdCol}:${orderIdCol},${orderIdRef})`;

    const validatedCell = added.getCell(validatedIdCol) as Cell;
    validatedCell.value = { formula: validatedFormula };

    const duplicateCell = added.getCell(duplicateCol) as Cell;
    duplicateCell.value = { formula: duplicateFormula };
  });

  styleHeader(ws);
  autoWidth(ws, 28);
}

function buildOutputHeaders(input: string[]): string[] {
  const filtered = input.filter(
    (h) => h !== 'validated_id' && h !== 'duplicate' && h !== 'duplicate_check',
  );
  const orderIdIdx = filtered.indexOf('order_id');
  if (orderIdIdx === -1) {
    // Fallback: append at end if order_id missing (shouldn't happen, parser
    // enforces required columns).
    return [...filtered, 'validated_id', 'duplicate'];
  }
  return [
    ...filtered.slice(0, orderIdIdx + 1),
    'validated_id',
    'duplicate',
    ...filtered.slice(orderIdIdx + 1),
  ];
}

// Convert 1-indexed column number to letter (1 -> A, 27 -> AA, ...).
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

/**
 * Quote a sheet name for use in cross-sheet references.
 * Excel requires single quotes around names with spaces or special chars,
 * and escapes embedded single quotes by doubling them.
 */
function quoteSheetName(name: string): string {
  if (/^[A-Za-z_][A-Za-z0-9_]*$/.test(name)) return name;
  return `'${name.replace(/'/g, "''")}'`;
}
