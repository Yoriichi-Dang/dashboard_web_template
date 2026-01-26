# React 19.2 — Components & APIs Reference

---

## COMPONENTS

### Activity 🆕

```tsx
<Activity mode={tab === "a" ? "visible" : "hidden"}>
  <TabA /> {/* State preserved when hidden */}
</Activity>
```

Modes: `'visible'` (shows, mounts effects) | `'hidden'` (display:none, unmounts effects)

### Suspense

```tsx
<Suspense fallback={<Skeleton />}>
  <AsyncComponent />
</Suspense>
```

### Fragment

```tsx
<>{children}</> // or <Fragment key={id}> in lists
```

### StrictMode

```tsx
<StrictMode>
  <App />
</StrictMode>
```

### Profiler

```tsx
<Profiler id="Nav" onRender={(id, phase, duration) => log(duration)}>
  <Navigation />
</Profiler>
```

### Error Boundary

```tsx
class ErrorBoundary extends Component {
  state = { hasError: false };
  static getDerivedStateFromError(e) {
    return { hasError: true };
  }
  componentDidCatch(e, info) {
    logError(e, info.componentStack);
  }
  render() {
    return this.state.hasError ? <Fallback /> : this.props.children;
  }
}
```

---

## APIS

### memo()

```tsx
const Memoized = memo(Component);
const MemoizedCustom = memo(Component, (prev, next) => prev.id === next.id);
```

### forwardRef()

```tsx
const Input = forwardRef<HTMLInputElement, Props>((props, ref) => (
  <input ref={ref} {...props} />
));
```

### lazy()

```tsx
const Heavy = lazy(() => import("./Heavy"));
<Suspense fallback={<Skel />}>
  <Heavy />
</Suspense>;
```

### createContext()

```tsx
const Ctx = createContext<Type | null>(null);
function useCtx() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("Missing Provider");
  return ctx;
}
```

### cache() (RSC)

```tsx
export const getUser = cache(async (id) => await db.user.find(id));
```

### cacheSignal() 🆕 (RSC)

```tsx
const signal = cacheSignal();
signal.addEventListener("abort", () => cleanup());
```

---

## DIRECTIVES

### 'use client'

```tsx
"use client";
// Required for: useState, useEffect, onClick, browser APIs
```

### 'use server'

```tsx
'use server';
export async function action(fd: FormData) { ... }
```
