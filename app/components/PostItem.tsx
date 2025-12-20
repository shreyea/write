"use client";

import { deletePost } from "@/actions/post";
import { toggleLike } from "@/actions/like";
import CommentSection from "./CommentSection";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, Heart, MessageCircle, Trash2 } from "lucide-react";
import TimeAgo from "./TimeAgo";

export default function PostItem({
  post,
  userId,
}: {
  post: any;
  userId: string;
}) {
  const router = useRouter();
  const isOwner = post.user_id === userId;
  const hasLiked = post.likes?.some((like: any) => like.user_id === userId);
  const likeCount = post.likes?.length || 0;

  return (
    <div className="backdrop-blur-xl bg-white/5 border border-[#A5B4FC]/20 rounded-3xl p-6 space-y-4 shadow-xl hover:shadow-2xl transition-all duration-300 hover:border-[#A5B4FC]/30">
      {/* Header */}
      <div className="flex justify-between items-center">
        <Link href={`/profile/${post.profiles?.username}`} className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-full bg-linear-to-br from-[#A5B4FC] to-[#C8A2C8] flex items-center justify-center">
            <User size={20} className="text-white" />
          </div>
          <div>
            <div className="font-semibold text-[#FEFBF3] group-hover:text-[#A5B4FC] transition-colors">
              @{post.profiles?.username}
            </div>
            <div className="text-xs text-white/50">
              <TimeAgo date={post.created_at} />
            </div>
          </div>
        </Link>
       
      </div>

      {/* Content */}
      {post.content && (
        <p className="text-white/90 leading-relaxed">{post.content}</p>
      )}

      {/* Image */}
      {post.image_url && (
        <img
          src={post.image_url}
          alt={`Post image by @${post.profiles?.username}`}
          className="rounded-2xl max-h-96 object-cover w-full border border-white/10"
          loading="lazy"
        />
      )}

      {/* Actions */}
      <div className="flex items-center gap-4 pt-2 border-t border-white/10">
        <button
          onClick={async () => {
            await toggleLike(post.id, hasLiked);
            router.refresh();
          }}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
            hasLiked 
              ? 'bg-red-500/20 text-red-400 border border-red-500/30' 
              : 'bg-white/5 text-[#EADEE7]/60 hover:bg-white/10 border border-[#A5B4FC]/10'
          }`}
          aria-label={hasLiked ? 'Unlike post' : 'Like post'}
        >
          <Heart size={18} className={hasLiked ? "fill-current" : ""} />
          <span className="text-sm font-semibold">{likeCount}</span>
        </button>
        <div className="text-[#EADEE7]/40 text-sm flex items-center gap-2">
          <MessageCircle size={18} />
          {post.comments?.length || 0} comments
        </div>
      </div>

      {/* Comments */}
      <CommentSection postId={post.id} comments={post.comments} />

      {/* Delete Button */}
      {isOwner && (
        <div className="flex justify-end pt-2 border-t border-white/5">
          <button
            onClick={async () => {
              if (confirm('Delete this post?')) {
                await deletePost(post.id);
                router.refresh();
              }
            }}
            className="text-xs px-3 py-1.5 rounded-full bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/30 transition-all flex items-center gap-1.5"
            aria-label="Delete post"
          >
            <Trash2 size={14} />
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
