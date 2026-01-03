"use client";

import { addComment } from "@/actions/comment";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { User, Send } from "lucide-react";

export default function CommentSection({
  postId,
  comments,
}: {
  postId: string;
  comments: any[];
}) {
  const router = useRouter();
  const [text, setText] = useState("");

  return (
    <div className="space-y-3 pt-3 border-t border-white/10">
      {comments.map((c) => (
        <div key={c.id} className="flex gap-2 items-start">
          <div className="w-8 h-8 rounded-full bg-linear-to-br from-[#A5B4FC] to-[#C8A2C8] flex items-center justify-center shrink-0">
            <User size={16} className="text-white" />
          </div>
          <div className="flex-1 bg-white/5 rounded-xl p-3 border border-white/10">
            <span className="font-semibold text-[#A5B4FC] text-sm">
              @{c.profiles?.username}
            </span>
            <p className="text-white/80 text-sm mt-1">{c.content}</p>
          </div>
        </div>
      ))}

      <form
        onSubmit={async (e) => {
          e.preventDefault();
          if (!text.trim()) return;
          await addComment(postId, text);
          setText("");
          router.refresh();
        }}
        className="flex flex-wrap gap-2 mt-3"
      >
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a comment..."
          className="flex-1 min-w-[200px] bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm outline-none text-white placeholder-white/40 focus:border-[#A5B4FC]/50 transition-all"
        />
        <button 
          type="submit"
          className="px-3 sm:px-4 py-2 bg-[#A5B4FC]/20 text-[#A5B4FC] rounded-xl text-sm font-semibold hover:bg-[#A5B4FC]/30 transition-all border border-[#A5B4FC]/30 flex items-center gap-1.5 shrink-0"
        >
          <Send size={16} />
          <span className="hidden sm:inline">Send</span>
        </button>
      </form>
    </div>
  );
}
