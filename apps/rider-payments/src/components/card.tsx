import { cn } from '@/lib/utils';

export function Card({
  children,
  className,
  title,
  action,
}: {
  children: React.ReactNode;
  className?: string;
  title?: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <div className={cn('rounded-lg border border-border bg-background', className)}>
      {title && (
        <div className="px-5 py-3 border-b border-border text-sm font-medium flex items-center justify-between gap-3">
          <span>{title}</span>
          {action ? <span className="shrink-0">{action}</span> : null}
        </div>
      )}
      <div className="px-5 py-4">{children}</div>
    </div>
  );
}
