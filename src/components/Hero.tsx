"use client";

import { motion } from "framer-motion";
import { FiArrowRight, FiGithub, FiMessageCircle } from "react-icons/fi";
import { FaDiscord } from "react-icons/fa";
import DiscordProfile from "./DiscordProfile";
import Typewriter from "./Typewriter";

export default function Hero() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, filter: "blur(4px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.7, ease: [0.25, 0.25, 0.25, 0.75] as [number, number, number, number] },
    },
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
    >
      <div className="absolute inset-0 grid-bg opacity-40" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[calc(100vh-8rem)]">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left"
          >
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-neon-200/20 bg-neon-200/5 text-neon-200 text-xs sm:text-sm font-medium mb-6"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-200 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-300" />
              </span>
              Available for projects
            </motion.div>

            <motion.div variants={itemVariants} className="mb-4">
              <span className="text-xs sm:text-sm font-mono text-white/40 tracking-widest uppercase">
                Introducing
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-none mb-4"
            >
              <span className="text-gradient">Dusk</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg sm:text-xl md:text-2xl text-white/60 font-light mb-4 h-8"
            >
              <Typewriter
                words={["Full-Stack Developer", "API Architect", "Discord Bot Dev", "UI/UX Designer"]}
                delay={1500}
                typeSpeed={60}
                deleteSpeed={30}
                pauseTime={2000}
              />
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="text-sm sm:text-base text-white/40 max-w-xl mb-10 leading-relaxed"
            >
              Building modern web apps, REST APIs, and Discord bots with
              clean code and premium design. Turning complex ideas into
              seamless digital experiences.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center gap-4 mb-12"
            >
              <button
                onClick={() => scrollTo("projects")}
                className="group relative px-8 py-3.5 bg-neon-400 hover:bg-neon-300 text-white font-semibold rounded-xl transition-all duration-300 neon-glow-hover btn-shine overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  View Projects
                  <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                </span>
              </button>

              <button
                onClick={() => scrollTo("contact")}
                className="group px-8 py-3.5 border border-white/10 hover:border-neon-200/30 text-white/80 hover:text-white font-semibold rounded-xl transition-all duration-300 glass-hover"
              >
                <span className="flex items-center gap-2">
                  Contact Me
                  <FiMessageCircle className="group-hover:scale-110 transition-transform" />
                </span>
              </button>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex items-center gap-4"
            >
              <a
href="https://github.com/grim-echo"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/10 text-white/60 hover:text-white transition-all duration-300 text-sm"
            >
              <FiGithub size={18} />
              <span>GitHub</span>
              </a>
              <a
                href="https://discord.com/users/742415554840887337"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/10 text-white/60 hover:text-white transition-all duration-300 text-sm"
              >
                <FaDiscord size={18} />
                <span>Discord</span>
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="lg:col-span-5 flex flex-col gap-6 justify-center mt-8 lg:mt-0"
          >
            <DiscordProfile />

            <div className="glass rounded-2xl p-5 group hover:border-neon-200/20 transition-all duration-500">
              <h4 className="text-xs font-mono text-neon-200 tracking-widest uppercase mb-3">
                About Dusk
              </h4>
              <p className="text-sm text-white/50 leading-relaxed">
                Hey, I&apos;m Dusk — a full-stack developer who loves building
                polished web apps, scalable APIs, and feature-rich Discord
                bots. I turn ideas into clean, working code.
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                {["Web Dev", "API Dev", "Discord Bots", "UI/UX"].map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 text-[10px] font-medium rounded-lg bg-white/5 border border-white/5 text-white/40"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 rounded-full border-2 border-white/10 flex items-start justify-center p-1.5"
        >
          <motion.div className="w-1.5 h-3 rounded-full bg-neon-300/60" />
        </motion.div>
      </motion.div>
    </section>
  );
}
