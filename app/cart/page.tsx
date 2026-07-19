'use client';
import { useCart } from '@/lib/CartContext';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function CartPage() {
  const { cart: items, removeFromCart, cartTotal, itemCount } = useCart();
  const router = useRouter();

  if (itemCount === 0) {
    return (
      <div className="min-h-screen pt-32 px-4 text-center bg-gray-50 flex flex-col items-center">
        <div className="text-6xl mb-6">🛒</div>
        <h1 className="text-3xl font-black text-gray-900 mb-4">Your Cart is Empty</h1>
        <p className="text-gray-500 mb-8">Looks like you haven't added anything yet.</p>
        <Link href="/#products" className="inline-block bg-gray-900 hover:bg-orange-500 text-white font-bold px-8 py-4 rounded-full transition-colors">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 pt-32 pb-20 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-black text-gray-900 mb-8">Shopping Cart ({itemCount})</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {items.map((item) => {
              const numericPrice = parseFloat(item.price.toString().replace(/[^0-9.]/g, '')) || 0;
              return (
              <div key={item.productId} className="flex flex-col sm:flex-row items-center sm:items-start bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm relative">
                <div className="relative w-32 h-32 bg-[#0a0a0a] rounded-2xl overflow-hidden flex-shrink-0 mb-4 sm:mb-0">
                  <Image src={item.imageUrl || '/placeholder.png'} alt={item.title || 'Product Image'} fill className="object-contain p-2" />
                </div>
                
                <div className="sm:ml-6 flex-grow text-center sm:text-left w-full">
                  <h3 className="font-bold text-xl text-gray-900 mb-2">{item.title}</h3>
                  <div className="flex justify-between items-center mt-4 sm:mt-8">
                    <span className="font-medium text-gray-500">Qty: {item.quantity}</span>
                    <span className="font-black text-2xl text-gray-900">₹{numericPrice * item.quantity}</span>
                  </div>
                </div>
                
                <button 
                  onClick={() => removeFromCart(item.productId)}
                  className="absolute top-6 right-6 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                </button>
              </div>
            );
            })}
          </div>

          {/* Order Summary */}
          <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm h-fit">
            <h2 className="text-2xl font-black text-gray-900 mb-6 border-b border-gray-100 pb-4">Order Summary</h2>
            <div className="space-y-4 mb-6 text-gray-600 font-medium">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-gray-900 font-bold">₹{cartTotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-green-600 font-bold">Free</span>
              </div>
              <div className="flex justify-between pt-4 border-t border-gray-100 text-lg">
                <span className="text-gray-900 font-black">Total</span>
                <span className="text-gray-900 font-black">₹{cartTotal}</span>
              </div>
            </div>
            <button 
              onClick={() => router.push('/checkout')}
              className="w-full bg-orange-600 hover:bg-orange-500 text-white font-bold py-4 rounded-xl shadow-lg transition-transform hover:-translate-y-1">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

