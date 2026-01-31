# Rule 1: Product & UX First

## Core Principle

> Before writing ANY code, understand the user and their journey.

---

## Pre-Code Questions (MANDATORY)

### 1. Who is the user?

```markdown
- Role: Admin / End-user / Guest
- Tech level: Beginner / Intermediate / Advanced
- Context: Desktop / Mobile / Both
- Frequency: Daily user / Occasional visitor
```

### 2. What is the user trying to do?

```markdown
- Primary action: Create / Read / Update / Delete
- Secondary actions: Filter / Search / Export
- Success criteria: What means "done" for the user?
```

### 3. What are the UI states?

| State | When | What to Show |
|-------|------|--------------|
| **Empty** | No data exists | Helpful message + CTA |
| **Loading** | Fetching data | Skeleton / Progress |
| **Success** | Data loaded | Content |
| **Error** | Request failed | Error message + Recovery action |
| **Partial** | Some data missing | Graceful degradation |

### 4. Slow Network Test

> If network takes 3 seconds, will user understand what's happening?

- [ ] Loading indicator visible within 200ms
- [ ] User knows what's being loaded
- [ ] User can cancel if needed
- [ ] No layout shift when content loads

---

## State Definition Template

```tsx
// Define states BEFORE coding
type UIState =
  | { status: 'empty' }
  | { status: 'loading' }
  | { status: 'success'; data: Data }
  | { status: 'error'; error: Error };

// Or using discriminated union
interface EmptyState {
  isEmpty: true;
  isLoading: false;
  error: null;
  data: null;
}

interface LoadingState {
  isEmpty: false;
  isLoading: true;
  error: null;
  data: null;
}

interface SuccessState {
  isEmpty: false;
  isLoading: false;
  error: null;
  data: Data;
}

interface ErrorState {
  isEmpty: false;
  isLoading: false;
  error: Error;
  data: null;
}
```

---

## Empty State Best Practices

```tsx
// ❌ Bad: Just shows nothing
{data.length === 0 && null}

// ❌ Bad: Unhelpful message
{data.length === 0 && <p>No data</p>}

// ✅ Good: Helpful empty state
{data.length === 0 && (
  <EmptyState
    icon={<InboxIcon className="w-12 h-12 text-muted-foreground" />}
    title="No projects yet"
    description="Create your first project to get started"
    action={
      <Button onClick={onCreateProject}>
        <PlusIcon className="w-4 h-4 mr-2" />
        Create Project
      </Button>
    }
  />
)}
```

### Empty State Checklist

- [ ] Visual icon or illustration
- [ ] Clear title explaining the state
- [ ] Helpful description
- [ ] Primary action to resolve the empty state
- [ ] Consistent styling with design system

---

## User Journey Mapping

Before coding a feature, map the journey:

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Entry     │────▶│   Action    │────▶│   Result    │
│   Point     │     │             │     │             │
└─────────────┘     └─────────────┘     └─────────────┘
      │                   │                   │
      ▼                   ▼                   ▼
 What user sees      Feedback during      Success/Error
 on first load       interaction          outcome
```

### Example: Create Project Flow

```
1. Entry: Dashboard with "New Project" button
   └── State: Empty or List view

2. Action: Click "New Project"
   └── State: Modal opens with form

3. During: Fill form, click Submit
   └── State: Button shows loading, form disabled

4. Result A: Success
   └── State: Modal closes, toast appears, list updates

4. Result B: Error
   └── State: Error message in modal, form re-enabled
```

---

## Questions to Ask Stakeholders

1. What's the most common user flow?
2. What errors are most likely to happen?
3. What's acceptable loading time?
4. What information is critical vs nice-to-have?
5. How do users recover from errors?

---

## Anti-Patterns

```tsx
// ❌ Starting to code without understanding user
const Dashboard = () => {
  const { data } = useQuery('dashboard');
  return <div>{JSON.stringify(data)}</div>;
};

// ❌ Only handling happy path
const UserList = () => {
  const { data } = useQuery('users');
  return (
    <ul>
      {data.map(user => <li key={user.id}>{user.name}</li>)}
    </ul>
  );
};

// ✅ All states considered
const UserList = () => {
  const { data, isLoading, error, isEmpty } = useUsers();

  if (isLoading) return <UserListSkeleton />;
  if (error) return <ErrorState error={error} onRetry={refetch} />;
  if (isEmpty) return <EmptyState action={<CreateUserButton />} />;

  return (
    <ul>
      {data.map(user => <UserListItem key={user.id} user={user} />)}
    </ul>
  );
};
```

---

## Summary

1. **Always** define user and goal before coding
2. **Always** identify all 4 states (empty, loading, success, error)
3. **Always** consider slow network scenarios
4. **Never** code happy path only
5. **Never** leave users wondering "what's happening?"
