"use client";

import { supabase } from "@/lib/supabase/client";
import Link from "next/link";
import { useState } from "react";
import { Search as SearchIcon, User } from "lucide-react";
import ParticleBackground from "../components/ParticleBackground";
import BentoCard from "../components/BentoCard";

export default function Search() {
  const [q, setQ] = useState("");
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  async function search() {
    if (!q.trim()) {
      setUsers([]);
      return;
    }
    
    setLoading(true);
    const { data } = await supabase
      .from("profiles")
      .select("id, username")
      .ilike("username", `%${q}%`)
      .limit(20);

    setUsers(data || []);
    setLoading(false);
  }

  return (
    <div className="min-h-screen relative">
      <ParticleBackground color="#9783e7" count={300} shape="sphere" />
      <div className="relative z-10 w-full max-w-2xl mx-auto py-6 sm:py-10 px-3 sm:px-4">
        <div className="text-center mb-4 sm:mb-6 md:mb-8">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black bg-gradient-to-r from-[#A5B4FC] to-[#C8A2C8] bg-clip-text text-transparent mb-2 flex items-center justify-center gap-2">
            <SearchIcon size={24} className="sm:w-7 sm:h-7 md:w-9 md:h-9" /> 
            <span>Find Friends</span>
          </h1>
          <p className="text-[#EADEE7]/60 text-xs sm:text-sm md:text-base px-4">Discover and connect with people</p>
        </div>
        
        <div className="backdrop-blur-xl bg-white/5 border border-[#A5B4FC]/20 rounded-2xl sm:rounded-3xl p-3 sm:p-4 md:p-6 mb-3 sm:mb-4 md:mb-6">
          <input
            placeholder="Search by username..."
            value={q}
            onChange={e => setQ(e.target.value)}
            onKeyUp={search}
            className="w-full bg-white/5 border border-[#A5B4FC]/20 rounded-xl sm:rounded-2xl px-3 sm:px-4 md:px-6 py-2.5 sm:py-3 md:py-4 outline-none text-[#FEFBF3] placeholder-[#EADEE7]/40 focus:border-[#A5B4FC]/50 transition-all text-sm sm:text-base md:text-lg"
          />
        </div>
        
        <div className="space-y-2 sm:space-y-3">
          {loading ? (
            <BentoCard className="text-center text-[#EADEE7]/60 py-8 sm:py-12">Searching...</BentoCard>
          ) : users.length > 0 ? (
            users.map(u => (
              <Link key={u.id} href={`/profile/${u.username}`}>
                <BentoCard className="flex items-center justify-between p-3 sm:p-4 md:p-5 hover:bg-white/10 transition-all group cursor-pointer">
                  <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1 pr-2">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-[#A5B4FC] to-[#C8A2C8] flex items-center justify-center shrink-0">
                      <User size={18} className="sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
                    </div>
                    <span className="text-[#FEFBF3] font-semibold text-sm sm:text-base md:text-lg truncate">@{u.username}</span>
                  </div>
                  <span className="text-[#EADEE7]/60 text-xs sm:text-sm group-hover:text-[#A5B4FC] transition-colors shrink-0 ml-2">View →</span>
                </BentoCard>
              </Link>
            ))
          ) : q.trim() ? (
            <BentoCard className="text-center text-[#EADEE7]/60 py-8 sm:py-12 flex flex-col items-center gap-2 sm:gap-3">
              <SearchIcon size={40} className="sm:w-12 sm:h-12 text-[#EADEE7]/40" />
              <span className="text-sm sm:text-base">No users found</span>
            </BentoCard>
          ) : (
            <BentoCard className="text-center text-[#EADEE7]/40 py-8 sm:py-12 flex flex-col items-center gap-2 sm:gap-3">
              <SearchIcon size={40} className="sm:w-12 sm:h-12 text-[#EADEE7]/30" />
              <span className="text-sm sm:text-base">Start typing to search</span>
            </BentoCard>
          )}
        </div>
      </div>
    </div>
  );
}
