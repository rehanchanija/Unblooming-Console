"use client";

import { motion } from "framer-motion";
import Reveal from "@/components/UI/Reveal";
import StaggerGroup, { staggerItem } from "@/components/UI/StaggerGroup";

const accessories = [
  { icon: "🖥️", name: "Dock & Display Stand", price: "$29" },
  { icon: "🔌", name: "Fast Charging Cable", price: "$14" },
  { icon: "🛡️", name: "Protective Case", price: "$19" },
  { icon: "🗂️", name: "128GB Game Card", price: "$39" },
  { icon: "🎒", name: "Travel Bag", price: "$24" },
];

export default function Accessories() {
  return (
    <section id="accessories" className="section-pad relative mx-auto max-w-7xl px-6">
      <Reveal direction="up" className="mx-auto max-w-2xl text-center">
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
          Complete The Set
        </span>
        <h2 className="mt-4 font-display text-4xl font-bold sm:text-5xl">
          Premium <span className="text-gradient">accessories</span>
        </h2>
      </Reveal>

      <StaggerGroup className="mt-14 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
        {accessories.map((a, i) => (
          <motion.div
            key={a.name}
            variants={staggerItem}
            animate={{ y: [0, -8, 0] }}
            transition={{
              y: { duration: 3 + (i % 3), repeat: Infinity, ease: "easeInOut" },
            }}
            whileHover={{ scale: 1.05 }}
            className="gradient-border glass flex flex-col items-center rounded-2xl p-6 text-center"
          >
            <span className="text-3xl">{a.icon}</span>
            <h3 className="mt-4 font-body text-sm text-gray-900/85">{a.name}</h3>
            <p className="mt-2 font-display text-sm font-bold text-gradient">{a.price}</p>
          </motion.div>
        ))}
      </StaggerGroup>
    </section>
  );
}
