'use client';
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer/Footer';
import { useAuth } from '@/lib/AuthContext';

export default function OrdersPage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, we'd fetch from an API like `/orders/user/:id`
    // For now, we will fetch all orders and filter by user email or name
    // since the current backend schema just has `customer` (string)
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/orders`);
        const data = await res.json();
        
        // Filter by user if logged in
        if (user) {
          const userOrders = data.filter((order: any) => 
            order.customer === user.email || order.customer === user.name
          );
          setOrders(userOrders);
        } else {
          setOrders([]);
        }
      } catch (error) {
        console.error('Failed to fetch orders', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchOrders();
    } else {
      setLoading(false);
    }
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <div className="flex-1 pt-32 pb-16 px-6 flex items-center justify-center">
          <p className="text-gray-500 font-bold text-center">
            Please <a href="/login" className="text-orange-500 hover:underline">login</a> to view your orders.
          </p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-32 pb-16 px-6 w-full max-w-5xl mx-auto flex flex-col">
        <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-8">My Orders</h1>
        
        {loading ? (
          <div className="p-8 text-center text-gray-500 font-bold">Loading your orders...</div>
        ) : orders.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 shadow-sm flex-1 flex flex-col items-center justify-center space-y-4">
            <div className="text-6xl mb-4">🛍️</div>
            <h2 className="text-2xl font-black text-gray-900">No orders yet</h2>
            <p className="text-gray-500 max-w-md mx-auto">You haven't placed any orders. When you do, they will appear here so you can track their status!</p>
            <a href="/#products" className="mt-6 inline-block px-8 py-3 bg-gray-900 text-white font-bold rounded-xl hover:bg-orange-500 transition-colors shadow-lg">Start Shopping</a>
          </div>
        ) : (
          <div className="space-y-6 flex-1">
            {orders.map((order) => (
              <div key={order._id || order.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
                
                <div className="space-y-2">
                  <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">Order ID: {order._id || order.id}</p>
                  <p className="text-lg font-bold text-gray-900">Total: <span className="text-orange-500 font-black">{order.total}</span></p>
                  <p className="text-sm text-gray-500">Placed on: {new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
                
                <div className="bg-gray-50 px-4 py-2 rounded-xl flex items-center space-x-2 border border-gray-100">
                  <span className="text-sm font-bold text-gray-500">Status:</span>
                  <span className={`text-sm font-black uppercase tracking-wider ${
                    order.status === 'Delivered' ? 'text-green-500' : 
                    order.status === 'Cancelled' ? 'text-red-500' : 'text-orange-500'
                  }`}>
                    {order.status || 'Pending'}
                  </span>
                </div>
                
              </div>
            ))}
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
}
