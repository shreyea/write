"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

const MAX_COMMENT_LENGTH = 1000;

export async function addComment(
  postId: string,
  content: string
) {
  // Validate inputs
  if (!postId || typeof postId !== 'string') {
    throw new Error("Invalid post ID");
  }

  if (!content || typeof content !== 'string') {
    throw new Error("Comment content is required");
  }

  const trimmedContent = content.trim();
  if (trimmedContent.length === 0) {
    throw new Error("Comment cannot be empty");
  }

  if (trimmedContent.length > MAX_COMMENT_LENGTH) {
    throw new Error(`Comment must be less than ${MAX_COMMENT_LENGTH} characters`);
  }

  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Not authenticated");

  const { error } = await supabase.from("comments").insert({
    post_id: postId,
    user_id: user.id,
    content: trimmedContent,
  });

  if (error) {
    console.error("Error adding comment:", error);
    throw new Error("Failed to add comment");
  }
  
  revalidatePath("/feed");
  revalidatePath("/profile");
  revalidatePath("/profile/[username]");
  
  return { success: true };
}
