import { createSupabaseServerClient } from "@/lib/supabase/server";
import RequestList from "../components/RequestList";
import Link from "next/link";
import { Mail, Search, UserPlus } from "lucide-react";
import ParticleBackground from "../components/ParticleBackground";
import BentoCard from "../components/BentoCard";

export default async function RequestsPage() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return <div>Not authenticated</div>;
  }

  // Get all friend requests data with a simple query
  const { data: allRequests, error: allError } = await supabase
    .from("friend_requests")
    .select("*")
    .order("created_at", { ascending: false });

  console.log("ALL friend requests in database:", allRequests);

  // Get pending friend requests where current user is the receiver
  const { data: requests, error } = await supabase
    .from("friend_requests")
    .select("*")
    .eq("receiver_id", user.id)
    .eq("status", "pending")
    .order("created_at", { ascending: false });

  console.log("Requests query:", { 
    userId: user.id, 
    receivedRequests: requests,
    error 
  });

  // Fetch the requester profiles
  const requestsWithProfiles = await Promise.all(
    (requests || []).map(async (req) => {
      const { data: profile } = await supabase
        .from("profiles")
        .select("username")
        .eq("id", req.requester_id)
        .single();
      
      return {
        ...req,
        profiles: profile
      };
    })
  );

  return (
    <div className="min-h-screen relative">
      <ParticleBackground color="#ece198" count={150} shape="sphere" />
      <div className="relative z-10 max-w-2xl mx-auto py-10 px-4 pb-24">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black bg-gradient-to-r from-[#A5B4FC] to-[#C8A2C8] bg-clip-text text-transparent mb-2 flex items-center justify-center gap-2">
            <Mail size={28} className="sm:w-9 sm:h-9" /> Friend Requests
          </h1>
          <p className="text-[#EADEE7]/60 text-sm sm:text-base">People who want to connect with you</p>
        </div>
        
        {requestsWithProfiles.length === 0 ? (
          <div className="text-center py-16">
            <BentoCard className="p-6 sm:p-12">
              <div className="mb-4 flex justify-center">
                <UserPlus size={48} className="sm:w-16 sm:h-16 text-[#A5B4FC]" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#FEFBF3] mb-2">No pending requests</h3>
              <p className="text-[#EADEE7]/60 mb-6 text-sm sm:text-base">When people send you friend requests, they'll appear here</p>
              <Link 
                href="/search" 
                className="inline-flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-[#A5B4FC] to-[#C8A2C8] rounded-xl font-semibold text-white shadow-lg hover:shadow-[#A5B4FC]/50 transition-all duration-300 hover:scale-105 text-sm sm:text-base"
              >
                <Search size={20} />
                Find Friends
              </Link>
            </BentoCard>
          </div>
        ) : (
          <RequestList requests={requestsWithProfiles} />
        )}
      </div>
    </div>
  );
}
