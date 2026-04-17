import type { Worksheet } from 'exceljs';

export const HEADER_FILL = {
  type: 'pattern' as const,
  pattern: 'solid' as const,
  fgColor: { argb: 'FFF1F5F9' }, // slate-100
};

export const HEADER_FONT = {
  bold: true,
  size: 11,
  color: { argb: 'FF0F172A' },
};

export const HEADER_BORDER = {
  top: { style: 'thin' as const, color: { argb: 'FFE2E8F0' } },
  bottom: { style: 'thin' as const, color: { argb: 'FFCBD5E1' } },
};

export const CURRENCY_FORMAT = '#,##0';
export const NUMBER_FORMAT = '#,##0';

/**
 * Set reasonable column widths based on the content in row 1 and row 2.
 * Called after data is written.
 */
export function autoWidth(ws: Worksheet, maxColWidth = 40) {
  ws.columns.forEach((column) => {
    if (!column) return;
    let maxLength = 8;
    column.eachCell?.({ includeEmpty: false }, (cell) => {
      const raw = cell.value;
      let len = 0;
      if (raw === null || raw === undefined) len = 0;
      else if (typeof raw === 'object' && 'formula' in raw) len = 12;
      else len = String(raw).length;
      if (len > maxLength) maxLength = len;
    });
    column.width = Math.min(maxLength + 2, maxColWidth);
  });
}

/** Apply header styling to row 1 of a worksheet. */
export function styleHeader(ws: Worksheet) {
  const headerRow = ws.getRow(1);
  headerRow.eachCell((cell) => {
    cell.fill = HEADER_FILL;
    cell.font = HEADER_FONT;
    cell.border = HEADER_BORDER;
  });
  headerRow.height = 22;
  ws.views = [{ state: 'frozen', ySplit: 1 }];
}
