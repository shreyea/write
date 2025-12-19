import { createSupabaseServerClient } from "@/lib/supabase/server";
import UsernameChanger from "../components/UsernameChanger";
import { redirect } from "next/navigation";
import { Settings } from "lucide-react";
import ParticleBackground from "../components/ParticleBackground";

export default async function SettingsPage() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("username, username_changed")
    .eq("id", user.id)
    .single();

  if (!profile) {
    return <div>Profile not found</div>;
  }

  return (
    <div className="min-h-screen relative">
      <ParticleBackground color="#9783e7" count={300} shape="sphere" />
      <div className="relative z-10 max-w-2xl mx-auto py-10 px-4 space-y-6">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black bg-linear-to-r from-[#A5B4FC] to-[#C8A2C8] bg-clip-text text-transparent mb-2 flex items-center justify-center gap-2">
            <Settings size={28} className="sm:w-9 sm:h-9" /> Settings
          </h1>
          <p className="text-[#EADEE7]/60 text-sm sm:text-base">Customize your account</p>
        </div>
        
        <UsernameChanger 
          currentUsername={profile.username} 
          hasChanged={profile.username_changed || false}
        />
      </div>
    </div>
  );
}
