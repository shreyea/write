

"use client";

import { supabase } from "@/lib/supabase/client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Rocket, Sparkles } from "lucide-react";
import Antigravity from "../components/Antigravity";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSignup, setIsSignup] = useState(false);

  async function handleAuth(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (isSignup) {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        alert("Check your email to confirm your account!");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        router.refresh();
        router.push("/feed");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen relative overflow-hidden bg-gradient-to-b from-[#050505] via-[#0a0a0a] to-[#050505]">
      {/* Subtle 3D Particle Background */}
      <div className="fixed inset-0 z-0">
        <Antigravity
          count={350}
          magnetRadius={4}
          ringRadius={4}
          waveSpeed={1.2}
          waveAmplitude={0.8}
          particleSize={0.5}
          lerpSpeed={0.12}
          color="#C8A2C8"
          autoAnimate={true}
          particleVariance={1.2}
          rotationSpeed={0.6}
          depthFactor={1}
          pulseSpeed={1.5}
          fieldStrength={8}
          particleShape="sphere"
        />
      </div>

      {/* Film grain texture */}
      <div
        className="fixed inset-0 z-[1] pointer-events-none opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
        }}
      />

      {/* Subtle atmospheric glows */}
      <div className="fixed inset-0 z-[1] pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-gradient-radial from-[#A5B4FC]/12 via-[#C8A2C8]/4 to-transparent rounded-full blur-3xl animate-blob" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-radial from-[#C8A2C8]/12 via-[#EADEE7]/4 to-transparent rounded-full blur-3xl animate-blob animation-delay-2000" />
        
        {/* Delicate floating particles */}
        <div className="absolute top-[15%] left-[15%] w-2 h-2 rounded-full bg-[#A5B4FC]/40 animate-float shadow-lg shadow-[#A5B4FC]/30" />
        <div className="absolute top-[25%] right-[20%] w-1.5 h-1.5 rounded-full bg-[#C8A2C8]/35 animate-float animation-delay-1000" />
        <div className="absolute top-[40%] left-[10%] w-2.5 h-2.5 rounded-full bg-[#EADEE7]/40 animate-float animation-delay-2000 shadow-md shadow-[#EADEE7]/25" />
        <div className="absolute top-[55%] right-[15%] w-2 h-2 rounded-full bg-[#A5B4FC]/35 animate-float animation-delay-3000" />
        <div className="absolute bottom-[30%] left-[25%] w-1.5 h-1.5 rounded-full bg-[#C8A2C8]/40 animate-float animation-delay-1500" />
        <div className="absolute bottom-[20%] right-[30%] w-2 h-2 rounded-full bg-[#EADEE7]/45 animate-float animation-delay-2500 shadow-md shadow-[#EADEE7]/25" />
        <div className="absolute top-[70%] left-[35%] w-1.5 h-1.5 rounded-full bg-[#A5B4FC]/30 animate-float animation-delay-3500" />
        <div className="absolute bottom-[45%] right-[25%] w-2 h-2 rounded-full bg-[#C8A2C8]/35 animate-float animation-delay-500" />
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Elegant Logo */}
          <Link href="/" className="block text-center mb-12">
            <div className="inline-flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#A5B4FC]/20 to-[#C8A2C8]/20 backdrop-blur-xl border border-white/20 flex items-center justify-center shadow-xl">
                <Sparkles className="w-6 h-6 text-[#A5B4FC]" />
              </div>
              <h1 className="text-5xl sm:text-6xl font-black bg-gradient-to-r from-[#A5B4FC] via-[#C8A2C8] to-[#EADEE7] bg-clip-text text-transparent">
                WRITE
              </h1>
            </div>
            <p className="text-[#EADEE7]/50 text-sm tracking-wide">Where authenticity meets transparency</p>
          </Link>

          {/* Refined Glass Card */}
          <div className="backdrop-blur-2xl bg-gradient-to-br from-white/[0.08] to-white/[0.03] border border-white/10 rounded-3xl p-8 sm:p-10 shadow-2xl hover:shadow-[#A5B4FC]/20 transition-all duration-500">
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                {isSignup ? "Join the vibe" : "Welcome back"}
              </h2>
              <p className="text-white/60 text-base">
                {isSignup ? "Create your transparent account" : "Sign in to continue writing"}
              </p>
            </div>

            <form onSubmit={handleAuth} className="space-y-5">
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3.5 bg-white/[0.06] border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-[#A5B4FC]/50 focus:ring-2 focus:ring-[#A5B4FC]/20 transition-all backdrop-blur-xl hover:bg-white/[0.08]"
                  required
                />
              </div>

              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3.5 bg-white/[0.06] border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-[#A5B4FC]/50 focus:ring-2 focus:ring-[#A5B4FC]/20 transition-all backdrop-blur-xl hover:bg-white/[0.08]"
                  required
                />
              </div>

              {error && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3.5 text-red-200 text-sm backdrop-blur-xl">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-gradient-to-r from-[#A5B4FC] via-[#C8A2C8] to-[#A5B4FC] rounded-xl font-semibold text-white text-base shadow-lg hover:shadow-xl hover:shadow-[#A5B4FC]/40 transition-all duration-300 hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
                style={{ backgroundSize: '200% 100%' }}
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Loading...</span>
                  </div>
                ) : isSignup ? (
                  <>
                    <Rocket size={20} />
                    <span>Create Account</span>
                  </>
                ) : (
                  <>
                    <Sparkles size={20} />
                    <span>Sign In</span>
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <button
                onClick={() => {
                  setIsSignup(!isSignup);
                  setError("");
                }}
                className="text-white/60 hover:text-white transition-colors text-sm"
              >
                {isSignup ? "Already have an account? Sign in" : "Don't have an account? Sign up"}
              </button>
            </div>
          </div>

          {/* Subtle back link */}
          <Link 
            href="/" 
            className="block text-center mt-8 text-[#EADEE7]/40 hover:text-[#EADEE7]/70 transition-colors text-sm"
          >
            ← Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}
