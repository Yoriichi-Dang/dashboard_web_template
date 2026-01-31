# Testing Strategy & Best Practices

> Comprehensive testing guide for React 19.2 + Next.js 16 applications

---

## TESTING PYRAMID

```
                    /\
                   /  \
                  / E2E \         Few (Critical paths)
                 /-------\
                /  INTEG  \       Some (Feature flows)
               /-----------\
              /    UNIT     \     Many (Pure functions, hooks)
             /---------------\
```

**Distribution:**
- **70% Unit Tests**: Pure functions, custom hooks, utilities
- **20% Integration Tests**: Component interactions, API calls
- **10% E2E Tests**: Critical user journeys

---

## UNIT TESTING (Jest + React Testing Library)

### Test File Organization

```
src/
├── features/
│   └── posts/
│       ├── components/
│       │   ├── PostCard.tsx
│       │   └── PostCard.test.tsx      # Co-located
│       ├── hooks/
│       │   ├── usePostActions.ts
│       │   └── usePostActions.test.ts
│       └── utils/
│           ├── formatPost.ts
│           └── formatPost.test.ts
└── shared/
    └── lib/
        ├── utils.ts
        └── utils.test.ts
```

### Component Testing Principles

```tsx
// PostCard.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PostCard } from './PostCard';

// ✅ GOOD: Test user behavior, not implementation
describe('PostCard', () => {
  const mockPost = {
    id: '1',
    title: 'Test Post',
    content: 'Test content',
    author: 'John Doe',
    createdAt: new Date('2025-01-01'),
  };

  it('displays post information', () => {
    render(<PostCard post={mockPost} />);
    
    expect(screen.getByRole('heading', { name: 'Test Post' })).toBeInTheDocument();
    expect(screen.getByText('Test content')).toBeInTheDocument();
    expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
  });

  it('calls onDelete when delete button clicked', async () => {
    const user = userEvent.setup();
    const onDelete = jest.fn();
    
    render(<PostCard post={mockPost} onDelete={onDelete} />);
    
    const deleteButton = screen.getByRole('button', { name: /delete/i });
    await user.click(deleteButton);
    
    expect(onDelete).toHaveBeenCalledWith(mockPost.id);
  });

  it('shows loading state during async operation', async () => {
    const user = userEvent.setup();
    const onDelete = jest.fn(() => new Promise(resolve => setTimeout(resolve, 100)));
    
    render(<PostCard post={mockPost} onDelete={onDelete} />);
    
    const deleteButton = screen.getByRole('button', { name: /delete/i });
    await user.click(deleteButton);
    
    expect(screen.getByRole('button', { name: /deleting/i })).toBeDisabled();
    
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /delete/i })).toBeEnabled();
    });
  });
});

// ❌ BAD: Testing implementation details
it('sets loading state to true', () => {
  const { result } = renderHook(() => useDeletePost());
  act(() => result.current.deletePost('1'));
  expect(result.current.isLoading).toBe(true); // Don't test internal state
});
```

### Custom Hook Testing

```tsx
// usePostActions.test.ts
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { usePostActions } from './usePostActions';

// Test wrapper for React Query
function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}

describe('usePostActions', () => {
  it('deletes post successfully', async () => {
    const { result } = renderHook(() => usePostActions(), {
      wrapper: createWrapper(),
    });

    result.current.deletePost('post-123');

    await waitFor(() => {
      expect(result.current.deleteState.isSuccess).toBe(true);
    });
  });

  it('handles delete error', async () => {
    // Mock API to throw error
    global.fetch = jest.fn(() => Promise.reject(new Error('Network error')));

    const { result } = renderHook(() => usePostActions(), {
      wrapper: createWrapper(),
    });

    result.current.deletePost('post-123');

    await waitFor(() => {
      expect(result.current.deleteState.isError).toBe(true);
      expect(result.current.deleteState.error?.message).toBe('Network error');
    });
  });
});
```

### Utility Function Testing

