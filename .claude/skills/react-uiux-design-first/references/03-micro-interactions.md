# Rule 3: Micro-Interactions

## Core Principle

> Every interactive element MUST provide visual feedback. No animation = Dead UI.

---

## Animation Standards

| Property | Value | When to Use |
|----------|-------|-------------|
| Duration | `150ms` | Quick feedback (hover, focus) |
| Duration | `200ms` | Standard transitions |
| Duration | `250ms` | Complex animations |
| Duration | `300ms` | Page transitions |
| Easing | `ease-out` | Most interactions |
| Easing | `ease-in-out` | Back-and-forth animations |
| Easing | `spring` | Playful interactions |

---

## Required States by Element

### Button States

```tsx
<Button
  className="
    // Base
    transition-all duration-200 ease-out

    // Hover
    hover:bg-primary/90
    hover:shadow-sm
    hover:scale-[1.02]

    // Active (click)
    active:scale-[0.98]
    active:shadow-none

    // Focus
    focus-visible:outline-none
    focus-visible:ring-2
    focus-visible:ring-primary
    focus-visible:ring-offset-2

    // Disabled
    disabled:opacity-50
    disabled:cursor-not-allowed
    disabled:hover:scale-100
    disabled:hover:shadow-none
  "
>
  Click me
</Button>
```

### Loading Button

```tsx
<Button disabled={isLoading}>
  {isLoading ? (
    <>
      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
      Processing...
    </>
  ) : (
    'Submit'
  )}
</Button>
```

### Input States

```tsx
<Input
  className="
    // Base
    transition-all duration-200

    // Focus
    focus:ring-2
    focus:ring-primary
    focus:border-primary

    // Error
    data-[error=true]:border-destructive
    data-[error=true]:ring-destructive

    // Disabled
    disabled:bg-muted
    disabled:cursor-not-allowed
  "
  data-error={!!error}
/>
```

### Card Hover

```tsx
<Card
  className="
    transition-all duration-200 ease-out
    hover:shadow-md
    hover:border-primary/20
    hover:-translate-y-0.5
  "
>
  {/* Content */}
</Card>
```

### Link States

```tsx
<a
  className="
    transition-colors duration-150
    text-primary
    hover:text-primary/80
    hover:underline
    focus-visible:outline-none
    focus-visible:ring-2
    focus-visible:ring-primary
    focus-visible:ring-offset-2
  "
>
  Learn more
</a>
```

---

## Common Animation Patterns

### Fade In

```tsx
// Tailwind
className="animate-in fade-in duration-200"

// CSS
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
.fade-in {
  animation: fadeIn 200ms ease-out;
}
```

### Slide In

```tsx
// From bottom
className="animate-in slide-in-from-bottom-4 duration-300"

// From right
className="animate-in slide-in-from-right-4 duration-300"
```

### Scale In

```tsx
className="animate-in zoom-in-95 duration-200"
```

### Skeleton Pulse

```tsx
<div className="animate-pulse bg-muted rounded h-4 w-full" />
```

### Spinner

```tsx
<Loader2 className="w-4 h-4 animate-spin" />
```

### Progress Ring

```tsx
<svg className="animate-spin h-5 w-5">
  <circle
    className="opacity-25"
    cx="12" cy="12" r="10"
    stroke="currentColor"
    strokeWidth="4"
  />
  <circle
    className="opacity-75"
    cx="12" cy="12" r="10"
    stroke="currentColor"
    strokeWidth="4"
    strokeDasharray="30 70"
  />
</svg>
```

---

## Interactive Component Examples

### Toggle Switch

```tsx
<Switch
  className="
    relative w-11 h-6
    bg-muted
    rounded-full
    transition-colors duration-200
    data-[state=checked]:bg-primary
  "
>
  <span
    className="
      block w-5 h-5
      bg-white rounded-full
      shadow-sm
      transition-transform duration-200
      translate-x-0.5
      data-[state=checked]:translate-x-5
    "
  />
</Switch>
```

