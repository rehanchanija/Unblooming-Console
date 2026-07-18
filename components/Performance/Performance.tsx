"use client";

import { motion } from "framer-motion";
import Reveal from "@/components/UI/Reveal";
import CountUp from "@/components/UI/CountUp";

const stats = [
  { label: "Battery Life", value: 92, suffix: "%" },
  { label: "CPU Performance", value: 88, suffix: "%" },
  { label: "GPU Performance", value: 95, suffix: "%" },
  { label: "Storage Efficiency", value: 97, suffix: "%" },
  { label: "Overall Score", value: 96, suffix: "%" },
];

export default function Performance() {
  return (
    <section className="section-pad relative mx-auto max-w-5xl px-6">
      <Reveal direction="up" className="mx-auto max-w-2xl text-center">
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
          Benchmarked
        </span>
        <h2 className="mt-4 font-display text-4xl font-bold sm:text-5xl">
          Power that <span className="text-gradient">outperforms</span>
        </h2>
      </Reveal>

      <div className="mt-14 space-y-8">
        {stats.map((s, i) => (
          <Reveal key={s.label} direction="up" delay={i * 0.08}>
            <div className="flex items-center justify-between mb-2">
              <span className="font-body text-sm text-gray-900/70">{s.label}</span>
              <span className="font-display text-sm font-semibold text-gray-900">
                <CountUp to={s.value} suffix={s.suffix} />
              </span>
            </div>
            <div className="h-2.5 w-full overflow-hidden rounded-full bg-white/5">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${s.value}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 }}
                className="h-full rounded-full bg-gradient-to-r from-primary via-secondary to-accent shadow-glow"
              />
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
