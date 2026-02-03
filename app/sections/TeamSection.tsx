"use client";

import { motion } from "framer-motion";
import { Section } from "../components/Section";
import { useInView } from "../hooks/useInView";
import { Users, Heart } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const memberVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const teamMembers = [
  { name: "Andreas", role: "Bar & Service" },
  { name: "Arno", role: "Rezeption" },
  { name: "Chris", role: "Bar & Service" },
  { name: "Fritz", role: "Facility" },
  { name: "Jan", role: "Bar & Service" },
  { name: "Joe", role: "Rezeption" },
  { name: "Marco", role: "Management" },
];

export function TeamSection() {
  const { ref, isInView } = useInView<HTMLElement>({ threshold: 0.1 });

  return (
    <Section
      id="team"
      ref={ref}
      className="relative overflow-hidden bg-[#0a0a0a]"
      padding="large"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.3 } : { opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#DD9933]/5 blur-3xl"
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
            <Users className="h-6 w-6 text-[#DD9933]" />
          </motion.div>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
            <span className="text-gradient-gold">Unser Team</span>
          </h2>
          <div className="section-divider mx-auto mb-6 w-24" />
          <motion.p
            variants={itemVariants}
            className="mx-auto max-w-2xl text-lg leading-relaxed text-white/70"
          >
            Wir wollen dass du bei uns eine schöne Zeit hast. Ob an der Bar, im
            Büro oder mit Putzlappen in der Hand: Unser Team ist für dich rund um
            die Uhr im Einsatz.
          </motion.p>
          <motion.div
            variants={itemVariants}
            className="mt-4 inline-flex items-center gap-2 text-[#CC3366]"
          >
            <Heart className="h-4 w-4" />
            <span className="text-sm italic">
              Schenke ihnen gerne ein Lächeln, du bekommst auch eins zurück
            </span>
            <Heart className="h-4 w-4" />
          </motion.div>
        </motion.div>

        {/* Team Grid */}
        <motion.div
          variants={containerVariants}
          className="flex flex-wrap justify-center gap-6 md:gap-8"
        >
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              variants={memberVariants}
              whileHover={{ scale: 1.05, y: -8 }}
              transition={{ duration: 0.3 }}
              className="group relative"
            >
              <div className="flex flex-col items-center">
                {/* Circular Photo Placeholder */}
                <div className="relative mb-3">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.8 }}
                    className="absolute inset-0 rounded-full bg-gradient-to-br from-[#DD9933] to-[#CC3366] opacity-0 blur transition-opacity duration-300 group-hover:opacity-50"
                  />
                  <div className="relative h-24 w-24 overflow-hidden rounded-full border-2 border-[#DD9933]/30 bg-[#212121] transition-all duration-300 group-hover:border-[#DD9933] sm:h-28 sm:w-28 md:h-32 md:w-32">
                    {/* Placeholder for team member photo */}
                    <div className="flex h-full w-full items-center justify-center">
                      <Users className="h-10 w-10 text-white/20 sm:h-12 sm:w-12" />
                    </div>
                    
                    {/* Hover overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-[#DD9933]/0 transition-colors duration-300 group-hover:bg-[#DD9933]/20">
                      <Heart className="h-6 w-6 scale-0 text-white transition-transform duration-300 group-hover:scale-100" />
                    </div>
                  </div>
                  
                  {/* Status indicator */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : { scale: 0 }}
                    transition={{ duration: 0.3, delay: 0.4 + index * 0.05 }}
                    className="absolute bottom-1 right-1 h-4 w-4 rounded-full border-2 border-[#0a0a0a] bg-green-500"
                  />
                </div>
                
                {/* Name */}
                <motion.h3
                  className="text-center text-sm font-semibold text-white transition-colors duration-300 group-hover:text-[#DD9933] sm:text-base"
                >
                  {member.name}
                </motion.h3>
                <p className="text-center text-xs text-white/50 sm:text-sm">
                  {member.role}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom decoration */}
        <motion.div
          variants={itemVariants}
          className="mt-16 flex justify-center"
        >
          <div className="flex items-center gap-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#DD9933]/50" />
            <Users className="h-5 w-5 text-[#DD9933]/50" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#DD9933]/50" />
          </div>
        </motion.div>
      </motion.div>
    </Section>
  );
}
