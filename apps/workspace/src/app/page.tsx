import type { ReactNode } from 'react';
import { headers } from 'next/headers';
import { apps } from '@ando/config/apps';
import { iam } from '@ando/db';
import { AppShell, TileGrid } from '@ando/ui';
import { buildTiles } from '@/lib/tiles';

interface Principal {
  userId: string;
  email: string;
  role: string;
}

function readPrincipal(): Principal {
  const raw = headers().get('x-ando-principal');
  if (!raw) throw new Error('principal header missing — middleware failed to attach it');
  return JSON.parse(raw) as Principal;
}

export default async function HomePage(): Promise<ReactNode> {
  const principal = readPrincipal();
  const grants = await iam.listAppAccess(principal.userId);
  const tiles = buildTiles(apps, grants);

  return (
    <AppShell appName="Workspace" userEmail={principal.email}>
      <h1 style={{ fontSize: 22, margin: '0 0 16px' }}>Your finance apps</h1>
      <TileGrid tiles={tiles} />
    </AppShell>
  );
}