### Dropdown Menu

```tsx
<DropdownMenu>
  <DropdownMenuTrigger className="transition-colors hover:bg-muted">
    Open
  </DropdownMenuTrigger>
  <DropdownMenuContent
    className="
      animate-in fade-in-0 zoom-in-95
      data-[side=bottom]:slide-in-from-top-2
      data-[side=top]:slide-in-from-bottom-2
      duration-200
    "
  >
    {/* Items */}
  </DropdownMenuContent>
</DropdownMenu>
```

### Modal / Dialog

```tsx
<Dialog>
  <DialogOverlay
    className="
      fixed inset-0 bg-black/50
      animate-in fade-in-0 duration-200
    "
  />
  <DialogContent
    className="
      animate-in fade-in-0 zoom-in-95
      slide-in-from-bottom-4
      duration-300
    "
  >
    {/* Content */}
  </DialogContent>
</Dialog>
```

### Toast Notification

```tsx
<Toast
  className="
    animate-in slide-in-from-right-full
    data-[state=closed]:animate-out
    data-[state=closed]:fade-out-0
    data-[state=closed]:slide-out-to-right-full
    duration-300
  "
>
  {/* Content */}
</Toast>
```

### Accordion

```tsx
<AccordionContent
  className="
    overflow-hidden
    data-[state=open]:animate-accordion-down
    data-[state=closed]:animate-accordion-up
  "
>
  {/* Content */}
</AccordionContent>
```

---

## CSS Custom Animations

```css
/* tailwind.config.js */
module.exports = {
  theme: {
    extend: {
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'slide-up': {
          from: { transform: 'translateY(10px)', opacity: '0' },
          to: { transform: 'translateY(0)', opacity: '1' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 200ms ease-out',
        'accordion-up': 'accordion-up 200ms ease-out',
        'fade-in': 'fade-in 200ms ease-out',
        'slide-up': 'slide-up 300ms ease-out',
      },
    },
  },
}
```

---

## Anti-Patterns

```tsx
// ❌ No hover state
<button onClick={action}>Click</button>

// ✅ With hover feedback
<button
  onClick={action}
  className="hover:bg-primary/90 transition-colors"
>
  Click
</button>


// ❌ Animation too slow (distracting)
<div className="transition-all duration-1000">

// ✅ Quick, snappy animation
<div className="transition-all duration-200">


// ❌ No focus state (accessibility issue)
<button className="outline-none">

// ✅ Visible focus state
<button className="focus-visible:ring-2 focus-visible:ring-primary">


// ❌ Jarring animation (ease-in)
<div className="transition-all ease-in">

// ✅ Smooth animation (ease-out)
<div className="transition-all ease-out">


// ❌ Animation on everything
<p className="transition-all">Text</p>

// ✅ Animation only on interactive elements
<button className="transition-all">Button</button>
<p>Text</p>
```

---

## Performance Tips

1. **Use `transform` and `opacity`** - GPU accelerated
2. **Avoid animating `width`, `height`** - causes reflow
3. **Use `will-change` sparingly** - for complex animations
4. **Prefer CSS over JS animations** - better performance
5. **Reduce motion for accessibility** - respect user preferences

```tsx
// Respect reduced motion preference
<div className="motion-reduce:transition-none motion-reduce:animate-none">
  {/* Content */}
</div>
```

---

## Checklist

- [ ] All buttons have hover, active, disabled states
- [ ] All inputs have focus and error states
- [ ] All clickable cards have hover effect
- [ ] Animations are 150-250ms
- [ ] Using ease-out for most transitions
- [ ] Loading states have spinners/animations
- [ ] Focus states are visible
- [ ] Respecting reduced motion preference

---

## Summary

1. **Every interactive element needs feedback**
2. **Duration: 150-250ms** - quick and snappy
3. **Easing: ease-out** - feels natural
4. **Hover + Active + Disabled** - all button states
5. **Focus + Error** - all input states
6. **No animation = Dead UI**
