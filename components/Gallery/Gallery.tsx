"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "@/components/UI/Reveal";

const items = [
  { id: 1, h: "h-80", label: "Front Angle", src: "/console-front.png" },
  { id: 2, h: "h-64", label: "Back Panel", src: "/console-back.png" },
  { id: 3, h: "h-96", label: "Full Kit", src: "/console-listing.png" },
  { id: 4, h: "h-72", label: "Front Detail", src: "/console-front.png" },
  { id: 5, h: "h-60", label: "Back Detail", src: "/console-back.png" },
];

export default function Gallery() {
  const [active, setActive] = useState<number | null>(null);
  const activeItem = items.find((it) => it.id === active);

  return (
    <section className="section-pad relative mx-auto max-w-7xl px-6">
      <Reveal direction="up" className="mx-auto max-w-2xl text-center">
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-secondary">
          Gallery
        </span>
        <h2 className="mt-4 font-display text-4xl font-bold sm:text-5xl">
          See it from <span className="text-gradient">every side</span>
        </h2>
      </Reveal>

      <div className="mt-14 columns-2 gap-5 sm:columns-3">
        {items.map((item, i) => (
          <Reveal key={item.id} direction="up" delay={i * 0.06} className="mb-5 break-inside-avoid">
            <motion.div
              whileHover={{ scale: 1.02 }}
              onClick={() => setActive(item.id)}
              className={`gradient-border glass group relative flex ${item.h} cursor-pointer items-center justify-center overflow-hidden rounded-2xl`}
            >
              <motion.div
                whileHover={{ scale: 1.12 }}
                transition={{ duration: 0.5 }}
                className="relative h-full w-full"
              >
                <Image
                  src={item.src}
                  alt={`R36MAX — ${item.label}`}
                  fill
                  sizes="(max-width: 640px) 50vw, 33vw"
                  className="object-contain p-4"
                />
              </motion.div>
              <div className="pointer-events-none absolute inset-0 flex items-end bg-gradient-to-t from-black/70 via-transparent to-transparent p-4 opacity-0 transition-opacity group-hover:opacity-100">
                <span className="font-mono text-xs text-white">{item.label}</span>
              </div>
            </motion.div>
          </Reveal>
        ))}
      </div>

      <AnimatePresence>
        {activeItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/85 p-6 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              className="glass-strong relative rounded-2xl p-10"
            >
              <div className="relative h-80 w-72 sm:h-96 sm:w-80">
                <Image
                  src={activeItem.src}
                  alt={activeItem.label}
                  fill
                  sizes="320px"
                  className="object-contain"
                />
              </div>
              <p className="mt-4 text-center font-mono text-xs text-white/60">
                {activeItem.label}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
