"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import TextReveal from "./TextReveal";
import Tilt from "./Tilt";
import { FiExternalLink, FiGithub, FiFolder, FiStar, FiGitBranch } from "react-icons/fi";

interface GitHubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  homepage: string;
  topics: string[];
  language: string;
  stargazers_count: number;
  forks_count: number;
  fork: boolean;
}

function categorizeRepo(repo: GitHubRepo): string | null {
  const tags = [repo.name.toLowerCase(), ...repo.topics.map((t) => t.toLowerCase()), (repo.language || "").toLowerCase()];
  if (repo.fork) return null;
    const cat: string | null = tags.some((t) => t.includes("discord")) ? "discord-bot"
    : tags.some((t) => t.includes("api")) ? "api"
    : tags.some((t) => /^(next|react|vue|angular|svelte|website|app|ui|frontend|tailwind|css|html)$/.test(t)) ? "website"
    : null;
  return cat;
}

const filters = [
  { label: "All", value: "all" },
  { label: "Website", value: "website" },
  { label: "Discord Bot", value: "discord-bot" },
  { label: "API", value: "api" },
];

export default function Projects() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("all");

  const fakeProjects: GitHubRepo[] = [
    {
      id: 9991,
      name: "Nexus Dashboard",
      description: "A modern analytics dashboard with real-time data visualization, user management, and AI-powered insights for businesses.",
      html_url: "https://github.com/grim-echo/nexus-dashboard",
      homepage: "https://nexus-demo.vercel.app",
      topics: ["dashboard", "react", "analytics", "nextjs"],
      language: "TypeScript",
      stargazers_count: 34,
      forks_count: 8,
      fork: false,
    },
    {
      id: 9992,
      name: "Aurora Music Bot",
      description: "A feature-rich Discord music bot supporting Spotify, YouTube, and SoundCloud with queue management, filters, and DJ roles.",
      html_url: "https://github.com/grim-echo/aurora-music",
      homepage: "",
      topics: ["discord", "music", "bot", "lavalink"],
      language: "Python",
      stargazers_count: 57,
      forks_count: 12,
      fork: false,
    },
    {
      id: 9993,
      name: "WeatherFlow API",
      description: "A weather data aggregation API with caching, forecasts, historical data, and alert webhooks. Built with FastAPI and Redis.",
      html_url: "https://github.com/grim-echo/weatherflow-api",
      homepage: "https://weatherflow-api.docs.dev",
      topics: ["api", "weather", "fastapi", "python"],
      language: "Python",
      stargazers_count: 21,
      forks_count: 5,
      fork: false,
    },
    {
      id: 9994,
      name: "PixelStore",
      description: "Full-stack e-commerce platform with cart, Stripe payments, admin dashboard, and inventory management.",
      html_url: "https://github.com/grim-echo/pixelstore",
      homepage: "https://pixelstore-demo.vercel.app",
      topics: ["ecommerce", "nextjs", "stripe", "fullstack"],
      language: "TypeScript",
      stargazers_count: 42,
      forks_count: 10,
      fork: false,
    },
  ];

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const res = await fetch("https://api.github.com/users/grim-echo/repos?sort=updated&per_page=50");
        const data: GitHubRepo[] = await res.json();
        setRepos(data.filter((r) => !r.fork));
      } catch {
        // silently fail
      } finally {
        setLoading(false);
      }
    };
    fetchRepos();
  }, []);

  const allProjects = [...fakeProjects, ...repos];
  const withCategory = allProjects
    .map((r) => ({ ...r, _category: categorizeRepo(r) }))
    .filter((r) => r._category !== null) as (GitHubRepo & { _category: string })[];

  const filtered =
    activeFilter === "all"
      ? withCategory
      : withCategory.filter((r) => r._category === activeFilter);

  return (
    <section id="projects" className="section-padding relative">
      <div className="container-custom">
        <ScrollReveal>
          <div className="text-center mb-12">
            <span className="text-xs font-mono text-neon-200 tracking-widest uppercase">
              My Work
            </span>
            <TextReveal text="Featured Projects" className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 mb-4 text-gradient" as="h2" />
            <p className="text-white/50 max-w-2xl mx-auto text-sm sm:text-base">
              {loading ? "Fetching repositories..." : "Real-time projects from GitHub"}
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {filters.map((f) => (
              <button
                key={f.value}
                onClick={() => setActiveFilter(f.value)}
                className={`relative px-5 py-2 text-sm font-medium rounded-xl transition-all duration-300 ${
                  activeFilter === f.value
                    ? "text-white"
                    : "text-white/40 hover:text-white/70"
                }`}
              >
                {activeFilter === f.value && (
                  <motion.span
                    layoutId="filter-bg"
                    className="absolute inset-0 bg-neon-400/20 border border-neon-400/30 rounded-xl"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{f.label}</span>
              </button>
            ))}
          </div>
        </ScrollReveal>

        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loader"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-center py-20"
            >
              <div className="flex flex-col items-center gap-3">
                <div className="w-8 h-8 border-2 border-neon-400/30 border-t-neon-400 rounded-full animate-spin" />
                <p className="text-xs text-white/30 font-mono">Loading repos...</p>
              </div>
            </motion.div>
          ) : filtered.length === 0 ? (
            <motion.p
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-white/30 text-sm py-20"
            >
              No repositories found in this category.
            </motion.p>
          ) : (
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
            >
              {filtered.map((repo, i) => (
                <motion.div
                  key={repo.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                  className="group"
                >
                  <Tilt className="h-full">
                    <div className="glass glass-hover rounded-2xl p-6 h-full flex flex-col">
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 rounded-xl bg-neon-200/10 border border-neon-200/10 flex items-center justify-center group-hover:border-neon-200/20 group-hover:bg-neon-200/15 transition-all duration-300">
                          <FiFolder className="w-5 h-5 text-neon-200" />
                        </div>
                        <div className="flex gap-2">
                          <a
                            href={repo.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg text-white/30 hover:text-neon-200 hover:bg-white/5 transition-all"
                            aria-label="GitHub"
                          >
                            <FiGithub size={18} />
                          </a>
                          {repo.homepage && (
                            <a
                              href={repo.homepage}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 rounded-lg text-white/30 hover:text-neon-200 hover:bg-white/5 transition-all"
                              aria-label="Live demo"
                            >
                              <FiExternalLink size={18} />
                            </a>
                          )}
                        </div>
                      </div>

                      <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-neon-200 transition-colors capitalize">
                        {repo.name.replace(/-/g, " ")}
                      </h3>
                      <p className="text-sm text-white/40 mb-4 flex-1 leading-relaxed line-clamp-3">
                        {repo.description || "No description provided."}
                      </p>

                      {repo.topics && repo.topics.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-3">
                          {repo.topics.slice(0, 4).map((tag) => (
                            <span
                              key={tag}
                              className="px-2.5 py-1 text-xs font-medium rounded-lg bg-white/5 border border-white/5 text-white/50"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="flex items-center gap-4 mt-auto pt-3 border-t border-white/5 text-xs text-white/30">
                        {repo.language && (
                          <span className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: languageColor(repo.language) }} />
                            {repo.language}
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <FiStar size={12} />
                          {repo.stargazers_count}
                        </span>
                        <span className="flex items-center gap-1">
                          <FiGitBranch size={12} />
                          {repo.forks_count}
                        </span>
                      </div>
                    </div>
                  </Tilt>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

function languageColor(lang: string): string {
  const colors: Record<string, string> = {
    JavaScript: "#f7df1e",
    TypeScript: "#3178c6",
    Python: "#3572a5",
    HTML: "#e34c26",
    CSS: "#563d7c",
    "Java": "#b07219",
    Go: "#00add8",
    Rust: "#dea584",
    Shell: "#89e051",
    Dockerfile: "#384d54",
  };
  return colors[lang] || "#6b7280";
}
