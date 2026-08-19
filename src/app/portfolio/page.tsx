"use client";

import { Suspense, useCallback, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Section } from "@/components/Section";
import { projectData } from "@/lib/work/project-data";

type GalleryImage = { src: string; alt: string; caption?: string };

function getProjectImages(slug: string): GalleryImage[] {
  const project = projectData[slug];
  if (!project) return [];
  const images: GalleryImage[] = [];
  if (project.heroImage) images.push({ src: project.heroImage, alt: project.title });
  if (project.gallery) images.push(...project.gallery);
  return images;
}

function EmptyState() {
  return (
    <div className="pt-24">
      <Section>
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-accent font-mono text-sm uppercase tracking-widest mb-4">Portfolio</p>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Real designs, coming soon.
          </h1>
          <p className="text-muted leading-relaxed mb-8">
            This page will showcase real screens from shipped work as they&apos;re added.
            In the meantime, explore the full case studies.
          </p>
          <Link
            href="/work"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-accent text-accent-foreground text-sm font-semibold hover:bg-accent/90 transition-colors"
          >
            View Case Studies
          </Link>
        </div>
      </Section>
    </div>
  );
}

function PortfolioContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const projects = useMemo(
    () =>
      Object.entries(projectData)
        .filter(([, p]) => p.heroImage || (p.gallery && p.gallery.length > 0))
        .map(([slug, p]) => ({ slug, title: p.title, category: p.category })),
    []
  );

  const paramSlug = searchParams.get("project");
  const initialSlug =
    paramSlug && projects.some((p) => p.slug === paramSlug) ? paramSlug : projects[0]?.slug;

  const [activeSlug, setActiveSlug] = useState<string | undefined>(initialSlug);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const images = activeSlug ? getProjectImages(activeSlug) : [];
  const activeProject = activeSlug ? projectData[activeSlug] : undefined;

  const selectProject = useCallback(
    (slug: string) => {
      setActiveSlug(slug);
      setLightboxIndex(null);
      router.replace(`/portfolio?project=${slug}`, { scroll: false });
    },
    [router]
  );

  const showLightbox = useCallback((index: number) => setLightboxIndex(index), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const step = useCallback(
    (delta: number) => {
      setLightboxIndex((i) => {
        if (i === null) return i;
        return (i + delta + images.length) % images.length;
      });
    },
    [images.length]
  );

  if (projects.length === 0) return <EmptyState />;

  return (
    <div className="pt-24">
      <Section>
        <div className="max-w-3xl mb-10">
          <p className="text-accent font-mono text-sm uppercase tracking-widest mb-4">Portfolio</p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Real designs, real products.
          </h1>
          <p className="text-muted leading-relaxed">
            Select a project to see the actual screens — pulled straight from Figma.
          </p>
        </div>

        {/* Project selector */}
        <div className="flex flex-wrap gap-2 mb-10" role="tablist" aria-label="Select project">
          {projects.map((p) => (
            <button
              key={p.slug}
              role="tab"
              aria-selected={activeSlug === p.slug}
              onClick={() => selectProject(p.slug)}
              className={`px-4 py-2 rounded-xl text-sm font-medium border transition-colors ${
                activeSlug === p.slug
                  ? "bg-accent/10 border-accent/40 text-foreground"
                  : "bg-surface border-border text-muted hover:text-foreground"
              }`}
            >
              {p.title}
            </button>
          ))}
        </div>

        {/* Viewer */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSlug}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeProject && (
              <p className="text-xs font-mono text-muted uppercase tracking-widest mb-4">
                {activeProject.category}
              </p>
            )}
            {images.length === 0 ? (
              <p className="text-sm text-muted">No screens added for this project yet.</p>
            ) : (
              <div className="space-y-4">
                <button
                  onClick={() => showLightbox(0)}
                  className="block w-full rounded-2xl border border-border bg-surface overflow-hidden"
                >
                  <Image
                    src={images[0].src}
                    alt={images[0].alt}
                    width={1600}
                    height={1000}
                    sizes="(min-width: 1024px) 1024px, 100vw"
                    className="w-full h-auto"
                    priority
                  />
                </button>
                {images.length > 1 && (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {images.slice(1).map((img, i) => (
                      <button
                        key={img.src}
                        onClick={() => showLightbox(i + 1)}
                        className="rounded-xl border border-border bg-surface overflow-hidden"
                      >
                        <Image
                          src={img.src}
                          alt={img.alt}
                          width={800}
                          height={600}
                          sizes="(min-width: 1024px) 33vw, 100vw"
                          className="w-full h-auto"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </Section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && images[lightboxIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-60 bg-black/90 flex items-center justify-center p-4 sm:p-8"
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              aria-label="Close"
              className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    step(-1);
                  }}
                  aria-label="Previous image"
                  className="absolute left-2 sm:left-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    step(1);
                  }}
                  aria-label="Next image"
                  className="absolute right-2 sm:right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}
            <Image
              src={images[lightboxIndex].src}
              alt={images[lightboxIndex].alt}
              width={1800}
              height={1200}
              className="max-w-full max-h-full w-auto h-auto object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function PortfolioPage() {
  return (
    <Suspense fallback={null}>
      <PortfolioContent />
    </Suspense>
  );
}
