import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "@/styles/globals.css";
import SmoothScrollProvider from "@/lib/SmoothScrollProvider";
import { AuthProvider } from "@/lib/AuthContext";
import { CartProvider } from "@/lib/CartContext";
import NavbarWrapper from "@/components/NavbarWrapper";

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
  title: {
    template: '%s | UNBLOOMING',
    default: 'UNBLOOMING | Premium Retro Handheld Console',
  },
  description:
    "UNBLOOMING is a premium retro handheld gaming console with 10,000+ games, 64GB storage, blazing-fast emulation, and a stunning IPS display. Relive retro gaming, reimagined.",
  keywords: [
    "retro handheld console",
    "retro gaming device",
    "UNBLOOMING",
    "emulator handheld",
    "buy retro console",
  ],
  openGraph: {
    title: "UNBLOOMING | Premium Retro Handheld Console",
    description:
      "UNBLOOMING is a premium retro handheld gaming console with 10,000+ games, 64GB storage, blazing-fast emulation, and a stunning IPS display. Relive retro gaming, reimagined.",
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
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="bg-bg font-body antialiased">
        <SmoothScrollProvider>
          <AuthProvider>
            <CartProvider>
              <div className="noise-overlay" aria-hidden="true" />
              <NavbarWrapper />
              {children}
            </CartProvider>
          </AuthProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
