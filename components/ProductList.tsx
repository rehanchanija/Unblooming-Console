'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/lib/CartContext';
import { MOCK_PRODUCTS } from '@/lib/data';

export default function ProductList() {
  const { addToCart } = useCart();
  const router = useRouter();
  
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  const categories = ['All', 'Consoles', 'Accessories'];
  const colors = ['All', 'Red', 'Purple', 'Black'];

  const filteredProducts = MOCK_PRODUCTS.filter((product) => {
    const matchCategory = selectedCategory === null || product.category === selectedCategory;
    const matchColor = selectedColor === null || product.color === selectedColor;
    return matchCategory && matchColor;
  });

  const handleAddToCart = (e: React.MouseEvent, product: any) => {
    e.preventDefault(); 
    e.stopPropagation();
    
    addToCart(product);
    router.push('/cart');
  };

  return (
    <section className="py-24 bg-white" id="products">
      <div className="max-w-6xl mx-auto px-6 mb-12">
        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">Our Collection</h2>
            <p className="text-gray-500 mt-2 font-medium">Swipe to explore more smart products.</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center w-full md:w-auto overflow-hidden">
            {/* Category Filter */}
            <div className="flex space-x-2 bg-gray-100 p-1 rounded-xl w-full overflow-x-auto hide-scrollbar">
              {categories.map(cat => {
                const isSelected = selectedCategory === (cat === 'All' ? null : cat);
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat === 'All' ? null : cat)}
                    className={`px-4 py-2 text-sm font-bold rounded-lg transition-all ${isSelected ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
            
            {/* Color Filter */}
            <div className="flex space-x-2 items-center bg-gray-100 p-2 rounded-xl h-full">
              <span className="text-xs font-bold text-gray-400 mr-1 uppercase">Color</span>
              {colors.map(color => {
                const isSelected = selectedColor === (color === 'All' ? null : color);
                return (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color === 'All' ? null : color)}
                    title={color}
                    className={`w-7 h-7 rounded-full border-2 transition-all ${isSelected ? 'border-gray-900 scale-110 shadow-md' : 'border-transparent hover:scale-105'} flex items-center justify-center`}
                  >
                    <span className={`w-full h-full rounded-full border border-gray-200/50 ${color === 'All' ? 'bg-[conic-gradient(red,yellow,lime,aqua,blue,fuchsia,red)]' : color === 'Red' ? 'bg-red-500' : color === 'Purple' ? 'bg-purple-500' : 'bg-gray-900'}`}></span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      
      {/* Horizontal Slider */}
      <div className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar px-6 pb-8 space-x-6 min-h-[400px]">
        {filteredProducts.length === 0 ? (
          <div className="w-full flex flex-col items-center justify-center py-20 text-gray-400">
            <div className="text-5xl mb-4">🔍</div>
            <p className="font-bold text-xl text-gray-900 mb-2">No products found</p>
            <p className="font-medium text-gray-500">Try adjusting your filters</p>
          </div>
        ) : (
          filteredProducts.map((product) => (
          <Link 
            href={`/product/${product.id}`}
            key={product.id} 
            className="flex-none w-[280px] snap-center bg-gray-50 rounded-[32px] border border-gray-100 overflow-hidden hover:border-orange-500 hover:shadow-xl transition-all duration-300 flex flex-col group cursor-pointer"
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
          </Link>
          ))
        )}
      </div>
    </section>
  );
}
