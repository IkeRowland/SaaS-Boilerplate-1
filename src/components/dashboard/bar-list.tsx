import { BarList, Card, Title } from '@tremor/react';

type BarListProps = {
  title?: string;
  data: {
    name: string;
    value: number;
    icon?: React.ReactNode;
  }[];
  valueFormatter?: (value: number) => string;
};

export function DashboardBarList({
  title,
  data,
  valueFormatter = value => `${value.toLocaleString()}`,
}: BarListProps) {
  return (
    <Card>
      {title && <Title>{title}</Title>}
      <BarList
        data={data}
        valueFormatter={valueFormatter}
        className="mt-4"
      />
    </Card>
  );
}
