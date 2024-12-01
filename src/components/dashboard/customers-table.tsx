import type { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';

import { DataTable } from '@/components/dashboard/data-table';
import type { UserDocument } from '@/types/database';

const columns: ColumnDef<UserDocument>[] = [
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'createdAt',
    header: 'Joined',
    cell: ({ row }) => format(new Date(row.getValue('createdAt')), 'PP'),
  },
  {
    accessorKey: 'subscriptionStatus',
    header: 'Status',
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue('subscriptionStatus') || 'inactive'}</div>
    ),
  },
];

type CustomersTableProps = {
  data: UserDocument[];
};

export function CustomersTable({ data }: CustomersTableProps) {
  return <DataTable columns={columns} data={data} />;
}
