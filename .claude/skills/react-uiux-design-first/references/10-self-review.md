# Rule 10: Self-Review Checklist

## Core Principle

> Before merging, step back and review like a user, a designer, and a future developer.

---

## The Four Perspectives

### 1. As a USER

> "Can I use this easily?"

- [ ] Is the purpose of this UI immediately clear?
- [ ] Do I know what to do next?
- [ ] Is feedback immediate and helpful?
- [ ] Does it work on my device/browser?
- [ ] Can I complete the task without confusion?

### 2. As a DESIGNER

> "Does this look and feel right?"

- [ ] Is spacing consistent?
- [ ] Are colors from the design system?
- [ ] Do animations feel smooth?
- [ ] Is there visual hierarchy?
- [ ] Would I be proud to show this in a portfolio?

### 3. As a DEVELOPER (Future)

> "Will I understand this in 6 months?"

- [ ] Are names descriptive?
- [ ] Is the logic easy to follow?
- [ ] Are edge cases handled?
- [ ] Is there unnecessary complexity?
- [ ] Would a new team member understand this?

### 4. As a TESTER

> "What could go wrong?"

- [ ] What if the API fails?
- [ ] What if data is empty?
- [ ] What if user double-clicks?
- [ ] What if network is slow?
- [ ] What if user has no permissions?

---

## Pre-Merge Checklist

### UX Quality

```
□ All 4 states handled (empty, loading, success, error)
□ Loading feedback within 200ms
□ Error messages are helpful and actionable
□ Empty states guide the user
□ No layout shift during loading
□ Works on mobile viewport
```

### Visual Quality

```
□ Spacing uses 8px scale consistently
□ Colors are from design system
□ Typography hierarchy is clear
□ Interactive elements have hover states
□ Animations are 150-250ms, ease-out
□ Focus states are visible
```

### Code Quality

```
□ Component under 100 lines
□ Logic separated into hooks
□ No prop drilling
□ Names are descriptive
□ No commented-out code
□ No console.logs
□ TypeScript has no `any`
```

### Accessibility

```
□ Buttons are <button>, links are <a>
□ All inputs have labels
□ Images have alt text
□ Works with keyboard only
□ Focus order makes sense
□ Color isn't the only indicator
```

### Performance

```
□ Heavy components lazy loaded
□ useMemo for expensive computations
□ useCallback for handlers to children
□ No unnecessary re-renders
□ Images are optimized
```

### Edge Cases

```
□ API failure handled
□ Null/undefined handled
□ Empty arrays handled
□ Double-click prevented
□ Very long text handled
□ Cleanup on unmount
```

---

## Quick Visual Test

### The Squint Test

1. Squint at your UI (blur your vision)
2. Can you still identify:
   - The main action?
   - The hierarchy?
   - Where to focus?

### The Screenshot Test

1. Take a screenshot
2. Show to someone unfamiliar
3. Ask: "What is this? What would you click first?"
4. If they're confused, simplify

### The 3-Second Test

1. Look at the UI for 3 seconds
2. Look away
3. What do you remember?
4. That should be the main purpose

---

## Questions to Ask

### Before Starting

- What problem does this solve?
- Who is the user?
- What is the happy path?
- What can go wrong?

### While Coding

- Is there a simpler way?
- Am I over-engineering?
- What am I assuming?
- What haven't I tested?

### Before Merging

- Would I approve this PR?
- What would a senior dev critique?
- Is there anything I'm unsure about?
- Did I test on mobile?

### After Merging

- How can I measure success?
- What feedback should I watch for?
- What's the rollback plan?

---

## Red Flags to Watch

### Code Smells

- [ ] Component over 200 lines
- [ ] More than 5 props
- [ ] Nested ternaries
- [ ] Multiple useEffect with dependencies
- [ ] Copy-pasted code (3+ times)
- [ ] Magic numbers/strings

### UX Smells

- [ ] Blank screen during loading
- [ ] "Error occurred" with no details
- [ ] Tiny click targets
- [ ] No feedback on action
- [ ] Inconsistent styling
- [ ] Disabled button without explanation

### Accessibility Smells

- [ ] `div` with `onClick`
- [ ] `outline: none` without alternative
- [ ] Missing alt text
- [ ] Color-only indicators
- [ ] Fixed font sizes (px)

---

## Final Checklist

Before clicking "Merge":

```
✅ UX
  □ Clear purpose
  □ All states handled
  □ Helpful error messages
  □ Works on mobile

✅ Visual
  □ Consistent spacing
  □ Design system colors
  □ Smooth animations
  □ Clear hierarchy

✅ Code
  □ Readable and clean
  □ Properly typed
  □ No complexity debt
  □ Tests pass

✅ A11y
  □ Keyboard works
  □ Screen reader works
  □ Focus visible
  □ Labels present

✅ Edge Cases
  □ Errors handled
  □ Empty handled
  □ Loading handled
  □ Cleanup done

✅ Gut Check
  □ Would I be proud of this?
  □ Would a new dev understand?
  □ Would users love this?
```

---

## Summary

1. **Review as a user** - Is it usable?
2. **Review as a designer** - Is it beautiful?
3. **Review as a future dev** - Is it maintainable?
4. **Review as a tester** - Is it robust?
5. **Trust your gut** - If something feels off, it probably is

---

> *"The details are not the details. They make the design."*
> — Charles Eames
