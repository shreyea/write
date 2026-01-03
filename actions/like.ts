"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function toggleLike(
  postId: string,
  hasLiked: boolean
) {
  if (!postId || typeof postId !== 'string') {
    throw new Error("Invalid post ID");
  }

  if (typeof hasLiked !== 'boolean') {
    throw new Error("Invalid like status");
  }

  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Not authenticated");

  if (hasLiked) {
    const { error } = await supabase
      .from("likes")
      .delete()
      .eq("post_id", postId)
      .eq("user_id", user.id);

    if (error) {
      console.error("Error unliking post:", error);
      throw new Error("Failed to unlike post");
    }
  } else {
    const { error } = await supabase.from("likes").insert({
      post_id: postId,
      user_id: user.id,
    });

    if (error) {
      console.error("Error liking post:", error);
      throw new Error("Failed to like post");
    }
  }
  
  revalidatePath("/feed");
  revalidatePath("/profile");
  revalidatePath("/profile/[username]");
  
  return { success: true };
}
