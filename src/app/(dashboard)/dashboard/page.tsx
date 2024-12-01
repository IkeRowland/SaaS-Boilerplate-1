import { CreditCard, ShoppingCart, Users } from 'lucide-react';

import { DashboardAreaChart } from '@/components/dashboard/area-chart';
import { DashboardBarList } from '@/components/dashboard/bar-list';
import { DashboardCard } from '@/components/dashboard/card';
import { CustomersTable } from '@/components/dashboard/customers-table';
import { DashboardDonutChart } from '@/components/dashboard/donut-chart';
import { KPICard } from '@/components/dashboard/kpi-card';
import { MetricsGrid } from '@/components/dashboard/metrics-grid';
import type { UserDocument } from '@/types/database';

type Metric = {
  title: string;
  metric: string;
  delta: number;
  deltaType: 'increase' | 'moderateIncrease' | 'decrease' | 'moderateDecrease';
};

const metrics: Metric[] = [
  {
    title: 'Revenue',
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
    metric: '1,235',
    delta: -5.6,
    deltaType: 'decrease',
  },
];

const kpiData = [
  { date: '2023-01-01', value: 2890 },
  { date: '2023-02-01', value: 2756 },
  { date: '2023-03-01', value: 3322 },
  { date: '2023-04-01', value: 3470 },
  { date: '2023-05-01', value: 3475 },
  { date: '2023-06-01', value: 3129 },
];

const donutData = [
  { name: 'Basic', value: 345 },
  { name: 'Pro', value: 891 },
  { name: 'Enterprise', value: 252 },
];

const barListData = [
  { name: 'Direct', value: 456 },
  { name: 'Affiliate', value: 351 },
  { name: 'Social', value: 271 },
  { name: 'Email', value: 191 },
];

const customers: Partial<UserDocument>[] = [
  {
    _id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    subscriptionStatus: 'active',
    createdAt: new Date('2023-01-01'),
  },
  // Add more customers...
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>

      <MetricsGrid metrics={metrics} />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <KPICard
          title="Monthly Revenue"
          metric="$12,699"
          metricPrev="$9,456"
          delta={12.3}
          deltaType="increase"
          data={kpiData}
        />
        <DashboardCard
          title="Total Customers"
          value="2,543"
          description="+20.1% from last month"
          icon={<Users className="size-4" />}
        />
        <DashboardCard
          title="Active Subscriptions"
          value="1,488"
          description="+15% from last month"
          icon={<CreditCard className="size-4" />}
        />
        <DashboardCard
          title="Orders"
          value="345"
          description="+49% from last month"
          icon={<ShoppingCart className="size-4" />}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <DashboardAreaChart
          data={kpiData}
          index="date"
          categories={['value']}
          title="Revenue Trend"
          subtitle="Monthly revenue"
        />
        <DashboardDonutChart
          title="Subscriptions by Plan"
          data={donutData}
          valueFormatter={value => `${value} users`}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <DashboardBarList
          title="Acquisition Channels"
          data={barListData}
          valueFormatter={value => `${value} users`}
        />
        <div className="space-y-6">
          <h3 className="text-xl font-semibold">Recent Customers</h3>
          <CustomersTable data={customers} />
        </div>
      </div>
    </div>
  );
}
