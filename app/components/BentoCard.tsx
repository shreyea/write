"use client";

import { motion } from 'framer-motion';
import { useRef, useState } from 'react';

export default function BentoCard({
  children,
  className = '',
  gradient = false,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  gradient?: boolean;
  [key: string]: any;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      ref={cardRef}
      className={`relative overflow-hidden backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6 transition-all duration-300 ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      {...props}
    >
      {/* Gradient border effect on hover */}
      {isHovered && (
        <motion.div
          className="pointer-events-none absolute inset-0 opacity-0"
          animate={{
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
          style={{
            background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(165, 180, 252, 0.15), transparent 40%)`,
          }}
        />
      )}
      
      {/* Gradient mesh background */}
      {gradient && (
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-[#A5B4FC] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
          <div className="absolute top-0 -right-4 w-72 h-72 bg-[#C8A2C8] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-[#EADEE7] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
        </div>
      )}
      
      {/* Border beam effect */}
      <div
        className="pointer-events-none absolute inset-0 rounded-3xl transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `
            radial-gradient(200px circle at ${mousePosition.x}px ${mousePosition.y}px,
              rgba(165, 180, 252, 0.4),
              transparent 100%)
          `,
          maskImage: 'linear-gradient(black, black) content-box, linear-gradient(black, black)',
          maskClip: 'content-box, border-box',
          maskComposite: 'exclude',
          padding: '1px',
        }}
      />
      
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
