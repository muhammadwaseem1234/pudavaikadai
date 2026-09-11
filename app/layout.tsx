import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
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
