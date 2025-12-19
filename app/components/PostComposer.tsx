"use client";

import { createPost } from "@/actions/post";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Edit3, Image, Send } from "lucide-react";

export default function PostComposer() {
  const router = useRouter();
  const [content, setContent] = useState("");
  const [file, setFile] = useState<File>();

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        if (!content.trim()) return;
        try {
          console.log("Creating post with content:", content);
          await createPost(content, file);
          console.log("Post created, refreshing...");
          setContent("");
          setFile(undefined);
          router.refresh();
        } catch (error: any) {
          console.error("Error posting - Full error:", error);
          alert(`Failed to create post: ${error.message || JSON.stringify(error)}`);
        }
      }}
      className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xl hover:shadow-2xl transition-all duration-300"
    >
      <div className="flex items-start gap-2 sm:gap-3 mb-3 sm:mb-4">
        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-linear-to-br from-[#A5B4FC] to-[#C8A2C8] flex items-center justify-center shrink-0">
          <Edit3 size={16} className="sm:w-5 sm:h-5 text-white" />
        </div>
        <textarea
          placeholder="What's on your mind?"
          value={content}
          onChange={e => setContent(e.target.value)}
          className="flex-1 bg-transparent outline-none text-white placeholder-white/40 resize-none min-h-[60px] sm:min-h-[80px] text-sm sm:text-base"
          rows={3}
        />
      </div>
      <div className="flex flex-wrap justify-between items-center gap-2">
        <label className="cursor-pointer px-3 sm:px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/20 transition-all text-xs sm:text-sm text-white/70 hover:text-white flex items-center gap-1.5 sm:gap-2 shrink-0">
          <input 
            type="file" 
            onChange={e => setFile(e.target.files?.[0])} 
            className="hidden"
            accept="image/*"
          />
          <Image size={16} className="sm:w-[18px] sm:h-[18px]" />
          <span className="hidden sm:inline">{file ? file.name.substring(0, 15) + '...' : 'Add Photo'}</span>
        </label>
        <button 
          type="submit" 
          className="px-3 sm:px-6 py-2 bg-linear-to-r from-[#A5B4FC] to-[#C8A2C8] rounded-xl font-semibold text-white shadow-lg hover:shadow-[#A5B4FC]/50 transition-all duration-300 hover:scale-105 flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base shrink-0"
        >
          <Send size={16} className="sm:w-[18px] sm:h-[18px]" />
          <span>Post</span>
        </button>
      </div>
    </form>
  );
}
