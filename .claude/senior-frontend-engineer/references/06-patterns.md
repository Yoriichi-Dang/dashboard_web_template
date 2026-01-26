# Patterns & Anti-Patterns Reference

> What to do and what to avoid.

---

## COMPONENT PATTERNS

### Clean Component Template

```tsx
"use client";

import { useState, useTransition } from "react";
import { useEffectEvent } from "react";
import { cn } from "@/shared/lib/utils";

// Types at top
interface SearchProps {
  onSearch: (query: string) => Promise<void>;
  placeholder?: string;
  className?: string;
}

// Named export for better tree-shaking
export function Search({
  onSearch,
  placeholder = "Search...",
  className,
}: SearchProps) {
  // Hooks first
  const [query, setQuery] = useState("");
  const [isPending, startTransition] = useTransition();

  // Event handlers
  const handleSearch = useEffectEvent(() => {
    startTransition(async () => {
      await onSearch(query);
    });
  });

  // Render
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSearch();
      }}
      className={cn("flex gap-2", className)}
    >
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        className="flex-1 px-3 py-2 border rounded"
      />
      <button
        type="submit"
        disabled={isPending || !query.trim()}
        className="px-4 py-2 bg-primary text-primary-foreground rounded disabled:opacity-50"
      >
        {isPending ? "Searching..." : "Search"}
      </button>
    </form>
  );
}
```

### List Component with Stable Keys

```tsx
interface ListProps<T> {
  items: T[];
  keyExtractor: (item: T) => string;
  renderItem: (item: T, index: number) => React.ReactNode;
  emptyMessage?: string;
}

export function List<T>({
  items,
  keyExtractor,
  renderItem,
  emptyMessage,
}: ListProps<T>) {
  if (items.length === 0) {
    return (
      <p className="text-muted-foreground">{emptyMessage ?? "No items"}</p>
    );
  }

  return (
    <ul className="space-y-2">
      {items.map((item, index) => (
        <li key={keyExtractor(item)}>{renderItem(item, index)}</li>
      ))}
    </ul>
  );
}

// Usage — always use IDs, never index
<List
  items={users}
  keyExtractor={(user) => user.id}
  renderItem={(user) => <UserCard user={user} />}
/>;
```

### Compound Component Pattern

```tsx
// Flexible, composable API
const Card = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => (
  <div className={cn("rounded-lg border bg-card p-6", className)}>
    {children}
  </div>
);

const CardHeader = ({ children }: { children: ReactNode }) => (
  <div className="mb-4">{children}</div>
);

const CardTitle = ({ children }: { children: ReactNode }) => (
  <h3 className="text-lg font-semibold">{children}</h3>
);

const CardContent = ({ children }: { children: ReactNode }) => (
  <div>{children}</div>
);

const CardFooter = ({ children }: { children: ReactNode }) => (
  <div className="mt-4 flex justify-end gap-2">{children}</div>
);

// Attach sub-components
Card.Header = CardHeader;
Card.Title = CardTitle;
Card.Content = CardContent;
Card.Footer = CardFooter;

// Usage
<Card>
  <Card.Header>
    <Card.Title>Settings</Card.Title>
  </Card.Header>
  <Card.Content>...</Card.Content>
  <Card.Footer>
    <Button>Save</Button>
  </Card.Footer>
</Card>;
```

### Render Props Pattern

```tsx
interface FetcherProps<T> {
  url: string;
  children: (data: T, isLoading: boolean, error: Error | null) => ReactNode;
}

function Fetcher<T>({ url, children }: FetcherProps<T>) {
  const { data, isLoading, error } = useQuery<T>({
    queryKey: [url],
    queryFn: () => fetch(url).then((r) => r.json()),
  });

  return <>{children(data as T, isLoading, error)}</>;
}

// Usage
<Fetcher<User[]> url="/api/users">
  {(users, isLoading, error) => {
    if (isLoading) return <Spinner />;
    if (error) return <Error message={error.message} />;
    return <UserList users={users} />;
  }}
</Fetcher>;
```

---

## HOOK PATTERNS

### Custom Hook Template

