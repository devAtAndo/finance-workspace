# @ando/eslint-config

Shared ESLint flat configs for the Ando Finance Workspace monorepo.

## Presets

| Import path              | Use in                   |
| ------------------------ | ------------------------ |
| `@ando/eslint-config`    | Node libraries           |
| `@ando/eslint-config/react` | React component libraries |
| `@ando/eslint-config/next`  | Next.js apps             |

## Usage

`eslint.config.js` in a package:

```js
import config from '@ando/eslint-config/next';
export default config;
```

## Rules that are non-negotiable

- `@typescript-eslint/consistent-type-imports` — prevents accidental runtime imports.
- `eqeqeq: always` — no `==`.
- Unused vars must be prefixed with `_` if intentional.
