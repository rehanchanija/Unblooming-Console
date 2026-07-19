'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useCart } from '@/lib/CartContext';
import { useAuth } from '@/lib/AuthContext';

import { Menu, X, ShoppingBag, User } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const { itemCount, setIsCartOpen } = useCart();
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    
    if (pathname === '/') {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      router.push(`/#${id}`);
    }
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled || isMobileMenuOpen ? 'bg-white/95 backdrop-blur-md border-b border-gray-200 py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-5xl mx-auto px-6 flex justify-between items-center relative">
        
        {/* Mobile Left: Hamburger */}
        <div className="flex md:hidden w-1/3 justify-start">
          <button 
            className="text-gray-900 p-1"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} strokeWidth={2.5} />}
          </button>
        </div>

        {/* Desktop Left: Logo */}
        <div className="hidden md:flex items-center w-1/4">
          <Link href="/" className="text-2xl font-black text-gray-900 tracking-tight" onClick={() => setIsMobileMenuOpen(false)}>
            UN<span className="text-orange-500">BLOOMING</span>
          </Link>
        </div>

        {/* Mobile Center: Logo */}
        <div className="flex md:hidden w-1/3 justify-center">
          <Link href="/" className="text-xl font-black text-gray-900 tracking-tight" onClick={() => setIsMobileMenuOpen(false)}>
            UN<span className="text-orange-500">BLOOMING</span>
          </Link>
        </div>

        {/* Desktop Center: Links */}
        <div className="hidden md:flex items-center justify-center space-x-8 text-sm font-bold text-gray-700 flex-1">
          <a href="#home" onClick={(e) => handleScrollTo(e, 'home')} className="hover:text-orange-500 transition-colors">Home</a>
          <a href="#about" onClick={(e) => handleScrollTo(e, 'about')} className="hover:text-orange-500 transition-colors">About Us</a>
          <a href="#details" onClick={(e) => handleScrollTo(e, 'details')} className="hover:text-orange-500 transition-colors">Details</a>
          {user && (
            <Link href="/orders" className="hover:text-orange-500 transition-colors">Orders</Link>
          )}
        </div>

        {/* Right: Cart and Profile */}
        <div className="flex w-1/3 md:w-1/4 justify-end items-center space-x-2 md:space-x-4">
          
          {/* Cart Icon */}
          <button 
            onClick={() => setIsCartOpen(true)}
            className="relative flex items-center justify-center p-2 text-gray-900 hover:text-orange-500 transition-colors"
          >
            <ShoppingBag size={24} strokeWidth={2.2} />
            {itemCount > 0 && (
              <span className="absolute top-0 right-0 bg-gray-900 text-white text-[10px] font-black rounded-full h-5 w-5 flex items-center justify-center border-2 border-white">
                {itemCount}
              </span>
            )}
          </button>

          {/* Profile Icon / User Name */}
          <div className="flex items-center">
            {user ? (
              <Link href="/profile" className="font-black text-gray-900 hover:text-orange-500 transition-colors text-sm truncate max-w-[100px] md:max-w-[150px]">
                {user.name}
              </Link>
            ) : (
              <Link href="/login" className="flex items-center justify-center p-2 text-gray-900 hover:text-orange-500 transition-colors">
                <User size={26} strokeWidth={2.2} />
              </Link>
            )}
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-gray-200 shadow-xl py-4 px-6 flex flex-col space-y-4 text-gray-900 font-bold animate-in slide-in-from-top-4">
          <a href="#home" onClick={(e) => handleScrollTo(e, 'home')} className="hover:text-orange-500 block py-2 border-b border-gray-50">Home</a>
          <a href="#about" onClick={(e) => handleScrollTo(e, 'about')} className="hover:text-orange-500 block py-2 border-b border-gray-50">About Us</a>
          <a href="#details" onClick={(e) => handleScrollTo(e, 'details')} className="hover:text-orange-500 block py-2 border-b border-gray-50">Details</a>
          {user && (
            <Link href="/orders" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-orange-500 block py-2 border-b border-gray-50">Orders</Link>
          )}
        </div>
      )}
    </nav>
  );
}
