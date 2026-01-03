"use client";

import { useEffect, useState } from "react";

export default function TypewriterLoading() {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 400);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#050505] via-[#0a0a0a] to-[#050505] flex items-center justify-center">
      {/* Subtle background particles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-gradient-radial from-[#A5B4FC]/8 to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-gradient-radial from-[#C8A2C8]/8 to-transparent rounded-full blur-3xl animate-pulse animation-delay-1000" />
      </div>

      <div className="relative text-center">
        {/* Typewriter text */}
        <div className="flex items-center justify-center gap-1">
          <span className="text-2xl md:text-3xl font-light text-[#EADEE7]/80 tracking-wide typewriter">
            writing
          </span>
          <span className="text-2xl md:text-3xl font-light text-[#A5B4FC] w-12 text-left">
            {dots}
          </span>
        </div>

        {/* Subtle underline animation */}
        <div className="mt-4 h-px w-32 mx-auto bg-gradient-to-r from-transparent via-[#A5B4FC]/40 to-transparent animate-pulse" />
      </div>

      <style jsx>{`
        @keyframes typewriter {
          from {
            width: 0;
          }
          to {
            width: 100%;
          }
        }

        .typewriter {
          overflow: hidden;
          white-space: nowrap;
          animation: typewriter 1s steps(7) 1;
        }
      `}</style>
    </div>
  );
}
