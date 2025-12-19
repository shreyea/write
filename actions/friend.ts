"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function sendFriendRequest(targetUserId: string) {
  // Validate input
  if (!targetUserId || typeof targetUserId !== 'string') {
    throw new Error("Invalid user ID");
  }

  const supabase = await createSupabaseServerClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  // Prevent sending request to self
  if (user.id === targetUserId) {
    throw new Error("Cannot send friend request to yourself");
  }

  // Verify both users exist in profiles
  const { data: targetProfile } = await supabase
    .from("profiles")
    .select("id")
    .eq("id", targetUserId)
    .single();

  if (!targetProfile) {
    throw new Error("Target user not found");
  }

  // Check if request already exists
  const { data: existing } = await supabase
    .from("friend_requests")
    .select("id, status")
    .or(`and(requester_id.eq.${user.id},receiver_id.eq.${targetUserId}),and(requester_id.eq.${targetUserId},receiver_id.eq.${user.id})`)
    .maybeSingle();

  if (existing) {
    if (existing.status === 'accepted') {
      throw new Error("You are already friends with this user");
    } else if (existing.status === 'pending') {
      throw new Error("Friend request already pending");
    }
    // If rejected, we can let them try again
  }

  const { data, error } = await supabase.from("friend_requests").insert([
    {
      requester_id: user.id,
      receiver_id: targetUserId,
      status: "pending"
    }
  ]).select();

  if (error) {
    console.error("Error sending friend request:", error);
    throw new Error("Failed to send friend request");
  }
  
  console.log("Friend request sent successfully:", data);
  
  revalidatePath("/requests");
  revalidatePath("/profile");
  revalidatePath("/feed");
  revalidatePath("/search");
}

export async function acceptFriendRequest(requestId: string) {
  if (!requestId || typeof requestId !== 'string') {
    throw new Error("Invalid request ID");
  }

  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { error } = await supabase
    .from("friend_requests")
    .update({ status: "accepted" })
    .eq("id", requestId)
    .eq("receiver_id", user.id);

  if (error) {
    console.error("Error accepting friend request:", error);
    throw new Error("Failed to accept friend request");
  }

  revalidatePath("/feed");
  revalidatePath("/requests");
  revalidatePath("/profile");
  revalidatePath("/search");
}

export async function rejectFriendRequest(requestId: string) {
  if (!requestId || typeof requestId !== 'string') {
    throw new Error("Invalid request ID");
  }

  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { error } = await supabase
    .from("friend_requests")
    .update({ status: "rejected" })
    .eq("id", requestId)
    .eq("receiver_id", user.id);

  if (error) {
    console.error("Error rejecting friend request:", error);
    throw new Error("Failed to reject friend request");
  }

  revalidatePath("/requests");
  revalidatePath("/profile");
  revalidatePath("/search");
}

// Form-compatible server action wrappers (accept/reject via FormData)
export async function acceptFriendRequestAction(formData: FormData) {
  const requestId = formData.get("requestId") as string | null;
  if (!requestId) throw new Error("Missing requestId");
  await acceptFriendRequest(requestId);
}

export async function rejectFriendRequestAction(formData: FormData) {
  const requestId = formData.get("requestId") as string | null;
  if (!requestId) throw new Error("Missing requestId");
  await rejectFriendRequest(requestId);
}

