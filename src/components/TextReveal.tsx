"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "h4" | "span";
}

export default function TextReveal({ text, className = "", delay = 0, as: Tag = "h2" }: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const words = text.split(" ");

  return (
    <div ref={ref} className={className}>
      <Tag className="inline-flex flex-wrap gap-x-[0.25em]">
        {words.map((word, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 30, rotateX: -40 }}
            animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
            transition={{
              duration: 0.5,
              delay: delay + i * 0.05,
              ease: [0.25, 0.25, 0.1, 1],
            }}
            className="inline-block"
          >
            {word}
          </motion.span>
        ))}
      </Tag>
    </div>
  );
}
