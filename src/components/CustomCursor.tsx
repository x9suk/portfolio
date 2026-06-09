"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [visible, setVisible] = useState(false);

  const cursorX = useSpring(0, { stiffness: 200, damping: 30, mass: 0.5 });
  const cursorY = useSpring(0, { stiffness: 200, damping: 30, mass: 0.5 });
  const dotX = useSpring(0, { stiffness: 400, damping: 40, mass: 0.3 });
  const dotY = useSpring(0, { stiffness: 400, damping: 40, mass: 0.3 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      dotX.set(e.clientX);
      dotY.set(e.clientY);
    };

    const enter = () => setVisible(true);
    const leave = () => setVisible(false);

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseenter", enter);
    document.addEventListener("mouseleave", leave);

    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseenter", enter);
      document.removeEventListener("mouseleave", leave);
    };
  }, [cursorX, cursorY, dotX, dotY]);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          opacity: visible ? 1 : 0,
          transform: "translate(-50%, -50%)",
        }}
      >
        <div className="w-8 h-8 rounded-full border border-white/30" />
      </motion.div>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: dotX,
          y: dotY,
          opacity: visible ? 1 : 0,
          transform: "translate(-50%, -50%)",
        }}
      >
        <div className="w-1.5 h-1.5 rounded-full bg-neon-300" />
      </motion.div>
    </>
  );
}
