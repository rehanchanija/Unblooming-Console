'use client';
import { useAuth } from '@/lib/AuthContext';
import Image from 'next/image';
import Link from 'next/link';

export default function OrdersPage() {
  const { user, orders } = useAuth();

  if (!user) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center bg-gray-50 text-gray-900">
        <h1 className="text-3xl font-bold mb-4">Please Log In</h1>
        <p className="text-gray-500 mb-8">You need to be logged in to view your order history.</p>
        <Link href="/login" className="bg-orange-600 hover:bg-orange-500 text-gray-900 px-8 py-3 rounded-xl font-bold transition-colors">
          Log In
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">My Orders</h1>

        {orders.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center">
            <div className="text-5xl mb-4">📦</div>
            <h2 className="text-xl font-bold mb-2">No orders found</h2>
            <p className="text-gray-500 mb-6">Looks like you haven't placed any orders yet.</p>
            <Link href="/#products" className="text-orange-500 hover:text-orange-400 font-medium">
              Start Shopping →
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map(order => (
              <div key={order.id} className="bg-white border border-gray-200 rounded-2xl p-6">
                <div className="flex flex-wrap justify-between items-center mb-6 pb-4 border-b border-gray-100 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Order ID</p>
                    <p className="font-mono font-medium">{order.id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Date</p>
                    <p className="font-medium">{order.date}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total</p>
                    <p className="font-bold text-orange-500">₹{order.total}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <span className="inline-block px-3 py-1 bg-green-500/20 text-green-400 text-xs font-bold rounded-full">
                      {order.status}
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  {order.items.map((item: any, idx: number) => (
                    <div key={idx} className="flex items-center space-x-4">
                      <div className="relative w-16 h-16 bg-gray-100 rounded-lg border border-gray-100">
                        <Image src={item.image} alt={item.name} fill className="object-contain p-2" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">{item.name}</h4>
                        <p className="text-sm text-gray-500">Qty: {item.quantity} × ₹{item.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
