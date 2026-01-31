# Review Comment Templates

Examples of constructive feedback at each priority level.

## 🔴 BLOCKER Examples

### Security Issues

**Missing Input Validation**
```
🔴 BLOCKER: Missing input validation

This endpoint accepts user input without Zod validation, which could 
allow injection attacks or invalid data to reach the database.

Suggested fix:
const userSchema = z.object({
  email: z.string().email(),
  age: z.number().min(0).max(120),
});

const validated = userSchema.parse(input);
```

**Exposed API Keys**
```
🔴 BLOCKER: API key hardcoded in source

Line 23: API key should never be committed to source code. This is a 
security vulnerability.

Please:
1. Remove the key from this file
2. Add to .env.local (git-ignored)
3. Access via process.env.NEXT_PUBLIC_API_KEY
4. Rotate the exposed key immediately
```

**XSS Vulnerability**
```
🔴 BLOCKER: XSS vulnerability

Using dangerouslySetInnerHTML with unsanitized user input creates an 
XSS vulnerability. Attackers could inject malicious scripts.

Options:
1. Use a sanitization library (DOMPurify)
2. Render as text content instead
3. Use markdown parser with sanitization
```

### Critical Bugs

**Null Reference**
```
🔴 BLOCKER: Null reference error

Line 45: Accessing user.profile.name without null check will crash when 
user is logged out or profile is undefined.

Fix:
const name = user?.profile?.name ?? 'Guest';

Or with early return:
if (!user?.profile?.name) return null;
```

**Memory Leak**
```
🔴 BLOCKER: Memory leak in useEffect

Missing cleanup function for event listener. This will cause memory 
leaks as listeners accumulate on re-renders.

Fix:
useEffect(() => {
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);
```

**Infinite Loop**
```
🔴 BLOCKER: Infinite render loop

Line 28: Setting state in useEffect with state in dependencies creates 
an infinite loop. Component will re-render continuously.

Fix: Remove data from dependencies or compute outside effect:
const processedData = useMemo(() => processData(rawData), [rawData]);
```

## 🟡 MAJOR Examples

### Performance Issues

**Bundle Size Impact**
```
🟡 MAJOR: Large bundle increase

This PR adds 150KB to the main bundle by importing the entire lodash 
library. This impacts initial load time.

Suggested fix:
- import uniq from 'lodash/uniq';
+ import _ from 'lodash';

Or consider native alternatives:
const unique = [...new Set(items)];
```

**Unoptimized Images**
```
🟡 MAJOR: Missing image optimization

Images using <img> instead of next/image lose automatic optimization, 
lazy loading, and responsive sizing.

Replace with:
<Image
  src="/hero.jpg"
  alt="Product hero"
  width={1200}
  height={600}
  priority // for above-fold images
  sizes="(max-width: 768px) 100vw, 50vw"
/>
```

**Blocking Waterfall**
```
🟡 MAJOR: Sequential data fetching

Lines 15-17: Fetching data sequentially creates a waterfall that blocks 
rendering. These requests could run in parallel.

Current (slow):
const user = await fetchUser();
const posts = await fetchPosts(user.id);

Better (parallel):
const [user, posts] = await Promise.all([
  fetchUser(),
  fetchPosts(userId),
]);
```

### Accessibility Issues

**Missing Keyboard Support**
```
🟡 MAJOR: Not keyboard accessible

This interactive element isn't reachable via keyboard. Users who can't 
use a mouse are blocked.

Change:
<div onClick={handleClick}>Click me</div>

To:
<button onClick={handleClick}>Click me</button>

Or add keyboard handlers:
<div 
  role="button"
  tabIndex={0}
  onClick={handleClick}
  onKeyDown={(e) => e.key === 'Enter' && handleClick()}
>
```

**Missing Alt Text**
```
🟡 MAJOR: Missing image alt text

Images without alt text are inaccessible to screen reader users and 
hurt SEO.

Instead of:
<img src="/logo.png" />

Use:
<img src="/logo.png" alt="Acme Corporation logo" />

For decorative images: alt=""
```

**Color Contrast**
```
🟡 MAJOR: Color contrast insufficient

Text color #999 on white background fails WCAG AA (contrast ratio 2.8:1, 
needs 4.5:1). This affects readability for users with low vision.

Suggested colors that pass:
- #666666 (contrast 5.7:1)
- #767676 (contrast 4.5:1)

Test: https://webaim.org/resources/contrastchecker/
```

### Maintainability Issues

**Missing Error Handling**
```
🟡 MAJOR: Missing error boundary

This async operation can fail but has no error handling. Users will see 
a blank screen instead of a helpful error message.

Add error boundary:
// app/dashboard/error.tsx
'use client'
export default function Error({ error, reset }) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={reset}>Try again</button>
    </div>
  );
}
```

**Component Too Large**
```
🟡 MAJOR: Component exceeds size limit

This component is 450 lines. Large components are hard to test, 
understand, and maintain.

Consider splitting into:
- DashboardHeader (lines 20-80)
- StatsSection (lines 81-200)
- ChartsSection (lines 201-350)
- RecentActivity (lines 351-450)
```

## 🔵 MINOR Examples

### Code Quality

**Consider useMemo**
```
🔵 MINOR: Consider memoization

This filter operation runs on every render. For large lists (current: 
500+ items), memoization would improve performance.

const filteredItems = useMemo(
  () => items.filter(item => item.active),
  [items]
);

Not urgent if list stays small, but good to consider.
```

**Extract Magic Numbers**
```
🔵 MINOR: Extract magic number to constant

Line 42: The value 86400000 isn't immediately clear.

Consider:
const MS_PER_DAY = 24 * 60 * 60 * 1000;
const expiresAt = Date.now() + MS_PER_DAY;

Makes intent clearer and reusable.
```

