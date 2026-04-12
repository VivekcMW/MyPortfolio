"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Section, SectionHeader } from "@/components/Section";
import BlogCard from "@/components/BlogCard";
import { getAllPosts, getAllCategories } from "@/lib/blog";

export default function BlogPage() {
  const posts = getAllPosts();
  const categories = getAllCategories();
  const [activeCategory, setActiveCategory] = useState("All");
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const featuredPost = posts.find((p) => p.featured);

  const filteredPosts =
    activeCategory === "All"
      ? posts
      : posts.filter((p) => p.category === activeCategory);

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });

  return (
    <div className="pt-24">
      <Section>
        <SectionHeader
          eyebrow="Blog"
          title="Insights & Ideas."
          description="Writing about design systems, AdTech, AI-powered workflows, system design, and the future of digital experiences."
        />

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-2 mb-12"
        >
          {["All", ...categories].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeCategory === cat
                  ? "bg-accent text-white"
                  : "bg-surface border border-border text-muted hover:text-foreground hover:border-accent/20"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Featured Post */}
        {activeCategory === "All" && featuredPost && (
          <div className="mb-12">
            <BlogCard
              title={featuredPost.title}
              excerpt={featuredPost.excerpt}
              date={formatDate(featuredPost.date)}
              readTime={featuredPost.readTime}
              category={featuredPost.category}
              slug={featuredPost.slug}
              index={0}
              featured
            />
          </div>
        )}

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
          {filteredPosts
            .filter((p) => !(activeCategory === "All" && p.featured))
            .map((post, i) => (
              <BlogCard
                key={post.slug}
                title={post.title}
                excerpt={post.excerpt}
                date={formatDate(post.date)}
                readTime={post.readTime}
                category={post.category}
                slug={post.slug}
                index={i}
              />
            ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted text-lg">
              No posts in this category yet. Check back soon!
            </p>
          </div>
        )}
      </Section>

      {/* Newsletter CTA */}
      <Section>
        <div className="relative overflow-hidden rounded-2xl bg-surface border border-border p-6 sm:p-10 md:p-16 text-center">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-100 h-50 bg-accent/10 rounded-full blur-3xl" />
          <div className="relative z-10">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              Stay in the loop.
            </h3>
            <p className="text-muted text-lg max-w-md mx-auto mb-8">
              Get new posts delivered to your inbox. No spam, unsubscribe
              anytime.
            </p>
            {newsletterStatus === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center justify-center gap-2 text-green-400 font-medium"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                You&apos;re subscribed! Check your inbox.
              </motion.div>
            ) : (
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  setNewsletterStatus("loading");
                  try {
                    const res = await fetch("/api/newsletter", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ email: newsletterEmail }),
                    });
                    if (!res.ok) throw new Error("Subscription failed");
                    setNewsletterStatus("success");
                  } catch {
                    setNewsletterStatus("error");
                    setTimeout(() => setNewsletterStatus("idle"), 3000);
                  }
                }}
                className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              >
                <input
                  type="email"
                  required
                  placeholder="your@email.com"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-xl bg-background border border-border text-foreground placeholder:text-muted focus:outline-none focus:border-accent transition-colors"
                />
                <button
                  type="submit"
                  disabled={newsletterStatus === "loading"}
                  className="px-6 py-3 bg-accent text-white font-semibold rounded-xl hover:bg-accent/90 transition-all whitespace-nowrap disabled:opacity-50"
                >
                  {newsletterStatus === "loading" && "Subscribing..."}
                  {newsletterStatus === "error" && "Try again"}
                  {newsletterStatus === "idle" && "Subscribe"}
                </button>
              </form>
            )}
          </div>
        </div>
      </Section>
    </div>
  );
}
