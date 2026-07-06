"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

export default function SmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    // Respect the OS reduced-motion setting: fall back to native scrolling.
    if (globalThis.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
      anchors: true, // smooth-scroll #hash links (stage rail, skip link targets)
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Lenis caches the scroll limit; content that grows after mount
    // (entrance animations, fonts, lazy sections) leaves the cap stale and
    // the page can't scroll to the footer. Re-measure on any body resize.
    const resizeObserver = new ResizeObserver(() => {
      lenis.resize();
    });
    resizeObserver.observe(document.body);

    return () => {
      resizeObserver.disconnect();
      lenis.destroy();
    };
  }, []);

  // Route changes swap the entire page content — re-measure after paint.
  useEffect(() => {
    const id = setTimeout(() => lenisRef.current?.resize(), 400);
    return () => clearTimeout(id);
  }, [pathname]);

  return null;
}
