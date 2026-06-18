"use client";

import { useEffect, useState } from "react";

interface TypewriterProps {
  words: string[];
  delay?: number;
  typeSpeed?: number;
  deleteSpeed?: number;
  pauseTime?: number;
}

export default function Typewriter({
  words,
  delay = 0,
  typeSpeed = 80,
  deleteSpeed = 40,
  pauseTime = 2000,
}: TypewriterProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (!started) return;

    const currentWord = words[currentWordIndex];

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (currentText.length < currentWord.length) {
            setCurrentText(currentWord.slice(0, currentText.length + 1));
          } else {
            setTimeout(() => setIsDeleting(true), pauseTime);
          }
        } else {
          if (currentText.length > 0) {
            setCurrentText(currentWord.slice(0, currentText.length - 1));
          } else {
            setIsDeleting(false);
            setCurrentWordIndex((prev) => (prev + 1) % words.length);
          }
        }
      },
      isDeleting ? deleteSpeed : typeSpeed
    );

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentWordIndex, started, words, typeSpeed, deleteSpeed, pauseTime]);

  return (
    <span className="text-gradient">
      {currentText}
      <span className="animate-pulse text-red-400">|</span>
    </span>
  );
}
