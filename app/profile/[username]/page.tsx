import { createSupabaseServerClient } from "@/lib/supabase/server";
import FriendButton from "@/app/components/FriendButton";
import PostItem from "@/app/components/PostItem";
import { User, FileText } from "lucide-react";
import ParticleBackground from "@/app/components/ParticleBackground";

// Force dynamic rendering to prevent caching issues
export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';

export default async function Profile({ params }: any) {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  // Await params in Next.js 15
  const { username } = await Promise.resolve(params);
  
  const { data: profile, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("username", username)
    .single();
  
  console.log("Profile fetch:", { username, profile, error });

  if (!profile) {
    return (
      <div className="max-w-xl mx-auto py-10 text-center">
        <h1 className="text-2xl font-semibold">User not found</h1>
      </div>
    );
  }

  const isOwnProfile = user?.id === profile.id;

  // Check friend status
  let status: "none" | "pending" | "friends" = "none";
  
  if (!isOwnProfile && user) {
    // Check if there's a friend request between these users
    const { data: sentRequest } = await supabase
      .from("friend_requests")
      .select("*")
      .eq("requester_id", user.id)
      .eq("receiver_id", profile.id)
      .maybeSingle();

    const { data: receivedRequest } = await supabase
      .from("friend_requests")
      .select("*")
      .eq("requester_id", profile.id)
      .eq("receiver_id", user.id)
      .maybeSingle();

    const request = sentRequest || receivedRequest;
    if (request) {
      status = request.status === "accepted" ? "friends" : "pending";
    }
  }

  // Fetch user's posts
  const { data: posts } = await supabase
    .from("posts")
    .select(`
      id, 
      content, 
      image_url, 
      created_at, 
      user_id,
      profiles(username),
      likes(user_id),
      comments(id, content, created_at, user_id, profiles(username))
    `)
    .eq("user_id", profile.id)
    .order("created_at", { ascending: false });

  return (
    <div className="min-h-screen relative">
      <ParticleBackground color="#9783e7" count={200} shape="sphere" />
      <div className="relative z-10 max-w-2xl mx-auto py-10 px-4 space-y-6 pb-24">
        {/* Profile Header */}
        <div className="backdrop-blur-xl bg-white/5 border border-[#A5B4FC]/20 rounded-3xl p-4 sm:p-8 hover:border-[#A5B4FC]/30 transition-all">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-linear-to-br from-[#A5B4FC] to-[#C8A2C8] flex items-center justify-center shrink-0">
                <User size={32} className="sm:w-12 sm:h-12 text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <h1 className="text-xl sm:text-3xl font-black text-white truncate">@{profile.username}</h1>
                <div className="text-white/60 text-xs sm:text-sm">{posts?.length || 0} posts</div>
              </div>
            </div>
            {!isOwnProfile && user && (
              <div className="w-full sm:w-auto flex justify-end">
                <FriendButton targetUserId={profile.id} status={status} />
              </div>
            )}
          </div>
        </div>

        {/* Posts Section */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <FileText size={24} /> Posts
          </h2>
          {posts && posts.length > 0 ? (
            posts.map(p => (
              <PostItem key={p.id} post={p} userId={user!.id} />
            ))
          ) : (
            <div className="text-center py-16 backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl">
              <div className="mb-4 flex justify-center">
                <FileText size={64} className="text-[#A5B4FC]" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">No posts yet</h3>
              <p className="text-white/60">{isOwnProfile ? "Share your first update!" : "This user hasn't posted anything yet"}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
