"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    setSent(true);
    setForm({ name: "", email: "", message: "" });
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <section id="contact" className="w-full bg-black section-padding">
      {/* Header */}
      <motion.div
        className="flex flex-col items-center mb-12"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="eyebrow-badge mb-5">
          💬 Have questions or ideas? Let&apos;s talk! 🚀
        </div>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center">
          Get in Touch — Let&apos;s Connect
        </h2>
      </motion.div>

      {/* Two-column layout — matches reference exactly */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-0 max-w-6xl mx-auto rounded-2xl overflow-hidden border border-black-50">

        {/* ── LEFT: Form ── */}
        <motion.div
          className="p-8 md:p-10"
          style={{ background: "rgba(14,14,16,0.95)" }}
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {sent ? (
            <div className="flex flex-col items-center justify-center h-full py-20 gap-5 text-center">
              <div className="text-6xl">✅</div>
              <p className="text-xl font-bold text-white">Message sent!</p>
              <p className="text-blue-50 text-sm">I&apos;ll get back to you within 24 hours.</p>
            </div>
          ) : (
            <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div>
                <label>Your name</label>
                <input
                  type="text" name="name" value={form.name} required
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  placeholder="What's your good name?"
                />
              </div>
              <div>
                <label>Your Email</label>
                <input
                  type="email" name="email" value={form.email} required
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  placeholder="What's your email address?"
                />
              </div>
              <div>
                <label>Your Message</label>
                <textarea
                  name="message" value={form.message} required rows={5}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  placeholder="How can I help you?"
                />
              </div>

              {/* Submit button — reference style */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-md font-semibold text-sm tracking-wider uppercase transition-all duration-200"
                style={{
                  background: loading ? "rgba(239,239,234,0.7)" : "#EFEFEA",
                  color: "#080808",
                  letterSpacing: "0.08em",
                  cursor: loading ? "not-allowed" : "pointer",
                }}
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          )}
        </motion.div>

        {/* ── RIGHT: Visual panel (amber/gold — matches reference) ── */}
        <motion.div
          className="relative flex flex-col items-center justify-center p-10 overflow-hidden min-h-[400px]"
          style={{ background: "linear-gradient(135deg, #C49A3C 0%, #8B6914 40%, #5C430A 100%)" }}
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Dot-grid overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(rgba(0,0,0,0.15) 1px, transparent 1px)",
              backgroundSize: "22px 22px",
            }}
          />

          {/* Decorative desk illustration using CSS */}
          <div className="relative z-10 flex flex-col items-center gap-6 text-center">
            {/* Monitor illustration */}
            <div className="relative">
              {/* Monitor body */}
              <div
                className="w-48 h-32 rounded-lg flex items-center justify-center"
                style={{ background: "rgba(0,0,0,0.5)", border: "2px solid rgba(255,255,255,0.2)" }}
              >
                {/* Screen content */}
                <div className="w-40 h-24 rounded flex flex-col gap-1.5 p-3 overflow-hidden"
                  style={{ background: "#080808" }}
                >
                  <div className="h-1.5 w-20 rounded" style={{ background: "#C49A3C" }} />
                  <div className="h-1 w-28 rounded opacity-50" style={{ background: "#839cb5" }} />
                  <div className="h-1 w-16 rounded opacity-40" style={{ background: "#839cb5" }} />
                  <div className="mt-1 h-1.5 w-24 rounded opacity-60" style={{ background: "#4ade80" }} />
                  <div className="h-1 w-20 rounded opacity-40" style={{ background: "#839cb5" }} />
                  <div className="h-1.5 w-14 rounded opacity-50" style={{ background: "#C49A3C" }} />
                </div>
              </div>
              {/* Monitor stand */}
              <div className="mx-auto mt-0 w-4 h-6" style={{ background: "rgba(0,0,0,0.4)" }} />
              <div className="mx-auto w-20 h-2 rounded" style={{ background: "rgba(0,0,0,0.3)" }} />
            </div>

            {/* Keyboard */}
            <div
              className="w-44 h-8 rounded"
              style={{ background: "rgba(0,0,0,0.35)", border: "1px solid rgba(255,255,255,0.1)" }}
            />

            {/* Message */}
            <div>
              <p className="font-bold text-xl" style={{ color: "rgba(0,0,0,0.8)" }}>
                Let&apos;s build something
              </p>
              <p className="font-bold text-xl" style={{ color: "rgba(0,0,0,0.8)" }}>
                amazing together 🚀
              </p>
            </div>

            {/* Quick links */}
            <div className="flex flex-col gap-2 w-full max-w-xs">
              {[
                { label: "📧 unofficialutkarsh.06@gmail.com", href: "mailto:unofficialutkarsh.06@gmail.com" },
                { label: "💼 LinkedIn", href: "https://www.linkedin.com/in/utkarsh-kumar-801703321/" },
                { label: "🐙 GitHub",  href: "https://github.com/utkarshhzz" },
                { label: "⚡ LeetCode", href: "https://leetcode.com/u/utkarshzz/" },
              ].map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="flex items-center justify-center py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-[1.02]"
                  style={{
                    background: "rgba(0,0,0,0.25)",
                    color: "rgba(255,255,255,0.9)",
                    backdropFilter: "blur(4px)",
                  }}
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
