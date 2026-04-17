export interface NoAccessProps {
  appName: string;
  contactHref?: string;
}

export function NoAccess({ appName, contactHref = 'mailto:finance-admin@andofoods.co' }: NoAccessProps) {
  return (
    <div style={{ maxWidth: 520, margin: '64px auto', fontFamily: 'system-ui, sans-serif' }}>
      <h1 style={{ fontSize: 22, marginBottom: 12 }}>No access to {appName}</h1>
      <p style={{ color: '#555', lineHeight: 1.5 }}>
        Your account is authenticated, but you haven’t been granted access to {appName} yet.
      </p>
      <p style={{ marginTop: 20 }}>
        <a href={contactHref} style={{ color: '#2563eb' }}>
          Request access
        </a>
      </p>
    </div>
  );
}
