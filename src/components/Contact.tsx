"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import TextReveal from "./TextReveal";
import {
  FiSend,
  FiGithub,
  FiMail,
  FiMapPin,
} from "react-icons/fi";
import { FaDiscord, FaTwitter, FaLinkedinIn } from "react-icons/fa";

export default function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
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
            <span className="text-xs font-mono text-neon-200 tracking-widest uppercase">
              Get in Touch
            </span>
            <TextReveal text="Contact Me" className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 mb-4 text-gradient" as="h2" />
            <p className="text-white/50 max-w-2xl mx-auto text-sm sm:text-base">
              Have a project in mind? Let&apos;s build something great together.
            </p>
          </div>
        </ScrollReveal>

        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-5 gap-6 sm:gap-8">
            <ScrollReveal direction="left" className="md:col-span-3">
              <div className="glass rounded-3xl p-6 sm:p-8">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-xs font-medium text-white/40 mb-2 tracking-wide uppercase"
                      >
                        Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) =>
                          setFormState({ ...formState, name: e.target.value })
                        }
                        placeholder="Your name"
                        className="w-full px-4 py-3 bg-white/5 border border-white/5 rounded-xl text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-neon-400/30 focus:bg-white/10 transition-all duration-300"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-xs font-medium text-white/40 mb-2 tracking-wide uppercase"
                      >
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) =>
                          setFormState({ ...formState, email: e.target.value })
                        }
                        placeholder="your@email.com"
                        className="w-full px-4 py-3 bg-white/5 border border-white/5 rounded-xl text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-neon-400/30 focus:bg-white/10 transition-all duration-300"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-xs font-medium text-white/40 mb-2 tracking-wide uppercase"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={5}
                      value={formState.message}
                      onChange={(e) =>
                        setFormState({ ...formState, message: e.target.value })
                      }
                      placeholder="Tell me about your project..."
                      className="w-full px-4 py-3 bg-white/5 border border-white/5 rounded-xl text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-neon-400/30 focus:bg-white/10 transition-all duration-300 resize-none"
                    />
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full sm:w-auto px-8 py-3.5 bg-neon-400 hover:bg-neon-300 text-white font-semibold rounded-xl transition-all duration-300 neon-glow-hover btn-shine overflow-hidden flex items-center justify-center gap-2"
                  >
                    {submitted ? (
                      <span className="relative z-10 flex items-center gap-2">
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring" }}
                        >
                          ✓
                        </motion.span>
                        Sent Successfully!
                      </span>
                    ) : (
                      <span className="relative z-10 flex items-center gap-2">
                        <FiSend size={16} />
                        Send Message
                      </span>
                    )}
                  </motion.button>
                </form>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right" className="md:col-span-2">
              <div className="glass rounded-3xl p-6 sm:p-8 h-full">
                <h3 className="text-lg font-semibold text-white mb-6">
                  Let&apos;s Connect
                </h3>

                <div className="space-y-4 mb-8">
                  {[
                    {
                      icon: FiMail,
                      label: "Email",
                      value: "dusk.dev@hotmail.com",
                      href: "mailto:dusk.dev@hotmail.com",
                    },
                    {
                      icon: FiMapPin,
                      label: "Location",
                      value: "Kolkata, WB, India",
                    },
                  ].map((item) => (
                    <div key={item.label} className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-neon-200/10 border border-neon-200/10 flex items-center justify-center shrink-0">
                        <item.icon className="w-4 h-4 text-neon-200" />
                      </div>
                      <div>
                        <p className="text-xs text-white/40 uppercase tracking-wide">
                          {item.label}
                        </p>
                        {item.href ? (
                          <a
                            href={item.href}
                            className="text-sm text-white/70 hover:text-neon-200 transition-colors"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p className="text-sm text-white/70">{item.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div>
                  <p className="text-xs text-white/40 uppercase tracking-wide mb-4">
                    Social Links
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {[
                      { icon: FiGithub, href: "https://github.com/grim-echo", label: "GitHub" },
                      { icon: FaDiscord, href: "https://discord.com", label: "Discord" },
                      { icon: FaTwitter, href: "https://twitter.com", label: "Twitter" },
                      { icon: FaLinkedinIn, href: "https://linkedin.com", label: "LinkedIn" },
                    ].map((social) => (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-11 h-11 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-white/40 hover:text-neon-200 hover:bg-neon-200/10 hover:border-neon-200/20 transition-all duration-300"
                        aria-label={social.label}
                      >
                        <social.icon size={18} />
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
