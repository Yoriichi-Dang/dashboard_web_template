# Rule 2: Spacing & Visual Rhythm

## Core Principle

> Consistent spacing creates visual harmony and guides the user's eye.

---

## Spacing Scale (8px Base)

| Token | Value | Tailwind | Usage |
|-------|-------|----------|-------|
| `0` | 0px | `p-0` | Reset |
| `0.5` | 2px | `p-0.5` | Micro adjustments |
| `1` | 4px | `p-1` | Icon gaps, tight spacing |
| `2` | 8px | `p-2` | Small internal padding |
| `3` | 12px | `p-3` | Medium padding |
| `4` | 16px | `p-4` | Standard component padding |
| `5` | 20px | `p-5` | Comfortable padding |
| `6` | 24px | `p-6` | Section spacing |
| `8` | 32px | `p-8` | Large section spacing |
| `10` | 40px | `p-10` | Page sections |
| `12` | 48px | `p-12` | Major separations |
| `16` | 64px | `p-16` | Hero sections |

---

## The 8px Grid System

```
┌────────────────────────────────────────────────────────────┐
│                                                            │
│  ┌──────────────────────────────────────────────────────┐  │ ← 24px (p-6)
│  │                                                      │  │
│  │  ┌────────────────┐  ┌────────────────┐              │  │
│  │  │                │  │                │              │  │
│  │  │    Card 1      │  │    Card 2      │              │  │
│  │  │    p-4 (16px)  │  │    p-4 (16px)  │              │  │
│  │  │                │  │                │              │  │
│  │  └────────────────┘  └────────────────┘              │  │
│  │         ↑                                            │  │
│  │         └── gap-4 (16px) ──┘                         │  │
│  │                                                      │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

---

## Spacing Categories

### 1. Internal Spacing (Padding)

```tsx
// Component internal spacing
<Card className="p-4">           // 16px all sides
<Card className="px-6 py-4">     // 24px horizontal, 16px vertical
<Card className="pt-4 pb-6">     // Different top/bottom
```

### 2. External Spacing (Margin/Gap)

```tsx
// Between components
<div className="space-y-4">      // 16px vertical gap
<div className="space-x-2">      // 8px horizontal gap
<div className="gap-4">          // 16px grid/flex gap

// Section margins
<section className="mt-8 mb-12"> // Top 32px, bottom 48px
```

### 3. Layout Spacing

```tsx
// Page layout
<main className="px-4 md:px-6 lg:px-8">
  <div className="max-w-7xl mx-auto py-8">
    {/* Content */}
  </div>
</main>
```

---

## Spacing Patterns

### Card Pattern

```tsx
<Card className="p-4 md:p-6">
  {/* Header */}
  <div className="mb-4">
    <h3 className="text-lg font-semibold">Title</h3>
    <p className="text-sm text-muted-foreground mt-1">Description</p>
  </div>

  {/* Content */}
  <div className="space-y-3">
    <Item />
    <Item />
  </div>

  {/* Footer */}
  <div className="mt-6 pt-4 border-t">
    <Button>Action</Button>
  </div>
</Card>
```

### Form Pattern

```tsx
<form className="space-y-6">
  {/* Form group */}
  <div className="space-y-2">
    <Label>Email</Label>
    <Input />
    <p className="text-sm text-muted-foreground">Helper text</p>
  </div>

  {/* Form group */}
  <div className="space-y-2">
    <Label>Password</Label>
    <Input type="password" />
  </div>

  {/* Actions */}
  <div className="flex gap-3 pt-4">
    <Button variant="outline">Cancel</Button>
    <Button>Submit</Button>
  </div>
</form>
```

### List Pattern

```tsx
<ul className="divide-y">
  {items.map(item => (
    <li key={item.id} className="py-4 first:pt-0 last:pb-0">
      <div className="flex items-center gap-3">
        <Avatar className="w-10 h-10" />
        <div className="flex-1 min-w-0">
          <p className="font-medium truncate">{item.name}</p>
          <p className="text-sm text-muted-foreground">{item.email}</p>
        </div>
        <Button size="sm">View</Button>
      </div>
    </li>
  ))}
</ul>
```

---

## Visual Hierarchy Through Spacing

```
┌─────────────────────────────────────────────────────┐
│  Page Title                              ← mb-8     │
│                                                     │
│  Section Title                           ← mb-4     │
│  ─────────────────────────────                      │
│                                                     │
│  ┌─────────────────────────────────────────────┐   │
│  │  Card Title                        ← mb-2   │   │
│  │  Card description text             ← mb-4   │   │
│  │                                             │   │
│  │  Content                                    │   │
│  │  • Item 1                          ← space-y-2 │
│  │  • Item 2                                   │   │
│  │  • Item 3                                   │   │
│  │                                    ← mt-6   │   │
│  │  [Action Button]                            │   │
│  └─────────────────────────────────────────────┘   │
│                                          ← gap-6   │
│  ┌─────────────────────────────────────────────┐   │
│  │  Another Card                               │   │
│  └─────────────────────────────────────────────┘   │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

## Anti-Patterns

```tsx
// ❌ Magic numbers
<div style={{ padding: 13, marginTop: 7, gap: 11 }}>

// ✅ Consistent scale
<div className="p-3 mt-2 gap-3">


// ❌ Inconsistent spacing
<div className="p-4">
  <div className="mb-3">...</div>
  <div className="mb-5">...</div>
  <div className="mb-2">...</div>
</div>

// ✅ Consistent spacing
<div className="p-4 space-y-4">
  <div>...</div>
  <div>...</div>
  <div>...</div>
</div>


// ❌ No breathing room
<Card>
  <Title>Title</Title>
  <Content>Content</Content>
  <Button>Action</Button>
</Card>

// ✅ Proper spacing
<Card className="p-6">
  <Title className="mb-2">Title</Title>
  <Content className="mb-6">Content</Content>
  <Button>Action</Button>
</Card>
```

---

## Responsive Spacing

```tsx
// Increase spacing on larger screens
<div className="p-4 md:p-6 lg:p-8">
  <div className="space-y-4 md:space-y-6">
    <Card />
    <Card />
  </div>
</div>

// Grid with responsive gaps
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
  <Card />
  <Card />
  <Card />
</div>
```

---

## Spacing Checklist

- [ ] Using 8px (or 4px) scale consistently
- [ ] No magic numbers
- [ ] Adequate internal padding in components
- [ ] Consistent gaps between elements
- [ ] Visual hierarchy is clear
- [ ] Responsive spacing for different screens
- [ ] CTAs have enough breathing room
- [ ] Text is readable (proper line-height)

---

## Summary

1. **Stick to 8px scale** (4, 8, 12, 16, 24, 32, 48...)
2. **No magic numbers** - always use design tokens
3. **Internal + External** - every component needs both
4. **Hierarchy through spacing** - more space = more separation
5. **Responsive** - adjust spacing for screen sizes
