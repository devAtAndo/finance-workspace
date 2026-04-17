import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    include: ['test/**/*.test.ts', 'test/**/*.test.tsx', 'src/**/*.test.ts'],
  },
  resolve: {
    alias: [
      {
        find: 'server-only',
        replacement: new URL('./test/_shim-server-only.ts', import.meta.url).pathname,
      },
      { find: '@', replacement: new URL('./src', import.meta.url).pathname },
    ],
  },
});
