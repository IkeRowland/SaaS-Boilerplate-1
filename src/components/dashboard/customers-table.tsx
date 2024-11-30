import type { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';

import { Badge } from '@/components/ui/badge';

import { DataTable } from './data-table';

type Customer = {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'inactive';
  plan: string;
  joinedAt: Date;
};

const columns: ColumnDef<Customer>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue('status') as string;
      return (
        <Badge
          variant={status === 'active' ? 'default' : 'secondary'}
        >
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'plan',
    header: 'Plan',
  },
  {
    accessorKey: 'joinedAt',
    header: 'Joined',
    cell: ({ row }) => {
      return format(row.getValue('joinedAt'), 'MMM d, yyyy');
    },
  },
];

export function CustomersTable({ data }: { data: Customer[] }) {
  return <DataTable columns={columns} data={data} searchKey="email" />;
}
