import type { AppDescriptor } from '@ando/config';

export interface TileGridProps {
  tiles: ReadonlyArray<AppDescriptor>;
}

export function TileGrid({ tiles }: TileGridProps) {
  if (tiles.length === 0) {
    return (
      <p style={{ color: '#555' }}>
        You don’t have access to any finance apps yet. Contact an administrator to request access.
      </p>
    );
  }
  return (
    <ul
      style={{
        listStyle: 'none',
        padding: 0,
        margin: 0,
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
        gap: 16,
      }}
    >
      {tiles.map((app) => (
        <li key={app.slug}>
          <a
            href={`https://${app.subdomain}`}
            style={{
              display: 'block',
              padding: 20,
              borderRadius: 12,
              border: '1px solid #e5e7eb',
              textDecoration: 'none',
              color: '#111',
            }}
          >
            <strong style={{ fontSize: 16 }}>{app.displayName}</strong>
            <p style={{ margin: '6px 0 0', fontSize: 13, color: '#555' }}>{app.tileDescription}</p>
          </a>
        </li>
      ))}
    </ul>
  );
}
