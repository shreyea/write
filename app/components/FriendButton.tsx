"use client";

import { sendFriendRequest } from "@/actions/friend";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { UserPlus, Clock, Check } from "lucide-react";

export default function FriendButton({
  targetUserId,
  status,
}: {
  targetUserId: string;
  status: "none" | "pending" | "friends";
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(status);
  
  if (currentStatus === "friends") {
    return (
      <button className="px-4 py-2 rounded-full text-sm bg-green-500/20 text-green-400 border border-green-500/30 flex items-center gap-2">
        <Check size={16} /> Friends
      </button>
    );
  }

  if (currentStatus === "pending") {
    return (
      <button disabled className="px-4 py-2 rounded-full text-sm bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 flex items-center gap-2">
        <Clock size={16} /> Request Sent
      </button>
    );
  }

  return (
    <button
      onClick={async () => {
        setLoading(true);
        try {
          console.log("Sending friend request to:", targetUserId);
          await sendFriendRequest(targetUserId);
          setCurrentStatus("pending");
          router.refresh();
        } catch (error) {
          console.error("Error sending friend request:", error);
          alert("Failed to send friend request. Please try again.");
        } finally {
          setLoading(false);
        }
      }}
      disabled={loading}
      className="px-4 py-2 rounded-full text-sm bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition border border-blue-500/30 disabled:opacity-50 flex items-center gap-2"
    >
      {loading ? "Sending..." : <><UserPlus size={16} /> Add Friend</>}
    </button>
  );
}