**Inconsistent Error Handling**
```
🔵 MINOR: Inconsistent error handling

Some mutations use try-catch while others use .catch(). Consider 
standardizing on one approach for consistency.

Our codebase tends toward async/await + try-catch for consistency with 
Server Actions.
```

### Better Patterns

**Could Use React Query**
```
🔵 MINOR: Consider React Query for this

You're manually managing loading/error/data states. React Query would 
handle this automatically and add caching.

Current (manual):
const [data, setData] = useState();
const [loading, setLoading] = useState(true);
const [error, setError] = useState();

With React Query:
const { data, isLoading, error } = useQuery({
  queryKey: ['users'],
  queryFn: fetchUsers,
});

Not blocking, but would improve this code.
```

**Naming Suggestion**
```
🔵 MINOR: Naming suggestion

Consider handleSubmit instead of onSubmit for consistency with our 
codebase convention of handle* for event handlers.

Not critical, just helps maintain consistency across the codebase.
```

## ⚪ OPTIONAL Examples

### Style Preferences

**Consistent Function Style**
```
⚪ OPTIONAL: Function declaration style

You're mixing arrow functions and function declarations. Pick one style 
for consistency? 

Our codebase leans toward arrow functions for callbacks and named 
exports for components, but no strict rule.

Totally optional - just a style suggestion.
```

**Destructuring Props**
```
⚪ OPTIONAL: Consider destructuring props

This is a style preference, but destructuring makes the component's API 
clearer at a glance:

Instead of:
function UserCard(props) {
  return <div>{props.name}</div>;
}

Consider:
function UserCard({ name, email, role }) {
  return <div>{name}</div>;
}

Totally up to you though!
```

## Positive Feedback Examples

### Celebrate Good Work

**Good Pattern Usage**
```
✨ Nice use of useTransition here!

This makes the UI stay responsive during the heavy operation. Good 
thinking about UX.
```

**Good Test Coverage**
```
💯 Excellent test coverage

These tests cover all the edge cases I would have worried about. The 
descriptive test names make it easy to understand what's being tested.
```

**Good Accessibility**
```
♿ Great accessibility implementation

Love that you included proper focus management and keyboard navigation. 
The ARIA labels are spot-on too.
```

**Clean Code**
```
🎯 Really clean component structure

This is well-organized and easy to follow. The separation of concerns 
between data fetching and presentation is excellent.
```

## Questions (Not Criticisms)

### Understanding Intent

**Clarifying Decisions**
```
❓ Question about this approach

What was the reasoning for using localStorage here instead of state? 

I'm wondering about the persistence requirements - is this data meant to 
survive page refreshes?
```

**Performance Trade-offs**
```
❓ Curious about the performance here

Did you profile this? I'm wondering if the memoization overhead is worth 
it for such a simple calculation.

Not suggesting a change, just curious about the thinking!
```

**Alternative Approaches**
```
❓ Have you considered Server Actions for this?

Since this is a mutation and we're on Next.js 14+, Server Actions might 
be simpler than the client-side API call.

Just wondering if you explored that option!
```

## Combined Examples

### Multiple Issues, Prioritized
```
Found a few things to look at:

🔴 BLOCKER: Line 23 - Missing null check will crash on logout
Fix: const name = user?.profile?.name ?? 'Guest';

🟡 MAJOR: Line 45 - Missing image alt text for accessibility
Add: alt="Product logo"

🔵 MINOR: Line 67 - Consider extracting this to a constant
Not urgent, but would be clearer

Overall looks good! The BLOCKER needs fixing before merge, but the rest 
can be addressed now or in a follow-up.
```

### Sandwich Method (Positive → Critical → Positive)
```
✨ Love the clean component structure here!

🔴 BLOCKER: Found a security issue on line 34
Using dangerouslySetInnerHTML with user input. This needs sanitization 
with DOMPurify or switching to a safe rendering approach.

🟡 MAJOR: Performance concern with the large image (line 56)
Should use next/image for optimization

The test coverage is excellent though! And the error handling is really 
thorough. Just need to address these two items and we're good to merge.
```

## Approval Templates

### Quick Approval
```
✅ LGTM! 

Quick review:
- Architecture: ✓ RSC pattern correct
- Tests: ✓ Good coverage
- A11y: ✓ Keyboard + screen reader tested
- Performance: ✓ Bundle impact minimal

Ready to merge! 🚀
```

### Approval with Minor Feedback
```
✅ Approved with minor suggestions

Code looks great! Just a couple optional improvements:

🔵 MINOR: Could extract that 300ms timeout to a constant
⚪ OPTIONAL: Consider destructuring props for clarity

Neither blocking, merge when ready!
```

### Approval with Follow-up
```
✅ Approved - let's follow up on performance

Core functionality is solid and well-tested. Approving to unblock you.

Let's create a follow-up issue for the performance optimization we 
discussed - the list virtualization would be nice to have but doesn't 
need to block this feature.

Great work! 🎉
```

## Tips for Writing Good Comments

### Be Specific
❌ "This is wrong"
✅ "Line 45: Missing null check for user.profile will crash on logout"

### Explain Why
❌ "Don't use any"
✅ "Avoid 'any' here - it bypasses type checking and we lose autocomplete and safety"

### Suggest Solutions
❌ "Fix this performance issue"
✅ "Consider useMemo here to avoid recalculating on every render"

### Ask Questions
❌ "Why did you do this?"
✅ "What was the reason for choosing this approach? I'm curious about the trade-offs."

### Praise Good Work
❌ (silence)
✅ "Nice use of useTransition - great thinking about UX!"
