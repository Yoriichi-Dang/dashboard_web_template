# Accessibility (a11y) Best Practices

> WCAG 2.1 Level AA compliance for React 19.2 + Next.js 16

---

## ACCESSIBILITY PRINCIPLES (POUR)

**P**erceivable - Information must be presentable to all users  
**O**perable - Interface must be usable by all users  
**U**nderstandable - Content must be clear and predictable  
**R**obust - Content must work with current and future technologies

---

## SEMANTIC HTML

### Use Correct Elements

```tsx
// ✅ GOOD: Semantic HTML
function Article({ post }: Props) {
  return (
    <article>
      <header>
        <h1>{post.title}</h1>
        <p>
          By <strong>{post.author}</strong> on{' '}
          <time dateTime={post.date.toISOString()}>
            {formatDate(post.date)}
          </time>
        </p>
      </header>
      
      <main>
        <p>{post.content}</p>
      </main>
      
      <footer>
        <nav aria-label="Post navigation">
          <a href={post.prevUrl}>← Previous</a>
          <a href={post.nextUrl}>Next →</a>
        </nav>
      </footer>
    </article>
  );
}

// ❌ BAD: Div soup
function Article({ post }: Props) {
  return (
    <div>
      <div>
        <div>{post.title}</div>
        <div>By {post.author}</div>
      </div>
      <div>{post.content}</div>
    </div>
  );
}
```

### Headings Hierarchy

```tsx
// ✅ GOOD: Logical heading structure
function Page() {
  return (
    <>
      <h1>Page Title</h1>
      
      <section>
        <h2>Section 1</h2>
        <h3>Subsection 1.1</h3>
        <h3>Subsection 1.2</h3>
      </section>
      
      <section>
        <h2>Section 2</h2>
        <h3>Subsection 2.1</h3>
      </section>
    </>
  );
}

// ❌ BAD: Skipping levels
<h1>Title</h1>
<h3>Skipped h2!</h3> {/* Don't skip levels */}
```

---

## ARIA ATTRIBUTES

### When to Use ARIA

```tsx
// ✅ GOOD: No ARIA needed (semantic HTML)
<button type="button" onClick={handleClick}>
  Click me
</button>

// ✅ GOOD: ARIA when semantics insufficient
<div
  role="button"
  tabIndex={0}
  onClick={handleClick}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') handleClick();
  }}
>
  Click me
</div>

// Better: Just use <button>!
```

### Common ARIA Patterns

```tsx
// Landmarks
<nav aria-label="Main navigation">...</nav>
<aside aria-label="Related articles">...</aside>
<main>...</main>

// Live regions (dynamic content)
<div aria-live="polite" aria-atomic="true">
  {statusMessage}
</div>

<div aria-live="assertive"> {/* Interrupts */}
  {errorMessage}
</div>

// Expanded/collapsed
<button
  aria-expanded={isOpen}
  aria-controls="menu-panel"
  onClick={() => setIsOpen(!isOpen)}
>
  Menu
</button>
<div id="menu-panel" hidden={!isOpen}>
  ...
</div>

// Loading state
<button aria-busy={isLoading} disabled={isLoading}>
  {isLoading ? 'Loading...' : 'Submit'}
</button>

// Current page (navigation)
<nav>
  <a href="/home" aria-current={pathname === '/home' ? 'page' : undefined}>
    Home
  </a>
  <a href="/about" aria-current={pathname === '/about' ? 'page' : undefined}>
    About
  </a>
</nav>
```

### ARIA Labels

```tsx
// Icon buttons (no visible text)
<button aria-label="Close dialog">
  <XIcon />
</button>

// Multiple instances of same text
<button aria-label="Edit user profile">Edit</button>
<button aria-label="Edit notification settings">Edit</button>

// Form fields (when label insufficient)
<input
  type="search"
  placeholder="Search posts..."
  aria-label="Search posts"
/>

// Described by (additional context)
<input
  id="password"
  type="password"
  aria-describedby="password-requirements"
/>
<p id="password-requirements">
  Must be at least 8 characters
</p>
```

---

## KEYBOARD NAVIGATION

### Focus Management

```tsx
import { useEffect, useRef } from 'react';

// Auto-focus modal when opened
function Modal({ isOpen, onClose }: Props) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) {
      closeButtonRef.current?.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="dialog-title"
    >
      <h2 id="dialog-title">Confirmation</h2>
      <p>Are you sure?</p>
      
      <button ref={closeButtonRef} onClick={onClose}>
        Cancel
      </button>
      <button onClick={handleConfirm}>
        Confirm
      </button>
    </div>
  );
}
```

### Focus Trap

