"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  List,
  Clock,
  Search,
  Filter,
  X,
} from "lucide-react";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  isToday,
  getDay,
  getWeekOfMonth,
} from "date-fns";
import { de } from "date-fns/locale";
import EventCard, { Event, EventCategory } from "../components/EventCard";

// Sample events data
const eventsData: Event[] = [
  {
    id: "1",
    name: "5 Tage Gutschein",
    description:
      "Komme heute zum Standard Eintritt in die Babylon und bekomme einen Gutschein für einen kostenlosen Eintritt innerhalb der nächsten 5 Tage (Montag bis einschließlich Freitag)",
    category: "Rabatte",
    recurrence: "Jeden Montag",
    dayOfWeek: 1,
  },
  {
    id: "2",
    name: "Puppy Night",
    description:
      "Der Dienstag in der Babylon ist der Tag in der Woche wo man Kinks, Fetische und sich selbst ausleben kann. Jeden 4. Dienstag im Monat ist unsere Puppy Night.",
    category: "Fetisch",
    recurrence: "Jeder 4. Dienstag",
    dayOfWeek: 2,
    weekOfMonth: 4,
  },
  {
    id: "3",
    name: "Relax @ Babylon",
    description:
      "Jeden Mittwoch gibt es in der Zeit von 18:00 bis 21:00 Uhr stündliche Aufgüsse mit Obst und anderen Erfrischungen in unserer Finnischen Sauna.",
    time: "18:00 - 21:00",
    category: "Wellness",
    recurrence: "Jeden Mittwoch",
    dayOfWeek: 3,
  },
  {
    id: "4",
    name: "Studententag",
    description:
      "Immer donnerstags: mit Studentenausweis, bis einschließlich 35 Jahre nur 17 € Eintritt für das volle Programm.",
    category: "Rabatte",
    recurrence: "Jeden Donnerstag",
    dayOfWeek: 4,
  },
  {
    id: "5",
    name: "Two for One",
    description:
      "Zahle heute den Standard-Eintritt und Du erhältst einen Gutschein für einen erneuten, kostenfreien Besuch an einem Freitag innerhalb von 30 Tagen.",
    category: "Rabatte",
    recurrence: "Jeden Freitag",
    dayOfWeek: 5,
  },
  {
    id: "6",
    name: "Wellness am Sonntag",
    description:
      "Ab 16 Uhr erwarten Dich stündlich wechselnde und entspannende Aufgüsse mit kostenlosem Obst.",
    time: "16:00 - 20:00",
    category: "Wellness",
    recurrence: "Jeden Sonntag",
    dayOfWeek: 0,
  },
];

const weekDays = ["S", "M", "D", "M", "D", "F", "S"];

const categories: (EventCategory | "Alle")[] = [
  "Alle",
  "Fetisch",
  "Öffnungszeiten Normal",
  "Öffnungszeiten Speziell",
  "Rabatte",
  "Specials",
  "Wellness",
];

const viewOptions = [
  { id: "month", label: "Monat", icon: CalendarIcon },
  { id: "list", label: "Liste", icon: List },
  { id: "day", label: "Tag", icon: Clock },
] as const;

type ViewType = (typeof viewOptions)[number]["id"];

// Function to get events for a specific date
function getEventsForDate(date: Date, events: Event[]): Event[] {
  const dayOfWeek = getDay(date);
  const weekOfMonth = getWeekOfMonth(date, { locale: de });

  return events.filter((event) => {
    if (event.dayOfWeek !== dayOfWeek) return false;
    if (event.weekOfMonth && event.weekOfMonth !== weekOfMonth) return false;
    return true;
  });
}

// Enhanced animation variants with smoother transitions
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
    x: direction > 0 ? -300 : 300,
    opacity: 0,
  }),
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
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
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
};

