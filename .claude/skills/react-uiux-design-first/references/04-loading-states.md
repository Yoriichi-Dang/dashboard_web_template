# Rule 4: Loading States

## Core Principle

> User must ALWAYS know what the app is doing. Never show blank screens.

---

## Loading Hierarchy

| Priority | Method | When to Use |
|----------|--------|-------------|
| 1st | Skeleton | Content structure is predictable |
| 2nd | Spinner + Text | Action in progress (submit, save) |
| 3rd | Progress Bar | Long operations with known progress |
| 4th | Full page loader | Initial app load only |

---

## Skeleton Loading (Preferred)

### Why Skeleton?
- Shows content structure before data arrives
- Reduces perceived loading time
- Prevents layout shift
- Better UX than spinner

### Basic Skeleton

```tsx
// Skeleton component
const Skeleton = ({ className }: { className?: string }) => (
  <div
    className={cn(
      "animate-pulse rounded-md bg-muted",
      className
    )}
  />
);

// Usage
<Skeleton className="h-4 w-[200px]" />
<Skeleton className="h-4 w-full" />
<Skeleton className="h-10 w-10 rounded-full" />
```

### Card Skeleton

```tsx
const CardSkeleton = () => (
  <Card className="p-6">
    {/* Avatar + Name */}
    <div className="flex items-center gap-4 mb-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[150px]" />
        <Skeleton className="h-3 w-[100px]" />
      </div>
    </div>

    {/* Content lines */}
    <div className="space-y-2">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
    </div>

    {/* Action */}
    <div className="mt-6">
      <Skeleton className="h-10 w-24" />
    </div>
  </Card>
);
```

### Table Skeleton

```tsx
const TableSkeleton = ({ rows = 5 }: { rows?: number }) => (
  <div className="space-y-3">
    {/* Header */}
    <div className="flex gap-4 pb-2 border-b">
      <Skeleton className="h-4 w-[100px]" />
      <Skeleton className="h-4 w-[150px]" />
      <Skeleton className="h-4 w-[200px]" />
      <Skeleton className="h-4 w-[80px]" />
    </div>

    {/* Rows */}
    {Array.from({ length: rows }).map((_, i) => (
      <div key={i} className="flex gap-4 py-2">
        <Skeleton className="h-4 w-[100px]" />
        <Skeleton className="h-4 w-[150px]" />
        <Skeleton className="h-4 w-[200px]" />
        <Skeleton className="h-4 w-[80px]" />
      </div>
    ))}
  </div>
);
```

### List Skeleton

```tsx
const ListSkeleton = ({ items = 3 }: { items?: number }) => (
  <div className="space-y-4">
    {Array.from({ length: items }).map((_, i) => (
      <div key={i} className="flex items-center gap-3">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      </div>
    ))}
  </div>
);
```

---

## Region-Based Loading

> Load by section, not entire page.

```tsx
const Dashboard = () => {
  return (
    <div className="grid grid-cols-12 gap-6">
      {/* Stats - loads independently */}
      <div className="col-span-12">
        <Suspense fallback={<StatsSkeleton />}>
          <StatsSection />
        </Suspense>
      </div>

      {/* Chart - loads independently */}
      <div className="col-span-8">
        <Suspense fallback={<ChartSkeleton />}>
          <ChartSection />
        </Suspense>
      </div>

      {/* Sidebar - loads independently */}
      <div className="col-span-4">
        <Suspense fallback={<SidebarSkeleton />}>
          <SidebarSection />
        </Suspense>
      </div>
    </div>
  );
};
```

---

## Loading Types

### 1. Initial Load (First Visit)

```tsx
// Page level
const Page = () => {
  const { data, isLoading } = useQuery(...);

  if (isLoading) {
    return <PageSkeleton />;
  }

  return <PageContent data={data} />;
};
```

### 2. Submit/Action Loading

```tsx
const Form = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await submitData();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form>
      {/* Form fields */}
      <Button disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Saving...
          </>
        ) : (
          'Save'
        )}
      </Button>
    </form>
  );
};
```

### 3. Background Refresh

```tsx
const DataList = () => {
  const { data, isLoading, isFetching } = useQuery(...);

  return (
    <div className="relative">
      {/* Subtle indicator for background refresh */}
      {isFetching && !isLoading && (
        <div className="absolute top-0 right-0">
          <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
        </div>
      )}

      {isLoading ? (
        <ListSkeleton />
      ) : (
        <List data={data} />
      )}
    </div>
  );
};
```

### 4. Infinite Scroll Loading

```tsx
const InfiniteList = () => {
  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(...);

  return (
    <div>
      {data.pages.map(page => (
        <Items key={page.cursor} items={page.items} />
      ))}

      {isFetchingNextPage && (
        <div className="py-4 flex justify-center">
          <Loader2 className="w-6 h-6 animate-spin" />
        </div>
      )}

      <IntersectionTrigger onVisible={fetchNextPage} />
    </div>
  );
};
```

---

## Prevent Layout Shift

```tsx
// ❌ Bad: Different heights cause shift
{isLoading ? (
  <div className="h-4" /> // Different height
) : (
  <div className="h-[200px]">Content</div>
)}

// ✅ Good: Same container size
<div className="h-[200px]">
  {isLoading ? (
    <Skeleton className="h-full w-full" />
  ) : (
    <Content />
  )}
</div>

// ✅ Better: Use min-height
<div className="min-h-[200px]">
  {isLoading ? <Skeleton /> : <Content />}
</div>
```

---

## Loading Timing

| Scenario | Show Loading After |
|----------|-------------------|
| Fast networks | 200ms delay (avoid flash) |
| Interactive elements | Immediately |
| Page navigation | Immediately |
| Background refresh | Don't block UI |

```tsx
// Delayed loading to avoid flash
const useDelayedLoading = (isLoading: boolean, delay = 200) => {
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => setShowLoading(true), delay);
      return () => clearTimeout(timer);
    } else {
      setShowLoading(false);
    }
  }, [isLoading, delay]);

  return showLoading;
};
```

---

## Anti-Patterns

```tsx
// ❌ Blank screen
{isLoading && null}

// ✅ Always show something
{isLoading && <Skeleton />}


// ❌ Full page spinner for partial data
{isLoading && <FullPageSpinner />}

// ✅ Load sections independently
<Suspense fallback={<SectionSkeleton />}>
  <Section />
</Suspense>


// ❌ No loading feedback on button
<Button onClick={handleSubmit}>Submit</Button>

// ✅ Loading state on button
<Button onClick={handleSubmit} disabled={isSubmitting}>
  {isSubmitting ? 'Saving...' : 'Submit'}
</Button>


// ❌ Layout shift on load
{data ? <LargeContent data={data} /> : <SmallLoader />}

// ✅ Preserved layout
<div className="min-h-[400px]">
  {data ? <LargeContent data={data} /> : <ContentSkeleton />}
</div>
```

---

## Checklist

- [ ] No blank screens during loading
- [ ] Using skeletons for content loading
- [ ] Spinners for actions (submit, save)
- [ ] Loading by region, not full page
- [ ] No layout shift when content loads
- [ ] Button shows loading state during submit
- [ ] Background refresh doesn't block UI
- [ ] Loading indicator within 200ms

---

## Summary

1. **Skeleton > Spinner** for content loading
2. **Never blank screen** - always show something
3. **Load by region** - not entire page
4. **Prevent layout shift** - maintain container size
5. **User always knows** what's happening
