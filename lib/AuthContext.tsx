'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type User = {
  id: string;
  name: string;
  email: string;
};

export type Order = {
  id: string;
  date: string;
  items: any[];
  total: number;
  status: string;
  paymentMethod: string;
};

interface AuthContextType {
  user: User | null;
  login: (email: string, name: string) => void;
  logout: () => void;
  orders: Order[];
  addOrder: (order: Order) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const savedUser = localStorage.getItem('mockUser');
    const savedOrders = localStorage.getItem('mockOrders');
    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedOrders) setOrders(JSON.parse(savedOrders));
  }, []);

  const login = (email: string, name: string) => {
    const newUser = { id: Date.now().toString(), email, name };
    setUser(newUser);
    localStorage.setItem('mockUser', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('mockUser');
  };

  const addOrder = (order: Order) => {
    const newOrders = [order, ...orders];
    setOrders(newOrders);
    localStorage.setItem('mockOrders', JSON.stringify(newOrders));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, orders, addOrder }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
