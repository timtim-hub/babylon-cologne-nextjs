"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Menu, X, Clock } from "lucide-react";
import { COLORS } from "./MotionComponents";

// ============================================
// Types
// ============================================

interface NavItem {
  label: string;
  href: string;
}

interface NavbarProps {
  isOpen?: boolean;
  openingTime?: string;
}

// ============================================
// Navigation Data
// ============================================

const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "#" },
  { label: "Location", href: "#location" },
  { label: "Preise", href: "#preise" },
  { label: "Öffnungszeiten", href: "#hours" },
  { label: "Events", href: "#calendar" },
  { label: "FAQ", href: "#faq" },
];

// ============================================
// Logo Component
// ============================================

const Logo: React.FC = () => {
  return (
    <motion.a
      href="#"
      className="flex flex-col items-start"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <span
        className="text-xl sm:text-2xl font-bold tracking-[0.2em]"
        style={{ color: COLORS.gold }}
      >
        BABYLON
      </span>
      <span
        className="text-[10px] sm:text-xs tracking-[0.4em] -mt-1"
        style={{ color: COLORS.white }}
      >
        COLOGNE
      </span>
    </motion.a>
  );
};

// ============================================
// Opening Hours Indicator
// ============================================

const OpeningHoursIndicator: React.FC<{ openingTime?: string }> = ({
  openingTime = "10:00",
}) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const checkOpeningHours = () => {
      const now = new Date();
      const currentHour = now.getHours();
      // Considered open between 10:00 and 06:00 next day
      setIsOpen(currentHour >= 10 || currentHour < 6);
    };

    checkOpeningHours();
    const interval = setInterval(checkOpeningHours, 60000); // Check every minute
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-full"
      style={{
        backgroundColor: isOpen ? "#22c55e20" : "#ef444420",
        border: `1px solid ${isOpen ? "#22c55e40" : "#ef444440"}`,
      }}
    >
      <Clock
        size={14}
        style={{ color: isOpen ? "#22c55e" : "#ef4444" }}
      />
      <span
        className="text-xs font-medium"
        style={{ color: isOpen ? "#22c55e" : "#ef4444" }}
      >
        {isOpen
          ? "Jetzt geöffnet"
          : `Aktuell geschlossen - Wir öffnen wieder um ${openingTime}`}
      </span>
    </motion.div>
  );
};

// ============================================
// Desktop Navigation
// ============================================

const DesktopNav: React.FC = () => {
  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      if (href === "#") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    },
    []
  );

  return (
    <nav className="hidden md:flex items-center gap-8">
      {NAV_ITEMS.map((item, index) => (
        <motion.a
          key={item.href}
          href={item.href}
          onClick={(e) => handleNavClick(e, item.href)}
          className="relative text-sm font-medium tracking-wide transition-colors duration-200"
          style={{ color: COLORS.white }}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 + 0.2 }}
          whileHover={{ color: COLORS.gold }}
        >
          {item.label}
          <motion.span
            className="absolute -bottom-1 left-0 h-[2px] w-0"
            style={{ backgroundColor: COLORS.gold }}
            whileHover={{ width: "100%" }}
            transition={{ duration: 0.2 }}
          />
        </motion.a>
      ))}
    </nav>
  );
};

// ============================================
// Mobile Menu
// ============================================

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const handleNavClick = useCallback(
    (href: string) => {
      onClose();
      setTimeout(() => {
        if (href === "#") {
          window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
          const element = document.querySelector(href);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }
      }, 300);
    },
    [onClose]
  );

  const menuVariants: Variants = {
    closed: {
      x: "100%",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
      },
    },
    open: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
      },
    },
  };

  const itemVariants = {
    closed: { opacity: 0, x: 50 },
    open: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.3,
      },
    }),
  };

  const overlayVariants = {
    closed: { opacity: 0 },
    open: { opacity: 1 },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
            variants={overlayVariants}
            initial="closed"
            animate="open"
            exit="closed"
            onClick={onClose}
          />

          {/* Menu Panel */}
          <motion.div
            className="fixed top-0 right-0 h-full w-[280px] z-50 md:hidden"
            style={{
              backgroundColor: COLORS.black,
              borderLeft: `1px solid ${COLORS.darkGray}`,
            }}
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            {/* Close Button */}
            <div className="flex items-center justify-between p-6">
              <span
                className="text-lg font-bold tracking-[0.2em]"
                style={{ color: COLORS.gold }}
              >
                MENÜ
              </span>
              <motion.button
                onClick={onClose}
                className="p-2 rounded-full"
                style={{ color: COLORS.white }}
                whileHover={{
                  backgroundColor: COLORS.darkGray,
                  color: COLORS.gold,
                }}
                whileTap={{ scale: 0.95 }}
              >
                <X size={24} />
              </motion.button>
            </div>

            {/* Navigation Items */}
            <nav className="flex flex-col px-6 py-4">
              {NAV_ITEMS.map((item, index) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  className="py-4 text-lg font-medium border-b"
                  style={{
                    color: COLORS.white,
                    borderColor: `${COLORS.darkGray}`,
                  }}
                  custom={index}
                  variants={itemVariants}
                  initial="closed"
                  animate="open"
                  whileHover={{ color: COLORS.gold, x: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  {item.label}
                </motion.a>
              ))}
            </nav>

            {/* Opening Hours - Mobile */}
            <motion.div
              className="absolute bottom-8 left-6 right-6 p-4 rounded-lg"
              style={{ backgroundColor: COLORS.darkGray }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Clock size={16} style={{ color: COLORS.gold }} />
                <span
                  className="text-sm font-medium"
                  style={{ color: COLORS.gold }}
                >
                  Öffnungszeiten
                </span>
              </div>
              <p className="text-xs" style={{ color: COLORS.white }}>
                Täglich 10:00 - 06:00 Uhr
                <br />
                <span className="opacity-70">
                  Samstags durchgehend geöffnet
                </span>
              </p>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// ============================================
// Mobile Menu Button
// ============================================

interface MobileMenuButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

const MobileMenuButton: React.FC<MobileMenuButtonProps> = ({
  isOpen,
  onClick,
}) => {
  return (
    <motion.button
      className="md:hidden p-2 rounded-lg"
      style={{ color: COLORS.white }}
      onClick={onClick}
      whileHover={{ backgroundColor: COLORS.darkGray }}
      whileTap={{ scale: 0.95 }}
      animate={{ rotate: isOpen ? 90 : 0 }}
      transition={{ duration: 0.2 }}
    >
      {isOpen ? <X size={24} /> : <Menu size={24} />}
    </motion.button>
  );
};

// ============================================
// Main Navbar Component
// ============================================

const Navbar: React.FC<NavbarProps> = ({ openingTime = "10:00" }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-30 transition-all duration-300"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        style={{
          backgroundColor: isScrolled
            ? `${COLORS.black}90`
            : "transparent",
          backdropFilter: isScrolled ? "blur(10px)" : "none",
          borderBottom: isScrolled
            ? `1px solid ${COLORS.darkGray}50`
            : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <Logo />

            {/* Desktop Navigation */}
            <DesktopNav />

            {/* Opening Hours Indicator */}
            <OpeningHoursIndicator openingTime={openingTime} />

            {/* Mobile Menu Button */}
            <MobileMenuButton
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
};

export default Navbar;
