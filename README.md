# PULSAR X1 — Retro Handheld Console Landing Page

Ultra-premium Next.js 15 + Tailwind CSS e-commerce landing page for a retro
handheld gaming console. Built with the Apple × Nothing × PlayStation × Steam
Deck aesthetic: dark glassmorphism, neon red/purple/blue accents, and heavy
Framer Motion animation throughout.

## Product images

Real product photos live in `public/`:

- `console-front.png` — front view (used in Hero + ProductViewer + Gallery)
- `console-back.png` — back view (used in ProductViewer + Gallery)
- `console-listing.png` — the original full listing shot with accessories
  (used in Gallery as "Full Kit")

These were cropped from the source photo at fairly low resolution
(325×418px original). For crisper results, especially in the large Hero
section, swap these for higher-res photography of the same console — same
filenames, drop-in replacement, no code changes needed.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Stack

- Next.js 15 (App Router) + React 19 + TypeScript
- Tailwind CSS (utility-first, custom theme colors as CSS variables)
- Framer Motion (scroll reveals, stagger, magnetic buttons, tilt/parallax)
- Lenis (smooth scroll)
- GSAP is installed and ready to use for any extra scroll-triggered timelines
  you want to add beyond what Framer Motion covers

## Structure

```
app/
  layout.tsx      – fonts, metadata/SEO, Lenis provider
  page.tsx         – composes every section
components/
  Navbar/          – AnnouncementBar, Navbar
  Hero/            – fullscreen animated hero
  Features/        – feature grid
  ProductViewer/    – front/back/side toggle + hotspots
  Categories/       – game system cards
  Performance/      – animated stat bars
  Gallery/          – masonry gallery + lightbox
  Specifications/   – comparison table
  Accessories/      – accessory cards
  Reviews/          – autoplay testimonial slider
  Pricing/          – 3-tier pricing
  FAQ/              – accordion
  Newsletter/       – email capture
  Footer/           – footer
  UI/               – MagneticButton, Reveal, StaggerGroup, CountUp,
                       ScrollProgress, ConsoleArt (placeholder art)
lib/
  SmoothScrollProvider.tsx – Lenis wrapper
styles/
  globals.css       – noise texture, glass utilities, gradient text, etc.
```

## Customizing colors

All theme colors live in `tailwind.config.ts` (`primary`, `secondary`,
`accent`, `bg`, `card`, `borderc`) and are mirrored as CSS variables in
`styles/globals.css` for anywhere you need raw CSS.
