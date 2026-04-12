"use client";

import { useRef, useState, useEffect } from "react";
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
  const isFirstNavigation = useRef(true);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  // On the very first server render + hydration, render children
  // without any motion wrapper to avoid hydration mismatch.
  if (!hasMounted) {
    return <div>{children}</div>;
  }

  // First client-side mount: skip entrance animation
  if (isFirstNavigation.current) {
    isFirstNavigation.current = false;
    return (
      <motion.div key={pathname} animate="enter" variants={variants}>
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      key={pathname}
      initial="hidden"
      animate="enter"
      exit="exit"
      variants={variants}
      transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  );
}
