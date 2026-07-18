"use client";

import { motion } from "framer-motion";
import Reveal from "@/components/UI/Reveal";
import StaggerGroup, { staggerItem } from "@/components/UI/StaggerGroup";

const categories = [
  { name: "PS1", games: "1,200+" },
  { name: "PSP", games: "800+" },
  { name: "Game Boy", games: "900+" },
  { name: "NES", games: "700+" },
  { name: "SNES", games: "1,100+" },
  { name: "GBA", games: "1,000+" },
  { name: "Arcade", games: "2,500+" },
  { name: "Dreamcast", games: "400+" },
  { name: "Nintendo DS", games: "1,300+" },
];

export default function Categories() {
  return (
    <section id="categories" className="section-pad relative mx-auto max-w-7xl px-6">
      <Reveal direction="up" className="mx-auto max-w-2xl text-center">
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-primary">
          10,000+ Games
        </span>
        <h2 className="mt-4 font-display text-4xl font-bold sm:text-5xl">
          Every era, <span className="text-gradient">one console</span>
        </h2>
      </Reveal>

      <StaggerGroup className="mt-14 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-3">
        {categories.map((cat) => (
          <motion.div
            key={cat.name}
            variants={staggerItem}
            whileHover={{ scale: 1.04, y: -6 }}
            className="gradient-border glass relative overflow-hidden rounded-2xl p-6 text-center"
          >
            <motion.div
              className="pointer-events-none absolute -inset-1 opacity-0 group-hover:opacity-100"
              animate={{ backgroundPosition: ["0% 0%", "200% 0%"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              style={{
                background:
                  "linear-gradient(120deg, transparent, rgba(255,255,255,0.08), transparent)",
                backgroundSize: "200% 100%",
              }}
            />
            <h3 className="font-display text-lg font-bold text-gray-900">{cat.name}</h3>
            <p className="mt-1 font-mono text-xs text-accent">{cat.games} games</p>
          </motion.div>
        ))}
      </StaggerGroup>
    </section>
  );
}
