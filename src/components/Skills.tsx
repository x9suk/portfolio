"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import TextReveal from "./TextReveal";
import {
  FaReact,
  FaNodeJs,
  FaPython,
  FaDocker,
  FaGitAlt,
  FaAws,
} from "react-icons/fa";
import {
  SiTypescript,
  SiMongodb,
  SiPostgresql,
  SiRedis,
  SiTailwindcss,
  SiNextdotjs,
  SiJavascript,
  SiPrisma,
  SiDiscord,
  SiSocketdotio,
} from "react-icons/si";
import { FiTerminal } from "react-icons/fi";

interface Planet {
  name: string;
  icon: React.ElementType;
  orbitRadius: number;
  duration: number;
  size: number;
  offset: number;
  color: string;
}

const planets: Planet[] = [
  { name: "React", icon: FaReact, orbitRadius: 140, duration: 12, size: 36, offset: 0, color: "#61DAFB" },
  { name: "Next.js", icon: SiNextdotjs, orbitRadius: 140, duration: 12, size: 32, offset: 180, color: "#fff" },
  { name: "Node.js", icon: FaNodeJs, orbitRadius: 190, duration: 16, size: 34, offset: 30, color: "#339933" },
  { name: "TypeScript", icon: SiTypescript, orbitRadius: 190, duration: 16, size: 30, offset: 210, color: "#3178C6" },
  { name: "MongoDB", icon: SiMongodb, orbitRadius: 240, duration: 20, size: 32, offset: 60, color: "#47A248" },
  { name: "Python", icon: FaPython, orbitRadius: 240, duration: 20, size: 30, offset: 240, color: "#3776AB" },
  { name: "Docker", icon: FaDocker, orbitRadius: 290, duration: 25, size: 34, offset: 90, color: "#2496ED" },
  { name: "PostgreSQL", icon: SiPostgresql, orbitRadius: 290, duration: 25, size: 28, offset: 270, color: "#4169E1" },
  { name: "Redis", icon: SiRedis, orbitRadius: 330, duration: 30, size: 28, offset: 120, color: "#DC382D" },
  { name: "Tailwind", icon: SiTailwindcss, orbitRadius: 330, duration: 30, size: 28, offset: 300, color: "#06B6D4" },
  { name: "JavaScript", icon: SiJavascript, orbitRadius: 100, duration: 9, size: 30, offset: 90, color: "#F7DF1E" },
  { name: "Express", icon: FiTerminal, orbitRadius: 100, duration: 9, size: 26, offset: 270, color: "#fff" },
  { name: "Prisma", icon: SiPrisma, orbitRadius: 370, duration: 35, size: 28, offset: 150, color: "#2D3748" },
  { name: "AWS", icon: FaAws, orbitRadius: 370, duration: 35, size: 30, offset: 330, color: "#FF9900" },
  { name: "Discord.js", icon: SiDiscord, orbitRadius: 220, duration: 18, size: 32, offset: 150, color: "#5865F2" },
  { name: "Git", icon: FaGitAlt, orbitRadius: 220, duration: 18, size: 30, offset: 330, color: "#F05032" },
];

function PlanetOrbit({ planet, index }: { planet: Planet; index: number }) {
  const Icon = planet.icon;
  const [angle, setAngle] = useState(planet.offset);

  useEffect(() => {
    const interval = setInterval(() => {
      setAngle((prev) => (prev + 0.3) % 360);
    }, planet.duration * 8);
    return () => clearInterval(interval);
  }, [planet.duration]);

  const rad = (angle * Math.PI) / 180;
  const x = Math.cos(rad) * planet.orbitRadius;
  const y = Math.sin(rad) * planet.orbitRadius;

  return (
    <div
      className="absolute left-1/2 top-1/2 planet-item"
      style={{
        transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
      }}
    >
      <motion.div
        whileHover={{ scale: 1.3 }}
        className="rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer planet-icon"
        style={{
          width: planet.size,
          height: planet.size,
          background: `${planet.color}15`,
          border: `1px solid ${planet.color}30`,
          boxShadow: `0 0 12px ${planet.color}10`,
        }}
      >
        <Icon
          style={{ color: planet.color, fontSize: planet.size * 0.55 }}
        />
      </motion.div>
      <span className="absolute left-1/2 -translate-x-1/2 top-full mt-1.5 text-[10px] font-mono text-white/40 whitespace-nowrap pointer-events-none planet-label">
        {planet.name}
      </span>
    </div>
  );
}

export default function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section id="skills" className="section-padding relative" ref={sectionRef}>
      <div className="container-custom">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="text-xs font-mono text-neon-200 tracking-widest uppercase">
              Skills & Expertise
            </span>
            <TextReveal text="Tech Stack" className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 mb-4 text-gradient" as="h2" />
            <p className="text-white/50 max-w-2xl mx-auto text-sm sm:text-base">
              Technologies I work with on a daily basis
            </p>
          </div>
        </ScrollReveal>

        <div className="flex justify-center">
          <div className="relative w-[780px] h-[780px] max-w-full max-h-[90vw]">
            {/* orbit rings */}
            {[100, 140, 190, 220, 240, 290, 330, 370].map((r, i) => (
              <div
                key={i}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border pointer-events-none"
                style={{
                  width: r * 2,
                  height: r * 2,
                  borderColor: `rgba(255, 26, 26, ${0.03 + i * 0.01})`,
                }}
              />
            ))}

            {/* center sun */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="flex flex-col items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-full"
                style={{
                  background: "radial-gradient(circle at center, rgba(255,26,26,0.2), transparent)",
                  boxShadow: "0 0 40px rgba(255,26,26,0.15), 0 0 80px rgba(255,26,26,0.05)",
                  border: "1px solid rgba(255,26,26,0.15)",
                }}
              >
                <span className="text-xl sm:text-2xl font-bold text-white">D</span>
                <span className="text-[10px] font-mono text-neon-200/60">dev</span>
              </motion.div>
            </div>

            {/* planets */}
            {planets.map((planet, i) => (
              <PlanetOrbit key={planet.name} planet={planet} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
