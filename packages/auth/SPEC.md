# @ando/auth — Spec / PRP

## Intent

Every Ando Finance app imports this package and nothing else for auth. It verifies the Cloudflare Access JWT the edge injects on every request, resolves the user against the `iam` store, and returns an authorized principal — or throws.

This package owns the **one** place where auth can fail. No app writes auth logic itself.

## Public API

### `verifyCfAccessJwt(token, opts)`

```ts
interface VerifyOpts {
  teamDomain: string;     // e.g. 'ando.cloudflareaccess.com'
  audience: string;       // per-app aud
  jwksFetcher?: JwksFetcher; // injectable for tests
  clock?: () => number;   // injectable for tests (ms since epoch)
}

interface CfAccessClaims {
  email: string;
  sub: string;
  aud: string | string[];
  iss: string;
  exp: number;
  iat: number;
}

function verifyCfAccessJwt(token: string | null | undefined, opts: VerifyOpts): Promise<CfAccessClaims>;
```

Throws `UnauthorizedError` on:

- missing / empty token
- malformed JWT
- invalid signature
- wrong `iss` (must be `https://<teamDomain>`)
- wrong `aud` (must include the per-app audience — rejects token-replay across apps)
- expired (`exp` in the past relative to `clock()`)
- `nbf` in the future

### `requireAppAccess(req, appSlug, deps)`

```ts
interface IamPort {
  upsertUserByEmail(email: string): Promise<{ id: string; disabledAt: Date | null }>;
  getAppAccess(userId: string, appSlug: AppSlug): Promise<{ role: Role } | null>;
}

interface RequireDeps {
  iam: IamPort;
  verify?: typeof verifyCfAccessJwt;
  now?: () => Date;
}

function requireAppAccess(
  req: Request,
  appSlug: AppSlug,
  deps: RequireDeps
): Promise<Principal>;

interface Principal {
  userId: string;
  email: string;
  appSlug: AppSlug;
  role: Role;
}

type Role = 'ADMIN' | 'FINANCE' | 'BRANCH_USER' | 'VIEWER';
```

Reads the `cf-access-jwt-assertion` header (case-insensitive), verifies it, upserts the user (JIT provisioning), rejects disabled users, loads `iam.app_access` for this app, returns the `Principal` or throws.

Throws:

- `UnauthorizedError` — no valid CF Access JWT
- `ForbiddenError` — user disabled, or no `app_access` row for this app

### Testing helpers (`@ando/auth/testing`)

```ts
function createTestKeypair(): { privateKey: CryptoKey; jwks: JsonWebKeySet };
function signTestCfAccessJwt(args: {
  privateKey: CryptoKey;
  teamDomain: string;
  audience: string | string[];
  email: string;
  sub?: string;
  expSeconds?: number;
}): Promise<string>;
function makeInMemoryIam(overrides?: Partial<IamPort>): IamPort & { users: Map<string, any>; access: Map<string, any> };
```

These exist so apps' own tests can exercise `requireAppAccess` against real verification, just with a local keypair. Not part of the production bundle.

## Invariants

- This package **never** reads from `process.env` directly — callers pass `teamDomain` and `audience`. (`@ando/config` is consumed only at the app edge.)
- Token verification must use `jose` — no hand-rolled JWT parsing.
- JWKS is cached in memory; cache must honor `kid` for rotation.
- `requireAppAccess` must be called with a `Request` (standard Fetch API) so it works in both Next.js middleware and edge runtimes.
- Errors must be class-based, not string-matched, so callers can map them to HTTP responses.

## Failure modes (HTTP mapping recommendation)

| Thrown              | HTTP | Callers should |
| ------------------- | ---- | -------------- |
| `UnauthorizedError` | 401  | redirect to CF Access login URL |
| `ForbiddenError`    | 403  | render "Request access" page |
