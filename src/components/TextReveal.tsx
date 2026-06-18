"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface TextRevealProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
}

export default function TextReveal({
  text,
  className = "",
  as: Tag = "h2",
}: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const words = text.split(" ");

  return (
    <Tag className={className} ref={ref}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.3em]">
          <motion.span
            className="inline-block"
            initial={{ y: "100%", opacity: 0 }}
            animate={
              isInView
                ? { y: 0, opacity: 1 }
                : { y: "100%", opacity: 0 }
            }
            transition={{
              duration: 0.5,
              delay: i * 0.06,
              ease: [0.25, 0.25, 0.25, 0.75],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
