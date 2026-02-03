"use client";

import React, { useRef, ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  MotionValue,
} from "framer-motion";
import { cn } from "../lib/utils";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  glareEnabled?: boolean;
  scale?: number;
}

interface GlareEffectProps {
  x: MotionValue<number>;
  y: MotionValue<number>;
}

// Glare/shine effect component that moves opposite to tilt
const GlareEffect: React.FC<GlareEffectProps> = ({ x, y }) => {
  // Transform rotation values to glare position (opposite direction)
  const glareX = useTransform(x, [-15, 15], ["80%", "20%"]);
  const glareY = useTransform(y, [-15, 15], ["80%", "20%"]);
  const glareOpacity = useTransform(
    [x, y],
    ([latestX, latestY]: number[]) => {
      const distance = Math.sqrt(latestX ** 2 + latestY ** 2);
      return Math.min(distance / 15, 0.3);
    }
  );

  return (
    <motion.div
      className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]"
      style={{
        opacity: glareOpacity,
      }}
    >
      <motion.div
        className="absolute h-[200%] w-[200%] -translate-x-1/2 -translate-y-1/2"
        style={{
          left: glareX,
          top: glareY,
          background:
            "linear-gradient(135deg, transparent 40%, rgba(255,255,255,0.4) 50%, transparent 60%)",
        }}
      />
    </motion.div>
  );
};

export const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className = "",
  glareEnabled = true,
  scale = 1.02,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  // Raw motion values for mouse position (-0.5 to 0.5)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring configuration for smooth animation
  const springConfig = { stiffness: 300, damping: 30 };

  // Apply spring physics to rotation values
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), springConfig);

  // Dynamic shadow based on tilt direction
  const shadowX = useTransform(mouseX, [-0.5, 0.5], [20, -20]);
  const shadowY = useTransform(mouseY, [-0.5, 0.5], [20, -20]);
  const shadowOpacity = useTransform(
    [mouseX, mouseY],
    ([latestX, latestY]: number[]) => {
      const distance = Math.sqrt((latestX as number) ** 2 + (latestY as number) ** 2);
      return 0.15 + distance * 0.2;
    }
  );

  // Combine shadow values into box-shadow
  const boxShadow = useTransform(
    [shadowX, shadowY, shadowOpacity],
    ([x, y, opacity]) =>
      `${x}px ${(y as number) + 10}px 40px -10px rgba(0, 0, 0, ${opacity})`
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Normalize mouse position relative to card center (-0.5 to 0.5)
    const normalizedX = (e.clientX - centerX) / rect.width;
    const normalizedY = (e.clientY - centerY) / rect.height;

    mouseX.set(normalizedX);
    mouseY.set(normalizedY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      className="relative"
      style={{ perspective: "1000px" }}
    >
      <motion.div
        ref={cardRef}
        className={cn(
          "relative overflow-hidden rounded-xl bg-white will-change-transform",
          className
        )}
        style={{
          rotateX,
          rotateY,
          boxShadow,
          transformStyle: "preserve-3d",
        }}
        whileHover={{ scale }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Card content */}
        <div className="relative z-10">{children}</div>

        {/* Glare effect */}
        {glareEnabled && <GlareEffect x={rotateY} y={rotateX} />}
      </motion.div>
    </div>
  );
};

export default TiltCard;
