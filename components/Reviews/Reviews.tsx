"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "@/components/UI/Reveal";

const reviews = [
  {
    name: "Arjun Mehta",
    role: "Retro Collector",
    text: "The build quality is insane — feels like a real Apple product but for retro gaming. The emulation is butter smooth.",
    avatar: "AM",
  },
  {
    name: "Sara Kim",
    role: "Streamer",
    text: "Battery lasts my entire 6-hour stream. The screen is gorgeous and the transparent shell looks incredible on camera.",
    avatar: "SK",
  },
  {
    name: "Daniel Cruz",
    role: "Game Developer",
    text: "I've tried 5 handhelds this year. R36MAX's UI and speed are on a different level entirely.",
    avatar: "DC",
  },
  {
    name: "Priya Nair",
    role: "Casual Gamer",
    text: "Setup took two minutes and I had my entire GBA library running instantly. Genuinely premium feel.",
    avatar: "PN",
  },
];

export default function Reviews() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % reviews.length), 4500);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="reviews" className="section-pad relative mx-auto max-w-4xl px-6">
      <Reveal direction="up" className="mx-auto max-w-2xl text-center">
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-secondary">
          Loved by Players
        </span>
        <h2 className="mt-4 font-display text-4xl font-bold sm:text-5xl">
          What our <span className="text-gradient">customers say</span>
        </h2>
      </Reveal>

      <div className="relative mt-14 h-64">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="gradient-border glass absolute inset-0 flex flex-col items-center justify-center rounded-2xl p-10 text-center"
          >
            <div className="mb-4 flex gap-1 text-primary">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i}>★</span>
              ))}
            </div>
            <p className="max-w-xl text-gray-900/75">&ldquo;{reviews[index].text}&rdquo;</p>
            <div className="mt-6 flex items-center gap-3">
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary font-display text-xs font-bold text-gray-900"
              >
                {reviews[index].avatar}
              </motion.div>
              <div className="text-left">
                <p className="text-sm font-semibold text-gray-900">{reviews[index].name}</p>
                <p className="text-xs text-gray-900/45">{reviews[index].role}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-6 flex justify-center gap-2">
        {reviews.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === index ? "w-6 bg-gradient-to-r from-primary to-accent" : "w-1.5 bg-white/20"
            }`}
            aria-label={`Go to review ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
