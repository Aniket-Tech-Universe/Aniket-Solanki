import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CustomCursor } from "@/components/ui/custom-cursor";
import { AnimatedBackground } from "@/components/ui/animated-background";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://aniket-solanki.vercel.app"),
  title: {
    default: "Aniket Solanki | Creative Technologist & AI Specialist",
    template: "%s | Aniket Solanki",
  },
  description:
    "A stunning portfolio showcasing exceptional digital experiences, creative solutions, and cutting-edge web development with AI integration.",
  keywords: [
    "portfolio",
    "developer",
    "designer",
    "react",
    "next.js",
    "web development",
    "frontend",
    "full-stack",
    "AI",
    "creative technologist",
  ],
  authors: [{ name: "Aniket Solanki" }],
  creator: "Aniket Solanki",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://aniket-solanki.vercel.app",
    title: "Aniket Solanki | Creative Technologist & AI Specialist",
    description:
      "A stunning portfolio showcasing exceptional digital experiences and AI-powered applications.",
    siteName: "Aniket Solanki Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aniket Solanki | Creative Technologist & AI Specialist",
    description:
      "A stunning portfolio showcasing exceptional digital experiences.",
    creator: "@ANIKET_SOLANKI1",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#050510",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <body className="font-sans antialiased animate-fade-in">
        <SmoothScrollProvider>
          {/* Animated Background */}
          <AnimatedBackground />

          {/* Custom Cursor (desktop only) */}
          <CustomCursor />

          {/* Navigation */}
          <Navbar />

          {/* Main Content */}
          <main>{children}</main>

          {/* Footer */}
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
