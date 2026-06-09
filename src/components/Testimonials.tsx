"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import TextReveal from "./TextReveal";
import { FiChevronLeft, FiChevronRight, FiStar } from "react-icons/fi";

const testimonials = [
  {
    id: 1,
    name: "Arjun Mehta",
    role: "Startup Founder",
    avatar: "AM",
    content:
      "Dusk delivered an exceptional Discord bot for our community. The code quality, documentation, and support were top-notch. Highly recommended for any serious project.",
    rating: 5,
  },
  {
    id: 2,
    name: "Priya Sharma",
    role: "Product Manager",
    avatar: "PS",
    content:
      "Working with Dusk was a pleasure. He understood our requirements perfectly and delivered a beautiful, performant web application ahead of schedule.",
    rating: 5,
  },
  {
    id: 3,
    name: "Rohit Verma",
    role: "Tech Lead",
    avatar: "RV",
    content:
      "The dashboard Dusk built for us handles thousands of concurrent users with ease. His attention to performance and scalability is impressive.",
    rating: 5,
  },
  {
    id: 4,
    name: "Ananya Patel",
    role: "Discord Community Manager",
    avatar: "AN",
    content:
      "Our server has never been more organized. The moderation bot Dusk created transformed how we manage our 50K+ member community.",
    rating: 5,
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -300 : 300,
      opacity: 0,
      scale: 0.95,
    }),
  };

  const paginate = (newDir: number) => {
    setDirection(newDir);
    setCurrent((prev) => {
      const next = prev + newDir;
      if (next < 0) return testimonials.length - 1;
      if (next >= testimonials.length) return 0;
      return next;
    });
  };

  const t = testimonials[current];

  return (
    <section id="testimonials" className="section-padding relative">
      <div className="container-custom">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="text-xs font-mono text-neon-200 tracking-widest uppercase">
              Testimonials
            </span>
            <TextReveal text="What People Say" className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 mb-4 text-gradient" as="h2" />
            <p className="text-white/50 max-w-2xl mx-auto text-sm sm:text-base">
              Feedback from clients and collaborators
            </p>
          </div>
        </ScrollReveal>

        <div className="max-w-2xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl glass p-6 sm:p-10 min-h-[280px] sm:min-h-[240px]">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-neon-400 to-accent-orange flex items-center justify-center text-white font-bold text-lg mb-5 shadow-lg shadow-neon-400/20">
                  {t.avatar}
                </div>

                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <FiStar
                      key={i}
                      className="w-4 h-4 fill-neon-200 text-neon-200"
                    />
                  ))}
                </div>

                <p className="text-white/60 text-sm sm:text-base leading-relaxed mb-6 max-w-lg">
                  &ldquo;{t.content}&rdquo;
                </p>

                <div>
                  <h4 className="font-semibold text-white">{t.name}</h4>
                  <p className="text-xs text-white/40">{t.role}</p>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex items-center justify-center gap-3 mt-8">
              <button
                onClick={() => paginate(-1)}
                className="p-2 rounded-xl border border-white/5 bg-white/5 text-white/40 hover:text-white hover:bg-white/10 transition-all"
                aria-label="Previous"
              >
                <FiChevronLeft size={20} />
              </button>

              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setDirection(i > current ? 1 : -1);
                      setCurrent(i);
                    }}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      i === current
                        ? "bg-neon-400 w-6"
                        : "bg-white/20 hover:bg-white/40"
                    }`}
                    aria-label={`Go to testimonial ${i + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={() => paginate(1)}
                className="p-2 rounded-xl border border-white/5 bg-white/5 text-white/40 hover:text-white hover:bg-white/10 transition-all"
                aria-label="Next"
              >
                <FiChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
