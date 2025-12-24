/**
 * Date Utilities - Production-Ready Timestamp Handling
 * 
 * Converts UTC timestamps from database to user's local timezone
 * Works seamlessly across all timezones without backend changes
 */

import { formatDistanceToNow, format } from "date-fns";

/**
 * Convert UTC timestamp string to local Date object
 * Handles various timestamp formats from Supabase/PostgreSQL
 */
function parseUTCToLocal(utcTimestamp: string): Date {
  // Supabase returns timestamps in ISO format, sometimes without the 'Z'
  // We need to ensure it's treated as UTC
  let timestamp = utcTimestamp;
  
  // If timestamp doesn't end with 'Z' or have timezone info, add 'Z' to mark it as UTC
  if (!timestamp.endsWith('Z') && !timestamp.includes('+') && !timestamp.includes('-', 10)) {
    timestamp = timestamp + 'Z';
  }
  
  return new Date(timestamp);
}

/**
 * Format timestamp as relative time (e.g., "2 minutes ago", "just now")
 * Perfect for feeds and activity streams
 * 
 * @param utcTimestamp - UTC timestamp from database
 * @returns Human-friendly relative time string
 * 
 * @example
 * formatRelativeTime("2025-12-24T15:00:00Z") // "5 minutes ago"
 */
export function formatRelativeTime(utcTimestamp: string): string {
  const localDate = parseUTCToLocal(utcTimestamp);
  
  return formatDistanceToNow(localDate, {
    addSuffix: true,      // Adds "ago" suffix
    includeSeconds: true  // Shows "less than a minute ago" for recent times
  });
}

/**
 * Format timestamp as exact local date and time
 * Perfect for detail views and precise timestamps
 * 
 * @param utcTimestamp - UTC timestamp from database
 * @param formatStr - Custom format string (optional)
 * @returns Formatted date string in user's local timezone
 * 
 * @example
 * formatAbsoluteTime("2025-12-24T15:00:00Z") // "24 Dec 2025 · 3:00 PM"
 * formatAbsoluteTime("2025-12-24T15:00:00Z", "PPP") // "December 24th, 2025"
 */
export function formatAbsoluteTime(
  utcTimestamp: string,
  formatStr: string = "d MMM yyyy · h:mm a"
): string {
  const localDate = parseUTCToLocal(utcTimestamp);
  return format(localDate, formatStr);
}

/**
 * Get full timestamp with complete details
 * Perfect for tooltips and accessibility
 * 
 * @param utcTimestamp - UTC timestamp from database
 * @returns Full formatted timestamp with day of week
 * 
 * @example
 * formatFullTimestamp("2025-12-24T15:00:00Z") 
 * // "Tuesday, December 24, 2025 at 3:00:30 PM"
 */
export function formatFullTimestamp(utcTimestamp: string): string {
  const localDate = parseUTCToLocal(utcTimestamp);
  return format(localDate, "EEEE, MMMM d, yyyy 'at' h:mm:ss a");
}

/**
 * Check if timestamp is from today
 * Useful for conditional rendering
 */
export function isToday(utcTimestamp: string): boolean {
  const localDate = parseUTCToLocal(utcTimestamp);
  const today = new Date();
  
  return (
    localDate.getDate() === today.getDate() &&
    localDate.getMonth() === today.getMonth() &&
    localDate.getFullYear() === today.getFullYear()
  );
}

/**
 * Common date-fns format patterns for reference:
 * 
 * "d MMM yyyy · h:mm a"              → 24 Dec 2025 · 3:00 PM
 * "MMM d, yyyy 'at' h:mm a"          → Dec 24, 2025 at 3:00 PM  
 * "PPP"                              → December 24th, 2025
 * "PPPp"                             → December 24th, 2025 at 3:00 PM
 * "MMMM do, yyyy"                    → December 24th, 2025
 * "h:mm a"                           → 3:00 PM
 * "EEEE, MMMM d"                     → Tuesday, December 24
 * 
 * See: https://date-fns.org/docs/format
 */
