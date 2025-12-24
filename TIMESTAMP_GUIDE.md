# Timestamp Handling - Best Practices Guide

## 📋 Overview

This guide shows you how to handle UTC timestamps from your database and convert them to the user's local timezone across your Next.js app.

---

## 🎯 Quick Start

### 1. Feed View (Relative Time)
```tsx
<TimeAgo date={post.created_at} />
// Output: "5 minutes ago", "2 hours ago", "just now"
```

### 2. Detail View (Exact Time)
```tsx
<TimeAgo date={post.created_at} variant="absolute" />
// Output: "24 Dec 2025 · 3:00 PM"
```

### 3. Using Utilities Directly
```tsx
import { formatRelativeTime, formatAbsoluteTime } from "@/lib/dateUtils";

const relTime = formatRelativeTime(post.created_at);  // "5 minutes ago"
const absTime = formatAbsoluteTime(post.created_at);  // "24 Dec 2025 · 3:00 PM"
```

---

## 🛠️ Core Files

### `lib/dateUtils.ts` - Utility Functions
- `formatRelativeTime()` - Returns "5 minutes ago"
- `formatAbsoluteTime()` - Returns "24 Dec 2025 · 3:00 PM"
- `formatFullTimestamp()` - Returns "Tuesday, December 24, 2025 at 3:00:30 PM"
- `isToday()` - Check if timestamp is from today

### `app/components/TimeAgo.tsx` - React Component
- Handles both relative and absolute time display
- Auto-updates every 10 seconds in relative mode
- Shows full timestamp on hover
- SSR-safe (no hydration issues)

---

## 🌍 How Timezone Conversion Works

### The Magic Behind It

```tsx
// Database stores (UTC):
"2025-12-24T15:00:00Z"

// JavaScript converts automatically:
new Date("2025-12-24T15:00:00Z")

// Users see (in their local timezone):
London (GMT):     24 Dec 2025 · 3:00 PM
New York (EST):   24 Dec 2025 · 10:00 AM
Mumbai (IST):     24 Dec 2025 · 8:30 PM
Tokyo (JST):      25 Dec 2025 · 12:00 AM
```

**Key Point**: When you create a `Date` object from a UTC string, JavaScript automatically converts it to the user's browser timezone. No manual calculation needed!

---

## 📚 Common Use Cases

### Use Case 1: Social Feed
```tsx
function FeedPost({ post }) {
  return (
    <div>
      <div className="flex justify-between">
        <span>@{post.username}</span>
        <TimeAgo date={post.created_at} />  {/* Relative time */}
      </div>
      <p>{post.content}</p>
    </div>
  );
}
```

### Use Case 2: Blog Post
```tsx
function BlogPost({ post }) {
  return (
    <article>
      <h1>{post.title}</h1>
      <p className="text-gray-600">
        Published <TimeAgo date={post.created_at} variant="absolute" />
      </p>
      <div>{post.content}</div>
    </article>
  );
}
```

### Use Case 3: Notifications
```tsx
function Notification({ notification }) {
  return (
    <div className="notification">
      <p>{notification.message}</p>
      <span className="text-xs text-gray-400">
        <TimeAgo date={notification.created_at} />
      </span>
    </div>
  );
}
```

### Use Case 4: Comments (Mixed)
```tsx
function Comment({ comment }) {
  const hoursSincePost = (Date.now() - new Date(comment.created_at).getTime()) / 3600000;
  
  return (
    <div>
      <p>{comment.text}</p>
      <span className="text-sm text-gray-500">
        {hoursSincePost < 24 ? (
          <TimeAgo date={comment.created_at} />  {/* Recent: relative */}
        ) : (
          <TimeAgo date={comment.created_at} variant="absolute" />  {/* Old: exact */}
        )}
      </span>
    </div>
  );
}
```

---

## ✅ Decision Matrix

| Scenario | Use Relative | Use Absolute |
|----------|--------------|--------------|
| Feed / Timeline | ✅ Yes | ❌ No |
| Recent activity (< 24h) | ✅ Yes | ❌ No |
| Notifications | ✅ Yes | ❌ No |
| Blog posts | ❌ No | ✅ Yes |
| Historical data | ❌ No | ✅ Yes |
| Detail pages | ❌ No | ✅ Yes |
| Reports / Analytics | ❌ No | ✅ Yes |

---

## 🎨 Custom Formatting

The `formatAbsoluteTime()` function accepts custom format strings:

```tsx
import { formatAbsoluteTime } from "@/lib/dateUtils";

// Default format
formatAbsoluteTime(date)  
// "24 Dec 2025 · 3:00 PM"

// Date only
formatAbsoluteTime(date, "d MMMM yyyy")  
// "24 December 2025"

// Time only
formatAbsoluteTime(date, "h:mm a")  
// "3:00 PM"

// Full written format
formatAbsoluteTime(date, "EEEE, MMMM do, yyyy 'at' h:mm a")  
// "Tuesday, December 24th, 2025 at 3:00 PM"

// Short format
formatAbsoluteTime(date, "dd/MM/yy")  
// "24/12/25"
```

See [date-fns format docs](https://date-fns.org/docs/format) for all options.

---

## ⚠️ Important Notes

### 1. **Backend Stays UTC**
- Never modify database timestamps
- Always store in UTC
- Let frontend handle conversion

### 2. **SSR Compatibility**
- `TimeAgo` component is SSR-safe
- Uses "use client" directive
- Prevents hydration mismatches

### 3. **Performance**
- Relative time updates every 10 seconds
- Absolute time doesn't auto-update
- Lightweight and efficient

### 4. **Accessibility**
- Full timestamp shows on hover
- Provides context for all users
- Screenreader friendly

---

## 🚀 Production Checklist

- [x] Database stores timestamps in UTC
- [x] Frontend converts to local timezone
- [x] Relative time for feeds/recent activity
- [x] Absolute time for detail views
- [x] Full timestamp on hover
- [x] SSR handled correctly
- [x] Auto-updates in place
- [x] Clean, reusable code

---

## 🐛 Troubleshooting

### "Time showing wrong timezone"
✓ Check database is storing UTC (should end with `Z` or `+00:00`)
✓ Verify you're passing the UTC string directly to the component
✓ Test in different timezones using browser DevTools

### "Hydration mismatch error"
✓ Use the provided `TimeAgo` component (it's already SSR-safe)
✓ Don't render timestamps during SSR
✓ Component uses `mounted` state to prevent mismatches

### "Time not updating"
✓ Make sure you're using relative mode (default)
✓ Absolute mode doesn't auto-update (by design)
✓ Check component is mounted and useEffect is running

---

## 📖 Additional Resources

- [date-fns documentation](https://date-fns.org/)
- [MDN Date reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)
- [Timezone handling in JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat)

---

## 💡 Pro Tips

1. **Consistent Patterns**: Use relative time for all feed-like interfaces
2. **Hover States**: Users can always hover to see exact time
3. **Context Matters**: Detail views benefit from exact timestamps
4. **Test Timezones**: Use browser DevTools to test different timezones
5. **Keep Backend Simple**: All complexity is on the frontend where it belongs
