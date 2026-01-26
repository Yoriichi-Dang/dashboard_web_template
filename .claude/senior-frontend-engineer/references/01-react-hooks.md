# React 19.2 — Hooks Reference

> All hooks with usage patterns and examples.

---

## STATE HOOKS

### useState

```tsx
// Simple state
const [count, setCount] = useState(0);

// With type
const [user, setUser] = useState<User | null>(null);

// Lazy initialization (expensive computation)
const [data, setData] = useState(() => computeExpensiveValue());

// Functional update (when depending on previous)
setCount((prev) => prev + 1);
```

### useReducer

```tsx
type State = { count: number; step: number };
type Action =
  | { type: "increment" }
  | { type: "decrement" }
  | { type: "setStep"; payload: number };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "increment":
      return { ...state, count: state.count + state.step };
    case "decrement":
      return { ...state, count: state.count - state.step };
    case "setStep":
      return { ...state, step: action.payload };
  }
}

const [state, dispatch] = useReducer(reducer, { count: 0, step: 1 });
```

**When to use:** Complex state with multiple sub-values or when next state depends on previous.

---

## CONTEXT HOOK

### useContext

```tsx
const ThemeContext = createContext<"light" | "dark">("light");

function Button() {
  const theme = useContext(ThemeContext);
  return <button className={theme}>Click</button>;
}
```

⚠️ **Anti-pattern:** Don't use for frequently changing values (use Zustand instead).

---

## REF HOOKS

### useRef

```tsx
// DOM reference
const inputRef = useRef<HTMLInputElement>(null);
inputRef.current?.focus();

// Mutable value (no re-render)
const intervalRef = useRef<number | null>(null);
intervalRef.current = window.setInterval(fn, 1000);
```

### useImperativeHandle

```tsx
const Input = forwardRef<InputHandle, Props>((props, ref) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(
    ref,
    () => ({
      focus: () => inputRef.current?.focus(),
      clear: () => {
        if (inputRef.current) inputRef.current.value = "";
      },
    }),
    []
  );

  return <input ref={inputRef} {...props} />;
});

// Usage
const ref = useRef<InputHandle>(null);
ref.current?.focus();
```

---

## EFFECT HOOKS

### useEffect

```tsx
// Subscription with cleanup
useEffect(() => {
  const subscription = api.subscribe(handler);
  return () => subscription.unsubscribe(); // ALWAYS cleanup
}, [handler]);

// Fetch data
useEffect(() => {
  let cancelled = false;

  async function fetchData() {
    const data = await api.get(id);
    if (!cancelled) setData(data);
  }

  fetchData();
  return () => {
    cancelled = true;
  };
}, [id]);
```

### useLayoutEffect

```tsx
// Synchronous DOM measurement (before paint)
useLayoutEffect(() => {
  const { height } = elementRef.current.getBoundingClientRect();
  setHeight(height);
}, []);
```

**When to use:** DOM measurements, scroll position, preventing visual flicker.

### useEffectEvent (React 19.2) 🆕

```tsx
// Event-like logic — always sees latest values, not a dependency
function Chat({ roomId, onReceive }: Props) {
  const [messages, setMessages] = useState<Message[]>([]);

  // ✅ Never stale, never in deps
  const onMessage = useEffectEvent((msg: Message) => {
    setMessages((prev) => [...prev, msg]);
    onReceive(msg); // Always current callback
  });

  useEffect(() => {
    const conn = createConnection(roomId);
    conn.on("message", onMessage);
    return () => conn.disconnect();
  }, [roomId]); // onMessage NOT listed
}
```

**When to use:**

- Callbacks inside effects that shouldn't trigger re-subscription
- Avoid stale closure bugs
- Event handlers that read latest props/state

---

## PERFORMANCE HOOKS

### useMemo

```tsx
// Expensive computation
const sorted = useMemo(
  () => items.toSorted((a, b) => a.name.localeCompare(b.name)),
  [items]
);

// Referential stability for deps
const filters = useMemo(() => ({ status, page }), [status, page]);
```

### useCallback

```tsx
// Stable function for memoized child
const handleClick = useCallback(
  (id: string) => {
    selectItem(id, options);
  },
  [options]
);

<MemoizedList onClick={handleClick} />;
```

⚠️ **Don't overuse** — Only when:

1. Passing to `memo()` children
2. Used in other hooks' dependency arrays
3. Expensive computation (measure first!)

---

## TRANSITION HOOKS

### useTransition

```tsx
function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Item[]>([]);
  const [isPending, startTransition] = useTransition();

  function handleChange(value: string) {
    setQuery(value); // Urgent: update input immediately
    startTransition(() => {
      setResults(filterItems(value)); // Deferred: can be interrupted
    });
  }

  return (
    <>
      <input value={query} onChange={(e) => handleChange(e.target.value)} />
      <div style={{ opacity: isPending ? 0.7 : 1 }}>
        <ResultsList results={results} />
      </div>
    </>
  );
}
```

### useDeferredValue

```tsx
function SearchResults({ query }: { query: string }) {
  const deferredQuery = useDeferredValue(query);
  const isStale = query !== deferredQuery;

  return (
    <div style={{ opacity: isStale ? 0.7 : 1 }}>
      <ExpensiveList query={deferredQuery} />
    </div>
  );
}
```

