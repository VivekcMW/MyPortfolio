"use client";

import { useParams } from "next/navigation";
import { motion, useScroll, useSpring } from "framer-motion";
import { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import { Section } from "@/components/Section";
import { getPostBySlug, getAllPosts } from "@/lib/blog";

function extractHeadings(content: string) {
  const headingRegex = /^##\s+(.+)$/gm;
  const headings: { text: string; id: string }[] = [];
  let match;
  while ((match = headingRegex.exec(content)) !== null) {
    const text = match[1].trim();
    const id = text
      .toLowerCase()
      .replaceAll(/[^a-z0-9]+/g, "-")
      .replaceAll(/^-|-$/g, "");
    headings.push({ text, id });
  }
  return headings;
}

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const post = getPostBySlug(slug);
  const allPosts = getAllPosts();
  const currentIndex = allPosts.findIndex((p) => p.slug === slug);
  const nextPost = allPosts[currentIndex + 1] || allPosts[0];
  const articleRef = useRef<HTMLDivElement>(null);
  const [activeHeading, setActiveHeading] = useState("");
  const [copied, setCopied] = useState(false);

  // Reading progress
  const { scrollYProgress } = useScroll({
    target: articleRef,
    offset: ["start start", "end end"],
  });
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const headings = useMemo(
    () => (post ? extractHeadings(post.content) : []),
    [post]
  );

  // Track active heading
  useEffect(() => {
    if (!headings.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveHeading(entry.target.id);
          }
        }
      },
      { rootMargin: "-80px 0px -70% 0px" }
    );
    for (const h of headings) {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [headings]);

  if (!post) {
    return (
      <div className="pt-32 text-center">
        <h1 className="text-4xl font-bold mb-4">Post not found</h1>
        <Link href="/blog" className="text-accent hover:text-accent/80">
          ← Back to Blog
        </Link>
      </div>
    );
  }

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });

  const postUrl = `https://vivekanand.dev/blog/${slug}`;
  const shareText = `${post.title} by @vivekanandUX`;

  const shareLinks = [
    {
      name: "LinkedIn",
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`,
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
      ),
    },
  ];

  const copyLink = async () => {
    await navigator.clipboard.writeText(postUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Process content with heading IDs for TOC linking
  const processedContent = post.content
    .replace(/^# .+$/m, "")
    .replaceAll(
      /^## (.+)$/gm,
      (_, heading) => {
        const id = heading
          .trim()
          .toLowerCase()
          .replaceAll(/[^a-z0-9]+/g, "-")
          .replaceAll(/^-|-$/g, "");
        return `<h2 id="${id}" class="text-2xl md:text-3xl font-bold mt-12 mb-4 scroll-mt-24">${heading}</h2>`;
      }
    )
    .replaceAll(/^### (.+)$/gm, '<h3 class="text-xl md:text-2xl font-bold mt-8 mb-3">$1</h3>')
    .replaceAll(/^\*\*(.+?)\*\*/gm, "<strong>$1</strong>")
    .replaceAll(
      /```(\w*)\n([\s\S]*?)```/g,
      '<pre class="bg-surface border border-border rounded-xl p-6 overflow-x-auto my-6"><code>$2</code></pre>'
    )
    .replaceAll(/^- (.+)$/gm, '<li class="text-foreground/70 ml-4">• $1</li>')
    .replaceAll(
      /^\d+\. \*\*(.+?)\*\* — (.+)$/gm,
      '<li class="text-foreground/70 ml-4 mb-2"><strong class="text-foreground">$1</strong> — $2</li>'
    )
    .replaceAll(
      /^\d+\. \*\*(.+?)\*\*(.*)$/gm,
      '<li class="text-foreground/70 ml-4 mb-2"><strong class="text-foreground">$1</strong>$2</li>'
    )
    .replaceAll(/^([^<\n].+)$/gm, '<p class="text-foreground/70 leading-relaxed my-4">$1</p>')
    .replaceAll(/\*(.+?)\*/g, "<em>$1</em>")
    .replaceAll(/---/g, '<hr class="border-border my-8" />')
    .replaceAll(
      /`([^`]+)`/g,
      '<code class="text-accent-coral bg-surface px-1.5 py-0.5 rounded text-sm">$1</code>'
    );

  return (
    <div className="pt-24" ref={articleRef}>
      {/* Reading Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-0.5 bg-accent origin-left z-50"
        style={{ scaleX }}
      />

      <Section>
        {/* Back */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-muted hover:text-foreground transition-colors mb-10"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M13 8H3M3 8L7 4M3 8L7 12"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Back to Blog
        </Link>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl"
        >
          <p className="text-accent font-mono text-sm uppercase tracking-widest mb-4">
            {post.category}
          </p>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 text-muted mb-4">
            <span>{formatDate(post.date)}</span>
            <span>&middot;</span>
            <span>{post.readTime}</span>
          </div>
          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs font-mono rounded-full bg-surface border border-border text-muted"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Share Buttons */}
          <div className="flex items-center gap-3 pt-4 border-t border-border">
            <span className="text-muted text-sm mr-1">Share:</span>
            {shareLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-surface border border-border flex items-center justify-center text-muted hover:text-foreground hover:border-accent/30 transition-all"
                aria-label={`Share on ${link.name}`}
              >
                {link.icon}
              </a>
            ))}
            <button
              onClick={copyLink}
              className="w-9 h-9 rounded-lg bg-surface border border-border flex items-center justify-center text-muted hover:text-foreground hover:border-accent/30 transition-all"
              aria-label="Copy link"
            >
              {copied ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
              )}
            </button>
          </div>
        </motion.div>
      </Section>

      {/* Content with TOC sidebar */}
      <Section>
        <div className="relative max-w-5xl">
          <div className="lg:grid lg:grid-cols-[1fr_220px] lg:gap-12">
            {/* Article */}
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="prose max-w-3xl"
              dangerouslySetInnerHTML={{ __html: processedContent }}
            />

            {/* Table of Contents — desktop sidebar */}
            {headings.length > 2 && (
              <aside className="hidden lg:block">
                <div className="sticky top-28">
                  <p className="text-xs font-mono uppercase tracking-widest text-muted mb-4">
                    On this page
                  </p>
                  <nav className="flex flex-col gap-2">
                    {headings.map((h) => (
                      <a
                        key={h.id}
                        href={`#${h.id}`}
                        className={`text-sm transition-colors leading-snug ${
                          activeHeading === h.id
                            ? "text-accent font-medium"
                            : "text-muted hover:text-foreground"
                        }`}
                      >
                        {h.text}
                      </a>
                    ))}
                  </nav>
                </div>
              </aside>
            )}
          </div>
        </div>
      </Section>

      {/* Share & Next */}
      <Section>
        <div className="max-w-3xl">
          {/* Bottom Share */}
          <div className="flex items-center justify-between p-6 rounded-2xl bg-surface border border-border mb-12">
            <p className="text-sm font-medium">Enjoyed this article? Share it.</p>
            <div className="flex items-center gap-2">
              {shareLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-background border border-border flex items-center justify-center text-muted hover:text-foreground hover:border-accent/30 transition-all"
                  aria-label={`Share on ${link.name}`}
                >
                  {link.icon}
                </a>
              ))}
              <button
                onClick={copyLink}
                className="w-9 h-9 rounded-lg bg-background border border-border flex items-center justify-center text-muted hover:text-foreground hover:border-accent/30 transition-all"
                aria-label="Copy link"
              >
                {copied ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
                )}
              </button>
            </div>
          </div>

          {/* Author */}
          <div className="flex items-center gap-4 mb-12 p-6 rounded-2xl bg-surface border border-border">
            <div className="w-14 h-14 rounded-full bg-accent/20 flex items-center justify-center text-accent">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            </div>
            <div>
              <p className="font-bold">Vivekanand Choudhari</p>
              <p className="text-muted text-sm">
                Lead Design Engineer at Moving Walls
              </p>
            </div>
          </div>

          {/* Next Post */}
          {nextPost && nextPost.slug !== slug && (
            <Link
              href={`/blog/${nextPost.slug}`}
              className="group block p-6 rounded-2xl bg-surface border border-border hover:border-accent/20 transition-all"
            >
              <p className="text-muted text-sm mb-2">Next Article →</p>
              <h3 className="text-xl font-bold group-hover:text-accent transition-colors">
                {nextPost.title}
              </h3>
            </Link>
          )}
        </div>
      </Section>
    </div>
  );
}
