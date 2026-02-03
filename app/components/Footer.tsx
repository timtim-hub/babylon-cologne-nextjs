"use client";

import { motion, Variants } from "framer-motion";
import { Container } from "./Container";
import {
  MapPin,
  Phone,
  Mail,
  Instagram,
  Twitter,
  MessageCircle,
  Facebook,
  Clock,
  Heart,
} from "lucide-react";

// Stagger container with delayChildren for columns
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

// Column reveal animation: y: 30 -> 0 with opacity
const columnVariants: Variants = {
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

const linkVariants: Variants = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
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

const socialLinks = [
  { name: "Instagram", icon: Instagram, href: "#" },
  { name: "X/Twitter", icon: Twitter, href: "#" },
  { name: "WhatsApp", icon: MessageCircle, href: "#" },
  { name: "Facebook", icon: Facebook, href: "#" },
];

const quickLinks = [
  { name: "Öffnungszeiten", href: "#oeffnungszeiten" },
  { name: "Preise", href: "#preise" },
  { name: "Team", href: "#team" },
  { name: "Massage", href: "#massage" },
  { name: "FAQ", href: "#faq" },
  { name: "Kontakt", href: "#kontakt" },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#0a0a0a]">
      {/* Top gradient border with animation */}
      <motion.div 
        variants={lineVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="h-px bg-gradient-to-r from-transparent via-[#DD9933]/50 to-transparent"
      />

      {/* Main Footer Content */}
      <div className="py-16 md:py-20">
        <Container>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid gap-12 md:grid-cols-2 lg:grid-cols-4"
          >
            {/* Brand Column */}
            <motion.div variants={columnVariants} className="lg:col-span-1">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="mb-4"
              >
                <h3 className="text-2xl font-bold">
                  <span className="text-gradient-gold">BABYLON</span>
                </h3>
                <p className="text-sm tracking-wider text-white/60">COLOGNE</p>
              </motion.div>
              <p className="mb-6 text-sm leading-relaxed text-white/50">
                Erlebe Entspannung und erotische Abenteuer in der modernsten Gay
                Sauna Kölns. Wir freuen uns auf Dich!
              </p>
              
              {/* Social Links with stagger */}
              <motion.div 
                className="flex gap-3"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
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
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    variants={linkVariants}
                    whileHover={{ scale: 1.15, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-[#212121] text-white/60 transition-colors hover:bg-[#DD9933]/20 hover:text-[#DD9933]"
                    aria-label={social.name}
                  >
                    <social.icon className="h-4 w-4" />
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>

            {/* Quick Links */}
            <motion.div variants={columnVariants}>
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#DD9933]">
                Navigation
              </h4>
              <motion.ul 
                className="space-y-2"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.05,
                      delayChildren: 0.2,
                    },
                  },
                }}
              >
                {quickLinks.map((link) => (
                  <motion.li key={link.name} variants={linkVariants}>
                    <motion.a
                      href={link.href}
                      whileHover={{ x: 4, color: "#DD9933" }}
                      className="inline-block text-sm text-white/60 transition-colors"
                    >
                      {link.name}
                    </motion.a>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>

            {/* Contact Info */}
            <motion.div variants={columnVariants}>
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#DD9933]">
                Kontakt
              </h4>
              <motion.ul 
                className="space-y-3"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.1,
                      delayChildren: 0.2,
                    },
                  },
                }}
              >
                <motion.li variants={linkVariants}>
                  <motion.a
                    href="https://maps.google.com/?q=Friesenstraße+23-25,+50670+Köln"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ x: 4, color: "#DD9933" }}
                    className="flex items-start gap-3 text-sm text-white/60 transition-colors"
                  >
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                    <span>Friesenstraße 23-25<br />50670 Köln</span>
                  </motion.a>
                </motion.li>
                <motion.li variants={linkVariants}>
                  <motion.a
                    href="tel:022142074577"
                    whileHover={{ x: 4, color: "#DD9933" }}
                    className="flex items-center gap-3 text-sm text-white/60 transition-colors"
                  >
                    <Phone className="h-4 w-4 shrink-0" />
                    <span>0221 420 745 77</span>
                  </motion.a>
                </motion.li>
                <motion.li variants={linkVariants}>
                  <motion.a
                    href="mailto:info@babylon-cologne.de"
                    whileHover={{ x: 4, color: "#DD9933" }}
                    className="flex items-center gap-3 text-sm text-white/60 transition-colors"
                  >
                    <Mail className="h-4 w-4 shrink-0" />
                    <span>info@babylon-cologne.de</span>
                  </motion.a>
                </motion.li>
              </motion.ul>
            </motion.div>

            {/* Hours */}
            <motion.div variants={columnVariants}>
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#DD9933]">
                Öffnungszeiten
              </h4>
              <motion.ul 
                className="space-y-3"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.1,
                      delayChildren: 0.2,
                    },
                  },
                }}
              >
                <motion.li variants={linkVariants} className="flex items-start gap-3">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0 text-[#DD9933]" />
                  <div>
                    <p className="text-sm font-medium text-white">Montag - Freitag</p>
                    <p className="text-sm text-white/60">10:00 - 06:00 Uhr</p>
                  </div>
                </motion.li>
                <motion.li variants={linkVariants} className="flex items-start gap-3">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0 text-[#CC3366]" />
                  <div>
                    <p className="text-sm font-medium text-white">Wochenende & Feiertage</p>
                    <p className="text-sm text-white/60">Durchgehend geöffnet</p>
                  </div>
                </motion.li>
              </motion.ul>
              <motion.p
                variants={linkVariants}
                className="mt-4 text-xs text-white/40"
              >
                365 Tage im Jahr für Dich da!
              </motion.p>
            </motion.div>
          </motion.div>
        </Container>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 bg-black py-6">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex flex-col items-center justify-between gap-4 md:flex-row"
          >
            <motion.p 
              className="flex items-center gap-1 text-xs text-white/40"
              whileHover={{ scale: 1.02 }}
            >
              Made with 
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
              >
                <Heart className="h-3 w-3 text-[#CC3366]" />
              </motion.span> 
              in Cologne
            </motion.p>
            <p className="text-xs text-white/40">
              © {new Date().getFullYear()} Babylon Cologne. Alle Rechte vorbehalten.
            </p>
            <motion.div 
              className="flex gap-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.05,
                    delayChildren: 0.3,
                  },
                },
              }}
            >
              <motion.a
                href="#"
                variants={linkVariants}
                whileHover={{ color: "#DD9933", x: 2 }}
                className="text-xs text-white/40 transition-colors"
              >
                Impressum
              </motion.a>
              <motion.a
                href="#"
                variants={linkVariants}
                whileHover={{ color: "#DD9933", x: 2 }}
                className="text-xs text-white/40 transition-colors"
              >
                Datenschutz
              </motion.a>
              <motion.a
                href="#"
                variants={linkVariants}
                whileHover={{ color: "#DD9933", x: 2 }}
                className="text-xs text-white/40 transition-colors"
              >
                AGB
              </motion.a>
            </motion.div>
          </motion.div>
        </Container>
      </div>
    </footer>
  );
}
