'use client';

import { OrganizationProfile } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import { useTheme } from 'next-themes';

import PageContainer from '@/shared/components/layout/page-container';

export default function TeamPage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <PageContainer
      pageTitle='Team Management'
      pageDescription='Manage your workspace team, members, roles, security and more.'
    >
      <OrganizationProfile
        appearance={{
          baseTheme: isDark ? dark : undefined
        }}
      />
    </PageContainer>
  );
}
