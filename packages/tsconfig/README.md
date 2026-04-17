# @ando/tsconfig

Shared TypeScript configurations for the Ando Finance Workspace monorepo.

## Presets

| File             | Use in                                              |
| ---------------- | --------------------------------------------------- |
| `base.json`      | Everything — strict, ES2022, bundler resolution     |
| `node-lib.json`  | Pure Node packages (`packages/auth`, `packages/db`) |
| `react-lib.json` | React component libraries (`packages/ui`)           |
| `nextjs.json`    | Next.js apps (`apps/*`)                             |

## Usage

```json
{
  "extends": "@ando/tsconfig/node-lib.json",
  "compilerOptions": { "outDir": "dist" },
  "include": ["src/**/*.ts"]
}
```

## Invariants

- `strict: true` and `noUncheckedIndexedAccess: true` are non-negotiable.
- All presets target ES2022; do not downgrade without architectural review.
