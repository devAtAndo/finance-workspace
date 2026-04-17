// Standalone test script: read the 3 Nov 4-6 CSVs, generate a workbook, write it to disk.
// Run with: npx tsx test-fixtures/run-test.ts
import { readFileSync, writeFileSync } from 'fs';
import Papa from 'papaparse';
import ExcelJS from 'exceljs';

// Inline duplicated code from src/ to avoid the 'server-only' guard.
// Once the full API is wired we test via HTTP; this is a development shortcut.

// ---- CSV parsing ----
function parseAuditingCsv(text: string) {
  const result = Papa.parse<Record<string, string>>(text, {
    header: true,
    skipEmptyLines: 'greedy',
    transformHeader: (h) => h.trim(),
  });
  const headers = result.meta.fields?.map((h) => h.trim()) ?? [];
  const rows = result.data
    .filter((r) => r.order_id && r.order_id.trim() !== '')
    .map((r) => ({
      ...r,
      delivery_fees: Number(r.delivery_fees) || 0,
      order_amount: Number(r.order_amount) || 0,
    }));
  return { rows, headers, errors: result.errors.map((e) => e.message) };
}

function parsePlatformCsv(text: string) {
  const result = Papa.parse<Record<string, string>>(text, {
    header: true,
    skipEmptyLines: 'greedy',
    transformHeader: (h) => h.trim(),
  });
  const headers = result.meta.fields?.map((h) => h.trim()) ?? [];
  const rows = result.data.filter((r) => r.OrderID || r.Alternate_Id);
  return { rows, headers, errors: result.errors.map((e) => e.message) };
}

function parseGlovoCsv(text: string) {
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
  const headers = result.meta.fields?.map((h) => h.trim()) ?? [];
  const orderIdHeader = headers.find(
    (h) => h.toLowerCase() === 'order id' || h.toLowerCase() === 'orderid',
  );
  const rows = orderIdHeader
    ? result.data.filter((r) => r[orderIdHeader] && String(r[orderIdHeader]).trim() !== '')
    : [];
  return { rows, headers, errors: result.errors.map((e) => e.message) };
}

// ---- Column helpers ----
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

function quoteSheetName(name: string): string {
  if (/^[A-Za-z_][A-Za-z0-9_]*$/.test(name)) return name;
  return `'${name.replace(/'/g, "''")}'`;
}

function truncate(name: string, max = 31): string {
  return name.length <= max ? name : name.slice(0, max);
}

