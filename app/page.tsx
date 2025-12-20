"use client";

import Link from "next/link";
import { Lock, MessageCircle, Users, Sparkles, Zap, Heart, Unlock, User } from "lucide-react";
import BlurText from "./components/BlurText";
import BentoCard from "./components/BentoCard";
import Antigravity from "./components/Antigravity";
import { useEffect } from "react";
import Lenis from "lenis";

export default function Landing() {
  // Initialize Lenis for smooth scrolling
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

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <main className="min-h-screen relative overflow-hidden bg-[#050505]">
      {/* 3D Particle Background */}
      <div className="fixed inset-0 z-0">
        <Antigravity
          count={400}
          magnetRadius={5}
          ringRadius={5}
          waveSpeed={1.5}
          waveAmplitude={1}
          particleSize={0.7}
          lerpSpeed={0.13}
          color="#9783e7"
          autoAnimate={true}
          particleVariance={1}
          rotationSpeed={1}
          depthFactor={1}
          pulseSpeed={1.5}
          fieldStrength={10}
          particleShape="tetrahedron"
        />
      </div>

      {/* Grain/Noise Overlay */}
      <div className="fixed inset-0 z-[1] pointer-events-none opacity-[0.015]" 
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat'
        }}
      />

      {/* Mesh Gradient Accents */}
      <div className="fixed inset-0 z-[1] pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#A5B4FC] rounded-full mix-blend-screen filter blur-[120px] opacity-10 animate-blob" />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-[#C8A2C8] rounded-full mix-blend-screen filter blur-[100px] opacity-10 animate-blob animation-delay-2000" />
        <div className="absolute bottom-0 left-1/3 w-[450px] h-[450px] bg-[#EADEE7] rounded-full mix-blend-screen filter blur-[110px] opacity-10 animate-blob animation-delay-4000" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen px-4 py-8 md:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Logo at Top Center */}
         <div className="text-center mb-12 md:mb-16 mt-10">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black bg-gradient-to-r from-[#A5B4FC] via-[#C8A2C8] to-[#EADEE7] bg-clip-text text-transparent mb-2 animate-gradient">
              WRITE
            </h1>
            <div className="h-1 w-20 mx-auto bg-gradient-to-r from-[#A5B4FC] to-[#C8A2C8] rounded-full"></div>
          </div>
  
          {/* Hero Section */}
          <div className="text-center mb-12 md:mb-20">
    
            <div className="mb-12 md:mb-20 flex justify-center">
  <BlurText
    text="A transparent space to share your thoughts with the real world."
    delay={50}
    animateBy="words"
    direction="top"
    className="block w-full max-w-4xl
               text-base sm:text-lg md:text-xl lg:text-2xl
               text-[#EADEE7]/80 font-light
               px-30 text-center"
  />
</div>


            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mb-8 px-4">
              <Link href="/login" className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-[#A5B4FC] to-[#C8A2C8] rounded-2xl font-bold text-white text-base sm:text-lg shadow-xl hover:shadow-[#A5B4FC]/50 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2">
                <Sparkles size={18} className="sm:w-5 sm:h-5" />
                Get Started
              </Link>
              <Link href="/login" className="px-6 sm:px-8 py-3 sm:py-4 backdrop-blur-xl bg-white/5 border-2 border-[#EADEE7]/30 rounded-2xl font-bold text-[#FEFBF3] text-base sm:text-lg hover:bg-white/10 transition-all duration-300 hover:scale-105 flex items-center justify-center">
                Sign In
              </Link>
            </div>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-12 md:mb-20">
            {/* Large Feature Card - Spans 2 columns */}
            <BentoCard className="lg:col-span-2 lg:row-span-2 min-h-[300px] md:min-h-[400px] flex flex-col justify-between" gradient>
              <div>
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-[#A5B4FC] to-[#C8A2C8] flex items-center justify-center mb-4 sm:mb-6">
                  <Unlock size={24} className="sm:w-8 sm:h-8 text-white" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-[#FEFBF3] mb-3 sm:mb-4">Transparent by Design</h3>
                <p className="text-[#EADEE7]/70 text-base sm:text-lg leading-relaxed">
                  Your posts are public and readable by anyone. WRITE what you truely mean
                </p>
              </div>
              <div className="mt-8">
                <div className="flex items-center gap-2 text-[#A5B4FC] font-semibold">
                  <span>End-to-end transparency</span>
                  <Sparkles size={16} />
                </div>
              </div>
            </BentoCard>

            {/* Stat Card */}
            <BentoCard className="min-h-[190px] flex flex-col justify-between">
              <div className="w-12 h-12 rounded-xl bg-[#C8A2C8]/20 flex items-center justify-center mb-4">
                <MessageCircle size={24} className="text-[#C8A2C8]" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-[#FEFBF3] mb-2">Real Talk</h3>
                <p className="text-[#EADEE7]/60 text-sm">WRITE to be understood, Comment to understand</p>
              </div>
            </BentoCard>

            {/* Stat Card */}
            <BentoCard className="min-h-[190px] flex flex-col justify-between">
              <div className="w-12 h-12 rounded-xl bg-[#A5B4FC]/20 flex items-center justify-center mb-4">
                <Users size={24} className="text-[#A5B4FC]" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-[#FEFBF3] mb-2">Your Crew</h3>
                <p className="text-[#EADEE7]/60 text-sm">Connect with friends to get their thoughts on your feed </p>
              </div>
            </BentoCard>

            {/* Feature Card */}
            <BentoCard className="min-h-[190px] flex flex-col justify-between">
              <div className="w-12 h-12 rounded-xl bg-[#EADEE7]/20 flex items-center justify-center mb-4">
                <Zap size={24} className="text-[#EADEE7]" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-[#FEFBF3] mb-2">Instant</h3>
                <p className="text-[#EADEE7]/60 text-sm">Share moments as they happen</p>
              </div>
            </BentoCard>

            {/* Feature Card */}
            <BentoCard className="min-h-[190px] flex flex-col justify-between">
              <div className="w-12 h-12 rounded-xl bg-[#C8A2C8]/20 flex items-center justify-center mb-4">
                <Heart size={24} className="text-[#C8A2C8]" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-[#FEFBF3] mb-2">No Drama</h3>
                <p className="text-[#EADEE7]/60 text-sm">Show resonance, only genuine appreciation</p>
              </div>
            </BentoCard>

            {/* Feature Card */}
            <BentoCard className="lg:col-span-2 min-h-[250px]" >
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br  bg-[#C8A2C8]/20 flex items-center justify-center flex-shrink-0">
                  <User size={40} className="text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-3xl font-bold text-[#FEFBF3] mb-3">Your space</h3>
                  <p className="text-[#EADEE7]/70 text-lg">
                  Express yourself freely in your digital sanctuary
                  </p>
                </div>
              </div>
            </BentoCard>

            {/* Wide Feature Card */}
            <BentoCard className="lg:col-span-2 min-h-[250px]" gradient>
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#C8A2C8] to-[#EADEE7] flex items-center justify-center flex-shrink-0">
                  <Sparkles size={40} className="text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-3xl font-bold text-[#FEFBF3] mb-3">Daily Updates</h3>
                  <p className="text-[#EADEE7]/70 text-lg">
                    Share text, images, and thoughts. Like and comment on your friends' posts. Build your digital diary together.
                  </p>
                </div>
              </div>
            </BentoCard>
          </div>

          {/* Footer CTA */}
          <div className="text-center py-16">
            <BentoCard className="max-w-2xl mx-auto" gradient>
              <h2 className="text-4xl font-bold text-[#FEFBF3] mb-4">Ready to connect?</h2>
              <p className="text-[#EADEE7]/70 text-lg mb-8">
                Join your friends and start sharing your story.
              </p>
              <Link href="/login" className="inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-[#A5B4FC] to-[#C8A2C8] rounded-2xl font-bold text-white text-xl shadow-xl hover:shadow-[#A5B4FC]/50 transition-all duration-300 hover:scale-105">
                <Sparkles size={24} />
                Start Now
              </Link>
            </BentoCard>
          </div>

          {/* Footer */}
          <footer className="py-12 border-t border-white/10">
            <div className="max-w-7xl mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
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
                <p className="text-[#EADEE7]/40 text-sm">© 2025 WRITE. Built for genuine connections.</p>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </main>
  );
}
