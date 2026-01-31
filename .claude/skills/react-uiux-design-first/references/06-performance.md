# Rule 6: Performance by Default

## Core Principle

> Performance is the default, not an afterthought. Build fast from the start.

---

## Performance Checklist

| Optimization | When to Use |
|--------------|-------------|
| `React.lazy()` | Heavy components (>50KB) |
| `useMemo` | Expensive computations |
| `useCallback` | Handlers passed to children |
| `React.memo` | Pure components that re-render often |
| Suspense | Data fetching boundaries |
| Virtualization | Lists >100 items |

---

## Lazy Loading

### When to Lazy Load

- Route components
- Heavy libraries (charts, editors, data grids)
- Below-the-fold content
- Modal/dialog content
- Features behind feature flags

### Pattern

```tsx
import React, { lazy, Suspense } from 'react';

// Lazy load heavy components
const Chart = lazy(() => import('./Chart'));
const DataGrid = lazy(() => import('./DataGrid'));
const RichTextEditor = lazy(() => import('./RichTextEditor'));

// Usage with Suspense
const Dashboard = () => (
  <div>
    <Header /> {/* Loads immediately */}

    <Suspense fallback={<ChartSkeleton />}>
      <Chart />
    </Suspense>

    <Suspense fallback={<DataGridSkeleton />}>
      <DataGrid />
    </Suspense>
  </div>
);
```

### Named Exports with Lazy

```tsx
// For named exports
const Chart = lazy(() =>
  import('./Chart').then(module => ({ default: module.Chart }))
);
```

---

## useMemo

### When to Use

- Filtering/sorting large arrays
- Complex calculations
- Creating objects passed to dependencies
- Derived state from props

```tsx
// ❌ Recalculates on every render
const filteredUsers = users.filter(u => u.active).sort((a, b) => a.name.localeCompare(b.name));

// ✅ Only recalculates when users change
const filteredUsers = useMemo(() =>
  users.filter(u => u.active).sort((a, b) => a.name.localeCompare(b.name)),
  [users]
);
```

### Examples

```tsx
// Expensive computation
const stats = useMemo(() => {
  return {
    total: items.length,
    active: items.filter(i => i.active).length,
    average: items.reduce((sum, i) => sum + i.value, 0) / items.length,
  };
}, [items]);

// Object for dependency
const queryOptions = useMemo(() => ({
  enabled: !!userId,
  staleTime: 5000,
}), [userId]);

const { data } = useQuery({
  queryKey: ['user', userId],
  queryFn: () => fetchUser(userId),
  ...queryOptions,
});
```

---

## useCallback

### When to Use

- Event handlers passed to child components
- Handlers used in useEffect dependencies
- Callbacks for custom hooks

```tsx
// ❌ Creates new function on every render
<ChildComponent onSelect={item => setSelected(item)} />

// ✅ Stable reference
const handleSelect = useCallback((item) => {
  setSelected(item);
}, []); // or [setSelected] if needed

<ChildComponent onSelect={handleSelect} />
```

### Common Pattern

```tsx
const UserList = ({ onUserSelect }) => {
  // Stable handlers
  const handleEdit = useCallback((user) => {
    setEditingUser(user);
  }, []);

  const handleDelete = useCallback((userId) => {
    deleteMutation.mutate(userId);
  }, [deleteMutation]);

  const handleSelect = useCallback((user) => {
    onUserSelect?.(user);
  }, [onUserSelect]);

  return (
    <div>
      {users.map(user => (
        <UserRow
          key={user.id}
          user={user}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onSelect={handleSelect}
        />
      ))}
    </div>
  );
};
```

---

## React.memo

### When to Use

- Component renders often with same props
- Rendering is expensive
- Parent re-renders frequently

```tsx
// Memoize expensive component
const UserRow = React.memo(({ user, onSelect }) => {
  console.log('UserRow render', user.id);

  return (
    <div onClick={() => onSelect(user)}>
      <Avatar src={user.avatar} />
      <span>{user.name}</span>
    </div>
  );
});

// With custom comparison
const UserRow = React.memo(
  ({ user, onSelect }) => (
    <div onClick={() => onSelect(user)}>
      <span>{user.name}</span>
    </div>
  ),
  (prevProps, nextProps) => prevProps.user.id === nextProps.user.id
);
```

---

