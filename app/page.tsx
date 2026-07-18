'use client';
import { useState } from 'react';
import Image from 'next/image';
import ProductList from '@/components/ProductList';

export default function SinglePageStore() {
  const [isOrdered, setIsOrdered] = useState(false);
  const [formData, setFormData] = useState({ name: '', address: '', phone: '' });

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setIsOrdered(true);
  };

  const scrollToBuy = () => {
    document.getElementById('buy')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen bg-gray-50 text-gray-800 font-sans selection:bg-orange-200" id="home">
      {/* 1. HERO SECTION */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-orange-50 rounded-bl-[100px] -z-10"></div>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-block px-3 py-1 bg-orange-100 text-orange-600 font-bold rounded-full text-sm mb-2">
              New Arrival
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-gray-900 leading-tight tracking-tight">
              Never drink cold coffee again.
            </h1>
            <p className="text-xl text-gray-500 font-medium max-w-md leading-relaxed">
              Meet the LuminaMug. A beautifully designed smart mug that keeps your coffee exactly at your preferred temperature for up to 3 hours.
            </p>
            <div className="pt-4 flex items-center space-x-6">
              <button 
                onClick={scrollToBuy}
                className="bg-gray-900 hover:bg-orange-500 text-white text-lg font-bold px-8 py-4 rounded-full shadow-lg transition-all transform hover:-translate-y-1">
                Order Now - ₹2,999
              </button>
              <div className="flex -space-x-2">
                <div className="w-10 h-10 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs">⭐</div>
                <div className="w-10 h-10 rounded-full bg-gray-300 border-2 border-white flex items-center justify-center text-xs">⭐</div>
                <div className="w-10 h-10 rounded-full bg-gray-400 border-2 border-white flex items-center justify-center text-xs font-bold text-white">4.9</div>
              </div>
            </div>
          </div>
          
          <div className="relative aspect-square md:aspect-[4/5] w-full max-w-md mx-auto">
            <Image 
              src="/smart-mug.png" 
              alt="LuminaMug Smart Coffee Mug" 
              fill
              className="object-cover rounded-[40px] shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-700"
              priority
            />
          </div>
        </div>
      </section>

      {/* 2. PRODUCT SLIDER */}
      <ProductList />

      {/* 3. ABOUT SECTION */}
      <section className="py-24 bg-white" id="about">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-16">Perfect temperature. Every single sip.</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-orange-100 text-orange-500 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-6">🌡️</div>
              <h3 className="text-xl font-bold text-gray-900">Precision Heat</h3>
              <p className="text-gray-500 font-medium">Set your exact preferred drinking temperature down to the degree using the touch base.</p>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 bg-blue-100 text-blue-500 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-6">🔋</div>
              <h3 className="text-xl font-bold text-gray-900">All-Day Battery</h3>
              <p className="text-gray-500 font-medium">Keeps your drink hot for up to 3 hours off the coaster, or all day when resting on it.</p>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 bg-green-100 text-green-500 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-6">💧</div>
              <h3 className="text-xl font-bold text-gray-900">Safe to Wash</h3>
              <p className="text-gray-500 font-medium">Fully IPX7 waterproof. Safe to hand wash right alongside your regular dishes.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. DETAILS SECTION */}
      <section className="py-24 bg-gray-50" id="details">
        <div className="max-w-4xl mx-auto px-6 bg-white rounded-[40px] p-8 md:p-16 border border-gray-100 shadow-xl">
          <h2 className="text-3xl font-black text-gray-900 mb-8 border-b border-gray-100 pb-4">Technical Specifications</h2>
          <ul className="space-y-6">
            <li className="flex flex-col sm:flex-row sm:justify-between">
              <span className="text-gray-500 font-medium">Capacity</span>
              <strong className="text-gray-900 text-lg">14 oz (414 ml)</strong>
            </li>
            <li className="flex flex-col sm:flex-row sm:justify-between">
              <span className="text-gray-500 font-medium">Temperature Range</span>
              <strong className="text-gray-900 text-lg">120°F - 145°F (50°C - 62.5°C)</strong>
            </li>
            <li className="flex flex-col sm:flex-row sm:justify-between">
              <span className="text-gray-500 font-medium">Battery Life</span>
              <strong className="text-gray-900 text-lg">3 Hours (Built-in Lithium-ion)</strong>
            </li>
            <li className="flex flex-col sm:flex-row sm:justify-between">
              <span className="text-gray-500 font-medium">Material</span>
              <strong className="text-gray-900 text-lg">Ceramic coated stainless steel</strong>
            </li>
            <li className="flex flex-col sm:flex-row sm:justify-between">
              <span className="text-gray-500 font-medium">Connectivity</span>
              <strong className="text-gray-900 text-lg">Bluetooth 5.0 (App Compatible)</strong>
            </li>
          </ul>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-50 border-t border-gray-200 pt-16 pb-8" id="contact">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 text-center md:text-left">
          {/* Brand */}
          <div>
            <h4 className="text-2xl font-black text-gray-900 tracking-tight mb-4">
              UN<span className="text-orange-500">BLOOMING</span>
            </h4>
            <p className="text-gray-500 font-medium text-sm max-w-xs mx-auto md:mx-0">
              Your premium destination for the finest curated smart products and lifestyle accessories.
            </p>
          </div>
          
          {/* Nav */}
          <div>
            <h5 className="font-bold text-gray-900 mb-4">Quick Links</h5>
            <div className="flex flex-col space-y-2 text-sm font-medium text-gray-500">
              <button onClick={() => { document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' }); }} className="hover:text-orange-500 transition-colors text-center md:text-left w-fit mx-auto md:mx-0">Home</button>
              <button onClick={() => { document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }); }} className="hover:text-orange-500 transition-colors text-center md:text-left w-fit mx-auto md:mx-0">About Us</button>
              <button onClick={() => { document.getElementById('details')?.scrollIntoView({ behavior: 'smooth' }); }} className="hover:text-orange-500 transition-colors text-center md:text-left w-fit mx-auto md:mx-0">Details</button>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h5 className="font-bold text-gray-900 mb-4">Contact Us</h5>
            <div className="flex flex-col space-y-2 text-sm font-medium text-gray-500">
              <span>📧 support@unblooming.com</span>
              <span>📞 +91 98765 43210</span>
              <span>📍 123 Innovation Drive, Tech Park</span>
            </div>
          </div>
        </div>
        
        <div className="text-center pt-8 border-t border-gray-200">
          <p className="text-gray-400 font-medium text-sm">© 2026 Unblooming. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