```tsx
import { useEffect, useRef } from 'react';

function useFocusTrap(isActive: boolean) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isActive) return;

    const container = containerRef.current;
    if (!container) return;

    const focusableElements = container.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    function handleTabKey(e: KeyboardEvent) {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    }

    container.addEventListener('keydown', handleTabKey);
    firstElement?.focus();

    return () => container.removeEventListener('keydown', handleTabKey);
  }, [isActive]);

  return containerRef;
}

// Usage
function Dialog({ isOpen }: Props) {
  const trapRef = useFocusTrap(isOpen);

  return (
    <div ref={trapRef} role="dialog" aria-modal="true">
      {/* Content */}
    </div>
  );
}
```

### Skip Links

```tsx
// app/layout.tsx
export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-500 focus:text-white"
        >
          Skip to main content
        </a>
        
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

// tailwind.config.ts - screen-reader-only utility
export default {
  plugins: [
    plugin(function({ addUtilities }) {
      addUtilities({
        '.sr-only': {
          position: 'absolute',
          width: '1px',
          height: '1px',
          padding: '0',
          margin: '-1px',
          overflow: 'hidden',
          clip: 'rect(0, 0, 0, 0)',
          whiteSpace: 'nowrap',
          borderWidth: '0',
        },
      });
    }),
  ],
};
```

---

## FORMS ACCESSIBILITY

### Proper Labels

```tsx
// ✅ GOOD: Explicit label
<div>
  <label htmlFor="email">Email address</label>
  <input id="email" type="email" required />
</div>

// ✅ GOOD: Wrapping label
<label>
  Email address
  <input type="email" required />
</label>

// ✅ GOOD: aria-label for icon-only
<button aria-label="Search">
  <SearchIcon />
</button>

// ❌ BAD: No label
<input type="email" placeholder="Email" /> {/* Not accessible! */}
```

### Error Handling

```tsx
function LoginForm() {
  const [errors, setErrors] = useState<Record<string, string>>({});

  return (
    <form>
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          aria-invalid={errors.email ? 'true' : 'false'}
          aria-describedby={errors.email ? 'email-error' : undefined}
        />
        {errors.email && (
          <p id="email-error" role="alert" className="text-red-500">
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          aria-invalid={errors.password ? 'true' : 'false'}
          aria-describedby="password-requirements password-error"
        />
        <p id="password-requirements" className="text-sm text-gray-500">
          Must be at least 8 characters
        </p>
        {errors.password && (
          <p id="password-error" role="alert" className="text-red-500">
            {errors.password}
          </p>
        )}
      </div>

      <button type="submit">Sign In</button>
    </form>
  );
}
```

### Required Fields

```tsx
// ✅ GOOD: Multiple indicators
<label htmlFor="name">
  Name <abbr title="required" aria-label="required">*</abbr>
</label>
<input id="name" type="text" required aria-required="true" />

// Announce required fields
<form aria-label="Contact form">
  <p id="required-description">
    Fields marked with * are required.
  </p>
  {/* fields */}
</form>
```

---

## COLOR & CONTRAST

### WCAG Contrast Requirements

| Text Size | AA | AAA |
|-----------|----|----|
| Normal text (< 24px) | 4.5:1 | 7:1 |
| Large text (≥ 24px) | 3:1 | 4.5:1 |
| UI components | 3:1 | - |

```tsx
// ✅ GOOD: Sufficient contrast
<button className="bg-blue-600 text-white"> {/* 8.59:1 */}
  Click me
</button>

// ❌ BAD: Insufficient contrast
<button className="bg-gray-200 text-gray-300"> {/* 1.2:1 - FAIL */}
  Click me
</button>

// ✅ GOOD: Don't rely on color alone
<span className="text-red-500 font-bold underline">
  Error
</span>

// ❌ BAD: Color is only indicator
<span className="text-red-500">Error</span>
```

### Dark Mode Support

```tsx
// tailwind.config.ts
export default {
  darkMode: 'class', // or 'media'
};

// app/layout.tsx
import { ThemeProvider } from 'next-themes';

export default function RootLayout({ children }) {
  return (
    <html suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

// Component
function Button({ children }: Props) {
  return (
    <button className="bg-white dark:bg-gray-800 text-black dark:text-white">
      {children}
    </button>
  );
}
```

---

## IMAGES & MEDIA

### Alt Text

```tsx
// ✅ GOOD: Descriptive alt text
<Image
  src="/photo.jpg"
  alt="A golden retriever playing fetch in a park"
  width={800}
  height={600}
/>

// ✅ GOOD: Decorative images
<Image
  src="/pattern.svg"
  alt="" // Empty for decorative
  aria-hidden="true"
  width={100}
  height={100}
/>

// ❌ BAD: Redundant alt
<Image src="/photo.jpg" alt="Image of golden retriever" /> // Don't say "image of"

// ❌ BAD: Filename as alt
<Image src="/IMG_1234.jpg" alt="IMG_1234" />
```

### Video/Audio

```tsx
// ✅ GOOD: Captions and transcripts
<video controls>
  <source src="/video.mp4" type="video/mp4" />
  <track kind="captions" src="/captions.vtt" srcLang="en" label="English" />
  <track kind="descriptions" src="/descriptions.vtt" srcLang="en" />
</video>

// Provide transcript
<details>
  <summary>Video transcript</summary>
  <p>Full text transcript of the video content...</p>
</details>

// Auto-play warning
<p role="alert">
  This page contains auto-playing video. You can pause it using the controls.
</p>
```

