# @ando/auth

Cloudflare Access JWT verification and app-level RBAC. This is the **only** place auth logic lives in the Ando Finance Workspace — every app consumes it; no app writes its own.

See [`SPEC.md`](./SPEC.md) for the full contract.

## Install

```json
{ "dependencies": { "@ando/auth": "workspace:*" } }
```

## Quick start — Next.js middleware

```ts
// apps/<app>/middleware.ts
import { NextResponse } from 'next/server';
import { evaluateAccess } from '@ando/auth/middleware';
import { verifyCfAccessJwt } from '@ando/auth';
import { env } from '@ando/config/env';
import { iam } from '@ando/db';

export async function middleware(req: Request) {
  const result = await evaluateAccess(req, {
    appSlug: 'petty-cash',
    iam,
    verify: (token) =>
      verifyCfAccessJwt(token, {
        teamDomain: env.CF_ACCESS_TEAM_DOMAIN,
        audience: env.CF_ACCESS_AUD_PETTY_CASH,
      }),
    loginRedirect: (req) => `https://workspace.andofoods.co/login?next=${encodeURIComponent(req.url)}`,
    forbiddenRedirect: () => 'https://workspace.andofoods.co/no-access',
  });

  if (!result.ok) {
    return result.location ? NextResponse.redirect(result.location) : new NextResponse(result.reason, { status: result.status });
  }
  // Principal is available via a downstream mechanism of your choice (header, context, etc.)
}
```

## Testing

Use the `@ando/auth/testing` helpers so your tests exercise the real verification path:

```ts
import { createTestKeypair, signTestCfAccessJwt, makeInMemoryIam } from '@ando/auth/testing';

const { privateKey, jwks } = await createTestKeypair();
const token = await signTestCfAccessJwt({ privateKey, teamDomain: 'ando.cloudflareaccess.com', audience: 'aud-x', email: 'a@andofoods.co' });
```

## Test

```bash
pnpm --filter @ando/auth test
pnpm --filter @ando/auth test:coverage
```

Coverage thresholds: 90% lines / functions / statements, 85% branches. CI blocks merges on regression.

## Invariants

- This package never reads `process.env`. Callers pass `teamDomain` and `audience`.
- JWT verification always uses `jose` — never hand-rolled.
- JWKS cached in memory, keyed by `teamDomain`.
- `Request` (Fetch API) is the only HTTP input type — works in Node, Edge, and test harnesses.
- Errors are classes (`UnauthorizedError`, `ForbiddenError`). Never string-match.
