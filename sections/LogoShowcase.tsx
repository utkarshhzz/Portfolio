"use client";

const STACK = [
  "Python", "PyTorch", "LangChain", "OpenAI API", "Azure AI Search", "FastAPI",
  "PostgreSQL", "Redis", "Docker", "Kubernetes", "FAISS", "Hugging Face",
  "OpenCV", "GraphSAGE", "Next.js", "TypeScript", "C++", "Prometheus",
];

/** Infinite stack marquee. The list renders twice so translateX(-50%) loops seamlessly. */
export default function LogoShowcase() {
  return (
    <div className="w-full overflow-hidden py-12 md:py-14">
      <p className="mb-8 text-center font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--text-3)]">
        Tools I ship production systems with
      </p>
      <div className="marquee marquee-fade relative">
        <div className="marquee-track" aria-hidden>
          {[0, 1].map((copy) => (
            <ul key={copy} className="flex shrink-0 items-center">
              {STACK.map((name) => (
                <li
                  key={`${copy}-${name}`}
                  className="flex items-center whitespace-nowrap px-6 text-xl font-semibold tracking-tight text-white/55 transition-colors duration-300 hover:text-[var(--gold)] md:px-8 md:text-2xl"
                >
                  {name}
                  <span className="ml-12 size-1.5 rounded-full bg-[var(--gold)]/40 md:ml-16" />
                </li>
              ))}
            </ul>
          ))}
        </div>
        <p className="sr-only">Stack: {STACK.join(", ")}</p>
      </div>
    </div>
  );
}
