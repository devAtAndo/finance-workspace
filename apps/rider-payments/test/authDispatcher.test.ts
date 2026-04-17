import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { getAuthMode } from '../src/lib/authDispatcher.js';

const original = process.env.RIDER_CF_ACCESS;

beforeEach(() => {
  delete process.env.RIDER_CF_ACCESS;
});

afterEach(() => {
  (process.env as Record<string, string | undefined>).RIDER_CF_ACCESS = original;
});

describe('getAuthMode (rider-payments)', () => {
  it('defaults to legacy supabase when the flag is unset', () => {
    expect(getAuthMode()).toBe('supabase');
  });

  it.each(['1', 'true', 'TRUE', 'yes'])('returns cfaccess for flag=%s', (raw) => {
    process.env.RIDER_CF_ACCESS = raw;
    expect(getAuthMode()).toBe('cfaccess');
  });

  it.each(['0', 'false', 'no', '', 'random'])('returns supabase for flag=%s', (raw) => {
    process.env.RIDER_CF_ACCESS = raw;
    expect(getAuthMode()).toBe('supabase');
  });
});
