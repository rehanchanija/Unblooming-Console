'use client';
import { useState } from 'react';
import { useCart } from '@/lib/CartContext';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const { cartTotal, clearCart } = useCart();
  const router = useRouter();
  
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    pincode: '',
    paymentMethod: 'COD'
  });

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handlePlaceOrder = () => {
    setStep(3);
    clearCart();
  };

  if (step === 3) {
    return (
      <div className="min-h-screen pt-32 px-4 text-center bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-12 rounded-[40px] shadow-xl max-w-lg mx-auto">
          <div className="text-6xl mb-6">🎉</div>
          <h1 className="text-3xl font-black text-gray-900 mb-4">Order Confirmed!</h1>
          <p className="text-gray-500 font-medium mb-8">
            Thank you, {formData.name.split(' ')[0]}! Your order has been placed successfully and will be delivered in 2-3 business days.
          </p>
          <button 
            onClick={() => router.push('/')}
            className="w-full bg-orange-600 hover:bg-orange-500 text-white font-bold py-4 rounded-xl shadow-lg transition-transform hover:-translate-y-1">
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 pt-32 pb-20 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-black text-gray-900 mb-8 text-center">Secure Checkout</h1>
        
        <div className="space-y-6">
          {/* Step 1: Address */}
          <div className={`bg-white rounded-[32px] border ${step === 1 ? 'border-orange-500 shadow-md' : 'border-gray-200'} p-8 transition-all`}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-black text-gray-900">1. Delivery Address</h2>
              {step === 2 && (
                <button onClick={() => setStep(1)} className="text-orange-500 font-bold hover:underline">Edit</button>
              )}
            </div>
            
            {step === 1 && (
              <form onSubmit={handleNextStep} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-500 mb-1">Full Name</label>
                    <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-500 mb-1">Email</label>
                    <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-500 mb-1">Full Address</label>
                  <textarea required value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none" rows={3}></textarea>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-500 mb-1">City</label>
                    <input required type="text" value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-500 mb-1">PIN Code</label>
                    <input required type="text" value={formData.pincode} onChange={e => setFormData({...formData, pincode: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none" />
                  </div>
                </div>
                <button type="submit" className="w-full bg-gray-900 hover:bg-orange-500 text-white font-bold py-4 rounded-xl shadow-md transition-colors mt-4">
                  Continue to Payment
                </button>
              </form>
            )}
            {step === 2 && (
              <div className="text-gray-600 font-medium">
                <p>{formData.name}</p>
                <p>{formData.address}, {formData.city} - {formData.pincode}</p>
              </div>
            )}
          </div>

          {/* Step 2: Payment */}
          <div className={`bg-white rounded-[32px] border ${step === 2 ? 'border-orange-500 shadow-md' : 'border-gray-200'} p-8 transition-all opacity-${step === 2 ? '100' : '50'}`}>
            <h2 className="text-2xl font-black text-gray-900 mb-6">2. Payment Method</h2>
            {step === 2 && (
              <div className="space-y-4">
                <label className="flex items-center space-x-3 p-4 bg-orange-50 border border-orange-200 rounded-xl cursor-pointer">
                  <input type="radio" name="payment" value="COD" checked={true} readOnly className="text-orange-500 focus:ring-orange-500 h-5 w-5 bg-transparent border-gray-300" />
                  <span className="font-bold text-orange-900">Cash on Delivery (COD)</span>
                </label>
                <p className="text-sm text-gray-500 mt-2 px-1 font-medium">You will pay in cash or via UPI when the product is delivered to your doorstep.</p>

                <button 
                  onClick={handlePlaceOrder}
                  className="w-full bg-orange-600 hover:bg-orange-500 text-white font-bold py-4 rounded-xl shadow-[0_0_20px_rgba(234,88,12,0.3)] mt-6 text-xl transition-transform hover:-translate-y-1">
                  Place Order — ₹{cartTotal}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
