"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import TextReveal from "./TextReveal";
import { FiCode, FiServer, FiUsers, FiAward } from "react-icons/fi";

const stats = [
  { icon: FiCode, value: 30, label: "Projects", suffix: "+" },
  { icon: FiAward, value: 4, label: "Experience", suffix: "+ Years" },
  { icon: FiUsers, value: 30, label: "Clients", suffix: "+" },
  { icon: FiServer, value: 50, label: "Servers", suffix: "+" },
];

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 1500;
    const step = 16;
    const totalSteps = duration / step;
    const increment = target / totalSteps;
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, step);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <span ref={ref}>
      {count}
      <span className="text-red-400/80 ml-0.5">{suffix}</span>
    </span>
  );
}

export default function About() {
  return (
    <section id="about" className="section-padding relative">
      <div className="container-custom">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="text-xs font-mono text-red-400/60 tracking-[0.25em] uppercase block mb-3">
              About Me
            </span>
            <TextReveal
              text="Behind the Code"
              className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4 text-gradient-white"
              as="h2"
            />
            <p className="text-white/30 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
              A passionate developer crafting premium Discord bots, scalable
              APIs, and modern web experiences with clean code.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="glass-card rounded-2xl p-6 sm:p-8 text-center group"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-red-400/5 border border-red-400/10 mb-4 group-hover:border-red-400/20 transition-all duration-300">
                <stat.icon className="w-5 h-5 text-red-400/70" />
              </div>
              <div className="text-3xl sm:text-4xl font-bold text-white mb-1">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-xs text-white/30 uppercase tracking-wider">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        <ScrollReveal delay={0.15}>
          <div className="glass-card rounded-3xl p-6 sm:p-10">
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">
                  Building the
                  <br />
                  <span className="text-gradient">Future of Web</span>
                </h3>
                <p className="text-white/40 text-sm leading-relaxed mb-6">
                  I specialize in creating high-performance Discord bots and
                  web applications that stand out. From concept to deployment,
                  I focus on delivering exceptional quality with scalable
                  architecture and premium design.
                </p>
                <div className="flex flex-wrap gap-2">
                  {["Discord.py", "Next.js", "TypeScript", "Node.js", "Python", "Redis"].map(
                    (tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1.5 text-[11px] font-medium rounded-lg bg-white/[0.03] border border-white/[0.05] text-white/40"
                      >
                        {tech}
                      </span>
                    )
                  )}
                </div>
              </div>
              <div className="space-y-4">
                {[
                  { label: "Frontend", value: 92 },
                  { label: "Backend", value: 88 },
                  { label: "Discord Bots", value: 95 },
                  { label: "UI/UX Design", value: 85 },
                ].map((skill) => (
                  <div key={skill.label}>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-white/50 text-xs">{skill.label}</span>
                      <span className="text-red-400/60 font-mono text-xs">
                        {skill.value}%
                      </span>
                    </div>
                    <div className="h-1.5 bg-white/[0.03] rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.value}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
                        className="h-full rounded-full"
                        style={{
                          background: "linear-gradient(90deg, #ff2d55, #ff6b8a)",
                          boxShadow: "0 0 12px rgba(255,45,85,0.4)",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
