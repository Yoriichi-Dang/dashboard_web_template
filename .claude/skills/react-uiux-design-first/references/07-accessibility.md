# Rule 7: Accessibility (A11y)

## Core Principle

> Beautiful UI that can't be used by everyone is a failed UI.

---

## Quick Rules

| Rule | Implementation |
|------|---------------|
| Buttons are `<button>` | Never `<div onClick>` |
| Links are `<a>` | Never `<span onClick>` |
| Inputs have labels | Visible or `aria-label` |
| Focus is visible | Never `outline: none` without alternative |
| Color isn't the only indicator | Use icons, text, patterns |
| Images have alt text | Descriptive or empty for decorative |

---

## Semantic HTML

### Buttons

```tsx
// ❌ Inaccessible
<div onClick={handleClick} className="cursor-pointer">
  Click me
</div>

// ✅ Accessible
<button onClick={handleClick} type="button">
  Click me
</button>

// ✅ Link styled as button
<a href="/path" className="button-styles">
  Navigate
</a>
```

### Form Controls

```tsx
// ❌ No label
<input type="email" placeholder="Email" />

// ✅ Visible label
<label>
  Email
  <input type="email" />
</label>

// ✅ Hidden label (visually)
<label>
  <span className="sr-only">Email</span>
  <input type="email" placeholder="Email" aria-label="Email" />
</label>

// ✅ Label with htmlFor
<label htmlFor="email">Email</label>
<input id="email" type="email" />
```

### Headings

```tsx
// ❌ Skip heading levels
<h1>Title</h1>
<h4>Subtitle</h4> {/* Skipped h2, h3 */}

// ✅ Proper hierarchy
<h1>Title</h1>
<h2>Subtitle</h2>
<h3>Section</h3>
```

---

## Focus Management

### Visible Focus

```tsx
// ❌ Removes focus indicator
<button className="outline-none focus:outline-none">

// ✅ Custom focus indicator
<button
  className="
    focus:outline-none
    focus-visible:ring-2
    focus-visible:ring-primary
    focus-visible:ring-offset-2
  "
>
```

### Focus Trap (Modals)

```tsx
import { FocusTrap } from '@radix-ui/react-focus-trap';

const Modal = ({ isOpen, children }) => {
  if (!isOpen) return null;

  return (
    <FocusTrap>
      <div role="dialog" aria-modal="true">
        {children}
      </div>
    </FocusTrap>
  );
};
```

### Skip Links

```tsx
// Skip to main content link
<a
  href="#main-content"
  className="
    sr-only
    focus:not-sr-only
    focus:absolute
    focus:top-4
    focus:left-4
    focus:z-50
    focus:bg-background
    focus:p-4
  "
>
  Skip to main content
</a>

<main id="main-content" tabIndex={-1}>
  {/* Content */}
</main>
```

---

## ARIA Attributes

### Common Attributes

```tsx
// Button that opens menu
<button
  aria-expanded={isOpen}
  aria-haspopup="menu"
  aria-controls="dropdown-menu"
>
  Menu
</button>

// Loading state
<button aria-busy={isLoading} disabled={isLoading}>
  {isLoading ? 'Loading...' : 'Submit'}
</button>

// Current page in navigation
<nav>
  <a href="/" aria-current={isHome ? 'page' : undefined}>Home</a>
  <a href="/about" aria-current={isAbout ? 'page' : undefined}>About</a>
</nav>

// Required field
<input aria-required="true" />

// Error state
<input aria-invalid={!!error} aria-describedby="email-error" />
<span id="email-error" role="alert">{error}</span>
```

### Live Regions

```tsx
// Announce dynamic content
<div aria-live="polite" aria-atomic="true">
  {notification}
</div>

// Urgent announcements
<div role="alert" aria-live="assertive">
  {errorMessage}
</div>

// Status updates
<div role="status" aria-live="polite">
  {items.length} items found
</div>
```

---

## Color & Contrast

### Don't Rely on Color Alone

