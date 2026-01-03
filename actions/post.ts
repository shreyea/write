"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

const MAX_CONTENT_LENGTH = 5000;
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];

export async function createPost(
  content: string,
  file?: File
) {
  // Validate content
  if (!content || typeof content !== 'string') {
    throw new Error("Content is required");
  }

  const trimmedContent = content.trim();
  if (trimmedContent.length === 0) {
    throw new Error("Content cannot be empty");
  }

  if (trimmedContent.length > MAX_CONTENT_LENGTH) {
    throw new Error(`Content must be less than ${MAX_CONTENT_LENGTH} characters`);
  }

  // Validate file if provided
  if (file) {
    if (file.size > MAX_FILE_SIZE) {
      throw new Error("File size must be less than 5MB");
    }
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      throw new Error("File must be an image (JPEG, PNG, GIF, or WebP)");
    }
  }

  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  // Ensure user profile exists
  const { data: profile } = await supabase
    .from("profiles")
    .select("id")
    .eq("id", user.id)
    .maybeSingle();

  if (!profile) {
    // Create profile if it doesn't exist
    const { error: profileError } = await supabase
      .from("profiles")
      .insert({
        id: user.id,
        username: user.email?.split('@')[0] || `user_${user.id.substring(0, 8)}`,
        username_changed: false
      });
    
    if (profileError) {
      console.error("Error creating profile:", profileError);
      throw new Error("Failed to create user profile");
    }
  }

  let imageUrl = null;

  if (file) {
    try {
      const fileExtension = file.name.split('.').pop();
      const sanitizedFileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExtension}`;
      const path = `${user.id}/${sanitizedFileName}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("posts")
        .upload(path, file, {
          cacheControl: '3600',
          upsert: false,
          contentType: file.type
        });

      if (uploadError) {
        console.error("Image upload error:", uploadError);
        throw new Error(`Failed to upload image: ${uploadError.message}`);
      }

      const { data: urlData } = supabase
        .storage
        .from("posts")
        .getPublicUrl(path);
      
      imageUrl = urlData.publicUrl;
    } catch (error: any) {
      console.error("Image upload failed:", error);
      throw new Error(`Image upload failed: ${error.message}`);
    }
  }

  const { data, error } = await supabase.from("posts").insert({
    content: trimmedContent,
    image_url: imageUrl,
    user_id: user.id,
  }).select().single();

  if (error) {
    console.error("Error creating post:", error);
    throw new Error("Failed to create post");
  }
  
  revalidatePath("/feed");
  revalidatePath("/profile");
  revalidatePath(`/profile/${user.id}`);
  
  return data;
}


export async function deletePost(postId: string) {
  if (!postId || typeof postId !== 'string') {
    throw new Error("Invalid post ID");
  }

  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) throw new Error("Not authenticated");

  // First verify the post belongs to the user
  const { data: post } = await supabase
    .from("posts")
    .select("id, user_id, image_url")
    .eq("id", postId)
    .eq("user_id", user.id)
    .single();

  if (!post) {
    throw new Error("Post not found or you don't have permission to delete it");
  }

  // Delete the image from storage if it exists
  if (post.image_url) {
    try {
      const urlParts = post.image_url.split('/posts/');
      if (urlParts.length > 1) {
        const path = urlParts[1];
        await supabase.storage.from('posts').remove([path]);
      }
    } catch (error) {
      console.error("Error deleting image:", error);
      // Continue with post deletion even if image deletion fails
    }
  }

  // Delete the post (cascading deletes should handle comments and likes)
  const { error } = await supabase
    .from("posts")
    .delete()
    .eq("id", postId)
    .eq("user_id", user.id);

  if (error) {
    console.error("Error deleting post:", error);
    throw new Error(`Failed to delete post: ${error.message}`);
  }

  // Revalidate multiple paths to ensure UI updates everywhere
  revalidatePath("/feed");
  revalidatePath("/profile");
  revalidatePath(`/profile/[username]`);
  
  return { success: true };
}
