"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { Section } from "@/components/Section";
import { getPostBySlug, getAllPosts } from "@/lib/blog";

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const post = getPostBySlug(slug);
  const allPosts = getAllPosts();
  const currentIndex = allPosts.findIndex((p) => p.slug === slug);
  const nextPost = allPosts[currentIndex + 1] || allPosts[0];

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

  return (
    <div className="pt-24">
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
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs font-mono rounded-full bg-surface border border-border text-muted"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </Section>

      {/* Content */}
      <Section>
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="prose max-w-3xl"
          dangerouslySetInnerHTML={{
            __html: post.content
              .replace(/^# .+$/m, "")
              .replace(/^## (.+)$/gm, '<h2 class="text-2xl md:text-3xl font-bold mt-12 mb-4">$1</h2>')
              .replace(/^### (.+)$/gm, '<h3 class="text-xl md:text-2xl font-bold mt-8 mb-3">$1</h3>')
              .replace(/^\*\*(.+?)\*\*/gm, "<strong>$1</strong>")
              .replace(
                /```(\w*)\n([\s\S]*?)```/g,
                '<pre class="bg-surface border border-border rounded-xl p-6 overflow-x-auto my-6"><code>$2</code></pre>'
              )
              .replace(/^- (.+)$/gm, '<li class="text-foreground/70 ml-4">• $1</li>')
              .replace(/^\d+\. \*\*(.+?)\*\* — (.+)$/gm, '<li class="text-foreground/70 ml-4 mb-2"><strong class="text-foreground">$1</strong> — $2</li>')
              .replace(/^\d+\. \*\*(.+?)\*\*(.*)$/gm, '<li class="text-foreground/70 ml-4 mb-2"><strong class="text-foreground">$1</strong>$2</li>')
              .replace(/^([^<\n].+)$/gm, '<p class="text-foreground/70 leading-relaxed my-4">$1</p>')
              .replace(/\*(.+?)\*/g, "<em>$1</em>")
              .replace(/---/g, '<hr class="border-border my-8" />')
              .replace(/`([^`]+)`/g, '<code class="text-accent-coral bg-surface px-1.5 py-0.5 rounded text-sm">$1</code>'),
          }}
        />
      </Section>

      {/* Share & Next */}
      <Section>
        <div className="max-w-3xl">
          {/* Divider */}
          <hr className="border-border mb-12" />

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
