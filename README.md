# Babylon Cologne - Next.js Rebuild

A stunning, fully animated rebuild of the Babylon Cologne website using Next.js 14+, Tailwind CSS, and Framer Motion.

## 🌐 Live Site

**https://babylon-cologne.netlify.app**

## 📁 GitHub Repository

**https://github.com/timtim-hub/babylon-cologne-nextjs**

## 🎨 Features

### Visual Design
- **Exact color matching** from original website
  - Primary Gold: `#DD9933`
  - Black: `#000000`
  - Dark Gray: `#212121`
  - White: `#FFFFFF`
  - Pink Accent: `#CC3366`
- **Dark theme** throughout
- **Responsive design** for all screen sizes
- **Custom images** optimized for the brand

### Sections Included
1. **Hero** - Full viewport with parallax effect and animated text
2. **Sauna Section** - Interactive carousel with 5 facilities
3. **News Section** - Latest updates with hover effects
4. **Prices Section** - Entry prices with animated cards
5. **Deals Section** - Multi-entry cards and add-ons
6. **Hours Section** - Opening hours with visual design
7. **Calendar Section** - Full event calendar with month/list/day views
8. **Bar & Gastro Section** - Food and drinks information
9. **Massage Section** - Services and pricing
10. **Team Section** - Team member showcase
11. **FAQ Section** - Accordion with 16+ questions
12. **Footer** - Contact info and social links

### Animations (Framer Motion)
- Page load animations
- Scroll-triggered section reveals
- Parallax hero effect
- Stagger animations for lists
- Hover effects on all cards
- Smooth navigation transitions
- Calendar month slide animations
- FAQ accordion expand/collapse

### Technical Stack
- **Framework**: Next.js 16+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Date Handling**: date-fns
- **Deployment**: Netlify

## 📂 Project Structure

```
app/
├── components/          # Reusable UI components
│   ├── Button.tsx
│   ├── Container.tsx
│   ├── EventCard.tsx
│   ├── Footer.tsx
│   ├── MotionComponents.tsx
│   ├── Navbar.tsx
│   └── Section.tsx
├── sections/            # Page sections
│   ├── Hero.tsx
│   ├── SaunaSection.tsx
│   ├── NewsSection.tsx
│   ├── PricesSection.tsx
│   ├── DealsSection.tsx
│   ├── HoursSection.tsx
│   ├── CalendarSection.tsx
│   ├── BarGastroSection.tsx
│   ├── MassageSection.tsx
│   ├── TeamSection.tsx
│   └── FAQSection.tsx
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions
├── page.tsx             # Main page
├── layout.tsx           # Root layout
└── globals.css          # Global styles

public/
├── images/              # All website images
└── icons/               # SVG icons
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/timtim-hub/babylon-cologne-nextjs.git

# Navigate to project
cd babylon-cologne-nextjs

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## 📊 Content from Original Site

All text content has been extracted and preserved from the original website:
- Complete pricing information
- All facility descriptions
- Event calendar data
- FAQ questions and answers
- Opening hours
- Team information
- Contact details

## 🎯 Original Website

https://www.babylon-cologne.de/

## 📝 License

This is a rebuild project for educational purposes. All content belongs to Babylon Cologne.

---

Built with ❤️ using Next.js, Tailwind CSS, and Framer Motion
