"use client";

import { motion } from "framer-motion";
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
      {/* Top gradient border */}
      <div className="section-divider" />

      {/* Main Footer Content */}
      <div className="py-16 md:py-20">
        <Container>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid gap-12 md:grid-cols-2 lg:grid-cols-4"
          >
            {/* Brand Column */}
            <motion.div variants={itemVariants} className="lg:col-span-1">
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
              
              {/* Social Links */}
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-[#212121] text-white/60 transition-colors hover:bg-[#DD9933]/20 hover:text-[#DD9933]"
                    aria-label={social.name}
                  >
                    <social.icon className="h-4 w-4" />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div variants={itemVariants}>
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#DD9933]">
                Navigation
              </h4>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <motion.a
                      href={link.href}
                      whileHover={{ x: 4 }}
                      className="inline-block text-sm text-white/60 transition-colors hover:text-[#DD9933]"
                    >
                      {link.name}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Contact Info */}
            <motion.div variants={itemVariants}>
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#DD9933]">
                Kontakt
              </h4>
              <ul className="space-y-3">
                <li>
                  <motion.a
                    href="https://maps.google.com/?q=Friesenstraße+23-25,+50670+Köln"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ x: 4 }}
                    className="flex items-start gap-3 text-sm text-white/60 transition-colors hover:text-[#DD9933]"
                  >
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                    <span>Friesenstraße 23-25<br />50670 Köln</span>
                  </motion.a>
                </li>
                <li>
                  <motion.a
                    href="tel:022142074577"
                    whileHover={{ x: 4 }}
                    className="flex items-center gap-3 text-sm text-white/60 transition-colors hover:text-[#DD9933]"
                  >
                    <Phone className="h-4 w-4 shrink-0" />
                    <span>0221 420 745 77</span>
                  </motion.a>
                </li>
                <li>
                  <motion.a
                    href="mailto:info@babylon-cologne.de"
                    whileHover={{ x: 4 }}
                    className="flex items-center gap-3 text-sm text-white/60 transition-colors hover:text-[#DD9933]"
                  >
                    <Mail className="h-4 w-4 shrink-0" />
                    <span>info@babylon-cologne.de</span>
                  </motion.a>
                </li>
              </ul>
            </motion.div>

            {/* Hours */}
            <motion.div variants={itemVariants}>
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#DD9933]">
                Öffnungszeiten
              </h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0 text-[#DD9933]" />
                  <div>
                    <p className="text-sm font-medium text-white">Montag - Freitag</p>
                    <p className="text-sm text-white/60">10:00 - 06:00 Uhr</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0 text-[#CC3366]" />
                  <div>
                    <p className="text-sm font-medium text-white">Wochenende & Feiertage</p>
                    <p className="text-sm text-white/60">Durchgehend geöffnet</p>
                  </div>
                </li>
              </ul>
              <motion.p
                variants={itemVariants}
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
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-between gap-4 md:flex-row"
          >
            <p className="flex items-center gap-1 text-xs text-white/40">
              Made with <Heart className="h-3 w-3 text-[#CC3366]" /> in Cologne
            </p>
            <p className="text-xs text-white/40">
              © {new Date().getFullYear()} Babylon Cologne. Alle Rechte vorbehalten.
            </p>
            <div className="flex gap-4">
              <motion.a
                href="#"
                whileHover={{ color: "#DD9933" }}
                className="text-xs text-white/40 transition-colors"
              >
                Impressum
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ color: "#DD9933" }}
                className="text-xs text-white/40 transition-colors"
              >
                Datenschutz
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ color: "#DD9933" }}
                className="text-xs text-white/40 transition-colors"
              >
                AGB
              </motion.a>
            </div>
          </motion.div>
        </Container>
      </div>
    </footer>
  );
}
