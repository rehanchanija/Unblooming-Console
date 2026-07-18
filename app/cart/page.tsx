'use client';
import { useCart } from '@/lib/CartContext';
import Image from 'next/image';
import Link from 'next/link';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();

  if (cart.length === 0) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center bg-gray-50 text-gray-900">
        <div className="text-6xl mb-6">🛒</div>
        <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
        <p className="text-gray-500 mb-8">Looks like you haven't added anything to your cart yet.</p>
        <Link href="/#products" className="bg-orange-600 hover:bg-orange-500 text-gray-900 px-8 py-3 rounded-xl font-bold transition-colors">
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
        
        <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-8 space-y-6">
          {cart.map((item) => (
            <div key={item.id} className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-gray-100 last:border-0 last:pb-0">
              <div className="relative w-24 h-24 bg-gray-100 rounded-lg">
                <Image src={item.image} alt={item.name} fill className="object-contain p-2" />
              </div>
              
              <div className="flex-1 text-center sm:text-left">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.name}</h3>
                <p className="text-orange-500 font-bold">₹{item.price}</p>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center bg-gray-100 rounded-lg border border-gray-200">
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="px-3 py-1 hover:text-orange-500 transition-colors"
                  >-</button>
                  <span className="px-3 py-1 font-mono">{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="px-3 py-1 hover:text-orange-500 transition-colors"
                  >+</button>
                </div>
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-400 p-2"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <p className="text-gray-500">Total Amount</p>
            <p className="text-3xl font-bold text-gray-900">₹{cartTotal}</p>
          </div>
          <Link href="/checkout" className="w-full md:w-auto bg-gradient-to-r from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 text-gray-900 font-bold py-4 px-12 rounded-xl shadow-[0_0_20px_rgba(34,197,94,0.4)] text-center transition-transform hover:-translate-y-1">
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}
