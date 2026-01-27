<p align="center">
<h1 align="center">Admin Dashboard Starter Template with Next.js &amp; Shadcn UI</h1>

<div align="center">Built with the Next.js 16 App Router, Tailwind CSS &amp; Shadcn UI components</div>

<br />

<div align="center">
  <a href="https://dub.sh/shadcn-dashboard"><strong>View Demo</strong></a>
</div>
<br />
<div align="center">
  <img src="/public/shadcn-dashboard.png" alt="Shadcn Dashboard Cover" style="max-width: 100%; border-radius: 8px;" />
</div>

## Overview

This is an **admin dashboard starter template** built with **Next.js 16, Shadcn UI, and Tailwind CSS**.

It gives you a production-ready **dashboard UI** with authentication, charts, tables, forms, and a feature-based folder structure, perfect for **SaaS apps, internal tools, and admin panels**.

### Tech Stack

This template uses the following stack:

- Framework - [Next.js 16](https://nextjs.org/16)
- Language - [TypeScript](https://www.typescriptlang.org)
- Auth - [Clerk](https://go.clerk.com/ILdYhn7)
- Error tracking - [Sentry](https://sentry.io/for/nextjs/?utm_source=github&utm_medium=paid-community&utm_campaign=general-fy26q2-nextjs&utm_content=github-banner-project-tryfree)
- Styling - [Tailwind CSS v4](https://tailwindcss.com)
- Components - [Shadcn-ui](https://ui.shadcn.com)
- Schema Validations - [Zod](https://zod.dev)
- State Management - [Zustand](https://zustand-demo.pmnd.rs)
- Search params state manager - [Nuqs](https://nuqs.47ng.com/)
- Tables - [Tanstack Data Tables](https://ui.shadcn.com/docs/components/data-table) • [Dice table](https://www.diceui.com/docs/components/data-table)
- Forms - [React Hook Form](https://ui.shadcn.com/docs/components/form)
- Command+k interface - [kbar](https://kbar.vercel.app/)
- Linting - [ESLint](https://eslint.org)
- Pre-commit Hooks - [Husky](https://typicode.github.io/husky/)
- Formatting - [Prettier](https://prettier.io)

_If you are looking for a Tanstack start dashboard template, here is the [repo](https://git.new/tanstack-start-dashboard)._

## Features

- 🧱 Pre-built **admin dashboard layout** (sidebar, header, content area)

- 📊 **Analytics overview** page with cards and charts

- 📋 **Data tables** with server-side search, filter & pagination

- 🔐 **Authentication** & user management via Clerk

- 🏢 **Multi-tenant workspaces** with Clerk Organizations (create, switch, manage teams)

- 💳 **Billing & subscriptions** with Clerk Billing for B2B (plan management, feature gating)

- 🔒 **RBAC navigation system** - Fully client-side navigation filtering based on organization, permissions, and roles

- 🧩 **Shadcn UI components** with Tailwind CSS styling

- 🧠 **Feature-Sliced Design (FSD)** architecture for scalable projects
- 🔒 **ESLint-enforced dependency rules** - Automatic validation of FSD layer imports

- ⚙️ Ready for **SaaS dashboards**, internal tools, and client admin panels

## Use Cases

You can use this Next.js + Shadcn UI dashboard starter to build:

- SaaS admin dashboards

- Internal tools & operations panels

- Analytics dashboards

- Client project admin panels

- Boilerplate for new Next.js admin UI projects

## Pages

| Pages                                                                                                                                                                  | Specifications                                                                                                                                                                                                                                                          |
| :--------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Signup / Signin](https://go.clerk.com/ILdYhn7)                                                                                                                        | Authentication with **Clerk** provides secure authentication and user management with multiple sign-in options including passwordless authentication, social logins, and enterprise SSO - all designed to enhance security while delivering a seamless user experience. |
| [Dashboard Overview](https://shadcn-dashboard.kiranism.dev/dashboard)                                                                                                  | Cards with Recharts graphs for analytics. Parallel routes in the overview sections feature independent loading, error handling, and isolated component rendering.                                                                                                       |
| [Product List (Table)](https://shadcn-dashboard.kiranism.dev/dashboard/product)                                                                                        | Tanstack tables with server side searching, filter, pagination by Nuqs which is a Type-safe search params state manager in nextjs                                                                                                                                       |
| [Create Product Form](https://shadcn-dashboard.kiranism.dev/dashboard/product/new)                                                                                     | A Product Form with shadcn form (react-hook-form + zod).                                                                                                                                                                                                                |
| [Profile](https://shadcn-dashboard.kiranism.dev/dashboard/profile)                                                                                                     | Clerk's full-featured account management UI that allows users to manage their profile and security settings                                                                                                                                                             |
| [Kanban Board](https://shadcn-dashboard.kiranism.dev/dashboard/kanban)                                                                                                 | A Drag n Drop task management board with dnd-kit and zustand to persist state locally.                                                                                                                                                                                  |
| [Workspaces](https://shadcn-dashboard.kiranism.dev/dashboard/workspaces)                                                                                               | Organization management page using Clerk's `<OrganizationList />` component. Users can view, create, and switch between organizations/workspaces.                                                                                                                       |
| [Team Management](https://shadcn-dashboard.kiranism.dev/dashboard/workspaces/team)                                                                                     | Full-featured team management interface using Clerk's `<OrganizationProfile />` component. Manage members, roles, permissions, security settings, and organization details. Requires an active organization.                                                            |
| [Billing & Plans](https://shadcn-dashboard.kiranism.dev/dashboard/billing)                                                                                             | Billing management page using Clerk's `<PricingTable />` component. Organizations can view available plans, subscribe, and manage subscriptions. Requires an active organization.                                                                                       |
| [Exclusive Page](https://shadcn-dashboard.kiranism.dev/dashboard/exclusive)                                                                                            | Example of plan-based access control using Clerk's `<Protect>` component. This page is only accessible to organizations on the Pro plan, demonstrating feature gating with fallback UI.                                                                                 |
| [Not Found](https://shadcn-dashboard.kiranism.dev/dashboard/notfound)                                                                                                  | Not Found Page Added in the root level                                                                                                                                                                                                                                  |
| [Global Error](https://sentry.io/for/nextjs/?utm_source=github&utm_medium=paid-community&utm_campaign=general-fy26q2-nextjs&utm_content=github-banner-project-tryfree) | A centralized error page that captures and displays errors across the application. Integrated with **Sentry** to log errors, provide detailed reports, and enable replay functionality for better debugging.                                                            |

## Feature-Sliced Design (FSD) Architecture

This project follows **Feature-Sliced Design (FSD)** methodology for organizing frontend code. FSD structures code by business features rather than technical layers, promoting scalability, maintainability, and clear boundaries.

### FSD Layers (Bottom to Top)

```
app/          # Next.js App Router - routing, layouts, providers
├── page/     # Full-page compositions
├── widgets/  # Complex UI blocks (combines multiple features)
├── features/ # User interactions, business actions
├── entities/ # Business entities (optional, use when needed)
└── shared/   # Reusable infrastructure code
```

### Dependency Rules

**CRITICAL**: Imports can only go **UPWARD** in the layer hierarchy. Lower layers cannot import from higher layers.

```
app → page → widgets → features → entities → shared
 ↑      ↑        ↑         ↑          ↑         ↑
Allowed import direction (upward only)
```

**Enforced by ESLint**: All dependency violations are automatically detected and reported as errors.

#### Specific Rules:

- **`widgets/`** can ONLY import from `features/` and `shared/`
- **`page/`** can ONLY import from `widgets/` and `shared/`
- **`features/`** can import from `entities/` and `shared/`
- **`shared/`** cannot import from any other layer (only external libraries)

### Complete FSD Tree Structure

Đây là cấu trúc tree structure đầy đủ để bạn có thể follow theo:

```plaintext
src/
│
├── app/                                    # Layer 1: Next.js App Router (Top Level)
│   ├── (home)/                            # Route groups
│   │   └── page.tsx
│   ├── auth/
│   │   └── sign-in/
│   │       └── [[...sign-in]]/
│   │           └── page.tsx
│   ├── dashboard/
│   │   ├── layout.tsx                     # Dashboard layout
│   │   ├── page.tsx                       # Dashboard home
│   │   ├── overview/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   ├── @area_stats/               # Parallel routes
│   │   │   ├── @bar_stats/
│   │   │   ├── @pie_stats/
│   │   │   └── @sales/
│   │   ├── product/
│   │   │   ├── page.tsx
│   │   │   └── [productId]/
│   │   │       └── page.tsx
│   │   ├── kanban/
│   │   │   └── page.tsx
│   │   ├── profile/
│   │   │   └── [[...profile]]/
│   │   │       └── page.tsx
│   │   ├── workspaces/
│   │   │   ├── page.tsx
│   │   │   └── team/
│   │   │       └── [[...rest]]/
│   │   │           └── page.tsx
│   │   ├── billing/
│   │   │   └── page.tsx
│   │   └── exclusive/
│   │       └── page.tsx
│   ├── layout.tsx                         # Root layout
│   ├── loading.tsx
│   ├── not-found.tsx
│   ├── global-error.tsx
│   ├── globals.css
│   └── theme.css
│
├── page/                                   # Layer 2: Full-page compositions
│   └── home/
│       └── home-page.tsx                   # Home page composition
│
├── widgets/                                # Layer 3: Complex UI blocks
│   └── home/
│       ├── index.ts                        # Public API exports
│       └── ui/
│           ├── home-hero.tsx               # Hero section widget
│           ├── home-stats.tsx              # Stats widget
│           └── home-features.tsx           # Features widget
│
├── features/                               # Layer 4: User interactions & business actions
│   │
│   ├── auth/                               # Example: Simple feature
│   │   ├── index.ts                        # Public API
│   │   └── components/
│   │       ├── sign-in-view.tsx
│   │       ├── sign-up-view.tsx
│   │       ├── user-auth-form.tsx
│   │       ├── github-auth-button.tsx
│   │       └── interactive-grid.tsx
│   │
│   ├── products/                           # Example: Feature with API & React Query
│   │   ├── index.ts                        # Public API
│   │   ├── components/
│   │   │   ├── product-form.tsx
│   │   │   ├── product-listing.tsx
│   │   │   ├── product-view-page.tsx
│   │   │   └── product-tables/
│   │   │       ├── index.tsx
│   │   │       ├── columns.tsx
│   │   │       ├── cell-action.tsx
│   │   │       └── options.tsx
│   │   ├── api/                            # API calls & React Query hooks
│   │   │   ├── product-api.ts              # API functions
│   │   │   ├── use-product-query.ts        # React Query hooks
│   │   │   ├── use-product-mutation.ts      # Mutation hooks
│   │   │   └── query-keys.ts               # Query key constants
│   │   ├── hooks/                          # Custom hooks (business logic)
│   │   │   ├── use-product-list.ts
│   │   │   ├── use-product-detail.ts
│   │   │   └── index.ts
│   │   ├── model/                          # Data models & types
│   │   │   ├── product.types.ts             # TypeScript types
│   │   │   ├── product.model.ts            # Data models
│   │   │   └── index.ts
│   │   ├── schemas/                        # Zod validation schemas
│   │   │   ├── product.schema.ts
│   │   │   └── index.ts
│   │   ├── utils/                          # Utility functions
│   │   │   ├── format-product.ts
│   │   │   ├── validate-product.ts
│   │   │   └── index.ts
│   │   └── helpers/                        # Helper functions
│   │       ├── product-helpers.ts
│   │       └── index.ts
│   │
│   ├── kanban/                             # Example: Feature with Zustand store
│   │   ├── index.ts                        # Public API
│   │   ├── components/
│   │   │   ├── kanban-view-page.tsx
│   │   │   ├── kanban-board.tsx
│   │   │   ├── board-column.tsx
│   │   │   ├── task-card.tsx
│   │   │   ├── column-action.tsx
│   │   │   ├── new-section-dialog.tsx
│   │   │   └── new-task-dialog.tsx
│   │   ├── store/                          # Zustand store
│   │   │   ├── kanban-store.ts
│   │   │   └── index.ts
│   │   ├── model/                          # Data models
│   │   │   ├── task.types.ts
│   │   │   ├── column.types.ts
│   │   │   └── index.ts
│   │   └── utils/                          # Utility functions
│   │       ├── index.ts
│   │       └── store.ts                    # Store utilities
│   │
│   ├── overview/                           # Example: Simple feature
│   │   ├── index.ts                        # Public API
│   │   └── components/
│   │       ├── overview.tsx
│   │       ├── area-graph.tsx
│   │       ├── area-graph-skeleton.tsx
│   │       ├── bar-graph.tsx
│   │       ├── bar-graph-skeleton.tsx
│   │       ├── pie-graph.tsx
│   │       ├── pie-graph-skeleton.tsx
│   │       ├── recent-sales.tsx
│   │       └── recent-sales-skeleton.tsx
│   │
│   ├── profile/                            # Example: Feature with schemas
│   │   ├── index.ts                        # Public API
│   │   ├── components/
│   │   │   └── profile-view-page.tsx
│   │   ├── schemas/                        # Zod schemas
│   │   │   └── form-schema.ts
│   │   └── utils/
│   │       └── form-schema.ts
│   │
│   └── orders/                              # Example: Complete feature structure
│       ├── index.ts                        # Public API (REQUIRED)
│       │
│       ├── components/                      # UI Components
│       │   ├── order-list.tsx
│       │   ├── order-card.tsx
│       │   ├── order-form.tsx
│       │   └── order-detail.tsx
│       │
│       ├── api/                            # API & React Query
│       │   ├── order-api.ts                 # API functions (fetch, create, update, delete)
│       │   ├── use-orders-query.ts          # React Query hooks (useQuery)
│       │   ├── use-order-mutation.ts       # Mutation hooks (useMutation)
│       │   ├── query-keys.ts               # Query key constants
│       │   └── index.ts
│       │
│       ├── hooks/                          # Custom hooks (business logic)
│       │   ├── use-order-list.ts           # Feature-specific hooks
│       │   ├── use-order-detail.ts
│       │   ├── use-create-order.ts
│       │   └── index.ts
│       │
│       ├── store/                          # Zustand store (client state)
│       │   ├── order-store.ts               # Store definition
│       │   └── index.ts
│       │
│       ├── model/                          # Data models & types
│       │   ├── order.types.ts               # TypeScript interfaces/types
│       │   ├── order.model.ts               # Data models/transformations
│       │   └── index.ts
│       │
│       ├── schemas/                        # Zod validation schemas
│       │   ├── order.schema.ts              # Validation schemas
│       │   ├── create-order.schema.ts
│       │   └── index.ts
│       │
│       ├── utils/                          # Utility functions
│       │   ├── format-order.ts              # Formatting utilities
│       │   ├── calculate-total.ts
│       │   ├── validate-order.ts
│       │   └── index.ts
│       │
│       └── helpers/                        # Helper functions
│           ├── order-helpers.ts             # Business logic helpers
│           ├── date-helpers.ts
│           └── index.ts
│
├── entities/                               # Layer 5: Business entities (Optional)
│   └── (not used yet - example structure below)
│   │
│   └── user/                               # Example entity structure
│       ├── index.ts                        # Public API
│       ├── model/
│       │   └── types.ts                    # User type definitions
│       ├── ui/
│       │   └── user-card.tsx              # User UI component
│       └── api/
│           └── user-api.ts                 # User API calls
│
└── shared/                                 # Layer 6: Reusable infrastructure (Bottom)
    │
    ├── components/                         # Shared components
    │   ├── ui/                            # Shadcn UI primitives
    │   │   ├── button.tsx
    │   │   ├── input.tsx
    │   │   ├── card.tsx
    │   │   ├── dialog.tsx
    │   │   ├── form.tsx
    │   │   ├── table.tsx
    │   │   ├── table/
    │   │   │   ├── data-table.tsx
    │   │   │   ├── data-table-column-header.tsx
    │   │   │   ├── data-table-toolbar.tsx
    │   │   │   ├── data-table-pagination.tsx
    │   │   │   └── ...                    # Other table components
    │   │   └── ...                        # All other Shadcn components
    │   │
    │   ├── forms/                         # Form field components
    │   │   ├── index.ts                    # Public API
    │   │   ├── form-input.tsx
    │   │   ├── form-textarea.tsx
    │   │   ├── form-select.tsx
    │   │   ├── form-checkbox.tsx
    │   │   ├── form-checkbox-group.tsx
    │   │   ├── form-radio-group.tsx
    │   │   ├── form-switch.tsx
    │   │   ├── form-slider.tsx
    │   │   ├── form-date-picker.tsx
    │   │   ├── form-file-upload.tsx
    │   │   └── demo-form.tsx
    │   │
    │   ├── navigation/                    # Navigation components
    │   │   ├── index.ts                    # Public API
    │   │   ├── breadcrumbs.tsx
    │   │   ├── nav-main.tsx
    │   │   ├── nav-projects.tsx
    │   │   └── nav-user.tsx
    │   │
    │   ├── layout/                       # Layout components
    │   │   ├── index.ts                    # Public API
    │   │   ├── app-sidebar.tsx
    │   │   ├── header.tsx
    │   │   ├── page-container.tsx
    │   │   ├── providers.tsx
    │   │   ├── user-nav.tsx
    │   │   ├── cta-github.tsx
    │   │   └── ThemeToggle/
    │   │       ├── theme-provider.tsx
    │   │       └── theme-toggle.tsx
    │   │
    │   ├── common/                        # Common shared components
    │   │   ├── index.ts                    # Public API
    │   │   ├── icons.tsx
    │   │   ├── file-uploader.tsx
    │   │   ├── form-card-skeleton.tsx
    │   │   ├── user-avatar-profile.tsx
    │   │   ├── org-switcher.tsx
    │   │   ├── search-input.tsx
    │   │   ├── theme-selector.tsx
    │   │   └── active-theme.tsx
    │   │
    │   ├── kbar/                         # Command+K interface
    │   │   ├── index.tsx
    │   │   ├── render-result.tsx
    │   │   ├── result-item.tsx
    │   │   └── use-theme-switching.tsx
    │   │
    │   └── modal/                        # Modal components
    │       └── alert-modal.tsx
    │
    ├── lib/                               # Utility functions
    │   ├── utils.ts                       # General utilities (cn, etc.)
    │   ├── format.ts                       # Formatting functions
    │   ├── parsers.ts                      # Parsing utilities
    │   ├── searchparams.ts                 # Search params utilities
    │   ├── data-table.ts                   # Data table utilities
    │   └── font.ts                         # Font configuration
    │
    ├── hooks/                             # Reusable hooks (no business logic)
    │   ├── use-debounce.tsx
    │   ├── use-debounced-callback.ts
    │   ├── use-media-query.ts
    │   ├── use-mobile.tsx
    │   ├── use-breadcrumbs.tsx
    │   ├── use-nav.ts
    │   ├── use-data-table.ts
    │   ├── use-controllable-state.tsx
    │   ├── use-callback-ref.ts
    │   └── use-multistep-form.tsx
    │
    ├── config/                            # App-wide configurations
    │   ├── nav-config.ts                  # Navigation configuration
    │   └── data-table.ts                  # Data table configuration
    │
    ├── constants/                         # Shared constants
    │   ├── data.ts                        # Mock data
    │   └── mock-api.ts                    # Mock API responses
    │
    └── types/                              # Shared TypeScript types
        ├── index.ts                        # Public API
        ├── base-form.ts                    # Form types
        └── data-table.ts                   # Data table types
```

### File Naming Conventions

- **Components**: `kebab-case.tsx` (e.g., `user-profile-card.tsx`)
- **Hooks**: `use-kebab-case.tsx` (e.g., `use-auth.tsx`)
- **Types**: `kebab-case.types.ts` (e.g., `user.types.ts`)
- **Utils**: `kebab-case.ts` (e.g., `format-date.ts`)
- **Index files**: `index.ts` (public API exports)

### Directory Structure Pattern

Mỗi feature/widget nên follow pattern này. **Không phải tất cả folders đều bắt buộc**, chỉ tạo khi cần:

```plaintext
feature-name/
├── index.ts                    # Public API (REQUIRED) - Export tất cả public APIs
│
├── components/                  # UI Components (REQUIRED nếu có UI)
│   ├── feature-component.tsx
│   └── ...
│
├── api/                        # API calls & React Query hooks (Optional)
│   ├── feature-api.ts          # API functions (fetch, create, update, delete)
│   ├── use-feature-query.ts    # React Query hooks (useQuery)
│   ├── use-feature-mutation.ts # Mutation hooks (useMutation)
│   ├── query-keys.ts           # Query key constants
│   └── index.ts
│
├── hooks/                      # Custom hooks với business logic (Optional)
│   ├── use-feature-name.ts     # Feature-specific hooks
│   └── index.ts
│
├── store/                      # Zustand store cho client state (Optional)
│   ├── feature-store.ts        # Store definition
│   └── index.ts
│
├── model/                      # Data models & types (Optional)
│   ├── feature.types.ts        # TypeScript interfaces/types
│   ├── feature.model.ts        # Data models/transformations
│   └── index.ts
│
├── schemas/                    # Zod validation schemas (Optional)
│   ├── feature.schema.ts       # Validation schemas
│   └── index.ts
│
├── utils/                      # Utility functions (Optional)
│   ├── format-feature.ts       # Formatting utilities
│   ├── validate-feature.ts
│   └── index.ts
│
└── helpers/                    # Helper functions (Optional)
    ├── feature-helpers.ts      # Business logic helpers
    └── index.ts
```

### Khi nào dùng folder nào?

| Folder | Khi nào dùng | Ví dụ |
|--------|-------------|-------|
| **`components/`** | Luôn cần nếu có UI | Buttons, forms, cards |
| **`api/`** | Khi cần fetch data từ server | `use-product-query.ts`, `product-api.ts` |
| **`hooks/`** | Khi có business logic phức tạp | `use-order-list.ts`, `use-cart.ts` |
| **`store/`** | Khi cần client-side state | Zustand stores cho cart, UI state |
| **`model/`** | Khi có data models phức tạp | Type definitions, data transformations |
| **`schemas/`** | Khi cần form validation | Zod schemas cho forms |
| **`utils/`** | Khi có utility functions | Formatting, calculations |
| **`helpers/`** | Khi có helper functions | Business logic helpers |

### Ví dụ cụ thể cho từng folder:

#### 1. `api/` - API calls & React Query

```tsx
// features/products/api/product-api.ts
export async function getProducts(filters?: ProductFilters) {
  const response = await fetch('/api/products', {
    method: 'POST',
    body: JSON.stringify(filters),
  });
  return response.json();
}

export async function createProduct(data: CreateProductDto) {
  const response = await fetch('/api/products', {
    method: 'POST',
    body: JSON.stringify(data),
  });
  return response.json();
}
```

```tsx
// features/products/api/query-keys.ts
export const productQueryKeys = {
  all: ['products'] as const,
  lists: () => [...productQueryKeys.all, 'list'] as const,
  list: (filters: string) => [...productQueryKeys.lists(), { filters }] as const,
  details: () => [...productQueryKeys.all, 'detail'] as const,
  detail: (id: string) => [...productQueryKeys.details(), id] as const,
};
```

```tsx
// features/products/api/use-product-query.ts
'use client';

import { useQuery } from '@tanstack/react-query';
import { productQueryKeys } from './query-keys';
import { getProducts } from './product-api';

export function useProducts(filters?: ProductFilters) {
  return useQuery({
    queryKey: productQueryKeys.list(JSON.stringify(filters)),
    queryFn: () => getProducts(filters),
  });
}
```

```tsx
// features/products/api/use-product-mutation.ts
'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { productQueryKeys } from './query-keys';
import { createProduct } from './product-api';

export function useCreateProduct() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: productQueryKeys.lists() });
    },
  });
}
```

#### 2. `store/` - Zustand store

```tsx
// features/cart/store/cart-store.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (item) =>
        set((state) => ({ items: [...state.items, item] })),
      removeItem: (id) =>
        set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
      clearCart: () => set({ items: [] }),
    }),
    { name: 'cart-storage' }
  )
);
```

#### 3. `model/` - Data models & types

```tsx
// features/products/model/product.types.ts
export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateProductDto {
  name: string;
  price: number;
  description: string;
  category: string;
  imageUrl?: string;
}

export interface ProductFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
}
```

```tsx
// features/products/model/product.model.ts
import type { Product, CreateProductDto } from './product.types';

export function transformProduct(data: any): Product {
  return {
    ...data,
    createdAt: new Date(data.createdAt),
    updatedAt: new Date(data.updatedAt),
  };
}

export function validateProduct(product: CreateProductDto): boolean {
  return product.name.length > 0 && product.price > 0;
}
```

#### 4. `schemas/` - Zod validation schemas

```tsx
// features/products/schemas/product.schema.ts
import { z } from 'zod';

export const createProductSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  price: z.number().positive('Price must be positive'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  category: z.string().min(1, 'Category is required'),
  imageUrl: z.string().url().optional(),
});

export type CreateProductInput = z.infer<typeof createProductSchema>;
```

#### 5. `utils/` - Utility functions

```tsx
// features/products/utils/format-product.ts
import type { Product } from '../model/product.types';

export function formatProductPrice(product: Product): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(product.price);
}

export function formatProductDate(product: Product): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(product.createdAt);
}
```

#### 6. `helpers/` - Helper functions

```tsx
// features/products/helpers/product-helpers.ts
import type { Product, ProductFilters } from '../model/product.types';

export function filterProducts(
  products: Product[],
  filters: ProductFilters
): Product[] {
  return products.filter((product) => {
    if (filters.category && product.category !== filters.category) {
      return false;
    }
    if (filters.minPrice && product.price < filters.minPrice) {
      return false;
    }
    if (filters.maxPrice && product.price > filters.maxPrice) {
      return false;
    }
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      return (
        product.name.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower)
      );
    }
    return true;
  });
}

export function sortProducts(
  products: Product[],
  sortBy: 'name' | 'price' | 'date'
): Product[] {
  return [...products].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'price':
        return a.price - b.price;
      case 'date':
        return a.createdAt.getTime() - b.createdAt.getTime();
      default:
        return 0;
    }
  });
}
```

#### 7. `hooks/` - Custom hooks với business logic

```tsx
// features/products/hooks/use-product-list.ts
'use client';

import { useProducts } from '../api/use-product-query';
import { filterProducts, sortProducts } from '../helpers/product-helpers';
import type { ProductFilters } from '../model/product.types';

export function useProductList(filters?: ProductFilters, sortBy?: 'name' | 'price' | 'date') {
  const { data: products, isLoading, error } = useProducts();
  
  const filteredProducts = filterProducts(products ?? [], filters ?? {});
  const sortedProducts = sortProducts(filteredProducts, sortBy ?? 'name');
  
  return {
    products: sortedProducts,
    isLoading,
    error,
  };
}
```

### Example: Creating a New Feature

Dưới đây là ví dụ cụ thể khi tạo feature `notifications`:

**Step 1: Tạo cấu trúc thư mục**

```plaintext
src/features/notifications/
├── index.ts                        # Public API (REQUIRED)
├── components/                      # UI Components
│   ├── notification-list.tsx
│   ├── notification-item.tsx
│   └── notification-bell.tsx
├── api/                            # API & React Query
│   ├── notification-api.ts         # API functions
│   ├── use-notifications-query.ts   # React Query hooks
│   ├── use-notification-mutation.ts # Mutation hooks
│   ├── query-keys.ts               # Query key constants
│   └── index.ts
├── hooks/                          # Custom hooks (business logic)
│   ├── use-notifications.ts
│   └── index.ts
├── store/                          # Zustand store (nếu cần client state)
│   ├── notification-store.ts
│   └── index.ts
├── model/                          # Data models & types
│   ├── notification.types.ts       # TypeScript types
│   ├── notification.model.ts       # Data models
│   └── index.ts
├── schemas/                        # Zod validation schemas
│   ├── notification.schema.ts
│   └── index.ts
├── utils/                          # Utility functions
│   ├── format-notification.ts
│   └── index.ts
└── helpers/                        # Helper functions
    ├── notification-helpers.ts
    └── index.ts
```

**Step 2: Tạo model/types**

```tsx
// src/features/notifications/model/notification.types.ts
export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  createdAt: Date;
  read: boolean;
}

export interface CreateNotificationDto {
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
}
```

```tsx
// src/features/notifications/model/notification.model.ts
import type { Notification } from './notification.types';

export function transformNotification(data: any): Notification {
  return {
    ...data,
    createdAt: new Date(data.createdAt),
  };
}
```

```tsx
// src/features/notifications/model/index.ts
export type { Notification, CreateNotificationDto } from './notification.types';
export { transformNotification } from './notification.model';
```

**Step 3: Tạo components**

```tsx
// src/features/notifications/components/notification-item.tsx
'use client';

import { Card, CardContent } from '@/shared/components/ui/card';
import type { Notification } from '../types/notification.types';

interface NotificationItemProps {
  notification: Notification;
}

export function NotificationItem({ notification }: NotificationItemProps) {
  return (
    <Card>
      <CardContent>
        <h3>{notification.title}</h3>
        <p>{notification.message}</p>
      </CardContent>
    </Card>
  );
}
```

**Step 3: Tạo API & React Query hooks**

```tsx
// src/features/notifications/api/query-keys.ts
export const notificationQueryKeys = {
  all: ['notifications'] as const,
  lists: () => [...notificationQueryKeys.all, 'list'] as const,
  details: () => [...notificationQueryKeys.all, 'detail'] as const,
  detail: (id: string) => [...notificationQueryKeys.details(), id] as const,
};
```

```tsx
// src/features/notifications/api/notification-api.ts
import type { Notification, CreateNotificationDto } from '../model/notification.types';

export async function getNotifications(): Promise<Notification[]> {
  const response = await fetch('/api/notifications');
  return response.json();
}

export async function createNotification(
  data: CreateNotificationDto
): Promise<Notification> {
  const response = await fetch('/api/notifications', {
    method: 'POST',
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function markAsRead(id: string): Promise<Notification> {
  const response = await fetch(`/api/notifications/${id}/read`, {
    method: 'PATCH',
  });
  return response.json();
}
```

```tsx
// src/features/notifications/api/use-notifications-query.ts
'use client';

import { useQuery } from '@tanstack/react-query';
import { notificationQueryKeys } from './query-keys';
import { getNotifications } from './notification-api';

export function useNotifications() {
  return useQuery({
    queryKey: notificationQueryKeys.lists(),
    queryFn: getNotifications,
  });
}
```

```tsx
// src/features/notifications/api/use-notification-mutation.ts
'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { notificationQueryKeys } from './query-keys';
import { createNotification, markAsRead } from './notification-api';
import type { CreateNotificationDto } from '../model/notification.types';

export function useCreateNotification() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: CreateNotificationDto) => createNotification(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notificationQueryKeys.lists() });
    },
  });
}

export function useMarkAsRead() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => markAsRead(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notificationQueryKeys.lists() });
    },
  });
}
```

```tsx
// src/features/notifications/api/index.ts
export { useNotifications } from './use-notifications-query';
export { useCreateNotification, useMarkAsRead } from './use-notification-mutation';
export * from './notification-api';
```

**Step 4: Tạo custom hooks (nếu cần business logic)**

```tsx
// src/features/notifications/hooks/use-notifications.ts
'use client';

import { useNotifications } from '../api/use-notifications-query';
import { filterUnreadNotifications } from '../helpers/notification-helpers';

export function useUnreadNotifications() {
  const { data: notifications, isLoading, error } = useNotifications();
  
  const unreadNotifications = filterUnreadNotifications(notifications ?? []);
  
  return {
    notifications: unreadNotifications,
    unreadCount: unreadNotifications.length,
    isLoading,
    error,
  };
}
```

```tsx
// src/features/notifications/hooks/index.ts
export { useUnreadNotifications } from './use-notifications';
```

**Step 5: Tạo schemas (nếu cần validation)**

```tsx
// src/features/notifications/schemas/notification.schema.ts
import { z } from 'zod';

export const createNotificationSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  message: z.string().min(1, 'Message is required'),
  type: z.enum(['info', 'success', 'warning', 'error']),
});

export type CreateNotificationInput = z.infer<typeof createNotificationSchema>;
```

**Step 6: Tạo utils & helpers**

```tsx
// src/features/notifications/utils/format-notification.ts
import type { Notification } from '../model/notification.types';

export function formatNotificationDate(notification: Notification): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(notification.createdAt);
}
```

```tsx
// src/features/notifications/helpers/notification-helpers.ts
import type { Notification } from '../model/notification.types';

export function filterUnreadNotifications(
  notifications: Notification[]
): Notification[] {
  return notifications.filter((n) => !n.read);
}

export function groupNotificationsByType(
  notifications: Notification[]
): Record<string, Notification[]> {
  return notifications.reduce((acc, notification) => {
    const type = notification.type;
    if (!acc[type]) {
      acc[type] = [];
    }
    acc[type].push(notification);
    return acc;
  }, {} as Record<string, Notification[]>);
}
```

**Step 7: Tạo Public API (index.ts)**

```tsx
// src/features/notifications/index.ts
// ✅ Export components
export { NotificationItem } from './components/notification-item';
export { NotificationList } from './components/notification-list';
export { NotificationBell } from './components/notification-bell';

// ✅ Export hooks
export { useUnreadNotifications } from './hooks';
export { useNotifications, useCreateNotification, useMarkAsRead } from './api';

// ✅ Export types
export type { Notification, CreateNotificationDto } from './model';

// ✅ Export schemas
export { createNotificationSchema } from './schemas';
export type { CreateNotificationInput } from './schemas';

// ❌ DON'T export internal utilities
// export { formatNotificationDate } from './utils/format-notification';
// export { filterUnreadNotifications } from './helpers/notification-helpers';
```

**Step 6: Sử dụng feature trong widget/page**

```tsx
// src/widgets/header/ui/notification-widget.tsx
'use client';

import { NotificationBell } from '@/features/notifications';
import { useNotifications } from '@/features/notifications';

export function NotificationWidget() {
  const { data: notifications } = useNotifications();
  
  return (
    <div>
      <NotificationBell count={notifications?.length ?? 0} />
    </div>
  );
}
```

**Step 7: Sử dụng trong page**

```tsx
// src/page/notifications/notifications-page.tsx
import { NotificationList } from '@/features/notifications';
import { NotificationWidget } from '@/widgets/header/ui/notification-widget';

export default function NotificationsPage() {
  return (
    <div>
      <NotificationWidget />
      <NotificationList />
    </div>
  );
}
```

### Checklist khi tạo Feature mới

- [ ] Tạo thư mục `src/features/your-feature/`
- [ ] Tạo `index.ts` với public API exports
- [ ] Tạo `components/` với feature components
- [ ] Tạo `types/` nếu cần type definitions
- [ ] Tạo `hooks/` nếu cần custom hooks
- [ ] Tạo `utils/` nếu cần helper functions
- [ ] **KHÔNG** export internal utilities từ `index.ts`
- [ ] Import từ `@/shared/components/ui/` cho UI primitives
- [ ] Test imports từ các layer khác (widgets, pages)
- [ ] Chạy `bun run lint` để kiểm tra FSD rules

### Layer Usage Examples

#### ✅ Correct Imports

```tsx
// ✅ features/auth/components/sign-in-form.tsx
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Card } from '@/shared/components/ui/card';

// ✅ widgets/home/ui/home-hero.tsx
import { Button } from '@/shared/components/ui/button';
import { Card } from '@/shared/components/ui/card';

// ✅ page/home/home-page.tsx
import { HomeHero, HomeStats } from '@/widgets/home';

// ✅ app/dashboard/page.tsx
import { DashboardPage } from '@/page/dashboard';
```

#### ❌ Incorrect Imports (Blocked by ESLint)

```tsx
// ❌ shared/components/common/icons.tsx
import { useAuth } from '@/features/auth'; // ERROR: shared cannot import from features

// ❌ widgets/home/ui/home-hero.tsx
import { DashboardPage } from '@/page/dashboard'; // ERROR: widgets cannot import from pages

// ❌ page/home/home-page.tsx
import { SignInForm } from '@/features/auth'; // ERROR: pages cannot import from features
```

### Shared Layer Organization

The `shared/` layer is organized into logical groups:

- **`components/ui/`** - Shadcn UI primitives (buttons, inputs, cards, etc.)
- **`components/forms/`** - Form field components wrapping react-hook-form
- **`components/navigation/`** - Navigation-related components (breadcrumbs, nav menus)
- **`components/layout/`** - Layout components (sidebar, header, page container)
- **`components/common/`** - Common shared components (icons, file uploader, etc.)
- **`components/kbar/`** - Command+K interface components
- **`components/modal/`** - Modal and dialog components
- **`lib/`** - Utility functions and helpers
- **`hooks/`** - Reusable hooks without business logic
- **`config/`** - App-wide configurations
- **`constants/`** - Shared constants
- **`types/`** - Shared TypeScript types

### Public API Pattern

Each feature/widget should export a public API via `index.ts`:

```tsx
// ✅ features/auth/index.ts
export { SignInForm, SignUpForm } from './components';
export { useAuth } from './hooks';
export type { AuthUser } from './types';

// ❌ DON'T export internal utilities
// export { internalHelper } from './utils/internal';
```

### Import Best Practices

1. **Always import from public APIs** (`index.ts` files)
2. **Use absolute imports** with `@/` alias
3. **Group imports**: external → shared → features → widgets → pages
4. **Use type imports** when importing only types: `import type { ... }`

## Getting Started

> [!NOTE]  
> This admin dashboard starter uses **Next.js 16 (App Router)** with **React 19** and **Shadcn UI**. Follow these steps to run it locally:

Clone the repo:

```
git clone https://github.com/Kiranism/next-shadcn-dashboard-starter.git
```

- `bun install`
- Create a `.env.local` file by copying the example environment file:
  `cp env.example.txt .env.local`
- Add the required environment variables to the `.env.local` file.
- `bun run dev`

##### Environment Configuration Setup

To configure the environment for this project, refer to the `env.example.txt` file. This file contains the necessary environment variables required for authentication and error tracking.

##### Clerk Setup

For detailed instructions on configuring Clerk authentication (including organizations/workspaces/teams), please refer to [clerk_setup.md](./docs/clerk_setup.md).

You should now be able to access the application at http://localhost:3000.

## Development Guidelines

### Code Quality & Linting

This project uses **ESLint** with strict FSD dependency rules. The linter will automatically:

- ✅ Enforce FSD layer import restrictions
- ✅ Detect unused imports and variables
- ✅ Validate TypeScript types
- ✅ Check React hooks dependencies
- ✅ Enforce code style consistency

**Run linting:**
```bash
bun run lint
```

**Auto-fix issues:**
```bash
bun run lint:fix
```

### FSD Dependency Rules

The following rules are **automatically enforced** by ESLint:

| Layer | Can Import From | Cannot Import From |
|-------|----------------|-------------------|
| `shared/` | External libraries only | `features/`, `entities/`, `widgets/`, `pages/`, `app/` |
| `entities/` | `shared/` | `features/`, `widgets/`, `pages/`, `app/` |
| `features/` | `entities/`, `shared/` | `widgets/`, `pages/`, `app/` |
| `widgets/` | `features/`, `shared/` | `pages/`, `app/`, `entities/` |
| `page/` | `widgets/`, `shared/` | `features/`, `entities/`, `app/` |
| `app/` | All layers | None (top level) |

**Violations will show as ESLint errors** with clear messages indicating the FSD rule violation.

### Creating New Features

When creating a new feature:

1. **Create feature directory** in `src/features/your-feature/`
2. **Add components** in `components/` subdirectory
3. **Export public API** via `index.ts`:
   ```tsx
   // src/features/your-feature/index.ts
   export { YourComponent } from './components';
   export { useYourHook } from './hooks';
   export type { YourType } from './types';
   ```
4. **Import from public API** in other layers:
   ```tsx
   // ✅ Correct
   import { YourComponent } from '@/features/your-feature';
   
   // ❌ Wrong
   import { YourComponent } from '@/features/your-feature/components/your-component';
   ```

### Using Shared Components

**Shadcn UI Components:**
```tsx
import { Button } from '@/shared/components/ui/button';
import { Card, CardContent } from '@/shared/components/ui/card';
```

**Form Components:**
```tsx
import { FormInput, FormSelect } from '@/shared/components/forms';
```

**Navigation Components:**
```tsx
import { Breadcrumbs, NavMain } from '@/shared/components/navigation';
```

**Layout Components:**
```tsx
import { Header, AppSidebar, PageContainer } from '@/shared/components/layout';
```

**Common Components:**
```tsx
import { Icons, FileUploader, UserAvatarProfile } from '@/shared/components/common';
```

> [!WARNING]
> After cloning or forking the repository, be cautious when pulling or syncing with the latest changes, as this may result in breaking conflicts.

Cheers! 🥂

<!--

SEO keywords:

nextjs admin dashboard, nextjs dashboard template, shadcn ui dashboard,

admin dashboard starter, dashboard ui template, nextjs shadcn admin panel,

react admin dashboard, tailwind css admin dashboard

-->

## Star History

<a href="https://www.star-history.com/#Kiranism/next-shadcn-dashboard-starter&type=date&legend=top-left">
 <picture>
   <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/svg?repos=Kiranism/next-shadcn-dashboard-starter&type=date&theme=dark&legend=top-left" />
   <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/svg?repos=Kiranism/next-shadcn-dashboard-starter&type=date&legend=top-left" />
   <img alt="Star History Chart" src="https://api.star-history.com/svg?repos=Kiranism/next-shadcn-dashboard-starter&type=date&legend=top-left" />
 </picture>
</a>
