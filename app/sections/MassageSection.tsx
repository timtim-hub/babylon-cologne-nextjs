"use client";

import { motion, useScroll, useTransform, Variants } from "framer-motion";
import { Section } from "../components/Section";
import { useInView } from "../hooks/useInView";
import { Hand, Phone, Clock, Info } from "lucide-react";

// Stagger container with delayChildren
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
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

const tableRowVariants: Variants = {
  hidden: { opacity: 0, x: 20 },
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

const massageServices = [
  { name: "Klassische Massage", price: "35€", duration: "ca. 25 Min." },
  { name: "Ayurveda Massage", price: "50€", duration: "ca. 50 Min." },
  { name: "Belinesische Massage", price: "65€", duration: "ca. 75 Min." },
  { name: "Hot Stone Massage", price: "95€", duration: "ca. 90 Min." },
];

export function MassageSection() {
  const { ref, isInView } = useInView<HTMLElement>({ threshold: 0.1 });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Parallax effect for image
  const imageY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <Section
      id="massage"
      ref={ref}
      className="relative overflow-hidden bg-black"
      padding="large"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={isInView ? { opacity: 0.4, x: 0 } : { opacity: 0, x: -100 }}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="absolute -left-1/4 top-0 h-[600px] w-[600px] rounded-full bg-[#CC3366]/5 blur-3xl"
        />
      </div>

      {/* Section divider top */}
      <motion.div
        variants={lineVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#CC3366]/50 to-transparent"
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="relative z-10"
      >
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Image with parallax effect */}
          <motion.div
            variants={itemVariants}
            className="relative order-2 lg:order-1"
          >
            <motion.div
              style={{ y: imageY }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.5 }}
              className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-[#212121]"
            >
              {/* Placeholder for Massage image */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    <Hand className="mx-auto mb-4 h-16 w-16 text-[#CC3366]/30" />
                  </motion.div>
                  <p className="text-white/40">Massage Bild</p>
                </div>
              </div>
              
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              
              {/* Decorative border */}
              <motion.div 
                className="absolute inset-0 rounded-2xl border border-[#CC3366]/20"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              />

              {/* Animated corner accents */}
              <motion.div
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : { scale: 0 }}
                transition={{ duration: 0.4, delay: 0.6 }}
                className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-[#CC3366]/50"
              />
              <motion.div
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : { scale: 0 }}
                transition={{ duration: 0.4, delay: 0.7 }}
                className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-[#CC3366]/50"
              />
            </motion.div>

            {/* Floating badge with parallax */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="absolute -bottom-6 -right-6 rounded-xl bg-[#212121] p-4 shadow-xl border border-[#CC3366]/20"
            >
              <div className="flex items-center gap-2">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                >
                  <Clock className="h-4 w-4 text-[#CC3366]" />
                </motion.div>
                <motion.p 
                  className="text-sm text-white/60"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  14:00 - 20:00 Uhr
                </motion.p>
              </div>
            </motion.div>
          </motion.div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <motion.div variants={itemVariants} className="mb-6">
              <motion.div
                initial={{ scale: 0, rotate: 180 }}
                animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: 180 }}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="mb-4 inline-flex items-center justify-center rounded-full bg-[#CC3366]/10 p-3"
              >
                <Hand className="h-6 w-6 text-[#CC3366]" />
              </motion.div>
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="inline-block text-[#CC3366] text-sm uppercase tracking-widest mb-4"
              >
                Wellness
              </motion.span>
              <h2 className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
                <span className="bg-gradient-to-r from-[#CC3366] to-[#E64D80] bg-clip-text text-transparent">
                  Massage
                </span>
              </h2>
              <motion.div 
                className="section-divider w-24"
                variants={lineVariants}
              />
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="mb-4 text-lg leading-relaxed text-white/80"
            >
              Du brauchst eine Auszeit und vollkommende Entspannung? Unsere
              Masseure sorgen dafür dass der Alltagstress von dir abfällt{" "}
              <span className="text-[#CC3366]">(aktuell nicht Mittwochs und Donnerstags)</span>.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="mb-6 flex flex-wrap items-center gap-4"
            >
              <motion.div 
                className="flex items-center gap-2 rounded-full bg-[#212121] px-4 py-2"
                whileHover={{ scale: 1.05, borderColor: "rgba(204, 51, 102, 0.3)" }}
                style={{ border: "1px solid transparent" }}
              >
                <Phone className="h-4 w-4 text-[#CC3366]" />
                <a
                  href="tel:+4922142074577"
                  className="text-sm text-white hover:text-[#CC3366] transition-colors"
                >
                  +49 (0) 221 – 420 745 77
                </a>
              </motion.div>
              <motion.div 
                className="flex items-center gap-2 rounded-full bg-[#212121] px-4 py-2"
                whileHover={{ scale: 1.05, borderColor: "rgba(204, 51, 102, 0.3)" }}
                style={{ border: "1px solid transparent" }}
              >
                <Clock className="h-4 w-4 text-[#CC3366]" />
                <span className="text-sm text-white/80">14:00 - 20:00 Uhr</span>
              </motion.div>
            </motion.div>

            {/* Services Table with reveal animations */}
            <motion.div variants={itemVariants} className="mb-6">
              <h3 className="mb-4 text-lg font-semibold text-white">
                Unsere Angebote
              </h3>
              <motion.div 
                className="space-y-2"
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.1,
                      delayChildren: 0.3,
                    },
                  },
                }}
              >
                {massageServices.map((service, index) => (
                  <motion.div
                    key={service.name}
                    variants={tableRowVariants}
                    whileHover={{ scale: 1.02, backgroundColor: "rgba(204, 51, 102, 0.1)" }}
                    className="flex items-center justify-between rounded-xl bg-[#212121] px-4 py-3 transition-colors border border-transparent hover:border-[#CC3366]/20"
                  >
                    <div>
                      <p className="font-medium text-white">{service.name}</p>
                      <p className="text-xs text-white/50">{service.duration}</p>
                    </div>
                    <motion.span 
                      className="text-lg font-bold text-[#CC3366]"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
                      transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                    >
                      {service.price}
                    </motion.span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Disclaimer */}
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.01 }}
              className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-4"
            >
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-white/50" />
              <p className="text-xs text-white/50">
                Alle angebotenen Massage-Dienstleistungen werden im Namen und auf
                Rechnung der hier freiberuflich bzw. selbstständig tätigen Personen
                angeboten und abgerechnet.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Section divider bottom */}
      <motion.div
        variants={lineVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#CC3366]/50 to-transparent"
      />
    </Section>
  );
}
