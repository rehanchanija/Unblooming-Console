import Link from "next/link";

const quickLinks = ["Products", "Features", "Games", "Reviews", "Accessories", "FAQ"];
const policies = ["Privacy Policy", "Terms of Service", "Shipping Info", "Returns"];
const socials = ["X", "IG", "YT", "DC"];

export default function Footer() {
  return (
    <footer className="relative border-t border-borderc bg-black px-6 pb-8 pt-16">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <span className="font-display text-xl font-bold text-white">
            R36<span className="text-gradient">MAX</span>
          </span>
          <p className="mt-4 max-w-xs text-sm text-white/45">
            The retro handheld reimagined — premium build, massive library,
            uncompromising performance.
          </p>
          <div className="mt-6 flex gap-3">
            {socials.map((s) => (
              <span
                key={s}
                className="flex h-9 w-9 items-center justify-center rounded-full glass text-xs text-white/70 transition-colors hover:text-accent hover:shadow-glow-blue"
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold text-white">Quick Links</h4>
          <ul className="mt-4 space-y-2.5">
            {quickLinks.map((l) => (
              <li key={l}>
                <Link href={`#${l.toLowerCase()}`} className="text-sm text-white/45 hover:text-white">
                  {l}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold text-white">Policies</h4>
          <ul className="mt-4 space-y-2.5">
            {policies.map((l) => (
              <li key={l}>
                <Link href="#" className="text-sm text-white/45 hover:text-white">
                  {l}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold text-white">We Accept</h4>
          <div className="mt-4 flex flex-wrap gap-2">
            {["VISA", "MC", "AMEX", "PAY"].map((p) => (
              <span
                key={p}
                className="rounded-md glass px-3 py-1.5 font-mono text-[10px] text-white/60"
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto mt-14 max-w-7xl border-t border-borderc pt-6 text-center">
        <p className="text-xs text-white/35">
          © {new Date().getFullYear()} R36MAX. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
