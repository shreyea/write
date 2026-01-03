import { createSupabaseServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import PostItem from "../components/PostItem";
import { User, Users, FileText, Calendar } from "lucide-react";
import Link from "next/link";
import ParticleBackground from "../components/ParticleBackground";

// Force dynamic rendering to prevent caching issues
export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';

export default async function ProfilePage() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Get user profile
  const { data: profile } = await supabase
    .from("profiles")
    .select("username, username_changed, created_at")
    .eq("id", user.id)
    .single();

  if (!profile) {
    return <div>Profile not found</div>;
  }

  // Get user's posts
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
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  // Get friends (accepted friend requests)
  const { data: friendRequests } = await supabase
    .from("friend_requests")
    .select("requester_id, receiver_id")
    .eq("status", "accepted")
    .or(`requester_id.eq.${user.id},receiver_id.eq.${user.id}`);

  // Extract friend IDs
  const friendIds = new Set<string>();
  friendRequests?.forEach((req) => {
    if (req.requester_id === user.id) {
      friendIds.add(req.receiver_id);
    } else {
      friendIds.add(req.requester_id);
    }
  });

  // Get friend profiles
  const { data: friends } = await supabase
    .from("profiles")
    .select("id, username")
    .in("id", Array.from(friendIds));

  return (
    <div className="min-h-screen relative">
      <ParticleBackground color="#ece198" count={150} shape="sphere" />
      <div className="relative z-10 max-w-7xl mx-auto py-10 px-4 pb-24">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black bg-gradient-to-r from-[#A5B4FC] to-[#C8A2C8] bg-clip-text text-transparent mb-2">
            My Profile
          </h1>
          <p className="text-[#EADEE7]/60">Your personal space</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          {/* Left Column - Profile Info & Stats */}
          <div className="lg:col-span-1 space-y-4 md:space-y-6">
            {/* Profile Card */}
            <div className="backdrop-blur-2xl bg-white/[0.03] border border-[#A5B4FC]/30 rounded-3xl p-6 md:p-8 shadow-2xl shadow-[#A5B4FC]/10 hover:border-[#A5B4FC]/50 transition-all duration-300">
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-[#A5B4FC] to-[#C8A2C8] flex items-center justify-center mb-4 shadow-lg shadow-[#A5B4FC]/30">
                  <User size={40} className="sm:w-12 sm:h-12 text-white" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-1 break-all">@{profile.username}</h2>
                <p className="text-white/60 text-sm mb-4">{user.email}</p>
                
                <Link 
                  href="/settings"
                  className="w-full px-4 py-2 backdrop-blur-xl bg-white/[0.05] hover:bg-white/[0.12] border border-[#A5B4FC]/30 hover:border-[#A5B4FC]/60 rounded-xl transition-all text-sm text-white shadow-lg hover:shadow-[#A5B4FC]/20"
                >
                  Edit Profile
                </Link>
              </div>
            </div>

            {/* Stats Card */}
            <div className="backdrop-blur-2xl bg-white/[0.03] border border-[#C8A2C8]/30 rounded-3xl p-6 shadow-2xl shadow-[#C8A2C8]/10 hover:border-[#C8A2C8]/50 transition-all duration-300">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <FileText size={20} />
                Stats
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-white/60">Posts</span>
                  <span className="text-white font-semibold">{posts?.length || 0}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/60">Friends</span>
                  <span className="text-white font-semibold">{friends?.length || 0}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/60">Total Likes</span>
                  <span className="text-white font-semibold">
                    {posts?.reduce((acc, p) => acc + (p.likes?.length || 0), 0) || 0}
                  </span>
                </div>
              </div>
            </div>

            {/* Friends List */}
            <div className="backdrop-blur-2xl bg-white/[0.03] border border-[#EADEE7]/30 rounded-3xl p-6 shadow-2xl shadow-[#EADEE7]/10 hover:border-[#EADEE7]/50 transition-all duration-300">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Users size={20} />
                Friends ({friends?.length || 0})
              </h3>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {friends && friends.length > 0 ? (
                  friends.map((friend) => (
                    <Link
                      key={friend.id}
                      href={`/profile/${friend.username}`}
                      className="flex items-center gap-3 p-3 backdrop-blur-xl bg-white/[0.02] hover:bg-white/[0.08] border border-transparent hover:border-[#EADEE7]/30 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-[#EADEE7]/20"
                    >
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#A5B4FC] to-[#C8A2C8] flex items-center justify-center shadow-md shadow-[#A5B4FC]/30">
                        <User size={20} className="text-white" />
                      </div>
                      <span className="text-white font-medium">@{friend.username}</span>
                    </Link>
                  ))
                ) : (
                  <p className="text-white/60 text-sm text-center py-4">
                    No friends yet. <Link href="/search" className="text-purple-400 hover:underline">Find friends</Link>
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Posts */}
          <div className="lg:col-span-2 space-y-4 md:space-y-6">
            <div className="backdrop-blur-2xl bg-white/[0.03] border border-[#A5B4FC]/30 rounded-3xl p-6 shadow-2xl shadow-[#A5B4FC]/10 hover:border-[#A5B4FC]/50 transition-all duration-300">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <FileText size={24} />
                My Posts ({posts?.length || 0})
              </h3>
              
              {posts && posts.length > 0 ? (
                <div className="space-y-4">
                  {posts.map((post) => (
                    <PostItem key={post.id} post={post} userId={user.id} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <FileText size={48} className="mx-auto text-white/20 mb-4" />
                  <p className="text-white/60 mb-4">You haven't posted anything yet</p>
                  <Link 
                    href="/feed"
                    className="inline-block px-6 py-3 bg-gradient-to-r from-[#A5B4FC] to-[#C8A2C8] rounded-xl font-semibold text-white shadow-lg hover:shadow-[#A5B4FC]/50 transition-all duration-300 hover:scale-105"
                  >
                    Create Your First Post
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
