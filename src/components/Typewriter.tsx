"use client";

import { useState, useEffect } from "react";

interface TypewriterProps {
  words: string[];
  className?: string;
  delay?: number;
  deleteSpeed?: number;
  typeSpeed?: number;
  pauseTime?: number;
}

export default function Typewriter({
  words,
  className = "",
  delay = 0,
  typeSpeed = 80,
  deleteSpeed = 40,
  pauseTime = 2000,
}: TypewriterProps) {
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const start = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(start);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    const current = words[wordIndex];
    const timeout = setTimeout(
      () => {
        if (!deleting) {
          if (charIndex < current.length) {
            setCharIndex((p) => p + 1);
          } else {
            setTimeout(() => setDeleting(true), pauseTime);
          }
        } else {
          if (charIndex > 0) {
            setCharIndex((p) => p - 1);
          } else {
            setDeleting(false);
            setWordIndex((p) => (p + 1) % words.length);
          }
        }
      },
      deleting ? deleteSpeed : typeSpeed
    );
    return () => clearTimeout(timeout);
  }, [charIndex, deleting, wordIndex, started, words, typeSpeed, deleteSpeed, pauseTime]);

  return (
    <span className={className}>
      {words[wordIndex].substring(0, charIndex)}
      <span className="inline-block w-[2px] h-[1em] bg-neon-200 ml-1 animate-pulse align-middle" />
    </span>
  );
}
