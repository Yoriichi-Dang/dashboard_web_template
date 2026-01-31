# Performance Optimization Guide

> Production-grade performance patterns for React 19.2 + Next.js 16

---

## PERFORMANCE METRICS

### Core Web Vitals

| Metric | Target | Critical | What It Measures |
|--------|--------|----------|------------------|
| **LCP** (Largest Contentful Paint) | < 2.5s | < 4.0s | Loading performance |
| **FID** (First Input Delay) | < 100ms | < 300ms | Interactivity |
| **CLS** (Cumulative Layout Shift) | < 0.1 | < 0.25 | Visual stability |
| **INP** (Interaction to Next Paint) | < 200ms | < 500ms | Responsiveness 🆕 |
| **TTFB** (Time to First Byte) | < 800ms | < 1800ms | Server response |

### Additional Metrics

- **FCP** (First Contentful Paint): < 1.8s
- **TTI** (Time to Interactive): < 3.8s
- **TBT** (Total Blocking Time): < 200ms
- **Bundle Size**: < 200KB (initial load)

---

## BUNDLE OPTIMIZATION

### Code Splitting

```tsx
// ✅ Route-based splitting (automatic with App Router)
// app/dashboard/page.tsx
export default function Dashboard() {
  return <DashboardContent />; // Auto code-split
}

// ✅ Component-based splitting
import { lazy, Suspense } from 'react';

const HeavyChart = lazy(() => import('@/features/analytics/Chart'));
const HeavyEditor = lazy(() => import('@/features/posts/RichEditor'));

function Dashboard() {
  return (
    <div>
      <Suspense fallback={<ChartSkeleton />}>
        <HeavyChart data={data} />
      </Suspense>
      
      <Suspense fallback={<EditorSkeleton />}>
        <HeavyEditor />
      </Suspense>
    </div>
  );
}

// ✅ Conditional loading (load only when needed)
function AdminPanel() {
  const [showAdvanced, setShowAdvanced] = useState(false);

  return (
    <>
      <button onClick={() => setShowAdvanced(true)}>
        Advanced Settings
      </button>
      
      {showAdvanced && (
        <Suspense fallback={<Spinner />}>
          <AdvancedSettings />
        </Suspense>
      )}
    </>
  );
}

// ❌ BAD: Import everything upfront
import Chart from 'recharts'; // 200KB
import Editor from '@tiptap/react'; // 300KB
```

### Tree Shaking

```tsx
// ✅ GOOD: Named imports
import { Button, Card } from '@/shared/ui';

// ❌ BAD: Default import of barrel file
import * as UI from '@/shared/ui'; // Imports everything!

// ✅ GOOD: Selective lodash imports
import debounce from 'lodash/debounce';
import throttle from 'lodash/throttle';

// ❌ BAD: Import entire lodash
import _ from 'lodash'; // 71KB!

// next.config.ts - Enable tree shaking
export default {
  experimental: {
    optimizePackageImports: ['@/shared/ui', 'lucide-react', 'date-fns'],
  },
};
```

### Bundle Analysis

```bash
# Install
npm install -D @next/bundle-analyzer

# next.config.ts
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  // your config
});

# Run analysis
ANALYZE=true npm run build
```

---

## IMAGE OPTIMIZATION

### Next.js Image Component

```tsx
import Image from 'next/image';

// ✅ GOOD: Optimized with priority for LCP
function Hero() {
  return (
    <Image
      src="/hero.jpg"
      alt="Hero image"
      width={1200}
      height={600}
      priority // Load immediately (above fold)
      quality={90}
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,/9j/4AAQ..." // Generated at build
    />
  );
}

// ✅ GOOD: Lazy load below-fold images
function Gallery({ images }: { images: string[] }) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {images.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt={`Gallery image ${i + 1}`}
          width={400}
          height={300}
          loading="lazy" // Default behavior
          sizes="(max-width: 768px) 100vw, 33vw" // Responsive sizes
        />
      ))}
    </div>
  );
}

// ✅ GOOD: Remote images with domain config
// next.config.ts
export default {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.example.com',
        pathname: '/images/**',
      },
    ],
    formats: ['image/avif', 'image/webp'], // Modern formats
  },
};

// ❌ BAD: Using <img> tag
<img src="/photo.jpg" /> // No optimization!
```

### Image Loading Strategies

```tsx
// LCP image (hero, banner)
<Image priority quality={90} />

// Above-fold but not LCP
<Image loading="eager" quality={85} />

// Below-fold (default)
<Image loading="lazy" quality={75} />

// Thumbnails/avatars
<Image quality={60} sizes="100px" />
```

---

## FONT OPTIMIZATION

### Next.js Font Optimization

```tsx
// app/layout.tsx
import { Inter, Playfair_Display } from 'next/font/google';

// ✅ Variable font (best performance)
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap', // Prevent FOIT (Flash of Invisible Text)
  preload: true,
});

// ✅ Static font with specific weights
const playfair = Playfair_Display({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}

// tailwind.config.ts
export default {
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)'],
        serif: ['var(--font-playfair)'],
      },
    },
  },
};

// ❌ BAD: External stylesheet
<link href="https://fonts.googleapis.com/css2?family=Inter" rel="stylesheet" />
// - Adds extra network request
// - Can't be preloaded
// - FOIT/FOUT issues
```

