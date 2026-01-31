# Codebase Analysis Guide

**Purpose:** Understand project context before reviewing PRs to ensure consistency with existing patterns and technical decisions.

---

## Why Codebase Analysis Matters

Reviewing code without context leads to:
- ❌ Suggesting patterns that conflict with project standards
- ❌ Missing inconsistencies with existing code
- ❌ Recommending libraries already avoided by the team
- ❌ Ignoring project-specific conventions

**Good review = Universal best practices + Project-specific patterns**

---

## Analysis Workflow

### 1. Project Structure Analysis

**Goal:** Understand the architecture and organization

```bash
# Start at project root
view /path/to/project

# Look for these indicators:
```

#### Key Structure Patterns

**Next.js App Router Project:**
```
project/
├── app/              ← App Router (Next.js 13+)
│   ├── (auth)/      ← Route groups
│   ├── api/         ← API routes
│   └── [locale]/    ← Dynamic segments
├── src/
│   ├── features/    ← Feature-based architecture
│   ├── components/  ← Shared components
│   └── lib/         ← Utilities
└── public/          ← Static assets
```

**Next.js Pages Router Project:**
```
project/
├── pages/           ← Pages Router (Next.js <13)
│   ├── api/
│   └── _app.tsx
├── components/
└── styles/
```

**Standard React Project:**
```
project/
├── src/
│   ├── components/
│   ├── hooks/
│   ├── utils/
│   └── pages/ or features/
└── public/
```

**Document your findings:**
- Which router? (App Router vs Pages Router)
- Architecture? (Feature-based vs layer-based)
- File organization? (Co-located tests vs separate test folder)

---

### 2. Package.json Deep Dive

**Goal:** Understand tech stack and dependencies

```bash
view package.json
```

#### Dependencies Checklist

Create a tech stack profile:

**Core Framework:**
```json
{
  "dependencies": {
    "react": "19.2.0",          // ✓ Note version
    "next": "16.0.0",           // ✓ Note version
    "typescript": "^5.3.0"      // ✓ TypeScript project
  }
}
```

**State Management:**
```json
// Option 1: React Query (TanStack Query)
"@tanstack/react-query": "^5.0.0"

// Option 2: Zustand
"zustand": "^4.5.0"

// Option 3: Redux Toolkit
"@reduxjs/toolkit": "^2.0.0"

// Note: Which one(s) are used? For what purpose?
```

**Form Handling:**
```json
// Option 1: react-hook-form (most common)
"react-hook-form": "^7.50.0"

// Option 2: Formik
"formik": "^2.4.0"

// Option 3: Native forms + Server Actions
// (no library = using Next.js Server Actions)
```

**Validation:**
```json
// Option 1: Zod (most common with TypeScript)
"zod": "^3.22.0"

// Option 2: Yup
"yup": "^1.3.0"

// Option 3: Joi
"joi": "^17.11.0"
```

**Styling:**
```json
// Option 1: Tailwind CSS
"tailwindcss": "^3.4.0"

// Option 2: CSS Modules (no dependency)
// Look for: *.module.css files

// Option 3: styled-components
"styled-components": "^6.1.0"

// Option 4: Emotion
"@emotion/react": "^11.11.0"
```

**UI Component Library:**
```json
// Option 1: shadcn/ui (check components/ folder)
// Radix UI primitives indicate shadcn
"@radix-ui/react-dialog": "^1.0.0"

// Option 2: Material-UI
"@mui/material": "^5.15.0"

// Option 3: Ant Design
"antd": "^5.12.0"

// Option 4: Chakra UI
"@chakra-ui/react": "^2.8.0"

// Option 5: Custom components (no library)
```

**Testing:**
```json
// Unit/Integration
"jest": "^29.7.0"
"@testing-library/react": "^14.1.0"
"vitest": "^1.1.0"  // Alternative to Jest

// E2E
"@playwright/test": "^1.40.0"
"cypress": "^13.6.0"
```

**Date Handling:**
```json
"date-fns": "^3.0.0"
"dayjs": "^1.11.0"
"luxon": "^3.4.0"
// Note: Which one to avoid duplicates
```

