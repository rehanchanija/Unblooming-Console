const items = [
  "⚡ Summer Sale — 20% Off",
  "🚚 Free Worldwide Shipping",
  "💾 64GB Storage Included",
  "🎮 10,000+ Games Preloaded",
];

export default function AnnouncementBar() {
  const loop = [...items, ...items];
  return (
    <div className="relative z-40 w-full overflow-hidden border-b border-borderc bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 py-2">
      <div className="marquee-track">
        {loop.map((item, i) => (
          <span
            key={i}
            className="mx-6 whitespace-nowrap font-mono text-xs tracking-wide text-gray-900/80"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
