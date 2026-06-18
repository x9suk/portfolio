"use client";

import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import TextReveal from "./TextReveal";
import { FiGithub, FiStar, FiGitPullRequest, FiGitBranch } from "react-icons/fi";

const contributions = [
  {
    repo: "discord.js/discord.js",
    description: "Contributed to the most popular Discord API library for Node.js",
    prs: 3,
    stars: 25000,
  },
  {
    repo: "vercel/next.js",
    description: "Fixed bugs and improved documentation for the React framework",
    prs: 2,
    stars: 130000,
  },
  {
    repo: "expressjs/express",
    description: "Added middleware improvements and fixed edge cases",
    prs: 1,
    stars: 65000,
  },
  {
    repo: "redis/node-redis",
    description: "Improved connection handling and added new client features",
    prs: 2,
    stars: 18000,
  },
];

const stats = [
  { icon: FiGitPullRequest, value: "15+", label: "PRs Merged" },
  { icon: FiStar, value: "100+", label: "Stars Earned" },
  { icon: FiGitBranch, value: "50+", label: "Repos Contributed" },
];

export default function OpenSource() {
  return (
    <section id="opensource" className="section-padding relative">
      <div className="container-custom">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="text-xs font-mono text-red-400/60 tracking-[0.25em] uppercase block mb-3">
              Open Source
            </span>
            <TextReveal
              text="Contributions"
              className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4 text-gradient-white"
              as="h2"
            />
            <p className="text-white/30 max-w-xl mx-auto text-sm sm:text-base">
              Giving back to the developer community
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="glass-card rounded-2xl p-6 text-center"
            >
              <stat.icon className="w-5 h-5 text-red-400/50 mx-auto mb-3" />
              <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-[11px] text-white/30 uppercase tracking-wider">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="space-y-3">
          {contributions.map((contrib, i) => (
            <ScrollReveal key={i} delay={i * 0.08}>
              <div className="glass-card rounded-xl p-5 flex flex-col sm:flex-row sm:items-center gap-4 group">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-red-400/5 border border-red-400/10 flex items-center justify-center shrink-0">
                    <FiGithub className="w-3.5 h-3.5 text-red-400/50" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-sm font-semibold text-white/80 group-hover:text-red-400 transition-colors truncate">
                      {contrib.repo}
                    </h4>
                    <p className="text-[11px] text-white/25 truncate">{contrib.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-[11px] text-white/25 shrink-0">
                  <span className="flex items-center gap-1">
                    <FiGitPullRequest size={10} /> {contrib.prs} PRs
                  </span>
                  <span className="flex items-center gap-1">
                    <FiStar size={10} /> {(contrib.stars / 1000).toFixed(0)}k
                  </span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
