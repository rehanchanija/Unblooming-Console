"use client";
import { useState } from "react";
import Image from "next/image";
import ProductList from "@/components/ProductList";

export default function SinglePageStore() {
  const [isOrdered, setIsOrdered] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
  });

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setIsOrdered(true);
  };

  const scrollToBuy = () => {
    document.getElementById("buy")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main
      className="min-h-screen bg-gray-50 text-gray-800 font-sans selection:bg-orange-200"
      id="home"
    >
      {/* 1. HERO SECTION */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-orange-50 rounded-bl-[100px] -z-10"></div>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 order-2 md:order-1">
            <div className="inline-block px-3 py-1 bg-orange-100 text-orange-600 font-bold rounded-full text-sm mb-2">
              New Arrival
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-gray-900 leading-tight tracking-tight">
              Relive your best childhood memories.
            </h1>
            <p className="text-xl text-gray-500 font-medium max-w-md leading-relaxed">
              Meet the R36MAX. The ultimate retro handheld gaming console with a
              stunning IPS display and 18,000+ pre-loaded games ready to play.
            </p>
            <div className="pt-4 flex items-center space-x-6">
              <button
                onClick={scrollToBuy}
                className="bg-gray-900 hover:bg-orange-500 text-white text-lg font-bold px-8 py-4 rounded-full shadow-lg transition-all transform hover:-translate-y-1"
              >
                Order Now - ₹4,499
              </button>
              <div className="flex -space-x-2">
                <div className="w-10 h-10 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs">
                  ⭐
                </div>
                <div className="w-10 h-10 rounded-full bg-gray-300 border-2 border-white flex items-center justify-center text-xs">
                  ⭐
                </div>
                <div className="w-10 h-10 rounded-full bg-gray-400 border-2 border-white flex items-center justify-center text-xs font-bold text-white">
                  4.9
                </div>
              </div>
            </div>
          </div>

          <div className="relative aspect-square md:aspect-[4/5] w-full max-w-md mx-auto order-1 md:order-2 mb-8 md:mb-0">
            <Image
              src="/hero-r36max.png"
              alt="R36MAX Retro Console"
              fill
              className="object-contain"
              style={{ animation: "float 6s ease-in-out infinite" }}
              priority
            />
            <style>{`
              @keyframes float {
                0% { transform: translateY(0px) rotate(2deg); filter: drop-shadow(0 25px 25px rgb(0 0 0 / 0.15)); }
                50% { transform: translateY(-20px) rotate(-2deg); filter: drop-shadow(0 35px 35px rgb(0 0 0 / 0.25)); }
                100% { transform: translateY(0px) rotate(2deg); filter: drop-shadow(0 25px 25px rgb(0 0 0 / 0.15)); }
              }
            `}</style>
          </div>
        </div>
      </section>

      {/* 2. PRODUCT SLIDER */}
      <ProductList />

      {/* 3. ABOUT SECTION */}
      <section className="py-24 bg-white" id="about">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-16">
            Classic gaming, modernized.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-orange-100 text-orange-500 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-6">
                🎮
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                Endless Library
              </h3>
              <p className="text-gray-500 font-medium">
                Pre-loaded with over 18,000 games across 30+ classic emulators
                (PS1, N64, GBA, and more).
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 bg-blue-100 text-blue-500 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-6">
                🖥️
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                Vibrant Display
              </h3>
              <p className="text-gray-500 font-medium">
                A fully-laminated 4.0-inch IPS screen delivers crisp, punchy
                colors at 720 × 720 resolution.
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 bg-green-100 text-green-500 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-6">
                🕹️
              </div>
              <h3 className="text-xl font-bold text-gray-900">Pro Controls</h3>
              <p className="text-gray-500 font-medium">
                Features dual 3D analog joysticks, an accurate D-pad, and
                L1/L2/R1/R2 shoulder triggers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. DETAILS SECTION */}
      <section className="py-24 bg-gray-50" id="details">
        <div className="max-w-4xl mx-auto px-6 bg-white rounded-[40px] p-8 md:p-16 border border-gray-100 shadow-xl">
          <h2 className="text-3xl font-black text-gray-900 mb-8 border-b border-gray-100 pb-4">
            Hardware Specifications
          </h2>
          <ul className="space-y-6">
            <li className="flex flex-col sm:flex-row sm:justify-between">
              <span className="text-gray-500 font-medium">Display</span>
              <strong className="text-gray-900 text-lg">
                4.0-inch IPS fully-laminated (720×720)
              </strong>
            </li>
            <li className="flex flex-col sm:flex-row sm:justify-between">
              <span className="text-gray-500 font-medium">Processor (CPU)</span>
              <strong className="text-gray-900 text-lg">
                Rockchip RK3326 64-bit quad-core @ 1.5 GHz
              </strong>
            </li>
            <li className="flex flex-col sm:flex-row sm:justify-between">
              <span className="text-gray-500 font-medium">Battery</span>
              <strong className="text-gray-900 text-lg">
                4000 mAh (6 to 8 hours playtime)
              </strong>
            </li>
            <li className="flex flex-col sm:flex-row sm:justify-between">
              <span className="text-gray-500 font-medium">Storage Options</span>
              <strong className="text-gray-900 text-lg">
                Dual MicroSD slots (up to 512GB)
              </strong>
            </li>
            <li className="flex flex-col sm:flex-row sm:justify-between">
              <span className="text-gray-500 font-medium">Connectivity</span>
              <strong className="text-gray-900 text-lg">
                USB Type-C, 3.5mm headphone jack
              </strong>
            </li>
          </ul>
        </div>
      </section>

      {/* 5. OUR PROMISES SECTION */}
      <section
        className="py-24 bg-white text-gray-900 border-t border-gray-100"
        id="policy"
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center">
            <div className="space-y-3 md:space-y-4 group">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-orange-50 text-orange-500 rounded-2xl flex items-center justify-center text-2xl md:text-3xl mx-auto group-hover:scale-110 transition-transform">
                🛡️
              </div>
              <h4 className="font-black text-lg md:text-xl text-gray-900 tracking-tight">
                1-Year Warranty
              </h4>
              <p className="text-sm md:text-base text-gray-500 font-medium leading-relaxed max-w-[250px] mx-auto">
                Full hardware protection on all consoles.
              </p>
            </div>
            <div className="space-y-3 md:space-y-4 group">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-orange-50 text-orange-500 rounded-2xl flex items-center justify-center text-2xl md:text-3xl mx-auto group-hover:scale-110 transition-transform">
                📦
              </div>
              <h4 className="font-black text-lg md:text-xl text-gray-900 tracking-tight">
                Easy Returns
              </h4>
              <p className="text-sm md:text-base text-gray-500 font-medium leading-relaxed max-w-[250px] mx-auto">
                7-day hassle-free return policy.
              </p>
            </div>
            <div className="space-y-3 md:space-y-4 group">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-orange-50 text-orange-500 rounded-2xl flex items-center justify-center text-2xl md:text-3xl mx-auto group-hover:scale-110 transition-transform">
                ❌
              </div>
              <h4 className="font-black text-lg md:text-xl text-gray-900 tracking-tight">
                Anytime Cancel
              </h4>
              <p className="text-sm md:text-base text-gray-500 font-medium leading-relaxed max-w-[250px] mx-auto">
                Cancel your order before it ships, no questions asked.
              </p>
            </div>
            <div className="space-y-3 md:space-y-4 group">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-orange-50 text-orange-500 rounded-2xl flex items-center justify-center text-2xl md:text-3xl mx-auto group-hover:scale-110 transition-transform">
                🎧
              </div>
              <h4 className="font-black text-lg md:text-xl text-gray-900 tracking-tight">
                24/7 Support
              </h4>
              <p className="text-sm md:text-base text-gray-500 font-medium leading-relaxed max-w-[250px] mx-auto">
                Always here to help you game on.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
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
                onClick={() => {
                  document
                    .getElementById("home")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="hover:text-orange-500 transition-colors text-center md:text-left w-fit mx-auto md:mx-0"
              >
                Home
              </button>
              <button
                onClick={() => {
                  document
                    .getElementById("about")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="hover:text-orange-500 transition-colors text-center md:text-left w-fit mx-auto md:mx-0"
              >
                About Us
              </button>
              <button
                onClick={() => {
                  document
                    .getElementById("details")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
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
              {/* <div className="flex items-center space-x-3 bg-white p-3 rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <span className="text-lg shrink-0">📍</span>
                <span
                  className="truncate"
                  title="Sadar Bazar, Bhatapara, Raipur, Chhattisgarh"
                >
                  Sadar Bazar, Bhatapara, Raipur, Chhattisgarh
                </span>
              </div> */}
            </div>
          </div>
        </div>

        <div className="text-center pt-8 border-t border-gray-200">
          <p className="text-gray-400 font-medium text-sm">
            © 2026 Unblooming. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
