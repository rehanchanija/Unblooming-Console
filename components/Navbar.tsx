'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useCart } from '@/lib/CartContext';
import { useAuth } from '@/lib/AuthContext';

import { Menu, X, ShoppingBag, User } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const { itemCount } = useCart();
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // Add state for mobile profile dropdown toggle since hover doesn't work well on mobile
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

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
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
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
        </div>

        {/* Right: Cart and Profile */}
        <div className="flex w-1/3 md:w-1/4 justify-end items-center space-x-2 md:space-x-4">
          
          {/* Cart Icon */}
          <Link 
            href="/cart"
            className="relative flex items-center justify-center p-2 text-gray-900 hover:text-orange-500 transition-colors"
          >
            <ShoppingBag size={24} strokeWidth={2.2} />
            {itemCount > 0 && (
              <span className="absolute top-0 right-0 bg-gray-900 text-white text-[10px] font-black rounded-full h-5 w-5 flex items-center justify-center border-2 border-white">
                {itemCount}
              </span>
            )}
          </Link>

          {/* Profile Icon */}
          <div className="relative group">
            <button 
              className="flex items-center justify-center p-2 text-gray-900 hover:text-orange-500 transition-colors"
              onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
            >
              <User size={26} strokeWidth={2.2} />
            </button>
            
            {/* Dropdown Menu */}
            <div className={`absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 transition-all z-50 md:group-hover:opacity-100 md:group-hover:visible ${isProfileDropdownOpen ? 'opacity-100 visible' : 'opacity-0 invisible md:opacity-0 md:invisible'}`}>
              {user ? (
                <>
                  <div className="px-4 py-3 border-b border-gray-50">
                    <p className="text-sm font-bold text-gray-900 truncate">{user.name}</p>
                    <p className="text-xs text-gray-500 truncate">{user.email}</p>
                  </div>
                  <Link href="/profile" className="block px-4 py-2.5 text-sm font-medium text-gray-700 hover:text-orange-500 hover:bg-orange-50 transition-colors">
                    View Profile
                  </Link>
                  <button 
                    onClick={() => {
                      logout();
                      setIsProfileDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2.5 text-sm font-bold text-red-500 hover:bg-red-50 rounded-b-xl transition-colors border-t border-gray-50"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link href="/login" onClick={() => setIsProfileDropdownOpen(false)} className="block px-4 py-3 text-sm font-bold text-gray-900 hover:bg-gray-50 rounded-xl transition-colors text-center">
                  Login / Register
                </Link>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-gray-200 shadow-xl py-4 px-6 flex flex-col space-y-4 text-gray-900 font-bold animate-in slide-in-from-top-4">
          <a href="#home" onClick={(e) => handleScrollTo(e, 'home')} className="hover:text-orange-500 block py-2 border-b border-gray-50">Home</a>
          <a href="#about" onClick={(e) => handleScrollTo(e, 'about')} className="hover:text-orange-500 block py-2 border-b border-gray-50">About Us</a>
          <a href="#details" onClick={(e) => handleScrollTo(e, 'details')} className="hover:text-orange-500 block py-2 border-b border-gray-50">Details</a>
        </div>
      )}
    </nav>
  );
}
