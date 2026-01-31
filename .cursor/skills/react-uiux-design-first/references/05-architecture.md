# Rule 5: React Architecture

## Core Principle

> Separate UI (what it looks like) from Logic (what it does). Code should read easier than it writes.

---

## Component Categories

| Type | Purpose | Example |
|------|---------|---------|
| **Presentational** | Render UI, receive props | `Button`, `Card`, `Avatar` |
| **Container** | Manage state, fetch data | `UserListContainer` |
| **Page** | Route-level, compose sections | `DashboardPage` |
| **Layout** | Structure, navigation | `MainLayout`, `Sidebar` |

---

## The Separation Pattern

```tsx
// ❌ Mixed concerns (hard to test, hard to reuse)
const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetch('/api/user').then(r => r.json()).then(setUser);
  }, []);

  const handleSave = async (data) => {
    await fetch('/api/user', { method: 'PUT', body: JSON.stringify(data) });
    setIsEditing(false);
  };

  if (!user) return <Loading />;

  return (
    <div>
      <h1>{user.name}</h1>
      {/* 100 more lines of UI... */}
    </div>
  );
};

// ✅ Separated concerns

// 1. Hook (Logic)
const useUserProfile = () => {
  const { data: user, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: () => fetch('/api/user').then(r => r.json()),
  });

  const updateMutation = useMutation({
    mutationFn: (data) => fetch('/api/user', {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  });

  return {
    user,
    isLoading,
    updateUser: updateMutation.mutate,
    isUpdating: updateMutation.isPending,
  };
};

// 2. Presentational Component (UI)
interface UserProfileViewProps {
  user: User;
  onSave: (data: UserData) => void;
  isSaving: boolean;
}

const UserProfileView: React.FC<UserProfileViewProps> = ({
  user,
  onSave,
  isSaving,
}) => (
  <Card>
    <Avatar src={user.avatar} />
    <h1>{user.name}</h1>
    <Button onClick={() => onSave(user)} disabled={isSaving}>
      {isSaving ? 'Saving...' : 'Save'}
    </Button>
  </Card>
);

// 3. Container Component (Connects logic + UI)
const UserProfile = () => {
  const { user, isLoading, updateUser, isUpdating } = useUserProfile();

  if (isLoading) return <UserProfileSkeleton />;

  return (
    <UserProfileView
      user={user}
      onSave={updateUser}
      isSaving={isUpdating}
    />
  );
};
```

---

## Component Size Guidelines

### Single Responsibility

```tsx
// ❌ Component does too much
const UserDashboard = () => {
  // Fetches user
  // Fetches posts
  // Fetches notifications
  // Handles settings
  // 500 lines of JSX...
};

// ✅ Smaller, focused components
const UserDashboard = () => (
  <div className="grid gap-6">
    <UserHeader />
    <UserStats />
    <RecentPosts />
    <NotificationList />
  </div>
);
```

### Line Count Guidelines

| Component Type | Max Lines | When to Split |
|---------------|-----------|---------------|
| UI Component | ~100 | Extract sub-components |
| Container | ~50 | Extract hooks |
| Hook | ~50 | Split into smaller hooks |
| Page | ~100 | Extract sections |

---

## Composition Over Props

```tsx
// ❌ Prop drilling nightmare
<Card
  title="User"
  subtitle="Admin"
  avatar="/avatar.png"
  showBadge={true}
  badgeColor="green"
  onAvatarClick={handleClick}
  actions={[{ label: 'Edit', onClick: handleEdit }]}
  footer={<span>Last seen: today</span>}
/>

// ✅ Composition pattern
<Card>
  <Card.Header>
    <Avatar src="/avatar.png" onClick={handleClick} />
    <div>
      <Card.Title>User</Card.Title>
      <Card.Subtitle>Admin</Card.Subtitle>
    </div>
    <Badge color="green">Active</Badge>
  </Card.Header>

  <Card.Content>
    {/* Content */}
  </Card.Content>

  <Card.Footer>
    <span>Last seen: today</span>
    <Button onClick={handleEdit}>Edit</Button>
  </Card.Footer>
</Card>
```

