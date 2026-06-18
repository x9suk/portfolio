"use client";

import { motion } from "framer-motion";
import { FiGithub, FiHeart } from "react-icons/fi";
import { FaDiscord } from "react-icons/fa";

const links = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.03]">
      <div className="container-custom py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          <div>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="text-xl font-bold tracking-tight"
            >
              <span className="text-white">A</span>
              <span className="text-red-400">.</span>
            </button>
            <p className="text-xs text-white/25 mt-2 max-w-xs">
              Crafting premium digital experiences with clean code and modern design.
            </p>
          </div>

          <div className="flex justify-center">
            <div className="flex gap-6">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-xs text-white/25 hover:text-white/60 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <a
              href="https://github.com/x9suk"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-xl bg-white/[0.03] border border-white/[0.04] flex items-center justify-center text-white/25 hover:text-white/60 hover:bg-white/[0.05] transition-all"
            >
              <FiGithub size={14} />
            </a>
            <a
              href="https://discord.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-xl bg-white/[0.03] border border-white/[0.04] flex items-center justify-center text-white/25 hover:text-white/60 hover:bg-white/[0.05] transition-all"
            >
              <FaDiscord size={14} />
            </a>
          </div>
        </div>

        <div className="neon-line mt-8 mb-6" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[11px] text-white/15 font-mono">
            &copy; {new Date().getFullYear()} Ashish Pramanik. All rights reserved.
          </p>
          <p className="text-[11px] text-white/15 flex items-center gap-1">
            Built with <FiHeart className="text-red-400/40" size={10} /> using Next.js
          </p>
        </div>
      </div>
    </footer>
  );
}
