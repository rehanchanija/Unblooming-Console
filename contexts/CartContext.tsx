'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface CartItem {
  productId: string;
  title: string;
  price: string;
  quantity: number;
  imageUrl: string;
  color: string;
}

interface CartContextType {
  cart: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  addToCart: (item: CartItem) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  cartCount: number;
  cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    // Initialize session ID
    let storedUserId = localStorage.getItem('unbloom_cart_session');
    if (!storedUserId) {
      storedUserId = 'guest_' + Math.random().toString(36).substring(2, 15);
      localStorage.setItem('unbloom_cart_session', storedUserId);
    }
    setUserId(storedUserId);
    
    // Fetch initial cart
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
      fetchCart(userId); // Revert on failure
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

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  
  // Calculate total: parse price strings (removing non-numeric except dot)
  const cartTotal = cart.reduce((total, item) => {
    const numericPrice = parseFloat(item.price.toString().replace(/[^0-9.]/g, '')) || 0;
    return total + (numericPrice * item.quantity);
  }, 0);

  return (
    <CartContext.Provider value={{
      cart,
      isCartOpen,
      setIsCartOpen,
      addToCart,
      removeFromCart,
      clearCart,
      cartCount,
      cartTotal
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

