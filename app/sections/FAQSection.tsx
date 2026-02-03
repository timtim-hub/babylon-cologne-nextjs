"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Section } from "../components/Section";
import { useInView } from "../hooks/useInView";
import { HelpCircle, ChevronDown, MessageCircle } from "lucide-react";
import { Button } from "../components/Button";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const faqItems = [
  {
    question: "Was muss ich mitbringen?",
    answer:
      "Prinzipiell musst Du gar nichts mitbringen. Ein Handtuch ist immer im Eintrittspreise inklusive, Badeschlappen kannst Du gegen eine Leihgebühr in Höhe von 3,00€ ausleihen, Duschgel findest Du in allen Duschbereichen, Haargel und Bodylotion halten wir in der Umkleide für Dich bereit.",
  },
  {
    question: "Wer darf alles rein?",
    answer:
      "Rein darf bei uns jeder, der mindestens 18 Jahre alt ist, männlich gelesen wird und nicht erkennbar unter Alkohol- und/ oder Drogeneinfluss steht.",
  },
  {
    question: "Wie kann ich bei euch bezahlen?",
    answer:
      "Neben Bargeld akzeptieren wir auch Kartenzahlungen (EC, MAESTRO, VISA & MASTERCARD) sowie Apple Pay und Google Pay. Ein Mindestumsatz für Kartenzahlungen liegt nicht vor.",
  },
  {
    question: "Wie lange kann ich bleiben?",
    answer:
      "Prinzipiell bis wir schließen. Nach 12 Stunden berechnen wir je weitere angefangene Stunde 3 € – Dies wird automatisch vom Kassensystem durchgeführt und unsere Mitarbeiter haben keinerlei Einfluss auf diese Nachbuchungen.",
  },
  {
    question: "Darf ich bei euch rauchen?",
    answer:
      "Die gesamten Innenräume der Anlage sind rauchfrei, auf der Terrasse kann natürlich zu jeder Tageszeit geraucht werden.",
  },
  {
    question: "Muss ich eine Badehose mitbringen?",
    answer:
      "Du kannst Dich in unserer ganzen Anlage nackt, im Handtuch, in Swimwear oder auch im Jock bekleidet bewegen. Du entscheidest selber für Dich. Unsere einzige Regel: Im Barbereich bitte Swimwear oder ein Handtuch.",
  },
  {
    question: "Habt ihr WiFi?",
    answer:
      "Ja, ein kostenloses WLAN ist am Start – Das Passwort hängt in der Umkleide aus oder frag einfach einen unserer freundlichen Mitarbeiter.",
  },
  {
    question: "Darf ich fotografieren / Filmen?",
    answer:
      "Das Fotografieren und Filmen ist in der gesamten Anlage untersagt. Die Handynutzung ist nur im Barbereich, im Wintergarten und am Pool gestattet.",
  },
  {
    question: "Brauche ich Bargeld an der Bar?",
    answer:
      "Wir erfassen den Verzehr während Deines Aufenthaltes per Kassensystem auf Deinem Spindschlüssel; Geld brauchst Du erst beim Auschecken wieder an der Kasse.",
  },
  {
    question: "Kann ich selber einen Aufguss machen?",
    answer:
      "Selbstverständlich! Frag unsere freundlichen Mitarbeiter an der Bar – wir halten eine große Auswahl an Aufgussdüften bereit.",
  },
  {
    question: "Welche Vorteile haben eure 10er Karten?",
    answer:
      "Mit unseren Mehrfachkarten kannst Du gegenüber dem Einzeleintritt eine ganze Menge sparen. Zudem wird die Karte auch in der Ruhrwellness Sauna Mülheim und in der Insel Sauna Münster akzeptiert.",
  },
  {
    question: "Habt ihr auch Gutscheine?",
    answer:
      "Gutscheine erhälst Du bei unseren freundlichen Mitarbeitern direkt an der Kasse. Du hast die Wahl zwischen einem Einzeleintritt, einer 5er Karte und einer 10er Karte.",
  },
  {
    question: "Wie sieht es mit der Wasserhygiene aus?",
    answer:
      "Bei uns kannst Du Dich überall unbedenklich vergnügen, natürlich auch im Wasser. Und dabei bleibt die Wasserqualität nicht auf der Strecke. Aufwändige Wasseraufbereitungen sorgen dafür, dass das Wasser in unseren Pools immer tip top ist.",
  },
  {
    question: "Habt ihr auch Kabinen?",
    answer:
      "Kabinen stehen in der gesamten Anlage kostenfrei für jeden zur Verfügung. Und wenn es dann doch etwas privater sein soll? Kein Problem! Im Hinterhaus haben wir auch Komfortkabinen, die Du mieten kannst (6 Stunden für 19,00€).",
  },
  {
    question: "Gibt es französische Toiletten?",
    answer:
      "Im Hinterhaus findest Du zwei französische Toiletten. Das passende Equipment kannst Du bei uns an der Kasse erwerben.",
  },
  {
    question: "Habt ihr Parkplätze?",
    answer:
      "Wir liegen inmitten der Innenstadt und haben keine hauseigenen Parkmöglichkeiten. Unweit befinden sich die Parkhäuser \"Im Klapperhof\" und \"Alte Wallgasse\".",
  },
];

