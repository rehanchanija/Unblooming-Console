"use client";

import { motion } from "framer-motion";
import Reveal from "@/components/UI/Reveal";
import MagneticButton from "@/components/UI/MagneticButton";

const plans = [
  {
    name: "Standard Edition",
    price: "$49",
    features: ["64GB MicroSD included", "18,000+ Games", "6-8hr Battery", "Standard Colors (Black/White)"],
    highlight: false,
  },
  {
    name: "R36MAX Pro",
    price: "$69",
    features: [
      "128GB MicroSD included",
      "25,000+ Games",
      "Premium Carry Case",
      "Translucent Colors (Blue/Purple)",
      "Tempered Glass Protector",
    ],
    highlight: true,
  },
  {
    name: "Ultimate Bundle",
    price: "$89",
    features: [
      "256GB Dual MicroSD setup",
      "35,000+ Games",
      "Wi-Fi Dongle Included",
      "All Accessories & Case",
      "Exclusive Shell Design",
    ],
    highlight: false,
  },
];

export default function Pricing() {
  return (
    <section className="section-pad relative mx-auto max-w-6xl px-6">
      <Reveal direction="up" className="mx-auto max-w-2xl text-center">
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
          Pricing
        </span>
        <h2 className="mt-4 font-display text-4xl font-bold sm:text-5xl">
          Choose your <span className="text-gradient">edition</span>
        </h2>
      </Reveal>

      <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {plans.map((plan, i) => (
          <Reveal key={plan.name} direction="up" delay={i * 0.1}>
            <motion.div
              whileHover={{ y: -8 }}
              className={`relative flex h-full flex-col rounded-2xl p-8 ${
                plan.highlight
                  ? "glass-strong border-2 border-transparent shadow-glow"
                  : "glass gradient-border"
              }`}
              style={
                plan.highlight
                  ? {
                      backgroundImage:
                        "linear-gradient(#0d0d0d,#0d0d0d), linear-gradient(135deg, #FF2B2B, #7A3FFF, #2EC5FF)",
                      backgroundOrigin: "border-box",
                      backgroundClip: "padding-box, border-box",
                    }
                  : undefined
              }
            >
              {plan.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-primary to-secondary px-4 py-1 font-mono text-[10px] uppercase tracking-wide text-gray-900 shadow-glow">
                  Best Seller
                </span>
              )}
              <h3 className="font-display text-xl font-bold text-gray-900">{plan.name}</h3>
              <p className="mt-4 font-display text-4xl font-bold text-gradient">
                {plan.price}
              </p>
              <ul className="mt-6 flex-1 space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-gray-900/65">
                    <span className="text-accent">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <MagneticButton
                  variant={plan.highlight ? "primary" : "secondary"}
                  className="w-full justify-center"
                  icon={false}
                >
                  Select Plan
                </MagneticButton>
              </div>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
