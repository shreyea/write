"use client";

import Link from "next/link";
import { supabase } from "@/lib/supabase/client";
import { usePathname, useRouter } from "next/navigation";
import { Home, Search, Mail, Settings, LogOut, User, Feather } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  const isActive = (path: string) => pathname === path;

  return (
    <nav 
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50"
      role="navigation" 
      aria-label="Main navigation"
    >
        <div className="backdrop-blur-xl   border border-white/20 rounded-full px-6 py-3 shadow-2xl shadow-black/20">
          <div className="flex items-center gap-1">
            {/* Feed */}
            <Link 
              href="/feed" 
              className={`group relative p-3 rounded-full transition-all duration-300 ${
                isActive('/feed') 
                  ? 'bg-gradient-to-br from-[#A5B4FC] to-[#C8A2C8] text-white shadow-lg shadow-[#A5B4FC]/50 scale-110' 
                  : 'text-[#EADEE7]/70 hover:text-white hover:bg-white/10 hover:scale-110'
              }`}
              aria-label="Feed"
              aria-current={isActive('/feed') ? 'page' : undefined}
              title="Feed"
            >
              <Home size={22} className="transition-transform" aria-hidden="true" />
            </Link>

            {/* Search */}
            <Link 
              href="/search" 
              className={`group relative p-3 rounded-full transition-all duration-300 ${
                isActive('/search') 
                  ? 'bg-gradient-to-br from-[#A5B4FC] to-[#C8A2C8] text-white shadow-lg shadow-[#A5B4FC]/50 scale-110' 
                  : 'text-[#EADEE7]/70 hover:text-white hover:bg-white/10 hover:scale-110'
              }`}
              aria-label="Search"
              aria-current={isActive('/search') ? 'page' : undefined}
              title="Search"
            >
              <Search size={22} className="transition-transform" aria-hidden="true" />
            </Link>

            {/* Requests */}
            <Link 
              href="/requests" 
              className={`group relative p-3 rounded-full transition-all duration-300 ${
                isActive('/requests') 
                  ? 'bg-gradient-to-br from-[#A5B4FC] to-[#C8A2C8] text-white shadow-lg shadow-[#A5B4FC]/50 scale-110' 
                  : 'text-[#EADEE7]/70 hover:text-white hover:bg-white/10 hover:scale-110'
              }`}
              aria-label="Friend requests"
              aria-current={isActive('/requests') ? 'page' : undefined}
              title="Requests"
            >
              <Mail size={22} className="transition-transform" aria-hidden="true" />
            </Link>

            

            {/* Profile */}
            <Link 
              href="/profile" 
              className={`group relative p-3 rounded-full transition-all duration-300 ${
                isActive('/profile') 
                  ? 'bg-gradient-to-br from-[#A5B4FC] to-[#C8A2C8] text-white shadow-lg shadow-[#A5B4FC]/50 scale-110' 
                  : 'text-[#EADEE7]/70 hover:text-white hover:bg-white/10 hover:scale-110'
              }`}
              aria-label="Profile"
              aria-current={isActive('/profile') ? 'page' : undefined}
              title="Profile"
            >
              <User size={22} className="transition-transform" aria-hidden="true" />
            </Link>

           

            {/* Logout */}
            <button 
              onClick={logout} 
              className="group relative p-3 rounded-full text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-all duration-300 hover:scale-110"
              aria-label="Logout"
              title="Logout"
            >
              <LogOut size={22} className="transition-transform" aria-hidden="true" />
            </button>
          </div>
        </div>
      </nav>
  );
}
