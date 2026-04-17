export function buildLoginUrl(teamDomain: string, returnTo: string): string {
  if (returnTo.startsWith('//')) {
    throw new Error('refusing to build login URL for protocol-relative return target');
  }
  let parsed: URL;
  try {
    parsed = new URL(returnTo);
  } catch {
    throw new Error('invalid return URL');
  }
  if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') {
    throw new Error(`refusing to build login URL for scheme ${parsed.protocol}`);
  }
  return `https://${teamDomain}/cdn-cgi/access/login/${teamDomain}?kid=&redirect_url=${encodeURIComponent(parsed.toString())}`;
}
