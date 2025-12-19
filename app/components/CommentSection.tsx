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
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#A5B4FC] to-[#C8A2C8] flex items-center justify-center shrink-0">
            <User size={16} className="text-white" />
          </div>
          <div className="flex-1 bg-white/5 rounded-xl p-3 border border-white/10">
            <span className="font-semibold text-purple-300 text-sm">
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
        className="flex gap-2 mt-3"
      >
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a comment..."
          className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm outline-none text-white placeholder-white/40 focus:border-purple-500/50 transition-all"
        />
        <button 
          type="submit"
          className="px-4 py-2 bg-purple-500/20 text-purple-300 rounded-xl text-sm font-semibold hover:bg-purple-500/30 transition-all border border-purple-500/30 flex items-center gap-2"
        >
          <Send size={16} />
          Send
        </button>
      </form>
    </div>
  );
}