// ---- Main ----
async function main() {
  const auditing = parseAuditingCsv(readFileSync('test-fixtures/nov-4-6-auditing.csv', 'utf8'));
  const platform = parsePlatformCsv(readFileSync('test-fixtures/nov-4-6-platform.csv', 'utf8'));
  const glovo = parseGlovoCsv(readFileSync('test-fixtures/nov-4-6-glovo.csv', 'utf8'));

  console.log('Auditing:', auditing.rows.length, 'rows');
  console.log('Platform:', platform.rows.length, 'rows');
  console.log('Glovo:', glovo.rows.length, 'rows');

  const periodLabel = 'Nov 4-6 2025';
  const platformSheet = truncate(`Raw Platform ${periodLabel}`);
  const glovoSheet = truncate(`Glovo Raw ${periodLabel}`);
  const auditingSheet = truncate(`Auditing ${periodLabel}`);
  const summarySheet = truncate(`Payment Summary ${periodLabel}`);

  const wb = new ExcelJS.Workbook();

  // Platform sheet
  const pws = wb.addWorksheet(platformSheet);
  pws.columns = platform.headers.map((h) => ({ header: h, key: h }));
  for (const r of platform.rows) pws.addRow(r);

  // Glovo sheet
  const gws = wb.addWorksheet(glovoSheet);
  gws.columns = glovo.headers.map((h) => ({ header: h, key: h }));
  for (const r of glovo.rows) gws.addRow(r);

  // Auditing sheet with formulas
  const aws = wb.addWorksheet(auditingSheet);
  const inputHeaders = auditing.headers.filter(
    (h) => h !== 'validated_id' && h !== 'duplicate' && h !== 'duplicate_check',
  );
  const orderIdIdx = inputHeaders.indexOf('order_id');
  const outputHeaders = [
    ...inputHeaders.slice(0, orderIdIdx + 1),
    'validated_id',
    'duplicate',
    ...inputHeaders.slice(orderIdIdx + 1),
  ];
  aws.columns = outputHeaders.map((h) => ({ header: h, key: h }));

  const orderIdCol = colLetter(outputHeaders.indexOf('order_id') + 1);
  const paymentStatusCol = colLetter(outputHeaders.indexOf('payment_status') + 1);
  const validatedIdCol = colLetter(outputHeaders.indexOf('validated_id') + 1);
  const duplicateCol = colLetter(outputHeaders.indexOf('duplicate') + 1);
  const platformRef = quoteSheetName(platformSheet);
  const glovoRef = quoteSheetName(glovoSheet);

  auditing.rows.forEach((row, idx) => {
    const excelRow = idx + 2;
    const obj: Record<string, unknown> = {};
    for (const h of outputHeaders) {
      if (h === 'validated_id' || h === 'duplicate') continue;
      obj[h] = (row as Record<string, unknown>)[h];
    }
    const added = aws.addRow(obj);

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
    added.getCell(validatedIdCol).value = { formula: validatedFormula };
    added.getCell(duplicateCol).value = {
      formula: `COUNTIF(${orderIdCol}:${orderIdCol},${orderIdRef})`,
    };
  });

  // Payment summary
  const riderMap = new Map<
    string,
    {
      name: string;
      username: string;
      orders: number;
      earnings: number;
      byKitchen: Record<string, number>;
    }
  >();
  const kitchens = new Set<string>();
  for (const r of auditing.rows as Array<Record<string, unknown>>) {
    const rn = String(r.rider_name ?? '').trim();
    const kn = String(r.kitchen_name ?? '').trim() || '(unknown)';
    const fees = Number(r.delivery_fees) || 0;
    if (!rn) continue;
    kitchens.add(kn);
    if (!riderMap.has(rn)) {
      riderMap.set(rn, {
        name: rn,
        username: String(r.rider_username ?? ''),
        orders: 0,
        earnings: 0,
        byKitchen: {},
      });
    }
    const rd = riderMap.get(rn)!;
    rd.orders += 1;
    rd.earnings += fees;
    rd.byKitchen[kn] = (rd.byKitchen[kn] ?? 0) + fees;
  }
  const riders = [...riderMap.values()].sort((a, b) => a.name.localeCompare(b.name));
  const kitchenList = [...kitchens].sort((a, b) => a.localeCompare(b));

  const sws = wb.addWorksheet(summarySheet);
  sws.addRow(['Rider', ...kitchenList, 'Total Earnings', 'Deposit', 'Welfare', 'Grand Total']);
  riders.forEach((rd, i) => {
    const row = [rd.name, ...kitchenList.map((k) => rd.byKitchen[k] ?? 0), 0, 50, 50, 0];
    const added = sws.addRow(row);
    const excelRow = i + 2;
    const first = colLetter(2);
    const last = colLetter(1 + kitchenList.length);
    const te = colLetter(2 + kitchenList.length);
    const dep = colLetter(3 + kitchenList.length);
    const wel = colLetter(4 + kitchenList.length);
    const gt = colLetter(5 + kitchenList.length);
    added.getCell(te).value = { formula: `SUM(${first}${excelRow}:${last}${excelRow})` };
    added.getCell(gt).value = { formula: `${te}${excelRow}-${dep}${excelRow}-${wel}${excelRow}` };
  });

  writeFileSync('test-fixtures/nov-4-6-output.xlsx', Buffer.from(await wb.xlsx.writeBuffer()));

  const totalEarnings = riders.reduce((s, r) => s + r.earnings, 0);
  const grandTotal = totalEarnings - riders.length * 100;
  console.log('\n=== Summary ===');
  console.log('Riders:', riders.length);
  console.log('Kitchens:', kitchenList.length);
  console.log(
    'Total orders:',
    riders.reduce((s, r) => s + r.orders, 0),
  );
  console.log('Total earnings (from auditing): KES', totalEarnings.toFixed(2));
  console.log('Grand total (after deductions): KES', grandTotal.toFixed(2));

  console.log('\n=== Top 5 riders by earnings ===');
  for (const r of [...riders].sort((a, b) => b.earnings - a.earnings).slice(0, 5)) {
    console.log(
      `  ${r.name.padEnd(30)} orders=${r.orders.toString().padStart(4)} earn=${r.earnings.toFixed(2).padStart(10)}`,
    );
  }

  console.log('\nOutput written to test-fixtures/nov-4-6-output.xlsx');
  console.log('Open it to verify formulas resolve correctly in Excel/LibreOffice.');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
