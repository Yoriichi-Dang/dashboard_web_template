# Common Anti-Patterns

Patterns to watch for and correct during code review.

## State Management Issues

### ❌ Syncing Derived State
```tsx
// Problem: Unnecessary state + effect
const [fullName, setFullName] = useState('');
useEffect(() => {
  setFullName(`${firstName} ${lastName}`);
}, [firstName, lastName]);

// Solution: Compute directly
const fullName = `${firstName} ${lastName}`;
```

### ❌ Duplicating Props in State
```tsx
// Problem: Props out of sync with state
function UserProfile({ user }) {
  const [name, setName] = useState(user.name);
  // When user prop changes, state doesn't update!
}

// Solution: Use props directly or derive
function UserProfile({ user }) {
  return <div>{user.name}</div>;
}
```

### ❌ Unnecessary useState
```tsx
// Problem: State for computed values
const [items, setItems] = useState([]);
const [filteredItems, setFilteredItems] = useState([]);

useEffect(() => {
  setFilteredItems(items.filter(item => item.active));
}, [items]);

// Solution: Compute directly
const [items, setItems] = useState([]);
const filteredItems = items.filter(item => item.active);
```

## Effect Issues

### ❌ Missing Cleanup
```tsx
// Problem: Memory leaks
useEffect(() => {
  window.addEventListener('resize', handleResize);
  const interval = setInterval(poll, 1000);
  socket.on('message', handleMessage);
}, []);

// Solution: Clean up all side effects
useEffect(() => {
  window.addEventListener('resize', handleResize);
  const interval = setInterval(poll, 1000);
  socket.on('message', handleMessage);
  
  return () => {
    window.removeEventListener('resize', handleResize);
    clearInterval(interval);
    socket.off('message', handleMessage);
  };
}, []);
```

### ❌ Wrong Dependencies
```tsx
// Problem: Missing dependencies
useEffect(() => {
  fetchData(userId);
}, []); // userId should be in deps!

// Problem: Infinite loop
useEffect(() => {
  setData(processData(data));
}, [data]); // Updates data, triggers effect again!

// Solution: Include all dependencies
useEffect(() => {
  fetchData(userId);
}, [userId]);
```

### ❌ Doing Too Much in Effects
```tsx
// Problem: Complex side effect logic
useEffect(() => {
  if (user && user.isAuthenticated) {
    const data = transformData(user.profile);
    updateCache(data);
    logEvent('user_viewed', data);
  }
}, [user]);

// Solution: Break into focused effects
useEffect(() => {
  if (!user?.isAuthenticated) return;
  const data = transformData(user.profile);
  updateCache(data);
}, [user]);

useEffect(() => {
  if (!user?.isAuthenticated) return;
  logEvent('user_viewed', user.profile);
}, [user]);
```

## Component Architecture

### ❌ Unnecessary 'use client'
```tsx
// Problem: Server component made client for no reason
'use client'

export function UserCard({ name, email, role }: Props) {
  return (
    <div className="card">
      <h3>{name}</h3>
      <p>{email}</p>
      <p>{role}</p>
    </div>
  );
}

// Solution: Keep as Server Component
export function UserCard({ name, email, role }: Props) {
  return (
    <div className="card">
      <h3>{name}</h3>
      <p>{email}</p>
      <p>{role}</p>
    </div>
  );
}
```

### ❌ Client Boundary Too High
```tsx
// Problem: Entire page client when only one button needs interactivity
'use client'

export default function Dashboard() {
  return (
    <>
      <Header />
      <Stats data={stats} />
      <Chart data={chartData} />
      <RefreshButton /> {/* Only this needs client! */}
    </>
  );
}

// Solution: Push client boundary down
export default function Dashboard() {
  return (
    <>
      <Header />
      <Stats data={stats} />
      <Chart data={chartData} />
      <RefreshButton /> {/* Client component */}
    </>
  );
}

// RefreshButton.tsx
'use client'
export function RefreshButton() {
  const [loading, setLoading] = useState(false);
  // ... client logic
}
```

### ❌ God Components
```tsx
// Problem: Component doing too many things (500+ lines)
export function Dashboard() {
  // 50 lines of state
  // 100 lines of effects
  // 200 lines of handlers
  // 150 lines of JSX
}

// Solution: Break into focused components
export function Dashboard() {
  return (
    <div>
      <DashboardHeader />
      <StatsSection />
      <ChartsSection />
      <RecentActivity />
    </div>
  );
}
```

## Keys in Lists

### ❌ Index as Key
```tsx
// Problem: Breaks when list reorders
{items.map((item, index) => (
  <TodoItem key={index} {...item} />
))}

// Solution: Use stable unique ID
{items.map(item => (
  <TodoItem key={item.id} {...item} />
))}
```

### ❌ Unstable Keys
```tsx
// Problem: Key changes every render
{items.map(item => (
  <TodoItem key={Math.random()} {...item} />
))}

{items.map(item => (
  <TodoItem key={`${item.title}-${Date.now()}`} {...item} />
))}

// Solution: Use stable identifier
{items.map(item => (
  <TodoItem key={item.id} {...item} />
))}
```

## Performance Issues

### ❌ Premature Optimization
```tsx
// Problem: Memoizing everything "just in case"
const Component = memo(() => {
  const value1 = useMemo(() => x + y, [x, y]);
  const value2 = useMemo(() => a * b, [a, b]);
  const handler1 = useCallback(() => {}, []);
  const handler2 = useCallback(() => {}, []);
  // No actual perf issue!
});

// Solution: Profile first, optimize when needed
function Component() {
  const value1 = x + y;
  const value2 = a * b;
  const handler1 = () => {};
  const handler2 = () => {};
}
```

