'use client';
import { useState } from 'react';

export default function AdminOrders() {
  const [searchQuery, setSearchQuery] = useState('');
  const [orders, setOrders] = useState([
    { id: '#ORD-001', customer: 'John Doe', date: '2026-07-18', total: '₹4,499', status: 'Pending', productName: 'R36MAX Retro Console (Transparent Purple)' },
    { id: '#ORD-002', customer: 'Jane Smith', date: '2026-07-17', total: '₹8,998', status: 'Shipped', productName: 'R36MAX Retro Console (Black)' },
  ]);

  const filteredOrders = orders.filter(order => {
    const q = searchQuery.toLowerCase();
    return (
      order.id.toLowerCase().includes(q) ||
      order.customer.toLowerCase().includes(q) ||
      order.productName.toLowerCase().includes(q)
    );
  });

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <h1 className="text-3xl font-black text-gray-900 tracking-tight">Order History</h1>
        <div className="relative w-full md:w-96">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
          <input
            type="text"
            placeholder="Search by order ID, name, or product..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white shadow-sm text-gray-900"
          />
        </div>
      </div>
      
      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {filteredOrders.map((order) => (
          <div key={order.id} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-gray-900 text-lg leading-tight">{order.id}</h3>
                <p className="font-medium text-gray-700 text-sm mt-1">{order.customer}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                order.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                order.status === 'Shipped' ? 'bg-blue-100 text-blue-700' :
                order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                'bg-red-100 text-red-700'
              }`}>
                {order.status}
              </span>
            </div>
            <div className="flex flex-col space-y-1 text-sm text-gray-500">
              <p><span className="font-semibold text-gray-700">Product:</span> {order.productName}</p>
              <p><span className="font-semibold text-gray-700">Date:</span> {order.date}</p>
              <p><span className="font-semibold text-gray-700">Total:</span> <span className="text-gray-900 font-bold">{order.total}</span></p>
            </div>
            <div className="pt-3 border-t border-gray-50 flex justify-end">
              <button className="text-blue-500 hover:text-blue-700 font-bold text-sm">View & Update</button>
            </div>
          </div>
        ))}
        {filteredOrders.length === 0 && (
          <div className="text-center py-8 text-gray-500">No orders found.</div>
        )}
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 font-bold text-gray-700 text-sm">Order ID</th>
              <th className="px-6 py-4 font-bold text-gray-700 text-sm">Customer</th>
              <th className="px-6 py-4 font-bold text-gray-700 text-sm">Date</th>
              <th className="px-6 py-4 font-bold text-gray-700 text-sm">Total</th>
              <th className="px-6 py-4 font-bold text-gray-700 text-sm">Status</th>
              <th className="px-6 py-4 font-bold text-gray-700 text-sm text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredOrders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-bold text-gray-900">{order.id}</td>
                <td className="px-6 py-4 font-medium text-gray-700">{order.customer}</td>
                <td className="px-6 py-4 text-gray-500">{order.date}</td>
                <td className="px-6 py-4 font-bold text-gray-900">{order.total}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    order.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                    order.status === 'Shipped' ? 'bg-blue-100 text-blue-700' :
                    order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-blue-500 hover:text-blue-700 font-medium">View & Update</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
