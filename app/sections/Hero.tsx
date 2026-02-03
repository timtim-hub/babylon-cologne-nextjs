"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { ChevronDown, Instagram, MessageCircle } from "lucide-react";

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  twinkleSpeed: number;
  twinklePhase: number;
}

interface OrbProps {
  size: number;
  initialX: string;
  initialY: string;
  duration: number;
  delay: number;
  blur?: number;
}

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

// ============================================================================
// PARTICLE SYSTEM
// ============================================================================

const ParticleCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0, y: 0 });

  const initParticles = useCallback((width: number, height: number) => {
    const particleCount = Math.min(Math.floor((width * height) / 15000), 60);
    particlesRef.current = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 0.5,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: (Math.random() - 0.5) * 0.3 - 0.1,
      opacity: Math.random() * 0.6 + 0.2,
      twinkleSpeed: Math.random() * 0.02 + 0.01,
      twinklePhase: Math.random() * Math.PI * 2,
    }));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
      initParticles(window.innerWidth, window.innerHeight);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    let frameCount = 0;
    const animate = () => {
      frameCount++;
      // Render every 2nd frame for performance (30fps)
      if (frameCount % 2 === 0) {
        ctx.clearRect(0, 0, canvas.width / (window.devicePixelRatio || 1), canvas.height / (window.devicePixelRatio || 1));

        particlesRef.current.forEach((particle) => {
          // Update position with gentle floating
          particle.x += particle.speedX;
          particle.y += particle.speedY;

          // Subtle mouse interaction (only process every 5th particle for performance)
          const dx = mouseRef.current.x - particle.x;
          const dy = mouseRef.current.y - particle.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150 && particle.size > 1.5) {
            particle.x -= dx * 0.002;
            particle.y -= dy * 0.002;
          }

          // Wrap around screen
          if (particle.x < 0) particle.x = window.innerWidth;
          if (particle.x > window.innerWidth) particle.x = 0;
          if (particle.y < 0) particle.y = window.innerHeight;
          if (particle.y > window.innerHeight) particle.y = 0;

          // Twinkle effect
          particle.twinklePhase += particle.twinkleSpeed;
          const twinkle = Math.sin(particle.twinklePhase) * 0.3 + 0.7;
          const currentOpacity = particle.opacity * twinkle;

          // Draw particle with glow
          const gradient = ctx.createRadialGradient(
            particle.x, particle.y, 0,
            particle.x, particle.y, particle.size * 3
          );
          gradient.addColorStop(0, `rgba(221, 153, 51, ${currentOpacity})`);
          gradient.addColorStop(0.4, `rgba(221, 153, 51, ${currentOpacity * 0.3})`);
          gradient.addColorStop(1, "rgba(221, 153, 51, 0)");

          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size * 3, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.fill();

          // Core
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 200, 100, ${currentOpacity})`;
          ctx.fill();
        });
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationRef.current);
    };
  }, [initParticles]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-10"
      style={{ willChange: "transform" }}
    />
  );
};

// ============================================================================
// AMBIENT ORBS
// ============================================================================

const AmbientOrb: React.FC<OrbProps> = ({ size, initialX, initialY, duration, delay, blur = 100 }) => (
  <motion.div
    className="absolute rounded-full pointer-events-none"
    style={{
      width: size,
      height: size,
      background: `radial-gradient(circle, rgba(221, 153, 51, 0.4) 0%, rgba(221, 153, 51, 0.1) 40%, transparent 70%)`,
      filter: `blur(${blur}px)`,
      left: initialX,
      top: initialY,
      willChange: "transform",
    }}
    animate={{
      x: [0, 50, -30, 20, 0],
      y: [0, -40, 30, -20, 0],
      scale: [1, 1.1, 0.95, 1.05, 1],
      opacity: [0.6, 0.8, 0.5, 0.7, 0.6],
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
);

// ============================================================================
// MAGNETIC BUTTON
// ============================================================================

const MagneticButton: React.FC<MagneticButtonProps> = ({ children, className = "", onClick }) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distX = (e.clientX - centerX) * 0.15;
    const distY = (e.clientY - centerY) * 0.15;
    setPosition({ x: distX, y: distY });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.button
      ref={buttonRef}
      className={`relative overflow-hidden group ${className}`}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 350, damping: 20, mass: 0.5 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Shimmer effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
        initial={{ x: "-200%" }}
        whileHover={{ x: "200%" }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      />
      {/* Glow effect */}
      <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_center,rgba(221,153,51,0.4)_0%,transparent_70%)] blur-xl" />
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
};

// ============================================================================
// SOCIAL ICON
// ============================================================================

const SocialIcon: React.FC<{ href: string; icon: React.ReactNode; label: string }> = ({ href, icon, label }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className="relative p-3 rounded-full border border-[#DD9933]/30 text-[#DD9933]/80 transition-colors duration-300 hover:text-[#DD9933] hover:border-[#DD9933]/60 group"
    whileHover={{ scale: 1.1, y: -2 }}
    whileTap={{ scale: 0.95 }}
  >
    {/* Glow effect on hover */}
    <div className="absolute inset-0 rounded-full bg-[#DD9933]/0 group-hover:bg-[#DD9933]/10 transition-colors duration-300 blur-md" />
    <span className="relative z-10">{icon}</span>
  </motion.a>
);

// ============================================================================
// TEXT ANIMATION COMPONENTS
// ============================================================================

const GoldShimmerText: React.FC<{ children: React.ReactNode; className?: string; delay?: number }> = ({
  children,
  className = "",
  delay = 0,
}) => (
  <motion.span
    className={`relative inline-block bg-gradient-to-r from-[#DD9933] via-[#FFD700] via-[#F4E4BC] via-[#FFD700] to-[#DD9933] bg-[length:200%_100%] bg-clip-text text-transparent ${className}`}
    initial={{ backgroundPosition: "200% 0" }}
    animate={{ backgroundPosition: ["200% 0", "-200% 0"] }}
    transition={{
      duration: 4,
      delay,
      repeat: Infinity,
      ease: "linear",
    }}
    style={{ willChange: "background-position" }}
  >
    {children}
  </motion.span>
);

const LetterByLetter: React.FC<{ text: string; className?: string; delay?: number }> = ({
  text,
  className = "",
  delay = 0,
}) => {
  const letters = text.split("");

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: delay,
      },
    },
  };

  const child = {
    hidden: {
      opacity: 0,
      y: 50,
      rotateX: -90,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring" as const,
        damping: 15,
        stiffness: 200,
      },
    },
  };

  return (
    <motion.span
      className={`inline-flex flex-wrap justify-center ${className}`}
      variants={container}
      initial="hidden"
      animate="visible"
      style={{ perspective: "1000px" }}
    >
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          variants={child}
          className="inline-block"
          style={{ transformStyle: "preserve-3d" }}
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.span>
  );
};

