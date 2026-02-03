"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { Section } from "../components";

interface Facility {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
}

const facilities: Facility[] = [
  {
    id: 1,
    title: "AUSSENBEREICH",
    subtitle: "Mediterranes Flair",
    description:
      "Von unserer Bar aus gelangst Du direkt zu unserem großzügigen Innenhof. Als einzige Sauna in Köln kannst Du hier in unserem über 10m langen Außenpool Bahnen ziehen und nach Aufgüssen die passende Abkühlung finden.",
    image: "/images/aussenbereich.jpg",
  },
  {
    id: 2,
    title: "FINNISCHE SAUNA",
    subtitle: "Klassische Aufgüsse",
    description:
      "Im Hinterhaus findest Du unsere großzügige finnische Sauna mit Platz für bis zu 50 Personen. Mit ihrem fantastischem Blick über den gesamten Innenhof ein absolutes Highlight.",
    image: "/images/finnische-sauna.jpg",
  },
  {
    id: 3,
    title: "DAMPFSAUNA",
    subtitle: "Größte Kölns",
    description:
      "Unsere Dampfsauna ist nicht nur die größte Kölns, sie bietet mit ihren Gängen und Labyrinthen auch eine ganze Menge zu entdecken. Begib Dich auf eine Entdeckungsreise.",
    image: "/images/dampfsauna.jpg",
  },
  {
    id: 4,
    title: "WHIRLPOOL",
    subtitle: "Römischer Stil",
    description:
      "Direkt vor der Dampfsauna befindet sich unser großer Whirlpool im römischen Stil. Mit 36°C und Millionen kleiner Luftblasen für einen Badespaß, der seinesgleichen sucht.",
    image: "/images/whirlpool.jpg",
  },
  {
    id: 5,
    title: "BAR",
    subtitle: "Genießen & Verweilen",
    description:
      "Unsere großzügig gestaltete Bar mit offenem Kamin lädt zum Genießen ein. Neben Getränken halten wir Flammkuchen, Salate und Herzhaftes stets frisch für Dich bereit.",
    image: "/images/bar.jpg",
  },
];

// Animated gradient text component
function AnimatedGradientText({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`relative inline-block ${className}`}>
      <span className="bg-gradient-to-r from-gold via-gold-light to-gold bg-[length:200%_auto] bg-clip-text text-transparent animate-gradient-x">
        {children}
      </span>
    </span>
  );
}

