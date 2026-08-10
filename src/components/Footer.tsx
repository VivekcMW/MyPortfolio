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
            <a
              href="https://wa.me/919071933517?text=Hi%20Vivekanand%2C%20I%27d%20like%20to%20discuss%20a%20project%20with%20you."
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-accent text-white text-sm font-semibold rounded-full hover:shadow-lg hover:shadow-accent/25 transition-all duration-300 inline-flex items-center gap-2"
            >
              <svg
                className="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              Start a Conversation
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="group flex items-center gap-0 mb-4">
              <span className="font-display font-bold text-lg tracking-tight">
                <span className="text-primary group-hover:text-accent transition-colors duration-200">
                  V
                </span>
                <span className="text-accent group-hover:text-primary transition-colors duration-200">
                  C
                </span>
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
                      className="text-muted hover:text-accent transition-colors text-sm font-medium group"
                      {...(link.href.startsWith("http")
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                    >
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
