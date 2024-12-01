import { Card, DonutChart, Legend, Title } from '@tremor/react';

type DonutChartProps = {
  title?: string;
  data: {
    name: string;
    value: number;
  }[];
  colors?: string[];
  valueFormatter?: (value: number) => string;
};

export function DashboardDonutChart({
  title,
  data,
  colors,
  valueFormatter = value => `${value.toLocaleString()}`,
}: DonutChartProps) {
  return (
    <Card>
      {title && <Title>{title}</Title>}
      <DonutChart
        className="mt-6"
        data={data}
        category="value"
        index="name"
        valueFormatter={valueFormatter}
        colors={colors || ['slate', 'violet', 'indigo', 'rose', 'cyan', 'amber']}
      />
      <Legend
        className="mt-3"
        categories={data.map(item => item.name)}
        colors={colors || ['slate', 'violet', 'indigo', 'rose', 'cyan', 'amber']}
      />
    </Card>
  );
}
