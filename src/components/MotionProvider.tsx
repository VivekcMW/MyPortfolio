"use client";

import { MotionConfig } from "framer-motion";
import { ReactNode } from "react";

/**
 * Global motion policy: every Framer Motion animation in the tree
 * automatically respects the user's OS-level "reduce motion" setting.
 */
export default function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
