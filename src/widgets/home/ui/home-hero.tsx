'use client';

import { Button } from '@/shared/components/ui/button';
import { Card, CardContent } from '@/shared/components/ui/card';

export function HomeHero() {
  return (
    <Card>
      <CardContent className='p-8'>
        <h1 className='mb-4 text-4xl font-bold'>Welcome to Dashboard</h1>
        <p className='text-muted-foreground mb-6'>
          Manage your business with our powerful dashboard
        </p>
        <Button>Get Started</Button>
      </CardContent>
    </Card>
  );
}
