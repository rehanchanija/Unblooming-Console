'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type CartItem = {
  productId: string;
  title: string;
  price: string | number;
  quantity: number;
  imageUrl?: string;
  color?: string;
};

interface CartContextType {
  cart: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  addToCart: (item: CartItem) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  cartTotal: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    let storedUserId = localStorage.getItem('unbloom_cart_session');
    if (!storedUserId) {
      storedUserId = 'guest_' + Math.random().toString(36).substring(2, 15);
      localStorage.setItem('unbloom_cart_session', storedUserId);
    }
    setUserId(storedUserId);
    fetchCart(storedUserId);
  }, []);

  const getApiUrl = () => process.env.NEXT_PUBLIC_API_URL || 'https://unblooming-backend-two.vercel.app';

  const fetchCart = async (uid: string) => {
    try {
      const res = await fetch(`${getApiUrl()}/cart/${uid}`);
      if (res.ok) {
        const data = await res.json();
        setCart(data);
      }
    } catch (error) {
      console.error("Failed to fetch cart", error);
    }
  };

  const addToCart = async (item: CartItem) => {
    if (!userId) return;
    
    // Optimistic update
    const existing = cart.find(i => i.productId === item.productId);
    if (existing) {
      setCart(cart.map(i => i.productId === item.productId ? { ...i, quantity: i.quantity + item.quantity } : i));
    } else {
      setCart([...cart, item]);
    }
    setIsCartOpen(true);

    try {
      const res = await fetch(`${getApiUrl()}/cart/${userId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
      });
      if (res.ok) {
        const data = await res.json();
        setCart(data);
      }
    } catch (error) {
      console.error("Failed to add to cart", error);
      fetchCart(userId);
    }
  };

  const removeFromCart = async (productId: string) => {
    if (!userId) return;
    setCart(cart.filter(item => item.productId !== productId));
    try {
      const res = await fetch(`${getApiUrl()}/cart/${userId}/${productId}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        const data = await res.json();
        setCart(data);
      }
    } catch (error) {
      console.error("Failed to remove from cart", error);
      fetchCart(userId);
    }
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    if (!userId) return;
    if (quantity < 1) return;
    
    const existing = cart.find(i => i.productId === productId);
    if (!existing) return;
    
    const difference = quantity - existing.quantity;
    if (difference === 0) return;
    
    // Optimistic update
    setCart(cart.map(i => i.productId === productId ? { ...i, quantity } : i));

    try {
      const res = await fetch(`${getApiUrl()}/cart/${userId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...existing, quantity: difference })
      });
      if (res.ok) {
        const data = await res.json();
        setCart(data);
      }
    } catch (error) {
      console.error("Failed to update quantity", error);
      fetchCart(userId);
    }
  };

  const clearCart = async () => {
    if (!userId) return;
    setCart([]);
    try {
      await fetch(`${getApiUrl()}/cart/${userId}`, {
        method: 'DELETE'
      });
    } catch (error) {
      console.error("Failed to clear cart", error);
      fetchCart(userId);
    }
  };

  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
  
  const cartTotal = cart.reduce((total, item) => {
    const numericPrice = typeof item.price === 'string' ? parseFloat(item.price.replace(/[^0-9.]/g, '')) || 0 : item.price;
    return total + (numericPrice * item.quantity);
  }, 0);

  return (
    <CartContext.Provider value={{
      cart,
      isCartOpen,
      setIsCartOpen,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      itemCount,
      cartTotal
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

