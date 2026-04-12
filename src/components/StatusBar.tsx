"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function StatusBar() {
  const [time, setTime] = useState("");
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    const update = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      );
    };
    update();
    const interval = setInterval(update, 10_000);
    return () => clearInterval(interval);
  }, []);

  if (!hasMounted) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 2, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40"
      >
        <div className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-surface/90 border border-border backdrop-blur-md shadow-lg shadow-black/10">
          {/* Green pulse */}
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
          </span>

          <span className="text-xs font-medium text-foreground/80">
            Mumbai, India
          </span>

          <span className="text-border">·</span>

          <span className="text-xs font-mono text-muted tabular-nums">
            {time}
          </span>

          <span className="text-border">·</span>

          <span className="text-xs font-medium text-green-400">
            Available for work
          </span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
