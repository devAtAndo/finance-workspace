import type { ReactNode } from 'react';
import { NoAccess } from '@ando/ui';

export const metadata = { title: 'No access — Ando Finance' };

export default function NoAccessPage(): ReactNode {
  return <NoAccess appName="Ando Finance" />;
}
