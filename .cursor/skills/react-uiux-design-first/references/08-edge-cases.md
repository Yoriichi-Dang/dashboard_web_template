# Rule 8: Error & Edge Case Thinking

## Core Principle

> A reliable UI handles everything that can go wrong. Always ask "what if?"

---

## The Edge Case Questions

Always ask before coding:

1. **What if the API fails?**
2. **What if data is empty?**
3. **What if data is null/undefined?**
4. **What if user clicks twice?**
5. **What if network is slow?**
6. **What if user navigates away mid-action?**
7. **What if input is too long?**
8. **What if user pastes invalid data?**

---

## Error Handling Patterns

### API Errors

```tsx
const { data, error, isLoading, refetch } = useQuery({
  queryKey: ['users'],
  queryFn: fetchUsers,
});

if (error) {
  return (
    <ErrorState
      title="Failed to load users"
      description={error.message}
      action={
        <Button onClick={() => refetch()}>
          <RefreshIcon className="w-4 h-4 mr-2" />
          Try Again
        </Button>
      }
    />
  );
}
```

### Form Submission Errors

```tsx
const handleSubmit = async (data: FormData) => {
  try {
    await submitForm(data);
    toast.success('Saved successfully');
    router.push('/dashboard');
  } catch (error) {
    if (error instanceof ValidationError) {
      // Show field-level errors
      setFieldErrors(error.fieldErrors);
    } else if (error instanceof NetworkError) {
      // Show retry option
      toast.error('Network error. Please try again.');
    } else {
      // Generic error
      toast.error('Something went wrong. Please try again.');
    }
  }
};
```

### Error Boundaries

```tsx
class ErrorBoundary extends React.Component<Props, State> {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log to error tracking service
    logError(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorFallback
          error={this.state.error}
          onReset={() => this.setState({ hasError: false })}
        />
      );
    }

    return this.props.children;
  }
}

// Usage
<ErrorBoundary fallback={<ErrorFallback />}>
  <App />
</ErrorBoundary>
```

---

## Empty States

### No Data

```tsx
const UserList = ({ users }) => {
  if (users.length === 0) {
    return (
      <EmptyState
        icon={<UsersIcon className="w-12 h-12" />}
        title="No users yet"
        description="Invite team members to get started"
        action={<Button>Invite Users</Button>}
      />
    );
  }

  return <List users={users} />;
};
```

### No Search Results

```tsx
const SearchResults = ({ results, query }) => {
  if (results.length === 0) {
    return (
      <EmptyState
        icon={<SearchIcon className="w-12 h-12" />}
        title={`No results for "${query}"`}
        description="Try adjusting your search terms"
        suggestions={[
          'Check your spelling',
          'Use fewer keywords',
          'Try different filters',
        ]}
      />
    );
  }

  return <List results={results} />;
};
```

### No Permissions

```tsx
const AdminPanel = ({ hasAccess }) => {
  if (!hasAccess) {
    return (
      <EmptyState
        icon={<LockIcon className="w-12 h-12" />}
        title="Access Denied"
        description="You don't have permission to view this page"
        action={<Button onClick={() => router.push('/')}>Go Home</Button>}
      />
    );
  }

  return <AdminContent />;
};
```

---

## Null/Undefined Safety

```tsx
// ❌ Crashes if user is null
<span>{user.name}</span>

// ✅ Optional chaining
<span>{user?.name}</span>

// ✅ Nullish coalescing
<span>{user?.name ?? 'Unknown'}</span>

// ✅ Guard clause
if (!user) return null;
return <span>{user.name}</span>;

// ✅ Type narrowing
interface Props {
  user: User | null;
}

const UserCard = ({ user }: Props) => {
  if (!user) {
    return <EmptyState />;
  }

  // TypeScript knows user is User here
  return <Card>{user.name}</Card>;
};
```

---

## Double Click Prevention

### Form Submission

```tsx
const [isSubmitting, setIsSubmitting] = useState(false);

const handleSubmit = async () => {
  if (isSubmitting) return; // Prevent double submit

  setIsSubmitting(true);
  try {
    await submitData();
  } finally {
    setIsSubmitting(false);
  }
};

<Button
  onClick={handleSubmit}
  disabled={isSubmitting}
>
  {isSubmitting ? 'Saving...' : 'Save'}
</Button>
```

### Mutation with React Query

```tsx
const mutation = useMutation({
  mutationFn: submitData,
  onSuccess: () => {
    toast.success('Saved!');
  },
});

<Button
  onClick={() => mutation.mutate(data)}
  disabled={mutation.isPending}
>
  {mutation.isPending ? 'Saving...' : 'Save'}
</Button>
```

### Debounced Click

```tsx
const debouncedClick = useMemo(
  () => debounce(handleClick, 300),
  [handleClick]
);

<Button onClick={debouncedClick}>Click</Button>
```

---

## Race Conditions

### Cancelled Requests

```tsx
const useUserData = (userId: string) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    let cancelled = false;

    fetchUser(userId).then(result => {
      if (!cancelled) {
        setData(result);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [userId]);

  return data;
};
```

### With React Query (Automatic)

```tsx
// React Query handles race conditions automatically
const { data } = useQuery({
  queryKey: ['user', userId],
  queryFn: () => fetchUser(userId),
});
```

### AbortController

```tsx
useEffect(() => {
  const controller = new AbortController();

  fetch('/api/data', { signal: controller.signal })
    .then(res => res.json())
    .then(setData)
    .catch(err => {
      if (err.name !== 'AbortError') {
        setError(err);
      }
    });

  return () => controller.abort();
}, []);
```

---

## Input Validation

### Text Length

```tsx
<Input
  value={name}
  onChange={(e) => setName(e.target.value.slice(0, 100))}
  maxLength={100}
/>
<span className="text-sm text-muted-foreground">
  {name.length}/100
</span>
```

### Paste Handling

```tsx
const handlePaste = (e: React.ClipboardEvent) => {
  e.preventDefault();
  const text = e.clipboardData.getData('text');
  const cleaned = sanitizeInput(text).slice(0, maxLength);
  setInput(cleaned);
};

<Input onPaste={handlePaste} />
```

### Number Inputs

```tsx
<Input
  type="number"
  min={0}
  max={100}
  value={value}
  onChange={(e) => {
    const num = parseInt(e.target.value, 10);
    if (!isNaN(num) && num >= 0 && num <= 100) {
      setValue(num);
    }
  }}
/>
```

---

## Cleanup on Unmount

```tsx
const Timer = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(c => c + 1);
    }, 1000);

    // Cleanup prevents memory leaks
    return () => clearInterval(interval);
  }, []);

  return <span>{count}</span>;
};
```

---

## Checklist

- [ ] API errors show helpful message + retry option
- [ ] Empty states have clear messaging + action
- [ ] Null/undefined handled gracefully
- [ ] Double-click prevented on forms
- [ ] Race conditions handled (cancelled requests)
- [ ] Input validation on length and type
- [ ] Cleanup on component unmount
- [ ] Error boundaries catch unexpected errors
- [ ] Loading states for all async operations

---

## Summary

1. **Always ask "what if?"** before coding
2. **Handle all error states** - API, network, validation
3. **Empty states** need message + action
4. **Prevent double clicks** with disabled state
5. **Cancel requests** on navigation/unmount
6. **Validate inputs** - length, type, format
7. **Use Error Boundaries** for unexpected errors
