"use client";

import Antigravity from "./Antigravity";

export default function ParticleBackground({ 
  color = "#9783e7",
  count = 300,
  shape = "sphere" as "capsule" | "sphere" | "box" | "tetrahedron"
}) {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Antigravity
        count={count}
        magnetRadius={5}
        ringRadius={5}
        waveSpeed={1.6}
        waveAmplitude={1}
        particleSize={0.4}
        lerpSpeed={0.13}
        color={color}
        autoAnimate={true}
        particleVariance={1}
        rotationSpeed={0}
        depthFactor={1}
        pulseSpeed={1.5}
        fieldStrength={10}
        particleShape={shape}
      />
    </div>
  );
}
