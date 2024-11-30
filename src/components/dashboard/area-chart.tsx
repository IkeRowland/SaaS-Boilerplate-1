import { AreaChart, Card, Title } from '@tremor/react';

type ChartData = {
  date: string;
  [key: string]: string | number;
};

type AreaChartProps = {
  data: ChartData[];
  index: string;
  categories: string[];
  colors?: string[];
  title?: string;
  subtitle?: string;
};

export function DashboardAreaChart({
  data,
  index,
  categories,
  colors,
  title,
  subtitle,
}: AreaChartProps) {
  return (
    <Card>
      {title && <Title>{title}</Title>}
      {subtitle && <Title className="text-sm text-gray-500">{subtitle}</Title>}
      <AreaChart
        className="mt-4 h-72"
        data={data}
        index={index}
        categories={categories}
        colors={colors || ['blue', 'red', 'green']}
        yAxisWidth={60}
        showAnimation
        showLegend
      />
    </Card>
  );
}
