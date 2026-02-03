"use client";

import {
  Hero,
  HoursSection,
  BarGastroSection,
  TeamSection,
  FAQSection,
  SaunaSection,
  NewsSection,
  CalendarSection,
  PricesSection,
  DealsSection,
  MassageSection,
} from "./sections";
import { Navbar } from "./components";
import { Footer } from "./components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* Sauna Section */}
      <SaunaSection />

      {/* News Section */}
      <NewsSection />

      {/* Prices Section */}
      <PricesSection />

      {/* Deals Section */}
      <DealsSection />

      {/* Hours Section */}
      <HoursSection />

      {/* Calendar Section */}
      <CalendarSection />

      {/* Bar & Gastro Section */}
      <BarGastroSection />

      {/* Massage Section */}
      <MassageSection />

      {/* Team Section */}
      <TeamSection />

      {/* FAQ Section */}
      <FAQSection />

      {/* Footer */}
      <Footer />
    </main>
  );
}