#### Scripts Analysis

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "test": "jest",
    "test:e2e": "playwright test",
    "lint": "eslint .",
    "type-check": "tsc --noEmit",
    "analyze": "ANALYZE=true next build"  // ✓ Bundle analysis available
  }
}
```

**Document:**
- Available scripts
- Test commands
- Any custom build processes

---

### 3. TypeScript Configuration

**Goal:** Understand type strictness and path aliases

```bash
view tsconfig.json
```

#### Key Settings to Note

```json
{
  "compilerOptions": {
    // Strictness (affects review standards)
    "strict": true,              // ✓ Strict mode enabled?
    "noUncheckedIndexedAccess": true,
    "noImplicitReturns": true,
    
    // Path aliases (affects import review)
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],        // ✓ Note: @ = src/
      "@/components/*": ["./src/components/*"],
      "@/lib/*": ["./src/lib/*"]
    },
    
    // Module resolution
    "moduleResolution": "bundler",  // Next.js 13+
    "resolveJsonModule": true,
    
    // JSX
    "jsx": "preserve"            // Next.js
  }
}
```

**Impact on review:**
- `strict: true` → No 'any' types should be tolerated
- Path aliases → Check imports match configured patterns
- Loose config → May need to be more lenient

---

### 4. Next.js Configuration

**Goal:** Understand build setup and features

```bash
view next.config.js  # or next.config.mjs
```

#### Important Settings

```javascript
const config = {
  // React version
  reactStrictMode: true,  // ✓ Strict mode in dev
  
  // Experimental features
  experimental: {
    serverActions: true,   // ✓ Server Actions enabled
    ppr: true,            // ✓ Partial Prerendering
  },
  
  // Images
  images: {
    domains: ['example.com'],      // ✓ Allowed image domains
    remotePatterns: [...],         // ✓ Modern pattern
    formats: ['image/avif', 'image/webp'],
  },
  
  // Bundle analysis
  webpack: (config, { isServer }) => {
    if (process.env.ANALYZE) {
      // Bundle analyzer configured
    }
  },
  
  // Redirects/Rewrites
  async redirects() {},
  async rewrites() {},
}
```

**Document:**
- Experimental features enabled
- Image configuration
- Custom webpack config

---

### 5. Linting Configuration

**Goal:** Understand code style rules

```bash
view .eslintrc.js  # or .eslintrc.json
```

#### ESLint Config Analysis

```javascript
module.exports = {
  extends: [
    'next/core-web-vitals',      // ✓ Next.js defaults
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'prettier',                   // ✓ Prettier integration
  ],
  rules: {
    // Custom rules
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-explicit-any': 'error',  // ✓ 'any' forbidden
    'react/prop-types': 'off',    // Using TypeScript instead
    'import/order': ['error', {   // ✓ Import ordering enforced
      groups: ['builtin', 'external', 'internal'],
    }],
  },
}
```

```bash
# Check Prettier config
view .prettierrc
```

```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5"
}
```

**Document:**
- Which rules are errors vs warnings
- Import ordering requirements
- Prettier settings (semi, quotes, etc.)

---

### 6. Existing Code Pattern Analysis

**Goal:** Understand project-specific conventions

#### Component Patterns

```bash
# Look at existing components
view src/components/Button.tsx
view src/features/auth/components/LoginForm.tsx
```

**Analyze:**

**Component Definition:**
```typescript
// Pattern A: Arrow function + FC type
export const Button: FC<ButtonProps> = ({ children }) => {
  return <button>{children}</button>;
};

// Pattern B: Function declaration
export function Button({ children }: ButtonProps) {
  return <button>{children}</button>;
}

// Pattern C: Default export
export default function Button({ children }: ButtonProps) {
  return <button>{children}</button>;
}

// → Document which pattern is predominant
```

**Props Destructuring:**
```typescript
// Pattern A: Inline destructuring
function Card({ title, children }: CardProps) {}

// Pattern B: Props object
function Card(props: CardProps) {
  const { title, children } = props;
}

// → Document the pattern
```

**Type Definitions:**
```typescript
// Pattern A: interface
interface ButtonProps {
  variant: 'primary' | 'secondary';
}

// Pattern B: type
type ButtonProps = {
  variant: 'primary' | 'secondary';
};

// → Document preference
```

#### API Call Patterns

```bash
view src/features/users/api/
view src/lib/api.ts
```

**Pattern A: React Query**
```typescript
// hooks/useUsers.ts
export function useUsers() {
  return useQuery({
    queryKey: ['users'],
    queryFn: () => api.users.list(),
  });
}

// In component:
const { data: users } = useUsers();
```

**Pattern B: Server Actions**
```typescript
// actions/users.ts
'use server'
export async function getUsers() {
  return await db.users.findMany();
}

// In component:
const users = await getUsers();
```

**Pattern C: fetch in useEffect**
```typescript
// (Legacy pattern)
useEffect(() => {
  fetch('/api/users')
    .then(res => res.json())
    .then(setUsers);
}, []);
```

**Document which pattern to follow**

#### File Naming Conventions

```bash
# Check existing files
ls src/components/
ls src/features/auth/components/
```

**Patterns:**
```
PascalCase:  Button.tsx, LoginForm.tsx
kebab-case:  button.tsx, login-form.tsx
camelCase:   button.tsx, loginForm.tsx

Tests:
Component.test.tsx   (co-located)
Component.spec.tsx   (co-located)
__tests__/Component.test.tsx  (separate folder)

Styles:
Component.module.css  (CSS Modules)
Component.styles.ts   (styled-components)
// No separate file (Tailwind)
```

#### Import Style

```typescript
// Pattern A: Absolute with aliases
import { Button } from '@/components/Button';
import { useAuth } from '@/features/auth';

// Pattern B: Relative
import { Button } from '../../components/Button';
import { useAuth } from '../auth/hooks/useAuth';

