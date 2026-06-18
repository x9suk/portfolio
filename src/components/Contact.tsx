"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import TextReveal from "./TextReveal";
import { FiSend, FiGithub, FiMail, FiMapPin } from "react-icons/fi";
import { FaDiscord } from "react-icons/fa";

export default function Contact() {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setFormState({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="section-padding relative">
      <div className="container-custom">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="text-xs font-mono text-red-400/60 tracking-[0.25em] uppercase block mb-3">
              Get in Touch
            </span>
            <TextReveal
              text="Contact Me"
              className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4 text-gradient-white"
              as="h2"
            />
            <p className="text-white/30 max-w-xl mx-auto text-sm sm:text-base">
              Have a project in mind? Let&apos;s build something great together.
            </p>
          </div>
        </ScrollReveal>

        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-5 gap-6">
            <ScrollReveal direction="left" className="md:col-span-3">
              <div className="glass-card rounded-3xl p-6 sm:p-8">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className="block text-[11px] font-medium text-white/30 mb-2 tracking-wider uppercase">
                        Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        placeholder="Your name"
                        className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.05] rounded-xl text-white text-sm placeholder:text-white/15 focus:outline-none focus:border-red-400/20 focus:bg-white/[0.05] transition-all duration-300"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-[11px] font-medium text-white/30 mb-2 tracking-wider uppercase">
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        placeholder="your@email.com"
                        className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.05] rounded-xl text-white text-sm placeholder:text-white/15 focus:outline-none focus:border-red-400/20 focus:bg-white/[0.05] transition-all duration-300"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-[11px] font-medium text-white/30 mb-2 tracking-wider uppercase">
                      Message
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={5}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      placeholder="Tell me about your project..."
                      className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.05] rounded-xl text-white text-sm placeholder:text-white/15 focus:outline-none focus:border-red-400/20 focus:bg-white/[0.05] transition-all duration-300 resize-none"
                    />
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full sm:w-auto px-8 py-3.5 bg-red-400 hover:bg-red-500 text-white font-semibold rounded-2xl transition-all duration-300 btn-shine overflow-hidden flex items-center justify-center gap-2 text-sm"
                    style={{
                      boxShadow: "0 0 30px rgba(255,45,85,0.2)",
                    }}
                  >
                    {submitted ? (
                      <span className="relative z-10 flex items-center gap-2">
                        <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}>
                          ✓
                        </motion.span>
                        Sent Successfully!
                      </span>
                    ) : (
                      <span className="relative z-10 flex items-center gap-2">
                        <FiSend size={14} />
                        Send Message
                      </span>
                    )}
                  </motion.button>
                </form>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right" className="md:col-span-2">
              <div className="glass-card rounded-3xl p-6 sm:p-8 h-full">
                <h3 className="text-base font-semibold text-white/80 mb-6">Let&apos;s Connect</h3>

                <div className="space-y-4 mb-8">
                  {[
                    { icon: FiMail, label: "Email", value: "ashish@example.com", href: "mailto:ashish@example.com" },
                    { icon: FiMapPin, label: "Location", value: "India" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-xl bg-red-400/5 border border-red-400/10 flex items-center justify-center shrink-0">
                        <item.icon className="w-3.5 h-3.5 text-red-400/50" />
                      </div>
                      <div>
                        <p className="text-[10px] text-white/25 uppercase tracking-wider">{item.label}</p>
                        {item.href ? (
                          <a href={item.href} className="text-xs text-white/50 hover:text-red-400 transition-colors">
                            {item.value}
                          </a>
                        ) : (
                          <p className="text-xs text-white/50">{item.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div>
                  <p className="text-[10px] text-white/25 uppercase tracking-wider mb-3">Social</p>
                  <div className="flex gap-2">
                    {[
                      { icon: FiGithub, href: "https://github.com/x9suk", label: "GitHub" },
                      { icon: FaDiscord, href: "https://discord.com", label: "Discord" },
                    ].map((social) => (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/[0.04] flex items-center justify-center text-white/30 hover:text-red-400 hover:bg-red-400/5 hover:border-red-400/15 transition-all duration-300"
                      >
                        <social.icon size={16} />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
