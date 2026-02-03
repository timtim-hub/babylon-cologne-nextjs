"use client";

import { motion, useScroll, useTransform, Variants } from "framer-motion";
import { Section } from "../components/Section";
import { useInView } from "../hooks/useInView";
import { Wine, UtensilsCrossed, ChefHat } from "lucide-react";

// Stagger container with delayChildren
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
};

const featureVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
};

const lineVariants: Variants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
};

export function BarGastroSection() {
  const { ref, isInView } = useInView<HTMLElement>({ threshold: 0.1 });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Parallax effect for image
  const imageY = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);

  const features = [
    {
      icon: Wine,
      title: "Große Getränkeauswahl",
      description: "Erfrischende Drinks, Cocktails und vieles mehr",
    },
    {
      icon: UtensilsCrossed,
      title: "Hausgemachte Speisen",
      description: "Wir kochen größtenteils selbst für dich",
    },
    {
      icon: ChefHat,
      title: "Terrasse am Außenpool",
      description: "Viel Platz zum Verweilen in schöner Atmosphäre",
    },
  ];

  return (
    <Section
      id="bar-gastro"
      ref={ref}
      className="relative overflow-hidden bg-[#0a0a0a]"
      padding="large"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={isInView ? { opacity: 0.4, x: 0 } : { opacity: 0, x: 100 }}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="absolute right-0 top-1/4 h-[600px] w-[600px] rounded-full bg-[#DD9933]/5 blur-3xl"
        />
      </div>

      {/* Section divider top */}
      <motion.div
        variants={lineVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#DD9933]/50 to-transparent"
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="relative z-10"
      >
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Content */}
          <div>
            <motion.div variants={itemVariants} className="mb-6">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="mb-4 inline-flex items-center justify-center rounded-full bg-[#DD9933]/10 p-3"
              >
                <Wine className="h-6 w-6 text-[#DD9933]" />
              </motion.div>
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="inline-block text-[#DD9933] text-sm uppercase tracking-widest mb-4"
              >
                Genuss
              </motion.span>
              <h2 className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
                <span className="text-gradient-gold">Bar & Gastro</span>
              </h2>
              <motion.div 
                className="section-divider w-24"
                variants={lineVariants}
              />
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="mb-6 text-lg leading-relaxed text-white/80"
            >
              Unsere Bar mit angrenzender Terrasse am Außenpool bietet viel Platz
              zum Verweilen. Natürlich bieten wir dir eine große Auswahl an
              Getränken und Speisen an.
            </motion.p>

            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className="mb-8 rounded-2xl border border-[#DD9933]/20 bg-[#DD9933]/5 p-6"
            >
              <div className="flex items-start gap-4">
                <motion.div 
                  className="rounded-full bg-[#DD9933]/10 p-2"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity, repeatDelay: 5 }}
                >
                  <ChefHat className="h-5 w-5 text-[#DD9933]" />
                </motion.div>
                <div>
                  <p className="text-lg font-medium text-white">
                    Wusstest du schon?
                  </p>
                  <p className="text-white/60">
                    Wir kochen größtenteils selbst!
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Features with stagger reveal */}
            <div className="space-y-4">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  variants={featureVariants}
                  custom={index}
                  whileHover={{ x: 8 }}
                  transition={{ duration: 0.3 }}
                  className="group flex items-center gap-4"
                >
                  <motion.div 
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#212121] transition-colors duration-300 group-hover:bg-[#DD9933]/20"
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <feature.icon className="h-5 w-5 text-[#DD9933]" />
                  </motion.div>
                  <div>
                    <h4 className="font-semibold text-white">{feature.title}</h4>
                    <p className="text-sm text-white/60">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Image with parallax effect */}
          <motion.div
            variants={itemVariants}
            className="relative"
          >
            <motion.div
              style={{ y: imageY, scale: imageScale }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.5 }}
              className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-[#212121]"
            >
              {/* Placeholder for Bar image */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    <Wine className="mx-auto mb-4 h-16 w-16 text-[#DD9933]/30" />
                  </motion.div>
                  <p className="text-white/40">Bar & Terrasse Bild</p>
                </div>
              </div>
              
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              
              {/* Decorative border */}
              <motion.div 
                className="absolute inset-0 rounded-2xl border border-[#DD9933]/20"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              />

              {/* Animated corner accents */}
              <motion.div
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : { scale: 0 }}
                transition={{ duration: 0.4, delay: 0.6 }}
                className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-[#DD9933]/50"
              />
              <motion.div
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : { scale: 0 }}
                transition={{ duration: 0.4, delay: 0.7 }}
                className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-[#DD9933]/50"
              />
            </motion.div>

            {/* Floating badge with parallax */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="absolute -bottom-6 -left-6 rounded-xl bg-[#212121] p-4 shadow-xl border border-[#DD9933]/20"
            >
              <p className="text-sm text-white/60">Täglich geöffnet</p>
              <motion.p 
                className="text-lg font-bold text-[#DD9933]"
                initial={{ opacity: 0, x: -10 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                transition={{ duration: 0.4, delay: 0.7 }}
              >
                10:00 - 06:00
              </motion.p>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Section divider bottom */}
      <motion.div
        variants={lineVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#DD9933]/50 to-transparent"
      />
    </Section>
  );
}
