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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
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

export default function PricesSection() {
  return (
    <section
      id="preise"
      className="py-20 md:py-28 bg-[#212121]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <motion.div
          className="text-center mb-14"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={titleVariants}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Eintrittspreise
          </h2>
          <div className="w-24 h-1 bg-[#DD9933] mx-auto" />
        </motion.div>

        {/* Price Cards Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
        >
          {prices.map((price) => (
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
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#DD9933] to-transparent" />
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
                  <span className="text-3xl md:text-4xl font-bold text-[#DD9933]">
                    {price.price}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Footnote */}
        <motion.p
          className="text-gray-500 text-sm text-center mt-10 max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          * Zu den Tarifen Early@Babylon / Night@Babylon und Youngster@Babylon
          gibt es keine 5-Tage oder Two for One Gutscheine hinzu
        </motion.p>
      </div>
    </section>
  );
}
