# Next.js 16 — Architecture Reference

> Rendering, caching, routing, and data fetching patterns.

---

## PROJECT STRUCTURE

```
src/
├── app/                          # App Router
│   ├── (auth)/                   # Route group (no URL segment)
│   │   ├── login/page.tsx
│   │   └── register/page.tsx
│   ├── dashboard/
│   │   ├── page.tsx              # /dashboard
│   │   ├── loading.tsx           # REQUIRED: Suspense fallback
│   │   ├── error.tsx             # REQUIRED: Error boundary
│   │   ├── not-found.tsx         # 404 for this route
│   │   └── layout.tsx            # Nested layout
│   ├── api/
│   │   └── users/route.ts        # API route handler
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Home page
│   ├── loading.tsx               # Global loading
│   ├── error.tsx                 # Global error
│   ├── not-found.tsx             # Global 404
│   ├── global-error.tsx          # Root error boundary
│   └── proxy.ts                  # Next 16: replaces middleware
│
├── features/                     # Feature modules
│   └── [feature]/
│       ├── components/
│       ├── hooks/
│       ├── api/
│       ├── types/
│       └── index.ts              # Public API
│
└── shared/                       # Shared code
    ├── ui/                       # shadcn wrappers
    ├── lib/                      # Utilities
    └── types/
```

---

## RENDERING MODES

| Mode    | Config                      | Use Case                       |
| ------- | --------------------------- | ------------------------------ |
| **SSG** | Default                     | Static content, blogs, docs    |
| **ISR** | `revalidate = N`            | Static + periodic updates      |
| **SSR** | `dynamic = 'force-dynamic'` | Per-request personalization    |
| **PPR** | `'use cache'` + Suspense    | Static shell + dynamic islands |
| **CSR** | `'use client'`              | Heavy interactivity            |

### SSG (Static Site Generation)

```tsx
// Default — no config needed
// Page is built at build time
async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);
  return <Article post={post} />;
}

// Generate static paths
export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}
```

### ISR (Incremental Static Regeneration)

```tsx
// Revalidate every 60 seconds
export const revalidate = 60;

async function ProductList() {
  const products = await getProducts();
  return <Grid products={products} />;
}

// On-demand revalidation
import { revalidatePath, revalidateTag } from "next/cache";

// In Server Action or Route Handler
revalidatePath("/products");
revalidateTag("products");
```

### SSR (Server-Side Rendering)

```tsx
// Force dynamic rendering
export const dynamic = "force-dynamic";

async function Dashboard() {
  const user = await getCurrentUser(); // Per-request
  return <DashboardContent user={user} />;
}
```

### PPR (Partial Pre-Rendering)

```tsx
// next.config.ts
export default {
  experimental: { ppr: true },
};

// Static shell with dynamic holes
async function ProductPage({ params }: { params: { id: string } }) {
  return (
    <>
      <StaticHeader /> {/* Pre-rendered */}
      <StaticNavigation /> {/* Pre-rendered */}
      <Suspense fallback={<ProductSkeleton />}>
        <DynamicProduct id={params.id} /> {/* Streamed */}
      </Suspense>
      <Suspense fallback={<ReviewsSkeleton />}>
        <DynamicReviews id={params.id} /> {/* Streamed */}
      </Suspense>
    </>
  );
}
```

---

## CACHE COMPONENTS (Next 16) 🆕

### Basic Caching

```tsx
// Function-level cache
async function getProducts() {
  "use cache";
  return await db.product.findMany();
}

// With cache tag for invalidation
async function getProduct(id: string) {
  "use cache";
  cacheTag(`product-${id}`);
  return await db.product.findUnique({ where: { id } });
}
```

### Cache Lifetime Profiles

```tsx
async function getAnalytics() {
  "use cache";
  cacheLife("hours"); // Built-in profile
  return await fetchAnalytics();
}

// Built-in profiles: 'seconds', 'minutes', 'hours', 'days', 'weeks', 'max'

// Custom profile in next.config.ts
export default {
  experimental: {
    cacheLife: {
      custom: {
        stale: 60, // Serve stale for 60s
        revalidate: 300, // Revalidate after 5min
        expire: 3600, // Expire after 1hr
      },
    },
  },
};
```