---

## REACT PERFORMANCE PATTERNS

### Memoization Guidelines

```tsx
// ✅ GOOD: Memo expensive pure components
const ExpensiveList = memo(function ExpensiveList({ items }: Props) {
  const sorted = items.toSorted((a, b) => a.name.localeCompare(b.name));
  
  return (
    <ul>
      {sorted.map(item => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
});

// ✅ GOOD: useMemo for expensive calculations
function DataGrid({ data }: { data: Item[] }) {
  const filtered = useMemo(
    () => data.filter(item => item.status === 'active'),
    [data]
  );
  
  const sorted = useMemo(
    () => filtered.toSorted((a, b) => b.date - a.date),
    [filtered]
  );
  
  return <Table data={sorted} />;
}

// ✅ GOOD: useCallback for stable function refs
function Parent() {
  const [filter, setFilter] = useState('');
  
  const handleFilter = useCallback((value: string) => {
    setFilter(value);
    analytics.track('filter', { value });
  }, []); // Stable reference
  
  return <MemoizedChild onFilter={handleFilter} />;
}

// ❌ BAD: Premature optimization
const sum = useMemo(() => a + b, [a, b]); // Simple math!

// ❌ BAD: Inline objects/functions to memo children
<MemoizedChild 
  onClick={() => {}} // New function every render!
  style={{ color: 'red' }} // New object every render!
/>
```

### Virtual Scrolling (Large Lists)

```tsx
import { useVirtualizer } from '@tanstack/react-virtual';

function VirtualList({ items }: { items: Item[] }) {
  const parentRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 50, // Row height estimate
    overscan: 5, // Render extra rows
  });

  return (
    <div
      ref={parentRef}
      className="h-[600px] overflow-auto"
    >
      <div
        style={{
          height: `${virtualizer.getTotalSize()}px`,
          position: 'relative',
        }}
      >
        {virtualizer.getVirtualItems().map(virtualRow => (
          <div
            key={virtualRow.index}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: `${virtualRow.size}px`,
              transform: `translateY(${virtualRow.start}px)`,
            }}
          >
            <ItemCard item={items[virtualRow.index]} />
          </div>
        ))}
      </div>
    </div>
  );
}

// Only renders ~15 rows for 10,000 items!
```

### useTransition for Heavy Updates

```tsx
function SearchResults() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Item[]>([]);
  const [isPending, startTransition] = useTransition();

  function handleSearch(value: string) {
    setQuery(value); // Urgent: update input immediately
    
    startTransition(() => {
      // Deferred: can be interrupted by user typing
      const filtered = hugeDataset.filter(item =>
        item.name.toLowerCase().includes(value.toLowerCase())
      );
      setResults(filtered);
    });
  }

  return (
    <>
      <input
        value={query}
        onChange={e => handleSearch(e.target.value)}
      />
      
      <div style={{ opacity: isPending ? 0.6 : 1 }}>
        <ResultsList results={results} />
      </div>
    </>
  );
}
```

---

## DATA FETCHING OPTIMIZATION

### React Query Configuration

```tsx
// app/providers.tsx
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (was cacheTime)
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

// Prefetch critical data
export async function prefetchPosts() {
  await queryClient.prefetchQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  });
}
```

### Parallel Data Fetching

```tsx
// ✅ GOOD: Parallel fetching
async function Dashboard() {
  const [user, posts, analytics] = await Promise.all([
    getUser(),
    getPosts(),
    getAnalytics(),
  ]);

  return (
    <>
      <UserCard user={user} />
      <PostList posts={posts} />
      <AnalyticsChart data={analytics} />
    </>
  );
}

// ❌ BAD: Sequential (waterfall)
async function Dashboard() {
  const user = await getUser();
  const posts = await getPosts(); // Waits for user!
  const analytics = await getAnalytics(); // Waits for posts!
}
```

### Streaming with Suspense

```tsx
// app/dashboard/page.tsx
export default function DashboardPage() {
  return (
    <div>
      <UserInfo /> {/* Renders immediately */}
      
      <Suspense fallback={<PostsSkeleton />}>
        <Posts /> {/* Streams in */}
      </Suspense>
      
      <Suspense fallback={<AnalyticsSkeleton />}>
        <Analytics /> {/* Streams in independently */}
      </Suspense>
    </div>
  );
}
```

---

## CACHING STRATEGIES

### Next.js 16 Cache Profiles

