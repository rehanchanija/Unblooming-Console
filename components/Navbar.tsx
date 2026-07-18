'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useCart } from '@/lib/CartContext';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { itemCount } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md border-b border-gray-200 py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-5xl mx-auto px-6 flex justify-between items-center">
        <Link href="/" className="text-2xl font-black text-gray-900 tracking-tight">
          UN<span className="text-orange-500">BLOOMING</span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-8 text-sm font-bold text-gray-700">
          <a href="#home" onClick={(e) => handleScrollTo(e, 'home')} className="hover:text-orange-500 transition-colors text-center md:text-left w-fit mx-auto md:mx-0">Home</a>
          <a href="#about" onClick={(e) => handleScrollTo(e, 'about')} className="hover:text-orange-500 transition-colors text-center md:text-left w-fit mx-auto md:mx-0">About Us</a>
          <a href="#details" onClick={(e) => handleScrollTo(e, 'details')} className="hover:text-orange-500 transition-colors text-center md:text-left w-fit mx-auto md:mx-0">Details</a>
          <Link 
            href="/cart"
            className="relative flex items-center bg-gray-900 hover:bg-orange-500 text-white px-5 py-2.5 rounded-full transition-all shadow-sm group"
          >
            <span className="mr-2">🛒</span>
            <span>Cart</span>
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-orange-500 group-hover:bg-gray-900 text-white text-[10px] font-black rounded-full h-5 w-5 flex items-center justify-center border-2 border-white transition-colors">
                {itemCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}