```tsx
// formatPost.test.ts
import { formatPostDate, truncateContent } from './formatPost';

describe('formatPostDate', () => {
  it('formats recent dates as relative time', () => {
    const now = new Date('2025-01-15T10:00:00Z');
    const date = new Date('2025-01-15T09:30:00Z');
    
    expect(formatPostDate(date, now)).toBe('30 minutes ago');
  });

  it('formats old dates as absolute date', () => {
    const now = new Date('2025-01-15T10:00:00Z');
    const date = new Date('2024-12-01T10:00:00Z');
    
    expect(formatPostDate(date, now)).toBe('Dec 1, 2024');
  });
});

describe('truncateContent', () => {
  it('truncates long content', () => {
    const long = 'a'.repeat(200);
    expect(truncateContent(long, 100)).toBe('a'.repeat(97) + '...');
  });

  it('returns short content as-is', () => {
    const short = 'Hello world';
    expect(truncateContent(short, 100)).toBe('Hello world');
  });

  it('handles edge cases', () => {
    expect(truncateContent('', 100)).toBe('');
    expect(truncateContent('abc', 0)).toBe('...');
  });
});
```

### Server Action Testing

```tsx
// actions.test.ts
import { createPost, updatePost } from './actions';
import { db } from '@/shared/lib/db';

// Mock Prisma
jest.mock('@/shared/lib/db', () => ({
  db: {
    post: {
      create: jest.fn(),
      update: jest.fn(),
    },
  },
}));

// Mock Next.js cache functions
jest.mock('next/cache', () => ({
  revalidateTag: jest.fn(),
  revalidatePath: jest.fn(),
}));

describe('createPost', () => {
  it('creates post with valid data', async () => {
    const formData = new FormData();
    formData.set('title', 'New Post');
    formData.set('content', 'Post content');

    const mockPost = {
      id: 'post-123',
      title: 'New Post',
      content: 'Post content',
    };

    (db.post.create as jest.Mock).mockResolvedValue(mockPost);

    await expect(createPost(formData)).resolves.toEqual(mockPost);
  });

  it('throws on invalid data', async () => {
    const formData = new FormData();
    // Missing required fields

    await expect(createPost(formData)).rejects.toThrow();
  });
});
```

---

## INTEGRATION TESTING

### Testing Component Integration

```tsx
// PostList.integration.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PostList } from './PostList';
import { server } from '@/test/mocks/server';
import { rest } from 'msw';

describe('PostList Integration', () => {
  it('fetches and displays posts', async () => {
    render(<PostList />);

    // Loading state
    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    // Wait for data
    await waitFor(() => {
      expect(screen.getByText('Post 1')).toBeInTheDocument();
      expect(screen.getByText('Post 2')).toBeInTheDocument();
    });
  });

  it('handles fetch error gracefully', async () => {
    // Override default handler to return error
    server.use(
      rest.get('/api/posts', (req, res, ctx) => {
        return res(ctx.status(500), ctx.json({ error: 'Server error' }));
      })
    );

    render(<PostList />);

    await waitFor(() => {
      expect(screen.getByText(/failed to load posts/i)).toBeInTheDocument();
    });
  });

  it('filters posts by search query', async () => {
    const user = userEvent.setup();
    render(<PostList />);

    await waitFor(() => {
      expect(screen.getByText('Post 1')).toBeInTheDocument();
    });

    const searchInput = screen.getByRole('searchbox');
    await user.type(searchInput, 'Post 1');

    await waitFor(() => {
      expect(screen.getByText('Post 1')).toBeInTheDocument();
      expect(screen.queryByText('Post 2')).not.toBeInTheDocument();
    });
  });
});
```

### MSW (Mock Service Worker) Setup

```tsx
// test/mocks/handlers.ts
import { rest } from 'msw';

export const handlers = [
  // GET /api/posts
  rest.get('/api/posts', (req, res, ctx) => {
    const page = req.url.searchParams.get('page') || '1';
    
    return res(
      ctx.json({
        data: [
          { id: '1', title: 'Post 1', content: 'Content 1' },
          { id: '2', title: 'Post 2', content: 'Content 2' },
        ],
        pagination: {
          page: Number(page),
          totalPages: 5,
        },
      })
    );
  }),

  // POST /api/posts
  rest.post('/api/posts', async (req, res, ctx) => {
    const body = await req.json();
    
    return res(
      ctx.status(201),
      ctx.json({
        id: 'new-post-id',
        ...body,
        createdAt: new Date().toISOString(),
      })
    );
  }),

  // DELETE /api/posts/:id
  rest.delete('/api/posts/:id', (req, res, ctx) => {
    return res(ctx.status(204));
  }),
];

// test/mocks/server.ts
import { setupServer } from 'msw/node';
import { handlers } from './handlers';

export const server = setupServer(...handlers);

// test/setup.ts
import { server } from './mocks/server';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
```

