'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/lib/CartContext';
import { MOCK_PRODUCTS } from '@/lib/data';

export default function ProductList() {
  const { addToCart } = useCart();
  const router = useRouter();

  const handleAddToCart = (e: React.MouseEvent, product: any) => {
    e.preventDefault(); // Prevent navigating to detail page if button is clicked
    e.stopPropagation();
    
    // add to cart and immediately redirect to cart page
    addToCart(product);
    router.push('/cart');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-20" id="products">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
        <div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight mb-2">Unblooming Store</h2>
          <p className="text-gray-500">Complete your retro setup with our premium accessories.</p>
        </div>
        <div className="hidden md:block">
          <button className="text-orange-600 font-bold hover:text-orange-500 transition-colors">View All →</button>
        </div>
      </div>
      
      {/* Mobile Slider Container */}
      <div className="-mx-4 px-4 pb-4 md:mx-0 md:px-0 md:pb-0 flex overflow-x-auto snap-x snap-mandatory hide-scrollbar md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {MOCK_PRODUCTS.map((product) => (
          <Link 
            href={`/product/${product.id}`} 
            key={product.id} 
            className="flex-none w-[80vw] sm:w-[300px] md:w-auto snap-center bg-white rounded-2xl border border-gray-200 overflow-hidden hover:border-gray-300 transition-all hover:shadow-lg flex flex-col group cursor-pointer"
          >
            <div className="relative aspect-square bg-[#0a0a0a] overflow-hidden">
              <Image 
                src={product.image} 
                alt={product.name} 
                fill 
                className="object-contain p-6 group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-5 flex flex-col flex-grow">
              <div className="flex items-center space-x-1 mb-2">
                <span className="text-yellow-400 text-sm">★</span>
                <span className="text-sm font-semibold text-gray-600">{product.rating}</span>
              </div>
              <h3 className="font-bold text-lg text-gray-900 mb-1">{product.name}</h3>
              <p className="text-xl font-black text-gray-900 mb-5">₹{product.price}</p>
              
              <button 
                onClick={(e) => handleAddToCart(e, product)}
                className="mt-auto w-full bg-gray-100 group-hover:bg-orange-600 group-hover:text-white text-gray-900 font-bold py-3 rounded-xl transition-colors flex justify-center items-center space-x-2"
              >
                <span>Add to Cart</span>
              </button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
