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
  metadataBase: new URL("https://ssani.dev"),
  title: {
    default: "Ultimate Portfolio | Developer & Designer",
    template: "%s | Ultimate Portfolio",
  },
  description:
    "A stunning portfolio showcasing exceptional digital experiences, creative solutions, and cutting-edge web development.",
  keywords: [
    "portfolio",
    "developer",
    "designer",
    "react",
    "next.js",
    "web development",
    "frontend",
    "full-stack",
  ],
  authors: [{ name: "S. Sani" }],
  creator: "S. Sani",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ssani.dev",
    title: "Ultimate Portfolio | Developer & Designer",
    description:
      "A stunning portfolio showcasing exceptional digital experiences.",
    siteName: "Ultimate Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ultimate Portfolio | Developer & Designer",
    description:
      "A stunning portfolio showcasing exceptional digital experiences.",
    creator: "@ssani_dev",
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
      <body className="font-sans antialiased">
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
