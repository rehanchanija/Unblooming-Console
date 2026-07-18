'use client';
import { useState } from 'react';
import Image from 'next/image';
import ProductList from '@/components/ProductList';

export default function R36MaxProductPage() {
  const [activeTab, setActiveTab] = useState<'save' | 'add'>('save');
  const [isSpecsOpen, setIsSpecsOpen] = useState(false);

  return (
    <main className="min-h-screen bg-gray-50 text-gray-800 font-sans selection:bg-orange-500 selection:text-gray-900 pt-20">
      {/* Announcement */}
      <div className="bg-orange-600 text-gray-900 text-center py-2 text-sm font-bold tracking-wide shadow-sm">
        🔥 SALE ENDS TONIGHT! Only 7 items left in stock!
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 md:py-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* 1. Hero Image */}
        <div className="relative aspect-square bg-[#0a0a0a] rounded-3xl overflow-hidden shadow-2xl">
          <Image 
            src="/r36max_front_1784376825798.png" 
            alt="R36MAX Front View" 
            fill
            className="object-cover hover:scale-105 transition-transform duration-700"
          />
        </div>

        {/* 2. Brief Details & CTA */}
        <div className="flex flex-col justify-center space-y-6">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-black tracking-tight text-gray-900 leading-tight">
              Relive Your Best <br/> Gaming Memories.
            </h1>
            <p className="text-xl font-medium text-gray-500 leading-relaxed max-w-md">
              The ultimate retro handheld console. 18,000+ pre-loaded games, stunning IPS display, and all-day battery life packed into your pocket.
            </p>
          </div>

          <div className="pt-4">
            <button 
              onClick={() => { document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="w-full md:w-auto bg-gray-900 hover:bg-gray-800 text-white text-lg font-bold px-12 py-5 rounded-2xl shadow-xl transition-transform hover:-translate-y-1 flex items-center justify-center space-x-3">
              <span>EXPLORE COLLECTION</span>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </button>
          </div>
        </div>
      </div>

      <ProductList />

      <div className="max-w-4xl mx-auto px-4 pb-20 space-y-16">

        {/* FAQ Section */}
        <div className="pt-12 border-t border-gray-200" id="faq">
          <h2 className="text-3xl font-black text-center mb-8 text-gray-900">Frequently Asked Questions</h2>
          <div className="flex justify-center mb-6 border-b border-gray-200">
            <button 
              className={`px-6 py-3 font-bold transition-colors relative ${activeTab === 'save' ? 'text-orange-600' : 'text-gray-500 hover:text-gray-900'}`}
              onClick={() => setActiveTab('save')}
            >
              Saving Games
              {activeTab === 'save' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-600"></div>}
            </button>
            <button 
              className={`px-6 py-3 font-bold transition-colors relative ${activeTab === 'add' ? 'text-orange-600' : 'text-gray-500 hover:text-gray-900'}`}
              onClick={() => setActiveTab('add')}
            >
              Adding Games
              {activeTab === 'add' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-600"></div>}
            </button>
          </div>
          
          <div className="bg-white p-8 rounded-2xl border border-gray-200 min-h-[150px] shadow-sm">
            {activeTab === 'save' ? (
              <div className="animate-in fade-in duration-300">
                <h4 className="text-xl font-bold mb-3 text-gray-900">Can I save my progress?</h4>
                <p className="text-gray-600 leading-relaxed font-medium">Yes! You can save and load state at any exact moment in any game. The emulator supports multiple save slots so you'll never lose your progress even if you turn off the console mid-game.</p>
              </div>
            ) : (
              <div className="animate-in fade-in duration-300">
                <h4 className="text-xl font-bold mb-3 text-gray-900">Can I add my own games?</h4>
                <p className="text-gray-600 leading-relaxed font-medium">Absolutely. The console comes with a standard MicroSD card. You can plug it into your computer and easily drag-and-drop your own ROMs into the respective console folders.</p>
              </div>
            )}
          </div>
        </div>

        {/* Contact Section */}
        <div className="pt-12 border-t border-gray-200" id="contact">
          <div className="bg-gray-900 rounded-3xl p-8 md:p-12 text-center text-white shadow-xl">
            <h2 className="text-3xl font-black mb-4">Need Help?</h2>
            <p className="text-gray-400 mb-8 max-w-lg mx-auto font-medium">Our customer support team is available from 9 AM to 6 PM to assist you with any questions about your Unblooming console.</p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
              <div className="flex items-center space-x-3 bg-white/10 px-6 py-3 rounded-xl border border-white/20">
                <span className="text-2xl">📧</span>
                <span className="font-bold">support@unblooming.com</span>
              </div>
              <div className="flex items-center space-x-3 bg-white/10 px-6 py-3 rounded-xl border border-white/20">
                <span className="text-2xl">📞</span>
                <span className="font-bold">+91 98765 43210</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* 1-Click Buy Sticky Footer (Mobile) */}
      <div className="fixed bottom-0 left-0 w-full bg-white/95 backdrop-blur-md border-t border-gray-200 p-4 md:hidden z-50">
        <button 
          onClick={() => { document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' }); }}
          className="w-full bg-orange-600 hover:bg-orange-500 text-white font-bold py-3.5 rounded-xl shadow-[0_0_15px_rgba(234,88,12,0.3)] flex items-center justify-center space-x-2">
            <span>SEE BUY OPTIONS</span>
        </button>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 pt-16 pb-8 md:pb-8 pb-24 text-center">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-black text-gray-900 tracking-tight mb-6">
            UN<span className="text-orange-500">BLOOMING</span>
          </h2>
          <div className="flex justify-center gap-6 mb-8 text-gray-500 font-medium text-sm">
            <a href="#" className="hover:text-gray-900 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gray-900 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-gray-900 transition-colors">Shipping Info</a>
            <a href="#" className="hover:text-gray-900 transition-colors">Returns</a>
          </div>
          <p className="text-gray-400 text-sm">© 2026 Unblooming. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
