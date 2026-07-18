'use client';
import { useState, useEffect } from 'react';
import { adminApi } from '../../../../lib/adminApi';

export default function AdminProducts() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await adminApi.get('/products');
      setProducts(data);
    } catch (error) {
      console.error('Failed to fetch products', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      try {
        await adminApi.delete(`/products/${id}`);
        fetchProducts(); // Refresh list
      } catch (error) {
        console.error('Failed to delete product', error);
      }
    }
  };

  if (loading) return <div className="p-8">Loading products...</div>;

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <h1 className="text-3xl font-black text-gray-900 tracking-tight">Manage Collection</h1>
        <button className="bg-gray-900 hover:bg-orange-500 text-white font-bold px-6 py-2.5 rounded-xl transition-colors w-full md:w-auto shadow-lg shadow-gray-900/20">
          + Add New Product
        </button>
      </div>
      
      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {products.map((product) => (
          <div key={product._id || product.id} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col space-y-3">
            <div className="flex justify-between items-start">
              <h3 className="font-bold text-gray-900 text-lg leading-tight">{product.title || product.name}</h3>
              <span className="font-black text-orange-500">{product.price}</span>
            </div>
            <div className="flex flex-col space-y-1 text-sm text-gray-500">
              <p><span className="font-semibold text-gray-700">Category:</span> {product.category}</p>
              <p><span className="font-semibold text-gray-700">Color:</span> {product.color}</p>
            </div>
            <div className="pt-3 border-t border-gray-50 flex justify-end space-x-4">
              <button className="text-blue-500 hover:text-blue-700 font-bold text-sm">Edit</button>
              <button onClick={() => handleDelete(product._id || product.id)} className="text-red-500 hover:text-red-700 font-bold text-sm">Delete</button>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
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
              <tr key={product._id || product.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-medium text-gray-900">{product.title || product.name}</td>
                <td className="px-6 py-4 text-gray-500">{product.category}</td>
                <td className="px-6 py-4 text-gray-500">{product.color}</td>
                <td className="px-6 py-4 font-bold text-gray-900">{product.price}</td>
                <td className="px-6 py-4 text-right space-x-3">
                  <button className="text-blue-500 hover:text-blue-700 font-medium">Edit</button>
                  <button onClick={() => handleDelete(product._id || product.id)} className="text-red-500 hover:text-red-700 font-medium">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