function FAQItem({
  question,
  answer,
  index,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      variants={itemVariants}
      className="overflow-hidden rounded-xl border border-white/10 bg-[#212121]/50 backdrop-blur-sm"
    >
      <motion.button
        onClick={onToggle}
        className="flex w-full items-center justify-between p-4 text-left transition-colors hover:bg-white/5 sm:p-5"
        whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}
        whileTap={{ scale: 0.99 }}
      >
        <div className="flex items-center gap-3">
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#DD9933]/10 text-xs font-medium text-[#DD9933]">
            {index + 1}
          </span>
          <span className="font-medium text-white sm:text-lg">{question}</span>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="ml-4 shrink-0"
        >
          <ChevronDown className="h-5 w-5 text-[#DD9933]" />
        </motion.div>
      </motion.button>
      
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="border-t border-white/10 px-4 pb-4 pt-2 sm:px-5 sm:pb-5">
              <p className="pl-9 leading-relaxed text-white/70">{answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function FAQSection() {
  const { ref, isInView } = useInView<HTMLElement>({ threshold: 0.05 });
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <Section
      id="faq"
      ref={ref}
      className="relative overflow-hidden bg-black"
      padding="large"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.3 } : { opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute -right-1/4 top-0 h-[600px] w-[600px] rounded-full bg-[#DD9933]/5 blur-3xl"
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
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-4 inline-flex items-center justify-center rounded-full bg-[#DD9933]/10 p-3"
          >
            <HelpCircle className="h-6 w-6 text-[#DD9933]" />
          </motion.div>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
            <span className="text-gradient-gold">Fragen + Antworten</span>
          </h2>
          <div className="section-divider mx-auto mb-6 w-24" />
          <motion.p
            variants={itemVariants}
            className="mx-auto max-w-2xl text-lg text-white/70"
          >
            Fragen vor dem Besuch? Kein Problem, hier haben wir die häufigsten
            Fragen für Dich beantwortet!
          </motion.p>
        </motion.div>

        {/* FAQ List */}
        <motion.div
          variants={containerVariants}
          className="mx-auto max-w-3xl space-y-3"
        >
          {faqItems.map((item, index) => (
            <FAQItem
              key={item.question}
              question={item.question}
              answer={item.answer}
              index={index}
              isOpen={openIndex === index}
              onToggle={() => handleToggle(index)}
            />
          ))}
        </motion.div>

        {/* Contact CTA */}
        <motion.div
          variants={itemVariants}
          className="mt-12 text-center"
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="inline-flex flex-col items-center gap-4 rounded-2xl border border-[#DD9933]/20 bg-[#DD9933]/5 px-8 py-6"
          >
            <div className="flex items-center gap-3">
              <MessageCircle className="h-5 w-5 text-[#DD9933]" />
              <span className="text-lg font-medium text-white">
                Du hast noch eine Frage?
              </span>
            </div>
            <p className="text-white/60">
              Dann stell sie uns direkt:
            </p>
            <Button variant="primary" size="lg">
              Kontakt
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </Section>
  );
}
