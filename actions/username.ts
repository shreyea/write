"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const USERNAME_MIN_LENGTH = 3;
const USERNAME_MAX_LENGTH = 30;
const USERNAME_REGEX = /^[a-zA-Z0-9_]+$/;

/**
 * Check if username is available (case-insensitive)
 */
export async function isUsernameAvailable(username: string) {
  const supabase = await createSupabaseServerClient();

  if (!username || typeof username !== 'string') return false;

  const trimmed = username.trim();
  if (trimmed.length < USERNAME_MIN_LENGTH || trimmed.length > USERNAME_MAX_LENGTH) {
    return false;
  }

  if (!USERNAME_REGEX.test(trimmed)) {
    return false;
  }

  const { data, error } = await supabase
    .from("profiles")
    .select("id")
    .ilike("username", trimmed)
    .maybeSingle();

  if (error) {
    return true;
  }

  return !data;
}

/**
 * Set username for logged-in user (only once)
 */
export async function setUsername(username: string) {
  // Validate username
  if (!username || typeof username !== 'string') {
    throw new Error("Username is required");
  }

  const trimmed = username.trim();

  if (trimmed.length < USERNAME_MIN_LENGTH) {
    throw new Error(`Username must be at least ${USERNAME_MIN_LENGTH} characters`);
  }

  if (trimmed.length > USERNAME_MAX_LENGTH) {
    throw new Error(`Username must be less than ${USERNAME_MAX_LENGTH} characters`);
  }

  if (!USERNAME_REGEX.test(trimmed)) {
    throw new Error("Username can only contain letters, numbers, and underscores");
  }

  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    throw new Error("Not authenticated");
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("username_changed")
    .eq("id", user.id)
    .single();

  if (profileError || !profile) {
    throw new Error("Profile not found");
  }

  if (profile.username_changed) {
    throw new Error("Username can be changed only once");
  }

  // Check if username is available
  const available = await isUsernameAvailable(trimmed);
  if (!available) {
    throw new Error("Username is already taken");
  }

  const { error: updateError } = await supabase
    .from("profiles")
    .update({
      username: trimmed,
      username_changed: true,
    })
    .eq("id", user.id);

  if (updateError) {
    console.error("Error updating username:", updateError);
    throw new Error("Failed to update username");
  }

  revalidatePath("/feed");
  revalidatePath("/profile");
  revalidatePath("/settings");
}

/**
 * Server action wrapper for forms
 */
export async function setUsernameAction(formData: FormData) {
  const username = String(formData.get("username") || "").trim();
  if (!username) {
    throw new Error("Username is required");
  }

  await setUsername(username);
}