### Cache Invalidation

```tsx
import { revalidateTag, updateTag } from "next/cache";

// Invalidate + trigger refetch (requires cacheLife)
revalidateTag("product-123", "max");

// Mark stale without immediate refetch
updateTag("products");

// Path-based invalidation
revalidatePath("/products");
revalidatePath("/products/[id]", "page");
revalidatePath("/products", "layout");
```

---

## PROXY (Next 16) 🆕

Replaces `middleware.ts` — clearer network boundary handling.

```tsx
// src/app/proxy.ts
import type { ProxyRequest, ProxyResponse } from "next/server";

export function proxy(request: ProxyRequest): ProxyResponse {
  const { pathname } = request.nextUrl;

  // 1. Auth Guard
  if (pathname.startsWith("/dashboard")) {
    const token = request.cookies.get("auth-token");
    if (!token) {
      return Response.redirect(new URL("/login", request.url));
    }
  }

  // 2. API Rewrites
  if (pathname.startsWith("/api/v1")) {
    return request.rewrite(new URL(pathname, process.env.API_URL));
  }

  // 3. Geo-based routing
  const country = request.headers.get("x-vercel-ip-country");
  if (pathname === "/" && country === "DE") {
    return request.rewrite(new URL("/de", request.url));
  }

  // 4. Add custom headers
  const response = request.next();
  response.headers.set("x-custom-header", "value");

  return response;
}

export const config = {
  matcher: ["/dashboard/:path*", "/api/:path*", "/"],
};
```

---

## ROUTE HANDLERS

```tsx
// app/api/users/route.ts
import { NextRequest, NextResponse } from "next/server";

// GET /api/users
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;

  const users = await getUsers({ page, limit });

  return NextResponse.json(users);
}

// POST /api/users
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = CreateUserSchema.parse(body);
    const user = await createUser(validated);

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 400 }
      );
    }
    throw error;
  }
}

// Dynamic route: app/api/users/[id]/route.ts
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await getUser(params.id);

  if (!user) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(user);
}
```

---

## SERVER ACTIONS

```tsx
// features/posts/api/actions.ts
"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export async function createPost(formData: FormData) {
  // 1. Validate
  const data = {
    title: formData.get("title") as string,
    content: formData.get("content") as string,
  };
  const validated = PostSchema.parse(data);

  // 2. Create
  const post = await db.post.create({ data: validated });

  // 3. Revalidate cache
  revalidateTag("posts");

  // 4. Redirect
  redirect(`/posts/${post.id}`);
}

export async function deletePost(id: string) {
  await db.post.delete({ where: { id } });
  revalidatePath("/posts");
  return { success: true };
}

export async function updatePost(id: string, formData: FormData) {
  const data = Object.fromEntries(formData);
  const validated = UpdatePostSchema.parse(data);

  const post = await db.post.update({
    where: { id },
    data: validated,
  });

  revalidateTag(`post-${id}`);
  return post;
}
```

### Using Server Actions

```tsx
// With form
<form action={createPost}>
  <input name="title" required />
  <textarea name="content" required />
  <SubmitButton />
</form>;

// With useActionState
("use client");

function PostForm() {
  const [state, formAction, isPending] = useActionState(createPost, null);

  return (
    <form action={formAction}>
      {state?.error && <p className="text-red-500">{state.error}</p>}
      <input name="title" required />
      <button disabled={isPending}>
        {isPending ? "Creating..." : "Create"}
      </button>
    </form>
  );
}

// Programmatic call
("use client");

function DeleteButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      disabled={isPending}
      onClick={() => startTransition(() => deletePost(id))}
    >
      {isPending ? "Deleting..." : "Delete"}
    </button>
  );
}
```

---

## REQUIRED FILES

