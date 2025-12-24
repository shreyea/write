# 🚀 TIMESTAMP QUICK REFERENCE

## TL;DR - Copy & Paste These

### Feed View (Shows "5 minutes ago")
```tsx
import TimeAgo from "@/app/components/TimeAgo";

<TimeAgo date={post.created_at} />
```

### Detail View (Shows "24 Dec 2025 · 3:00 PM")
```tsx
import TimeAgo from "@/app/components/TimeAgo";

<TimeAgo date={post.created_at} variant="absolute" />
```

### Direct Utility Usage
```tsx
import { formatRelativeTime, formatAbsoluteTime } from "@/lib/dateUtils";

// Relative: "5 minutes ago"
const relTime = formatRelativeTime(timestamp);

// Absolute: "24 Dec 2025 · 3:00 PM"  
const absTime = formatAbsoluteTime(timestamp);

// Custom format: "December 24th, 2025"
const custom = formatAbsoluteTime(timestamp, "MMMM do, yyyy");
```

---

## When to Use What?

| Use Case | Component |
|----------|-----------|
| Feed / Timeline | `<TimeAgo date={...} />` |
| Notifications | `<TimeAgo date={...} />` |
| Blog Post | `<TimeAgo date={...} variant="absolute" />` |
| Detail Page | `<TimeAgo date={...} variant="absolute" />` |
| Comments (recent) | `<TimeAgo date={...} />` |
| Comments (old) | `<TimeAgo date={...} variant="absolute" />` |

---

## How UTC → Local Works

```
Database (UTC):        2025-12-24T15:00:00Z

↓ JavaScript auto-converts ↓

London (GMT):          24 Dec 2025 · 3:00 PM
New York (EST):        24 Dec 2025 · 10:00 AM
Mumbai (IST):          24 Dec 2025 · 8:30 PM
Tokyo (JST):           25 Dec 2025 · 12:00 AM
```

No configuration needed - it just works!

---

## Custom Formats

```tsx
import { formatAbsoluteTime } from "@/lib/dateUtils";

formatAbsoluteTime(date, "d MMM yyyy · h:mm a")    // 24 Dec 2025 · 3:00 PM
formatAbsoluteTime(date, "MMMM do, yyyy")          // December 24th, 2025
formatAbsoluteTime(date, "h:mm a")                 // 3:00 PM
formatAbsoluteTime(date, "dd/MM/yyyy")             // 24/12/2025
formatAbsoluteTime(date, "PPP")                    // December 24th, 2025
```

See [date-fns docs](https://date-fns.org/docs/format) for all formats.

---

## Features

✅ Auto UTC → Local timezone  
✅ Updates every 10 seconds (relative mode)  
✅ Full timestamp on hover  
✅ SSR-safe  
✅ Production-ready  

---

## Files

- **Component**: `app/components/TimeAgo.tsx`
- **Utilities**: `lib/dateUtils.ts`
- **Examples**: `lib/timestamp-examples.tsx`
- **Guide**: `TIMESTAMP_GUIDE.md`

---

## That's It!

Your timestamps now work globally across all timezones. 🌍✨
