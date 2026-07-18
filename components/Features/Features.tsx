"use client";

import { motion } from "framer-motion";
import Reveal from "@/components/UI/Reveal";
import StaggerGroup, { staggerItem } from "@/components/UI/StaggerGroup";

const features = [
  { icon: "🎮", title: "18,000+ Games", desc: "Ready to play with classics from over 30 major emulators." },
  { icon: "💾", title: "Dual MicroSD", desc: "64GB included. Separate OS and games for easy expansion." },
  { icon: "⚡", title: "RK3326 CPU", desc: "Quad-Core processor ensures smooth 60fps on retro titles." },
  { icon: "🔋", title: "4000mAh Battery", desc: "6-8 hours of continuous play on a single charge." },
  { icon: "📺", title: "1:1 Square IPS", desc: "4.0-inch 720x720 display perfect for Game Boy and arcade." },
  { icon: "🕹️", title: "Pro Controls", desc: "Dual 3D analog sticks and four ergonomic rear triggers." },
];

export default function Features() {
  return (
    <section id="features" className="section-pad relative mx-auto max-w-7xl px-6">
      <Reveal direction="up" className="mx-auto max-w-2xl text-center">
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
          Why R36MAX
        </span>
        <h2 className="mt-4 font-display text-4xl font-bold sm:text-5xl">
          Everything you need, <span className="text-gradient">nothing you don&apos;t</span>
        </h2>
      </Reveal>

      <StaggerGroup className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f) => (
          <motion.div
            key={f.title}
            variants={staggerItem}
            whileHover={{ y: -8 }}
            className="gradient-border glass group relative rounded-2xl p-8 transition-shadow duration-300 hover:shadow-glow"
          >
            <motion.div
              className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-white/5 text-3xl"
              whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
              transition={{ duration: 0.5 }}
            >
              {f.icon}
            </motion.div>
            <h3 className="font-display text-xl font-semibold text-white">{f.title}</h3>
            <p className="mt-2 text-sm text-white/55">{f.desc}</p>
          </motion.div>
        ))}
      </StaggerGroup>
    </section>
  );
}
