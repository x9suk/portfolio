"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import TextReveal from "./TextReveal";
import { FiGithub, FiStar, FiGitBranch, FiCode } from "react-icons/fi";

interface GitHubData {
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
}

function AnimatedNumber({ target }: { target: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 1200;
    const step = 16;
    const increment = target / (duration / step);
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

export default function GitHubStats() {
  const [data, setData] = useState<GitHubData | null>(null);

  useEffect(() => {
    fetch("https://api.github.com/users/x9suk")
      .then((res) => res.json())
      .then(setData)
      .catch(() => {});
  }, []);

  return (
    <section id="github" className="section-padding relative">
      <div className="container-custom">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="text-xs font-mono text-red-400/60 tracking-[0.25em] uppercase block mb-3">
              GitHub
            </span>
            <TextReveal
              text="GitHub Stats"
              className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4 text-gradient-white"
              as="h2"
            />
            <p className="text-white/30 max-w-xl mx-auto text-sm sm:text-base">
              My open source activity
            </p>
          </div>
        </ScrollReveal>

        <div className="max-w-4xl mx-auto">
          <div className="grid sm:grid-cols-3 gap-4 mb-8">
            {[
              { icon: FiCode, value: data?.public_repos || 0, label: "Repositories" },
              { icon: FiStar, value: data?.followers || 0, label: "Followers" },
              { icon: FiGitBranch, value: data?.following || 0, label: "Following" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="glass-card rounded-2xl p-6 text-center group"
              >
                <stat.icon className="w-5 h-5 text-red-400/50 mx-auto mb-3" />
                <div className="text-3xl font-bold text-white mb-1">
                  <AnimatedNumber target={stat.value} />
                </div>
                <div className="text-[11px] text-white/30 uppercase tracking-wider">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          <ScrollReveal delay={0.2}>
            <div className="glass-card rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-red-400/20">
                  AP
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Ashish Pramanik</h3>
                  <p className="text-xs text-white/30 font-mono">@x9suk</p>
                </div>
              </div>
              <div className="flex-1" />
              <a
                href="https://github.com/x9suk"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] text-white/40 hover:text-white transition-all duration-300 text-sm"
              >
                <FiGithub size={16} />
                Follow on GitHub
              </a>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div className="mt-4 glass-card rounded-2xl overflow-hidden">
              <img
                src={`https://github-readme-stats.vercel.app/api?username=x9suk&show_icons=true&theme=dark&bg_color=050510&hide_border=true&title_color=ff2d55&text_color=ffffff&icon_color=ff2d55`}
                alt="GitHub Stats"
                className="w-full"
              />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
