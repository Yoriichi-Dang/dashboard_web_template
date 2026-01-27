'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/shared/components/ui/card';

export function HomeStats() {
  const stats = [
    { label: 'Total Users', value: '10,234' },
    { label: 'Active Projects', value: '156' },
    { label: 'Revenue', value: '$45,678' }
  ];

  return (
    <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
      {stats.map((stat) => (
        <Card key={stat.label}>
          <CardHeader>
            <CardTitle className='text-muted-foreground text-sm font-medium'>
              {stat.label}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