// ============================================================================
// SCROLL INDICATOR
// ============================================================================

const ScrollIndicator: React.FC = () => (
  <motion.div
    className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-30"
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 2.5, duration: 0.8 }}
  >
    <span className="text-[#DD9933]/60 text-xs tracking-[0.3em] uppercase font-light">
      Entdecken
    </span>
    <motion.div
      animate={{ y: [0, 8, 0] }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <ChevronDown className="w-5 h-5 text-[#DD9933]/60" />
    </motion.div>
  </motion.div>
);

// ============================================================================
// MAIN HERO COMPONENT
// ============================================================================

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Parallax transforms
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Smooth spring for parallax
  const smoothBackgroundY = useSpring(backgroundY, { stiffness: 100, damping: 30 });
  const smoothContentY = useSpring(contentY, { stiffness: 100, damping: 30 });

  const handleCTAClick = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden bg-[#0a0a0a]"
    >
      {/* =====================================================================
          ANIMATED GRADIENT MESH BACKGROUND
      ===================================================================== */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: smoothBackgroundY }}
      >
        {/* Base dark gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0d0d0d] to-[#0a0a0a]" />

        {/* Animated gradient mesh */}
        <div
          className="absolute inset-0 opacity-60"
          style={{
            background: `
              radial-gradient(ellipse 80% 50% at 20% 40%, rgba(139, 90, 43, 0.3) 0%, transparent 50%),
              radial-gradient(ellipse 60% 40% at 80% 60%, rgba(221, 153, 51, 0.2) 0%, transparent 50%),
              radial-gradient(ellipse 50% 60% at 50% 80%, rgba(139, 69, 19, 0.25) 0%, transparent 50%),
              radial-gradient(ellipse 40% 30% at 30% 20%, rgba(221, 153, 51, 0.15) 0%, transparent 50%)
            `,
            animation: "meshMove 20s ease-in-out infinite",
          }}
        />

        {/* Secondary animated layer */}
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background: `
              radial-gradient(ellipse 60% 40% at 70% 30%, rgba(221, 153, 51, 0.25) 0%, transparent 50%),
              radial-gradient(ellipse 50% 50% at 30% 70%, rgba(139, 90, 43, 0.2) 0%, transparent 50%)
            `,
            animation: "meshMove 15s ease-in-out infinite reverse",
          }}
        />

        {/* CSS Keyframes for mesh animation */}
        <style jsx>{`
          @keyframes meshMove {
            0%, 100% {
              transform: translate(0, 0) scale(1);
            }
            25% {
              transform: translate(2%, -2%) scale(1.05);
            }
            50% {
              transform: translate(-1%, 3%) scale(1.02);
            }
            75% {
              transform: translate(-2%, -1%) scale(1.03);
            }
          }
        `}</style>
      </motion.div>

      {/* =====================================================================
          AMBIENT GLOWING ORBS
      ===================================================================== */}
      <div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none">
        <AmbientOrb size={400} initialX="10%" initialY="20%" duration={25} delay={0} blur={80} />
        <AmbientOrb size={300} initialX="70%" initialY="60%" duration={20} delay={5} blur={60} />
        <AmbientOrb size={500} initialX="80%" initialY="10%" duration={30} delay={2} blur={100} />
        <AmbientOrb size={250} initialX="30%" initialY="70%" duration={22} delay={8} blur={70} />
        <AmbientOrb size={350} initialX="50%" initialY="40%" duration={28} delay={3} blur={90} />
      </div>

      {/* =====================================================================
          FLOATING PARTICLES
      ===================================================================== */}
      <ParticleCanvas />

      {/* =====================================================================
          VIGNETTE EFFECT
      ===================================================================== */}
      <div
        className="absolute inset-0 z-[5] pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 80% 80% at 50% 50%, transparent 0%, transparent 40%, rgba(10, 10, 10, 0.4) 70%, rgba(10, 10, 10, 0.9) 100%),
            radial-gradient(ellipse 100% 100% at 50% 50%, transparent 0%, transparent 50%, rgba(10, 10, 10, 0.3) 100%)
          `,
        }}
      />

      {/* =====================================================================
          MAIN CONTENT
      ===================================================================== */}
      <motion.div
        className="relative z-20 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8"
        style={{ y: smoothContentY, opacity }}
      >
        {/* Content wrapper */}
        <div className="max-w-5xl mx-auto text-center">
          
          {/* ---------------------------------------------------------------
              PRETITLE: "Willkommen im"
          --------------------------------------------------------------- */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mb-4"
          >
            <span className="text-[#DD9933]/80 text-lg sm:text-xl md:text-2xl font-light tracking-[0.2em] uppercase">
              Willkommen im
            </span>
          </motion.div>

          {/* ---------------------------------------------------------------
              MAIN TITLE: "GAY SAUNA PARADIES"
          --------------------------------------------------------------- */}
          <h1 className="mb-6">
            <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tight leading-[0.9]">
              <GoldShimmerText delay={1}>
                <LetterByLetter text="GAY SAUNA" delay={0.6} />
              </GoldShimmerText>
            </span>
            <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tight leading-[0.9] mt-2">
              <GoldShimmerText delay={1.5}>
                <LetterByLetter text="PARADIES" delay={1.2} />
              </GoldShimmerText>
            </span>
          </h1>

          {/* ---------------------------------------------------------------
              SUBTITLE with Typewriter Effect
          --------------------------------------------------------------- */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 0.5 }}
            className="mb-10"
          >
            <TypewriterText 
              text="Köln's exklusiver Rückzugsort für Männer" 
              delay={2.2}
              className="text-[#F4E4BC]/70 text-lg sm:text-xl md:text-2xl font-light tracking-wide"
            />
          </motion.div>

          {/* ---------------------------------------------------------------
              CTA BUTTON
          --------------------------------------------------------------- */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.8, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mb-12"
          >
            <MagneticButton
              onClick={handleCTAClick}
              className="px-10 py-4 sm:px-12 sm:py-5 bg-gradient-to-r from-[#DD9933] via-[#C4842B] to-[#DD9933] bg-[length:200%_100%] text-[#0a0a0a] font-bold text-base sm:text-lg tracking-[0.15em] uppercase rounded-full shadow-[0_0_40px_rgba(221,153,51,0.3)] hover:shadow-[0_0_60px_rgba(221,153,51,0.5)] transition-shadow duration-500"
            >
              Jetzt Entdecken
            </MagneticButton>
          </motion.div>

          {/* ---------------------------------------------------------------
              SOCIAL ICONS
          --------------------------------------------------------------- */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.2, duration: 0.8 }}
            className="flex items-center justify-center gap-4"
          >
            <SocialIcon 
              href="https://instagram.com" 
              icon={<Instagram className="w-5 h-5" />} 
              label="Instagram"
            />
            <SocialIcon 
              href="https://twitter.com" 
              icon={<MessageCircle className="w-5 h-5" />} 
              label="Twitter"
            />
          </motion.div>
        </div>
      </motion.div>

      {/* =====================================================================
          SCROLL INDICATOR
      ===================================================================== */}
      <ScrollIndicator />

      {/* =====================================================================
          DECORATIVE ELEMENTS
      ===================================================================== */}
      {/* Top border glow */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#DD9933]/50 to-transparent z-30" />
      
      {/* Corner accents */}
      <div className="absolute top-8 left-8 w-16 h-16 border-l border-t border-[#DD9933]/30 z-30" />
      <div className="absolute top-8 right-8 w-16 h-16 border-r border-t border-[#DD9933]/30 z-30" />
    </section>
  );
};

// ============================================================================
// TYPEWRITER COMPONENT
// ============================================================================

const TypewriterText: React.FC<{ text: string; delay?: number; className?: string }> = ({
  text,
  delay = 0,
  className = "",
}) => {
  const [displayText, setDisplayText] = useState("");
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      setHasStarted(true);
    }, delay * 1000);

    return () => clearTimeout(startTimeout);
  }, [delay]);

  useEffect(() => {
    if (!hasStarted) return;

    let index = 0;
    const interval = setInterval(() => {
      if (index <= text.length) {
        setDisplayText(text.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [hasStarted, text]);

  return (
    <span className={className}>
      {displayText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
        className="inline-block w-[2px] h-[1em] bg-[#DD9933]/60 ml-1 align-middle"
      />
    </span>
  );
};

export default Hero;
