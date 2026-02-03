"use client";

import { motion } from "framer-motion";

interface PriceCard {
  id: string;
  name: string;
  price: string;
  description: string;
  isSpecial?: boolean;
}

const prices: PriceCard[] = [
  {
    id: "standard",
    name: "Standardeintritt",
    price: "28 €",
    description: "Unser normaler Eintritt außerhalb von Rabattaktion.",
  },
  {
    id: "early",
    name: "Early@BABYLON *",
    price: "18 €",
    description:
      "Mo. bis Fr. 10:00 bis 13:00 Uhr,\nSamstags von 06:00 bis 13:00 Uhr.\ngilt nicht an Feiertagen und bei Sonderveranstaltungen",
    isSpecial: true,
  },
  {
    id: "night",
    name: "Night@BABYLON *",
    price: "18 €",
    description:
      "So. bis Do. von 22:00 - 6:00 Uhr\ngilt nicht an Feiertagen und bei Sonderveranstaltungen",
    isSpecial: true,
  },
  {
    id: "youngster",
    name: "Youngster@BABYLON *",
    price: "17 €",
    description: "bis 25 Jahre, bitte Ausweis an der Kasse vorzeigen",
    isSpecial: true,
  },
  {
    id: "birthday",
    name: "Geburtstagstarif",
    price: "0 €",
    description:
      "Du hast heute Geburtstag? Dann zeig uns an der Kasse einfach deinen Ausweis.",
    isSpecial: true,
  },
  {
    id: "time",
    name: "Zeitzuschlag",
    price: "3 €",
    description: "nach 12 Stunden jede weitere angefangene Stunde",
  },
];

// Stagger container with delayChildren
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

// Card reveal animation: y: 30 -> 0 with opacity fade
const cardVariants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
};

const titleVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
};

// Decorative line animation
const lineVariants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
};

export default function PricesSection() {
  return (
    <section
      id="preise"
      className="py-20 md:py-28 bg-[#212121] relative overflow-hidden"
    >
      {/* Decorative animated elements */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="absolute top-20 right-0 w-96 h-96 rounded-full bg-[#DD9933] blur-3xl"
      />
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.05 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.3 }}
        className="absolute bottom-20 left-0 w-72 h-72 rounded-full bg-[#CC3366] blur-3xl"
      />

      {/* Section divider top */}
      <motion.div
        variants={lineVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#DD9933]/50 to-transparent"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Title */}
        <motion.div
          className="text-center mb-14"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={titleVariants}
        >
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block text-[#DD9933] text-sm uppercase tracking-widest mb-4"
          >
            Eintritt
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Eintrittspreise
          </h2>
          <motion.div 
            className="w-24 h-1 bg-[#DD9933] mx-auto"
            variants={lineVariants}
          />
        </motion.div>

        {/* Price Cards Grid with stagger reveal */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          {prices.map((price, index) => (
            <motion.div
              key={price.id}
              variants={cardVariants}
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.3, ease: "easeOut" },
              }}
              className={`
                relative p-6 md:p-8 rounded-lg border-2 cursor-default
                transition-all duration-300
                ${
                  price.isSpecial
                    ? "bg-[#1a1a1a] border-[#DD9933]/50"
                    : "bg-black border-[#333]"
                }
                hover:border-[#DD9933] hover:shadow-[0_0_30px_rgba(221,153,51,0.2)]
              `}
            >
              {/* Gold accent line for special prices */}
              {price.isSpecial && (
                <motion.div 
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
                  className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#DD9933] to-transparent origin-left"
                />
              )}

              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                {/* Price Name */}
                <div className="flex-1">
                  <h3 className="text-xl md:text-2xl font-semibold text-white mb-2">
                    {price.name}
                  </h3>
                  <p className="text-gray-400 text-sm md:text-base whitespace-pre-line leading-relaxed">
                    {price.description}
                  </p>
                </div>

                {/* Price Amount */}
                <div className="flex-shrink-0">
                  <motion.span 
                    className="text-3xl md:text-4xl font-bold text-[#DD9933]"
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: 0.5, 
                      delay: index * 0.1 + 0.4,
                      ease: [0.25, 0.46, 0.45, 0.94]
                    }}
                  >
                    {price.price}
                  </motion.span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Footnote */}
        <motion.p
          className="text-gray-500 text-sm text-center mt-10 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          * Zu den Tarifen Early@Babylon / Night@Babylon und Youngster@Babylon
          gibt es keine 5-Tage oder Two for One Gutscheine hinzu
        </motion.p>
      </div>

      {/* Section divider bottom */}
      <motion.div
        variants={lineVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#DD9933]/50 to-transparent"
      />
    </section>
  );
}
