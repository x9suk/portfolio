"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import GlowingOrbs from "@/components/GlowingOrbs";
import ParticleBackground from "@/components/ParticleBackground";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";
import SectionDivider from "@/components/SectionDivider";

function LoadingScreen() {
  const [frame, setFrame] = useState(0);
  const messages = [
    "INITIALIZING SYSTEMS",
    "LOADING MODULES",
    "ESTABLISHING CONNECTION",
    "READY",
  ];

  useEffect(() => {
    const t = setInterval(() => setFrame((p) => (p >= 3 ? 3 : p + 1)), 400);
    return () => clearInterval(t);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-dark-500 overflow-hidden"
    >
      {/* scanning line */}
      <motion.div
        initial={{ top: "0%" }}
        animate={{ top: "100%" }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
        className="absolute left-0 right-0 h-px bg-neon-400/40 shadow-[0_0_8px_rgba(255,26,26,0.3)]"
      />

      {/* corners */}
      <div className="absolute top-8 left-8 w-12 h-12 border-l-2 border-t-2 border-neon-400/20" />
      <div className="absolute top-8 right-8 w-12 h-12 border-r-2 border-t-2 border-neon-400/20" />
      <div className="absolute bottom-8 left-8 w-12 h-12 border-l-2 border-b-2 border-neon-400/20" />
      <div className="absolute bottom-8 right-8 w-12 h-12 border-r-2 border-b-2 border-neon-400/20" />

      <div className="relative flex flex-col items-center gap-8">
        {/* rings */}
        <div className="relative flex items-center justify-center">
          <motion.div
            className="absolute w-32 h-32 border border-neon-400/10 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute w-24 h-24 border border-neon-400/20 rounded-full"
            animate={{ rotate: -360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute w-16 h-16 border border-neon-400/30 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="w-3 h-3 bg-neon-400 rounded-full shadow-[0_0_12px_rgba(255,26,26,0.6)]"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        </div>

        {/* status */}
        <div className="text-center">
          <motion.p
            key={frame}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm font-mono text-neon-300 tracking-[0.25em]"
          >
            {messages[Math.min(frame, messages.length - 1)]}
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
}

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <LoadingScreen key="loader" />}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 0.5 }}
        className="relative min-h-screen"
      >
        <ScrollProgress />
        <GlowingOrbs />
        <ParticleBackground />
        <CustomCursor />
        <Navbar />
        <main className="relative z-10">
          <Hero />
          <SectionDivider />
          <About />
          <SectionDivider />
          <Skills />
          <SectionDivider />
          <Projects />
          <SectionDivider />
          <Experience />
          <SectionDivider />
          <Testimonials />
          <SectionDivider />
          <Contact />
        </main>
        <Footer />
      </motion.div>
    </>
  );
}
