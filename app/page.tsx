"use client";

import Link from "next/link";
import { MessageCircle, Users, Pen, Zap, Heart, Unlock, User, Github, Linkedin, Instagram, Edit3, Sparkles, ArrowRight } from "lucide-react";
import BlurText from "./components/BlurText";
import BentoCard from "./components/BentoCard";
import Antigravity from "./components/Antigravity";
import { useEffect } from "react";
import Lenis from "lenis";

export default function Landing() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  return (
    <main className="min-h-screen relative overflow-hidden bg-gradient-to-b from-[#050505] via-[#0a0a0a] to-[#050505]">
      {/* Premium Particle background */}
      <div className="fixed inset-0 z-0">
        <Antigravity
          count={400}
          magnetRadius={6}
          ringRadius={6}
          waveSpeed={1.8}
          waveAmplitude={1.2}
          particleSize={0.8}
          lerpSpeed={0.15}
          color="#A5B4FC"
          autoAnimate={true}
          particleVariance={1.5}
          rotationSpeed={1.2}
          depthFactor={1.2}
          pulseSpeed={2}
          fieldStrength={12}
          particleShape="tetrahedron"
        />
      </div>

      {/* Film grain overlay */}
      <div
        className="fixed inset-0 z-[1] pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
        }}
      />

      {/* Enhanced atmospheric gradients + premium floating particles */}
      <div className="fixed inset-0 z-[1] pointer-events-none overflow-hidden">
        {/* Larger, softer gradient orbs */}
        <div className="absolute top-[-10%] right-[-5%] w-[800px] h-[800px] bg-gradient-radial from-[#A5B4FC]/15 via-[#C8A2C8]/8 to-transparent rounded-full blur-3xl animate-blob" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[700px] h-[700px] bg-gradient-radial from-[#C8A2C8]/15 via-[#EADEE7]/8 to-transparent rounded-full blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-[#EADEE7]/10 to-transparent rounded-full blur-3xl animate-pulse" />

        {/* Enhanced floating particle system - more varied sizes and positions */}
        <div className="absolute top-[8%] right-[10%] w-3 h-3 rounded-full bg-[#A5B4FC]/60 animate-float shadow-lg shadow-[#A5B4FC]/50" />
        <div className="absolute top-[12%] left-[15%] w-2 h-2 rounded-full bg-[#C8A2C8]/50 animate-float animation-delay-1000" />
        <div className="absolute top-[20%] right-[25%] w-4 h-4 rounded-full bg-[#A5B4FC]/40 animate-float animation-delay-2000 shadow-md shadow-[#A5B4FC]/40" />
        <div className="absolute top-[30%] left-[20%] w-2.5 h-2.5 rounded-full bg-[#EADEE7]/55 animate-float animation-delay-3000" />
        <div className="absolute top-[40%] right-[35%] w-2 h-2 rounded-full bg-[#C8A2C8]/45 animate-float animation-delay-4000" />
        <div className="absolute top-[50%] left-[10%] w-3.5 h-3.5 rounded-full bg-[#A5B4FC]/50 animate-float animation-delay-1500 shadow-lg shadow-[#A5B4FC]/50" />
        <div className="absolute top-[60%] right-[18%] w-2 h-2 rounded-full bg-[#EADEE7]/60 animate-float animation-delay-2500" />
        <div className="absolute bottom-[25%] left-[22%] w-2.5 h-2.5 rounded-full bg-[#C8A2C8]/55 animate-float animation-delay-3500" />
        <div className="absolute bottom-[30%] right-[28%] w-3 h-3 rounded-full bg-[#A5B4FC]/45 animate-float animation-delay-500 shadow-md shadow-[#A5B4FC]/40" />
        <div className="absolute bottom-[15%] left-[8%] w-2 h-2 rounded-full bg-[#EADEE7]/50 animate-float animation-delay-4500" />
        <div className="absolute top-[70%] right-[12%] w-2.5 h-2.5 rounded-full bg-[#C8A2C8]/50 animate-float animation-delay-2000" />
        <div className="absolute bottom-[40%] left-[35%] w-1.5 h-1.5 rounded-full bg-[#A5B4FC]/55 animate-float animation-delay-3200" />
      </div>

      {/* Main content */}
      <div className="relative z-10 min-h-screen px-6 py-0 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          {/* Stunning Hero Section */}
          <div className="mb-24 md:mb-32 lg:mb-48 mt-16 md:mt-24 lg:mt-32">
            <div className="text-center max-w-5xl mx-auto">
              {/* Premium Badge */}
              <div className="inline-flex items-center gap-2.5 px-5 py-1 rounded-full border border-[#A5B4FC]/30 bg-gradient-to-r from-[#A5B4FC]/10 to-[#C8A2C8]/10 backdrop-blur-xl mb-10 shadow-lg shadow-[#A5B4FC]/20">
                <Sparkles className="w-4 h-4 text-[#A5B4FC] animate-pulse" />
                <span className="text-sm font-semibold text-[#FEFBF3]/90 tracking-wide">The Future of Transparent Social</span>
              </div>

              {/* Massive, Impactful Title */}
              <h1 className="text-7xl sm:text-8xl md:text-9xl lg:text-[11rem] font-black leading-[0.85] tracking-tighter mb-8">
                <span className="block bg-gradient-to-br from-[#FEFBF3] via-[#A5B4FC] to-[#C8A2C8] bg-clip-text text-transparent animate-gradient drop-shadow-2xl" style={{ backgroundSize: '200% 200%' }}>
                  WRITE
                </span>
                <span className="block text-[#FEFBF3]/6 -mt-6 select-none py-3">
                  FREELY
                </span>
              </h1>

              {/* Compelling Tagline */}
              <div className="max-w-4xl mx-auto mb-12">
                <BlurText
                  text="Where authenticity meets transparency. Share your unfiltered thoughts with the world."
                  delay={25}
                  animateBy="words"
                  direction="top"
                  className="text-2xl md:text-2xl lg:text-2xl text-[#EADEE7]/80 font-light leading-relaxed"
                />
              </div>

              {/* Premium CTA Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-5 mb-10">
                <Link 
                  href="/login" 
                  className="group relative px-10 py-5 bg-gradient-to-r from-[#A5B4FC] via-[#C8A2C8] to-[#A5B4FC] rounded-2xl font-bold text-[#050505] text-lg transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-[#A5B4FC]/60 overflow-hidden"
                  style={{ backgroundSize: '200% 100%' }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent translate-x-[-200%] group-hover:translate-x-[100%] transition-transform duration-700" />
                  <div className="relative flex items-center gap-3">
                    <Edit3 className="w-5 h-5" />
                    <span>Start Writing </span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
                
                <Link 
                  href="/login" 
                  className="group px-10 py-5 backdrop-blur-2xl bg-white/5 border-2 border-[#EADEE7]/30 rounded-2xl font-bold text-[#FEFBF3] text-lg hover:bg-white/10 hover:border-[#A5B4FC]/60 transition-all duration-300 hover:shadow-xl hover:shadow-[#A5B4FC]/30"
                >
                  <span>Sign In</span>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center justify-center gap-8 text-[#EADEE7]/50 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span>100% Transparent</span>
                </div>
                <div className="h-1 w-1 rounded-full bg-[#EADEE7]/30" />
                <span>No Hidden Algorithms</span>
                <div className="h-1 w-1 rounded-full bg-[#EADEE7]/30" />
                <span>Authentic Connections</span>
              </div>
            </div>
          </div>

          {/* Feature Highlights - Premium 3-Column */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
            <div className="group backdrop-blur-2xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10 rounded-3xl p-8 hover:border-[#A5B4FC]/40 transition-all duration-500 hover:shadow-2xl hover:shadow-[#A5B4FC]/20 hover:-translate-y-2">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#A5B4FC]/30 to-[#C8A2C8]/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-[#A5B4FC]/30">
                <Unlock className="w-7 h-7 text-[#A5B4FC]" />
              </div>
              <h3 className="text-2xl font-bold text-[#FEFBF3] mb-3">Fully Transparent</h3>
              <p className="text-[#EADEE7]/70 leading-relaxed">Every post is public. No hidden feeds, no secret algorithms. What you see is what everyone sees.</p>
            </div>

            <div className="group backdrop-blur-2xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10 rounded-3xl p-8 hover:border-[#C8A2C8]/40 transition-all duration-500 hover:shadow-2xl hover:shadow-[#C8A2C8]/20 hover:-translate-y-2">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#C8A2C8]/30 to-[#EADEE7]/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-[#C8A2C8]/30">
                <MessageCircle className="w-7 h-7 text-[#C8A2C8]" />
              </div>
              <h3 className="text-2xl font-bold text-[#FEFBF3] mb-3">Real Connections</h3>
              <p className="text-[#EADEE7]/70 leading-relaxed">Connect with friends who matter. Share authentic moments without the noise.</p>
            </div>

            <div className="group backdrop-blur-2xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10 rounded-3xl p-8 hover:border-[#EADEE7]/40 transition-all duration-500 hover:shadow-2xl hover:shadow-[#EADEE7]/20 hover:-translate-y-2">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#EADEE7]/30 to-[#A5B4FC]/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-[#EADEE7]/30">
                <Heart className="w-7 h-7 text-[#EADEE7]" />
              </div>
              <h3 className="text-2xl font-bold text-[#FEFBF3] mb-3">Your Story</h3>
              <p className="text-[#EADEE7]/70 leading-relaxed">Build your digital diary together with friends. Every moment, every thought, preserved.</p>
            </div>
          </div>

          {/* Premium Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 mb-28">
            {/* Large Feature Card */}
            <BentoCard className="lg:col-span-2 lg:row-span-2 min-h-[350px] md:min-h-[450px] flex flex-col justify-between group hover:scale-[1.02] transition-transform duration-500" gradient>
              <div>
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-xl flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform duration-500 shadow-2xl">
                  <Unlock size={32} className="sm:w-10 sm:h-10 text-white drop-shadow-lg" />
                </div>
                <h3 className="text-3xl sm:text-4xl font-black text-[#FEFBF3] mb-4">Transparent by Design</h3>
                <p className="text-[#FEFBF3]/80 text-lg sm:text-xl leading-relaxed">Every word you write is public and readable by anyone. Say what you truly mean, with complete transparency.</p>
              </div>
              <div className="mt-10">
                <div className="flex items-center gap-2 text-white/90 font-bold text-lg">
                  <span>End-to-end transparency</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </BentoCard>

            {/* Stat Cards */}
            <BentoCard className="min-h-[210px] flex flex-col justify-between hover:scale-[1.03] transition-all duration-300">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#C8A2C8]/20 to-[#C8A2C8]/10 backdrop-blur-xl flex items-center justify-center mb-4 shadow-lg">
                <MessageCircle size={28} className="text-[#C8A2C8]" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-[#FEFBF3] mb-2">Real Talk</h3>
                <p className="text-[#EADEE7]/70 text-base">WRITE to be understood, comment to understand others.</p>
              </div>
            </BentoCard>

            <BentoCard className="min-h-[210px] flex flex-col justify-between hover:scale-[1.03] transition-all duration-300">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#A5B4FC]/20 to-[#A5B4FC]/10 backdrop-blur-xl flex items-center justify-center mb-4 shadow-lg">
                <Users size={28} className="text-[#A5B4FC]" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-[#FEFBF3] mb-2">Your Crew</h3>
                <p className="text-[#EADEE7]/70 text-base">Connect with friends and share thoughts on your curated feed.</p>
              </div>
            </BentoCard>

            <BentoCard className="min-h-[210px] flex flex-col justify-between hover:scale-[1.03] transition-all duration-300">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#EADEE7]/20 to-[#EADEE7]/10 backdrop-blur-xl flex items-center justify-center mb-4 shadow-lg">
                <Zap size={28} className="text-[#EADEE7]" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-[#FEFBF3] mb-2">Instant</h3>
                <p className="text-[#EADEE7]/70 text-base">Share moments as they happen, in real-time.</p>
              </div>
            </BentoCard>

            <BentoCard className="min-h-[210px] flex flex-col justify-between hover:scale-[1.03] transition-all duration-300">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#C8A2C8]/20 to-[#C8A2C8]/10 backdrop-blur-xl flex items-center justify-center mb-4 shadow-lg">
                <Heart size={28} className="text-[#C8A2C8]" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-[#FEFBF3] mb-2">No Drama</h3>
                <p className="text-[#EADEE7]/70 text-base">Only genuine appreciation and authentic resonance.</p>
              </div>
            </BentoCard>

            {/* Wide Feature Cards */}
            <BentoCard className="lg:col-span-2 min-h-[280px] hover:scale-[1.02] transition-all duration-500">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-8 h-full">
                <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-[#C8A2C8]/20 to-[#EADEE7]/20 backdrop-blur-xl flex items-center justify-center flex-shrink-0 shadow-xl">
                  <User size={48} className="text-[#C8A2C8]" />
                </div>
                <div className="flex-1">
                  <h3 className="text-3xl sm:text-4xl font-bold text-[#FEFBF3] mb-4">Your Space</h3>
                  <p className="text-[#EADEE7]/80 text-lg sm:text-xl leading-relaxed">Express yourself freely in your digital sanctuary. Your voice, your rules.</p>
                </div>
              </div>
            </BentoCard>

            <BentoCard className="lg:col-span-2 min-h-[280px] hover:scale-[1.02] transition-all duration-500" gradient>
              <div className="flex flex-col md:flex-row items-start md:items-center gap-8 h-full">
                <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-xl flex items-center justify-center flex-shrink-0 shadow-2xl">
                  <Pen size={48} className="text-white drop-shadow-lg" />
                </div>
                <div className="flex-1">
                  <h3 className="text-3xl sm:text-4xl font-bold text-[#FEFBF3] mb-4">Daily Updates</h3>
                  <p className="text-[#FEFBF3]/80 text-lg sm:text-xl leading-relaxed">Share text, images, and thoughts. Build your digital diary together with friends.</p>
                </div>
              </div>
            </BentoCard>
          </div>

          {/* Stunning Final CTA */}
          <div className="text-center py-24 mb-20">
            <BentoCard className="max-w-3xl mx-auto hover:scale-[1.02] transition-transform duration-500" gradient>
              <div className="flex items-center justify-center gap-3 mb-6">
                <Sparkles className="w-8 h-8 text-white animate-pulse" />
                <h2 className="text-3xl md:text-4xl font-black text-[#FEFBF3]">Ready to connect?</h2>
              </div>
              <p className="text-[#FEFBF3]/80 text-xl md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
                Join your friends and start sharing your authentic story with the world.
              </p>
              <Link href="/login" className="inline-flex items-center gap-3 px-12 py-5 bg-white/ hover:bg-white/25 backdrop-blur-xl rounded-xl font-bold text-white text-xl shadow-2xl hover:shadow-white/25 transition-all duration-300 hover:scale-100 border-1 border-white/30">
                <Edit3 size={24} />
                <span>Start Writing Now</span>
                <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </BentoCard>
          </div>

          {/* Footer */}
          <footer className="py-12 border-t border-white/10">
            <div className="max-w-7xl mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-8 mx-10">
                <div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-[#A5B4FC] to-[#C8A2C8] bg-clip-text text-transparent mb-2">WRITE</h3>
                  <p className="text-[#EADEE7]/60 text-sm">Your space to WRITE honestly and read openly</p>
                </div>
                <div>
                  <h4 className="text-[#FEFBF3] font-semibold mb-3">Features</h4>
                  <ul className="space-y-2 text-[#EADEE7]/60 text-sm">
                    <li>Transparent Posts</li>
                    <li>Friend System</li>
                    <li>Real-time Updates</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-[#FEFBF3] font-semibold mb-3">Connect</h4>
                  <p className="text-[#EADEE7]/60 text-sm">Share your vibe with your tribe.</p>
                </div>
              </div>
              <div className="text-center pt-8 border-t border-white/5">
                <div className="mb-6">
                  <p className="text-[#EADEE7]/70 text-base mb-4 font-medium">Made by <span className="text-[#A5B4FC] font-semibold">Shreya</span></p>
                  <div className="flex items-center justify-center gap-6">
                    <a href="https://github.com/shreyea" target="_blank" rel="noopener noreferrer" className="text-[#EADEE7]/60 hover:text-[#A5B4FC] transition-colors duration-300 flex items-center gap-2 group" aria-label="GitHub Profile">
                      <Github size={20} className="group-hover:scale-110 transition-transform" />
                      <span className="text-sm">GitHub</span>
                    </a>
                    <a href="https://www.linkedin.com/in/shreya-upadhayay-97430a329?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer" className="text-[#EADEE7]/60 hover:text-[#C8A2C8] transition-colors duration-300 flex items-center gap-2 group" aria-label="LinkedIn Profile">
                      <Linkedin size={20} className="group-hover:scale-110 transition-transform" />
                      <span className="text-sm">LinkedIn</span>
                    </a>
                    <a href="https://instagram.com/__shreyea" target="_blank" rel="noopener noreferrer" className="text-[#EADEE7]/60 hover:text-[#EADEE7] transition-colors duration-300 flex items-center gap-2 group" aria-label="Instagram Profile">
                      <Instagram size={20} className="group-hover:scale-110 transition-transform" />
                      <span className="text-sm">Instagram</span>
                    </a>
                  </div>
                </div>
                <p className="text-[#EADEE7]/40 text-sm">© 2025 WRITE. Built for genuine connections.</p>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </main>
  );
}
