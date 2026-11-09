import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[100svh] flex-col items-center justify-center gap-6 px-6 text-center">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--gold)]">404</p>
      <h1 className="text-4xl font-bold tracking-tight md:text-6xl">This page doesn&apos;t exist.</h1>
      <p className="max-w-md text-[var(--text-3)]">
        The link may be broken or the page may have moved. Everything lives on the home page.
      </p>
      <Link href="/" className="btn-primary">
        Back to the portfolio
      </Link>
    </main>
  );
}
