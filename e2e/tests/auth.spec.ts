import { test, expect } from '@playwright/test';
import { bootCfAccessContext, issueTestJwt } from './cfAccessHarness.js';

// These tests are authored now and expected to go green once apps/workspace,
// apps/petty-cash, and apps/rider-payments are scaffolded in Phases 1–3 with a
// dev-only CF Access JWT verifier pointed at the test keypair.
//
// Until then, `test.skip` keeps CI green while preserving the specification.

test.describe('SSO across Ando finance subdomains', () => {
  test.skip(true, 'enabled once apps are wired to the test JWKS in Phase 1+');

  test('unauthenticated visit redirects to workspace login', async ({ page }) => {
    const response = await page.goto('https://petty-cash.localtest.me/');
    expect(response?.url()).toContain('workspace.localtest.me/login');
  });

  test('a valid CF Access JWT grants access to the app the user is authorized for', async ({
    page,
    request,
  }) => {
    const ctx = await bootCfAccessContext();
    const token = await issueTestJwt(ctx, 'petty-cash', 'asif@andofoods.co');
    // Seed iam.app_access via the workspace admin API (to be built).
    await request.post('https://workspace.localtest.me/api/test/grant', {
      data: { email: 'asif@andofoods.co', appSlug: 'petty-cash', role: 'FINANCE' },
    });

    await page.context().setExtraHTTPHeaders({ 'cf-access-jwt-assertion': token });
    await page.goto('https://petty-cash.localtest.me/');
    await expect(page.locator('body')).toContainText(/petty cash/i);
  });

  test('a valid JWT without an app_access row yields the NoAccess page', async ({ page }) => {
    const ctx = await bootCfAccessContext();
    const token = await issueTestJwt(ctx, 'rider-payments', 'nobody@andofoods.co');
    await page.context().setExtraHTTPHeaders({ 'cf-access-jwt-assertion': token });
    const response = await page.goto('https://rider-payments.localtest.me/');
    expect(response?.status()).toBe(403);
    await expect(page.locator('body')).toContainText(/request access/i);
  });

  test('a token for petty-cash cannot be replayed against rider-payments (aud mismatch)', async ({
    page,
  }) => {
    const ctx = await bootCfAccessContext();
    const token = await issueTestJwt(ctx, 'petty-cash', 'asif@andofoods.co');
    await page.context().setExtraHTTPHeaders({ 'cf-access-jwt-assertion': token });
    const response = await page.goto('https://rider-payments.localtest.me/');
    expect(response?.status()).toBe(401);
  });
});
