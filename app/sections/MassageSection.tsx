"use client";

import { motion, Variants } from "framer-motion";
import { Section } from "../components/Section";
import { useInView } from "../hooks/useInView";
import { Hand, Phone, Clock, Info } from "lucide-react";

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
      ease: "easeOut",
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
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.4 } : { opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute -left-1/4 top-0 h-[600px] w-[600px] rounded-full bg-[#CC3366]/5 blur-3xl"
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="relative z-10"
      >
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Image Placeholder */}
          <motion.div
            variants={itemVariants}
            className="relative order-2 lg:order-1"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.5 }}
              className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-[#212121]"
            >
              {/* Placeholder for Massage image */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <Hand className="mx-auto mb-4 h-16 w-16 text-[#CC3366]/30" />
                  <p className="text-white/40">Massage Bild</p>
                </div>
              </div>
              
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              
              {/* Decorative border */}
              <div className="absolute inset-0 rounded-2xl border border-[#CC3366]/20" />
            </motion.div>

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="absolute -bottom-6 -right-6 rounded-xl bg-[#212121] p-4 shadow-xl"
            >
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-[#CC3366]" />
                <p className="text-sm text-white/60">14:00 - 20:00 Uhr</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <motion.div variants={itemVariants} className="mb-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : { scale: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mb-4 inline-flex items-center justify-center rounded-full bg-[#CC3366]/10 p-3"
              >
                <Hand className="h-6 w-6 text-[#CC3366]" />
              </motion.div>
              <h2 className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
                <span className="bg-gradient-to-r from-[#CC3366] to-[#E64D80] bg-clip-text text-transparent">
                  Massage
                </span>
              </h2>
              <div className="section-divider w-24" />
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
              <div className="flex items-center gap-2 rounded-full bg-[#212121] px-4 py-2">
                <Phone className="h-4 w-4 text-[#CC3366]" />
                <a
                  href="tel:+4922142074577"
                  className="text-sm text-white hover:text-[#CC3366]"
                >
                  +49 (0) 221 – 420 745 77
                </a>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-[#212121] px-4 py-2">
                <Clock className="h-4 w-4 text-[#CC3366]" />
                <span className="text-sm text-white/80">14:00 - 20:00 Uhr</span>
              </div>
            </motion.div>

            {/* Services Table */}
            <motion.div variants={itemVariants} className="mb-6">
              <h3 className="mb-4 text-lg font-semibold text-white">
                Unsere Angebote
              </h3>
              <div className="space-y-2">
                {massageServices.map((service, index) => (
                  <motion.div
                    key={service.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                    whileHover={{ scale: 1.02, backgroundColor: "rgba(204, 51, 102, 0.1)" }}
                    className="flex items-center justify-between rounded-xl bg-[#212121] px-4 py-3 transition-colors"
                  >
                    <div>
                      <p className="font-medium text-white">{service.name}</p>
                      <p className="text-xs text-white/50">{service.duration}</p>
                    </div>
                    <span className="text-lg font-bold text-[#CC3366]">
                      {service.price}
                    </span>
                  </motion.div>
                ))}
              </div>
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
    </Section>
  );
}
