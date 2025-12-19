

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
    <main className="min-h-screen relative overflow-hidden bg-[#050505]">
      {/* 3D Particle Background */}
      <div className="fixed inset-0 z-0">
        <Antigravity
          count={400}
          magnetRadius={5}
          ringRadius={5}
          waveSpeed={1.6}
          waveAmplitude={1}
          particleSize={0.4}
          lerpSpeed={0.13}
          color="#e89cde"
          autoAnimate={true}
          particleVariance={1}
          rotationSpeed={0}
          depthFactor={1}
          pulseSpeed={1.5}
          fieldStrength={10}
          particleShape="sphere"
        />
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          {/* Logo */}
          <Link href="/" className="block text-center mb-6 sm:mb-8">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black bg-linear-to-r from-[#A5B4FC] via-[#C8A2C8] to-[#EADEE7] bg-clip-text text-transparent">
              WRITE
            </h1>
          </Link>

          {/* Glass card */}
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl">
            <div className="text-center mb-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 flex items-center justify-center gap-2">
                {isSignup ? "Join the vibe" : "Welcome back"}
              </h2>
              <p className="text-white/60">
                {isSignup ? "Create your account" : "Sign in to continue"}
              </p>
            </div>

            <form onSubmit={handleAuth} className="space-y-4">
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#A5B4FC] transition-all"
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
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#A5B4FC] transition-all"
                  required
                />
              </div>

              {error && (
                <div className="bg-red-500/20 border border-red-500/50 rounded-xl p-3 text-red-200 text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-linear-to-r from-[#A5B4FC] to-[#C8A2C8] rounded-xl font-semibold text-white shadow-lg hover:shadow-[#A5B4FC]/50 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? "Loading..." : isSignup ? <><Rocket size={20} /> Sign Up</> : <><Sparkles size={20} /> Sign In</>}
              </button>
            </form>

            <div className="mt-6 text-center">
              <button
                onClick={() => {
                  setIsSignup(!isSignup);
                  setError("");
                }}
                className="text-white/60 hover:text-white transition-colors"
              >
                {isSignup ? "Already have an account? Sign in" : "Don't have an account? Sign up"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
      