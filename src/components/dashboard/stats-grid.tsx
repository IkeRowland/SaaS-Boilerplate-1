import { Card, DeltaBar, Grid, Metric, Title } from '@tremor/react';

type Stat = {
  title: string;
  metric: string;
  delta?: number;
  deltaType?: 'increase' | 'decrease' | 'moderateIncrease' | 'moderateDecrease';
};

type StatsGridProps = {
  stats: Stat[];
};

export function StatsGrid({ stats }: StatsGridProps) {
  return (
    <Grid numItemsLg={3} className="gap-6">
      {stats.map(stat => (
        <Card key={stat.title}>
          <Title>{stat.title}</Title>
          <Metric>{stat.metric}</Metric>
          {stat.delta && (
            <DeltaBar
              value={stat.delta}
              deltaType={stat.deltaType}
              className="mt-3"
            />
          )}
        </Card>
      ))}
    </Grid>
  );
}
