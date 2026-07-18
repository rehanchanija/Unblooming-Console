'use client';
import Link from 'next/link';
import { useAuth } from '@/lib/AuthContext';
import { useCart } from '@/lib/CartContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { itemCount } = useCart();

  return (
    <nav className="bg-white/95 backdrop-blur-md border-b border-gray-200 fixed top-0 w-full z-50 transition-all">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-8">
          <Link href="/" className="text-2xl font-black text-gray-900 tracking-tight">
            UN<span className="text-orange-500">BLOOMING</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-6 text-sm font-semibold text-gray-600">
            <Link href="/#" className="hover:text-orange-500 transition-colors">Home</Link>
            <Link href="/#products" className="hover:text-orange-500 transition-colors">Products</Link>
            <Link href="/#faq" className="hover:text-orange-500 transition-colors">FAQ</Link>
            <Link href="/#contact" className="hover:text-orange-500 transition-colors">Contact</Link>
          </div>
        </div>

        <div className="flex items-center space-x-6">
          <Link href="/cart" className="relative text-gray-600 hover:text-gray-900 transition-colors">
            <span className="text-xl">🛒</span>
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-sm">
                {itemCount}
              </span>
            )}
          </Link>
          
          {user ? (
            <div className="flex items-center space-x-4">
              <Link href="/orders" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors hidden sm:block">
                Orders
              </Link>
              <button 
                onClick={logout}
                className="text-sm font-medium text-red-500 hover:text-red-400 transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link href="/login" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors hidden sm:block">
                Login
              </Link>
              <Link href="/register" className="text-sm font-bold bg-orange-600 hover:bg-orange-500 text-white px-4 py-2 rounded-lg transition-colors shadow-sm">
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
