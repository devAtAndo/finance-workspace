import { describe, expect, it } from 'vitest';
import * as ui from '../src/index.js';

describe('@ando/ui public exports', () => {
  it('exports the three named components', () => {
    expect(typeof ui.AppShell).toBe('function');
    expect(typeof ui.TileGrid).toBe('function');
    expect(typeof ui.NoAccess).toBe('function');
  });
});
