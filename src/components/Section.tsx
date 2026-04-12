"use client";

import { motion, useInView } from "framer-motion";
import { ReactNode, useRef } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export function Section({ children, className = "", id }: SectionProps) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`py-16 md:py-24 lg:py-32 ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
    </motion.section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const titleWords = title.split(" ");

  return (
    <div ref={ref} className="mb-12 md:mb-16 lg:mb-20">
      {eyebrow && (
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-accent font-mono text-sm mb-4 uppercase tracking-widest"
        >
          {eyebrow}
        </motion.p>
      )}
      <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight">
        {titleWords.map((word, i) => (
          <span key={`${word}-${i}`} className="inline-block overflow-hidden mr-[0.3em] last:mr-0">
            <motion.span
              className="inline-block"
              initial={{ y: "110%" }}
              animate={isInView ? { y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: 0.1 + i * 0.06,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </h2>
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 + titleWords.length * 0.06 }}
          className="mt-6 text-muted text-lg lg:text-xl max-w-2xl leading-relaxed"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
