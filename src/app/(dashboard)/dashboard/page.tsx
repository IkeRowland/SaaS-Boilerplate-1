import { Activity, CreditCard, Users } from 'lucide-react';
import { Suspense } from 'react';

import { DashboardAreaChart } from '@/components/dashboard/area-chart';
import { DashboardCard } from '@/components/dashboard/card';
import { CustomersTable } from '@/components/dashboard/customers-table';
import { StatsGrid } from '@/components/dashboard/stats-grid';

const stats = [
  {
    title: 'Total Revenue',
    metric: '$12,699',
    delta: 12.3,
    deltaType: 'increase',
  },
  {
    title: 'Subscriptions',
    metric: '2,345',
    delta: 8.1,
    deltaType: 'moderateIncrease',
  },
  {
    title: 'Active Users',
    metric: '1,234',
    delta: -3.2,
    deltaType: 'decrease',
  },
];

const chartData = [
  {
    date: 'Jan 22',
    Revenue: 2890,
    Customers: 2400,
  },
  // Add more data points...
];

const customers = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    status: 'active',
    plan: 'Pro',
    joinedAt: new Date('2023-01-01'),
  },
  // Add more customers...
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>

      <StatsGrid stats={stats} />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Suspense fallback={<div>Loading...</div>}>
          <DashboardCard
            title="Total Customers"
            value="2,543"
            description="+20.1% from last month"
            icon={<Users className="size-4" />}
          />
        </Suspense>
        <Suspense fallback={<div>Loading...</div>}>
          <DashboardCard
            title="Revenue"
            value="$45,231.89"
            description="+15% from last month"
            icon={<CreditCard className="size-4" />}
          />
        </Suspense>
        <Suspense fallback={<div>Loading...</div>}>
          <DashboardCard
            title="Active Users"
            value="1,234"
            description="+49% from last month"
            icon={<Activity className="size-4" />}
          />
        </Suspense>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <DashboardAreaChart
          data={chartData}
          index="date"
          categories={['Revenue', 'Customers']}
          title="Revenue & Customers"
          subtitle="Monthly overview"
        />
      </div>

      <div className="mt-6">
        <h3 className="mb-4 text-xl font-semibold">Recent Customers</h3>
        <CustomersTable data={customers} />
      </div>
    </div>
  );
}
