'use client';

import React from 'react';
import { useCart } from '../lib/CartContext';
import Link from 'next/link';

export default function CartDrawer() {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, cartTotal } = useCart();

  if (!isCartOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100]"
        onClick={() => setIsCartOpen(false)}
      />
      <div className="fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white shadow-2xl z-[101] flex flex-col transform transition-transform duration-300">
        <div className="p-6 flex items-center justify-between border-b border-gray-100">
          <h2 className="text-2xl font-black tracking-tight text-gray-900">Your Cart</h2>
          <button 
            onClick={() => setIsCartOpen(false)}
            className="p-2 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-4">
              <span className="text-6xl">🛍️</span>
              <p className="font-bold text-lg">Your cart is empty</p>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.productId} className="flex gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <div className="w-20 h-20 bg-white rounded-xl flex items-center justify-center overflow-hidden flex-shrink-0 shadow-sm border border-gray-50">
                  <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-gray-900 leading-tight">{item.title}</h3>
                    <p className="text-sm text-gray-500 font-medium mt-1">Color: {item.color}</p>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <p className="font-black text-orange-500">{item.price} × {item.quantity}</p>
                    <button 
                      onClick={() => removeFromCart(item.productId)}
                      className="text-gray-400 hover:text-red-500 transition-colors text-sm font-bold bg-white px-2 py-1 rounded-lg border border-gray-100 hover:border-red-100"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-6 bg-white border-t border-gray-100 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.05)]">
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-500 font-bold">Subtotal</span>
            <span className="text-2xl font-black text-gray-900">₹{cartTotal.toLocaleString()}</span>
          </div>
          <button 
            disabled={cart.length === 0}
            className="w-full bg-orange-500 text-white font-black py-4 rounded-2xl shadow-xl shadow-orange-500/20 hover:bg-gray-900 hover:shadow-gray-900/20 transition-all disabled:opacity-50 disabled:hover:bg-orange-500 disabled:cursor-not-allowed"
          >
            Proceed to Checkout
          </button>
          <div className="mt-4 text-center">
            <button 
              onClick={() => setIsCartOpen(false)}
              className="text-sm font-bold text-gray-400 hover:text-gray-900 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
