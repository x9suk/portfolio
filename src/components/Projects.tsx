"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import TextReveal from "./TextReveal";
import Tilt from "./Tilt";
import {
  FiExternalLink, FiGithub, FiFolder, FiStar, FiGitBranch,
} from "react-icons/fi";

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
  if (repo.fork) return null;
  const tags = [
    repo.name.toLowerCase(),
    ...repo.topics.map((t) => t.toLowerCase()),
    (repo.language || "").toLowerCase(),
  ];
  if (tags.some((t) => t.includes("discord"))) return "discord-bot";
  if (tags.some((t) => t.includes("api"))) return "api";
  if (tags.some((t) => /^(next|react|vue|website|app|ui|frontend|tailwind|dashboard)$/.test(t)))
    return "website";
  return null;
}

const filters = [
  { label: "All", value: "all" },
  { label: "Discord Bot", value: "discord-bot" },
  { label: "Website", value: "website" },
  { label: "API", value: "api" },
];

const featuredProjects: GitHubRepo[] = [
  {
    id: 9991,
    name: "Zynox Bot",
    description: "A powerful Discord bot with 700+ commands, moderation, economy, music, and custom systems. Built for communities that demand reliability.",
    html_url: "https://github.com/x9suk/zynox-bot",
    homepage: "",
    topics: ["discord", "bot", "commands", "moderation"],
    language: "Python",
    stargazers_count: 45,
    forks_count: 12,
    fork: false,
  },
  {
    id: 9992,
    name: "Evelyn Dashboard",
    description: "Modern analytics dashboard with real-time data visualization, user management, and AI-powered insights for Discord servers.",
    html_url: "https://github.com/x9suk/evelyn-dashboard",
    homepage: "",
    topics: ["dashboard", "react", "analytics", "nextjs"],
    language: "TypeScript",
    stargazers_count: 32,
    forks_count: 8,
    fork: false,
  },
  {
    id: 9993,
    name: "OpenWorld India",
    description: "A platform connecting Indian developers, featuring project showcases, collaboration tools, and community-driven open source contributions.",
    html_url: "https://github.com/x9suk/openworld-india",
    homepage: "",
    topics: ["community", "india", "open-source", "nextjs"],
    language: "TypeScript",
    stargazers_count: 28,
    forks_count: 6,
    fork: false,
  },
  {
    id: 9994,
    name: "Custom API Hub",
    description: "A suite of custom APIs for Discord, weather data, and utility services. Built with Express, Redis caching, and Docker deployment.",
    html_url: "https://github.com/x9suk/custom-api-hub",
    homepage: "",
    topics: ["api", "express", "redis", "docker"],
    language: "JavaScript",
    stargazers_count: 19,
    forks_count: 4,
    fork: false,
  },
];

export default function Projects() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("all");

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const res = await fetch(
          "https://api.github.com/users/x9suk/repos?sort=updated&per_page=50"
        );
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

  const allProjects = [...featuredProjects, ...repos];
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
            <span className="text-xs font-mono text-red-400/60 tracking-[0.25em] uppercase block mb-3">
              My Work
            </span>
            <TextReveal
              text="Featured Projects"
              className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4 text-gradient-white"
              as="h2"
            />
            <p className="text-white/30 max-w-xl mx-auto text-sm sm:text-base">
              {loading ? "Fetching repositories..." : "Projects from GitHub & personal work"}
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {filters.map((f) => (
              <button
                key={f.value}
                onClick={() => setActiveFilter(f.value)}
                className={`relative px-5 py-2 text-xs font-medium rounded-xl transition-all duration-300 ${
                  activeFilter === f.value ? "text-white" : "text-white/30 hover:text-white/60"
                }`}
              >
                {activeFilter === f.value && (
                  <motion.span
                    layoutId="project-filter"
                    className="absolute inset-0 bg-red-400/10 border border-red-400/20 rounded-xl"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{f.label}</span>
              </button>
            ))}
          </div>
        </ScrollReveal>

        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div key="loader" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-center py-20">
              <div className="flex flex-col items-center gap-3">
                <div className="w-6 h-6 border-2 border-red-400/20 border-t-red-400 rounded-full animate-spin" />
                <p className="text-xs text-white/20 font-mono">Loading...</p>
              </div>
            </motion.div>
          ) : filtered.length === 0 ? (
            <motion.p key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center text-white/20 text-sm py-20">
              No projects found.
            </motion.p>
          ) : (
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid sm:grid-cols-2 gap-4"
            >
              {filtered.map((repo, i) => (
                <motion.div
                  key={repo.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="group"
                >
                  <Tilt intensity={5}>
                    <div className="glass-card rounded-2xl p-6 h-full flex flex-col">
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-10 h-10 rounded-xl bg-red-400/5 border border-red-400/10 flex items-center justify-center group-hover:border-red-400/20 transition-all">
                          <FiFolder className="w-4 h-4 text-red-400/60" />
                        </div>
                        <div className="flex gap-1">
                          <a
                            href={repo.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg text-white/20 hover:text-red-400 hover:bg-white/[0.03] transition-all"
                          >
                            <FiGithub size={16} />
                          </a>
                          {repo.homepage && (
                            <a
                              href={repo.homepage}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 rounded-lg text-white/20 hover:text-red-400 hover:bg-white/[0.03] transition-all"
                            >
                              <FiExternalLink size={16} />
                            </a>
                          )}
                        </div>
                      </div>

                      <h3 className="text-base font-semibold text-white/90 mb-2 group-hover:text-red-400 transition-colors">
                        {repo.name.replace(/-/g, " ")}
                      </h3>
                      <p className="text-xs text-white/30 mb-4 flex-1 leading-relaxed line-clamp-3">
                        {repo.description || "No description provided."}
                      </p>

                      {repo.topics && repo.topics.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-3">
                          {repo.topics.slice(0, 4).map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-0.5 text-[10px] font-medium rounded-md bg-white/[0.03] border border-white/[0.04] text-white/35"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="flex items-center gap-4 mt-auto pt-3 border-t border-white/[0.03] text-[11px] text-white/20">
                        {repo.language && (
                          <span className="flex items-center gap-1.5">
                            <span
                              className="w-1.5 h-1.5 rounded-full"
                              style={{ backgroundColor: languageColor(repo.language) }}
                            />
                            {repo.language}
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <FiStar size={10} /> {repo.stargazers_count}
                        </span>
                        <span className="flex items-center gap-1">
                          <FiGitBranch size={10} /> {repo.forks_count}
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
    Go: "#00add8",
    Rust: "#dea584",
    Shell: "#89e051",
    Dockerfile: "#384d54",
  };
  return colors[lang] || "#6b7280";
}
