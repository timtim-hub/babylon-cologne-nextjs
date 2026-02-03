"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

interface DealCard {
  id: string;
  name: string;
  price: string;
  description: string;
  isAddon?: boolean;
}

const deals: DealCard[] = [
  {
    id: "fuenferkarte",
    name: "Fünferkarte",
    price: "105 €",
    description: "Funf Eintritte, 24 Monate gültig , inklusive 1 Handtuch je Besuch.",
  },
  {
    id: "zehnerkarte",
    name: "Zehnerkarte",
    price: "199 €",
    description: "Zehn Eintritte, 24 Monate gültig , inklusive 1 Handtuch je Besuch.",
  },
];

const addons: DealCard[] = [
  {
    id: "bademantel",
    name: "Bademantel",
    price: "4 €",
    description: "Leihgebühr",
    isAddon: true,
  },
  {
    id: "badeschlappen",
    name: "Badeschlappen",
    price: "3 €",
    description: "Leihgebühr",
    isAddon: true,
  },
  {
    id: "handtuch",
    name: "Handtuchwechsel",
    price: "2 €",
    description: "Du brauchst ein frisches Handtuch? Einfach an der Theke melden.",
    isAddon: true,
  },
  {
    id: "komfort",
    name: "Komfort-Mietkabine",
    price: "19 €",
    description: "gültig für 6 Stunden, jede weitere angefangene Stunde 6 €",
    isAddon: true,
  },
  {
    id: "fetisch",
    name: "Fetisch Raum",
    price: "5 €",
    description: "die ersten 2 Stunden kostenfrei, jede weitere angefangene Stunde 5 €",
    isAddon: true,
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

// Slide-in animation for deal cards
const slideInLeftVariants = {
  hidden: {
    opacity: 0,
    x: -50,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
};

const slideInRightVariants = {
  hidden: {
    opacity: 0,
    x: 50,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
};

// AddOn cards slide up
const slideUpVariants = {
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

const disclaimerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
};

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

interface DealCardProps {
  deal: DealCard;
  index?: number;
  slideDirection?: "left" | "right" | "up";
}

function DealCard({ deal, index = 0, slideDirection = "up" }: DealCardProps) {
  const variants = slideDirection === "left" 
    ? slideInLeftVariants 
    : slideDirection === "right" 
    ? slideInRightVariants 
    : slideUpVariants;

  return (
    <motion.div
      variants={variants}
      whileHover={{
        scale: 1.02,
        transition: { duration: 0.3, ease: "easeOut" },
      }}
      className={`
        relative p-6 rounded-lg border-2 cursor-default
        transition-all duration-300
        ${
          deal.isAddon
            ? "bg-[#1a1a1a] border-[#333]"
            : "bg-[#1a1a1a] border-[#DD9933]/50"
        }
        hover:border-[#DD9933] hover:shadow-[0_0_30px_rgba(221,153,51,0.2)]
      `}
    >
      {/* Gold accent for non-addons */}
      {!deal.isAddon && (
        <motion.div 
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
          className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#DD9933] to-transparent origin-left"
        />
      )}

      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        {/* Deal Name */}
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-white mb-2">
            {deal.name}
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            {deal.description}
          </p>
        </div>

        {/* Deal Price */}
        <div className="flex-shrink-0">
          <motion.span 
            className="text-2xl md:text-3xl font-bold text-[#DD9933]"
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ 
              duration: 0.5, 
              delay: index * 0.1 + 0.4,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
          >
            {deal.price}
          </motion.span>
        </div>
      </div>
    </motion.div>
  );
}

export default function DealsSection() {
  return (
    <section
      id="deals"
      className="py-20 md:py-28 bg-black relative overflow-hidden"
    >
      {/* Decorative animated elements */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 0.08, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
        className="absolute top-1/4 left-0 w-[500px] h-[500px] rounded-full bg-[#DD9933] blur-3xl"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 0.05, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: 0.2 }}
        className="absolute bottom-1/4 right-0 w-[400px] h-[400px] rounded-full bg-[#CC3366] blur-3xl"
      />

      {/* Floating sparkles decoration */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="absolute top-32 right-20 hidden lg:block"
      >
        <motion.div
          animate={{ 
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Sparkles className="w-8 h-8 text-[#DD9933]/30" />
        </motion.div>
      </motion.div>

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
            className="inline-flex items-center gap-2 text-[#DD9933] text-sm uppercase tracking-widest mb-4"
          >
            <Sparkles className="w-4 h-4" />
            Angebote
            <Sparkles className="w-4 h-4" />
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Deals & AddOns
          </h2>
          <motion.div 
            className="w-24 h-1 bg-[#DD9933] mx-auto"
            variants={lineVariants}
          />
        </motion.div>

        {/* Multi-Entry Cards (Deals) with slide-in animations */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          {deals.map((deal, index) => (
            <DealCard 
              key={deal.id} 
              deal={deal} 
              index={index}
              slideDirection={index === 0 ? "left" : "right"}
            />
          ))}
        </motion.div>

        {/* AddOns Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-6"
        >
          <span className="text-white/50 text-sm uppercase tracking-widest">Zusatzleistungen</span>
        </motion.div>

        {/* AddOns Grid with stagger reveal */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          {addons.map((addon, index) => (
            <DealCard key={addon.id} deal={addon} index={index} slideDirection="up" />
          ))}
        </motion.div>

        {/* Disclaimer */}
        <motion.div
          className="mt-14 p-6 bg-[#1a1a1a] rounded-lg border border-[#333]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={disclaimerVariants}
        >
          <h4 className="text-[#DD9933] font-semibold mb-3 text-sm uppercase tracking-wider">
            Disclaimer
          </h4>
          <div className="text-gray-500 text-sm leading-relaxed space-y-2">
            <motion.p
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              Unsere Eintrittspreise verstehen sich für eine Aufenthaltsdauer von maximal 12 Stunden.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              Nachbuchungen bei Zeitüberschreitungen werden automatisch vom Kassensystem durchgeführt und unsere Mitarbeiter haben keinerlei Einfluss auf diese Nachbuchungen.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.4 }}
            >
              Das heißt: Nach Zeitüberschreitung von 12 Stunden wird jede weitere, angefangene Stunde mit 3,00 € berechnet.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.4 }}
            >
              Es besteht kein Rechtsanspruch auf Rabatte und Kulanzregelungen.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.4 }}
            >
              Zu Sonderevents (Bear Pride / Poolparty / Externe Veranstaltungen) können andere Eintrittspreise gelten.
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
