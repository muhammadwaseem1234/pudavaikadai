import type { Metadata } from "next";
import { Geist, Geist_Mono, Alex_Brush, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { CartDrawer } from "@/components/cart/CartDrawer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const alexBrush = Alex_Brush({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-alex-brush",
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Pudavai Kadai | Authentic Handloom Pure Silk Sarees",
    template: "%s | Pudavai Kadai",
  },
  description:
    "Discover handcrafted Kanchipuram, Banarasi, and contemporary soft silk sarees woven with 100% Silk Mark certified pure mulberry silk by master generational artisans.",
  keywords: [
    "Pudavai Kadai",
    "Kanchipuram Silk Sarees",
    "Banarasi Silks",
    "Handloom Sarees",
    "Pure Silk Mark",
    "Bridal Muhurtham Sarees",
    "Organza Tissue Sarees",
  ],
  authors: [{ name: "Pudavai Kadai" }],
  openGraph: {
    title: "Pudavai Kadai | Authentic Handloom Pure Silk Sarees",
    description:
      "Handcrafted Kanchipuram, Banarasi, and soft silk sarees directly from generational master artisan looms.",
    url: "https://pudavaikadai.com",
    siteName: "Pudavai Kadai",
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${alexBrush.variable} ${playfairDisplay.variable} h-full antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Alex+Brush&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-white text-stone-900">
        <AnnouncementBar />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <CartDrawer />
      </body>
    </html>
  );
}
