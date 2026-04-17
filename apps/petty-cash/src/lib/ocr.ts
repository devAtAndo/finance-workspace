'use client';
import Tesseract from 'tesseract.js';

/**
 * Run OCR on a receipt image (client-side). Returns best-guess total amount and raw text.
 * Only supports images (PDF OCR requires server-side rendering). Non-image files return empty.
 */
export async function runOcr(file: File): Promise<{ amount: number | null; text: string }> {
  if (!file.type.startsWith('image/')) return { amount: null, text: '' };

  const { data } = await Tesseract.recognize(file, 'eng');
  const text = data.text || '';
  return { amount: extractAmount(text), text };
}

/**
 * Heuristic amount extraction:
 *   1. Prefer numbers on a line containing a "total" keyword.
 *   2. Otherwise take the largest numeric value that looks like money.
 */
export function extractAmount(text: string): number | null {
  const lines = text.split(/\r?\n/);
  const totalLine = lines.find((l) => /\b(total|amount|grand total|balance due)\b/i.test(l));
  const pickFromLine = (l: string) => {
    const m = l.match(
      /(?:ksh\.?|kes|\$)?\s*([0-9]{1,3}(?:[,\s][0-9]{3})*(?:\.[0-9]{1,2})?|[0-9]+(?:\.[0-9]{1,2})?)/gi,
    );
    if (!m) return null;
    const nums = m.map((s) => Number(s.replace(/[^0-9.]/g, ''))).filter((n) => !isNaN(n) && n > 0);
    return nums.length ? Math.max(...nums) : null;
  };
  if (totalLine) {
    const v = pickFromLine(totalLine);
    if (v) return Math.round(v);
  }
  const all = lines.flatMap((l) => {
    const v = pickFromLine(l);
    return v ? [v] : [];
  });
  if (!all.length) return null;
  return Math.round(Math.max(...all));
}
