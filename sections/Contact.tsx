"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Social link icons
const CONTACT_LINKS = [
  {
    label: "unofficialutkarsh.06@gmail.com",
    href: "mailto:unofficialutkarsh.06@gmail.com",
    emoji: "✉️",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/utkarsh-kumar-801703321/",
    emoji: "💼",
  },
  {
    label: "GitHub",
    href: "https://github.com/utkarshhzz",
    emoji: "🐙",
  },
  {
    label: "LeetCode",
    href: "https://leetcode.com/u/utkarshzz/",
    emoji: "⚡",
  },
];

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Using Formspree — replace YOUR_FORM_ID with actual ID after setup
      // For now simulates success after 1.2s
      await new Promise((r) => setTimeout(r, 1200));
      setLoading(false);
      setSent(true);
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setSent(false), 6000);
    } catch {
      setLoading(false);
      setError("Something went wrong. Please email me directly.");
    }
  };

  return (
    <section id="contact" className="w-full bg-black section-padding">
      {/* Header */}
      <motion.div
        className="flex flex-col items-center mb-14"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="eyebrow-badge mb-5">💬 Let&apos;s Connect</div>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center">
          Get in Touch
        </h2>
        <p className="text-blue-50 text-sm md:text-base mt-4 text-center max-w-md">
          Have a project in mind, want to collaborate, or just say hi?
          I&apos;m always open to interesting conversations.
        </p>
      </motion.div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-0 max-w-6xl mx-auto rounded-2xl overflow-hidden border border-black-50">

        {/* ── LEFT: Form ── */}
        <motion.div
          className="p-8 md:p-12"
          style={{ background: "rgba(10,10,12,0.98)" }}
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <AnimatePresence mode="wait">
            {sent ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center h-full py-24 gap-6 text-center"
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center text-3xl"
                  style={{ background: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.3)" }}
                >
                  ✅
                </div>
                <div>
                  <p className="text-xl font-bold text-white mb-2">Message sent!</p>
                  <p className="text-blue-50 text-sm">I&apos;ll get back to you within 24 hours.</p>
                </div>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                ref={formRef}
                onSubmit={handleSubmit}
                className="flex flex-col gap-6"
                initial={{ opacity: 1 }}
              >
                <div>
                  <label className="block text-white-50 mb-2 text-sm font-medium">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    required
                    autoComplete="name"
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="What's your name?"
                  />
                </div>
                <div>
                  <label className="block text-white-50 mb-2 text-sm font-medium">Your Email</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    required
                    autoComplete="email"
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-white-50 mb-2 text-sm font-medium">Your Message</label>
                  <textarea
                    name="message"
                    value={form.message}
                    required
                    rows={5}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell me about your project, idea, or just say hi..."
                  />
                </div>

                {error && (
                  <p className="text-sm text-red-400 text-center">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-xl font-semibold text-sm tracking-widest uppercase transition-all duration-200 relative overflow-hidden"
                  style={{
                    background: loading ? "rgba(239,239,234,0.6)" : "#EFEFEA",
                    color: "#080808",
                    cursor: loading ? "not-allowed" : "pointer",
                    letterSpacing: "0.1em",
                  }}
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin" width="16" height="16" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Sending...
                    </span>
                  ) : "Send Message"}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>

        {/* ── RIGHT: Info panel ── */}
        <motion.div
          className="relative flex flex-col justify-center p-10 md:p-14 overflow-hidden min-h-[480px]"
          style={{
            background: "linear-gradient(145deg, #1a1108 0%, #0d0a04 50%, #0a0c0a 100%)",
          }}
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Dot grid */}
          <div
            className="absolute inset-0 pointer-events-none opacity-30"
            style={{
              backgroundImage: "radial-gradient(rgba(196,154,60,0.2) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />

          {/* Gold ambient glow */}
          <div
            className="absolute -top-20 -right-20 w-64 h-64 rounded-full pointer-events-none blur-3xl"
            style={{ background: "rgba(196,154,60,0.08)" }}
          />

          <div className="relative z-10">
            {/* Heading */}
            <div className="mb-8">
              <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "var(--gold)" }}>
                REACH ME AT
              </p>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 leading-tight">
                Let&apos;s build something<br />
                <span style={{ color: "var(--gold)" }}>remarkable together</span>
              </h3>
              <p className="text-blue-50 text-sm leading-relaxed">
                I&apos;m open to full-time roles, internships, research collaborations,
                and freelance AI projects.
              </p>
            </div>

            {/* Contact links */}
            <div className="flex flex-col gap-3">
              {CONTACT_LINKS.map(({ label, href, emoji }) => (
                <a
                  key={href}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.07)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(196,154,60,0.08)";
                    e.currentTarget.style.borderColor = "rgba(196,154,60,0.25)";
                    e.currentTarget.style.transform = "translateX(4px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
                    e.currentTarget.style.transform = "translateX(0)";
                  }}
                >
                  <span className="text-lg flex-shrink-0">{emoji}</span>
                  <span className="text-sm font-medium text-white-50 group-hover:text-white transition-colors truncate">
                    {label}
                  </span>
                  <svg
                    className="ml-auto flex-shrink-0 opacity-0 group-hover:opacity-50 transition-opacity"
                    width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              ))}
            </div>

            {/* Phone */}
            <div className="mt-4 px-4 py-3 rounded-xl flex items-center gap-3"
              style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}
            >
              <span className="text-lg">📞</span>
              <span className="text-sm font-medium text-white-50">+91 73527 17183</span>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