**Difference:**

- `useTransition`: You control when update starts
- `useDeferredValue`: React defers the value automatically

---

## FORM HOOKS

### useFormStatus

```tsx
// MUST be inside <form> — gets parent form's status
function SubmitButton() {
  const { pending, data, method, action } = useFormStatus();

  return (
    <button type="submit" disabled={pending}>
      {pending ? "Submitting..." : "Submit"}
    </button>
  );
}
```

### useActionState (React 19) 🆕

```tsx
async function submitForm(prevState: State, formData: FormData) {
  "use server";
  const email = formData.get("email") as string;

  if (!email.includes("@")) {
    return { error: "Invalid email", success: false };
  }

  await saveEmail(email);
  return { error: null, success: true };
}

function NewsletterForm() {
  const [state, formAction, isPending] = useActionState(submitForm, {
    error: null,
    success: false,
  });

  return (
    <form action={formAction}>
      <input name="email" type="email" required />
      {state.error && <p className="text-red-500">{state.error}</p>}
      {state.success && <p className="text-green-500">Subscribed!</p>}
      <button disabled={isPending}>
        {isPending ? "Subscribing..." : "Subscribe"}
      </button>
    </form>
  );
}
```

### useOptimistic (React 19) 🆕

```tsx
function TodoList({ todos }: { todos: Todo[] }) {
  const [optimisticTodos, addOptimistic] = useOptimistic(
    todos,
    (state, newTodo: Todo) => [...state, { ...newTodo, pending: true }]
  );

  async function handleAdd(formData: FormData) {
    const newTodo = {
      id: crypto.randomUUID(),
      text: formData.get("text") as string,
      done: false,
    };

    addOptimistic(newTodo); // Instant UI update
    await createTodo(newTodo); // Server action
  }

  return (
    <form action={handleAdd}>
      <input name="text" required />
      <button type="submit">Add</button>
      <ul>
        {optimisticTodos.map((todo) => (
          <li key={todo.id} style={{ opacity: todo.pending ? 0.5 : 1 }}>
            {todo.text}
          </li>
        ))}
      </ul>
    </form>
  );
}
```

---

## ASYNC HOOK

### use() (React 19) 🆕

```tsx
// Read promise — suspends until resolved
function UserProfile({ userPromise }: { userPromise: Promise<User> }) {
  const user = use(userPromise);
  return <h1>{user.name}</h1>;
}

// Conditional context (not possible with useContext!)
function Panel({ isAdmin }: { isAdmin: boolean }) {
  if (isAdmin) {
    const settings = use(AdminContext); // ✅ Valid!
    return <AdminPanel settings={settings} />;
  }
  return <UserPanel />;
}

// Usage with Suspense
<Suspense fallback={<Skeleton />}>
  <UserProfile userPromise={fetchUser(id)} />
</Suspense>;
```

**Differences from useContext:**

- Can be called conditionally
- Can read promises (suspends)
- Works in loops

---

## UTILITY HOOKS

### useId

```tsx
function FormField({ label }: { label: string }) {
  const id = useId();

  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input id={id} />
    </div>
  );
}

// Multiple IDs
function PasswordField() {
  const id = useId();

  return (
    <>
      <label htmlFor={`${id}-password`}>Password</label>
      <input id={`${id}-password`} type="password" />
      <label htmlFor={`${id}-confirm`}>Confirm</label>
      <input id={`${id}-confirm`} type="password" />
    </>
  );
}
```

### useDebugValue

```tsx
function useOnlineStatus() {
  const isOnline = useSyncExternalStore(subscribe, getSnapshot);

  useDebugValue(isOnline ? "🟢 Online" : "🔴 Offline");

  return isOnline;
}
```

### useSyncExternalStore

```tsx
// Subscribe to browser APIs
function useWindowWidth() {
  return useSyncExternalStore(
    (callback) => {
      window.addEventListener("resize", callback);
      return () => window.removeEventListener("resize", callback);
    },
    () => window.innerWidth, // Client
    () => 1200 // Server (SSR)
  );
}

// Subscribe to external store
function useStore<T>(store: Store<T>) {
  return useSyncExternalStore(
    store.subscribe,
    store.getSnapshot,
    store.getServerSnapshot
  );
}
```

---

## HOOKS DECISION TREE

```
Need local state?
├─ Simple value → useState
└─ Complex/multiple values → useReducer

Need shared state?
├─ Rarely changes (theme, auth) → useContext
└─ Frequently changes → Zustand

Need side effects?
├─ Subscriptions/fetch → useEffect + cleanup
├─ DOM measurements → useLayoutEffect
└─ Event callbacks in effects → useEffectEvent

Need performance optimization?
├─ Expensive calculation → useMemo
├─ Stable function reference → useCallback
└─ Measure first with Profiler!

Need non-blocking updates?
├─ Control update timing → useTransition
└─ Defer a value → useDeferredValue

Need form handling?
├─ Submit state → useFormStatus
├─ Action + state → useActionState
└─ Optimistic UI → useOptimistic
```
