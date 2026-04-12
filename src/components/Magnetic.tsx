"use client";

import { useRef, useState, useCallback } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

interface MagneticProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  /** Slight rotation based on offset */
  tilt?: boolean;
  /** Scale up on hover */
  scaleOnHover?: number;
}

export default function Magnetic({
  children,
  className = "",
  strength = 0.3,
  tilt = false,
  scaleOnHover = 1,
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotate = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 250, damping: 20, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 250, damping: 20, mass: 0.5 });
  const springRotate = useSpring(rotate, { stiffness: 250, damping: 20, mass: 0.5 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const offsetX = (e.clientX - rect.left - rect.width / 2) * strength;
      const offsetY = (e.clientY - rect.top - rect.height / 2) * strength;
      x.set(offsetX);
      y.set(offsetY);
      if (tilt) {
        rotate.set((offsetX / rect.width) * 8);
      }
    },
    [strength, tilt, x, y, rotate]
  );

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
    rotate.set(0);
    setIsHovered(false);
  }, [x, y, rotate]);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY, rotate: tilt ? springRotate : 0 }}
      animate={{ scale: isHovered ? scaleOnHover : 1 }}
      transition={{ scale: { type: "spring", stiffness: 300, damping: 20 } }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
}
