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
    role: "Community Manager",
    initials: "AM",
    content:
      "Ashish delivered an exceptional Discord bot for our community. The code quality, documentation, and support were top-notch. Highly recommended.",
    rating: 5,
  },
  {
    id: 2,
    name: "Priya Sharma",
    role: "Startup Founder",
    initials: "PS",
    content:
      "Working with Ashish was a pleasure. He understood our requirements perfectly and delivered a beautiful, performant web application ahead of schedule.",
    rating: 5,
  },
  {
    id: 3,
    name: "Rohit Verma",
    role: "Tech Lead",
    initials: "RV",
    content:
      "The dashboard Ashish built for us handles thousands of concurrent users with ease. His attention to performance and scalability is impressive.",
    rating: 5,
  },
  {
    id: 4,
    name: "Ananya Patel",
    role: "Discord Admin",
    initials: "AP",
    content:
      "Our server has never been more organized. The moderation bot Ashish created transformed how we manage our 50K+ member community.",
    rating: 5,
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

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
            <span className="text-xs font-mono text-red-400/60 tracking-[0.25em] uppercase block mb-3">
              Testimonials
            </span>
            <TextReveal
              text="What People Say"
              className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4 text-gradient-white"
              as="h2"
            />
          </div>
        </ScrollReveal>

        <div className="max-w-2xl mx-auto">
          <div className="glass-card rounded-3xl p-6 sm:p-10 min-h-[280px] sm:min-h-[240px]">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                initial={{ x: direction > 0 ? 200 : -200, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: direction > 0 ? -200 : 200, opacity: 0 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="flex flex-col items-center text-center"
              >
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center text-white font-bold text-sm mb-4 shadow-lg shadow-red-400/20">
                  {t.initials}
                </div>

                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <FiStar key={i} className="w-3.5 h-3.5 fill-red-400 text-red-400" />
                  ))}
                </div>

                <p className="text-white/40 text-sm leading-relaxed mb-6 max-w-lg">
                  &ldquo;{t.content}&rdquo;
                </p>

                <div>
                  <h4 className="font-semibold text-white/80 text-sm">{t.name}</h4>
                  <p className="text-[11px] text-white/25">{t.role}</p>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex items-center justify-center gap-3 mt-8">
              <button
                onClick={() => paginate(-1)}
                className="p-2 rounded-xl border border-white/[0.04] bg-white/[0.02] text-white/30 hover:text-white hover:bg-white/[0.05] transition-all"
              >
                <FiChevronLeft size={18} />
              </button>

              <div className="flex gap-1.5">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setDirection(i > current ? 1 : -1);
                      setCurrent(i);
                    }}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === current ? "bg-red-400 w-6" : "bg-white/10 hover:bg-white/20 w-1.5"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={() => paginate(1)}
                className="p-2 rounded-xl border border-white/[0.04] bg-white/[0.02] text-white/30 hover:text-white hover:bg-white/[0.05] transition-all"
              >
                <FiChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