```tsx
// hooks/useDebounce.ts
import { useState, useEffect } from "react";

export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

// Usage
const [query, setQuery] = useState("");
const debouncedQuery = useDebounce(query, 300);

useEffect(() => {
  if (debouncedQuery) {
    searchApi(debouncedQuery);
  }
}, [debouncedQuery]);
```

### useLocalStorage Hook

```tsx
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") return initialValue;

    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      setStoredValue((prev) => {
        const valueToStore = value instanceof Function ? value(prev) : value;

        if (typeof window !== "undefined") {
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
        }

        return valueToStore;
      });
    },
    [key]
  );

  return [storedValue, setValue] as const;
}
```

### useMediaQuery Hook

```tsx
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);

    setMatches(media.matches);

    const listener = (e: MediaQueryListEvent) => setMatches(e.matches);
    media.addEventListener("change", listener);

    return () => media.removeEventListener("change", listener);
  }, [query]);

  return matches;
}

// Usage
const isMobile = useMediaQuery("(max-width: 768px)");
const prefersDark = useMediaQuery("(prefers-color-scheme: dark)");
```

---

## DATA PATTERNS

### Zod Schema + Mapper

```tsx
// types/user.ts
import { z } from "zod";

// API Response (DTO)
export const UserDTOSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  first_name: z.string(),
  last_name: z.string(),
  avatar_url: z.string().url().nullable(),
  created_at: z.string().datetime(),
  is_active: z.boolean(),
});

export type UserDTO = z.infer<typeof UserDTOSchema>;

// UI Model (ViewModel)
export interface User {
  id: string;
  email: string;
  fullName: string;
  avatarUrl: string | null;
  createdAt: Date;
  isActive: boolean;
  initials: string;
}

// Mapper
export function toUser(dto: UserDTO): User {
  const fullName = `${dto.first_name} ${dto.last_name}`;
  return {
    id: dto.id,
    email: dto.email,
    fullName,
    avatarUrl: dto.avatar_url,
    createdAt: new Date(dto.created_at),
    isActive: dto.is_active,
    initials: `${dto.first_name[0]}${dto.last_name[0]}`.toUpperCase(),
  };
}

// API function with validation
export async function getUser(id: string): Promise<User> {
  const response = await fetch(`/api/users/${id}`);
  const data = await response.json();
  const validated = UserDTOSchema.parse(data); // Throws if invalid
  return toUser(validated);
}
```

### React Query Key Factory

```tsx
// features/posts/api/keys.ts
export const postKeys = {
  all: ['posts'] as const,
  lists: () => [...postKeys.all, 'list'] as const,
  list: (filters: PostFilters) => [...postKeys.lists(), filters] as const,
  details: () => [...postKeys.all, 'detail'] as const,
  detail: (id: string) => [...postKeys.details(), id] as const,
  comments: (postId: string) => [...postKeys.detail(postId), 'comments'] as const,
};

// Usage
useQuery({ queryKey: postKeys.detail(postId), ... });

// Invalidation
queryClient.invalidateQueries({ queryKey: postKeys.lists() }); // All lists
queryClient.invalidateQueries({ queryKey: postKeys.detail(id) }); // Specific post
queryClient.invalidateQueries({ queryKey: postKeys.all }); // Everything
```

---

## ANTI-PATTERNS

### ❌ State Anti-Patterns

```tsx
// ❌ Derived state in useState
const [fullName, setFullName] = useState(`${first} ${last}`);
useEffect(() => {
  setFullName(`${first} ${last}`);
}, [first, last]);

// ✅ Derive directly
const fullName = `${first} ${last}`;

// ❌ Copying props to state
function Profile({ user }: { user: User }) {
  const [name, setName] = useState(user.name); // Will get stale!
}

// ✅ Use props directly or controlled input
function Profile({ user }: { user: User }) {
  return <div>{user.name}</div>;
}

// ❌ Object/array in useState initial (new ref each render)
const [filters, setFilters] = useState({ page: 1, limit: 10 });

// ✅ Use lazy initialization or define outside
const [filters, setFilters] = useState(() => ({ page: 1, limit: 10 }));
```

### ❌ Effect Anti-Patterns