---

## E2E TESTING (Playwright)

### Test Organization

```
tests/
├── e2e/
│   ├── auth/
│   │   ├── login.spec.ts
│   │   └── register.spec.ts
│   ├── posts/
│   │   ├── create-post.spec.ts
│   │   ├── edit-post.spec.ts
│   │   └── delete-post.spec.ts
│   └── fixtures/
│       └── authenticated.ts
└── playwright.config.ts
```

### Critical Path Testing

```tsx
// tests/e2e/posts/create-post.spec.ts
import { test, expect } from '@playwright/test';
import { authenticatedPage } from '../fixtures/authenticated';

test.describe('Create Post', () => {
  test.use({ storageState: 'tests/.auth/user.json' });

  test('creates new post successfully', async ({ page }) => {
    await page.goto('/dashboard/posts');
    
    // Click create button
    await page.getByRole('button', { name: /create post/i }).click();
    
    // Fill form
    await page.getByLabel(/title/i).fill('My New Post');
    await page.getByLabel(/content/i).fill('This is the post content');
    await page.getByLabel(/category/i).selectOption('Technology');
    
    // Submit
    await page.getByRole('button', { name: /publish/i }).click();
    
    // Verify redirect and success message
    await expect(page).toHaveURL(/\/posts\/[a-z0-9-]+/);
    await expect(page.getByText(/post published successfully/i)).toBeVisible();
    
    // Verify content
    await expect(page.getByRole('heading', { name: 'My New Post' })).toBeVisible();
    await expect(page.getByText('This is the post content')).toBeVisible();
  });

  test('shows validation errors', async ({ page }) => {
    await page.goto('/dashboard/posts/new');
    
    // Submit empty form
    await page.getByRole('button', { name: /publish/i }).click();
    
    // Check validation errors
    await expect(page.getByText(/title is required/i)).toBeVisible();
    await expect(page.getByText(/content is required/i)).toBeVisible();
  });

  test('saves draft', async ({ page }) => {
    await page.goto('/dashboard/posts/new');
    
    await page.getByLabel(/title/i).fill('Draft Post');
    await page.getByRole('button', { name: /save draft/i }).click();
    
    await expect(page.getByText(/draft saved/i)).toBeVisible();
    
    // Verify in drafts list
    await page.goto('/dashboard/posts?status=draft');
    await expect(page.getByText('Draft Post')).toBeVisible();
  });
});
```

### Authentication Fixture

```tsx
// tests/e2e/fixtures/authenticated.ts
import { test as base } from '@playwright/test';

export const test = base.extend({
  // Auto-authenticate for all tests using this fixture
  storageState: async ({}, use) => {
    // Login before tests
    const page = await browser.newPage();
    await page.goto('/login');
    await page.getByLabel(/email/i).fill('test@example.com');
    await page.getByLabel(/password/i).fill('password123');
    await page.getByRole('button', { name: /sign in/i }).click();
    
    await page.waitForURL('/dashboard');
    
    // Save auth state
    await page.context().storageState({ path: 'tests/.auth/user.json' });
    await page.close();
    
    await use('tests/.auth/user.json');
  },
});
```

### Visual Regression Testing

```tsx
// tests/e2e/visual/homepage.spec.ts
import { test, expect } from '@playwright/test';

test('homepage visual regression', async ({ page }) => {
  await page.goto('/');
  
  // Wait for all images to load
  await page.waitForLoadState('networkidle');
  
  // Take screenshot and compare
  await expect(page).toHaveScreenshot('homepage.png', {
    fullPage: true,
    maxDiffPixels: 100,
  });
});

test('responsive layouts', async ({ page }) => {
  await page.goto('/');
  
  // Desktop
  await page.setViewportSize({ width: 1920, height: 1080 });
  await expect(page).toHaveScreenshot('homepage-desktop.png');
  
  // Tablet
  await page.setViewportSize({ width: 768, height: 1024 });
  await expect(page).toHaveScreenshot('homepage-tablet.png');
  
  // Mobile
  await page.setViewportSize({ width: 375, height: 667 });
  await expect(page).toHaveScreenshot('homepage-mobile.png');
});
```

