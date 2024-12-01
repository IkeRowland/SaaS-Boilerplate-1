import { BadgeDelta, Card, Flex, LineChart, Metric, Text } from '@tremor/react';

type KPICardProps = {
  title: string;
  metric: string;
  metricPrev?: string;
  delta?: number;
  deltaType?: 'increase' | 'decrease' | 'moderateIncrease' | 'moderateDecrease';
  data?: Array<{ date: string; value: number }>;
};

export function KPICard({
  title,
  metric,
  metricPrev,
  delta,
  deltaType = 'increase',
  data,
}: KPICardProps) {
  return (
    <Card>
      <Flex alignItems="start">
        <div className="truncate">
          <Text>{title}</Text>
          <Metric className="truncate">{metric}</Metric>
          {metricPrev && (
            <Text className="mt-2">
              Previous:
              {metricPrev}
            </Text>
          )}
        </div>
        {delta && (
          <BadgeDelta deltaType={deltaType}>
            {delta > 0 ? '+' : ''}
            {delta}
            %
          </BadgeDelta>
        )}
      </Flex>
      {data && (
        <LineChart
          className="mt-6 h-28"
          data={data}
          index="date"
          categories={['value']}
          colors={['blue']}
          showXAxis={false}
          showYAxis={false}
          showLegend={false}
          showGridLines={false}
          showAnimation
          autoMinValue
          curveType="monotone"
        />
      )}
    </Card>
  );
}