const titleVariants: Variants = {
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

export default function CalendarSection() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [view, setView] = useState<ViewType>("month");
  const [selectedCategory, setSelectedCategory] = useState<
    EventCategory | "Alle"
  >("Alle");
  const [searchQuery, setSearchQuery] = useState("");
  const [direction, setDirection] = useState(0);

  // Filter events based on category and search
  const filteredEvents = useMemo(() => {
    return eventsData.filter((event) => {
      const matchesCategory =
        selectedCategory === "Alle" || event.category === selectedCategory;
      const matchesSearch =
        searchQuery === "" ||
        event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Get calendar days
  const calendarDays = useMemo(() => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const calendarStart = startOfWeek(monthStart, { weekStartsOn: 1 }); // Monday start
    const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });

    return eachDayOfInterval({ start: calendarStart, end: calendarEnd });
  }, [currentDate]);

  // Navigation handlers
  const goToPreviousMonth = () => {
    setDirection(-1);
    setCurrentDate((prev) => subMonths(prev, 1));
  };

  const goToNextMonth = () => {
    setDirection(1);
    setCurrentDate((prev) => addMonths(prev, 1));
  };

  const goToToday = () => {
    setDirection(currentDate > new Date() ? -1 : 1);
    setCurrentDate(new Date());
    setSelectedDate(new Date());
  };

  // Scroll to section on mount
  useEffect(() => {
    const hash = window.location.hash;
    if (hash === "#calendar") {
      const element = document.getElementById("calendar");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, []);

  return (
    <section
      id="calendar"
      className="relative py-24 px-4 sm:px-6 lg:px-8 bg-black overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="absolute top-0 left-1/4 w-96 h-96 bg-[#DD9933]/5 rounded-full blur-3xl" 
        />
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#DD9933]/5 rounded-full blur-3xl" 
        />
      </div>

      {/* Section divider top */}
      <motion.div
        variants={lineVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#DD9933]/50 to-transparent"
      />

      <div className="relative max-w-7xl mx-auto">
        {/* Section Header with smoother animations */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={titleVariants}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#DD9933]/30 bg-[#DD9933]/10 mb-6"
          >
            <CalendarIcon className="w-4 h-4 text-[#DD9933]" />
            <span className="text-sm text-[#DD9933] font-medium">
              Veranstaltungen
            </span>
          </motion.div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
            <span className="text-gradient-gold">Kalender & Events</span>
          </h2>

          <motion.p 
            variants={itemVariants}
            className="text-white/60 text-lg max-w-2xl mx-auto"
          >
            Entdecke unsere wöchentlichen Events, Specials und Wellness-Angebote
          </motion.p>

          {/* Section divider */}
          <motion.div 
            variants={lineVariants}
            className="section-divider mt-8 max-w-xs mx-auto" 
          />
        </motion.div>

        {/* Controls Bar with staggered reveal */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
          className="mb-8 space-y-4"
        >
          {/* Top Row: View Switcher, Navigation, Search */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col lg:flex-row gap-4 items-center justify-between"
          >
            {/* View Switcher */}
            <div className="flex bg-[#212121] rounded-xl p-1 border border-[#DD9933]/20">
              {viewOptions.map((option) => (
                <motion.button
                  key={option.id}
                  onClick={() => setView(option.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300
                    ${
                      view === option.id
                        ? "bg-[#DD9933] text-black"
                        : "text-white/60 hover:text-white"
                    }
                  `}
                >
                  <option.icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{option.label}</span>
                </motion.button>
              ))}
            </div>

            {/* Month Navigation */}
            <div className="flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={goToPreviousMonth}
                className="p-2 rounded-xl border border-[#DD9933]/30 text-[#DD9933] hover:bg-[#DD9933]/10 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </motion.button>

              <div className="min-w-[200px] text-center">
                <motion.h3
                  key={format(currentDate, "MMMM yyyy", { locale: de })}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xl font-semibold text-white capitalize"
                >
                  {format(currentDate, "MMMM yyyy", { locale: de })}
                </motion.h3>
              </div>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={goToNextMonth}
                className="p-2 rounded-xl border border-[#DD9933]/30 text-[#DD9933] hover:bg-[#DD9933]/10 transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={goToToday}
                className="ml-2 px-4 py-2 rounded-xl border border-[#DD9933]/30 text-[#DD9933] text-sm font-medium hover:bg-[#DD9933] hover:text-black transition-all duration-300"
              >
                Dieser Monat
              </motion.button>
            </div>

            {/* Search */}
            <div className="relative w-full lg:w-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <input
                type="text"
                placeholder="Events suchen..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full lg:w-64 pl-10 pr-10 py-2.5 bg-[#212121] border border-[#DD9933]/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-[#DD9933]/50 transition-colors"
              />
              {searchQuery && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </motion.button>
              )}
            </div>
          </motion.div>

          {/* Category Filter */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap items-center gap-2 justify-center lg:justify-start"
          >
            <Filter className="w-4 h-4 text-[#DD9933] mr-2" />
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`
                  px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 border
                  ${
                    selectedCategory === category
                      ? "bg-[#DD9933] text-black border-[#DD9933]"
                      : "bg-[#212121] text-white/70 border-[#DD9933]/20 hover:border-[#DD9933]/40 hover:text-white"
                  }
                `}
              >
                {category}
              </motion.button>
            ))}
          </motion.div>
        </motion.div>

        {/* Content Area with smoother transitions */}
        <AnimatePresence mode="wait" custom={direction}>
          {view === "month" && (
            <motion.div
              key="month-view"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="bg-[#212121]/30 rounded-2xl border border-[#DD9933]/20 overflow-hidden"
            >
              {/* Calendar Header */}
              <div className="grid grid-cols-7 border-b border-[#DD9933]/20">
                {weekDays.map((day, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="py-3 text-center text-sm font-medium text-[#DD9933]/80"
                  >
                    {day}
                  </motion.div>
                ))}
              </div>

              {/* Calendar Grid */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-7 auto-rows-fr"
              >
                {calendarDays.map((day, index) => {
                  const dayEvents = getEventsForDate(day, filteredEvents);
                  const isCurrentMonth = isSameMonth(day, currentDate);
                  const isTodayDate = isToday(day);
                  const isSelected =
                    selectedDate && isSameDay(day, selectedDate);

                  return (
                    <motion.div
                      key={day.toISOString()}
                      variants={itemVariants}
                      onClick={() => setSelectedDate(day)}
                      className={`
                        relative min-h-[100px] sm:min-h-[120px] p-2 border-b border-r border-[#DD9933]/10
                        cursor-pointer transition-all duration-300 group
                        ${!isCurrentMonth ? "bg-black/30" : "bg-transparent"}
                        ${isSelected ? "bg-[#DD9933]/10" : ""}
                        hover:bg-[#DD9933]/5
                      `}
                    >
                      {/* Day number */}
                      <div className="flex justify-between items-start mb-1">
                        <motion.span
                          className={`
                            text-sm font-medium w-7 h-7 flex items-center justify-center rounded-full
                            transition-all duration-300
                            ${
                              isTodayDate
                                ? "bg-[#DD9933] text-black"
                                : isCurrentMonth
                                ? "text-white group-hover:text-[#DD9933]"
                                : "text-white/30"
                            }
                          `}
                          whileHover={{ scale: 1.1 }}
                        >
                          {format(day, "d")}
                        </motion.span>
                      </div>

                      {/* Event indicators */}
                      <div className="flex flex-wrap gap-1 mt-1">
                        {dayEvents.slice(0, 3).map((event, eventIndex) => (
                          <motion.div
                            key={event.id}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ 
                              delay: eventIndex * 0.05,
                              ease: [0.25, 0.46, 0.45, 0.94]
                            }}
                            className={`
                              w-2 h-2 rounded-full
                              ${
                                event.category === "Fetisch"
                                  ? "bg-[#CC3366]"
                                  : event.category === "Wellness"
                                  ? "bg-emerald-400"
                                  : "bg-[#DD9933]"
                              }
                            `}
                            title={event.name}
                          />
                        ))}
                        {dayEvents.length > 3 && (
                          <span className="text-xs text-white/50">
                            +{dayEvents.length - 3}
                          </span>
                        )}
                      </div>

                      {/* Event names (visible on hover or larger screens) */}
                      <div className="hidden lg:block space-y-0.5 mt-1">
                        {dayEvents.slice(0, 2).map((event) => (
                          <div
                            key={event.id}
                            className="text-[10px] text-white/70 truncate leading-tight"
                          >
                            {event.name}
                          </div>
                        ))}
                      </div>

                      {/* Hover effect */}
                      <div className="absolute inset-0 border-2 border-[#DD9933]/0 group-hover:border-[#DD9933]/30 transition-colors pointer-events-none" />
                    </motion.div>
                  );
                })}
              </motion.div>
            </motion.div>
          )}

          {view === "list" && (
            <motion.div
              key="list-view"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="space-y-4"
            >
              {filteredEvents.length > 0 ? (
                filteredEvents.map((event, index) => (
                  <EventCard
                    key={event.id}
                    event={event}
                    index={index}
                  />
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-16 bg-[#212121]/30 rounded-2xl border border-[#DD9933]/20"
                >
                  <CalendarIcon className="w-12 h-12 text-[#DD9933]/30 mx-auto mb-4" />
                  <p className="text-white/60">
                    Keine Events gefunden für die ausgewählten Filter.
                  </p>
                </motion.div>
              )}
            </motion.div>
          )}

          {view === "day" && (
            <motion.div
              key="day-view"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="bg-[#212121]/30 rounded-2xl border border-[#DD9933]/20 p-6"
            >
              {/* Day selector */}
              <div className="flex items-center justify-center gap-4 mb-8">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() =>
                    setSelectedDate((prev) =>
                      prev
                        ? new Date(prev.setDate(prev.getDate() - 1))
                        : new Date()
                    )
                  }
                  className="p-2 rounded-xl border border-[#DD9933]/30 text-[#DD9933] hover:bg-[#DD9933]/10"
                >
                  <ChevronLeft className="w-5 h-5" />
                </motion.button>

                <h3 className="text-xl font-semibold text-white">
                  {selectedDate
                    ? format(selectedDate, "EEEE, d. MMMM yyyy", { locale: de })
                    : "Wähle einen Tag"}
                </h3>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() =>
                    setSelectedDate((prev) =>
                      prev
                        ? new Date(prev.setDate(prev.getDate() + 1))
                        : new Date()
                    )
                  }
                  className="p-2 rounded-xl border border-[#DD9933]/30 text-[#DD9933] hover:bg-[#DD9933]/10"
                >
                  <ChevronRight className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Day's events */}
              {selectedDate ? (
                <div className="space-y-4">
                  {(() => {
                    const dayEvents = getEventsForDate(
                      selectedDate,
                      filteredEvents
                    );
                    return dayEvents.length > 0 ? (
                      dayEvents.map((event, index) => (
                        <EventCard
                          key={event.id}
                          event={event}
                          date={selectedDate}
                          index={index}
                        />
                      ))
                    ) : (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-12"
                      >
                        <p className="text-white/50">
                          Keine Events an diesem Tag.
                        </p>
                      </motion.div>
                    );
                  })()}
                </div>
              ) : (
                <div className="text-center py-12 text-white/50">
                  <p>Wähle einen Tag aus dem Kalender aus.</p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Selected date events preview (for month view) */}
        {view === "month" && selectedDate && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mt-8"
          >
            <h3 className="text-xl font-semibold text-[#DD9933] mb-4">
              Events am{" "}
              {format(selectedDate, "d. MMMM yyyy", { locale: de })}
            </h3>
            <div className="grid gap-4 md:grid-cols-2">
              {(() => {
                const dayEvents = getEventsForDate(selectedDate, filteredEvents);
                return dayEvents.length > 0 ? (
                  dayEvents.map((event, index) => (
                    <EventCard
                      key={event.id}
                      event={event}
                      date={selectedDate}
                      index={index}
                      compact
                    />
                  ))
                ) : (
                  <p className="text-white/50 col-span-full py-8 text-center bg-[#212121]/30 rounded-xl border border-[#DD9933]/10">
                    Keine Events an diesem Tag.
                  </p>
                );
              })()}
            </div>
          </motion.div>
        )}

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm"
        >
          <motion.div 
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-3 h-3 rounded-full bg-[#DD9933]" />
            <span className="text-white/60">Rabatte & Specials</span>
          </motion.div>
          <motion.div 
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-3 h-3 rounded-full bg-[#CC3366]" />
            <span className="text-white/60">Fetisch</span>
          </motion.div>
          <motion.div 
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-3 h-3 rounded-full bg-emerald-400" />
            <span className="text-white/60">Wellness</span>
          </motion.div>
        </motion.div>
      </div>

      {/* Section divider bottom */}
      <motion.div
        variants={lineVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#DD9933]/50 to-transparent"
      />
    </section>
  );
}
