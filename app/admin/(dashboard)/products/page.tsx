'use client';
import { useState } from 'react';

export default function AdminProducts() {
  const [products, setProducts] = useState([
    { id: 1, title: 'R36MAX Retro Console', category: 'Handheld', color: 'Transparent Purple', price: '₹4,499' },
  ]);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-black text-gray-900 tracking-tight">Manage Collection</h1>
        <button className="bg-gray-900 hover:bg-orange-500 text-white font-bold px-6 py-2.5 rounded-xl transition-colors">
          + Add New Product
        </button>
      </div>
      
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 font-bold text-gray-700 text-sm">Product Title</th>
              <th className="px-6 py-4 font-bold text-gray-700 text-sm">Category</th>
              <th className="px-6 py-4 font-bold text-gray-700 text-sm">Color</th>
              <th className="px-6 py-4 font-bold text-gray-700 text-sm">Price</th>
              <th className="px-6 py-4 font-bold text-gray-700 text-sm text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-medium text-gray-900">{product.title}</td>
                <td className="px-6 py-4 text-gray-500">{product.category}</td>
                <td className="px-6 py-4 text-gray-500">{product.color}</td>
                <td className="px-6 py-4 font-bold text-gray-900">{product.price}</td>
                <td className="px-6 py-4 text-right space-x-3">
                  <button className="text-blue-500 hover:text-blue-700 font-medium">Edit</button>
                  <button className="text-red-500 hover:text-red-700 font-medium">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
