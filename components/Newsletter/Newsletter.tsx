"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Reveal from "@/components/UI/Reveal";
import MagneticButton from "@/components/UI/MagneticButton";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  }

  return (
    <section id="newsletter" className="section-pad relative mx-auto max-w-4xl px-6">
      <div className="relative overflow-hidden rounded-3xl glass-strong px-8 py-16 text-center">
        <div className="pointer-events-none absolute inset-0 bg-mesh-1 opacity-60" />
        {Array.from({ length: 14 }).map((_, i) => (
          <motion.span
            key={i}
            className="pointer-events-none absolute h-1 w-1 rounded-full bg-accent/70"
            style={{ left: `${(i * 41) % 100}%`, top: `${(i * 29) % 100}%` }}
            animate={{ opacity: [0.2, 0.9, 0.2], y: [0, -16, 0] }}
            transition={{ duration: 3 + (i % 4), repeat: Infinity, delay: i * 0.2 }}
          />
        ))}

        <Reveal direction="zoom" className="relative z-10">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
            Stay Updated
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold sm:text-4xl">
            Get notified about <span className="text-gradient">drops &amp; deals</span>
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-white/55">
            Join the R36MAX community for early access to new colorways and
            exclusive discounts.
          </p>

          {submitted ? (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 font-mono text-sm text-accent"
            >
              ✓ You&apos;re on the list — welcome aboard!
            </motion.p>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
            >
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="glass w-full rounded-full px-6 py-3.5 text-sm text-white placeholder:text-white/35 focus:outline-none"
              />
              <MagneticButton variant="primary" icon={false} className="justify-center whitespace-nowrap">
                Notify Me
              </MagneticButton>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
