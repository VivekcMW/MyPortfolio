"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface BlogCardProps {
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  slug: string;
  index: number;
  featured?: boolean;
}

export default function BlogCard({
  title,
  excerpt,
  date,
  readTime,
  category,
  slug,
  index,
  featured = false,
}: BlogCardProps) {
  if (featured) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <Link href={`/blog/${slug}`} className="group block">
          <div className="relative overflow-hidden rounded-2xl bg-surface border border-border p-6 sm:p-8 lg:p-12 transition-all duration-500 group-hover:border-accent/30">
            <div className="absolute top-0 right-0 w-48 sm:w-64 h-48 sm:h-64 bg-accent/5 rounded-full blur-3xl" />
            <p className="text-accent font-mono text-xs uppercase tracking-widest mb-4">
              Featured &middot; {category}
            </p>
            <h3 className="text-2xl lg:text-4xl font-bold mb-4 group-hover:text-accent transition-colors leading-tight">
              {title}
            </h3>
            <p className="text-muted text-base sm:text-lg leading-relaxed mb-6 max-w-2xl">
              {excerpt}
            </p>
            <div className="flex items-center gap-4 text-sm text-muted">
              <span>{date}</span>
              <span>&middot;</span>
              <span>{readTime}</span>
            </div>
          </div>
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <Link href={`/blog/${slug}`} className="group block h-full">
        <div className="h-full rounded-2xl bg-surface border border-border p-6 lg:p-8 transition-all duration-500 group-hover:border-accent/30 group-hover:bg-surface-hover flex flex-col">
          <p className="text-accent font-mono text-xs uppercase tracking-widest mb-3">
            {category}
          </p>
          <h3 className="text-xl lg:text-2xl font-bold mb-3 group-hover:text-accent transition-colors leading-tight grow">
            {title}
          </h3>
          <p className="text-muted leading-relaxed mb-4 line-clamp-3">
            {excerpt}
          </p>
          <div className="flex items-center gap-4 text-sm text-muted mt-auto">
            <span>{date}</span>
            <span>&middot;</span>
            <span>{readTime}</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
