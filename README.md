# Babylon Cologne - Next.js Website

A modern, performant website for Babylon Cologne Gay Sauna built with Next.js 14+, TypeScript, and Tailwind CSS.

## Features

- **Next.js 14+** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** with custom Babylon theme colors
- **Framer Motion** for smooth animations
- **Lucide React** for icons
- **Static Export** for fast deployment

## Brand Colors

| Color | Hex | Usage |
|-------|-----|-------|
| Primary Gold | `#DD9933` | Main brand color, CTAs, highlights |
| Black | `#000000` | Background |
| Dark Gray | `#212121` | Cards, sections |
| White | `#FFFFFF` | Text on dark backgrounds |
| Pink Accent | `#CC3366` | Accent color, hover states |
| Light Gray | `#F4F4F4` | Light mode backgrounds |

## Project Structure

```
babylon-nextjs/
├── app/
│   ├── components/     # Reusable UI components
│   ├── sections/       # Page section components
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Utility functions
│   ├── globals.css     # Global styles
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Home page
├── public/
│   ├── images/         # Image assets
│   └── fonts/          # Custom fonts
├── next.config.ts      # Next.js configuration
├── package.json
└── tsconfig.json
```

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

The static site will be exported to the `dist` folder.

## Available Components

- `Button` - Styled button with variants
- `Container` - Responsive container wrapper
- `Section` - Page section wrapper

## Custom Hooks

- `useScrollPosition` - Track scroll position and direction
- `useInView` - Intersection Observer for animations
- `useMediaQuery` - Responsive breakpoint detection

## License

Private - Babylon Cologne
