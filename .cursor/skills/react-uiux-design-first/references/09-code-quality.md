# Rule 9: Code Quality

## Core Principle

> **Clarity > Cleverness**. Code should read like a story, not a puzzle.

---

## Naming Conventions

### Variables & Functions

```tsx
// ❌ Cryptic abbreviations
const usrLst = [];
const hndlClk = () => {};
const isVld = true;

// ✅ Clear, descriptive names
const userList = [];
const handleClick = () => {};
const isValid = true;
```

### Boolean Names

```tsx
// ❌ Unclear booleans
const open = true;
const data = false;
const click = true;

// ✅ Start with is/has/can/should
const isOpen = true;
const hasData = false;
const canClick = true;
const shouldRefetch = true;
```

### Function Names

```tsx
// ❌ Vague names
const process = () => {};
const do = () => {};
const handle = () => {};

// ✅ Action + Subject
const processPayment = () => {};
const fetchUsers = () => {};
const handleFormSubmit = () => {};
const validateEmail = () => {};
```

### Component Names

```tsx
// ❌ Generic or unclear
const Card1 = () => {};
const Comp = () => {};
const Data = () => {};

// ✅ Descriptive component names
const UserProfileCard = () => {};
const ProductList = () => {};
const PaymentForm = () => {};
```

---

## Avoid Over-Engineering

### Keep It Simple

```tsx
// ❌ Over-engineered for simple toggle
const useToggle = (initial: boolean) => {
  const [value, setValue] = useState(initial);
  const toggle = useCallback(() => setValue(v => !v), []);
  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);
  const reset = useCallback(() => setValue(initial), [initial]);
  return { value, toggle, setTrue, setFalse, reset, setValue };
};

// ✅ Simple solution for simple need
const [isOpen, setIsOpen] = useState(false);
```

### Don't Abstract Too Early

```tsx
// ❌ Premature abstraction (one use case)
const createApiEndpoint = <T,>(
  path: string,
  options: RequestOptions
) => {
  return async (data: T): Promise<Response> => {
    return fetch(`/api${path}`, {
      ...options,
      body: JSON.stringify(data),
    });
  };
};

const submitUser = createApiEndpoint<User>('/users', { method: 'POST' });

// ✅ Simple direct code (until pattern emerges)
const submitUser = async (user: User) => {
  return fetch('/api/users', {
    method: 'POST',
    body: JSON.stringify(user),
  });
};
```

### Three Strike Rule

> Write it once. Copy it twice. Abstract on the third time.

```tsx
// First use: Just write it
const UserCard = ({ user }) => (
  <Card className="p-4 hover:shadow-md transition-shadow">
    <Avatar src={user.avatar} />
    <h3>{user.name}</h3>
  </Card>
);

// Second use: Consider if pattern is clear
// Copy is okay if slightly different

// Third use: Now abstract if truly same pattern
const HoverCard = ({ children }) => (
  <Card className="p-4 hover:shadow-md transition-shadow">
    {children}
  </Card>
);
```

---

## Code Structure

### Logical Grouping

```tsx
const UserProfile = ({ userId }) => {
  // 1. Hooks (state, queries, effects)
  const [isEditing, setIsEditing] = useState(false);
  const { data: user, isLoading } = useUser(userId);
  const updateMutation = useUpdateUser();

  // 2. Derived state
  const displayName = user?.name ?? 'Unknown';
  const canEdit = user?.role === 'admin';

  // 3. Event handlers
  const handleEdit = () => setIsEditing(true);
  const handleSave = async (data) => {
    await updateMutation.mutateAsync(data);
    setIsEditing(false);
  };

  // 4. Early returns (loading, error, empty)
  if (isLoading) return <Skeleton />;
  if (!user) return <EmptyState />;

  // 5. Main render
  return (
    <div>
      {/* ... */}
    </div>
  );
};
```

### One Thing Per Line in JSX

```tsx
// ❌ Hard to scan
<Button variant="primary" size="lg" onClick={handleClick} disabled={isLoading}>Submit</Button>

// ✅ Easy to read
<Button
  variant="primary"
  size="lg"
  onClick={handleClick}
  disabled={isLoading}
>
  Submit
</Button>
```

### Destructure Early

```tsx
// ❌ Repeated prop access
const UserCard = (props) => (
  <div>
    <img src={props.user.avatar} />
    <h3>{props.user.name}</h3>
    <p>{props.user.email}</p>
    <button onClick={props.onEdit}>Edit</button>
  </div>
);

// ✅ Destructure at the top
const UserCard = ({ user, onEdit }) => {
  const { avatar, name, email } = user;

  return (
    <div>
      <img src={avatar} />
      <h3>{name}</h3>
      <p>{email}</p>
      <button onClick={onEdit}>Edit</button>
    </div>
  );
};
```

---

## Comments

### When to Comment

```tsx
// ✅ Explain WHY, not WHAT
// Using setTimeout to let animation complete before updating state
setTimeout(() => setIsOpen(false), 300);

// ✅ Explain business logic
// Users under 18 can't purchase alcohol (legal requirement)
if (user.age < 18 && product.isAlcohol) {
  return <AgeRestrictionError />;
}

// ✅ TODO with context
// TODO(2024-Q1): Remove after migration is complete
const legacyHandler = () => {};
```

### When NOT to Comment

```tsx
// ❌ Obvious comments
// Set the name to the user's name
setName(user.name);

// ❌ Commented-out code (just delete it)
// const oldFunction = () => {};

// ❌ Comments that can be replaced with good names
// Check if user is admin
const isAdm = user.role === 'admin';

// ✅ Just use a good name
const isAdmin = user.role === 'admin';
```

---

## TypeScript Best Practices

### Explicit Types for Public APIs

```tsx
// ❌ Inferred types for props
const Button = ({ label, onClick }) => {};

// ✅ Explicit interface
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

const Button: React.FC<ButtonProps> = ({ label, onClick, variant = 'primary' }) => {};
```

### Avoid `any`

```tsx
// ❌ any hides bugs
const processData = (data: any) => data.value;

// ✅ Proper typing
interface Data {
  value: number;
}
const processData = (data: Data) => data.value;

// ✅ Unknown if truly unknown
const processUnknown = (data: unknown) => {
  if (typeof data === 'object' && data !== null && 'value' in data) {
    return (data as { value: number }).value;
  }
  throw new Error('Invalid data');
};
```

---

## Consistency

### Follow Project Conventions

```tsx
// If project uses arrow functions, use arrow functions
const MyComponent = () => {};

// If project uses function declarations, use function declarations
function MyComponent() {}

// Be consistent with:
// - Quotes (single vs double)
// - Semicolons (with vs without)
// - Import order
// - File structure
```

### Use ESLint/Prettier

```json
// .eslintrc.json
{
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier"
  ]
}

// .prettierrc
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5"
}
```

---

## Checklist

- [ ] Names are clear and descriptive
- [ ] Booleans start with is/has/can/should
- [ ] Functions describe what they do (verb + noun)
- [ ] No cryptic abbreviations
- [ ] No premature abstractions
- [ ] Code is logically grouped
- [ ] Comments explain WHY, not WHAT
- [ ] No commented-out code
- [ ] TypeScript types are explicit for public APIs
- [ ] Consistent with project conventions

---

## Summary

1. **Clarity > Cleverness** - readable beats clever
2. **Good names** - self-documenting code
3. **No over-engineering** - simple until pattern emerges
4. **No premature abstraction** - three strike rule
5. **Comments for WHY** - not what the code does
6. **Consistent style** - follow project conventions
