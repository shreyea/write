"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import Navbar from "./Navbar";
import { usePathname } from "next/navigation";

export default function NavbarWrapper() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    // Check initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Don't show navbar on landing and login pages
  if (pathname === "/" || pathname === "/login") {
    return null;
  }

  // Show navbar only if user is authenticated
  if (!loading && user) {
    return <Navbar />;
  }

  return null;
}
