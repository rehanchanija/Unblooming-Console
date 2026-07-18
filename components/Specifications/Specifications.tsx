"use client";

import Reveal from "@/components/UI/Reveal";

const specs = [
  { label: "Display", pulsar: "4.0\" IPS Square, 720×720", rival: "3.5\" TFT, 480×320" },
  { label: "Storage", pulsar: "Dual MicroSD (64GB inc.)", rival: "16GB (fixed)" },
  { label: "Battery", pulsar: "4000mAh · 6-8hrs", rival: "3000mAh · 4hrs" },
  { label: "Emulator Cores", pulsar: "30+ systems supported", rival: "4 systems supported" },
  { label: "Charging", pulsar: "USB-C (5V/2A Standard)", rival: "Micro-USB" },
  { label: "Build", pulsar: "Premium Translucent / Matte Shells", rival: "Standard plastic" },
];

export default function Specifications() {
  return (
    <section className="section-pad relative mx-auto max-w-5xl px-6">
      <Reveal direction="up" className="mx-auto max-w-2xl text-center">
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-primary">
          Specifications
        </span>
        <h2 className="mt-4 font-display text-4xl font-bold sm:text-5xl">
          How <span className="text-gradient">R36MAX</span> compares
        </h2>
      </Reveal>

      <div className="mt-14 overflow-hidden rounded-2xl glass gradient-border">
        <div className="grid grid-cols-3 border-b border-borderc bg-white/5 px-4 py-4 sm:px-8">
          <span className="font-mono text-xs uppercase text-gray-900/50">Spec</span>
          <span className="font-display text-sm font-semibold text-gradient">R36MAX</span>
          <span className="font-mono text-xs uppercase text-gray-900/40">Others</span>
        </div>
        {specs.map((s, i) => (
          <Reveal key={s.label} direction="left" delay={i * 0.06}>
            <div className="grid grid-cols-3 items-center border-b border-borderc/60 px-4 py-4 last:border-0 sm:px-8">
              <span className="text-sm text-gray-900/60">{s.label}</span>
              <span className="text-sm font-medium text-gray-900">{s.pulsar}</span>
              <span className="text-sm text-gray-900/35 line-through decoration-white/20">
                {s.rival}
              </span>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
