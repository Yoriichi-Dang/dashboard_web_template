import { HomeFeatures, HomeHero, HomeStats } from '@/widgets/home';

export default function HomePage() {
  return (
    <div className='container mx-auto space-y-8 py-8'>
      <HomeHero />
      <HomeStats />
      <HomeFeatures />
    </div>
  );
}
