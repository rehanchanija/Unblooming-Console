"use client";

import { useRef, useState, MouseEvent } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";

interface MagneticButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  onClick?: () => void;
  className?: string;
  icon?: boolean;
  type?: "button" | "submit" | "reset";
}

export default function MagneticButton({
  children,
  variant = "primary",
  onClick,
  className,
  icon = true,
  type = "button",
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);

  function handleMouseMove(e: MouseEvent<HTMLButtonElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.35;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.35;
    setPos({ x, y });
  }

  function handleMouseLeave() {
    setPos({ x: 0, y: 0 });
  }

  function handleClick(e: MouseEvent<HTMLButtonElement>) {
    const el = ref.current;
    if (el) {
      const rect = el.getBoundingClientRect();
      const id = Date.now();
      setRipples((r) => [
        ...r,
        { x: e.clientX - rect.left, y: e.clientY - rect.top, id },
      ]);
      setTimeout(() => setRipples((r) => r.filter((rp) => rp.id !== id)), 650);
    }
    onClick?.();
  }

  const base =
    "relative overflow-hidden inline-flex items-center gap-2 rounded-full px-8 py-4 font-display font-semibold text-sm tracking-wide transition-shadow duration-300";
  const styles =
    variant === "primary"
      ? "bg-gradient-to-r from-primary to-secondary text-gray-900 shadow-glow hover:shadow-[0_0_60px_rgba(255,43,43,0.55)]"
      : "glass text-gray-900 hover:shadow-glow-blue border border-borderc";

  return (
    <motion.button
      ref={ref}
      type={type}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 150, damping: 12, mass: 0.3 }}
      whileTap={{ scale: 0.94 }}
      className={clsx(base, styles, className)}
    >
      <span className="relative z-10">{children}</span>
      {icon && (
        <motion.svg
          className="relative z-10 h-4 w-4"
          viewBox="0 0 24 24"
          fill="none"
          animate={{ x: [0, 4, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
        >
          <path
            d="M5 12h14M13 6l6 6-6 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.svg>
      )}
      {ripples.map((r) => (
        <span
          key={r.id}
          className="pointer-events-none absolute rounded-full bg-white/40 animate-ping"
          style={{
            left: r.x - 10,
            top: r.y - 10,
            width: 20,
            height: 20,
          }}
        />
      ))}
    </motion.button>
  );
}
