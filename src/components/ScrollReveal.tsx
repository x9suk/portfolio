"use client";

import { useRef, ReactNode } from "react";
import { motion, useInView, Variant } from "framer-motion";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  duration?: number;
  once?: boolean;
  distance?: number;
}

export default function ScrollReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
  duration = 0.6,
  once = true,
  distance = 60,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "-80px" });

  const getVariants = (): { hidden: Variant; visible: Variant } => {
    const hidden: Variant = { opacity: 0, filter: "blur(4px)" };
    const visible: Variant = { opacity: 1, filter: "blur(0px)" };

    switch (direction) {
      case "up":
        hidden.y = distance;
        visible.y = 0;
        break;
      case "down":
        hidden.y = -distance;
        visible.y = 0;
        break;
      case "left":
        hidden.x = distance;
        visible.x = 0;
        break;
      case "right":
        hidden.x = -distance;
        visible.x = 0;
        break;
      case "none":
        hidden.scale = 0.95;
        visible.scale = 1;
        break;
    }

    return { hidden, visible };
  };

  const { hidden, visible } = getVariants();

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden,
        visible: {
          ...visible,
          transition: {
            duration,
            delay,
            ease: [0.25, 0.25, 0.25, 0.75] as [number, number, number, number],
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