---

## TESTING BEST PRACTICES

### Query Priority (React Testing Library)

```tsx
// ✅ GOOD: Use accessible queries
screen.getByRole('button', { name: /submit/i });
screen.getByLabelText(/email/i);
screen.getByText(/welcome back/i);

// ❌ BAD: Use test IDs (last resort only)
screen.getByTestId('submit-button');

// Query Priority:
// 1. getByRole       - Accessible to assistive tech
// 2. getByLabelText  - Forms
// 3. getByPlaceholder - Forms (less preferred)
// 4. getByText       - Non-interactive elements
// 5. getByTestId     - Last resort
```

### Async Testing

```tsx
// ✅ GOOD: Use waitFor for async operations
await waitFor(() => {
  expect(screen.getByText(/success/i)).toBeInTheDocument();
});

// ✅ GOOD: findBy queries (built-in waitFor)
const message = await screen.findByText(/success/i);

// ❌ BAD: Arbitrary waits
await new Promise(resolve => setTimeout(resolve, 1000));
```

### Test Data Management

```tsx
// test/factories/post.ts
import { faker } from '@faker-js/faker';

export function createMockPost(overrides = {}) {
  return {
    id: faker.string.uuid(),
    title: faker.lorem.sentence(),
    content: faker.lorem.paragraphs(3),
    author: {
      id: faker.string.uuid(),
      name: faker.person.fullName(),
    },
    createdAt: faker.date.recent(),
    ...overrides,
  };
}

// Usage
const post = createMockPost({ title: 'Specific Title' });
```

### Coverage Targets

```json
// jest.config.js
{
  "collectCoverageFrom": [
    "src/**/*.{ts,tsx}",
    "!src/**/*.d.ts",
    "!src/**/*.stories.tsx",
    "!src/**/*.test.{ts,tsx}"
  ],
  "coverageThresholds": {
    "global": {
      "branches": 80,
      "functions": 80,
      "lines": 80,
      "statements": 80
    }
  }
}
```

---

## TESTING DECISION TREE

```
What to test?
├─ Pure function? → Unit test (Jest)
├─ Custom hook? → Unit test (renderHook)
├─ Component behavior? → Integration test (RTL)
├─ API integration? → Integration test (MSW)
├─ User journey? → E2E test (Playwright)
└─ Visual appearance? → Visual regression (Playwright)

How to query elements?
├─ Interactive (button, link)? → getByRole
├─ Form field? → getByLabelText
├─ Text content? → getByText
└─ Last resort → getByTestId

Async operation?
├─ Waiting for element? → findBy* or waitFor
├─ User interaction? → userEvent (not fireEvent)
└─ Network request? → MSW + waitFor
```

---

## CONTINUOUS TESTING

### Pre-commit Hook (Husky)

```json
// .husky/pre-commit
#!/bin/sh
npm run test:changed
npm run lint
```

### CI/CD Pipeline

```yaml
# .github/workflows/test.yml
name: Test

on: [push, pull_request]

jobs:
  unit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
      - run: npm run test:unit -- --coverage
      - uses: codecov/codecov-action@v3

  e2e:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npm run test:e2e
      - uses: actions/upload-artifact@v3
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
```

---

## COMMON TESTING ANTI-PATTERNS

```tsx
// ❌ Testing implementation details
expect(component.state.count).toBe(5);

// ✅ Test user-visible behavior
expect(screen.getByText('Count: 5')).toBeInTheDocument();

// ❌ Using act() explicitly (usually means wrong approach)
act(() => {
  result.current.increment();
});

// ✅ Use userEvent or built-in async utilities
await user.click(button);

// ❌ Snapshot testing components (brittle)
expect(component).toMatchSnapshot();

// ✅ Test specific behavior
expect(screen.getByRole('heading')).toHaveTextContent('Title');

// ❌ Large setup in every test
beforeEach(() => {
  // 50 lines of setup
});

// ✅ Extract to factory/fixture
const setup = createTestSetup();
```
