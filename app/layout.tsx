import type { Metadata, Viewport } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
};

export const metadata: Metadata = {
  title: "Babylon Cologne | Gay Sauna & Wellness in Köln",
  description: "Babylon Cologne - Die moderne Gay Sauna in Köln. Wellness, Spa, Cruising & Events. Täglich 24h geöffnet. Erlebe Entspannung und erotische Abenteuer im Herzen von Köln.",
  keywords: ["Gay Sauna Köln", "Babylon Cologne", "Gay Sauna", "Cologne", "Wellness", "Spa", "Cruising", "LGBTQ", "Köln"],
  authors: [{ name: "Babylon Cologne" }],
  creator: "Babylon Cologne",
  publisher: "Babylon Cologne",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: "https://babyloncologne.de",
    siteName: "Babylon Cologne",
    title: "Babylon Cologne | Gay Sauna & Wellness in Köln",
    description: "Die moderne Gay Sauna in Köln. Wellness, Spa, Cruising & Events. Täglich geöffnet.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Babylon Cologne Gay Sauna",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Babylon Cologne | Gay Sauna & Wellness in Köln",
    description: "Die moderne Gay Sauna in Köln. Wellness, Spa, Cruising & Events.",
    images: ["/images/og-image.jpg"],
  },
  alternates: {
    canonical: "https://babyloncologne.de",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className="dark">
      <body
        className={`${inter.variable} ${geistMono.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
