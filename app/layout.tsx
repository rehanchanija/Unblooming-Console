import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "@/styles/globals.css";
import SmoothScrollProvider from "@/lib/SmoothScrollProvider";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "PULSAR X1 — The Ultimate Retro Handheld Gaming Console",
  description:
    "PULSAR X1 is a premium retro handheld gaming console with 10,000+ games, 64GB storage, blazing-fast emulation, and a stunning IPS display. Relive retro gaming, reimagined.",
  keywords: [
    "retro handheld console",
    "retro gaming device",
    "PULSAR X1",
    "emulator handheld",
    "buy retro console",
  ],
  openGraph: {
    title: "PULSAR X1 — The Ultimate Retro Handheld Gaming Console",
    description:
      "10,000+ games. 64GB storage. Premium glass body. The retro handheld reimagined for 2026.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-bg font-body antialiased">
        <SmoothScrollProvider>
          <div className="noise-overlay" aria-hidden="true" />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