```tsx
// ❌ Missing cleanup
useEffect(() => {
  const id = setInterval(tick, 1000);
  // Memory leak!
}, []);

// ✅ Always cleanup
useEffect(() => {
  const id = setInterval(tick, 1000);
  return () => clearInterval(id);
}, []);

// ❌ Fetching without cancellation
useEffect(() => {
  fetchData().then(setData);
}, [id]);

// ✅ Handle race conditions
useEffect(() => {
  let cancelled = false;

  fetchData(id).then((data) => {
    if (!cancelled) setData(data);
  });

  return () => {
    cancelled = true;
  };
}, [id]);

// ❌ Stale closure
useEffect(() => {
  socket.on("message", () => {
    console.log(count); // Always stale!
  });
}, []);

// ✅ Use useEffectEvent
const onMessage = useEffectEvent(() => {
  console.log(count); // Always fresh
});

useEffect(() => {
  socket.on("message", onMessage);
  return () => socket.off("message", onMessage);
}, []);
```

### ❌ Render Anti-Patterns

```tsx
// ❌ Async in render
function Bad() {
  const data = await fetch("/api"); // ERROR!
}

// ✅ Use Server Component or hook
async function Good() {
  // Server Component
  const data = await fetch("/api");
}

// ❌ Inline object/function props (new ref each render)
<Child style={{ color: "red" }} onClick={() => doSomething()} />;

// ✅ Memoize or extract
const style = useMemo(() => ({ color: "red" }), []);
const handleClick = useCallback(() => doSomething(), []);
<Child style={style} onClick={handleClick} />;

// ❌ Index as key
{
  items.map((item, i) => <Item key={i} />);
}

// ✅ Stable unique ID
{
  items.map((item) => <Item key={item.id} />);
}

// ❌ Unstable component definition inside render
function Parent() {
  function Child() {
    // New component every render!
    return <div />;
  }
  return <Child />;
}

// ✅ Define outside or use useMemo for dynamic cases
function Child() {
  return <div />;
}
function Parent() {
  return <Child />;
}
```

### ❌ Performance Anti-Patterns

```tsx
// ❌ Premature optimization
const value = useMemo(() => a + b, [a, b]); // Simple math!

// ✅ Only memoize expensive operations (measure first!)
const sorted = useMemo(
  () => largeArray.toSorted((a, b) => a.name.localeCompare(b.name)),
  [largeArray]
);

// ❌ Memoizing everything
const MemoAll = memo(({ children }) => <div>{children}</div>);

// ✅ Memo components that:
// - Render often with same props
// - Are expensive to render
// - Are in lists

// ❌ Context for frequently changing values
<MouseContext.Provider value={{ x, y }}> // Re-renders entire tree!

// ✅ Use state management (Zustand) or split context
```

### ❌ TypeScript Anti-Patterns

```tsx
// ❌ Using `any`
const data: any = await fetch();

// ✅ Type properly
const data: User = await fetchUser();

// ❌ Type assertions without validation
const user = data as User;

// ✅ Validate with Zod
const user = UserSchema.parse(data);

// ❌ Optional chaining everywhere
const name = user?.profile?.name ?? "Unknown";

// ✅ Proper null checks and types
if (!user) return <NotFound />;
return <Profile user={user} />; // user is guaranteed
```

---

## DECISION TREES

### Component Type

```
Need interactivity (state, effects, events)?
├─ Yes → 'use client'
└─ No → Server Component (default)

Does the client component need to be small?
├─ Yes → Extract only interactive part to 'use client'
└─ No → Whole component as 'use client'
```

### State Management

```
What type of data?
├─ Server data → React Query
├─ URL state → nuqs / searchParams
├─ Form data → react-hook-form
├─ Local UI → useState
└─ Shared UI
    ├─ Rarely changes → Context
    └─ Frequently changes → Zustand
```

### Memoization

```
Should I memoize?
├─ Is it measurably slow? (Profiler)
│   ├─ No → Don't memoize
│   └─ Yes → Continue
├─ Expensive calculation? → useMemo
├─ Function passed to memo child? → useCallback
└─ Component re-renders with same props? → memo()
```

### Data Fetching

```
Where to fetch?
├─ Static/SSG page → Server Component
├─ Dynamic/SSR page → Server Component
├─ Client interactivity needed → React Query
├─ Form submission → Server Action
└─ Real-time updates → Client + WebSocket
```
