"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import AdminSidebar, { menuItems } from "./AdminSidebar";
import { useEffect } from "react";

export default function AdminLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const adminUser = localStorage.getItem("adminUser");
    if (!adminUser) {
      router.push("/admin/login");
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row pb-20 md:pb-0 relative">
      <AdminSidebar />

      <main className="flex-1 md:ml-64 p-4 md:p-8 w-full max-w-[100vw]">
        {children}
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 z-50 flex justify-around items-center px-2 py-3 safe-area-pb">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center p-2 rounded-xl transition-all ${
                isActive ? "text-orange-500" : "text-gray-400 hover:text-white"
              }`}
            >
              <span className="text-2xl">{item.icon}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
