"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import TextReveal from "./TextReveal";
import {
  FaReact, FaNodeJs, FaPython, FaDocker, FaGitAlt, FaAws,
} from "react-icons/fa";
import {
  SiTypescript, SiMongodb, SiPostgresql, SiRedis, SiTailwindcss,
  SiNextdotjs, SiJavascript, SiPrisma, SiDiscord, SiExpress,
} from "react-icons/si";

interface Tech {
  name: string;
  icon: React.ElementType;
  orbit: number;
  speed: number;
  size: number;
  offset: number;
  color: string;
}

const techs: Tech[] = [
  { name: "Discord.py", icon: SiDiscord, orbit: 130, speed: 14, size: 34, offset: 0, color: "#5865F2" },
  { name: "Node.js", icon: FaNodeJs, orbit: 130, speed: 14, size: 32, offset: 180, color: "#339933" },
  { name: "Next.js", icon: SiNextdotjs, orbit: 180, speed: 18, size: 30, offset: 45, color: "#ffffff" },
  { name: "TypeScript", icon: SiTypescript, orbit: 180, speed: 18, size: 28, offset: 225, color: "#3178C6" },
  { name: "Python", icon: FaPython, orbit: 230, speed: 22, size: 30, offset: 90, color: "#3776AB" },
  { name: "Redis", icon: SiRedis, orbit: 230, speed: 22, size: 26, offset: 270, color: "#DC382D" },
  { name: "MongoDB", icon: SiMongodb, orbit: 280, speed: 28, size: 28, offset: 30, color: "#47A248" },
  { name: "Docker", icon: FaDocker, orbit: 280, speed: 28, size: 30, offset: 210, color: "#2496ED" },
  { name: "React", icon: FaReact, orbit: 330, speed: 32, size: 30, offset: 135, color: "#61DAFB" },
  { name: "Express", icon: SiExpress, orbit: 330, speed: 32, size: 26, offset: 315, color: "#ffffff" },
  { name: "AWS", icon: FaAws, orbit: 100, speed: 12, size: 28, offset: 60, color: "#FF9900" },
  { name: "Git", icon: FaGitAlt, orbit: 100, speed: 12, size: 26, offset: 240, color: "#F05032" },
  { name: "Tailwind", icon: SiTailwindcss, orbit: 370, speed: 36, size: 26, offset: 160, color: "#06B6D4" },
  { name: "PostgreSQL", icon: SiPostgresql, orbit: 370, speed: 36, size: 26, offset: 340, color: "#4169E1" },
  { name: "Prisma", icon: SiPrisma, orbit: 370, speed: 36, size: 24, offset: 70, color: "#2D3748" },
  { name: "JavaScript", icon: SiJavascript, orbit: 60, speed: 10, size: 26, offset: 120, color: "#F7DF1E" },
];

function TechOrbit({ tech }: { tech: Tech }) {
  const [angle, setAngle] = useState(tech.offset);

  useEffect(() => {
    const interval = setInterval(() => {
      setAngle((prev) => (prev + 0.25) % 360);
    }, tech.speed * 6);
    return () => clearInterval(interval);
  }, [tech.speed]);

  const rad = (angle * Math.PI) / 180;
  const x = Math.cos(rad) * tech.orbit;
  const y = Math.sin(rad) * tech.orbit;

  return (
    <motion.div
      className="absolute left-1/2 top-1/2 group"
      style={{
        transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
      }}
      whileHover={{ scale: 1.4 }}
    >
      <div
        className="rounded-full flex items-center justify-center cursor-pointer transition-all duration-300"
        style={{
          width: tech.size,
          height: tech.size,
          background: `${tech.color}10`,
          border: `1px solid ${tech.color}25`,
          boxShadow: `0 0 15px ${tech.color}08`,
        }}
      >
        <tech.icon style={{ color: tech.color, fontSize: tech.size * 0.5 }} />
      </div>
      <span className="absolute left-1/2 -translate-x-1/2 top-full mt-1.5 text-[9px] font-mono text-white/30 whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
        {tech.name}
      </span>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="section-padding relative">
      <div className="container-custom">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="text-xs font-mono text-red-400/60 tracking-[0.25em] uppercase block mb-3">
              Skills & Expertise
            </span>
            <TextReveal
              text="Tech Stack"
              className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4 text-gradient-white"
              as="h2"
            />
            <p className="text-white/30 max-w-xl mx-auto text-sm sm:text-base">
              Technologies I work with daily
            </p>
          </div>
        </ScrollReveal>

        <div className="flex justify-center">
          <div className="relative w-[700px] h-[700px] max-w-full max-h-[90vw]">
            {[60, 100, 130, 180, 230, 280, 330, 370].map((r, i) => (
              <div
                key={i}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border pointer-events-none"
                style={{
                  width: r * 2,
                  height: r * 2,
                  borderColor: `rgba(255, 45, 85, ${0.02 + i * 0.005})`,
                }}
              />
            ))}

            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="flex flex-col items-center justify-center w-20 h-20 rounded-full"
                style={{
                  background: "radial-gradient(circle, rgba(255,45,85,0.15), transparent)",
                  boxShadow: "0 0 50px rgba(255,45,85,0.1)",
                  border: "1px solid rgba(255,45,85,0.1)",
                }}
              >
                <span className="text-xl font-bold text-white">AP</span>
                <span className="text-[8px] font-mono text-red-400/40 tracking-wider">dev</span>
              </motion.div>
            </div>

            {techs.map((tech) => (
              <TechOrbit key={tech.name} tech={tech} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
