import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#070707",
        primary: "#FF2B2B",
        secondary: "#7A3FFF",
        accent: "#2EC5FF",
        card: "rgba(255,255,255,.06)",
        borderc: "rgba(255,255,255,.12)",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      backgroundImage: {
        "mesh-1":
          "radial-gradient(at 20% 20%, rgba(255,43,43,0.25) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(122,63,255,0.25) 0px, transparent 50%), radial-gradient(at 50% 80%, rgba(46,197,255,0.18) 0px, transparent 50%)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-18px)" },
        },
        breathe: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.02)" },
        },
        "spin-slow": {
          from: { transform: "rotateY(0deg)" },
          to: { transform: "rotateY(360deg)" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.6", filter: "blur(40px)" },
          "50%": { opacity: "1", filter: "blur(60px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        breathe: "breathe 4s ease-in-out infinite",
        "spin-slow": "spin-slow 18s linear infinite",
        marquee: "marquee 22s linear infinite",
        "pulse-glow": "pulse-glow 4s ease-in-out infinite",
        shimmer: "shimmer 3s linear infinite",
      },
      boxShadow: {
        glow: "0 0 40px rgba(255,43,43,0.35)",
        "glow-purple": "0 0 40px rgba(122,63,255,0.35)",
        "glow-blue": "0 0 40px rgba(46,197,255,0.3)",
      },
    },
  },
  plugins: [],
};

export default config;
