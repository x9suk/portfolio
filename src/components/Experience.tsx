"use client";

import ScrollReveal from "./ScrollReveal";
import TextReveal from "./TextReveal";

const experiences = [
  {
    year: "2024 - Present",
    title: "Senior Discord Bot Developer",
    company: "Freelance",
    description:
      "Leading development of premium Discord bots and web applications for clients worldwide. Architecting scalable solutions with Discord.py, Node.js, and modern tech stacks.",
    tags: ["Discord.py", "Node.js", "Next.js", "Redis"],
  },
  {
    year: "2023 - 2024",
    title: "Full-Stack Developer",
    company: "Zynox Studio",
    description:
      "Built and maintained multiple high-traffic Discord bots serving 200+ servers. Developed custom moderation, economy, and ticketing systems with dashboard integrations.",
    tags: ["Python", "React", "MongoDB", "Docker"],
  },
  {
    year: "2022 - 2023",
    title: "Backend Developer",
    company: "OpenWorld India",
    description:
      "Designed RESTful APIs and microservices for community platforms. Implemented caching strategies with Redis and deployed containerized applications on AWS.",
    tags: ["Express", "PostgreSQL", "AWS", "Redis"],
  },
  {
    year: "2021 - 2022",
    title: "Frontend Developer",
    company: "Community Projects",
    description:
      "Built modern UI components and landing pages using React and Next.js. Collaborated with open-source communities to create developer tools and resources.",
    tags: ["React", "TypeScript", "Tailwind CSS"],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="section-padding relative">
      <div className="container-custom">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="text-xs font-mono text-red-400/60 tracking-[0.25em] uppercase block mb-3">
              My Journey
            </span>
            <TextReveal
              text="Experience"
              className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4 text-gradient-white"
              as="h2"
            />
            <p className="text-white/30 max-w-xl mx-auto text-sm sm:text-base">
              The path I&apos;ve taken so far
            </p>
          </div>
        </ScrollReveal>

        <div className="relative max-w-3xl mx-auto">
          <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-red-400/30 via-red-400/10 to-transparent sm:-translate-x-px" />

          <div className="space-y-8">
            {experiences.map((exp, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className={`relative flex flex-col sm:flex-row gap-4 ${i % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"}`}>
                  <div className="hidden sm:flex sm:w-1/2" />

                  <div className="absolute left-4 sm:left-1/2 top-2 w-2.5 h-2.5 -translate-x-1/2 rounded-full bg-red-400 border-2 border-[#050510] shadow-lg shadow-red-400/30 z-10" />

                  <div className="sm:w-1/2 pl-10 sm:pl-0">
                    <div className="glass-card rounded-2xl p-5 sm:p-6">
                      <span className="inline-block text-[10px] font-mono text-red-400/50 mb-2 tracking-wider">
                        {exp.year}
                      </span>
                      <h3 className="text-base font-semibold text-white/90 mb-1">
                        {exp.title}
                      </h3>
                      <p className="text-xs text-red-400/40 mb-3 font-medium">
                        {exp.company}
                      </p>
                      <p className="text-xs text-white/30 leading-relaxed mb-3">
                        {exp.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {exp.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 text-[10px] font-medium rounded-md bg-white/[0.03] border border-white/[0.04] text-white/30"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
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