## Virtualization

### When to Use

- Lists with 100+ items
- Tables with many rows
- Grid layouts with many items

```tsx
import { useVirtualizer } from '@tanstack/react-virtual';

const VirtualList = ({ items }) => {
  const parentRef = useRef(null);

  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 50, // Estimated row height
  });

  return (
    <div ref={parentRef} className="h-[400px] overflow-auto">
      <div
        style={{
          height: `${virtualizer.getTotalSize()}px`,
          position: 'relative',
        }}
      >
        {virtualizer.getVirtualItems().map((virtualRow) => (
          <div
            key={virtualRow.key}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              transform: `translateY(${virtualRow.start}px)`,
            }}
          >
            <ListItem item={items[virtualRow.index]} />
          </div>
        ))}
      </div>
    </div>
  );
};
```

---

## Debouncing

### Search Input

```tsx
import { useDeferredValue, useState } from 'react';

const SearchList = () => {
  const [search, setSearch] = useState('');
  const deferredSearch = useDeferredValue(search);

  const filteredItems = useMemo(() =>
    items.filter(item =>
      item.name.toLowerCase().includes(deferredSearch.toLowerCase())
    ),
    [deferredSearch, items]
  );

  return (
    <div>
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search..."
      />
      <List items={filteredItems} />
    </div>
  );
};
```

### Custom Debounce Hook

```tsx
const useDebounce = <T,>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
};

// Usage
const SearchInput = () => {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 300);

  useEffect(() => {
    if (debouncedSearch) {
      fetchResults(debouncedSearch);
    }
  }, [debouncedSearch]);
};
```

---

## Bundle Size

### Code Splitting by Route

```tsx
// routes.tsx
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Settings = lazy(() => import('./pages/Settings'));
const Analytics = lazy(() => import('./pages/Analytics'));

const routes = [
  { path: '/', element: <Dashboard /> },
  { path: '/settings', element: <Settings /> },
  { path: '/analytics', element: <Analytics /> },
];
```

### Import Only What You Need

```tsx
// ❌ Imports entire library
import { format, parse, add, sub, ... } from 'date-fns';

// ✅ Import only needed functions
import { format } from 'date-fns/format';
import { parseISO } from 'date-fns/parseISO';
```

---

## Anti-Patterns

```tsx
// ❌ No memoization on expensive calculation
const sorted = items.sort((a, b) => expensiveCompare(a, b));

// ✅ Memoized
const sorted = useMemo(() =>
  [...items].sort((a, b) => expensiveCompare(a, b)),
  [items]
);


// ❌ Inline function recreated every render
{items.map(item => (
  <Item key={item.id} onClick={() => handleClick(item)} />
))}

// ✅ Stable callback
const handleItemClick = useCallback((item) => {
  // handle click
}, []);

{items.map(item => (
  <Item key={item.id} item={item} onClick={handleItemClick} />
))}


// ❌ Loading entire heavy component upfront
import HeavyChart from './HeavyChart';

// ✅ Lazy load
const HeavyChart = lazy(() => import('./HeavyChart'));


// ❌ Rendering 1000 items
{items.map(item => <Row item={item} />)}

// ✅ Virtualized list
<VirtualizedList items={items} />
```

---

## Performance Monitoring

```tsx
// React DevTools Profiler
// - Enable "Record why each component rendered"
// - Look for unnecessary re-renders

// Performance marks
const startTime = performance.now();
// ... operation
const endTime = performance.now();
console.log(`Operation took ${endTime - startTime}ms`);

// React.Profiler
<Profiler id="List" onRender={(id, phase, actualDuration) => {
  console.log(`${id} ${phase} took ${actualDuration}ms`);
}}>
  <List />
</Profiler>
```

---

## Checklist

- [ ] Heavy components are lazy loaded
- [ ] Expensive computations use useMemo
- [ ] Handlers passed to children use useCallback
- [ ] Lists >100 items are virtualized
- [ ] Search inputs are debounced
- [ ] Bundle size is monitored
- [ ] No unnecessary re-renders

---

## Summary

1. **Lazy load** heavy components and routes
2. **useMemo** for expensive computations
3. **useCallback** for handlers passed to children
4. **React.memo** for expensive pure components
5. **Virtualize** long lists
6. **Debounce** search and filter inputs
7. Performance is **default**, not optimization
