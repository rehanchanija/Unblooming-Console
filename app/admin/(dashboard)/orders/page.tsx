'use client';
import { useState, useEffect } from 'react';
import { adminApi } from '../../../../lib/adminApi';

export default function AdminOrders() {
  const [searchQuery, setSearchQuery] = useState('');
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const data = await adminApi.get('/orders');
      setOrders(data);
    } catch (error) {
      console.error('Failed to fetch orders', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id: string, newStatus: string) => {
    if (confirm(`Change status to ${newStatus}?`)) {
      try {
        await adminApi.patch(`/orders/${id}`, { status: newStatus });
        fetchOrders();
      } catch (error) {
        console.error('Failed to update status', error);
      }
    }
  };

  const filteredOrders = orders.filter(order => {
    const q = searchQuery.toLowerCase();
    const orderIdStr = String(order._id || order.id || '');
    const customerStr = String(order.customer || '');
    const productStr = String(order.productName || '');
    return (
      orderIdStr.toLowerCase().includes(q) ||
      customerStr.toLowerCase().includes(q) ||
      productStr.toLowerCase().includes(q)
    );
  });

  if (loading) return <div className="p-8">Loading orders...</div>;

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
          <div key={order._id || order.id} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-gray-900 text-lg leading-tight">{order._id || order.id}</h3>
                <p className="font-medium text-gray-700 text-sm mt-1">{order.customer}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                order.status === 'Placed' ? 'bg-yellow-100 text-yellow-700' :
                order.status === 'Shipped' ? 'bg-blue-100 text-blue-700' :
                order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                'bg-red-100 text-red-700'
              }`}>
                {order.status || 'Placed'}
              </span>
            </div>
            <div className="flex flex-col space-y-2 text-sm text-gray-500">
              {order.items && order.items.length > 0 ? (
                <div className="space-y-1">
                  <span className="font-semibold text-gray-700 block">Products:</span>
                  {order.items.map((item: any, idx: number) => (
                    <div key={idx} className="flex justify-between items-center bg-gray-50 p-2 rounded-lg">
                      <div className="flex items-center space-x-2">
                        {item.imageUrl && <img src={item.imageUrl} alt={item.title} className="w-8 h-8 object-contain rounded" />}
                        <div>
                          <p className="text-gray-900 font-medium">{item.title} {item.color && `(${item.color})`}</p>
                          <p className="text-xs">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <span className="font-bold text-gray-900">₹{item.price}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p><span className="font-semibold text-gray-700">Product:</span> {order.productName}</p>
              )}
              {order.address && (
                <p><span className="font-semibold text-gray-700 block">Shipping Address:</span> <span className="text-gray-600">{order.address}</span></p>
              )}
              <div className="flex justify-between border-t border-gray-100 pt-2 mt-2">
                <span className="font-semibold text-gray-700">Date:</span> 
                <span>{new Date(order.date || order.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-gray-700">Total:</span> 
                <span className="text-gray-900 font-bold">{order.total}</span>
              </div>
            </div>
            <div className="pt-3 border-t border-gray-50 flex justify-end">
              <select 
                value={order.status || 'Placed'} 
                onChange={(e) => handleStatusUpdate(order._id || order.id, e.target.value)}
                className="bg-white border border-gray-200 rounded-lg text-sm px-2 py-1 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 cursor-pointer"
              >
                <option value="Placed">Placed</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        ))}
        {filteredOrders.length === 0 && (
          <div className="text-center py-8 text-gray-500">No orders found.</div>
        )}
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden overflow-x-auto w-full">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 font-bold text-gray-700 text-sm whitespace-nowrap">Date</th>
              <th className="px-6 py-4 font-bold text-gray-700 text-sm min-w-[200px]">Product Name</th>
              <th className="px-6 py-4 font-bold text-gray-700 text-sm whitespace-nowrap">Customer Name</th>
              <th className="px-6 py-4 font-bold text-gray-700 text-sm whitespace-nowrap">Email & Phone</th>
              <th className="px-6 py-4 font-bold text-gray-700 text-sm whitespace-nowrap">Amount</th>
              <th className="px-6 py-4 font-bold text-gray-700 text-sm whitespace-nowrap">Status</th>
              <th className="px-6 py-4 font-bold text-gray-700 text-sm text-right whitespace-nowrap">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredOrders.map((order) => (
              <tr key={order._id || order.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-gray-500 whitespace-nowrap">{new Date(order.date || order.createdAt).toLocaleDateString()}</td>
                <td className="px-6 py-4 font-medium text-gray-900">
                  {order.items && order.items.length > 0 
                    ? order.items.map((i: any) => `${i.quantity}x ${i.title}`).join(', ') 
                    : order.productName}
                </td>
                <td className="px-6 py-4 font-medium text-gray-700 whitespace-nowrap">{order.customer}</td>
                <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
                  <div>{order.email || 'No email'}</div>
                  <div className="text-sm text-gray-400">{order.phone || 'No phone'}</div>
                </td>
                <td className="px-6 py-4 font-bold text-gray-900 whitespace-nowrap">₹{order.total}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    order.status === 'Placed' ? 'bg-yellow-100 text-yellow-700' :
                    order.status === 'Shipped' ? 'bg-blue-100 text-blue-700' :
                    order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {order.status || 'Placed'}
                  </span>
                </td>
                <td className="px-6 py-4 text-right whitespace-nowrap">
                  <select 
                    value={order.status || 'Placed'} 
                    onChange={(e) => handleStatusUpdate(order._id || order.id, e.target.value)}
                    className="bg-white border border-gray-200 rounded-lg text-sm px-2 py-1 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 cursor-pointer"
                  >
                    <option value="Placed">Placed</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

