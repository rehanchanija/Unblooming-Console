'use client';
import { useAuth } from '@/lib/AuthContext';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login logic
    if (email && password) {
      const name = email.split('@')[0];
      login(email, name);
      router.push('/');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">Welcome Back</h1>
        <p className="text-gray-500 text-center mb-8">Log in to manage your orders</p>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Email Address</label>
            <input 
              type="email" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-100 border border-gray-200 rounded-xl p-3.5 text-gray-900 focus:border-orange-500 outline-none transition-colors"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Password</label>
            <input 
              type="password" 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-100 border border-gray-200 rounded-xl p-3.5 text-gray-900 focus:border-orange-500 outline-none transition-colors"
              placeholder="••••••••"
            />
          </div>
          <button type="submit" className="w-full bg-orange-600 hover:bg-orange-500 text-gray-900 font-bold py-3.5 rounded-xl transition-colors mt-2">
            Sign In
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-gray-500">
          Don't have an account?{' '}
          <Link href="/register" className="text-orange-500 hover:text-orange-400 font-medium">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
