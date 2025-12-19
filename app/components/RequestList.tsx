"use client";

import { acceptFriendRequest } from "@/actions/friend";
import { useRouter } from "next/navigation";
import { User, Check } from "lucide-react";

export default function RequestList({ requests }: { requests: any[] }) {
  const router = useRouter();
  
  if (!requests.length) {
    return null;
  }

  return (
    <div className="space-y-4">
      {requests.map((r) => (
        <div
          key={r.id}
          className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center">
                <User size={24} className="text-white" />
              </div>
              <div>
                <div className="text-white font-semibold text-lg">@{r.profiles.username}</div>
                <div className="text-white/50 text-sm">wants to be friends</div>
              </div>
            </div>
            <button
              onClick={async () => {
                await acceptFriendRequest(r.id);
                router.refresh();
              }}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold hover:shadow-green-500/50 shadow-lg transition-all duration-300 hover:scale-105 flex items-center gap-2"
            >
              <Check size={16} />
              Accept
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
