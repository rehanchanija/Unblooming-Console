'use client';
import { useAuth } from '@/lib/AuthContext';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock register logic
    if (name && email && password) {
      login(email, name);
      router.push('/');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">Create Account</h1>
        <p className="text-gray-500 text-center mb-8">Join us for faster checkout and tracking</p>

        <form onSubmit={handleRegister} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Full Name</label>
            <input 
              type="text" 
              required 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-gray-100 border border-gray-200 rounded-xl p-3.5 text-gray-900 focus:border-orange-500 outline-none transition-colors"
              placeholder="John Doe"
            />
          </div>
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
            Create Account
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-gray-500">
          Already have an account?{' '}
          <Link href="/login" className="text-orange-500 hover:text-orange-400 font-medium">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
