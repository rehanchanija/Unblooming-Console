'use client';
import { useState, useEffect } from 'react';
import { adminApi } from '../../../../lib/adminApi';

export default function AdminProducts() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [color, setColor] = useState('');
  const [price, setPrice] = useState('');
  const [details, setDetails] = useState('');
  const initialSpecs = {
    'Display': '',
    'Processor (CPU)': '',
    'Graphics (GPU)': '',
    'RAM': '',
    'Battery': '',
    'Storage': '',
    'Emulator': '',
    'Controls': '',
    'Connectivity': ''
  };
  const [technicalSpecifications, setTechnicalSpecifications] = useState<Record<string, string>>(initialSpecs);
  const [imageFile, setImageFile] = useState<File | null>(null);

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

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      let imageUrl = '';
      if (imageFile) {
        // Upload to Cloudinary via backend
        const formData = new FormData();
        formData.append('file', imageFile);

        const uploadRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/upload/image`, {
          method: 'POST',
          body: formData,
        });
        const uploadData = await uploadRes.json();
        if (!uploadRes.ok) throw new Error(uploadData.message || 'Image upload failed');
        imageUrl = uploadData.url;
      }

      const specsObject = Object.entries(technicalSpecifications).reduce((acc, [key, value]) => {
        if (value.trim()) {
          acc[key] = value.trim();
        }
        return acc;
      }, {} as Record<string, string>);

      // Create product
      await adminApi.post('/products', {
        title,
        category,
        color,
        price,
        details,
        technicalSpecifications: specsObject,
        imageUrl,
      });

      // Reset and close
      setIsModalOpen(false);
      setTitle('');
      setCategory('');
      setColor('');
      setPrice('');
      setDetails('');
      setTechnicalSpecifications(initialSpecs);
      setImageFile(null);
      fetchProducts();
    } catch (error) {
      console.error('Failed to add product', error);
      alert('Failed to add product');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <div className="p-8">Loading products...</div>;

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <h1 className="text-3xl font-black text-gray-900 tracking-tight">Manage Collection</h1>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-gray-900 hover:bg-orange-500 text-white font-bold px-6 py-2.5 rounded-xl transition-colors w-full md:w-auto shadow-lg shadow-gray-900/20"
        >
          + Add New Product
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center shrink-0">
              <h2 className="text-xl font-bold text-gray-900">Add New Product</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>
            
            <form onSubmit={handleAddProduct} className="p-6 space-y-4 overflow-y-auto flex-1 min-h-0">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Title</label>
                <input required type="text" value={title} onChange={e => setTitle(e.target.value)} className="w-full px-4 py-2 rounded-xl border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-orange-500 focus:outline-none" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Category</label>
                  <input required type="text" value={category} onChange={e => setCategory(e.target.value)} className="w-full px-4 py-2 rounded-xl border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-orange-500 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Color</label>
                  <input required type="text" value={color} onChange={e => setColor(e.target.value)} className="w-full px-4 py-2 rounded-xl border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-orange-500 focus:outline-none" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Price</label>
                <input required type="text" value={price} onChange={e => setPrice(e.target.value)} className="w-full px-4 py-2 rounded-xl border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-orange-500 focus:outline-none" />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Product Image</label>
                <input required type="file" accept="image/*" onChange={e => setImageFile(e.target.files?.[0] || null)} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-600 hover:file:bg-orange-100 cursor-pointer" />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Details (Optional)</label>
                <textarea value={details} onChange={e => setDetails(e.target.value)} rows={3} className="w-full px-4 py-2 rounded-xl border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-orange-500 focus:outline-none"></textarea>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">Technical Specifications (Optional)</label>
                
                <div className="space-y-3 bg-gray-50/50 p-4 rounded-2xl border border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-4 gap-y-3">
                  {Object.keys(initialSpecs).map((specKey) => (
                    <div key={specKey} className="flex flex-col space-y-1">
                      <label className="text-xs font-bold text-gray-500">{specKey}</label>
                      <input
                        type="text"
                        value={technicalSpecifications[specKey] || ''}
                        onChange={(e) => {
                          setTechnicalSpecifications(prev => ({
                            ...prev,
                            [specKey]: e.target.value
                          }));
                        }}
                        placeholder={`Enter ${specKey.toLowerCase()}...`}
                        className="w-full px-4 py-2 text-sm rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-orange-500 focus:outline-none"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex justify-end space-x-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 rounded-xl font-bold text-gray-600 hover:bg-gray-100 transition-colors">Cancel</button>
                <button type="submit" disabled={isSubmitting} className="px-5 py-2.5 rounded-xl font-bold bg-gray-900 text-white hover:bg-orange-500 transition-colors shadow-lg disabled:opacity-70">
                  {isSubmitting ? 'Saving...' : 'Save Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {products.map((product) => (
          <div key={product._id || product.id} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col space-y-3">
            <div className="flex justify-between items-start">
              <div className="flex items-center space-x-3">
                {product.imageUrl && <img src={product.imageUrl} alt={product.title} className="w-12 h-12 rounded-lg object-cover bg-gray-100" />}
                <h3 className="font-bold text-gray-900 text-lg leading-tight">{product.title || product.name}</h3>
              </div>
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
              <th className="px-6 py-4 font-bold text-gray-700 text-sm">Image</th>
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
                <td className="px-6 py-3">
                  {product.imageUrl ? (
                    <img src={product.imageUrl} alt={product.title} className="w-10 h-10 rounded-lg object-cover bg-gray-100" />
                  ) : (
                    <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-xs text-gray-400">No Img</div>
                  )}
                </td>
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
