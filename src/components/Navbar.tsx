"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Download } from "lucide-react";
import Magnetic from "./Magnetic";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/work", label: "Work" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/process", label: "Process" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

const researchLinks = [
  { href: "/research/forma", label: "Forma" },
  { href: "/research/lokul", label: "Lokul.club" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [researchOpen, setResearchOpen] = useState(false);
  const [mobileResearchOpen, setMobileResearchOpen] = useState(false);

  const isResearchActive = pathname.startsWith("/research/");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setMobileResearchOpen(false);
  }, [pathname]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 pt-4">
      <div
        className={`max-w-7xl mx-auto transition-all duration-500 ${
          scrolled
            ? "bg-background/70 backdrop-blur-2xl border border-border/50 rounded-2xl shadow-lg shadow-primary/5"
            : "bg-transparent"
        }`}
      >
        <div className="px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="group flex items-center gap-2">
              <span className="font-display font-bold text-lg tracking-tight">
                <span className="text-primary group-hover:text-accent transition-colors duration-200">
                  V
                </span>
                <span className="text-accent group-hover:text-primary transition-colors duration-200">
                  C
                </span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.slice(0, 3).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 text-sm font-semibold transition-colors rounded-lg ${
                    pathname === link.href
                      ? "text-primary"
                      : "text-muted hover:text-foreground"
                  }`}
                >
                  {pathname === link.href && (
                    <motion.div
                      layoutId="navbar-active"
                      className="absolute inset-0 bg-accent/10 border border-accent/20 rounded-lg"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </Link>
              ))}

              {/* Research Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setResearchOpen(true)}
                onMouseLeave={() => setResearchOpen(false)}
              >
                <button
                  className={`relative px-4 py-2 text-sm font-semibold transition-colors rounded-lg flex items-center gap-1 ${
                    isResearchActive
                      ? "text-primary"
                      : "text-muted hover:text-foreground"
                  }`}
                >
                  {isResearchActive && (
                    <motion.div
                      layoutId="navbar-active"
                      className="absolute inset-0 bg-accent/10 border border-accent/20 rounded-lg"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10">Research</span>
                  <motion.svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="relative z-10"
                    animate={{ rotate: researchOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </motion.svg>
                </button>
                <AnimatePresence>
                  {researchOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.96 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full right-0 mt-1 w-44 bg-background/95 backdrop-blur-xl border border-border rounded-xl shadow-xl overflow-hidden"
                    >
                      <div className="p-1.5">
                        {researchLinks.map((link) => (
                          <Link
                            key={link.href}
                            href={link.href}
                            className={`flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg transition-colors ${
                              pathname === link.href
                                ? "text-foreground bg-surface-hover"
                                : "text-muted hover:text-foreground hover:bg-surface"
                            }`}
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                            {link.label}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
              </AnimatePresence>
            </div>

            {navLinks.slice(3).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-4 py-2 text-sm font-semibold transition-colors rounded-lg ${
                  pathname === link.href
                    ? "text-primary"
                    : "text-muted hover:text-foreground"
                }`}
              >
                {pathname === link.href && (
                  <motion.div
                    layoutId="navbar-active"
                    className="absolute inset-0 bg-accent/10 border border-accent/20 rounded-lg"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </Link>
            ))}
          </div>

          {/* CTA + Social */}
          <div className="hidden md:flex items-center gap-3">
            {/* Resume Download */}
            <a
              href="/VivekanandChoudhari(UIUX-PM).pdf"
              download="Vivekanand-Choudhari-Resume.pdf"
              className="w-10 h-10 flex items-center justify-center rounded-full border border-border hover:border-accent/30 hover:bg-accent/10 text-muted hover:text-accent transition-all duration-300"
              aria-label="Download Resume"
            >
              <Download size={18} />
            </a>
            
            {/* LinkedIn Icon */}
            <a
              href="https://www.linkedin.com/in/vivekanand-choudhari-817829118/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-full border border-border hover:border-accent/30 hover:bg-accent/10 text-muted hover:text-accent transition-all duration-300"
              aria-label="LinkedIn Profile"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            
            <Magnetic strength={0.4}>
              <Link
                href="/contact"
                className="magnetic-btn relative px-6 py-2.5 bg-accent text-white text-sm font-semibold rounded-full hover:shadow-lg hover:shadow-accent/25 transition-all duration-300 group overflow-hidden"
              >
                <span className="relative z-10">Let&apos;s Talk</span>
                <div className="absolute inset-0 bg-accent/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
            </Magnetic>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden relative w-10 h-10 flex items-center justify-center"
            aria-label="Toggle menu"
          >
            <div className="w-5 flex flex-col gap-1.5">
              <span
                className={`block h-0.5 bg-primary transition-all duration-300 ${
                  isOpen ? "rotate-45 translate-y-2" : ""
                }`}
              />
              <span
                className={`block h-0.5 bg-primary transition-all duration-300 ${
                  isOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-0.5 bg-primary transition-all duration-300 ${
                  isOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-background/95 backdrop-blur-xl border border-border/50 rounded-2xl mt-2 overflow-hidden mx-6 lg:mx-8"
          >
            <div className="px-6 py-4 flex flex-col gap-2">
              {navLinks.slice(0, 3).map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    className={`block px-4 py-3 rounded-lg text-base font-semibold transition-colors ${
                      pathname === link.href
                        ? "text-primary bg-accent/10 border border-accent/20"
                        : "text-muted hover:text-foreground hover:bg-surface"
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              {/* Mobile Research */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 3 * 0.05 }}
              >
                <button
                  onClick={() => setMobileResearchOpen(!mobileResearchOpen)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-base font-semibold transition-colors ${
                    isResearchActive
                      ? "text-primary bg-accent/10 border border-accent/20"
                      : "text-muted hover:text-foreground hover:bg-surface"
                  }`}
                >
                  <span>Research</span>
                  <motion.svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    animate={{ rotate: mobileResearchOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </motion.svg>
                </button>
                <AnimatePresence>
                  {mobileResearchOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="pl-6 flex flex-col gap-1 pb-2">
                        {researchLinks.map((link) => (
                          <Link
                            key={link.href}
                            href={link.href}
                            className={`block px-4 py-2.5 rounded-lg text-base font-medium transition-colors ${
                              pathname === link.href
                                ? "text-foreground bg-surface-hover"
                                : "text-muted hover:text-foreground hover:bg-surface"
                            }`}
                          >
                            {link.label}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {navLinks.slice(3).map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (4 + i) * 0.05 }}
                >
                  <Link
                    href={link.href}
                    className={`block px-4 py-3 rounded-lg text-base font-semibold transition-colors ${
                      pathname === link.href
                        ? "text-primary bg-accent/10 border border-accent/20"
                        : "text-muted hover:text-foreground hover:bg-surface"
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              {/* Mobile Resume Download */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.05 }}
                className="mt-2"
              >
                <a
                  href="/VivekanandChoudhari(UIUX-PM).pdf"
                  download="Vivekanand-Choudhari-Resume.pdf"
                  className="flex items-center justify-center gap-2 px-4 py-3 border border-accent/30 text-accent text-center rounded-full font-semibold hover:bg-accent/10 transition-colors"
                >
                  <Download size={18} />
                  Download Resume
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: (navLinks.length + 1) * 0.05 }}
                className="mt-2"
              >
                <Link
                  href="/contact"
                  className="block px-4 py-3 bg-accent text-white text-center rounded-full font-semibold"
                >
                  Let&apos;s Talk
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      </div>
    </nav>
  );
}
