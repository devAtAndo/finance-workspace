import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { getAuthMode } from '../src/lib/authDispatcher.js';

const original = process.env.PETTY_CASH_AUTH_V2;

beforeEach(() => {
  delete process.env.PETTY_CASH_AUTH_V2;
});

afterEach(() => {
  (process.env as Record<string, string | undefined>).PETTY_CASH_AUTH_V2 = original;
});

describe('getAuthMode', () => {
  it('defaults to legacy nextauth when the flag is unset', () => {
    expect(getAuthMode()).toBe('nextauth');
  });

  it.each(['1', 'true', 'TRUE', 'yes', 'YES'])('returns cfaccess for flag=%s', (raw) => {
    process.env.PETTY_CASH_AUTH_V2 = raw;
    expect(getAuthMode()).toBe('cfaccess');
  });

  it.each(['0', 'false', 'no', '', 'random'])('returns nextauth for flag=%s', (raw) => {
    process.env.PETTY_CASH_AUTH_V2 = raw;
    expect(getAuthMode()).toBe('nextauth');
  });
});
