'use client';

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/shared/components/ui/card';

export function HomeFeatures() {
  const features = [
    {
      title: 'Analytics',
      description: 'Track your business metrics in real-time'
    },
    {
      title: 'Team Management',
      description: 'Manage your team and collaborate effectively'
    },
    {
      title: 'Security',
      description: 'Enterprise-grade security for your data'
    }
  ];

  return (
    <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
      {features.map((feature) => (
        <Card key={feature.title}>
          <CardHeader>
            <CardTitle>{feature.title}</CardTitle>
            <CardDescription>{feature.description}</CardDescription>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}
