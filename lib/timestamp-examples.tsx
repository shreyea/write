/**
 * TIMESTAMP HANDLING - PRODUCTION EXAMPLES
 * 
 * This file demonstrates how to use the timestamp utilities
 * in different scenarios across your app.
 */

import TimeAgo from "@/app/components/TimeAgo";
import { formatRelativeTime, formatAbsoluteTime, formatFullTimestamp } from "@/lib/dateUtils";

// ============================================
// EXAMPLE 1: Feed View - Relative Time
// ============================================
// Shows "5 minutes ago", "2 hours ago", etc.
// Updates automatically every 10 seconds

export function FeedPostExample({ post }: { post: any }) {
  return (
    <div className="post-card">
      <div className="post-header">
        <span className="username">@{post.username}</span>
        <span className="timestamp text-gray-500 text-sm">
          <TimeAgo date={post.created_at} />
        </span>
      </div>
      <p className="post-content">{post.content}</p>
    </div>
  );
}

// ============================================
// EXAMPLE 2: Detail View - Exact Time
// ============================================
// Shows "24 Dec 2025 · 3:00 PM"
// Doesn't auto-update

export function PostDetailExample({ post }: { post: any }) {
  return (
    <div className="post-detail">
      <h2>{post.title}</h2>
      <div className="metadata">
        <span className="author">By {post.username}</span>
        <span className="separator">·</span>
        <span className="timestamp text-gray-600">
          <TimeAgo date={post.created_at} variant="absolute" />
        </span>
      </div>
      <div className="content">{post.content}</div>
    </div>
  );
}

// ============================================
// EXAMPLE 3: Comment Section - Mixed Usage
// ============================================
// Recent comments use relative time
// Older comments use absolute time

export function CommentExample({ comment }: { comment: any }) {
  const isRecent = new Date().getTime() - new Date(comment.created_at).getTime() < 86400000; // 24 hours
  
  return (
    <div className="comment">
      <div className="comment-header">
        <span className="author">@{comment.username}</span>
        <span className="timestamp text-sm text-gray-500">
          {isRecent ? (
            <TimeAgo date={comment.created_at} />
          ) : (
            <TimeAgo date={comment.created_at} variant="absolute" />
          )}
        </span>
      </div>
      <p className="comment-text">{comment.text}</p>
    </div>
  );
}

// ============================================
// EXAMPLE 4: Using Utilities Directly
// ============================================
// When you need more control or custom rendering

export function CustomTimestampExample({ post }: { post: any }) {
  return (
    <div className="custom-post">
      {/* Inline relative time */}
      <p className="meta">
        Posted {formatRelativeTime(post.created_at)} by @{post.username}
      </p>
      
      {/* Inline exact time */}
      <p className="details">
        Published on {formatAbsoluteTime(post.created_at)}
      </p>
      
      {/* Custom format */}
      <p className="date-only">
        {formatAbsoluteTime(post.created_at, "MMMM do, yyyy")}
      </p>
      
      {/* Full timestamp in tooltip */}
      <button title={formatFullTimestamp(post.created_at)}>
        View Details
      </button>
    </div>
  );
}

// ============================================
// EXAMPLE 5: Server Component Usage
// ============================================
// For Server Components (non-interactive)

export function ServerComponentExample({ posts }: { posts: any[] }) {
  return (
    <div className="posts-list">
      {posts.map(post => (
        <div key={post.id} className="post">
          <h3>{post.title}</h3>
          {/* TimeAgo is a Client Component, but can be used in Server Components */}
          <TimeAgo date={post.created_at} />
        </div>
      ))}
    </div>
  );
}

// ============================================
// EXAMPLE 6: Notification Example
// ============================================
// Notifications typically use relative time

export function NotificationExample({ notification }: { notification: any }) {
  return (
    <div className="notification">
      <p className="notification-message">{notification.message}</p>
      <span className="notification-time text-xs text-gray-400">
        <TimeAgo date={notification.created_at} />
      </span>
    </div>
  );
}

// ============================================
// EXAMPLE 7: Activity Timeline
// ============================================
// Show exact dates for historical activity

export function ActivityTimelineExample({ activities }: { activities: any[] }) {
  return (
    <div className="timeline">
      {activities.map(activity => (
        <div key={activity.id} className="timeline-item">
          <div className="timeline-marker" />
          <div className="timeline-content">
            <p>{activity.description}</p>
            <span className="timeline-date text-sm">
              <TimeAgo date={activity.created_at} variant="absolute" />
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * BEST PRACTICES:
 * 
 * 1. FEED VIEWS → Use relative time (default)
 *    - Users care about recency, not exact time
 *    - "5 minutes ago" is more intuitive than "3:25 PM"
 * 
 * 2. DETAIL VIEWS → Use absolute time (variant="absolute")
 *    - Users need precise information
 *    - "24 Dec 2025 · 3:00 PM" is more informative
 * 
 * 3. ALWAYS HOVER → Full timestamp shows on hover
 *    - Best of both worlds
 *    - Accessibility benefit
 * 
 * 4. BACKEND STAYS UTC → Never change database timestamps
 *    - All conversion happens on frontend
 *    - Each user sees their local time
 * 
 * 5. SSR HANDLED → Component prevents hydration issues
 *    - Safe to use in Server Components
 *    - No console warnings
 */
