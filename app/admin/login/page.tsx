"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:3001/auth/admin-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      localStorage.setItem("adminUser", JSON.stringify(data));
      alert("Admin login successful!");
      router.push("/admin");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="bg-white min-h-screen flex items-center justify-center p-6 selection:bg-orange-500 selection:text-white">
      <div className="w-full max-w-md  rounded-3xl shadow-2xl border border-gray-700 p-8 md:p-10">
        <div className="text-center mb-8">
          <h2 className="text-2xl text-black font-black tracking-tight  mb-2">
            UN<span className="text-orange-500">BLOOMING</span>
          </h2>
          <div className="inline-block px-3 py-1 bg-gray-700 text-gray-300 text-xs font-bold rounded-full mb-4">
            ADMINISTRATOR PORTAL
          </div>
          <h1 className="text-xl font-bold text-white">Secure Login</h1>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-900/50 border border-red-500 text-red-200 rounded-xl text-sm font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-bold text-gray-300">
              Admin Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-gray-700 text-white placeholder-gray-400 transition-colors"
              placeholder="admin@example.com"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-bold text-gray-300">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-gray-700 text-white placeholder-gray-400 transition-colors"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-orange-500/20"
          >
            Authenticate
          </button>
        </form>

        <div className="mt-6 text-center text-gray-500 text-xs">
          Authorized personnel only. All access attempts are logged.
        </div>
      </div>
    </main>
  );
}
