"use client";

import { motion } from "framer-motion";
import { FiArrowRight, FiGithub, FiMessageCircle } from "react-icons/fi";
import { FaDiscord } from "react-icons/fa";
import Typewriter from "./Typewriter";

export default function Hero() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, filter: "blur(6px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: [0.25, 0.25, 0.25, 0.75] as [number, number, number, number] },
    },
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 grid-bg opacity-30" />

      {/* Animated gradient mesh */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(255,45,85,0.06), transparent 70%)",
            filter: "blur(60px)",
          }}
          animate={{ x: [0, 100, -50, 0], y: [0, -80, 60, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(139,92,246,0.04), transparent 70%)",
            filter: "blur(50px)",
          }}
          animate={{ x: [0, -80, 40, 0], y: [0, 60, -40, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col items-center text-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center"
          >
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-red-400/10 bg-red-400/5 text-red-400/80 text-xs font-medium mb-8 backdrop-blur-sm"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-400" />
              </span>
              Available for collaborations
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-[0.9] mb-6"
            >
              <span className="text-gradient-white block">Ashish</span>
              <span className="text-gradient block mt-2">Pramanik</span>
            </motion.h1>

            <motion.div
              variants={itemVariants}
              className="text-lg sm:text-xl md:text-2xl text-white/50 font-light mb-6 h-8"
            >
              <Typewriter
                words={[
                  "Discord Bot Developer",
                  "Backend Architect",
                  "Open Source Creator",
                  "Full-Stack Developer",
                ]}
                delay={1200}
                typeSpeed={60}
                deleteSpeed={30}
                pauseTime={2000}
              />
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-sm sm:text-base text-white/30 max-w-lg mb-12 leading-relaxed"
            >
              Crafting premium Discord bots, scalable APIs, and modern web
              experiences. Turning complex ideas into clean, performant code.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center gap-4 mb-16"
            >
              <button
                onClick={() => scrollTo("projects")}
                className="group relative px-8 py-3.5 bg-red-400 hover:bg-red-500 text-white font-semibold rounded-2xl transition-all duration-300 btn-shine overflow-hidden"
                style={{
                  boxShadow: "0 0 30px rgba(255,45,85,0.3), 0 0 60px rgba(255,45,85,0.1)",
                }}
              >
                <span className="relative z-10 flex items-center gap-2 text-sm">
                  View Projects
                  <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                </span>
              </button>

              <button
                onClick={() => scrollTo("contact")}
                className="group px-8 py-3.5 border border-white/10 hover:border-red-400/20 text-white/70 hover:text-white font-semibold rounded-2xl transition-all duration-300 backdrop-blur-sm"
              >
                <span className="flex items-center gap-2 text-sm">
                  Contact Me
                  <FiMessageCircle className="group-hover:scale-110 transition-transform" />
                </span>
              </button>

              <a
                href="https://github.com/x9suk"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3.5 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] text-white/50 hover:text-white transition-all duration-300 text-sm"
              >
                <FiGithub size={16} />
                GitHub
              </a>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex items-center gap-6 text-white/20 text-xs font-mono tracking-wider"
            >
              <span>DISCORD BOT DEV</span>
              <span className="w-1 h-1 rounded-full bg-red-400/40" />
              <span>FULL-STACK</span>
              <span className="w-1 h-1 rounded-full bg-red-400/40" />
              <span>OPEN SOURCE</span>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 rounded-full border border-white/10 flex items-start justify-center p-1.5"
        >
          <motion.div
            className="w-1 h-2 rounded-full bg-red-400/60"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
