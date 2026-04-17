---
'@ando/petty-cash': minor
---

Phase 4.2: Petty Cash is live on Cloudflare Workers at https://ando-petty-cash.philip-ndegwa.workers.dev.

Legacy NextAuth mode against a Neon Free Postgres. Login + admin + branch CRUD verified.

Shipped in this phase:

- `wrangler.toml` + `open-next.config.ts` + `cf:build` / `cf:deploy` scripts.
- Swap Postgres driver to `@neondatabase/serverless` (HTTP/WebSocket) — raw `pg` TCP pools hang on the Workers runtime.
- Replace Prisma client with a hand-written neon-backed facade at `src/lib/prisma.ts`. Prisma's library-engine startup does an `fs.readdir` that Workers' unenv shim rejects; facade bypasses the engine entirely.
- Override NextAuth's default JWT encoder with HS256 signing via `jose` (Web Crypto). NextAuth v4's default uses `crypto.createCipheriv` which unenv doesn't implement.
- `src/lib/auth.ts` authorize() calls `@neondatabase/serverless` directly for the user lookup.
- `[...nextauth]/route.ts` GET/POST wrappers now forward the route `ctx` alongside `req` (NextAuth catchall requirement).
- `middleware.ts` moved into `src/` (Next 14 `src/` layout requires it there).
- Nodemailer lazy-loads only in local Node dev; production Worker path logs `[email:stub]` JSON.

Known non-blockers at 20-user scale: emails are log-only, no custom domain, transactions are sequential, seed passwords are `password123`.
