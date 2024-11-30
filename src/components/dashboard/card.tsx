import { cn } from '@/lib/utils';

interface DashboardCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  value: string | number;
  description?: string;
  icon?: React.ReactNode;
}

export function DashboardCard({
  title,
  value,
  description,
  icon,
  className,
  ...props
}: DashboardCardProps) {
  return (
    <div
      className={cn(
        'rounded-lg border bg-card p-6 text-card-foreground shadow',
        className
      )}
      {...props}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <h2 className="mt-2 text-3xl font-bold">{value}</h2>
          {description && (
            <p className="mt-1 text-xs text-muted-foreground">{description}</p>
          )}
        </div>
        {icon && <div className="text-muted-foreground">{icon}</div>}
      </div>
    </div>
  );
} 