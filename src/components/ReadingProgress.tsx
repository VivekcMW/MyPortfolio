"use client";

import { useState } from "react";
import { motion, useMotionValueEvent, useScroll, useSpring } from "framer-motion";

export default function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const [percentage, setPercentage] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const nextPercentage = Math.min(100, Math.max(0, Math.round(latest * 100)));
    setPercentage(nextPercentage);
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-0.5 bg-accent origin-left z-50"
        style={{ scaleX: smoothProgress }}
      />
      <div className="fixed top-24 right-5 sm:right-8 z-40 rounded-full border border-border bg-surface/90 backdrop-blur px-3 py-1.5 text-xs font-mono text-muted">
        {percentage}%
      </div>
    </>
  );
}
