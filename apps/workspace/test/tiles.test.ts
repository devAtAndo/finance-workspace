import { describe, expect, it } from 'vitest';
import { apps } from '@ando/config/apps';
import { buildTiles } from '../src/lib/tiles.js';

describe('buildTiles', () => {
  it('returns every non-workspace app the user has access to', () => {
    const tiles = buildTiles(apps, [
      { appSlug: 'petty-cash', role: 'FINANCE' },
      { appSlug: 'rider-payments', role: 'VIEWER' },
      { appSlug: 'workspace', role: 'ADMIN' }, // should not appear as a tile
    ]);
    const slugs = tiles.map((t) => t.slug).sort();
    expect(slugs).toEqual(['petty-cash', 'rider-payments']);
  });

  it('returns an empty array when the user has no grants', () => {
    expect(buildTiles(apps, [])).toEqual([]);
  });

  it('ignores grants for apps that are not in the registry', () => {
    // @ts-expect-error testing an unknown slug coming from a stale DB row
    const tiles = buildTiles(apps, [{ appSlug: 'ghost-app', role: 'ADMIN' }]);
    expect(tiles).toEqual([]);
  });

  it('returns tiles in the same order as the registry (stable)', () => {
    const tiles = buildTiles(apps, [
      { appSlug: 'rider-payments', role: 'FINANCE' },
      { appSlug: 'petty-cash', role: 'FINANCE' },
    ]);
    const indexOf = (slug: string) => apps.findIndex((a) => a.slug === slug);
    for (let i = 1; i < tiles.length; i += 1) {
      expect(indexOf(tiles[i]!.slug)).toBeGreaterThan(indexOf(tiles[i - 1]!.slug));
    }
  });
});
