'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useCart } from '@/lib/CartContext';
import { useAuth } from '@/lib/AuthContext';

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const { itemCount } = useCart();
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
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled || isMobileMenuOpen ? 'bg-white/95 backdrop-blur-md border-b border-gray-200 py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-5xl mx-auto px-6 flex justify-between items-center">
        {/* Mobile Menu Button & Logo */}
        <div className="flex items-center space-x-4">
          <button 
            className="md:hidden text-gray-900"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path></svg>
          </button>
          <Link href="/" className="text-2xl font-black text-gray-900 tracking-tight" onClick={() => setIsMobileMenuOpen(false)}>
            UN<span className="text-orange-500">BLOOMING</span>
          </Link>
        </div>
        
        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-8 text-sm font-bold text-gray-700">
          <a href="#home" onClick={(e) => handleScrollTo(e, 'home')} className="hover:text-orange-500 transition-colors">Home</a>
          <a href="#about" onClick={(e) => handleScrollTo(e, 'about')} className="hover:text-orange-500 transition-colors">About Us</a>
          <a href="#details" onClick={(e) => handleScrollTo(e, 'details')} className="hover:text-orange-500 transition-colors">Details</a>
        </div>

        <div className="flex items-center space-x-4">
          {/* Auth State */}
          <div className="hidden md:block">
            {user ? (
              <div className="group relative">
                <span className="text-sm font-bold text-gray-900 cursor-pointer hover:text-orange-500 transition-colors">
                  {user.name}
                </span>
                <div className="absolute top-full right-0 mt-2 w-32 bg-white rounded-xl shadow-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <button 
                    onClick={logout}
                    className="w-full text-left px-4 py-2 text-sm font-bold text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link href="/login" className="text-sm font-bold text-gray-900 hover:text-orange-500 transition-colors">
                Login
              </Link>
            )}
          </div>

          {/* Always Visible Cart Button */}
          <Link 
            href="/cart"
            className="relative flex items-center bg-gray-900 hover:bg-orange-500 text-white px-4 md:px-5 py-2.5 rounded-full transition-all shadow-sm group"
          >
            <span className="md:mr-2 text-lg md:text-base">🛒</span>
            <span className="hidden md:inline">Cart</span>
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-orange-500 group-hover:bg-gray-900 text-white text-[10px] font-black rounded-full h-5 w-5 flex items-center justify-center border-2 border-white transition-colors">
                {itemCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-gray-200 shadow-xl py-4 px-6 flex flex-col space-y-4 text-gray-900 font-bold animate-in slide-in-from-top-4">
          <a href="#home" onClick={(e) => handleScrollTo(e, 'home')} className="hover:text-orange-500 block py-2 border-b border-gray-50">Home</a>
          <a href="#about" onClick={(e) => handleScrollTo(e, 'about')} className="hover:text-orange-500 block py-2 border-b border-gray-50">About Us</a>
          <a href="#details" onClick={(e) => handleScrollTo(e, 'details')} className="hover:text-orange-500 block py-2 border-b border-gray-50">Details</a>
          {user ? (
            <button onClick={() => { logout(); setIsMobileMenuOpen(false); }} className="text-left text-red-500 block py-2 border-b border-gray-50">Logout ({user.name})</button>
          ) : (
            <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-orange-500 block py-2 border-b border-gray-50">Login</Link>
          )}
        </div>
      )}
    </nav>
  );
}
