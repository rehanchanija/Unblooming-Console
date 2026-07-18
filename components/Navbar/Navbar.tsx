"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import MagneticButton from "@/components/UI/MagneticButton";

const links = [
  { label: "Products", href: "#showcase" },
  { label: "Features", href: "#features" },
  { label: "Games", href: "#categories" },
  { label: "Reviews", href: "#reviews" },
  { label: "Accessories", href: "#accessories" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#newsletter" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={clsx(
        "sticky top-0 z-50 w-full transition-all duration-500",
        scrolled ? "glass-strong py-3 shadow-[0_4px_30px_rgba(0,0,0,0.4)]" : "bg-transparent py-5"
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6">
        <a href="#hero" className="font-display text-xl font-bold tracking-tight text-white">
          R36<span className="text-gradient">MAX</span>
        </a>

        <ul className="hidden items-center gap-8 lg:flex">
          {links.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="nav-link font-body text-sm text-white/80 transition-colors hover:text-white"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden lg:block">
          <Link href="/product" className="inline-block">
            <MagneticButton variant="secondary" className="!px-6 !py-2.5 !text-xs" icon={false}>
              Buy Now
            </MagneticButton>
          </Link>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-full glass lg:hidden"
          aria-label="Toggle menu"
        >
          <div className="flex flex-col gap-1.5">
            <motion.span
              animate={{ rotate: open ? 45 : 0, y: open ? 6 : 0 }}
              className="h-[2px] w-5 bg-white"
            />
            <motion.span
              animate={{ opacity: open ? 0 : 1 }}
              className="h-[2px] w-5 bg-white"
            />
            <motion.span
              animate={{ rotate: open ? -45 : 0, y: open ? -6 : 0 }}
              className="h-[2px] w-5 bg-white"
            />
          </div>
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden lg:hidden"
          >
            <ul className="flex flex-col gap-4 px-6 pb-6 pt-4">
              {links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block font-body text-sm text-white/80"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <MagneticButton variant="primary" className="!px-6 !py-2.5 !text-xs w-fit" icon={false}>
                Buy Now
              </MagneticButton>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
