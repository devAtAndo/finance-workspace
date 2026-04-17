import { NewReconciliationForm } from './new-form';
import { Card } from '@/components/card';

export const dynamic = 'force-dynamic';

export default function NewReconciliationPage() {
  return (
    <div className="space-y-6 max-w-3xl">
      <header>
        <h1 className="text-2xl font-semibold">New reconciliation run</h1>
        <p className="text-sm text-muted-foreground">
          Pick a period, upload the platform CSVs, and we&apos;ll pull settlements from Ando and run
          the match.
        </p>
      </header>
      <Card>
        <NewReconciliationForm />
      </Card>
    </div>
  );
}
