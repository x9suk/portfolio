"use client";

import ScrollReveal from "./ScrollReveal";
import TextReveal from "./TextReveal";
import { motion } from "framer-motion";

const experiences = [
  {
    year: "2024 - Present",
    title: "Senior Full-Stack Developer",
    company: "Freelance",
    description:
      "Leading development of premium web applications and Discord bots for clients worldwide. Architecting scalable solutions using modern tech stacks.",
  },
  {
    year: "2023 - 2024",
    title: "Discord Bot Developer",
    company: "Aurora Studios",
    description:
      "Built and maintained multiple high-traffic Discord bots serving over 200 servers. Developed custom moderation, economy, and ticketing systems.",
  },
  {
    year: "2022 - 2023",
    title: "Full-Stack Developer",
    company: "TechFlow Agency",
    description:
      "Developed responsive web applications using React, Next.js, and Node.js. Collaborated with design teams to create seamless user experiences.",
  },
  {
    year: "2021 - 2022",
    title: "Frontend Developer",
    company: "WebCraft",
    description:
      "Built modern UI components and landing pages. Integrated REST APIs and implemented responsive designs with Tailwind CSS.",
  },
  {
    year: "2020 - 2021",
    title: "Junior Developer",
    company: "CodeLab",
    description:
      "Started my journey building websites and learning full-stack development. Contributed to open-source projects and internal tools.",
  },
];

export default function Experience() {
  return (
    <section id="experience" className="section-padding relative">
      <div className="container-custom">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="text-xs font-mono text-neon-200 tracking-widest uppercase">
              My Journey
            </span>
            <TextReveal text="Experience" className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 mb-4 text-gradient" as="h2" />
            <p className="text-white/50 max-w-2xl mx-auto text-sm sm:text-base">
              The path I&apos;ve taken so far
            </p>
          </div>
        </ScrollReveal>

        <div className="relative max-w-3xl mx-auto">
          <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-neon-400/40 via-neon-400/20 to-transparent sm:-translate-x-px" />

          <div className="space-y-8 sm:space-y-12">
            {experiences.map((exp, i) => (
              <ScrollReveal
                key={i}
                delay={i * 0.1}
                direction={i % 2 === 0 ? "left" : "right"}
              >
                <div
                  className={`relative flex flex-col sm:flex-row gap-4 sm:gap-8 ${
                    i % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"
                  }`}
                >
                  <div className="hidden sm:flex sm:w-1/2" />

                  <div className="absolute left-4 sm:left-1/2 top-1 w-3 h-3 -translate-x-1/2 rounded-full bg-neon-400 border-2 border-dark-500 shadow-lg shadow-neon-400/30 z-10" />

                  <div className="sm:w-1/2 pl-10 sm:pl-0">
                    <div className="glass glass-hover rounded-2xl p-5 sm:p-6">
                      <span className="inline-block text-xs font-mono text-neon-200 mb-2 tracking-wider">
                        {exp.year}
                      </span>
                      <h3 className="text-lg font-semibold text-white mb-1">
                        {exp.title}
                      </h3>
                      <p className="text-sm text-neon-200/60 mb-3 font-medium">
                        {exp.company}
                      </p>
                      <p className="text-sm text-white/40 leading-relaxed">
                        {exp.description}
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
