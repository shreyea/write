"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function followUser(targetUserId: string) {
  if (!targetUserId || typeof targetUserId !== 'string') {
    throw new Error("Invalid user ID");
  }

  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  // Prevent following self
  if (user.id === targetUserId) {
    throw new Error("Cannot follow yourself");
  }

  const { error } = await supabase.from("follows").insert({
    follower_id: user.id,
    following_id: targetUserId,
  });

  if (error) {
    console.error("Error following user:", error);
    throw new Error("Failed to follow user");
  }

  revalidatePath("/feed");
  revalidatePath("/profile");
}

export async function unfollowUser(targetUserId: string) {
  if (!targetUserId || typeof targetUserId !== 'string') {
    throw new Error("Invalid user ID");
  }

  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { error } = await supabase
    .from("follows")
    .delete()
    .eq("follower_id", user.id)
    .eq("following_id", targetUserId);

  if (error) {
    console.error("Error unfollowing user:", error);
    throw new Error("Failed to unfollow user");
  }

  revalidatePath("/feed");
  revalidatePath("/profile");
}
