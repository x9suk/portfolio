"use client";

import { useEffect, useState } from "react";

interface Orb {
  id: number;
  size: number;
  x: number;
  y: number;
  blur: number;
  opacity: number;
  color: string;
  animationDuration: number;
  animationDelay: number;
}

export default function GlowingOrbs() {
  const [orbs, setOrbs] = useState<Orb[]>([]);

  useEffect(() => {
    const colors = [
      "rgba(255, 26, 26, 0.15)",
      "rgba(255, 51, 102, 0.1)",
      "rgba(255, 102, 51, 0.1)",
      "rgba(204, 0, 0, 0.12)",
    ];

    const generated: Orb[] = Array.from({ length: 6 }, (_, i) => ({
      id: i,
      size: Math.random() * 400 + 200,
      x: Math.random() * 100,
      y: Math.random() * 100,
      blur: Math.random() * 60 + 80,
      opacity: Math.random() * 0.3 + 0.1,
      color: colors[i % colors.length],
      animationDuration: Math.random() * 6 + 8,
      animationDelay: Math.random() * -5,
    }));

    setOrbs(generated);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {orbs.map((orb) => (
        <div
          key={orb.id}
          className="absolute rounded-full"
          style={{
            width: orb.size,
            height: orb.size,
            left: `${orb.x}%`,
            top: `${orb.y}%`,
            background: `radial-gradient(circle at center, ${orb.color}, transparent 70%)`,
            filter: `blur(${orb.blur}px)`,
            opacity: orb.opacity,
            animation: `orb ${orb.animationDuration}s ease-in-out ${orb.animationDelay}s infinite`,
            transform: "translate(-50%, -50%)",
          }}
        />
      ))}
    </div>
  );
}
