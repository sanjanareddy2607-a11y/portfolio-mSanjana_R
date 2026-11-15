import type { Metadata } from "next";
import "./globals.css";

import { Instrument_Serif, Inter, JetBrains_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { CosmicBackground } from "@/components/CosmicBackground";

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mummaka Sanjana Reddy — AI/ML Engineering Portfolio",
  description:
    "Personal engineering portfolio of Mummaka Sanjana Reddy, B.Tech CSE (AI & ML) student at Jain (Deemed-to-be) University, Bengaluru. Intelligent systems, applied machine learning and research.",
  robots: { index: false, follow: false },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${inter.variable} ${jetBrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full overflow-x-hidden bg-abyss font-ui text-ink">
        <ClerkProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[120] focus:border focus:border-accent focus:bg-void focus:px-4 focus:py-2 focus:text-xs focus:uppercase focus:tracking-widest focus:text-accent"
          >
            Skip to content
          </a>
          <CosmicBackground />
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
