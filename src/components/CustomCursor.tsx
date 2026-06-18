"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const trailsRef = useRef<HTMLDivElement[]>([]);
  const mousePos = useRef({ x: 0, y: 0 });
  const animFrame = useRef<number>(0);

  useEffect(() => {
    const trails: { x: number; y: number }[] = Array.from({ length: 5 }, () => ({
      x: 0,
      y: 0,
    }));

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    const animate = () => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${mousePos.current.x - 16}px, ${mousePos.current.y - 16}px)`;
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mousePos.current.x - 4}px, ${mousePos.current.y - 4}px)`;
      }

      trails.forEach((trail, i) => {
        const prev = i === 0 ? mousePos.current : trails[i - 1];
        trail.x += (prev.x - trail.x) * 0.35;
        trail.y += (prev.y - trail.y) * 0.35;
        const el = trailsRef.current[i];
        if (el) {
          el.style.transform = `translate(${trail.x - 3}px, ${trail.y - 3}px)`;
          el.style.opacity = `${0.3 - i * 0.06}`;
        }
      });

      animFrame.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);
    animFrame.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animFrame.current);
    };
  }, [isVisible]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] hidden md:block">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          ref={(el) => {
            if (el) trailsRef.current[i] = el;
          }}
          className="absolute rounded-full bg-red-400/30"
          style={{
            width: 6 - i,
            height: 6 - i,
            opacity: 0,
            transition: "opacity 0.3s",
          }}
        />
      ))}

      <div
        ref={cursorRef}
        className="absolute top-0 left-0 w-8 h-8 rounded-full border transition-all duration-200"
        style={{
          borderColor: isHovering
            ? "rgba(255, 45, 85, 0.6)"
            : "rgba(255, 255, 255, 0.15)",
          background: isHovering
            ? "rgba(255, 45, 85, 0.05)"
            : "transparent",
          opacity: isVisible ? 1 : 0,
          transform: `scale(${isHovering ? 1.5 : 1})`,
        }}
      />

      <div
        ref={dotRef}
        className="absolute top-0 left-0 w-2 h-2 rounded-full bg-red-400"
        style={{
          boxShadow: "0 0 10px rgba(255, 45, 85, 0.6)",
          opacity: isVisible ? 1 : 0,
        }}
      />
    </div>
  );
}

export function CursorProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
