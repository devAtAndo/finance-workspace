# @ando/ui

Minimal shared React components: `AppShell`, `TileGrid`, `NoAccess`. Styled inline for now — swap for Tailwind + shadcn later without changing the API.

## Usage

```tsx
import { AppShell, TileGrid } from '@ando/ui';
import { apps } from '@ando/config';

export default function Home() {
  return (
    <AppShell appName="Workspace" userEmail="asif@andofoods.co">
      <TileGrid tiles={apps.filter((a) => a.slug !== 'workspace')} />
    </AppShell>
  );
}
```

## Design principles

- **Zero framework coupling** — plain JSX; no Next.js `Link`, no router. Apps wire routing themselves.
- **Bring-your-own theming** — stays inline until the design-system work lands.
- **Stable prop shapes** — major-version bump if any prop name or type changes.
