'use client';

import { useState, useEffect, use } from 'react';
import { adminApi } from '../../../../../lib/adminApi';
import Link from 'next/link';

export default function AdminProductDetail({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = use(params);
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProduct();
  }, [unwrappedParams.id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const data = await adminApi.get(`/products/${unwrappedParams.id}`);
      setProduct(data);
    } catch (error) {
      console.error('Failed to fetch product details', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-8">Loading product details...</div>;
  }

  if (!product) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
        <Link href="/admin/products" className="text-orange-500 hover:underline">Back to Products</Link>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/admin/products" className="text-gray-500 hover:text-gray-900 flex items-center space-x-1 font-medium transition-colors">
            <span>← Back to Products</span>
          </Link>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Product Details</h1>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Image */}
          <div className="w-full md:w-1/3">
            <div className="bg-gray-50 rounded-2xl aspect-square flex items-center justify-center p-4 border border-gray-100">
              {product.imageUrl ? (
                <img src={product.imageUrl} alt={product.title || product.name} className="max-w-full max-h-full object-contain mix-blend-multiply" />
              ) : (
                <span className="text-gray-400 font-medium">No Image Available</span>
              )}
            </div>
          </div>

          {/* Details */}
          <div className="w-full md:w-2/3 space-y-6">
            <div>
              <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Title</h2>
              <p className="text-3xl font-black text-gray-900">{product.title || product.name}</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-4 border-t border-gray-100">
              <div>
                <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Price</h2>
                <p className="text-xl font-bold text-orange-500">{product.price}</p>
              </div>
              <div>
                <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Stock</h2>
                <p className="text-xl font-bold text-gray-900">{product.stock ?? 0}</p>
              </div>
              <div>
                <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Category</h2>
                <p className="text-lg font-medium text-gray-900">{product.category}</p>
              </div>
              <div>
                <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Color</h2>
                <p className="text-lg font-medium text-gray-900">{product.color}</p>
              </div>
            </div>

            <div>
              <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Description / Details</h2>
              <p className="text-gray-600 font-medium whitespace-pre-wrap bg-gray-50 p-4 rounded-xl border border-gray-100 min-h-[100px]">
                {product.details || product.description || 'No description provided.'}
              </p>
            </div>
          </div>
        </div>

        {/* Specifications */}
        <div className="mt-12 pt-8 border-t border-gray-100">
          <h2 className="text-2xl font-black text-gray-900 mb-6">Technical Specifications</h2>
          
          {(!product.technicalSpecifications || Object.keys(product.technicalSpecifications).length === 0) ? (
            <p className="text-gray-500 font-medium bg-gray-50 p-4 rounded-xl text-center">No technical specifications provided for this product.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(product.technicalSpecifications).map(([key, value]) => (
                <div key={key} className="flex flex-col bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">{key}</span>
                  <span className="text-gray-900 font-medium">{value as string}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