```tsx
// ❌ Color is only indicator
<span className="text-red-500">Error</span>
<span className="text-green-500">Success</span>

// ✅ Color + icon + text
<span className="text-red-500 flex items-center gap-1">
  <XCircleIcon className="w-4 h-4" />
  Error: Invalid email
</span>

<span className="text-green-500 flex items-center gap-1">
  <CheckCircleIcon className="w-4 h-4" />
  Success: Saved
</span>
```

### Contrast Requirements

| Element | Minimum Ratio |
|---------|--------------|
| Normal text | 4.5:1 |
| Large text (18px+) | 3:1 |
| UI components | 3:1 |
| Focus indicator | 3:1 |

```tsx
// ✅ Good contrast
<p className="text-foreground">Regular text</p>
<p className="text-muted-foreground">Secondary text</p> {/* Must still meet 4.5:1 */}

// Check with browser DevTools or contrast checker tools
```

---

## Images & Media

### Alt Text

```tsx
// Informative image
<img src="chart.png" alt="Sales increased 25% in Q4 2024" />

// Decorative image (skip by screen readers)
<img src="decoration.png" alt="" role="presentation" />

// Icon with meaning
<button>
  <TrashIcon aria-hidden="true" />
  <span className="sr-only">Delete item</span>
</button>

// Icon button (alternative)
<button aria-label="Delete item">
  <TrashIcon />
</button>
```

### Video/Audio

```tsx
<video controls>
  <source src="video.mp4" type="video/mp4" />
  <track
    kind="captions"
    src="captions.vtt"
    srcLang="en"
    label="English"
    default
  />
  Your browser does not support the video tag.
</video>
```

---

## Keyboard Navigation

### Tab Order

```tsx
// ❌ Custom tab order (confusing)
<button tabIndex={3}>Third</button>
<button tabIndex={1}>First</button>
<button tabIndex={2}>Second</button>

// ✅ Natural tab order (DOM order)
<button>First</button>
<button>Second</button>
<button>Third</button>

// Remove from tab order (if needed)
<div tabIndex={-1}>Not focusable via tab</div>
```

### Keyboard Handlers

```tsx
const handleKeyDown = (e: React.KeyboardEvent) => {
  switch (e.key) {
    case 'Enter':
    case ' ':
      e.preventDefault();
      handleSelect();
      break;
    case 'Escape':
      handleClose();
      break;
    case 'ArrowDown':
      e.preventDefault();
      focusNext();
      break;
    case 'ArrowUp':
      e.preventDefault();
      focusPrev();
      break;
  }
};
```

---

## Screen Reader Only

```tsx
// Utility class
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

// Usage
<span className="sr-only">Additional context for screen readers</span>
```

---

## Testing Accessibility

### Manual Testing

1. **Keyboard only** - Navigate without mouse
2. **Screen reader** - Use VoiceOver (Mac) or NVDA (Windows)
3. **Zoom to 200%** - Content should still be usable
4. **High contrast mode** - Check visibility

### Automated Tools

```bash
# eslint-plugin-jsx-a11y
npm install eslint-plugin-jsx-a11y --save-dev

# axe-core for testing
npm install @axe-core/react --save-dev
```

```tsx
// In development
import React from 'react';
import ReactDOM from 'react-dom';

if (process.env.NODE_ENV !== 'production') {
  import('@axe-core/react').then(axe => {
    axe.default(React, ReactDOM, 1000);
  });
}
```

---

## Checklist

- [ ] All interactive elements are keyboard accessible
- [ ] Focus is visible on all interactive elements
- [ ] Form inputs have associated labels
- [ ] Images have appropriate alt text
- [ ] Color is not the only way to convey information
- [ ] Text has sufficient contrast (4.5:1)
- [ ] Page has proper heading hierarchy
- [ ] Dynamic content uses aria-live regions
- [ ] Modals trap focus properly
- [ ] Skip links are available

---

## Summary

1. **Semantic HTML** - Use correct elements
2. **Visible focus** - Never hide focus without alternative
3. **Labels** - Every input needs one
4. **Color + icon + text** - Don't rely on color alone
5. **Keyboard navigation** - Everything works without mouse
6. **Screen reader friendly** - Test with actual screen reader
