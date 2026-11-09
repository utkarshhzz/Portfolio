"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, Code2, Copy, Check, Send, ArrowUpRight, Loader2 } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/shared/BrandIcons";
import SectionHeading from "@/components/shared/SectionHeading";
import { LINKS } from "@/lib/sections";

/**
 * Formspree form (https://formspree.io/f/mjyyzabe). Form IDs are public by design, so it is safe
 * to keep in the client bundle. NEXT_PUBLIC_FORMSPREE_ID overrides it if set in Vercel.
 * If Formspree fails, the form falls back to opening the visitor's mail app.
 */
const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID || "mjyyzabe";

const CONTACT_LINKS = [
  { label: "LinkedIn", sub: "Let's connect", href: LINKS.linkedin, icon: <LinkedinIcon size={17} /> },
  { label: "GitHub", sub: "@utkarshhzz", href: LINKS.github, icon: <GithubIcon size={17} /> },
  { label: "LeetCode", sub: "350+ solved", href: LINKS.leetcode, icon: <Code2 size={17} /> },
];

type Status = "idle" | "sending" | "sent" | "mailto" | "error";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  // Honeypot: hidden from people, bots fill it in. Formspree silently drops submissions where _gotcha is set.
  const [gotcha, setGotcha] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [copied, setCopied] = useState(false);

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const openMailto = () => {
    const subject = encodeURIComponent(`Portfolio enquiry from ${form.name}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
    window.location.href = `mailto:${LINKS.email}?subject=${subject}&body=${body}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (gotcha) { setStatus("sent"); return; } // bot: pretend success, send nothing
    if (!FORMSPREE_ID) {
      openMailto();
      setStatus("mailto");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...form, _gotcha: gotcha, _subject: `Portfolio enquiry from ${form.name}` }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(LINKS.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* clipboard blocked */ }
  };

  return (
    <section id="contact" className="section-padding">
      <SectionHeading
        index="08"
        eyebrow="Contact"
        title="Let's Build Something"
        sub="Open to SWE and ML roles, internships, research collaborations and interesting AI projects. I usually reply within a day."
      />

      <div className="mx-auto grid max-w-6xl grid-cols-1 overflow-hidden rounded-2xl border border-black-50 lg:grid-cols-2">

        {/* LEFT: form */}
        <motion.div
          className="bg-[rgba(10,10,12,0.98)] p-7 md:p-12"
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <AnimatePresence mode="wait">
            {status === "sent" || status === "mailto" ? (
              <motion.div
                key="done"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex h-full flex-col items-center justify-center gap-5 py-16 text-center"
                role="status"
              >
                <span className="grid size-14 place-items-center rounded-full border border-[rgba(74,222,128,0.3)] bg-[rgba(74,222,128,0.1)] text-[#4ade80]">
                  <Check size={26} />
                </span>
                {status === "sent" ? (
                  <div>
                    <p className="mb-1 text-xl font-bold text-white">Message sent</p>
                    <p className="text-sm text-[var(--text-3)]">Thanks! I&apos;ll get back to you soon.</p>
                  </div>
                ) : (
                  <div className="max-w-xs">
                    <p className="mb-1 text-xl font-bold text-white">Your email app should open</p>
                    <p className="text-sm text-[var(--text-3)]">
                      The message is pre-filled, just hit send. If nothing opened, email me at{" "}
                      <a href={`mailto:${LINKS.email}`} className="text-[var(--gold)] underline-offset-4 hover:underline">{LINKS.email}</a>.
                    </p>
                  </div>
                )}
                <button type="button" onClick={() => setStatus("idle")} className="text-xs font-semibold text-[var(--text-3)] hover:text-white">
                  Write another message
                </button>
              </motion.div>
            ) : (
              <motion.form key="form" onSubmit={handleSubmit} className="flex flex-col gap-5" initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
                  <label htmlFor="c-company">Company website</label>
                  <input id="c-company" type="text" name="_gotcha" tabIndex={-1} autoComplete="off" value={gotcha} onChange={(e) => setGotcha(e.target.value)} />
                </div>
                <div>
                  <label htmlFor="c-name" className="mb-2 block text-sm font-medium text-[var(--text-2)]">Name</label>
                  <input id="c-name" className="field" type="text" name="name" value={form.name} required maxLength={100} autoComplete="name" onChange={update("name")} placeholder="What's your name?" />
                </div>
                <div>
                  <label htmlFor="c-email" className="mb-2 block text-sm font-medium text-[var(--text-2)]">Email</label>
                  <input id="c-email" className="field" type="email" name="email" value={form.email} required maxLength={254} autoComplete="email" onChange={update("email")} placeholder="you@company.com" />
                </div>
                <div>
                  <label htmlFor="c-msg" className="mb-2 block text-sm font-medium text-[var(--text-2)]">Message</label>
                  <textarea id="c-msg" className="field resize-y" name="message" value={form.message} required minLength={10} maxLength={4000} rows={5} onChange={update("message")} placeholder="A role, a project, or just hello…" />
                </div>

                {status === "error" && (
                  <p className="text-center text-sm text-red-400" role="alert">
                    That didn&apos;t go through.{" "}
                    <button type="button" onClick={openMailto} className="underline underline-offset-4">Send it from your email app instead</button>.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#EFEFEA] py-4 text-sm font-semibold text-[#080808] transition-colors hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {status === "sending" ? (
                    <><Loader2 size={16} className="animate-spin" /> Sending…</>
                  ) : (
                    <><Send size={15} /> Send message</>
                  )}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>

        {/* RIGHT: direct channels */}
        <motion.div
          className="relative flex min-h-[460px] flex-col justify-center overflow-hidden p-7 md:p-12"
          style={{ background: "linear-gradient(145deg, #1a1108 0%, #0d0a04 50%, #0a0c0a 100%)" }}
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <div aria-hidden className="pointer-events-none absolute inset-0 opacity-30" style={{ backgroundImage: "radial-gradient(rgba(196,154,60,0.2) 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
          <div aria-hidden className="pointer-events-none absolute -right-20 -top-20 size-64 rounded-full bg-[rgba(196,154,60,0.08)] blur-3xl" />

          <div className="relative z-10">
            <p className="mb-3 font-mono text-xs uppercase tracking-widest text-[var(--gold)]">Reach me directly</p>
            <h3 className="mb-7 text-2xl font-bold leading-tight text-white md:text-3xl">
              Prefer email?<br />
              <span className="text-[var(--gold)]">That works too.</span>
            </h3>

            {/* Email with copy */}
            <div className="mb-3 flex items-center gap-2 rounded-xl border border-[rgba(196,154,60,0.25)] bg-[rgba(196,154,60,0.06)] p-1.5 pl-4">
              <Mail size={17} className="flex-shrink-0 text-[var(--gold)]" />
              <a href={`mailto:${LINKS.email}`} className="min-w-0 flex-1 truncate text-sm font-medium text-[var(--text-1)] hover:underline underline-offset-4">
                {LINKS.email}
              </a>
              <button
                type="button"
                onClick={copyEmail}
                className="inline-flex items-center gap-1.5 rounded-lg bg-white/[0.06] px-3 py-2 text-xs font-semibold text-[var(--text-2)] transition-colors hover:bg-white/[0.12]"
                aria-label="Copy email address"
              >
                {copied ? <><Check size={13} /> Copied</> : <><Copy size={13} /> Copy</>}
              </button>
            </div>

            <ul className="flex flex-col gap-2.5">
              {CONTACT_LINKS.map(({ label, sub, href, icon }) => (
                <li key={href}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.03] px-4 py-3 transition-all duration-200 hover:translate-x-1 hover:border-[rgba(196,154,60,0.25)] hover:bg-[rgba(196,154,60,0.08)]"
                  >
                    <span className="text-[var(--text-2)] group-hover:text-[var(--gold)]">{icon}</span>
                    <span className="text-sm font-medium text-[var(--text-1)]">{label}</span>
                    <span className="text-xs text-[var(--text-3)]">{sub}</span>
                    <ArrowUpRight size={14} className="ml-auto opacity-40 transition-opacity group-hover:opacity-90" />
                  </a>
                </li>
              ))}
              <li className="flex items-center gap-3 rounded-xl border border-white/[0.05] bg-white/[0.02] px-4 py-3">
                <Phone size={17} className="text-[var(--text-3)]" />
                <a href={`tel:${LINKS.phone.replace(/\s/g, "")}`} className="text-sm font-medium text-[var(--text-2)] hover:text-white">
                  {LINKS.phone}
                </a>
              </li>
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
