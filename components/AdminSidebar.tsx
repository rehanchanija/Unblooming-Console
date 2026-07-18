'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { LayoutDashboard, Image as ImageIcon, ShoppingBag, Package, Phone } from 'lucide-react';

export const menuItems = [
  { name: 'Dashboard', href: '/admin', icon: <LayoutDashboard size={20} /> },
  { name: 'Hero Section', href: '/admin/hero', icon: <ImageIcon size={20} /> },
  { name: 'Collection', href: '/admin/products', icon: <ShoppingBag size={20} /> },
  { name: 'Orders', href: '/admin/orders', icon: <Package size={20} /> },
  { name: 'Contact Info', href: '/admin/contact', icon: <Phone size={20} /> },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <>
      {/* Sidebar (Desktop Only) */}
      <aside className="hidden md:flex w-64 bg-gray-900 text-white min-h-screen flex-col fixed left-0 top-0 z-50">
        <div className="p-6 border-b border-gray-800 flex justify-between items-center">
          <h2 className="text-2xl font-black tracking-tight text-white">
            UN<span className="text-orange-500">BLOOMING</span> <br/>
            <span className="text-sm font-medium text-gray-400">Admin Panel</span>
          </h2>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                isActive
                  ? 'bg-orange-500 text-white font-bold shadow-lg shadow-orange-500/20'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white font-medium'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-800">
        <Link
          href="/"
          className="flex items-center justify-center space-x-2 w-full px-4 py-3 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-xl transition-colors font-medium text-sm"
        >
          <span>⬅️</span>
          <span>Back to Store</span>
        </Link>
      </div>
    </aside>
    </>
  );
}