### ❌ Inline Objects/Functions to Memo'd Children
```tsx
// Problem: Breaks memoization
const MemoizedChild = memo(ChildComponent);

function Parent() {
  return (
    <MemoizedChild
      style={{ margin: 10 }} // New object every render!
      onUpdate={() => {}}     // New function every render!
    />
  );
}

// Solution: Stable references
function Parent() {
  const style = useMemo(() => ({ margin: 10 }), []);
  const handleUpdate = useCallback(() => {}, []);
  
  return (
    <MemoizedChild
      style={style}
      onUpdate={handleUpdate}
    />
  );
}
```

### ❌ Large Unoptimized Lists
```tsx
// Problem: Rendering 1000+ items without virtualization
{items.map(item => <Card key={item.id} {...item} />)}

// Solution: Virtual scrolling
import { useVirtualizer } from '@tanstack/react-virtual';

const rowVirtualizer = useVirtualizer({
  count: items.length,
  getScrollElement: () => parentRef.current,
  estimateSize: () => 50,
});
```

## Type Safety Issues

### ❌ Using 'any'
```tsx
// Problem: Loses type safety
function processData(data: any) {
  return data.map((item: any) => item.value);
}

// Solution: Proper types
interface DataItem {
  value: string;
  id: number;
}

function processData(data: DataItem[]) {
  return data.map(item => item.value);
}
```

### ❌ Non-null Assertions
```tsx
// Problem: Hiding potential null/undefined
const user = getUser()!;
const name = user.profile!.name!;

// Solution: Handle null cases
const user = getUser();
if (!user?.profile?.name) return null;
const name = user.profile.name;

// Or use optional chaining
const name = getUser()?.profile?.name ?? 'Guest';
```

## Accessibility Issues

### ❌ Div as Button
```tsx
// Problem: Not keyboard accessible, no semantics
<div onClick={handleClick}>Click me</div>

// Solution: Use semantic button
<button onClick={handleClick}>Click me</button>
```

### ❌ Missing Labels
```tsx
// Problem: Screen reader can't identify input
<input type="email" placeholder="Email" />

// Solution: Proper label
<label htmlFor="email">Email</label>
<input id="email" type="email" />
```

### ❌ Icon Button Without Label
```tsx
// Problem: Screen reader doesn't know what button does
<button onClick={handleClose}>
  <XIcon />
</button>

// Solution: Add aria-label
<button onClick={handleClose} aria-label="Close dialog">
  <XIcon />
</button>
```

### ❌ Color-Only Indication
```tsx
// Problem: Color-blind users can't distinguish
<span className="text-red-500">Error</span>
<span className="text-green-500">Success</span>

// Solution: Add text or icon
<span className="text-red-500">
  <ErrorIcon /> Error
</span>
<span className="text-green-500">
  <CheckIcon /> Success
</span>
```

## Import/Module Issues

### ❌ Non-optimized Imports
```tsx
// Problem: Imports entire library (breaks tree-shaking)
import _ from 'lodash';
import { Button } from '@material-ui/core';

// Solution: Specific imports
import uniq from 'lodash/uniq';
import Button from '@material-ui/core/Button';
```

### ❌ Deep Feature Imports
```tsx
// Problem: Bypassing public API
import { helper } from '@/features/users/components/UserCard/utils/helpers';

// Solution: Import from feature's public API
import { helper } from '@/features/users';
```

## Data Fetching Issues

### ❌ Fetch in useEffect
```tsx
// Problem: Manual data fetching
useEffect(() => {
  setLoading(true);
  fetch('/api/users')
    .then(res => res.json())
    .then(data => {
      setUsers(data);
      setLoading(false);
    })
    .catch(err => setError(err));
}, []);

// Solution: Use React Query
const { data: users, isLoading, error } = useQuery({
  queryKey: ['users'],
  queryFn: () => fetch('/api/users').then(res => res.json()),
});
```

### ❌ Waterfall Fetching
```tsx
// Problem: Sequential requests
const user = await fetchUser();
const posts = await fetchPosts(user.id);
const comments = await fetchComments(posts[0].id);

// Solution: Parallel when possible
const [user, posts] = await Promise.all([
  fetchUser(),
  fetchPosts(userId),
]);
```

## Forms Issues

### ❌ Controlled Without Form Library
```tsx
// Problem: Lots of boilerplate
const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [errors, setErrors] = useState({});

const handleSubmit = (e) => {
  e.preventDefault();
  // validation logic...
};

// Solution: Use react-hook-form
const { register, handleSubmit, formState: { errors } } = useForm();

const onSubmit = handleSubmit(data => {
  // validation automatic
});
```

### ❌ Placeholder as Label
```tsx
// Problem: Not accessible
<input type="email" placeholder="Email address" />

// Solution: Proper label
<label htmlFor="email">Email address</label>
<input id="email" type="email" />
```

## Testing Anti-Patterns

### ❌ Testing Implementation Details
```tsx
// Problem: Brittle tests
expect(wrapper.find('.user-name').text()).toBe('John');
expect(component.state.isLoading).toBe(false);

// Solution: Test user behavior
expect(screen.getByRole('heading', { name: /john/i })).toBeInTheDocument();
expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
```

### ❌ Snapshots for Everything
```tsx
// Problem: Meaningless snapshots
expect(wrapper).toMatchSnapshot();

// Solution: Specific assertions
expect(screen.getByRole('button')).toHaveTextContent('Submit');
expect(screen.getByRole('alert')).toHaveTextContent('Error occurred');
```
