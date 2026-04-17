import Link from "next/link";
import { Section } from "@/components/Section";

export default function NotFound() {
  return (
    <div className="pt-24">
      <Section>
        <div className="max-w-2xl mx-auto text-center rounded-2xl border border-border bg-surface p-8 sm:p-12">
          <p className="text-accent font-mono text-sm uppercase tracking-widest mb-4">
            404
          </p>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight mb-4">
            Page not found.
          </h1>
          <p className="text-muted text-base sm:text-lg leading-relaxed mb-8">
            The page you’re looking for has moved, was removed, or never existed.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center justify-center px-5 py-3 rounded-xl bg-accent text-white font-semibold hover:bg-accent/90 transition-colors"
            >
              Go to homepage
            </Link>
            <Link
              href="/work"
              className="inline-flex items-center justify-center px-5 py-3 rounded-xl border border-border bg-background text-foreground font-semibold hover:border-accent/30 transition-colors"
            >
              Explore work
            </Link>
          </div>
        </div>
      </Section>
    </div>
  );
}
