"use client";

import { motion } from "framer-motion";

export default function GlowingOrbs() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(255,45,85,0.08), transparent 70%)",
          top: "10%",
          right: "-10%",
          filter: "blur(80px)",
        }}
        animate={{
          x: [0, 50, -30, 0],
          y: [0, -80, 40, 0],
          scale: [1, 1.1, 0.9, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(255,45,85,0.05), transparent 70%)",
          bottom: "20%",
          left: "-5%",
          filter: "blur(60px)",
        }}
        animate={{
          x: [0, -40, 30, 0],
          y: [0, 60, -50, 0],
          scale: [1, 0.9, 1.15, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-[300px] h-[300px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(139,92,246,0.04), transparent 70%)",
          top: "50%",
          left: "40%",
          filter: "blur(50px)",
        }}
        animate={{
          x: [0, 30, -20, 0],
          y: [0, -40, 30, 0],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
