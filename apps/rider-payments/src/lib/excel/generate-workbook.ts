// Main orchestrator for building a rider payments workbook.
import 'server-only';

import ExcelJS from 'exceljs';
import type { AuditingRow, PlatformOrderRow, GlovoRawRow } from '@/lib/types';
import { buildPlatformSheet } from './sheet-platform';
import { buildGlovoSheet } from './sheet-glovo';
import { buildAuditingSheet } from './sheet-auditing';
import { buildSummarySheet, type RiderSummary } from './sheet-summary';

export interface GenerateInput {
  periodLabel: string; // e.g. "Nov 4-6 2025"
  auditingRows: AuditingRow[];
  auditingHeaders: string[];
  platformRows: PlatformOrderRow[];
  platformHeaders: string[];
  glovoRows: GlovoRawRow[];
  glovoHeaders: string[];
}

export interface GenerateOutput {
  buffer: Buffer;
  summary: {
    riderCount: number;
    orderCount: number;
    totalEarnings: number;
    grandTotal: number;
    riders: RiderSummary[];
  };
  sheetNames: {
    platform: string;
    glovo: string;
    auditing: string;
    summary: string;
  };
}

// Excel sheet names have a 31-character limit. We use the same short
// conventions as the existing historical workbook.
function truncate(name: string, max = 31): string {
  return name.length <= max ? name : name.slice(0, max);
}

export async function generatePaymentWorkbook(input: GenerateInput): Promise<GenerateOutput> {
  const wb = new ExcelJS.Workbook();
  wb.creator = 'Ando Rider Payments';
  wb.created = new Date();

  const platformSheet = truncate(`Raw Platform ${input.periodLabel}`);
  const glovoSheet = truncate(`Glovo Raw ${input.periodLabel}`);
  const auditingSheet = truncate(`Auditing ${input.periodLabel}`);
  const summarySheet = truncate(`Payment Summary ${input.periodLabel}`);

  // Build in dependency order: Platform & Glovo must exist before Auditing
  // references them via VLOOKUP.
  buildPlatformSheet(wb, platformSheet, input.platformRows, input.platformHeaders);
  buildGlovoSheet(wb, glovoSheet, input.glovoRows, input.glovoHeaders);
  buildAuditingSheet(wb, {
    sheetName: auditingSheet,
    platformSheetName: platformSheet,
    glovoSheetName: glovoSheet,
    rows: input.auditingRows,
    inputHeaders: input.auditingHeaders,
  });
  const summary = buildSummarySheet(wb, summarySheet, input.auditingRows);

  // Make the summary sheet the default active tab when the user opens the file.
  const summaryWs = wb.getWorksheet(summarySheet);
  if (summaryWs) {
    wb.views = [
      {
        x: 0,
        y: 0,
        width: 10000,
        height: 20000,
        firstSheet: 0,
        activeTab: summaryWs.id - 1,
        visibility: 'visible',
      },
    ];
  }

  const arrayBuffer = await wb.xlsx.writeBuffer();
  return {
    buffer: Buffer.from(arrayBuffer),
    summary: {
      riderCount: summary.totals.riderCount,
      orderCount: summary.totals.orderCount,
      totalEarnings: summary.totals.totalEarnings,
      grandTotal: summary.totals.grandTotal,
      riders: summary.riders,
    },
    sheetNames: {
      platform: platformSheet,
      glovo: glovoSheet,
      auditing: auditingSheet,
      summary: summarySheet,
    },
  };
}
