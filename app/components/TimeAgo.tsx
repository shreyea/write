"use client";

import { useEffect, useState } from "react";

export default function TimeAgo({ date }: { date: string }) {
  const [timeAgo, setTimeAgo] = useState("");

  useEffect(() => {
    const updateTimeAgo = () => {
      const now = new Date().getTime();
      const postDate = new Date(date).getTime();
      const diffInSeconds = Math.floor((now - postDate) / 1000);

      if (diffInSeconds < 60) {
        setTimeAgo(`${diffInSeconds}s ago`);
      } else if (diffInSeconds < 3600) {
        const minutes = Math.floor(diffInSeconds / 60);
        setTimeAgo(`${minutes}m ago`);
      } else if (diffInSeconds < 86400) {
        const hours = Math.floor(diffInSeconds / 3600);
        setTimeAgo(`${hours}h ago`);
      } else if (diffInSeconds < 604800) {
        const days = Math.floor(diffInSeconds / 86400);
        setTimeAgo(`${days}d ago`);
      } else if (diffInSeconds < 2592000) {
        const weeks = Math.floor(diffInSeconds / 604800);
        setTimeAgo(`${weeks}w ago`);
      } else {
        setTimeAgo(
          new Date(date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })
        );
      }
    };

    updateTimeAgo();
    const interval = setInterval(updateTimeAgo, 10000); // Update every 10 seconds

    return () => clearInterval(interval);
  }, [date]);

  return <span>{timeAgo}</span>;
}
