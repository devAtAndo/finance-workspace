# Changesets

Every PR that changes a package's public surface in `packages/**` or a user-facing behavior in `apps/**` must include a changeset.

## Adding a changeset

```bash
pnpm changeset
```

Select bumped packages and severity per [SemVer](https://semver.org):

- **patch** — bug fixes, docs, internal refactors with no API change.
- **minor** — additive, backward-compatible features.
- **major** — breaking changes to the public API.

Describe the change in imperative voice. The file is committed alongside your code changes.

CI fails any PR that touches `packages/**` or `apps/**` without a changeset.
