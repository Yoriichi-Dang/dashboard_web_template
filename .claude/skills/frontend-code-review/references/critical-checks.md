# Critical Checks Reference

These are non-negotiable checks that must pass before merge.

## 🔴 Security & Safety

### Authentication & Authorization
- [ ] No hardcoded secrets/API keys/tokens
- [ ] Environment variables used for sensitive data
- [ ] Auth tokens not logged or exposed in URLs
- [ ] User permissions checked server-side
- [ ] Protected routes have proper middleware

### Input Validation
- [ ] User input validated with Zod schemas
- [ ] SQL injection prevention (parameterized queries)
- [ ] XSS prevention (proper escaping)
- [ ] File upload validation (type, size, content)
- [ ] Rate limiting on API endpoints

### Data Protection
- [ ] Sensitive data not logged (passwords, tokens, PII)
- [ ] HTTPS enforced for production
- [ ] CSRF protection on mutations
- [ ] No sensitive data in localStorage
- [ ] dangerouslySetInnerHTML justified and sanitized

### Dependencies
- [ ] No known vulnerabilities (npm audit)
- [ ] Dependencies up to date
- [ ] Lock files committed

## 🔴 React 19.2 Fundamentals

### Effects & Cleanup
```tsx
// ❌ Missing cleanup
useEffect(() => {
  const interval = setInterval(poll, 1000);
}, []);

// ✅ Proper cleanup
useEffect(() => {
  const interval = setInterval(poll, 1000);
  return () => clearInterval(interval);
}, []);
```
- [ ] All effects have cleanup functions
- [ ] Event listeners removed
- [ ] Timers cleared
- [ ] Subscriptions cancelled
- [ ] AbortControllers used for fetch

### State Management
```tsx
// ❌ Syncing derived state
const [fullName, setFullName] = useState('');
useEffect(() => {
  setFullName(`${first} ${last}`);
}, [first, last]);

// ✅ Compute directly
const fullName = `${first} ${last}`;
```
- [ ] No derived state in useEffect
- [ ] State not duplicated
- [ ] No unnecessary useState
- [ ] State colocated with usage
- [ ] Dependencies array correct

### Keys in Lists
```tsx
// ❌ Index as key
{items.map((item, i) => <Card key={i} {...item} />)}

// ✅ Stable unique ID
{items.map(item => <Card key={item.id} {...item} />)}
```
- [ ] Keys present on all list items
- [ ] Keys stable across renders
- [ ] Keys unique among siblings
- [ ] Not using array index as key (unless list is static)

### Component Architecture
- [ ] Server Components by default
- [ ] 'use client' only when needed (state, effects, browser APIs)
- [ ] Client boundary at appropriate level
- [ ] Heavy components code-split with lazy()
- [ ] No prop drilling (use Context or composition)

### React Warnings
- [ ] No warnings in console
- [ ] No key warnings
- [ ] No setState on unmounted component
- [ ] No deprecated API usage

## 🔴 Performance Impact

### Bundle Size
```bash
# Check bundle impact
ANALYZE=true npm run build
```
- [ ] Route bundle <200KB
- [ ] No duplicate dependencies
- [ ] Tree-shaking working (check imports)
- [ ] Heavy libraries lazy-loaded
- [ ] Polyfills only for needed browsers

### Images
```tsx
// ✅ Proper next/image usage
<Image
  src="/hero.jpg"
  alt="Product hero"
  width={1200}
  height={600}
  priority // for LCP image
  sizes="(max-width: 768px) 100vw, 50vw"
/>
```
- [ ] All images use next/image
- [ ] width/height specified
- [ ] sizes attribute for responsive images
- [ ] priority on LCP image
- [ ] alt text descriptive
- [ ] Proper format (WebP for photos, SVG for icons)

### Data Fetching
- [ ] No blocking waterfalls
- [ ] Parallel queries when possible
- [ ] Proper Suspense boundaries
- [ ] Loading states don't block entire page
- [ ] React Query staleTime configured
- [ ] No fetching in loops

