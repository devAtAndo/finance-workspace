import { describe, expect, it } from 'vitest';
import * as mod from '../src/index.js';

describe('@ando/db public exports', () => {
  it('exposes getDb, closeDb and iam', () => {
    expect(typeof mod.getDb).toBe('function');
    expect(typeof mod.closeDb).toBe('function');
    expect(typeof mod.iam).toBe('object');
    expect(typeof mod.iam.upsertUserByEmail).toBe('function');
    expect(typeof mod.iam.grantAccess).toBe('function');
  });
});