// 3D Tilt Card Component
function FacilityCard({ facility, index }: { facility: Facility; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse position for 3D tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring physics for smooth tilt
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), {
    stiffness: 300,
    damping: 30,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  // Parallax scroll effect
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <motion.div
      ref={cardRef}
      className="group relative flex-shrink-0 w-[300px] sm:w-[340px] lg:w-[380px] h-[480px] sm:h-[520px] lg:h-[580px] cursor-pointer"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.7,
        delay: index * 0.15,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      style={{
        rotateX: isHovered ? rotateX : 0,
        rotateY: isHovered ? rotateY : 0,
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      {/* Card Container */}
      <div className="relative w-full h-full rounded-2xl overflow-hidden bg-dark-gray shadow-2xl">
        {/* Background Image with Parallax */}
        <motion.div
          className="absolute inset-0 w-full h-[120%] -top-[10%]"
          style={{ y: imageY }}
        >
          <motion.div
            className="relative w-full h-full"
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <Image
              src={facility.image}
              alt={facility.title}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 300px, (max-width: 1024px) 340px, 380px"
              priority={index < 2}
            />
          </motion.div>
        </motion.div>

        {/* Gradient Overlay - Always visible at bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80" />

        {/* Hover Overlay - Darkens on hover */}
        <motion.div
          className="absolute inset-0 bg-black/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        {/* Gold Accent Line - Animated on hover */}
        <motion.div
          className="absolute bottom-0 left-0 h-[3px] bg-gradient-to-r from-gold to-gold-light"
          initial={{ width: "0%" }}
          animate={{ width: isHovered ? "100%" : "0%" }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        />

        {/* Content Container */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8">
          {/* Subtitle - Appears on hover */}
          <motion.span
            className="text-gold text-xs sm:text-sm font-medium tracking-[0.2em] uppercase mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: isHovered ? 1 : 0,
              y: isHovered ? 0 : 20,
            }}
            transition={{ duration: 0.4, delay: isHovered ? 0.1 : 0 }}
          >
            {facility.subtitle}
          </motion.span>

          {/* Title */}
          <motion.h3
            className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-3 tracking-wide"
            animate={{ y: isHovered ? -8 : 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {facility.title}
          </motion.h3>

          {/* Description - Slides up on hover */}
          <motion.div
            className="overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: isHovered ? "auto" : 0,
              opacity: isHovered ? 1 : 0,
            }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <p className="text-white/80 text-sm sm:text-base leading-relaxed">
              {facility.description}
            </p>
          </motion.div>

          {/* View More Link - Appears on hover */}
          <motion.div
            className="mt-4 flex items-center gap-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{
              opacity: isHovered ? 1 : 0,
              x: isHovered ? 0 : -20,
            }}
            transition={{ duration: 0.4, delay: isHovered ? 0.2 : 0 }}
          >
            <span className="text-gold text-sm font-medium">Mehr entdecken</span>
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-gold"
              animate={{ x: isHovered ? 4 : 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </motion.svg>
          </motion.div>
        </div>

        {/* Number Badge */}
        <div className="absolute top-6 right-6 w-10 h-10 rounded-full border border-white/20 flex items-center justify-center backdrop-blur-sm bg-black/20">
          <span className="text-white/60 text-sm font-medium">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

// Scroll indicator component
function ScrollIndicator() {
  return (
    <motion.div
      className="flex items-center gap-3 text-white/40 mt-8 lg:hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5, duration: 0.5 }}
    >
      <motion.div
        className="w-8 h-[2px] bg-gold"
        animate={{ scaleX: [1, 0.5, 1] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      />
      <span className="text-xs uppercase tracking-widest">Scroll</span>
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        animate={{ x: [0, 4, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <path d="M5 12h14" />
        <path d="m12 5 7 7-7 7" />
      </motion.svg>
    </motion.div>
  );
}

export default function SaunaSection(): React.ReactElement {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Scroll-linked animations
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <Section
      ref={sectionRef}
      id="sauna"
      className="relative overflow-hidden bg-black py-20 sm:py-28 lg:py-36"
      containerSize="full"
      padding="none"
    >
      {/* Background Elements */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: backgroundY }}
      >
        {/* Decorative circles */}
        <div className="absolute top-20 left-10 w-64 h-64 border border-gold/10 rounded-full" />
        <div className="absolute bottom-40 right-20 w-96 h-96 border border-gold/5 rounded-full" />
        <div className="absolute top-1/2 left-1/3 w-32 h-32 border border-gold/10 rounded-full" />
      </motion.div>

      {/* Section Header */}
      <div className="relative px-4 sm:px-6 lg:px-8 xl:px-12 mb-12 sm:mb-16 lg:mb-20">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {/* Pre-title */}
          <motion.span
            className="inline-block text-gold text-xs sm:text-sm font-medium tracking-[0.3em] uppercase mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Wellness & Erholung
          </motion.span>

          {/* Main Title with Animated Gradient */}
          <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 sm:mb-8">
            <span className="text-white">Unsere </span>
            <AnimatedGradientText className="font-bold">Sauna</AnimatedGradientText>
          </h2>

          {/* Subtitle */}
          <motion.p
            className="text-white/70 text-base sm:text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Auf über <span className="text-gold font-medium">1400 m²</span> und drei Etagen 
            erwartet Dich eine Oase der Entspannung. Entdecke unsere einzigartigen 
            Wellnessbereiche.
          </motion.p>
        </motion.div>
      </div>

      {/* Cards Container - Horizontal Scroll on Mobile/Tablet */}
      <motion.div
        style={{ opacity }}
        className="relative"
      >
        {/* Scroll Container */}
        <div
          ref={scrollContainerRef}
          className="flex gap-5 sm:gap-6 lg:gap-8 overflow-x-auto px-4 sm:px-6 lg:px-8 xl:px-12 pb-8 lg:pb-0 lg:grid lg:grid-cols-5 lg:max-w-[1800px] lg:mx-auto scrollbar-hide"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {facilities.map((facility, index) => (
            <FacilityCard key={facility.id} facility={facility} index={index} />
          ))}
        </div>

        {/* Scroll Indicator - Mobile only */}
        <div className="flex justify-center lg:hidden">
          <ScrollIndicator />
        </div>

        {/* Fade edges for scroll indication */}
        <div className="absolute top-0 right-0 w-20 h-full bg-gradient-to-l from-black to-transparent pointer-events-none lg:hidden" />
        <div className="absolute top-0 left-0 w-8 h-full bg-gradient-to-r from-black to-transparent pointer-events-none lg:hidden" />
      </motion.div>

      {/* Bottom CTA */}
      <motion.div
        className="text-center mt-12 sm:mt-16 lg:mt-20 px-4"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <p className="text-white/50 text-sm sm:text-base mb-4">
          Reserviere jetzt Deinen Besuch und erlebe pure Entspannung
        </p>
        <motion.button
          className="inline-flex items-center gap-2 px-8 py-4 bg-gold text-black font-semibold rounded-full hover:bg-gold-light transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          <span>Termin buchen</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </motion.button>
      </motion.div>

    </Section>
  );
}
