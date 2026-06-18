"use client";

import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import TextReveal from "./TextReveal";

const technologies = [
  { name: "Next.js 15", category: "Frontend" },
  { name: "React 19", category: "Frontend" },
  { name: "TypeScript", category: "Language" },
  { name: "Tailwind CSS", category: "Styling" },
  { name: "Framer Motion", category: "Animation" },
  { name: "Node.js", category: "Backend" },
  { name: "Express.js", category: "Backend" },
  { name: "Python", category: "Language" },
  { name: "Discord.py", category: "Bot Framework" },
  { name: "MongoDB", category: "Database" },
  { name: "PostgreSQL", category: "Database" },
  { name: "Redis", category: "Caching" },
  { name: "Docker", category: "DevOps" },
  { name: "AWS", category: "Cloud" },
  { name: "Git", category: "Tools" },
  { name: "Prisma", category: "ORM" },
];

export default function TechStack() {
  return (
    <section className="section-padding relative">
      <div className="container-custom">
        <ScrollReveal>
          <div className="text-center mb-12">
            <span className="text-xs font-mono text-red-400/60 tracking-[0.25em] uppercase block mb-3">
              Tech Stack
            </span>
            <TextReveal
              text="Technologies I Use"
              className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4 text-gradient-white"
              as="h2"
            />
          </div>
        </ScrollReveal>

        <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
          {technologies.map((tech, i) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04, duration: 0.4 }}
              whileHover={{ scale: 1.08, y: -4 }}
              className="px-5 py-3 rounded-2xl border border-white/[0.04] bg-white/[0.02] hover:border-red-400/15 hover:bg-red-400/[0.03] transition-all duration-300 cursor-default group"
            >
              <span className="text-sm font-medium text-white/50 group-hover:text-white/80 transition-colors">
                {tech.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
