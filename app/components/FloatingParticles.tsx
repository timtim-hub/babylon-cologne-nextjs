'use client';

import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
  targetOpacity: number;
  blur: number;
  fadeIn: boolean;
  fadeSpeed: number;
}

export default function FloatingParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const isActiveRef = useRef(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();

    // Initialize particles
    const particleCount = Math.min(35, Math.floor(window.innerWidth / 40));
    
    const createParticle = (startAtBottom = true): Particle => {
      const x = Math.random() * canvas.width;
      const y = startAtBottom 
        ? canvas.height + Math.random() * 100 
        : Math.random() * canvas.height;
      
      return {
        x,
        y,
        size: 2 + Math.random() * 4, // 2px to 6px
        speedY: 0.3 + Math.random() * 0.5, // Slow upward float
        speedX: (Math.random() - 0.5) * 0.3, // Slight horizontal drift
        opacity: 0,
        targetOpacity: 0.3 + Math.random() * 0.5, // 0.3 to 0.8
        blur: Math.random() * 2,
        fadeIn: true,
        fadeSpeed: 0.005 + Math.random() * 0.01,
      };
    };

    // Initialize with particles scattered across screen
    particlesRef.current = Array.from({ length: particleCount }, () => 
      createParticle(false)
    );
    // Set initial opacity for existing particles
    particlesRef.current.forEach(p => {
      p.opacity = Math.random() * p.targetOpacity;
    });

    const drawParticle = (p: Particle) => {
      ctx.save();
      
      // Apply blur
      ctx.filter = `blur(${p.blur}px)`;
      
      // Create glow effect
      const gradient = ctx.createRadialGradient(
        p.x, p.y, 0,
        p.x, p.y, p.size * 2
      );
      gradient.addColorStop(0, `rgba(221, 153, 51, ${p.opacity})`);
      gradient.addColorStop(0.5, `rgba(221, 153, 51, ${p.opacity * 0.5})`);
      gradient.addColorStop(1, `rgba(221, 153, 51, 0)`);
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
      ctx.fill();
      
      // Core particle
      ctx.filter = 'none';
      ctx.fillStyle = `rgba(221, 153, 51, ${p.opacity})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.restore();
    };

    const updateParticle = (p: Particle) => {
      // Move particle
      p.y -= p.speedY;
      p.x += p.speedX;

      // Horizontal drift oscillation
      p.speedX += (Math.random() - 0.5) * 0.02;
      p.speedX = Math.max(-0.5, Math.min(0.5, p.speedX));

      // Fade logic
      if (p.fadeIn) {
        p.opacity += p.fadeSpeed;
        if (p.opacity >= p.targetOpacity) {
          p.opacity = p.targetOpacity;
          p.fadeIn = false;
        }
      }

      // Check if particle reached top
      const fadeOutThreshold = 100;
      if (p.y < fadeOutThreshold) {
        p.opacity -= p.fadeSpeed * 2;
      }

      // Reset particle if it goes off screen or fades out completely
      if (p.y < -p.size * 2 || p.opacity <= 0 && !p.fadeIn) {
        p.y = canvas.height + p.size * 2;
        p.x = Math.random() * canvas.width;
        p.opacity = 0;
        p.fadeIn = true;
        p.speedY = 0.3 + Math.random() * 0.5;
        p.speedX = (Math.random() - 0.5) * 0.3;
      }

      // Wrap horizontal movement
      if (p.x < -p.size * 2) p.x = canvas.width + p.size * 2;
      if (p.x > canvas.width + p.size * 2) p.x = -p.size * 2;
    };

    let lastTime = 0;
    const animate = (currentTime: number) => {
      if (!isActiveRef.current) return;
      
      // Throttle to ~60fps
      if (currentTime - lastTime < 16) {
        animationFrameRef.current = requestAnimationFrame(animate);
        return;
      }
      lastTime = currentTime;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach(particle => {
        updateParticle(particle);
        drawParticle(particle);
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // Start animation
    animationFrameRef.current = requestAnimationFrame(animate);

    // Handle resize
    const handleResize = () => {
      resizeCanvas();
      // Adjust particle count based on screen size
      const newCount = Math.min(35, Math.floor(window.innerWidth / 40));
      while (particlesRef.current.length < newCount) {
        particlesRef.current.push(createParticle(true));
      }
      if (particlesRef.current.length > newCount) {
        particlesRef.current = particlesRef.current.slice(0, newCount);
      }
    };

    // Handle visibility change
    const handleVisibilityChange = () => {
      if (document.hidden) {
        isActiveRef.current = false;
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      } else {
        isActiveRef.current = true;
        animationFrameRef.current = requestAnimationFrame(animate);
      }
    };

    window.addEventListener('resize', handleResize);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      isActiveRef.current = false;
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
      style={{
        background: 'transparent',
      }}
      aria-hidden="true"
    />
  );
}
