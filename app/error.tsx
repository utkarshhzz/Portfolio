"use client";

import { useEffect } from "react";

/** Shown if a section throws while rendering, instead of a blank page. */
export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-[100svh] flex-col items-center justify-center gap-6 px-6 text-center">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--gold)]">Something broke</p>
      <h1 className="text-3xl font-bold tracking-tight md:text-5xl">This page hit an unexpected error.</h1>
      <p className="max-w-md text-[var(--text-3)]">
        Try again, or grab the resume and reach out directly at{" "}
        <a href="mailto:unofficialutkarsh.06@gmail.com" className="text-[var(--gold)] underline-offset-4 hover:underline">
          unofficialutkarsh.06@gmail.com
        </a>
        .
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <button type="button" onClick={reset} className="btn-primary">
          Try again
        </button>
        <a href="/resume.pdf" className="btn-secondary">
          Open resume
        </a>
      </div>
    </main>
  );
}
