"use client";

import { useEffect, useState, useRef, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Lenis from "lenis";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import OpenSource from "@/components/OpenSource";
import TechStack from "@/components/TechStack";
import GitHubStats from "@/components/GitHubStats";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import GlowingOrbs from "@/components/GlowingOrbs";
import ParticleBackground from "@/components/ParticleBackground";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";

function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          return 100;
        }
        return p + 2;
      });
    }, 30);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      setPhase(1);
      setTimeout(() => onComplete(), 600);
    }
  }, [progress, onComplete]);

  const messages = ["INITIALIZING", "LOADING ASSETS", "PREPARING", "READY"];

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-[#050510]"
    >
      <div className="absolute inset-0 grid-bg opacity-20" />

      <div className="absolute top-8 left-8 w-16 h-16 border-l border-t border-red-400/10" />
      <div className="absolute top-8 right-8 w-16 h-16 border-r border-t border-red-400/10" />
      <div className="absolute bottom-8 left-8 w-16 h-16 border-l border-b border-red-400/10" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-r border-b border-red-400/10" />

      <div className="relative flex flex-col items-center gap-10">
        <div className="relative">
          <motion.div
            className="absolute -inset-8 rounded-full border border-red-400/5"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute -inset-12 rounded-full border border-red-400/5"
            animate={{ rotate: -360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="w-20 h-20 rounded-full flex items-center justify-center"
            style={{
              background: "radial-gradient(circle, rgba(255,45,85,0.15), transparent)",
              boxShadow: "0 0 60px rgba(255,45,85,0.1)",
            }}
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <span className="text-3xl font-bold text-gradient">A</span>
          </motion.div>
        </div>

        <div className="w-64 flex flex-col items-center gap-4">
          <div className="w-full h-[2px] bg-white/5 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{
                width: `${progress}%`,
                background: "linear-gradient(90deg, #ff2d55, #ff6b8a)",
                boxShadow: "0 0 20px rgba(255,45,85,0.5)",
              }}
            />
          </div>
          <div className="flex justify-between w-full">
            <span className="text-[10px] font-mono text-white/20 tracking-[0.2em]">
              {messages[Math.min(Math.floor(progress / 25), 3)]}
            </span>
            <span className="text-[10px] font-mono text-red-400/40">
              {progress}%
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}

export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && (
          <LoadingScreen key="loader" onComplete={() => setLoading(false)} />
        )}
      </AnimatePresence>

      <SmoothScrollProvider>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: loading ? 0 : 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          <ScrollProgress />
          <GlowingOrbs />
          <ParticleBackground />
          <CustomCursor />
          <Navbar />
          <main className="relative z-10">
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Experience />
            <OpenSource />
            <TechStack />
            <GitHubStats />
            <Testimonials />
            <Contact />
          </main>
          <Footer />
        </motion.div>
      </SmoothScrollProvider>
    </>
  );
}