```tsx
// Short-lived data (seconds)
async function getStockPrice() {
  'use cache';
  cacheLife('seconds');
  return await fetch('https://api.stocks.com/price');
}

// Medium-lived data (hours)
async function getBlogPosts() {
  'use cache';
  cacheLife('hours');
  cacheTag('blog-posts');
  return await db.post.findMany();
}

// Long-lived data (days)
async function getStaticContent() {
  'use cache';
  cacheLife('days');
  return await db.page.findUnique({ where: { slug: 'about' } });
}

// Custom profile
async function getAnalytics() {
  'use cache';
  cacheLife({
    stale: 60,        // Serve stale for 60s
    revalidate: 300,  // Revalidate after 5min
    expire: 3600,     // Expire after 1hr
  });
  return await fetchAnalytics();
}
```

### Client-Side Caching

```tsx
// React Query aggressive caching
export function usePosts() {
  return useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
    staleTime: 10 * 60 * 1000, // Consider fresh for 10min
    gcTime: 30 * 60 * 1000,    // Keep in cache for 30min
  });
}

// SWR with revalidation
import useSWR from 'swr';

export function useUser(id: string) {
  return useSWR(
    `/api/users/${id}`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      dedupingInterval: 5000,
    }
  );
}
```

---

## RENDERING OPTIMIZATION

### Partial Prerendering (PPR)

```tsx
// next.config.ts
export default {
  experimental: {
    ppr: true,
  },
};

// app/product/[id]/page.tsx
export default async function ProductPage({ params }: Props) {
  return (
    <div>
      {/* Static shell (prerendered) */}
      <StaticHeader />
      <StaticNavigation />
      
      {/* Dynamic content (streamed) */}
      <Suspense fallback={<ProductSkeleton />}>
        <DynamicProductInfo id={params.id} />
      </Suspense>
      
      <Suspense fallback={<ReviewsSkeleton />}>
        <DynamicReviews id={params.id} />
      </Suspense>
      
      {/* Static footer (prerendered) */}
      <StaticFooter />
    </div>
  );
}
```

### Incremental Static Regeneration

```tsx
// Revalidate every 60 seconds
export const revalidate = 60;

export default async function BlogPost({ params }: Props) {
  const post = await getPost(params.slug);
  return <Article post={post} />;
}

// On-demand revalidation
import { revalidateTag } from 'next/cache';

export async function updatePost(id: string) {
  'use server';
  
  await db.post.update({ where: { id } });
  
  revalidateTag(`post-${id}`);
  revalidateTag('posts-list');
}
```

---

## NETWORK OPTIMIZATION

### Resource Hints

```tsx
// app/layout.tsx
export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        {/* Preconnect to critical origins */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://cdn.example.com" />
        
        {/* Preload critical resources */}
        <link
          rel="preload"
          href="/fonts/inter-var.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

### Compression

```tsx
// next.config.ts
export default {
  compress: true, // Enable gzip
  
  // Or use advanced compression
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Encoding',
            value: 'br', // Brotli (better than gzip)
          },
        ],
      },
    ];
  },
};
```

---

## MONITORING & PROFILING

### Web Vitals Reporting

```tsx
// app/layout.tsx
import { sendToAnalytics } from '@/lib/analytics';
import { useReportWebVitals } from 'next/web-vitals';

export function WebVitals() {
  useReportWebVitals((metric) => {
    sendToAnalytics({
      name: metric.name,
      value: metric.value,
      id: metric.id,
      label: metric.label,
    });
  });
  
  return null;
}
```

### React Profiler

```tsx
import { Profiler } from 'react';

function Dashboard() {
  return (
    <Profiler id="Dashboard" onRender={onRenderCallback}>
      <DashboardContent />
    </Profiler>
  );
}

function onRenderCallback(
  id: string,
  phase: 'mount' | 'update',
  actualDuration: number,
  baseDuration: number,
  startTime: number,
  commitTime: number
) {
  if (actualDuration > 16) { // Slower than 60fps
    console.warn(`${id} took ${actualDuration}ms to render`);
  }
}
```

### Performance Budget

```json
// budget.json
[
  {
    "path": "/_next/static/**",
    "resourceSizes": [
      { "resourceType": "script", "budget": 200000 },
      { "resourceType": "stylesheet", "budget": 50000 }
    ]
  }
]
```

---

## PERFORMANCE CHECKLIST

```
Bundle Size:
□ Initial JS < 200KB
□ CSS < 50KB
□ Tree-shaking enabled
□ Code splitting implemented
□ No duplicate dependencies

Images:
□ Using Next.js Image component
□ Priority set for LCP images
□ Modern formats (AVIF, WebP)
□ Responsive sizes configured
□ Lazy loading below fold

Fonts:
□ Using next/font
□ font-display: swap
□ Subset to needed characters
□ Preloaded critical fonts

Rendering:
□ Server Components default
□ 'use client' minimized
□ Suspense boundaries strategic
□ PPR for hybrid content

Caching:
□ React Query configured
□ ISR for semi-static content
□ Cache tags for invalidation
□ Aggressive staleTime

Performance:
□ Core Web Vitals passing
□ React.memo used wisely
□ Virtual scrolling for long lists
□ useTransition for heavy updates

Monitoring:
□ Web Vitals tracking
□ Error tracking
□ Performance budgets
□ Regular Lighthouse audits
```
