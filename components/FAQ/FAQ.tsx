"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "@/components/UI/Reveal";

const faqs = [
  {
    q: "Does it have Wi-Fi?",
    a: "No, the R36MAX does not have internal Wi-Fi. However, the OTG port supports external USB Wi-Fi dongles if you wish to connect for updates or scraping game art.",
  },
  {
    q: "How do I charge it safely?",
    a: "⚠️ CRUCIAL: Do not use fast chargers or high-wattage mobile adapters. Only use a standard 5V/1.5A - 2A adapter with the included USB-A to USB-C cable to avoid damaging the battery.",
  },
  {
    q: "Can I save my game progress?",
    a: "Yes! You can save your game at any point using the 'Save State' feature in the emulator menu (usually accessed by pressing Select + X).",
  },
  {
    q: "How do I add more games?",
    a: "Simply insert the MicroSD card into a PC, open the 'ROMS' partition, and drag your game files into the folder that matches the console name.",
  },
  {
    q: "What systems are supported?",
    a: "Over 30 systems! It comes pre-loaded with PSP, PS1, N64, Dreamcast, GBA, NES, SNES, Arcade (MAME), and many more.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="section-pad relative mx-auto max-w-3xl px-6">
      <Reveal direction="up" className="mx-auto max-w-2xl text-center">
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-primary">
          FAQ
        </span>
        <h2 className="mt-4 font-display text-4xl font-bold sm:text-5xl">
          Got <span className="text-gradient">questions?</span>
        </h2>
      </Reveal>

      <div className="mt-12 space-y-4">
        {faqs.map((item, i) => (
          <Reveal key={item.q} direction="up" delay={i * 0.05}>
            <div className="glass gradient-border overflow-hidden rounded-2xl">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between px-6 py-5 text-left"
              >
                <span className="font-body text-sm font-medium text-gray-900 sm:text-base">
                  {item.q}
                </span>
                <motion.span
                  animate={{ rotate: open === i ? 45 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-white/5 text-lg text-accent"
                >
                  +
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-5 text-sm text-gray-900/55">{item.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
