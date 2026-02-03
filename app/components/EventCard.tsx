"use client";

import { motion } from "framer-motion";
import { Clock, CalendarDays, ChevronDown, Tag } from "lucide-react";
import { useState } from "react";

export type EventCategory =
  | "Fetisch"
  | "Öffnungszeiten Normal"
  | "Öffnungszeiten Speziell"
  | "Rabatte"
  | "Specials"
  | "Wellness";

export interface Event {
  id: string;
  name: string;
  description: string;
  time?: string;
  category: EventCategory;
  recurrence: string;
  dayOfWeek: number; // 0 = Sunday, 1 = Monday, etc.
  weekOfMonth?: number; // For events like "every 4th Tuesday"
}

interface EventCardProps {
  event: Event;
  date?: Date;
  index?: number;
  compact?: boolean;
}

const categoryColors: Record<EventCategory, string> = {
  Fetisch: "bg-[#CC3366]/20 text-[#E64D80] border-[#CC3366]/30",
  "Öffnungszeiten Normal": "bg-white/10 text-white border-white/20",
  "Öffnungszeiten Speziell": "bg-white/10 text-white border-white/20",
  Rabatte: "bg-[#DD9933]/20 text-[#DD9933] border-[#DD9933]/30",
  Specials: "bg-[#DD9933]/20 text-[#DD9933] border-[#DD9933]/30",
  Wellness: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
};

const categoryIcons: Record<EventCategory, string> = {
  Fetisch: "🐾",
  "Öffnungszeiten Normal": "🕐",
  "Öffnungszeiten Speziell": "⏰",
  Rabatte: "💰",
  Specials: "✨",
  Wellness: "🧖",
};

export default function EventCard({
  event,
  date,
  index = 0,
  compact = false,
}: EventCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("de-DE", {
      weekday: "long",
      day: "numeric",
      month: "long",
    }).format(date);
  };

  if (compact) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05 }}
        className={`
          relative overflow-hidden rounded-lg border border-[#DD9933]/20 bg-[#212121]/50 p-3
          transition-all duration-300 hover:border-[#DD9933]/50 hover:bg-[#212121]/70
        `}
      >
        <div className="flex items-center gap-3">
          <span className="text-xl">{categoryIcons[event.category]}</span>
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-[#DD9933] truncate">{event.name}</h4>
            {event.time && (
              <p className="text-xs text-white/60 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {event.time}
              </p>
            )}
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * 0.1,
        duration: 0.5,
        ease: "easeOut",
      }}
      whileHover={{ scale: 1.02 }}
      className={`
        group relative overflow-hidden rounded-xl border transition-all duration-500
        ${
          isExpanded
            ? "border-[#DD9933]/60 bg-[#212121] shadow-lg shadow-[#DD9933]/10"
            : "border-[#DD9933]/20 bg-[#212121]/80 hover:border-[#DD9933]/40"
        }
      `}
    >
      {/* Gold accent line */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#DD9933] to-transparent"
        initial={{ scaleX: 0, opacity: 0 }}
        whileHover={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
      />

      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <motion.div
              whileHover={{ rotate: 10, scale: 1.1 }}
              className={`
                flex h-12 w-12 items-center justify-center rounded-xl text-2xl
                ${categoryColors[event.category]}
              `}
            >
              {categoryIcons[event.category]}
            </motion.div>
            <div>
              <h3 className="text-lg font-semibold text-[#DD9933] group-hover:text-[#E5AD5C] transition-colors">
                {event.name}
              </h3>
              <div className="flex items-center gap-3 mt-1 text-sm text-white/60">
                <span className="flex items-center gap-1">
                  <CalendarDays className="w-4 h-4" />
                  {event.recurrence}
                </span>
                {event.time && (
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {event.time}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Category badge */}
          <span
            className={`
              hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium
              border ${categoryColors[event.category]}
            `}
          >
            <Tag className="w-3 h-3" />
            {event.category}
          </span>
        </div>

        {/* Date display if provided */}
        {date && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mt-3 pl-15 ml-15"
          >
            <p className="text-sm text-[#DD9933]/80 font-medium">
              {formatDate(date)}
            </p>
          </motion.div>
        )}

        {/* Description - always visible */}
        <p className="mt-3 text-white/70 text-sm leading-relaxed line-clamp-2 group-hover:line-clamp-none transition-all duration-300">
          {event.description}
        </p>

        {/* Expandable content */}
        <motion.div
          initial={false}
          animate={{
            height: isExpanded ? "auto" : 0,
            opacity: isExpanded ? 1 : 0,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          <div className="pt-4 mt-4 border-t border-white/10">
            <div className="flex flex-wrap gap-2">
              <span className="text-xs text-white/50 uppercase tracking-wider">
                Kategorie:
              </span>
              <span className="text-sm text-[#DD9933]">{event.category}</span>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              <span className="text-xs text-white/50 uppercase tracking-wider">
                Wiederholung:
              </span>
              <span className="text-sm text-white/80">{event.recurrence}</span>
            </div>
          </div>
        </motion.div>

        {/* Expand button */}
        <motion.button
          onClick={() => setIsExpanded(!isExpanded)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-4 flex items-center gap-2 text-sm text-[#DD9933]/60 hover:text-[#DD9933] transition-colors"
        >
          <span>{isExpanded ? "Weniger anzeigen" : "Mehr erfahren"}</span>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        </motion.button>
      </div>

      {/* Background glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#DD9933]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </motion.div>
  );
}
