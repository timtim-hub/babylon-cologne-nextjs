"use client";

import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Section } from "../components";

interface Facility {
  id: number;
  title: string;
  description: string;
}

const facilities: Facility[] = [
  {
    id: 1,
    title: "AUSSENBEREICH",
    description:
      "Von unserer Bar aus gelangst Du direkt zu unserem großzügigen Innenhof mit mediterranem Flair.\n\nAls einzige Sauna in Köln kannst Du hier in unserem über 10m langen Außenpool Bahnen \"ziehen\", nach einem der Aufgüsse oder an heißen Tagen die passende Abkühlung und Erfrischung finden.",
  },
  {
    id: 2,
    title: "FINNISCHE SAUNA",
    description:
      "Im Hinterhaus findest Du unsere großzügige finnische Sauna mit Platz für bis zu 50 Personen. Mit ihrem fantastischem Blick über den gesamten Innenhof ein absolutes Highlight. Immer mittwochs, samstags und sonntags bringen wir Dich hier bei unseren bewährten Aufgüssen ins Schwitzen. Selbstverständlich reichen wir nach den Aufgüssen kühle Erfrischungen.",
  },
  {
    id: 3,
    title: "DAMPFSAUNA",
    description:
      "Unsere Dampfsauna ist nicht nur die größte Kölns, sie bietet mit Ihren Gängen und Labyrinthen auch eine ganze Menge zu entdecken.\n\nBegib Dich auf eine Entdeckungsreise, genieße die wohltuende Wärme, den angenehmen Duft und lasse Deiner Fantasien freien Lauf.",
  },
  {
    id: 4,
    title: "WHIRLPOOL",
    description:
      "Direkt vor dem Dampfsauna befindet sich unser großer Whirlpool im römischen Stil. Mit einer Temperatur von 36°C sorgen Millionen kleiner Luftblasen für einen Badespaß, der seinesgleichen sucht.\n\nEin einladender Platz um alleine zu entspannen oder das Treiben rundherum zu beobachten.",
  },
  {
    id: 5,
    title: "BAR",
    description:
      "Unsere großzügig gestaltete Bar mit offenem Kamin lädt Dich zum Genießen und Verweilen ein.\n\nNeben einer großzügigen Getränkeauswahl halten wir hier auch Einiges für den Hunger zwischendurch bereit. Ob Flammkuchen, diverse Salate oder Herzhaftes – unsere freundlichen Mitarbeiter bereiten stets alles frisch für Dich zu.",
  },
];

const slideVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
  }),
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export default function SaunaSection(): React.ReactElement {
  const [[currentIndex, direction], setCurrentIndex] = useState<[number, number]>(
    [0, 0]
  );

  const paginate = (newDirection: number): void => {
    const newIndex = currentIndex + newDirection;
    if (newIndex >= 0 && newIndex < facilities.length) {
      setCurrentIndex([newIndex, newDirection]);
    } else if (newIndex < 0) {
      setCurrentIndex([facilities.length - 1, newDirection]);
    } else {
      setCurrentIndex([0, newDirection]);
    }
  };

  const goToSlide = (index: number): void => {
    const newDirection = index > currentIndex ? 1 : -1;
    setCurrentIndex([index, newDirection]);
  };

  const currentFacility = facilities[currentIndex];

  return (
    <Section className="relative overflow-hidden bg-black">
      <motion.div
        className="container mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Section Header */}
        <motion.div className="text-center mb-12 md:mb-16" variants={itemVariants}>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Unsere <span className="text-[#DD9933]">Sauna</span>
          </h2>
          <p className="max-w-3xl mx-auto text-base md:text-lg text-white/80 leading-relaxed">
            Auf über 1400 m² und drei Etagen kannst du dir eine kleine Auszeit
            von der Welt nehmen. Egal ob du am großen Außenpool in der Sonne
            liegen möchtest, im Dampfbad und der Trockensauna schwitzt oder
            durch die langen Gänge unserer Cruisingarea umherschweifst: Hier
            findet jeder das was er sucht.
          </p>
        </motion.div>

        {/* Carousel Container */}
        <motion.div
          className="relative max-w-4xl mx-auto"
          variants={itemVariants}
        >
          {/* Carousel Content */}
          <div className="relative bg-[#212121] rounded-2xl p-6 md:p-10 lg:p-12 min-h-[320px] md:min-h-[280px] overflow-hidden">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.3 },
                }}
                className="absolute inset-0 p-6 md:p-10 lg:p-12 flex flex-col justify-center"
              >
                <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#DD9933] mb-4 md:mb-6 tracking-wide">
                  {currentFacility.title}
                </h3>
                <div className="space-y-4">
                  {currentFacility.description.split("\n\n").map((paragraph, idx) => (
                    <p
                      key={idx}
                      className="text-white text-base md:text-lg leading-relaxed"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Progress Indicator */}
            <div className="absolute top-4 right-4 md:top-6 md:right-6">
              <span className="text-[#DD9933] font-semibold text-sm md:text-base">
                {String(currentIndex + 1).padStart(2, "0")} /{" "}
                {String(facilities.length).padStart(2, "0")}
              </span>
            </div>
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <motion.button
              onClick={() => paginate(-1)}
              className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#212121] border-2 border-[#DD9933] flex items-center justify-center text-[#DD9933] transition-colors hover:bg-[#DD9933] hover:text-black disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Previous facility"
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>

            {/* Dots Indicator */}
            <div className="flex items-center gap-2 mx-4">
              {facilities.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "bg-[#DD9933] w-8"
                      : "bg-white/30 hover:bg-white/50 w-2.5"
                  }`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            <motion.button
              onClick={() => paginate(1)}
              className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#212121] border-2 border-[#DD9933] flex items-center justify-center text-[#DD9933] transition-colors hover:bg-[#DD9933] hover:text-black"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Next facility"
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>
          </div>
        </motion.div>
      </motion.div>

      {/* Decorative Elements */}
      <motion.div
        className="absolute top-20 left-10 w-32 h-32 border border-[#DD9933]/20 rounded-full"
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-48 h-48 border border-[#DD9933]/10 rounded-full"
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
      />
    </Section>
  );
}
