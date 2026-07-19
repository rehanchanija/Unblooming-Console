"use client";
import { useAuth } from "@/lib/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer/Footer";

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // If not logged in and we're sure (auth loaded), redirect to login
    if (!user) {
      const timer = setTimeout(() => {
        router.push("/login");
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [user, router]);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <div className="flex-1 pt-32 pb-16 px-6 flex items-center justify-center">
          <p className="text-gray-500 font-bold">Redirecting to login...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <main className="flex-1 pt-32 pb-16 px-6 w-full max-w-3xl mx-auto flex flex-col">
        <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-8">
          My Profile
        </h1>

        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm flex-1 space-y-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50 rounded-bl-full -z-10"></div>

          <div>
            <h2 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-1">
              Name
            </h2>
            <p className="text-2xl font-black text-gray-900">{user.name}</p>
          </div>

          <div>
            <h2 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-1">
              Email
            </h2>
            <p className="text-lg font-medium text-gray-700">{user.email}</p>
          </div>

          {/* Spacer to push logout to bottom if content is short */}
          <div className="flex-1"></div>

          <div className="pt-8 mt-8 border-t border-gray-100 flex justify-center">
            <button
              onClick={handleLogout}
              className="px-8 py-3 bg-gray-100 text-gray-900 font-bold rounded-xl hover:bg-red-50 hover:text-red-600 transition-colors"
            >
              Log Out
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
