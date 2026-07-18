'use client';
import { MOCK_PRODUCTS } from '@/lib/data';
import { useCart } from '@/lib/CartContext';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useState, use } from 'react';

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = use(params);
  const product = MOCK_PRODUCTS.find(p => p.id === unwrappedParams.id);
  const { addToCart } = useCart();
  const router = useRouter();
  const [activeImage, setActiveImage] = useState(0);

  if (!product) {
    return (
      <div className="min-h-screen pt-32 text-center bg-gray-50 flex flex-col items-center">
        <h1 className="text-3xl font-black text-gray-900">Product Not Found</h1>
        <Link href="/#products" className="text-orange-500 mt-4 inline-block font-bold">Return to Store</Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
    router.push('/cart');
  };

  return (
    <main className="min-h-screen bg-gray-50 pt-24 pb-20">
      <div className="max-w-5xl mx-auto px-6">
        {/* Breadcrumb */}
        <div className="text-sm font-bold text-gray-400 mb-8">
          <Link href="/" className="hover:text-gray-900">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/#products" className="hover:text-gray-900">Products</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left: Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-white rounded-[32px] overflow-hidden border border-gray-100 shadow-sm">
              <Image 
                src={product.gallery[activeImage]} 
                alt={product.name} 
                fill 
                className="object-contain p-8"
              />
            </div>
            {product.gallery.length > 1 && (
              <div className="flex space-x-4 overflow-x-auto py-2">
                {product.gallery.map((img, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`relative w-24 h-24 flex-shrink-0 bg-white rounded-2xl overflow-hidden border-2 transition-colors ${activeImage === idx ? 'border-orange-500' : 'border-transparent opacity-70 hover:opacity-100'}`}
                  >
                    <Image src={img} alt={`Thumbnail ${idx}`} fill className="object-contain p-2" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Details */}
          <div className="flex flex-col justify-center space-y-8">
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <span className="text-yellow-400 text-lg">★★★★★</span>
                <span className="text-sm font-black text-gray-400">{product.rating} / 5</span>
                <span className="text-gray-300">|</span>
                <a href="#reviews" className="text-sm font-bold text-orange-600 hover:underline">{product.reviews.length} Reviews</a>
              </div>
              <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-4">{product.name}</h1>
              <p className="text-3xl font-black text-gray-900">₹{product.price}</p>
            </div>

            <p className="text-lg text-gray-500 leading-relaxed font-medium">
              {product.description}
            </p>

            <div className="pt-6 border-t border-gray-200">
              <div className="fixed bottom-0 left-0 w-full p-4 bg-white/90 backdrop-blur-md border-t border-gray-200 z-40 md:relative md:p-0 md:bg-transparent md:border-0 md:backdrop-blur-none">
                <button 
                  onClick={handleAddToCart}
                  className="w-full bg-orange-600 hover:bg-orange-500 text-white text-xl font-bold py-5 rounded-2xl shadow-xl transition-transform hover:-translate-y-1 flex items-center justify-center space-x-3"
                >
                  <span>Add to Cart</span>
                  <span>🛒</span>
                </button>
              </div>
              <div className="mt-8 grid grid-cols-4 gap-2 border-t border-gray-100 pt-6">
                <div className="flex flex-col items-center text-center space-y-2">
                  <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center text-orange-500 text-xl">🔄</div>
                  <span className="text-[11px] font-bold text-teal-700 leading-tight">7 Days<br/>Replacement</span>
                </div>
                <div className="flex flex-col items-center text-center space-y-2">
                  <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center text-orange-500 text-xl">🚚</div>
                  <span className="text-[11px] font-bold text-teal-700 leading-tight">Free<br/>Delivery</span>
                </div>
                <div className="flex flex-col items-center text-center space-y-2">
                  <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center text-orange-500 text-xl">🛡️</div>
                  <span className="text-[11px] font-bold text-teal-700 leading-tight">1 Year<br/>Warranty</span>
                </div>
                <div className="flex flex-col items-center text-center space-y-2">
                  <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center text-orange-500 text-xl">❌</div>
                  <span className="text-[11px] font-bold text-teal-700 leading-tight">Anytime<br/>Cancel</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Specs & Reviews Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-20">
          {/* Specifications */}
          <div className="bg-white rounded-[32px] p-8 md:p-10 border border-gray-100 shadow-sm">
            <h2 className="text-2xl font-black text-gray-900 mb-6">Technical Specifications</h2>
            <ul className="space-y-4">
              {Object.entries(product.specs).map(([key, value]) => (
                <li key={key} className="flex flex-col sm:flex-row sm:justify-between py-3 border-b border-gray-50 last:border-0">
                  <span className="text-gray-500 font-bold mb-1 sm:mb-0">{key}</span>
                  <strong className="text-gray-900 text-right">{value as string}</strong>
                </li>
              ))}
            </ul>
          </div>

          {/* Reviews */}
          <div className="bg-white rounded-[32px] p-8 md:p-10 border border-gray-100 shadow-sm" id="reviews">
            <h2 className="text-2xl font-black text-gray-900 mb-6">Customer Reviews</h2>
            <div className="space-y-6">
              {product.reviews.map((review, idx) => (
                <div key={idx} className="pb-6 border-b border-gray-50 last:border-0 last:pb-0">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="flex text-yellow-400 text-sm">
                      {Array.from({length: review.rating}).map((_, i) => (
                        <span key={i}>★</span>
                      ))}
                    </div>
                    <span className="font-bold text-gray-900">{review.user}</span>
                    <span className="text-xs text-green-700 font-bold bg-green-100 px-2 py-0.5 rounded">Verified</span>
                  </div>
                  <p className="text-gray-500 font-medium">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