---

## MOTION & ANIMATION

### Respect User Preferences

```tsx
// CSS: Respect prefers-reduced-motion
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}

// Tailwind: motion-safe/motion-reduce
<div className="motion-safe:animate-bounce motion-reduce:animate-none">
  Bouncing element
</div>

// React: Hook to detect preference
function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);

    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return prefersReducedMotion;
}

// Usage
function AnimatedComponent() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      animate={prefersReducedMotion ? {} : { scale: 1.1 }}
      transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.3 }}
    >
      Content
    </motion.div>
  );
}
```

---

## ANNOUNCEMENTS & NOTIFICATIONS

### Live Regions

```tsx
function Toast({ message, type }: Props) {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className={cn(
        'fixed bottom-4 right-4 p-4 rounded shadow',
        type === 'error' && 'bg-red-500 text-white',
        type === 'success' && 'bg-green-500 text-white'
      )}
    >
      {message}
    </div>
  );
}

// For urgent errors
function ErrorToast({ message }: Props) {
  return (
    <div
      role="alert"
      aria-live="assertive" // Interrupts screen reader
      className="fixed top-4 right-4 p-4 bg-red-500 text-white rounded"
    >
      <strong>Error:</strong> {message}
    </div>
  );
}
```

### Loading States

```tsx
function SearchResults() {
  const { data, isLoading } = useQuery({ ... });

  if (isLoading) {
    return (
      <div aria-live="polite" aria-busy="true">
        <Spinner />
        <span className="sr-only">Loading results...</span>
      </div>
    );
  }

  return (
    <div aria-live="polite" aria-busy="false">
      <p>{data.length} results found</p>
      {/* Results */}
    </div>
  );
}
```

---

## TABLES

### Data Tables

```tsx
function DataTable({ data }: Props) {
  return (
    <table>
      <caption className="sr-only">
        User statistics for 2025
      </caption>
      
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
          <th scope="col">Role</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      
      <tbody>
        {data.map(user => (
          <tr key={user.id}>
            <th scope="row">{user.name}</th>
            <td>{user.email}</td>
            <td>{user.role}</td>
            <td>
              <button aria-label={`Edit ${user.name}`}>
                Edit
              </button>
              <button aria-label={`Delete ${user.name}`}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
```

---

## TESTING ACCESSIBILITY

### Automated Testing (jest-axe)

```tsx
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

describe('Button', () => {
  it('has no accessibility violations', async () => {
    const { container } = render(<Button>Click me</Button>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

### Manual Testing Checklist

```
Keyboard Navigation:
□ Tab through all interactive elements
□ Enter/Space activates buttons/links
□ Escape closes modals/menus
□ Arrow keys navigate lists/menus
□ Focus visible on all elements

Screen Reader (NVDA/JAWS/VoiceOver):
□ All content is announced
□ Images have meaningful alt text
□ Form fields have labels
□ Errors are announced
□ Dynamic content updates announced

Visual:
□ Text contrast meets WCAG AA (4.5:1)
□ Focus indicators visible
□ No color-only indicators
□ Text resizable to 200%
□ Content readable at 400% zoom

Tools:
□ Lighthouse accessibility audit
□ WAVE browser extension
□ axe DevTools
□ Color contrast checker
```

---

## ACCESSIBILITY DECISION TREE

```
Need interactive element?
├─ Button (action)? → <button>
├─ Link (navigation)? → <a>
└─ Form control? → <input>, <select>, <textarea>

Need ARIA?
├─ Native HTML exists? → Use native element
├─ Custom component? → Add appropriate ARIA
└─ Dynamic content? → aria-live regions

Need focus management?
├─ Modal/dialog? → Focus trap + auto-focus
├─ Route change? → Focus main content
└─ Error? → Focus error message

Need to hide content?
├─ Visual only? → aria-hidden="true"
├─ Screen reader only? → .sr-only class
└─ Completely? → display: none or remove from DOM
```

---

## WCAG 2.1 LEVEL AA CHECKLIST

```
Perceivable:
□ Text alternatives for images
□ Captions for videos
□ Adaptable content (semantic HTML)
□ Color contrast 4.5:1 minimum
□ Text resizable without loss of functionality

Operable:
□ Keyboard accessible
□ No keyboard traps
□ Skip links provided
□ Descriptive page titles
□ Focus order logical
□ Link purpose clear
□ Multiple ways to find content
□ Focus visible

Understandable:
□ Language of page identified
□ Predictable navigation
□ Consistent identification
□ Input labels/instructions
□ Error identification
□ Error suggestions
□ Error prevention (important actions)

Robust:
□ Valid HTML
□ Name, role, value for components
□ Status messages (aria-live)
```
