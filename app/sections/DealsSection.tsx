"use client";

import { motion } from "framer-motion";

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

interface DealCardProps {
  deal: DealCard;
}

function DealCard({ deal }: DealCardProps) {
  return (
    <motion.div
      variants={cardVariants}
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
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#DD9933] to-transparent" />
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
          <span className="text-2xl md:text-3xl font-bold text-[#DD9933]">
            {deal.price}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function DealsSection() {
  return (
    <section
      id="deals"
      className="py-20 md:py-28 bg-black"
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
            Deals & AddOns
          </h2>
          <div className="w-24 h-1 bg-[#DD9933] mx-auto" />
        </motion.div>

        {/* Multi-Entry Cards (Deals) */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
        >
          {deals.map((deal) => (
            <DealCard key={deal.id} deal={deal} />
          ))}
        </motion.div>

        {/* AddOns Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
        >
          {addons.map((addon) => (
            <DealCard key={addon.id} deal={addon} />
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
            <p>
              Unsere Eintrittspreise verstehen sich für eine Aufenthaltsdauer von maximal 12 Stunden.
            </p>
            <p>
              Nachbuchungen bei Zeitüberschreitungen werden automatisch vom Kassensystem durchgeführt und unsere Mitarbeiter haben keinerlei Einfluss auf diese Nachbuchungen.
            </p>
            <p>
              Das heißt: Nach Zeitüberschreitung von 12 Stunden wird jede weitere, angefangene Stunde mit 3,00 € berechnet.
            </p>
            <p>
              Es besteht kein Rechtsanspruch auf Rabatte und Kulanzregelungen.
            </p>
            <p>
              Zu Sonderevents (Bear Pride / Poolparty / Externe Veranstaltungen) können andere Eintrittspreise gelten.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
