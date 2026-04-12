"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CursorGlow() {
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [isTouch, setIsTouch] = useState(true);
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const ringX = useSpring(cursorX, { stiffness: 150, damping: 20 });
  const ringY = useSpring(cursorY, { stiffness: 150, damping: 20 });

  useEffect(() => {
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    setIsTouch(isTouchDevice);
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setVisible(true);
    };

    const handleMouseLeave = () => setVisible(false);

    const handleHoverStart = () => setHovering(true);
    const handleHoverEnd = () => setHovering(false);

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    // Listen for hover on interactive elements
    const addHoverListeners = () => {
      const interactives = document.querySelectorAll("a, button, [role='button'], input, textarea, .magnetic-btn");
      interactives.forEach((el) => {
        el.addEventListener("mouseenter", handleHoverStart);
        el.addEventListener("mouseleave", handleHoverEnd);
      });
      return interactives;
    };

    // Observe DOM for dynamically added elements
    const observer = new MutationObserver(() => addHoverListeners());
    observer.observe(document.body, { childList: true, subtree: true });
    const initial = addHoverListeners();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      observer.disconnect();
      initial.forEach((el) => {
        el.removeEventListener("mouseenter", handleHoverStart);
        el.removeEventListener("mouseleave", handleHoverEnd);
      });
    };
  }, [cursorX, cursorY]);

  if (isTouch) {
    return null;
  }

  return (
    <>
      {/* Small dot */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-9999 hidden md:block rounded-full bg-accent"
        style={{
          x: cursorX,
          y: cursorY,
          width: 6,
          height: 6,
          translateX: "-50%",
          translateY: "-50%",
          opacity: visible ? 1 : 0,
        }}
      />
      {/* Trailing ring */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-9998 hidden md:block rounded-full border border-accent/40"
        animate={{
          width: hovering ? 48 : 32,
          height: hovering ? 48 : 32,
          borderColor: hovering ? "color-mix(in srgb, var(--color-accent) 60%, transparent)" : "color-mix(in srgb, var(--color-accent) 30%, transparent)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: visible ? 1 : 0,
        }}
      />
    </>
  );
}
