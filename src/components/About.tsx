"use client";

import { useRef, useState, useEffect } from "react";
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

const AnimatedStat = ({
  icon: Icon,
  value,
  label,
  suffix,
  index,
}: {
  icon: React.ElementType;
  value: number;
  label: string;
  suffix: string;
  index: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="relative group"
    >
      <div className="glass glass-hover rounded-2xl p-6 sm:p-8 text-center tilt-card">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-neon-200/10 border border-neon-200/10 mb-5 group-hover:border-neon-200/20 group-hover:bg-neon-200/15 transition-all duration-300">
          <Icon className="w-6 h-6 text-neon-200" />
        </div>
        <div className="text-3xl sm:text-4xl font-bold text-white mb-1">
          <Counter from={0} to={value} />
          {suffix}
        </div>
        <div className="text-sm text-white/50">{label}</div>
      </div>
    </motion.div>
  );
};

function Counter({ from, to }: { from: number; to: number }) {
  return (
    <motion.span
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      onViewportEnter={() => {
        // handled by framer-motion's animate
      }}
    >
      <motion.span
        initial={{ textShadow: "0 0 0px rgba(255,26,26,0)" }}
        whileInView={{
          textShadow: "0 0 8px rgba(255,26,26,0.4)",
        }}
        viewport={{ once: true }}
      >
        <CountUp from={from} to={to} />
      </motion.span>
    </motion.span>
  );
}

function CountUp({ from, to }: { from: number; to: number }) {
  return (
    <motion.span
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      {to}
    </motion.span>
  );
}

function SkillCount({ target }: { target: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 1000;
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

  return <span ref={ref}>{count}</span>;
}

export default function About() {
  return (
    <section id="about" className="section-padding relative">
      <div className="container-custom">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="text-xs font-mono text-neon-200 tracking-widest uppercase">
              About Me
            </span>
            <TextReveal
              text="Behind the Code"
              className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 mb-4 text-gradient"
              as="h2"
            />
            <p className="text-white/50 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
              I&apos;m a passionate developer who builds modern web applications
              and Discord bots. With a love for clean code and premium design, I
              turn ideas into reality.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16">
          {stats.map((stat, i) => (
            <AnimatedStat key={stat.label} {...stat} index={i} />
          ))}
        </div>

        <ScrollReveal delay={0.2}>
          <div className="glass rounded-3xl p-6 sm:p-10 lg:p-12">
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold mb-4 relative">
                  Building the
                  <br />
                  <span className="galaxy-text inline-block relative">
                    Future of Web
                  </span>
                </h3>
                <p className="text-white/50 text-sm sm:text-base leading-relaxed mb-6">
                  I specialize in creating high-performance web applications and
                  Discord bots that stand out. From concept to deployment, I
                  focus on delivering exceptional quality.
                </p>
                <div className="flex flex-wrap gap-3">
                  {["React", "Next.js", "TypeScript", "Node.js", "Discord.js"].map(
                    (tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1.5 text-xs font-medium rounded-lg bg-white/5 border border-white/5 text-white/60"
                      >
                        {tech}
                      </span>
                    )
                  )}
                </div>
              </div>
              <div className="relative">
                <div className="glass rounded-2xl p-6 space-y-4">
                  {[
                    { label: "Frontend", value: 95 },
                    { label: "Backend", value: 88 },
                    { label: "Discord Bots", value: 92 },
                    { label: "UI/UX Design", value: 85 },
                  ].map((skill) => (
                    <div key={skill.label}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-white/70">{skill.label}</span>
                        <span className="text-neon-200 font-mono">
                          <SkillCount target={skill.value} />%
                        </span>
                      </div>
                      <div className="progress-bar">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.value}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                          className="progress-bar-fill"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
