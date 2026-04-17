import { describe, expect, it } from 'vitest';
import { buildLoginUrl } from '../src/lib/loginUrl.js';

const TEAM = 'ando.cloudflareaccess.com';

describe('buildLoginUrl', () => {
  it('returns the CF Access login URL with the request URL as the redirect target', () => {
    const url = buildLoginUrl(TEAM, 'https://workspace.andofoods.co/admin');
    expect(url).toMatch(/^https:\/\/ando\.cloudflareaccess\.com\/cdn-cgi\/access\/login\//);
    expect(url).toContain(encodeURIComponent('https://workspace.andofoods.co/admin'));
  });

  it('prevents open-redirect by refusing schemes other than https/http', () => {
    expect(() => buildLoginUrl(TEAM, 'javascript:alert(1)')).toThrow();
  });

  it('prevents protocol-relative open redirects', () => {
    expect(() => buildLoginUrl(TEAM, '//evil.com/phish')).toThrow();
  });
});
