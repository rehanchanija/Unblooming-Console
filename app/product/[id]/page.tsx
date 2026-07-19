"use client";
import { useCart } from "@/lib/CartContext";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useState, use, useEffect } from "react";

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const unwrappedParams = use(params);
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const router = useRouter();
  const [activeImage, setActiveImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/products/${unwrappedParams.id}`,
        );
        if (res.ok) {
          const p = await res.json();
          setProduct({
            id: p._id || p.id,
            name: p.title || p.name,
            price: p.price,
            category: p.category,
            variants: p.variants || [],
            image: p.variants?.[0]?.imageUrl || p.imageUrl || "",
            description: p.details || "",
            specs: p.technicalSpecifications || {},
          });
          if (p.variants && p.variants.length > 0) {
            setSelectedColor(p.variants[0].color);
          }
        }
      } catch (error) {
        console.error("Failed to fetch product", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [unwrappedParams.id]);

  if (loading) {
    return (
      <div className="min-h-screen pt-32 text-center bg-gray-50 flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-gray-400">Loading Product...</h1>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen pt-32 text-center bg-gray-50 flex flex-col items-center">
        <h1 className="text-3xl font-black text-gray-900">Product Not Found</h1>
        <Link
          href="/#products"
          className="text-orange-500 mt-4 inline-block font-bold"
        >
          Return to Store
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    const variant = product.variants?.find(
      (v: any) => v.color === selectedColor,
    );
    const imgUrl = variant?.imageUrl || product.image;
    addToCart({
      productId: product.id,
      title: product.name,
      price: product.price.toString(),
      quantity: 1,
      imageUrl: imgUrl,
      color: selectedColor || "",
    });
  };

  return (
    <main className="min-h-screen bg-gray-50 pt-24 pb-20">
      <div className="max-w-5xl mx-auto px-6">
        {/* Breadcrumb */}
        <div className="text-sm font-bold text-gray-400 mb-8">
          <Link href="/" className="hover:text-gray-900">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/#products" className="hover:text-gray-900">
            Products
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left: Gallery */}
          <div className="flex flex-col space-y-6">
            {/* Main Image */}
            <div className="relative aspect-square bg-[#0a0a0a] rounded-[32px] overflow-hidden border border-gray-100 shadow-sm flex items-center justify-center p-8 group">
              <Image
                src={
                  product.variants?.find((v: any) => v.color === selectedColor)
                    ?.imageUrl || product.image
                }
                alt={product.name}
                fill
                className="object-contain p-8 group-hover:scale-105 transition-transform duration-700"
              />
            </div>

            {/* Color Selector */}
            {product.variants && product.variants.length > 0 && (
              <div className="flex flex-col items-center">
                <h3 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wider">
                  Select Color
                </h3>
                <div className="flex space-x-3">
                  {product.variants.map((v: any, idx: number) => {
                    const isSelected = selectedColor === v.color;
                    const bgClass =
                      v.color.toLowerCase() === "red"
                        ? "bg-red-500"
                        : v.color.toLowerCase() === "purple"
                          ? "bg-purple-500"
                          : v.color.toLowerCase() === "black"
                            ? "bg-gray-900"
                            : v.color.toLowerCase() === "white"
                              ? "bg-white border-2 border-gray-200"
                              : "bg-orange-500";
                    return (
                      <button
                        key={idx}
                        onClick={() => setSelectedColor(v.color)}
                        title={v.color}
                        className={`w-10 h-10 rounded-full border-2 transition-all flex items-center justify-center ${isSelected ? "border-gray-900 scale-110 shadow-md" : "border-transparent hover:scale-105"}`}
                      >
                        <span
                          className={`w-full h-full rounded-full border border-gray-200/50 ${bgClass}`}
                        ></span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Right: Details */}
          <div className="flex flex-col justify-center space-y-8">
            <div>
              <span className="text-orange-500 font-bold uppercase tracking-wider text-sm mb-2 block">
                {product.category}
              </span>
              <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-4">
                {product.name}
              </h1>
              <p className="text-3xl font-black text-gray-900">
                ₹{product.price}
              </p>
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
                  <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center text-orange-500 text-xl">
                    🔄
                  </div>
                  <span className="text-[11px] font-bold text-teal-700 leading-tight">
                    7 Days
                    <br />
                    Replacement
                  </span>
                </div>
                <div className="flex flex-col items-center text-center space-y-2">
                  <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center text-orange-500 text-xl">
                    🚚
                  </div>
                  <span className="text-[11px] font-bold text-teal-700 leading-tight">
                    Free
                    <br />
                    Delivery
                  </span>
                </div>
                <div className="flex flex-col items-center text-center space-y-2">
                  <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center text-orange-500 text-xl">
                    🛡️
                  </div>
                  <span className="text-[11px] font-bold text-teal-700 leading-tight">
                    1 Year
                    <br />
                    Warranty
                  </span>
                </div>
                <div className="flex flex-col items-center text-center space-y-2">
                  <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center text-orange-500 text-xl">
                    ❌
                  </div>
                  <span className="text-[11px] font-bold text-teal-700 leading-tight">
                    Anytime
                    <br />
                    Cancel
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Specs Grid */}
        <div className="grid grid-cols-1 gap-12 mt-20 max-w-3xl mx-auto">
          {/* Specifications */}
          <div className="bg-white rounded-[32px] p-8 md:p-10 border border-gray-100 shadow-sm">
            <h2 className="text-2xl font-black text-gray-900 mb-6">
              Technical Specifications
            </h2>
            <ul className="space-y-4">
              {Object.entries(product.specs).map(([key, value]) => (
                <li
                  key={key}
                  className="flex flex-col sm:flex-row sm:justify-between py-3 border-b border-gray-50 last:border-0"
                >
                  <span className="text-gray-500 font-bold mb-1 sm:mb-0">
                    {key}
                  </span>
                  <strong className="text-gray-900 text-right">
                    {value as string}
                  </strong>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
