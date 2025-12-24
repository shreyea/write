/**
 * TimeAgo Component - Production-Ready Timestamp Display
 * 
 * Automatically converts UTC timestamps to user's local timezone
 * with support for both relative and absolute time formats.
 * 
 * USAGE EXAMPLES:
 * 
 * // Feed View - Relative time ("5 minutes ago", "just now")
 * <TimeAgo date={post.created_at} />
 * 
 * // Detail View - Exact time ("24 Dec 2025 · 3:00 PM")
 * <TimeAgo date={post.created_at} variant="absolute" />
 * 
 * FEATURES:
 * ✓ Automatic UTC → Local timezone conversion
 * ✓ Live updates every 10 seconds (relative mode)
 * ✓ Full timestamp on hover
 * ✓ SSR-safe (no hydration mismatches)
 * ✓ Production-ready
 */

"use client";

import { useEffect, useState } from "react";
import { formatRelativeTime, formatAbsoluteTime, formatFullTimestamp } from "@/lib/dateUtils";

interface TimeAgoProps {
  date: string;
  variant?: "relative" | "absolute";
}

export default function TimeAgo({ date, variant = "relative" }: TimeAgoProps) {
  const [mounted, setMounted] = useState(false);
  const [displayTime, setDisplayTime] = useState("");

  // Handle SSR - only run on client
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const updateTime = () => {
      if (variant === "absolute") {
        // Show exact local date & time
        setDisplayTime(formatAbsoluteTime(date));
      } else {
        // Show relative time (e.g., "5 minutes ago")
        setDisplayTime(formatRelativeTime(date));
      }
    };

    updateTime();

    // Auto-update relative time every 10 seconds
    if (variant === "relative") {
      const interval = setInterval(updateTime, 10000);
      return () => clearInterval(interval);
    }
  }, [date, variant, mounted]);

  // Prevent hydration mismatch - render nothing on server
  if (!mounted) {
    return <span className="invisible">Loading...</span>;
  }

  return (
    <span 
      title={formatFullTimestamp(date)}
      className="cursor-help"
    >
      {displayTime}
    </span>
  );
}
  