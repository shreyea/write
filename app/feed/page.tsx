import { createSupabaseServerClient } from "@/lib/supabase/server";
import PostComposer from "../components/PostComposer";
import PostItem from "../components/PostItem";
import { Sparkles, Search, FileText } from "lucide-react";
import ParticleBackground from "../components/ParticleBackground";
import BentoCard from "../components/BentoCard";

// Force dynamic rendering to prevent caching issues
export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';

export default async function Feed() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Get all ACCEPTED friend requests where user is involved
  const { data: friendRequests } = await supabase
    .from("friend_requests")
    .select("requester_id, receiver_id")
    .eq("status", "accepted")
    .or(`requester_id.eq.${user!.id},receiver_id.eq.${user!.id}`);

  // Build list of user IDs whose posts should be shown
  // Include: current user + all accepted friends
  const friendIds = new Set<string>([user!.id]);
  
  friendRequests?.forEach((req) => {
    // If user sent the request and it was accepted, add the receiver
    if (req.requester_id === user!.id) {
      friendIds.add(req.receiver_id);
    }
    // If user received the request and accepted it, add the requester
    else if (req.receiver_id === user!.id) {
      friendIds.add(req.requester_id);
    }
  });

  // Fetch posts only from user and accepted friends
  const { data: posts, error } = await supabase
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
    .in("user_id", Array.from(friendIds))
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching posts:", error);
  }

  // Debug info - always show to help troubleshoot
  console.log('=== FEED DEBUG ===');
  console.log('User ID:', user!.id);
  console.log('Friend IDs:', Array.from(friendIds));
  console.log('Posts fetched:', posts?.length || 0);
  console.log('Error:', error);
  if (posts && posts.length > 0) {
    console.log('First post:', posts[0]);
  }

  return (
    <div className="min-h-screen relative">
      {/* 3D Particle Background */}
      <ParticleBackground color="#9783e7" count={200} shape="box" />
      <div className="relative z-10 max-w-2xl mx-auto py-10 px-4 space-y-6 pb-24">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Sparkles size={24} className="sm:w-7 sm:h-7 text-[#A5B4FC]" />
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black bg-gradient-to-r from-[#A5B4FC] to-[#C8A2C8] bg-clip-text text-transparent">
              Your Feed
            </h1>
          </div>
          <p className="text-[#EADEE7]/60 text-sm sm:text-base">Share your vibes with your crew</p>
        </div>

        {/* Post Composer */}
        <PostComposer />

        {/* Posts */}
        {!posts || posts.length === 0 ? (
          <div className="text-center py-8 sm:py-16">
            <BentoCard className="p-6 sm:p-12 space-y-4 mx-auto">
              <div className="mb-4 flex justify-center">
                <FileText size={48} className="sm:w-16 sm:h-16 text-[#A5B4FC]" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#FEFBF3] mb-2">Your feed is empty</h3>
              <p className="text-[#EADEE7]/60 mb-6 text-sm sm:text-base px-4">
                Your feed shows posts from you and your friends.
              </p>
              <a 
                href="/search" 
                className="inline-flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-linear-to-r from-[#A5B4FC] to-[#C8A2C8] rounded-xl font-semibold text-white shadow-lg hover:shadow-[#A5B4FC]/50 transition-all duration-300 hover:scale-105 text-sm sm:text-base"
              >
                <Search size={20} />
                Find Friends
              </a>
            </BentoCard>
          </div>
        ) : (
          posts && posts.length > 0 && posts.map(p => (
            <PostItem key={`post-${p.id}`} post={p} userId={user!.id} />
          ))
        )}
      </div>
    </div>
  );
}
