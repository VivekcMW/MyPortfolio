"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

const variants = {
  hidden: {
    opacity: 0,
    y: 20,
    filter: "blur(4px)",
  },
  enter: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
  },
  exit: {
    opacity: 0,
    y: -20,
    filter: "blur(4px)",
  },
};

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [hasMounted, setHasMounted] = useState(false);
  // Captured once on first render — used to detect the very first page
  // (no entrance animation) vs. a subsequent client-side navigation
  // (animate in). Comparing against state avoids mutating refs during render.
  const [initialPathname] = useState(() => pathname);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  // On the very first server render + hydration, render children
  // without any motion wrapper to avoid hydration mismatch.
  if (!hasMounted) {
    return <div>{children}</div>;
  }

  const isFirstPage = pathname === initialPathname;

  return (
    <motion.div
      key={pathname}
      initial={isFirstPage ? false : "hidden"}
      animate="enter"
      exit="exit"
      variants={variants}
      transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  );
}
