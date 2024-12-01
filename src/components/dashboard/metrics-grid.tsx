import { BadgeDelta, Card, Grid, Metric, Text } from '@tremor/react';

type Metric = {
  title: string;
  metric: string;
  delta?: number;
  deltaType?: 'increase' | 'decrease' | 'moderateIncrease' | 'moderateDecrease';
};

type MetricsGridProps = {
  metrics: Metric[];
};

export function MetricsGrid({ metrics }: MetricsGridProps) {
  return (
    <Grid numItemsLg={3} className="gap-6">
      {metrics.map(item => (
        <Card key={item.title}>
          <Text>{item.title}</Text>
          <Metric>{item.metric}</Metric>
          {item.delta && (
            <BadgeDelta deltaType={item.deltaType || 'increase'}>
              {item.delta > 0 ? '+' : ''}
              {item.delta}
              %
            </BadgeDelta>
          )}
        </Card>
      ))}
    </Grid>
  );
}