---

## Avoid Prop Drilling

### Option 1: Composition

```tsx
// ❌ Prop drilling through 3 levels
<Page user={user}>
  <Section user={user}>
    <Header user={user}>
      <Avatar user={user} />
    </Header>
  </Section>
</Page>

// ✅ Composition - pass components, not props
<Page>
  <Section header={<Header avatar={<Avatar user={user} />} />}>
    {/* Content */}
  </Section>
</Page>
```

### Option 2: Context (for truly global state)

```tsx
// Create context for app-wide state
const UserContext = createContext<User | null>(null);

const useUser = () => {
  const user = useContext(UserContext);
  if (!user) throw new Error('useUser must be within UserProvider');
  return user;
};

// Provider at app level
<UserProvider user={user}>
  <App />
</UserProvider>

// Consume anywhere
const Avatar = () => {
  const user = useUser();
  return <img src={user.avatar} />;
};
```

### Option 3: Custom Hooks (for data)

```tsx
// Hook encapsulates data fetching
const useCurrentUser = () => {
  return useQuery({
    queryKey: ['currentUser'],
    queryFn: fetchCurrentUser,
  });
};

// Use directly where needed
const Avatar = () => {
  const { data: user } = useCurrentUser();
  return <img src={user?.avatar} />;
};
```

---

## File Structure

```
features/
  user/
    components/
      UserProfile.tsx      # Presentational
      UserProfileView.tsx  # Pure UI
      UserAvatar.tsx       # Small component
    hooks/
      useUserProfile.ts    # Logic hook
      useUserActions.ts    # Action hook
    api/
      userApi.ts           # API calls
    types/
      index.ts             # TypeScript types
    index.ts               # Public exports
```

---

## Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Component | PascalCase | `UserProfile.tsx` |
| Hook | camelCase, `use` prefix | `useUserProfile.ts` |
| API | camelCase, `Api` suffix | `userApi.ts` |
| Types | PascalCase | `UserProfile`, `UserData` |
| Helpers | camelCase | `formatDate.ts` |

---

## Anti-Patterns

```tsx
// ❌ God component
const Dashboard = () => {
  // 20 useState calls
  // 10 useEffect calls
  // 500 lines of JSX
};

// ✅ Composed from smaller parts
const Dashboard = () => (
  <DashboardLayout>
    <StatsSection />
    <ChartSection />
    <RecentActivity />
  </DashboardLayout>
);


// ❌ Business logic in component
const UserList = () => {
  const users = data.filter(u => u.active).sort((a, b) => a.name.localeCompare(b.name));
  // ...
};

// ✅ Logic in hook or helper
const useActiveUsers = () => {
  const { data } = useUsers();
  return useMemo(() =>
    data?.filter(u => u.active).sort((a, b) => a.name.localeCompare(b.name)),
    [data]
  );
};


// ❌ Inline everything
<button onClick={() => {
  setLoading(true);
  fetch('/api/...').then(r => {
    setData(r);
    setLoading(false);
  });
}}>

// ✅ Extract handler
const handleClick = useCallback(async () => {
  setLoading(true);
  const data = await fetchData();
  setData(data);
  setLoading(false);
}, []);

<button onClick={handleClick}>
```

---

## Checklist

- [ ] UI separated from logic
- [ ] Components under 100 lines
- [ ] Hooks under 50 lines
- [ ] No prop drilling beyond 2 levels
- [ ] Using composition for flexibility
- [ ] Clear file organization
- [ ] Consistent naming conventions
- [ ] Code reads easier than it writes

---

## Summary

1. **Separate UI from Logic** - hooks for logic, components for UI
2. **Single Responsibility** - each component does one thing well
3. **Composition > Props** - pass components, not prop objects
4. **Avoid Prop Drilling** - use composition, context, or hooks
5. **Code reads easier than it writes** - future you will thank you