### loading.tsx

```tsx
// Automatic Suspense boundary for route
export default function Loading() {
  return (
    <div className="animate-pulse">
      <div className="h-8 bg-gray-200 rounded w-1/4 mb-4" />
      <div className="h-4 bg-gray-200 rounded w-full mb-2" />
      <div className="h-4 bg-gray-200 rounded w-3/4" />
    </div>
  );
}
```

### error.tsx

```tsx
"use client"; // MUST be client component

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log to error tracking
    console.error(error);
  }, [error]);

  return (
    <div role="alert" className="p-4 border border-red-500 rounded">
      <h2 className="text-lg font-bold text-red-500">Something went wrong!</h2>
      <p className="text-gray-600 mt-2">{error.message}</p>
      <button
        onClick={reset}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
      >
        Try again
      </button>
    </div>
  );
}
```

### not-found.tsx

```tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="text-center py-20">
      <h2 className="text-2xl font-bold">Not Found</h2>
      <p className="text-gray-600 mt-2">Could not find requested resource</p>
      <Link href="/" className="text-blue-500 mt-4 inline-block">
        Return Home
      </Link>
    </div>
  );
}

// Trigger programmatically
import { notFound } from "next/navigation";

async function UserPage({ params }: { params: { id: string } }) {
  const user = await getUser(params.id);

  if (!user) {
    notFound(); // Renders not-found.tsx
  }

  return <UserProfile user={user} />;
}
```

---

## DATA FETCHING PATTERNS

### Server Components (Default)

```tsx
// Direct async/await
async function UserList() {
  const users = await db.user.findMany();
  return (
    <ul>
      {users.map((u) => (
        <li key={u.id}>{u.name}</li>
      ))}
    </ul>
  );
}

// Parallel fetching
async function Dashboard() {
  const [user, posts, analytics] = await Promise.all([
    getUser(),
    getPosts(),
    getAnalytics(),
  ]);

  return (
    <>
      <UserCard user={user} />
      <PostList posts={posts} />
      <AnalyticsChart data={analytics} />
    </>
  );
}

// Sequential (when dependent)
async function PostWithAuthor({ postId }: { postId: string }) {
  const post = await getPost(postId);
  const author = await getUser(post.authorId); // Depends on post

  return <Article post={post} author={author} />;
}
```

### Client Components (React Query)

```tsx
"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// Query keys factory
export const postKeys = {
  all: ["posts"] as const,
  lists: () => [...postKeys.all, "list"] as const,
  list: (filters: Filters) => [...postKeys.lists(), filters] as const,
  details: () => [...postKeys.all, "detail"] as const,
  detail: (id: string) => [...postKeys.details(), id] as const,
};

// Query hook
export function usePosts(filters: Filters) {
  return useQuery({
    queryKey: postKeys.list(filters),
    queryFn: () => fetchPosts(filters),
    staleTime: 5 * 60 * 1000,
  });
}

// Mutation with optimistic update
export function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPost,
    onMutate: async (newPost) => {
      await queryClient.cancelQueries({ queryKey: postKeys.lists() });
      const previous = queryClient.getQueryData(postKeys.lists());

      queryClient.setQueryData(postKeys.lists(), (old: Post[]) => [
        ...old,
        { ...newPost, id: "temp", pending: true },
      ]);

      return { previous };
    },
    onError: (err, newPost, context) => {
      queryClient.setQueryData(postKeys.lists(), context?.previous);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: postKeys.lists() });
    },
  });
}
```

---

## RENDERING DECISION TREE

```
Is the content static?
├─ Yes, never changes → SSG (default)
├─ Yes, but updates periodically → ISR (revalidate = N)
└─ No, changes per request → SSR (dynamic = 'force-dynamic')

Need mix of static + dynamic?
└─ PPR ('use cache' + Suspense boundaries)

Need client interactivity?
├─ Heavy (charts, editors) → CSR ('use client')
└─ Light (clicks, forms) → Server Actions + minimal 'use client'
```
