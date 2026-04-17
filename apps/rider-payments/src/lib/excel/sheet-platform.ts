import type { Workbook } from 'exceljs';
import type { PlatformOrderRow } from '@/lib/types';
import { autoWidth, styleHeader } from './styles';

/**
 * Raw Platform Order Data sheet. 8 columns. Column C (OrderID) and Column D
 * (Alternate_Id) are VLOOKUP targets referenced from the Auditing sheet.
 */
export function buildPlatformSheet(
  wb: Workbook,
  sheetName: string,
  rows: PlatformOrderRow[],
  headers: string[],
) {
  const ws = wb.addWorksheet(sheetName);
  ws.columns = headers.map((h) => ({ header: h, key: h }));

  for (const row of rows) {
    const obj: Record<string, unknown> = {};
    for (const h of headers) obj[h] = row[h as keyof PlatformOrderRow];
    ws.addRow(obj);
  }

  styleHeader(ws);
  autoWidth(ws, 30);
}
