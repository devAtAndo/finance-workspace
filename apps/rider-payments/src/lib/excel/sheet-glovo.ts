import type { Workbook } from 'exceljs';
import type { GlovoRawRow } from '@/lib/types';
import { autoWidth, styleHeader } from './styles';

/**
 * Glovo Raw sheet. ~50 columns. Column B ("Order ID") is the VLOOKUP target
 * referenced from the Auditing sheet. We preserve all columns the user
 * uploaded — we don't try to normalize the Glovo export.
 */
export function buildGlovoSheet(
  wb: Workbook,
  sheetName: string,
  rows: GlovoRawRow[],
  headers: string[],
) {
  const ws = wb.addWorksheet(sheetName);
  ws.columns = headers.map((h) => ({ header: h, key: h }));

  for (const row of rows) {
    ws.addRow(row);
  }

  styleHeader(ws);
  autoWidth(ws, 30);
}
