"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";
import MagneticButton from "@/components/UI/MagneticButton";
import Link from "next/link";

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const mvX = useMotionValue(0);
  const mvY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mvY, [-0.5, 0.5], [12, -12]), {
    stiffness: 120,
    damping: 18,
  });
  const rotateY = useSpring(useTransform(mvX, [-0.5, 0.5], [-16, 16]), {
    stiffness: 120,
    damping: 18,
  });
  const translateX = useSpring(useTransform(mvX, [-0.5, 0.5], [-20, 20]), {
    stiffness: 80,
    damping: 20,
  });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    mvX.set((e.clientX - rect.left) / rect.width - 0.5);
    mvY.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  return (
    <section
      id="hero"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative flex min-h-[100svh] w-full items-center justify-center overflow-hidden bg-bg"
    >
      {/* Gradient mesh background */}
      <div className="pointer-events-none absolute inset-0 bg-mesh-1" />

      {/* Floating glow shapes */}
      <motion.div
        className="pointer-events-none absolute -left-32 top-20 h-96 w-96 rounded-full bg-primary/25 blur-[100px]"
        animate={{ y: [0, 30, 0], x: [0, 20, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute -right-24 bottom-10 h-[28rem] w-[28rem] rounded-full bg-secondary/25 blur-[120px]"
        animate={{ y: [0, -40, 0], x: [0, -25, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/3 h-64 w-64 -translate-x-1/2 rounded-full bg-accent/20 blur-[90px] animate-pulse-glow"
      />

      {/* Particles */}
      <div className="pointer-events-none absolute inset-0">
        {Array.from({ length: 28 }).map((_, i) => (
          <motion.span
            key={i}
            className="absolute h-1 w-1 rounded-full bg-white/50"
            style={{
              left: `${(i * 37) % 100}%`,
              top: `${(i * 53) % 100}%`,
            }}
            animate={{ opacity: [0.1, 0.9, 0.1], y: [0, -20, 0] }}
            transition={{
              duration: 3 + (i % 5),
              repeat: Infinity,
              delay: i * 0.15,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-6 pt-24 lg:grid-cols-2 lg:pt-0">
        {/* Text */}
        <div className="order-2 text-center lg:order-1 lg:text-left">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="mb-5 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 font-mono text-xs text-gray-900/70"
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
            New Generation · 2026
          </motion.span>

          <h1 className="font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            {"Relive Retro,".split(" ").map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ delay: 0.2 + i * 0.08, duration: 0.7 }}
                className="mr-3 inline-block"
              >
                {word}
              </motion.span>
            ))}
            <br />
            <span className="text-gradient">
              {"Reimagined.".split("").map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.55 + i * 0.03, duration: 0.4 }}
                  className="inline-block"
                >
                  {char}
                </motion.span>
              ))}
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="mx-auto mt-6 max-w-md text-base text-gray-900/60 lg:mx-0"
          >
            R36MAX packs 18,000+ classic games across 30+ emulators into a compact form factor featuring a unique 1:1 HD square screen. Built for true retro enthusiasts.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.05, duration: 0.6 }}
            className="mt-9 flex flex-col items-center gap-4 sm:flex-row lg:justify-start"
          >
            <Link href="/product" className="inline-flex">
              <MagneticButton variant="primary">Buy Now — $49</MagneticButton>
            </Link>
            <MagneticButton variant="secondary" icon={false}>
              ▶ Watch Demo
            </MagneticButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3, duration: 0.8 }}
            className="mt-10 flex items-center justify-center gap-8 lg:justify-start"
          >
            {[
              ["18K+", "Games"],
              ["30+", "Systems"],
              ["6-8hrs", "Battery"],
            ].map(([num, label]) => (
              <div key={label} className="text-center lg:text-left">
                <p className="font-display text-2xl font-bold text-gray-900">{num}</p>
                <p className="text-xs text-gray-900/50">{label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Console */}
        <div className="perspective order-1 flex justify-center lg:order-2">
          <motion.div
            style={{
              rotateX,
              rotateY,
              x: translateX,
              scale,
              opacity,
            }}
            className="relative"
          >
            <motion.div
              animate={{ y: [0, -22, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="relative"
            >
              <div className="absolute inset-0 -z-10 animate-pulse-glow rounded-full bg-primary/40 blur-[70px]" />
              <motion.div
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="relative h-[320px] w-[220px] drop-shadow-[0_30px_60px_rgba(255,43,43,0.35)] sm:h-[420px] sm:w-[290px]"
              >
                <Image
                  src="/console-front.png"
                  alt="R36MAX retro handheld gaming console"
                  fill
                  priority
                  sizes="(max-width: 640px) 220px, 290px"
                  className="object-contain"
                />
              </motion.div>
            </motion.div>
            {/* Floating shadow */}
            <motion.div
              animate={{ scaleX: [1, 0.85, 1], opacity: [0.5, 0.3, 0.5] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="mx-auto mt-4 h-6 w-64 rounded-full bg-black/60 blur-xl"
            />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity }}
          className="flex h-9 w-6 items-start justify-center rounded-full border border-white/30 p-1.5"
        >
          <div className="h-1.5 w-1 rounded-full bg-white/70" />
        </motion.div>
      </motion.div>
    </section>
  );
}