// Pattern C: Barrel exports
import { Button, Card } from '@/components';
import { useAuth, useUser } from '@/features/auth';
```

#### Error Handling

```bash
view app/error.tsx
view app/[locale]/error.tsx
```

```typescript
// Pattern A: Error boundaries (App Router)
// app/error.tsx
'use client'
export default function Error({ error, reset }) {
  return <div>Error: {error.message}</div>;
}

// Pattern B: try-catch + toast
try {
  await action();
  toast.success('Success!');
} catch (error) {
  toast.error(error.message);
}

// Pattern C: React Query error state
const { data, error } = useQuery(...);
if (error) return <ErrorDisplay error={error} />;
```

---

### 7. Testing Patterns

```bash
view src/components/Button.test.tsx
view tests/e2e/login.spec.ts
```

**Unit Test Pattern:**
```typescript
// Pattern A: describe/it with RTL
describe('Button', () => {
  it('should render children', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('Click me');
  });
});

// Pattern B: test() with RTL
test('renders children', () => {
  render(<Button>Click me</Button>);
  expect(screen.getByRole('button')).toHaveTextContent('Click me');
});

// Pattern C: Vitest
import { describe, it, expect } from 'vitest';
```

**E2E Test Pattern:**
```typescript
// Playwright
test('user can login', async ({ page }) => {
  await page.goto('/login');
  await page.fill('[name="email"]', 'test@example.com');
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL('/dashboard');
});
```

---

## Codebase Context Summary Template

After analysis, create a summary:

```markdown
# Project Context Summary

## Tech Stack
- React 19.2 + Next.js 16 (App Router)
- TypeScript (strict mode)
- Tailwind CSS + shadcn/ui
- React Query for data fetching
- react-hook-form + Zod for forms
- Jest + Playwright for testing

## Architecture
- Feature-based structure (/src/features/)
- Server Components by default
- Co-located tests (Component.test.tsx)

## Conventions
- Component style: Function declarations, named exports
- Props: Inline destructuring
- Types: Prefer `interface` over `type`
- Imports: Absolute paths with @ alias
- File naming: PascalCase for components
- Error handling: Error boundaries + toast notifications

## Key Patterns
- Data fetching: React Query hooks in features/*/api/
- Forms: react-hook-form + Zod validation
- State: React Query (server) + Zustand (client UI state)
- Styling: Tailwind + shadcn/ui components
- Testing: RTL with getByRole queries

## Project-Specific Rules
- No 'any' types (enforced by ESLint)
- All images must use next/image
- Server Actions for mutations
- Query keys use factory pattern: ['feature', 'action', params]

## Avoid
- Don't use fetch directly (use React Query)
- Don't introduce new state management (Zustand already chosen)
- Don't use CSS-in-JS (Tailwind is the standard)
- Don't bypass barrel exports
```

---

## Context-Aware Review Examples

### ✅ Good: References Existing Patterns

```
🟡 MAJOR: Inconsistent with project data fetching

This uses fetch() directly in useEffect, but the project uses React 
Query everywhere else. See src/features/users/api/useUsers.ts for the 
established pattern.

For consistency:
// src/features/products/api/useProducts.ts
export function useProducts() {
  return useQuery({
    queryKey: productKeys.list(),  // Using project's key factory
    queryFn: () => api.products.list(),
  });
}
```

### ✅ Good: Recognizes Project Config

```
🟡 MAJOR: Import path doesn't match tsconfig

You're using relative imports:
import { Button } from '../../components/Button';

But the project has @ alias configured (tsconfig.json). Use:
import { Button } from '@/components/Button';

This is enforced by ESLint (import/order rule).
```

### ✅ Good: Respects Tech Stack

```
🔵 MINOR: Consider using project's UI library

You're building a custom dialog component, but the project uses 
shadcn/ui which has a Dialog component based on Radix UI.

For consistency and accessibility:
import { Dialog } from '@/components/ui/dialog';

See src/components/ui/dialog.tsx
```

### ❌ Bad: Ignores Context

```
❌ Suggestion without context:

"Consider using Redux for this state management"

(But project already uses Zustand - introducing Redux would be wrong!)
```

### ❌ Bad: Conflicts with Project

```
❌ Suggestion conflicts with project:

"Use styled-components for this styling"

(But project uses Tailwind CSS - suggestion breaks consistency!)
```

---

## Quick Context Check Commands

Before reviewing any PR:

```bash
# 1. View project structure
view /path/to/project

# 2. Check dependencies
view package.json

# 3. Check TypeScript config
view tsconfig.json

# 4. Check similar existing code
view src/features/[similar-feature]
view src/components/[similar-component]

# 5. Check test patterns
view src/**/*.test.tsx

# Total time: 5-10 minutes
# Value: Ensures all feedback is contextually relevant
```

---

## Remember

1. **Always analyze before reviewing** - Context changes everything
2. **Reference existing code** - "See X for pattern" is more convincing
3. **Respect project decisions** - Even if you'd choose differently
4. **Note deviations** - Point out inconsistencies with established patterns
5. **Be specific** - "Line 23: Use @ alias per tsconfig.json paths"

**Quality review = Universal best practices + Project-specific consistency**
