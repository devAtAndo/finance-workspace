import { describe, expect, it } from 'vitest';
import type { Database } from '../src/schema.js';

describe('@ando/db schema types', () => {
  it('compiles with expected iam.* tables', () => {
    const keys: Array<keyof Database> = ['iam.users', 'iam.app_access', 'iam.audit_log'];
    expect(keys).toHaveLength(3);
  });
});
