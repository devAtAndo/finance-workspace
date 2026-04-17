import { describe, expect, it } from 'vitest';
import { apps, getApp } from '../src/apps.js';

describe('@ando/config/apps', () => {
  it('exposes every expected finance app slug', () => {
    const slugs = apps.map((a) => a.slug).sort();
    expect(slugs).toEqual(['petty-cash', 'rider-payments', 'workspace']);
  });

  it('each app has a subdomain under andofoods.co', () => {
    for (const app of apps) {
      expect(app.subdomain).toMatch(/\.andofoods\.co$/);
    }
  });

  it('each app points at a distinct cfAccessAudEnvKey', () => {
    const keys = apps.map((a) => a.cfAccessAudEnvKey);
    expect(new Set(keys).size).toBe(apps.length);
    for (const key of keys) expect(key).toMatch(/^CF_ACCESS_AUD_/);
  });

  it('is frozen — registry cannot be mutated at runtime', () => {
    expect(Object.isFrozen(apps)).toBe(true);
  });

  it('getApp returns the matching descriptor', () => {
    expect(getApp('petty-cash').displayName).toMatch(/petty/i);
  });

  it('getApp throws on unknown slug', () => {
    // @ts-expect-error testing invalid input
    expect(() => getApp('does-not-exist')).toThrow(/does-not-exist/);
  });
});
