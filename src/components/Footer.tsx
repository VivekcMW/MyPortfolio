"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const footerLinks = {
  Contact: [
    { href: "mailto:vivekanand.design@gmail.com", label: "Email" },
    { href: "https://www.linkedin.com/in/vivekanand-choudhari-817829118/", label: "LinkedIn" },
    { href: "https://dribbble.com/VivekanandChoudhari", label: "Dribbble" },
    { href: "https://github.com/vivekanandchoudhari", label: "GitHub" },
  ],
  "Latest Work": [
    { href: "/work/nocode-platform", label: "NoCode Platform" },
    { href: "/work/forma-research", label: "Forma Research" },
    { href: "/design-system", label: "Design System Lab" },
  ],
  Philosophy: [
    { href: "/process", label: "My Process" },
    { href: "/blog", label: "Latest Thinking" },
    { href: "/about", label: "About Me" },
  ],
};

const testimonials = [
  { quote: "Transforms chaos into clarity with design rigor", author: "Design Leader" },
  { quote: "Rare blend of design craft and systems thinking", author: "Product Manager" },
  { quote: "Brings engineering discipline to design work", author: "CTO" },
];

export default function Footer() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="border-t border-border bg-surface">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        {/* Availability Banner */}
        <div className="mb-12 p-6 rounded-2xl bg-accent/10 border border-accent/20">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="font-accent text-sm font-semibold text-primary uppercase tracking-wider">
                  Available for Projects
                </span>
              </div>
              <p className="text-muted text-sm">
                Respond within 24 hours • Open to full-time and consulting opportunities
              </p>
            </div>
            <Link
              href="/contact"
              className="px-6 py-3 bg-accent text-white text-sm font-semibold rounded-full hover:shadow-lg hover:shadow-accent/25 transition-all duration-300"
            >
              Start a Conversation
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <span className="font-bold text-xl tracking-tight font-mono text-accent">
                &#9670;
              </span>
              <span className="font-display font-bold text-lg tracking-tight text-primary">
                VC
              </span>
            </Link>
            <p className="text-muted text-sm leading-relaxed mb-4">
              I turn ambiguity into clarity through design rigor and systems thinking.
            </p>
            <p className="text-muted text-xs">
              Leading design at{" "}
              <span className="text-primary font-semibold">Moving Walls</span>
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-accent text-xs font-bold text-primary mb-4 uppercase tracking-widest">
                {title}
              </h4>
              <ul className="flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-muted hover:text-accent transition-colors text-sm font-medium inline-flex items-center gap-2 group"
                      {...(link.href.startsWith("http")
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                    >
                      <span className="w-1 h-1 rounded-full bg-muted group-hover:bg-accent transition-colors" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Rotating Testimonial */}
        <div className="mb-12 h-20 flex items-center justify-center overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <p className="text-primary font-display text-lg italic mb-2">
                &ldquo;{testimonials[currentTestimonial].quote}&rdquo;
              </p>
              <p className="text-muted text-sm font-accent">
                — {testimonials[currentTestimonial].author}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted text-sm font-accent">
            &copy; {new Date().getFullYear()} Vivekanand Choudhari — All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs text-muted font-accent">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="hover:text-accent transition-colors"
            >
              Back to Top ↑
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
