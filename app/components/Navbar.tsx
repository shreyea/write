"use client";

import Link from "next/link";
import { supabase } from "@/lib/supabase/client";
import { usePathname } from "next/navigation";
import { Home, Search, Mail, Settings, LogOut, Sparkles, User } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();

  async function logout() {
    await supabase.auth.signOut();
    window.location.href = "/";
  }

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/5 border-b border-[#A5B4FC]/20" role="navigation" aria-label="Main navigation">
      <div className="max-w-6xl mx-auto px-2 sm:px-4 py-3 sm:py-4 flex justify-between items-center">
        <Link href="/feed" className="flex items-center gap-1.5 sm:gap-2 group" aria-label="WRITE home">
          <span className="text-xl sm:text-2xl font-black bg-linear-to-r from-[#A5B4FC] to-[#C8A2C8] bg-clip-text text-transparent">
            WRITE
          </span>
          <Sparkles size={16} className="sm:w-5 sm:h-5 text-[#A5B4FC] group-hover:rotate-12 transition-transform" aria-hidden="true" />
        </Link>

        <div className="flex items-center gap-1 sm:gap-2">
          <Link 
            href="/feed" 
            className={`px-2 sm:px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base ${
              isActive('/feed') 
                ? 'bg-[#A5B4FC]/20 text-[#A5B4FC] border border-[#A5B4FC]/30' 
                : 'text-[#EADEE7]/70 hover:text-[#FEFBF3] hover:bg-white/5'
            }`}
            aria-label="Feed"
            aria-current={isActive('/feed') ? 'page' : undefined}
          >
            <Home size={16} className="sm:w-[18px] sm:h-[18px]" aria-hidden="true" /> <span className="hidden sm:inline">Feed</span>
          </Link>
          <Link 
            href="/search" 
            className={`px-2 sm:px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base ${
              isActive('/search') 
                ? 'bg-[#A5B4FC]/20 text-[#A5B4FC] border border-[#A5B4FC]/30' 
                : 'text-[#EADEE7]/70 hover:text-[#FEFBF3] hover:bg-white/5'
            }`}
            aria-label="Search"
            aria-current={isActive('/search') ? 'page' : undefined}
          >
            <Search size={16} className="sm:w-[18px] sm:h-[18px]" aria-hidden="true" /> <span className="hidden sm:inline">Search</span>
          </Link>
          <Link 
            href="/requests" 
            className={`px-2 sm:px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base ${
              isActive('/requests') 
                ? 'bg-[#A5B4FC]/20 text-[#A5B4FC] border border-[#A5B4FC]/30' 
                : 'text-[#EADEE7]/70 hover:text-[#FEFBF3] hover:bg-white/5'
            }`}
            aria-label="Friend requests"
            aria-current={isActive('/requests') ? 'page' : undefined}
          >
            <Mail size={16} className="sm:w-[18px] sm:h-[18px]" aria-hidden="true" /> <span className="hidden sm:inline">Requests</span>
          </Link>
          <Link 
            href="/profile" 
            className={`px-2 sm:px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base ${
              isActive('/profile') 
                ? 'bg-[#A5B4FC]/20 text-[#A5B4FC] border border-[#A5B4FC]/30' 
                : 'text-[#EADEE7]/70 hover:text-[#FEFBF3] hover:bg-white/5'
            }`}
            aria-label="Profile"
            aria-current={isActive('/profile') ? 'page' : undefined}
          >
            <User size={16} className="sm:w-[18px] sm:h-[18px]" aria-hidden="true" /> <span className="hidden sm:inline">Profile</span>
          </Link>
          <Link 
            href="/settings" 
            className={`px-2 sm:px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base ${
              isActive('/settings') 
                ? 'bg-[#A5B4FC]/20 text-[#A5B4FC] border border-[#A5B4FC]/30' 
                : 'text-[#EADEE7]/70 hover:text-[#FEFBF3] hover:bg-white/5'
            }`}
            aria-label="Settings"
            aria-current={isActive('/settings') ? 'page' : undefined}
          >
            <Settings size={16} className="sm:w-[18px] sm:h-[18px]" aria-hidden="true" /> <span className="hidden sm:inline">Settings</span>
          </Link>
          <button 
            onClick={logout} 
            className="px-2 sm:px-4 py-2 rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base"
            aria-label="Logout"
          >
            <LogOut size={16} className="sm:w-[18px] sm:h-[18px]" aria-hidden="true" /> <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
