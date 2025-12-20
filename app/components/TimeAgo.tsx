"use client";

import { useEffect, useState } from "react";

export default function TimeAgo({ date }: { date: string }) {
  const getTimeAgo = (date: string) => {
    const now = new Date().getTime();
    const postDate = new Date(date).getTime();
    const diffInSeconds = Math.floor((now - postDate) / 1000);

    if (diffInSeconds < 10) {
      return "just now";
    } else if (diffInSeconds < 60) {
      return `${diffInSeconds}s ago`;
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes}m ago`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours}h ago`;
    } else if (diffInSeconds < 604800) {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days}d ago`;
    } else if (diffInSeconds < 2592000) {
      const weeks = Math.floor(diffInSeconds / 604800);
      return `${weeks}w ago`;
    } else {
      return new Date(date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    }
  };

  const [timeAgo, setTimeAgo] = useState(getTimeAgo(date));

  useEffect(() => {
    setTimeAgo(getTimeAgo(date));
    const interval = setInterval(() => {
      setTimeAgo(getTimeAgo(date));
    }, 10000); // Update every 10 seconds

    return () => clearInterval(interval);
  }, [date]);

  return <span>{timeAgo}</span>;
}
