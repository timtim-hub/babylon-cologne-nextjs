"use client";

import { motion, Variants } from "framer-motion";
import { Section } from "../components/Section";
import { useInView } from "../hooks/useInView";
import { Clock, Calendar, Sparkles } from "lucide-react";

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

// Fade-up animation: y: 30 -> 0 with opacity
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

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
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

export function HoursSection() {
  const { ref, isInView } = useInView<HTMLElement>({ threshold: 0.1 });

  return (
    <Section
      id="oeffnungszeiten"
      ref={ref}
      className="relative overflow-hidden bg-black"
      padding="large"
    >
      {/* Background decoration with enhanced animations */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={isInView ? { opacity: 0.5, x: 0 } : { opacity: 0, x: -100 }}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="absolute left-0 top-0 h-[500px] w-[500px] rounded-full bg-[#DD9933]/5 blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={isInView ? { opacity: 0.3, x: 0 } : { opacity: 0, x: 100 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-[#CC3366]/5 blur-3xl"
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
        {/* Section Header */}
        <motion.div variants={itemVariants} className="mb-12 text-center md:mb-16">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mb-4 inline-flex items-center justify-center rounded-full bg-[#DD9933]/10 p-3"
          >
            <Clock className="h-6 w-6 text-[#DD9933]" />
          </motion.div>
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="inline-block text-[#DD9933] text-sm uppercase tracking-widest mb-4"
          >
            Zeitplan
          </motion.span>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
            <span className="text-gradient-gold">Öffnungszeiten</span>
          </h2>
          <motion.div 
            className="section-divider mx-auto w-24"
            variants={lineVariants}
          />
        </motion.div>

        {/* Main Content */}
        <motion.div variants={itemVariants} className="mx-auto max-w-3xl text-center">
          <motion.p
            variants={itemVariants}
            className="mb-8 text-xl font-semibold text-white sm:text-2xl md:text-3xl"
          >
            Wir haben an{" "}
            <motion.span 
              className="text-[#DD9933]"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              365 Tagen
            </motion.span>{" "}
            im Jahr für euch geöffnet!
          </motion.p>

          {/* Hours Cards with fade-up animation */}
          <div className="mb-8 grid gap-4 sm:grid-cols-2">
            <motion.div
              variants={cardVariants}
              whileHover={{ scale: 1.02, y: -4 }}
              transition={{ duration: 0.3 }}
              className="group relative overflow-hidden rounded-2xl bg-[#212121] p-6"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#DD9933]/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <motion.div 
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <motion.div 
                  className="mb-3 inline-flex items-center justify-center rounded-full bg-[#DD9933]/10 p-2"
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Calendar className="h-5 w-5 text-[#DD9933]" />
                </motion.div>
                <h3 className="mb-2 text-lg font-semibold text-white">
                  Unter der Woche
                </h3>
                <motion.p 
                  className="text-2xl font-bold text-[#DD9933]"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.4, delay: 0.6 }}
                >
                  10:00 - 06:00
                </motion.p>
                <p className="mt-1 text-sm text-white/60">Täglich geöffnet</p>
              </motion.div>
            </motion.div>

            <motion.div
              variants={cardVariants}
              whileHover={{ scale: 1.02, y: -4 }}
              transition={{ duration: 0.3 }}
              className="group relative overflow-hidden rounded-2xl bg-[#212121] p-6"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#CC3366]/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <motion.div 
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <motion.div 
                  className="mb-3 inline-flex items-center justify-center rounded-full bg-[#CC3366]/10 p-2"
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Sparkles className="h-5 w-5 text-[#CC3366]" />
                </motion.div>
                <h3 className="mb-2 text-lg font-semibold text-white">
                  Wochenende & Feiertage
                </h3>
                <motion.p 
                  className="text-2xl font-bold text-[#CC3366]"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.4, delay: 0.7 }}
                >
                  Durchgehend
                </motion.p>
                <p className="mt-1 text-sm text-white/60">24 Stunden geöffnet</p>
              </motion.div>
            </motion.div>
          </div>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="mb-6 text-base leading-relaxed text-white/70 sm:text-lg"
          >
            Unter der Woche öffnen wir um 10 Uhr und schließen am nächsten Morgen
            um 6 Uhr. Am Wochenende und an Feiertagen sind wir durchgängig für euch
            da!
          </motion.p>

          {/* Special Events Note */}
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.01 }}
            className="inline-flex items-center gap-3 rounded-full border border-[#DD9933]/30 bg-[#DD9933]/5 px-6 py-3"
          >
            <motion.div
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              <Sparkles className="h-4 w-4 text-[#DD9933]" />
            </motion.div>
            <span className="text-sm text-white/80">
              Zu Besonderen Anlässen haben wir auch länger auf, checkt dafür unseren{" "}
              <a href="#kalender" className="text-[#DD9933] hover:underline transition-colors">
                Kalender
              </a>
              .
            </span>
          </motion.div>
        </motion.div>
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