### Rendering
- [ ] No unnecessary re-renders
- [ ] useMemo for expensive calculations
- [ ] useCallback for stable callbacks to memo'd children
- [ ] memo() for pure components (if needed)
- [ ] Virtual scrolling for large lists (>100 items)
- [ ] useTransition for non-urgent updates

### Core Web Vitals
- [ ] LCP <2.5s (Largest Contentful Paint)
- [ ] FID <100ms (First Input Delay)
- [ ] CLS <0.1 (Cumulative Layout Shift)
- [ ] Lighthouse score >90

## 🔴 Accessibility (WCAG 2.1 AA)

### Semantic HTML
```tsx
// ❌ Div soup
<div onClick={handleClick}>Click me</div>

// ✅ Semantic button
<button onClick={handleClick}>Click me</button>
```
- [ ] Buttons for actions (<button>)
- [ ] Links for navigation (<a href>)
- [ ] Proper heading hierarchy (h1 → h2 → h3)
- [ ] Lists use ul/ol/li
- [ ] Forms use semantic elements

### Keyboard Navigation
- [ ] All interactive elements focusable
- [ ] Tab order logical
- [ ] Enter/Space trigger actions
- [ ] Escape closes modals/menus
- [ ] Arrow keys for composite widgets
- [ ] No keyboard traps
- [ ] Skip links present

### Screen Reader Support
```tsx
// ✅ Proper labels
<button aria-label="Close dialog">
  <XIcon />
</button>

<label htmlFor="email">Email</label>
<input id="email" type="email" />
```
- [ ] All form fields have labels
- [ ] Icon-only buttons have aria-label
- [ ] Image alt text descriptive (not "image")
- [ ] ARIA roles only when necessary
- [ ] Live regions for dynamic content
- [ ] Heading structure logical

### Visual Design
- [ ] Color contrast ≥4.5:1 (text)
- [ ] Color contrast ≥3:1 (UI components)
- [ ] Color not sole indicator
- [ ] Focus indicators visible
- [ ] Touch targets ≥44x44px
- [ ] Text resizable to 200%

### Focus Management
```tsx
// ✅ Focus trap in modal
useEffect(() => {
  if (isOpen) {
    const firstFocusable = dialogRef.current?.querySelector('button');
    firstFocusable?.focus();
  }
}, [isOpen]);
```
- [ ] Modals trap focus
- [ ] First focusable element auto-focused
- [ ] Focus returns on close
- [ ] Route changes focus main heading
- [ ] Error messages receive focus

### Motion & Animation
- [ ] prefers-reduced-motion respected
- [ ] Animations skippable
- [ ] No auto-playing video with sound
- [ ] No flashing content (seizure risk)

### Testing
- [ ] axe DevTools passed
- [ ] Keyboard navigation tested
- [ ] Screen reader tested (NVDA/VoiceOver)
- [ ] Lighthouse accessibility score 100

## Testing Quality

### Coverage
- [ ] Critical paths covered
- [ ] Edge cases tested
- [ ] Error states tested
- [ ] Loading states tested
- [ ] Coverage >80%

### Test Quality
```tsx
// ✅ User-centric queries
const button = screen.getByRole('button', { name: /submit/i });
await userEvent.click(button);

// ❌ Implementation details
const button = container.querySelector('.submit-btn');
```
- [ ] Use getByRole (not getByTestId)
- [ ] User-centric queries
- [ ] No testing implementation details
- [ ] Meaningful assertions
- [ ] Tests isolated (no shared state)
- [ ] Mock external dependencies (MSW)

## Quick Validation Commands

```bash
# Type check
npm run type-check

# Lint
npm run lint

# Test
npm test

# Bundle analysis
ANALYZE=true npm run build

# Accessibility audit
npm run lighthouse
```
