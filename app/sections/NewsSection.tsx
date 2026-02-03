"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import Image from "next/image";
import { Section } from "../components";

interface NewsArticle {
  id: number;
  title: string;
  date: string;
  excerpt: string;
  link: string;
  image: string;
}

const newsArticles: NewsArticle[] = [
  {
    id: 1,
    title: "Monatsausblick Februar 2026",
    date: "02/02/2026",
    excerpt:
      "Jetzt fängt das Jahr so richtig an. Mit Karneval steht Köln wieder Kopf und auch bei uns in der Babylon wird der Februar wieder dynamisch...",
    link: "#",
    image: "/images/news-1.jpg",
  },
  {
    id: 2,
    title: "Digitaler Hausputz",
    date: "26/01/2026",
    excerpt:
      "Freut euch auf ein frisches Design, eine neue News-Sektion mit aktuellen Updates und Gossip aus der Babylon...",
    link: "#",
    image: "/images/news-2.jpg",
  },
  {
    id: 3,
    title: "10er Karten Aktion",
    date: "24/12/2025",
    excerpt:
      "Auch dieses Jahr haben wir wieder unsere beliebte 10er Karten Aktion. Vom 24.12. bis zum 31.01. erhaltet ihr...",
    link: "#",
    image: "/images/news-3.jpg",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  },
};

const headerVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  },
};

interface NewsCardProps {
  article: NewsArticle;
  index: number;
}

function NewsCard({ article, index }: NewsCardProps): React.ReactElement {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse position for 3D tilt effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring configuration for smooth tilt
  const springConfig = { stiffness: 300, damping: 30 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), springConfig);

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
    setIsHovered(false);
  };

  return (
    <motion.article
      ref={cardRef}
      variants={itemVariants}
      className="group relative rounded-2xl overflow-hidden cursor-pointer"
      style={{
        perspective: 1000,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="relative bg-card rounded-2xl overflow-hidden h-full"
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        whileHover={{
          y: -8,
          transition: { duration: 0.3 },
        }}
      >
        {/* Image Container */}
        <div className="relative h-48 md:h-56 overflow-hidden">
          {/* Actual Image with zoom effect */}
          <motion.div
            className="absolute inset-0"
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <Image
              src={article.image}
              alt={article.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </motion.div>

          {/* Gradient overlay that darkens on hover */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"
            animate={{
              opacity: isHovered ? 1 : 0.7,
            }}
            transition={{ duration: 0.3 }}
          />

          {/* Additional hover gradient */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 0.3 : 0 }}
            transition={{ duration: 0.3 }}
          />

          {/* Date Badge with subtle pulse */}
          <motion.div
            className="absolute top-4 left-4 flex items-center gap-2 bg-black/80 backdrop-blur-sm px-3 py-1.5 rounded-full"
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 + index * 0.1 }}
            animate={{
              boxShadow: isHovered
                ? [
                    "0 0 0 0 rgba(221, 153, 51, 0)",
                    "0 0 0 4px rgba(221, 153, 51, 0.3)",
                    "0 0 0 0 rgba(221, 153, 51, 0)",
                  ]
                : "0 0 0 0 rgba(221, 153, 51, 0)",
            }}
            style={{
              boxShadow: "0 0 0 0 rgba(221, 153, 51, 0)",
            }}
          >
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 0.3,
              }}
            >
              <Calendar className="w-3.5 h-3.5 text-primary" />
            </motion.div>
            <span className="text-white text-xs font-medium">{article.date}</span>
          </motion.div>

          {/* Category tag on hover */}
          <motion.div
            className="absolute top-4 right-4 bg-primary text-black text-xs font-bold px-3 py-1 rounded-full"
            initial={{ opacity: 0, y: -10 }}
            animate={{
              opacity: isHovered ? 1 : 0,
              y: isHovered ? 0 : -10,
            }}
            transition={{ duration: 0.3 }}
          >
            NEWS
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-6 relative">
          <motion.h3
            className="text-lg md:text-xl font-bold text-white mb-3 line-clamp-2"
            animate={{
              color: isHovered ? "#DD9933" : "#ffffff",
            }}
            transition={{ duration: 0.3 }}
          >
            {article.title}
          </motion.h3>
          <p className="text-white/70 text-sm md:text-base leading-relaxed mb-4 line-clamp-3">
            {article.excerpt}
          </p>

          {/* Read More Link with animated arrow */}
          <a
            href={article.link}
            className="inline-flex items-center gap-2 text-primary font-semibold text-sm group/link"
          >
            <span className="border-b border-transparent group-hover/link:border-primary transition-all duration-300">
              Weiterlesen
            </span>
            <motion.span
              className="inline-flex"
              animate={{
                x: isHovered ? 6 : 0,
              }}
              transition={{
                duration: 0.3,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              <ArrowRight className="w-4 h-4" />
            </motion.span>
          </a>
        </div>

        {/* Bottom Accent Line */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1 bg-primary"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          style={{ originX: 0 }}
        />

        {/* Glow effect on hover */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          animate={{
            boxShadow: isHovered
              ? "0 20px 40px -15px rgba(221, 153, 51, 0.3)"
              : "0 0 0 0 rgba(221, 153, 51, 0)",
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </motion.article>
  );
}

export default function NewsSection(): React.ReactElement {
  return (
    <Section className="relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #DD9933 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <motion.div
        className="container mx-auto relative z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Section Header */}
        <motion.div className="text-center mb-12 md:mb-16" variants={headerVariants}>
          <motion.span
            className="inline-block text-primary text-sm font-semibold tracking-widest uppercase mb-3"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Aktuelles
          </motion.span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
            News
          </h2>
          <motion.div
            className="w-20 h-1 bg-primary mx-auto mt-4"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
          />
        </motion.div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {newsArticles.map((article, index) => (
            <NewsCard key={article.id} article={article} index={index} />
          ))}
        </div>

        {/* View All Button */}
        <motion.div className="text-center mt-12" variants={itemVariants}>
          <motion.button
            className="inline-flex items-center gap-3 bg-transparent border-2 border-primary text-primary px-8 py-3 rounded-full font-semibold text-sm uppercase tracking-wider transition-all duration-300 hover:bg-primary hover:text-black"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Alle News anzeigen
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Decorative Elements */}
      <motion.div
        className="absolute top-40 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      />
      <motion.div
        className="absolute bottom-40 left-0 w-48 h-48 bg-primary/5 rounded-full blur-3xl"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.3 }}
      />
    </Section>
  );
}
