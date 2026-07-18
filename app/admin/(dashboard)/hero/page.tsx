'use client';
import { useState, useEffect } from 'react';
import { adminApi } from '../../../../lib/adminApi';

export default function AdminHero() {
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    buttonText: '',
    buttonPrice: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const data = await adminApi.get('/content/hero');
        if (data && Object.keys(data).length > 0) {
          setFormData({
            title: data.title || '',
            subtitle: data.subtitle || '',
            buttonText: data.buttonText || '',
            buttonPrice: data.buttonPrice || '',
          });
        }
      } catch (error) {
        console.error('Failed to fetch hero content', error);
      } finally {
        setInitialLoading(false);
      }
    };
    fetchHeroData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await adminApi.post('/content/hero', formData);
      alert('Hero settings saved successfully!');
    } catch (error) {
      console.error('Failed to save hero settings', error);
      alert('Failed to save hero settings.');
    } finally {
      setIsLoading(false);
    }
  };

  if (initialLoading) return <div className="p-8">Loading...</div>;

  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-black text-gray-900 tracking-tight mb-8">Manage Hero Section</h1>
      
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-6">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Main Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-gray-50 text-gray-900"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Subtitle</label>
          <textarea
            name="subtitle"
            value={formData.subtitle}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-gray-50 text-gray-900 resize-none"
            required
          ></textarea>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Button Text</label>
            <input
              type="text"
              name="buttonText"
              value={formData.buttonText}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-gray-50 text-gray-900"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Button Price</label>
            <input
              type="text"
              name="buttonPrice"
              value={formData.buttonPrice}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-gray-50 text-gray-900"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-xl transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
}
