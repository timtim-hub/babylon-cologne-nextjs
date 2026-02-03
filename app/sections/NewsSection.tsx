"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import { Section } from "../components";

interface NewsArticle {
  id: number;
  title: string;
  date: string;
  excerpt: string;
  link: string;
}

const newsArticles: NewsArticle[] = [
  {
    id: 1,
    title: "Monatsausblick Februar 2026",
    date: "02/02/2026",
    excerpt:
      "Jetzt fängt das Jahr so richtig an. Mit Karneval steht Köln wieder Kopf und auch bei uns in der Babylon wird der Februar wieder dynamisch, es stehen ein paar Specials auf dem Plan.",
    link: "#",
  },
  {
    id: 2,
    title: "Digitaler Hausputz",
    date: "26/01/2026",
    excerpt:
      "Freut euch auf ein frisches Design, eine neue News-Sektion mit aktuellen Updates und Gossip aus der Babylon sowie einen verbesserten Eventkalender mit Such- und Abo-Funktion. Schaut regelmäßig vorbei und bleibt immer auf dem Laufenden!",
    link: "#",
  },
  {
    id: 3,
    title: "10er Karten Aktion",
    date: "24/12/2025",
    excerpt:
      "Auch dieses Jahr haben wir wieder unsere beliebte 10er Karten Aktion. Vom 24.12. bis zum 31.01. erhaltet ihr beim Kauf einer 10er Karte 2 Eintritte gratis dazu.",
    link: "#",
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
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
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
  return (
    <motion.article
      variants={itemVariants}
      className="group relative bg-card rounded-2xl overflow-hidden cursor-pointer"
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
    >
      {/* Image Placeholder */}
      <div className="relative h-48 md:h-56 overflow-hidden bg-gradient-to-br from-card to-black">
        <motion.div
          className="absolute inset-0 bg-primary/10"
          whileHover={{ opacity: 0.2 }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Placeholder Pattern */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-3 rounded-full border-2 border-primary/30 flex items-center justify-center">
              <span className="text-primary/50 text-2xl font-bold">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>
            <span className="text-white/30 text-xs uppercase tracking-wider">
              Bild folgt
            </span>
          </div>
        </div>

        {/* Date Badge */}
        <motion.div
          className="absolute top-4 left-4 flex items-center gap-2 bg-black/80 backdrop-blur-sm px-3 py-1.5 rounded-full"
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 + index * 0.1 }}
        >
          <Calendar className="w-3.5 h-3.5 text-primary" />
          <span className="text-white text-xs font-medium">{article.date}</span>
        </motion.div>

        {/* Hover Overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-lg md:text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors duration-300 line-clamp-2">
          {article.title}
        </h3>
        <p className="text-white/70 text-sm md:text-base leading-relaxed mb-4 line-clamp-3">
          {article.excerpt}
        </p>

        {/* Read More Link */}
        <motion.a
          href={article.link}
          className="inline-flex items-center gap-2 text-primary font-semibold text-sm group/link"
          whileHover={{ x: 4 }}
          transition={{ duration: 0.2 }}
        >
          <span className="border-b border-transparent group-hover/link:border-primary transition-all duration-300">
            Weiterlesen
          </span>
          <motion.span
            initial={{ x: 0 }}
            whileHover={{ x: 4 }}
            transition={{ duration: 0.2 }}
          >
            <ArrowRight className="w-4 h-4" />
          </motion.span>
        </motion.a>
      </div>

      {/* Bottom Accent Line */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-1 bg-primary"
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.3 }}
        style={{ originX: 0 }}
      />
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
        <motion.div
          className="text-center mt-12"
          variants={itemVariants}
        >
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
