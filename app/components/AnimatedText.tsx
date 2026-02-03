"use client";

import React, { useEffect, useState, useCallback } from "react";
import { motion, Variants, Transition } from "framer-motion";

// ============================================
// Types
// ============================================

type AnimationType = "fadeUp" | "fadeIn" | "scaleIn" | "rotateIn";

interface SplitTextProps {
  children: string;
  animation?: AnimationType;
  staggerDelay?: number;
  initialDelay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
}

interface TypewriterTextProps {
  text: string;
  speed?: number;
  cursor?: boolean;
  cursorBlinkSpeed?: number;
  cursorChar?: string;
  className?: string;
  onComplete?: () => void;
  once?: boolean;
}

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  animate?: boolean;
  speed?: number;
}

interface RevealTextProps {
  children: string;
  direction?: "left" | "right" | "up" | "down";
  staggerLines?: boolean;
  lineDelay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
}

// ============================================
// Animation Variants
// ============================================

const animationVariants: Record<AnimationType, { hidden: Record<string, number>; visible: Record<string, number> }> = {
  fadeUp: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { opacity: 1, scale: 1 },
  },
  rotateIn: {
    hidden: { opacity: 0, rotate: -180, scale: 0.5 },
    visible: { opacity: 1, rotate: 0, scale: 1 },
  },
};

// ============================================
// SplitText Component
// ============================================

/**
 * Splits text into individual letters with stagger animation.
 * Each letter animates in with configurable delay and animation type.
 */
export const SplitText: React.FC<SplitTextProps> = ({
  children,
  animation = "fadeUp",
  staggerDelay = 0.05,
  initialDelay = 0,
  duration = 0.4,
  className = "",
  once = true,
}) => {
  const letters = children.split("");
  const selectedVariant = animationVariants[animation];

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: initialDelay,
      },
    },
  };

  const letterVariants: Variants = {
    hidden: selectedVariant.hidden,
    visible: {
      ...selectedVariant.visible,
      transition: {
        duration,
        ease: [0.25, 0.1, 0.25, 1] as const,
      },
    },
  };

  return (
    <motion.span
      className={`inline-block ${className}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once }}
      aria-label={children}
    >
      {letters.map((letter, index) => (
        <motion.span
          key={`${letter}-${index}`}
          variants={letterVariants}
          className="inline-block"
          style={{ whiteSpace: letter === " " ? "pre" : "normal" }}
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.span>
  );
};

// ============================================
// TypewriterText Component
// ============================================

/**
 * Types out text character by character with optional cursor blink.
 * Configurable typing speed and completion callback.
 */
export const TypewriterText: React.FC<TypewriterTextProps> = ({
  text,
  speed = 50,
  cursor = true,
  cursorBlinkSpeed = 530,
  cursorChar = "|",
  className = "",
  onComplete,
  once = true,
}) => {
  const [displayText, setDisplayText] = useState("");
  const [showCursor, setShowCursor] = useState(cursor);
  const [isInView, setIsInView] = useState(!once);
  const [isComplete, setIsComplete] = useState(false);

  // Cursor blink effect
  useEffect(() => {
    if (!cursor) return;

    const blinkInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, cursorBlinkSpeed);

    return () => clearInterval(blinkInterval);
  }, [cursor, cursorBlinkSpeed]);

  // Typing effect
  useEffect(() => {
    if (!isInView || isComplete) return;

    if (displayText.length < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(text.slice(0, displayText.length + 1));
      }, speed);

      return () => clearTimeout(timeout);
    } else {
      setIsComplete(true);
      onComplete?.();
    }
  }, [displayText, isInView, isComplete, text, speed, onComplete]);

  const handleInView = useCallback(
    (inView: boolean) => {
      if (inView && !isInView) {
        setIsInView(true);
      }
    },
    [isInView]
  );

  return (
    <motion.span
      className={`inline-block ${className}`}
      onViewportEnter={() => handleInView(true)}
      viewport={{ once }}
    >
      <span>{displayText}</span>
      {cursor && (
        <motion.span
          className="inline-block"
          animate={{ opacity: showCursor ? 1 : 0 }}
          transition={{ duration: 0.1 }}
          aria-hidden="true"
        >
          {cursorChar}
        </motion.span>
      )}
    </motion.span>
  );
};

// ============================================
// GradientText Component
// ============================================

/**
 * Text with animated gradient background (gold to amber shimmer effect).
 * Uses background-clip: text for gradient text effect.
 */
export const GradientText: React.FC<GradientTextProps> = ({
  children,
  className = "",
  animate = true,
  speed = 3,
}) => {
  const gradientAnimation: Transition = {
    duration: speed,
    ease: "linear",
    repeat: Infinity,
    repeatType: "reverse",
  };

  return (
    <motion.span
      className={`inline-block bg-clip-text text-transparent ${className}`}
      style={{
        backgroundImage: animate
          ? "linear-gradient(90deg, #DD9933 0%, #F5C542 25%, #FFD700 50%, #F5C542 75%, #DD9933 100%)"
          : "linear-gradient(90deg, #DD9933 0%, #FFD700 100%)",
        backgroundSize: animate ? "200% 100%" : "100% 100%",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
      }}
      animate={
        animate
          ? {
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }
          : undefined
      }
      transition={animate ? gradientAnimation : undefined}
    >
      {children}
    </motion.span>
  );
};

// ============================================
// RevealText Component
// ============================================

/**
 * Text reveals from behind a mask that slides away or fades.
 * Supports staggered line reveals for paragraphs.
 */
export const RevealText: React.FC<RevealTextProps> = ({
  children,
  direction = "left",
  staggerLines = false,
  lineDelay = 0.2,
  duration = 0.6,
  className = "",
  once = true,
}) => {
  const lines = staggerLines ? children.split("\n") : [children];

  const getMaskAnimation = () => {
    switch (direction) {
      case "left":
        return { x: ["0%", "-100%"], opacity: [1, 0] };
      case "right":
        return { x: ["0%", "100%"], opacity: [1, 0] };
      case "up":
        return { y: ["0%", "-100%"], opacity: [1, 0] };
      case "down":
        return { y: ["0%", "100%"], opacity: [1, 0] };
      default:
        return { opacity: [1, 0] };
    }
  };

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerLines ? lineDelay : 0,
      },
    },
  };

  const lineVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.1,
      },
    },
  };

  return (
    <motion.span
      className={`inline-flex flex-col ${className}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once }}
    >
      {lines.map((line, lineIndex) => (
        <motion.span
          key={lineIndex}
          variants={lineVariants}
          className="relative inline-block overflow-hidden"
        >
          {/* Text content */}
          <span className="relative z-10">{line}</span>
          
          {/* Reveal mask */}
          <motion.span
            className="absolute inset-0 z-20 bg-black"
            initial={{ opacity: 1, x: 0, y: 0 }}
            whileInView={getMaskAnimation()}
            viewport={{ once }}
            transition={{
              duration,
              delay: lineIndex * lineDelay,
              ease: [0.25, 0.1, 0.25, 1] as const,
            }}
            aria-hidden="true"
          />
        </motion.span>
      ))}
    </motion.span>
  );
};

// ============================================
// Combined Exports
// ============================================

export default {
  SplitText,
  TypewriterText,
  GradientText,
  RevealText,
};
