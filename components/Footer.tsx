"use client";

import { useRouter } from "next/navigation";

export default function Footer() {
  const router = useRouter();

  const handleNavigation = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push(`/#${id}`);
    }
  };

  return (
    <footer
      className="bg-gray-50 border-t border-gray-200 pt-16 pb-8"
      id="contact"
    >
      <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 text-center md:text-left">
        {/* Brand */}
        <div>
          <h4 className="text-2xl font-black text-gray-900 tracking-tight mb-4">
            UN<span className="text-orange-500">BLOOMING</span>
          </h4>
          <p className="text-gray-500 font-medium text-sm max-w-xs mx-auto md:mx-0">
            Your premium destination for the finest curated smart products and
            lifestyle accessories.
          </p>
        </div>

        {/* Nav */}
        <div>
          <h5 className="font-bold text-gray-900 mb-4">Quick Links</h5>
          <div className="flex flex-col space-y-2 text-sm font-medium text-gray-500">
            <button
              onClick={() => handleNavigation("home")}
              className="hover:text-orange-500 transition-colors text-center md:text-left w-fit mx-auto md:mx-0"
            >
              Home
            </button>
            <button
              onClick={() => handleNavigation("about")}
              className="hover:text-orange-500 transition-colors text-center md:text-left w-fit mx-auto md:mx-0"
            >
              About Us
            </button>
            <button
              onClick={() => handleNavigation("details")}
              className="hover:text-orange-500 transition-colors text-center md:text-left w-fit mx-auto md:mx-0"
            >
              Details
            </button>
          </div>
        </div>

        {/* Contact */}
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <h5 className="font-bold text-gray-900">Contact Us</h5>
            <span className="bg-orange-100 text-orange-600 text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
              24/7 Support
            </span>
          </div>
          <div className="flex flex-col space-y-3 text-sm font-medium text-gray-600">
            <a
              href="mailto:unbloomingsupport@gmail.com"
              className="flex items-center space-x-3 hover:text-orange-500 transition-colors bg-white p-3 rounded-xl border border-gray-100 shadow-sm"
            >
              <span className="text-lg">📧</span>
              <span>supportunblooming@gmail.com</span>
            </a>
            <a
              href="tel:+916265562258"
              className="flex items-center space-x-3 hover:text-orange-500 transition-colors bg-white p-3 rounded-xl border border-gray-100 shadow-sm"
            >
              <span className="text-lg">📞</span>
              <span>+91 62655 62258</span>
            </a>
          </div>
        </div>
      </div>

      <div className="text-center pt-8 border-t border-gray-200">
        <p className="text-gray-400 font-medium text-sm">
          © 2026 Unblooming. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

