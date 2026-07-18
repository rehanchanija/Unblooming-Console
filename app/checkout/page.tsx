'use client';
import { useCart } from '@/lib/CartContext';
import { useAuth } from '@/lib/AuthContext';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useCart();
  const { user, addOrder } = useAuth();
  const router = useRouter();
  
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
    paymentMethod: 'UPI'
  });

  useEffect(() => {
    if (user) {
      setFormData(prev => ({ ...prev, name: user.name }));
    }
  }, [user]);

  if (cart.length === 0) {
    router.push('/cart');
    return null;
  }

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handlePlaceOrder = () => {
    const newOrder = {
      id: `ORD-${Math.floor(Math.random() * 1000000)}`,
      date: new Date().toISOString().split('T')[0],
      items: [...cart],
      total: cartTotal,
      status: 'Processing',
      paymentMethod: formData.paymentMethod
    };
    
    addOrder(newOrder);
    clearCart();
    
    // Redirect to success or orders page
    if (user) {
      router.push('/orders');
    } else {
      alert(`Order placed successfully! Order ID: ${newOrder.id}. Create an account to track it.`);
      router.push('/');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 py-12 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* Left Side: Forms */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Step 1: Address */}
          <div className={`bg-white rounded-2xl border ${step === 1 ? 'border-orange-500' : 'border-gray-200'} p-6 transition-all`}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">1. Delivery Address</h2>
              {step === 2 && (
                <button onClick={() => setStep(1)} className="text-orange-500 text-sm font-medium">Edit</button>
              )}
            </div>
            
            {step === 1 ? (
              <form onSubmit={handleNext} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-500 mb-1">Full Name</label>
                    <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-gray-100 border border-gray-200 rounded-lg p-3 text-gray-900 focus:border-orange-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-500 mb-1">Phone Number</label>
                    <input required type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full bg-gray-100 border border-gray-200 rounded-lg p-3 text-gray-900 focus:border-orange-500 outline-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-500 mb-1">Street Address</label>
                  <textarea required value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} className="w-full bg-gray-100 border border-gray-200 rounded-lg p-3 text-gray-900 focus:border-orange-500 outline-none" rows={3}></textarea>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-500 mb-1">City</label>
                    <input required type="text" value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} className="w-full bg-gray-100 border border-gray-200 rounded-lg p-3 text-gray-900 focus:border-orange-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-500 mb-1">PIN Code</label>
                    <input required type="text" value={formData.pincode} onChange={e => setFormData({...formData, pincode: e.target.value})} className="w-full bg-gray-100 border border-gray-200 rounded-lg p-3 text-gray-900 focus:border-orange-500 outline-none" />
                  </div>
                </div>
                <button type="submit" className="w-full bg-orange-600 hover:bg-orange-500 text-gray-900 font-bold py-3 rounded-lg transition-colors mt-4">
                  Continue to Payment
                </button>
              </form>
            ) : (
              <div className="text-gray-500">
                <p>{formData.name}, {formData.phone}</p>
                <p>{formData.address}</p>
                <p>{formData.city} - {formData.pincode}</p>
              </div>
            )}
          </div>

          {/* Step 2: Payment */}
          <div className={`bg-white rounded-2xl border ${step === 2 ? 'border-orange-500' : 'border-gray-200'} p-6 transition-all opacity-${step === 2 ? '100' : '50'} shadow-sm`}>
            <h2 className="text-2xl font-bold mb-6 text-gray-900">2. Payment Method</h2>
            {step === 2 && (
              <div className="space-y-4">
                <label className="flex items-center space-x-3 p-4 bg-gray-50 border border-orange-500 rounded-lg cursor-pointer transition-colors shadow-sm">
                  <input type="radio" name="payment" value="COD" checked={true} readOnly className="text-orange-500 focus:ring-orange-500 h-5 w-5 bg-transparent border-gray-300" />
                  <span className="font-bold text-gray-900">Cash on Delivery (COD)</span>
                </label>
                <p className="text-sm text-gray-500 mt-2 px-1">You will pay in cash or via UPI when the product is delivered to your doorstep.</p>

                <button 
                  onClick={handlePlaceOrder}
                  className="w-full bg-orange-600 hover:bg-orange-500 text-white font-bold py-4 rounded-xl shadow-[0_0_20px_rgba(234,88,12,0.3)] mt-6 text-xl transition-transform hover:-translate-y-1">
                  Place Order — ₹{cartTotal}
                </button>
              </div>
            )}
          </div>

        </div>

        {/* Right Side: Order Summary */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 h-fit sticky top-24">
          <h3 className="text-xl font-bold mb-6 border-b border-gray-200 pb-4">Order Summary</h3>
          <div className="space-y-4 mb-6">
            {cart.map(item => (
              <div key={item.id} className="flex justify-between items-center text-sm">
                <div className="flex items-center space-x-3">
                  <div className="relative w-12 h-12 bg-gray-100 rounded">
                    <Image src={item.image} alt={item.name} fill className="object-contain p-1" />
                  </div>
                  <span className="text-gray-600">{item.name} <span className="text-gray-500">x{item.quantity}</span></span>
                </div>
                <span className="font-medium">₹{item.price * item.quantity}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-200 pt-4 space-y-2">
            <div className="flex justify-between text-gray-500 text-sm">
              <span>Subtotal</span>
              <span>₹{cartTotal}</span>
            </div>
            <div className="flex justify-between text-gray-500 text-sm">
              <span>Shipping</span>
              <span className="text-green-400 font-medium">Free</span>
            </div>
            <div className="flex justify-between text-xl font-bold text-gray-900 pt-4 mt-2 border-t border-gray-200">
              <span>Total</span>
              <span>₹{cartTotal}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
