"use client";

import { useRef, ReactNode, useState, useEffect } from "react";

interface TiltProps {
  children: ReactNode;
  className?: string;
  intensity?: number;
}

export default function Tilt({
  children,
  className = "",
  intensity = 10,
}: TiltProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("perspective(1000px) rotateX(0deg) rotateY(0deg)");
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!isHovered) return;
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setTransform(
        `perspective(1000px) rotateX(${-y * intensity}deg) rotateY(${x * intensity}deg) scale3d(1.02, 1.02, 1.02)`
      );
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      setTransform("perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");
    };

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isHovered, intensity]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transform,
        transition: isHovered
          ? "transform 0.1s ease-out"
          : "transform 0.5s ease-out",
        transformStyle: "preserve-3d",
      }}
      onMouseEnter={() => setIsHovered(true)}
    >
      {children}
    </div>
  );
}
