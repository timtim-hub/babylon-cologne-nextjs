"use client";

import { motion } from "framer-motion";
import { Section } from "../components/Section";
import { useInView } from "../hooks/useInView";
import { Users, Heart } from "lucide-react";
import Image from "next/image";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const teamMembers = [
  { name: "Andreas", role: "Bar & Service", image: "/images/team-andreas.jpg" },
  { name: "Arno", role: "Rezeption", image: "/images/team-arno.jpg" },
  { name: "Chris", role: "Bar & Service", image: "/images/team-chris.jpg" },
  { name: "Fritz", role: "Facility", image: "/images/team-fritz.jpg" },
  { name: "Jan", role: "Bar & Service", image: "/images/team-jan.jpg" },
  { name: "Joe", role: "Rezeption", image: "/images/team-joe.jpg" },
  { name: "Marco", role: "Management", image: "/images/team-marco.jpg" },
];

// Floating animation variants with different timings for each member
const getFloatingVariants = (index: number) => ({
  animate: {
    y: [0, -8, 0],
    transition: {
      duration: 3 + index * 0.3,
      repeat: Infinity,
      ease: "easeInOut" as const,
      delay: index * 0.2,
    },
  },
});

export function TeamSection() {
  const { ref, isInView } = useInView<HTMLElement>({ threshold: 0.1 });

  return (
    <Section
      id="team"
      ref={ref}
      className="relative overflow-hidden bg-[#0a0a0a]"
      padding="large"
    >
      {/* Animated background gradient pulse */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { 
            opacity: [0.2, 0.35, 0.2],
            scale: [1, 1.1, 1],
          } : { opacity: 0 }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute left-1/2 top-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-radial from-[#DD9933]/20 via-[#DD9933]/5 to-transparent blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { 
            opacity: [0.1, 0.2, 0.1],
          } : { opacity: 0 }}
          transition={{ 
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute left-1/4 top-1/3 h-[500px] w-[500px] rounded-full bg-[#CC3366]/10 blur-[100px]"
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
            initial={{ scale: 0, rotate: -180 }}
            animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
            transition={{ duration: 0.6, delay: 0.1, type: "spring", stiffness: 200 }}
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

        {/* Team Row - Scrollable on mobile */}
        <motion.div
          variants={containerVariants}
          className="relative"
        >
          {/* Horizontal scroll container for mobile */}
          <div className="scrollbar-hide -mx-4 overflow-x-auto px-4 pb-8 sm:mx-0 sm:overflow-visible sm:px-0">
            <div className="flex min-w-max justify-center gap-6 sm:min-w-0 sm:flex-wrap sm:gap-8 md:gap-10">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={member.name}
                  variants={itemVariants}
                  className="group relative"
                >
                  <motion.div
                    variants={getFloatingVariants(index)}
                    animate="animate"
                    className="flex flex-col items-center"
                  >
                    {/* Circular Photo with gold border */}
                    <motion.div 
                      className="relative mb-4"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    >
                      {/* Glow effect on hover */}
                      <motion.div
                        className="absolute -inset-2 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                        style={{
                          background: "radial-gradient(circle, rgba(221,153,51,0.4) 0%, transparent 70%)",
                        }}
                      />
                      
                      {/* Gold border with glow on hover */}
                      <div className="relative h-28 w-28 overflow-hidden rounded-full sm:h-32 sm:w-32 md:h-36 md:w-36">
                        {/* Border ring */}
                        <div className="absolute inset-0 rounded-full border-2 border-[#DD9933]/40 transition-all duration-500 group-hover:border-[#DD9933] group-hover:shadow-[0_0_20px_rgba(221,153,51,0.6)]" />
                        
                        {/* Inner border for depth */}
                        <div className="absolute inset-[3px] rounded-full border border-[#DD9933]/20 group-hover:border-[#DD9933]/40" />
                        
                        {/* Image container */}
                        <div className="absolute inset-[6px] overflow-hidden rounded-full">
                          <Image
                            src={member.image}
                            alt={member.name}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                            sizes="(max-width: 640px) 112px, (max-width: 768px) 128px, 144px"
                          />
                          
                          {/* Subtle overlay on hover */}
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/60 via-transparent to-transparent opacity-0 transition-opacity duration-400 group-hover:opacity-100" />
                        </div>
                      </div>

                      {/* Status indicator */}
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={isInView ? { scale: 1 } : { scale: 0 }}
                        transition={{ 
                          duration: 0.3, 
                          delay: 0.6 + index * 0.1,
                          type: "spring",
                          stiffness: 300,
                        }}
                        className="absolute bottom-1 right-1 h-4 w-4 rounded-full border-2 border-[#0a0a0a] bg-green-500 shadow-lg shadow-green-500/30"
                      />
                    </motion.div>
                    
                    {/* Name container with slide-up effect */}
                    <div className="relative h-12 overflow-hidden">
                      {/* Default name position */}
                      <motion.h3
                        className="text-center text-base font-semibold text-white/90 transition-all duration-400 group-hover:text-[#DD9933] sm:text-lg"
                        initial={{ y: 0 }}
                      >
                        {member.name}
                      </motion.h3>
                      
                      {/* Role - slides up on hover */}
                      <motion.p 
                        className="absolute left-0 right-0 text-center text-sm text-white/60 translate-y-8 transition-transform duration-400 group-hover:translate-y-0"
                      >
                        {member.role}
                      </motion.p>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Scroll hint for mobile */}
          <motion.div 
            className="mt-2 flex justify-center sm:hidden"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 1 }}
          >
            <div className="flex items-center gap-2 text-white/30">
              <motion.div
                animate={{ x: [-4, 4, -4] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <span className="text-lg">←</span>
              </motion.div>
              <span className="text-xs">Swipe</span>
              <motion.div
                animate={{ x: [4, -4, 4] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <span className="text-lg">→</span>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom decoration */}
        <motion.div
          variants={itemVariants}
          className="mt-12 flex justify-center sm:mt-16"
        >
          <div className="flex items-center gap-4">
            <motion.div 
              className="h-px w-16 bg-gradient-to-r from-transparent to-[#DD9933]/50"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            />
            <Users className="h-5 w-5 text-[#DD9933]/50" />
            <motion.div 
              className="h-px w-16 bg-gradient-to-l from-transparent to-[#DD9933]/50"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            />
          </div>
        </motion.div>
      </motion.div>
    </Section>
  );
}
