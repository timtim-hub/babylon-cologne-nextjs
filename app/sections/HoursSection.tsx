"use client";

import { motion, Variants } from "framer-motion";
import { Section } from "../components/Section";
import { useInView } from "../hooks/useInView";
import { Clock, Calendar, Sparkles } from "lucide-react";

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
      ease: "easeOut",
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
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
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.5 } : { opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute left-0 top-0 h-[500px] w-[500px] rounded-full bg-[#DD9933]/5 blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.3 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-[#CC3366]/5 blur-3xl"
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="relative z-10"
      >
        {/* Section Header */}
        <motion.div variants={itemVariants} className="mb-12 text-center md:mb-16">
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : { scale: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-4 inline-flex items-center justify-center rounded-full bg-[#DD9933]/10 p-3"
          >
            <Clock className="h-6 w-6 text-[#DD9933]" />
          </motion.div>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
            <span className="text-gradient-gold">Öffnungszeiten</span>
          </h2>
          <div className="section-divider mx-auto w-24" />
        </motion.div>

        {/* Main Content */}
        <motion.div variants={itemVariants} className="mx-auto max-w-3xl text-center">
          <motion.p
            variants={itemVariants}
            className="mb-8 text-xl font-semibold text-white sm:text-2xl md:text-3xl"
          >
            Wir haben an{" "}
            <span className="text-[#DD9933]">365 Tagen</span> im Jahr für euch
            geöffnet!
          </motion.p>

          {/* Hours Cards */}
          <div className="mb-8 grid gap-4 sm:grid-cols-2">
            <motion.div
              variants={cardVariants}
              whileHover={{ scale: 1.02, y: -4 }}
              transition={{ duration: 0.3 }}
              className="group relative overflow-hidden rounded-2xl bg-[#212121] p-6"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#DD9933]/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="relative">
                <div className="mb-3 inline-flex items-center justify-center rounded-full bg-[#DD9933]/10 p-2">
                  <Calendar className="h-5 w-5 text-[#DD9933]" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-white">
                  Unter der Woche
                </h3>
                <p className="text-2xl font-bold text-[#DD9933]">10:00 - 06:00</p>
                <p className="mt-1 text-sm text-white/60">Täglich geöffnet</p>
              </div>
            </motion.div>

            <motion.div
              variants={cardVariants}
              whileHover={{ scale: 1.02, y: -4 }}
              transition={{ duration: 0.3 }}
              className="group relative overflow-hidden rounded-2xl bg-[#212121] p-6"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#CC3366]/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="relative">
                <div className="mb-3 inline-flex items-center justify-center rounded-full bg-[#CC3366]/10 p-2">
                  <Sparkles className="h-5 w-5 text-[#CC3366]" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-white">
                  Wochenende & Feiertage
                </h3>
                <p className="text-2xl font-bold text-[#CC3366]">Durchgehend</p>
                <p className="mt-1 text-sm text-white/60">24 Stunden geöffnet</p>
              </div>
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
            <Sparkles className="h-4 w-4 text-[#DD9933]" />
            <span className="text-sm text-white/80">
              Zu Besonderen Anlässen haben wir auch länger auf, checkt dafür unseren{" "}
              <a href="#kalender" className="text-[#DD9933] hover:underline">
                Kalender
              </a>
              .
            </span>
          </motion.div>
        </motion.div>
      </motion.div>
    </Section>
  );
}
