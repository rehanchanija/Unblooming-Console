"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "@/components/UI/Reveal";

const views = ["Front", "Back"] as const;
type View = (typeof views)[number];

const images: Record<View, string> = {
  Front: "/console-front.png",
  Back: "/console-back.png",
};

const hotspots: Record<View, { x: string; y: string; label: string }[]> = {
  Front: [
    { x: "50%", y: "22%", label: "4-inch IPS Display" },
    { x: "28%", y: "58%", label: "Precision D-Pad" },
    { x: "72%", y: "50%", label: "Face Buttons" },
    { x: "35%", y: "80%", label: "Dual Analog Sticks" },
  ],
  Back: [
    { x: "45%", y: "30%", label: "Cooling Vents" },
    { x: "50%", y: "65%", label: "Shoulder Triggers" },
    { x: "50%", y: "85%", label: "USB-C Fast Charge" },
  ],
};

const rotations: Record<View, number> = { Front: 0, Back: 180 };

export default function ProductViewer() {
  const [view, setView] = useState<View>("Front");

  return (
    <section id="showcase" className="section-pad relative mx-auto max-w-7xl px-6">
      <Reveal direction="up" className="mx-auto max-w-2xl text-center">
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-secondary">
          Explore Every Angle
        </span>
        <h2 className="mt-4 font-display text-4xl font-bold sm:text-5xl">
          Built with <span className="text-gradient">obsessive detail</span>
        </h2>
      </Reveal>

      <div className="mt-14 grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
        <div className="relative mx-auto flex h-[420px] w-full max-w-md items-center justify-center perspective">
          <div className="absolute h-64 w-64 rounded-full bg-secondary/25 blur-[90px]" />
          <AnimatePresence mode="wait">
            <motion.div
              key={view}
              initial={{ opacity: 0, rotateY: rotations[view] === 180 ? -90 : 90 }}
              animate={{ opacity: 1, rotateY: 0 }}
              exit={{ opacity: 0, rotateY: rotations[view] === 180 ? 90 : -90 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="relative h-[380px] w-[260px]"
            >
              <Image
                src={images[view]}
                alt={`PULSAR X1 ${view.toLowerCase()} view`}
                fill
                sizes="260px"
                className="object-contain drop-shadow-[0_20px_50px_rgba(122,63,255,0.35)]"
              />
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {hotspots[view].map((h, i) => (
              <motion.div
                key={view + h.label}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group absolute"
                style={{ left: h.x, top: h.y }}
              >
                <span className="relative flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-accent" />
                </span>
                <div className="pointer-events-none absolute left-1/2 top-5 w-max -translate-x-1/2 rounded-lg glass px-3 py-1 text-xs text-gray-900 opacity-0 transition-opacity group-hover:opacity-100">
                  {h.label}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div>
          <div className="flex gap-3">
            {views.map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={`rounded-full px-5 py-2 font-mono text-xs transition-all duration-300 ${
                  view === v
                    ? "bg-gradient-to-r from-primary to-secondary text-gray-900 shadow-glow"
                    : "glass text-gray-900/60 hover:text-gray-900"
                }`}
              >
                {v} View
              </button>
            ))}
          </div>

          <p className="mt-6 max-w-md text-gray-900/60">
            Hover the glowing hotspots to explore what makes PULSAR X1 tick —
            from its precision-machined body to the fast-charging port hidden
            along the edge.
          </p>

          <ul className="mt-6 space-y-3">
            {hotspots[view].map((h) => (
              <motion.li
                key={h.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-3 text-sm text-gray-900/70"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                {h.label}
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
