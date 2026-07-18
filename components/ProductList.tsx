'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCart } from '@/lib/CartContext';
import { MOCK_PRODUCTS } from '@/lib/data';

export default function ProductList() {
  const { addToCart } = useCart();
  const router = useRouter();

  const handleAddToCart = (e: React.MouseEvent, product: any) => {
    e.preventDefault(); 
    e.stopPropagation();
    
    addToCart(product);
    router.push('/cart');
  };

  return (
    <section className="py-24 bg-white" id="products">
      <div className="max-w-6xl mx-auto px-6 mb-12 flex justify-between items-end">
        <div>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">Our Collection</h2>
          <p className="text-gray-500 mt-2 font-medium">Swipe to explore more smart products.</p>
        </div>
      </div>
      
      {/* Horizontal Slider */}
      <div className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar px-6 pb-8 space-x-6">
        {MOCK_PRODUCTS.map((product) => (
          <div 
            key={product.id} 
            className="flex-none w-[280px] snap-center bg-gray-50 rounded-[32px] border border-gray-100 overflow-hidden hover:border-orange-500 hover:shadow-xl transition-all duration-300 flex flex-col group"
          >
            <div className="relative aspect-square bg-[#0a0a0a] overflow-hidden m-4 rounded-[24px]">
              <Image 
                src={product.image} 
                alt={product.name} 
                fill 
                className="object-contain p-6 group-hover:scale-110 transition-transform duration-700"
              />
            </div>
            <div className="px-6 pb-6 pt-2 flex flex-col flex-grow">
              <h3 className="font-bold text-lg text-gray-900 mb-1 leading-tight">{product.name}</h3>
              <p className="text-2xl font-black text-gray-900 mb-6 mt-auto">₹{product.price}</p>
              
              <button 
                onClick={(e) => handleAddToCart(e, product)}
                className="w-full bg-gray-900 hover:bg-orange-500 text-white font-bold py-3.5 rounded-xl transition-colors flex justify-center items-center space-x-2"
              >
                <span>Add to Cart</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
