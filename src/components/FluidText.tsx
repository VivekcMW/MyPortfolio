"use client";

import { useRef, useEffect, useState, useCallback } from "react";

interface FluidTextProps {
  text: string;
  className?: string;
  minWeight?: number;
  maxWeight?: number;
  radius?: number;
}

export default function FluidText({
  text,
  className = "",
  minWeight = 300,
  maxWeight = 900,
  radius = 120,
}: FluidTextProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const mousePos = useRef({ x: -1000, y: -1000 });
  const rafId = useRef<number>(0);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const updateWeights = useCallback(() => {
    const letters = letterRefs.current;
    const mx = mousePos.current.x;
    const my = mousePos.current.y;

    for (let i = 0; i < letters.length; i++) {
      const el = letters[i];
      if (!el) continue;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dist = Math.sqrt((mx - cx) ** 2 + (my - cy) ** 2);
      const t = Math.max(0, 1 - dist / radius);
      const weight = Math.round(minWeight + t * (maxWeight - minWeight));
      el.style.fontWeight = String(weight);
    }

    rafId.current = requestAnimationFrame(updateWeights);
  }, [minWeight, maxWeight, radius]);

  useEffect(() => {
    if (!hasMounted) return;

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseLeave = () => {
      mousePos.current = { x: -1000, y: -1000 };
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    rafId.current = requestAnimationFrame(updateWeights);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(rafId.current);
    };
  }, [hasMounted, updateWeights]);

  return (
    <span ref={containerRef} className={className}>
      {text.split("").map((char, i) => (
        <span
          key={`${char}-${i}`}
          ref={(el) => { letterRefs.current[i] = el; }}
          className="inline-block transition-[font-weight] duration-100"
          style={{ fontWeight: minWeight }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}
