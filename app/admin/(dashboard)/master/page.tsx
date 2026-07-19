'use client';
import { useState, useEffect } from 'react';
import { adminApi } from '../../../../lib/adminApi';

export default function MasterSettings() {
  const [categories, setCategories] = useState<any[]>([]);
  const [colors, setColors] = useState<any[]>([]);
  const [orderStatuses, setOrderStatuses] = useState<any[]>([]);

  const [activeModal, setActiveModal] = useState<'categories' | 'colors' | 'orderStatuses' | null>(null);
  
  const [newValue, setNewValue] = useState('');

  useEffect(() => {
    fetchMasterData();
  }, []);

  const fetchMasterData = async () => {
    try {
      const [catsRes, colsRes, statusesRes] = await Promise.all([
        adminApi.get('/categories').catch(() => []),
        adminApi.get('/colors').catch(() => []),
        adminApi.get('/order-status').catch(() => [])
      ]);
      setCategories(catsRes);
      setColors(colsRes);
      setOrderStatuses(statusesRes);
    } catch (error) {
      console.error('Failed to fetch master data', error);
    }
  };

  const handleCreate = async (endpoint: string, stateUpdateFn: any) => {
    if (!newValue.trim()) return;
    try {
      await adminApi.post(endpoint, { name: newValue.trim() });
      setNewValue('');
      fetchMasterData();
    } catch (error) {
      console.error(`Failed to create ${endpoint}`, error);
    }
  };

  const handleEdit = async (endpoint: string, item: any) => {
    const newName = prompt(`Enter new name:`, item.name);
    if (newName && newName.trim() !== item.name) {
      try {
        await adminApi.patch(`${endpoint}/${item._id || item.id}`, { name: newName.trim() });
        fetchMasterData();
      } catch (error) {
        console.error(`Failed to update ${endpoint}`, error);
      }
    }
  };

  const handleDelete = async (endpoint: string, id: string) => {
    if (confirm('Are you sure you want to delete this item?')) {
      try {
        await adminApi.delete(`${endpoint}/${id}`);
        fetchMasterData();
      } catch (error) {
        console.error(`Failed to delete ${endpoint}`, error);
      }
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-black text-gray-900 tracking-tight mb-8">Master Settings</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Categories Card */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center justify-center space-y-4">
          <div className="text-4xl">📂</div>
          <h2 className="text-xl font-bold text-gray-900">Categories</h2>
          <p className="text-gray-500 text-sm text-center">Manage product categories</p>
          <button 
            onClick={() => setActiveModal('categories')}
            className="px-6 py-2 bg-gray-900 text-white rounded-lg font-bold hover:bg-orange-500 transition-colors w-full"
          >
            Manage Categories
          </button>
        </div>

        {/* Colors Card */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center justify-center space-y-4">
          <div className="text-4xl">🎨</div>
          <h2 className="text-xl font-bold text-gray-900">Colors</h2>
          <p className="text-gray-500 text-sm text-center">Manage product colors</p>
          <button 
            onClick={() => setActiveModal('colors')}
            className="px-6 py-2 bg-gray-900 text-white rounded-lg font-bold hover:bg-orange-500 transition-colors w-full"
          >
            Manage Colors
          </button>
        </div>

        {/* Order Statuses Card */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center justify-center space-y-4">
          <div className="text-4xl">🚚</div>
          <h2 className="text-xl font-bold text-gray-900">Order Statuses</h2>
          <p className="text-gray-500 text-sm text-center">Manage order status tags</p>
          <button 
            onClick={() => setActiveModal('orderStatuses')}
            className="px-6 py-2 bg-gray-900 text-white rounded-lg font-bold hover:bg-orange-500 transition-colors w-full"
          >
            Manage Statuses
          </button>
        </div>
      </div>

      {/* MODAL */}
      {activeModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl flex flex-col max-h-[80vh]">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h2 className="text-2xl font-black text-gray-900 capitalize">
                Manage {activeModal.replace(/([A-Z])/g, ' $1').trim()}
              </h2>
              <button 
                onClick={() => { setActiveModal(null); setNewValue(''); }}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-sm hover:bg-gray-100 transition-colors text-gray-500"
              >
                ✕
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1">
              <div className="flex space-x-2 mb-6">
                <input
                  type="text"
                  placeholder="Enter new name..."
                  value={newValue}
                  onChange={(e) => setNewValue(e.target.value)}
                  className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <button
                  onClick={() => {
                    if (activeModal === 'categories') handleCreate('/categories', setCategories);
                    if (activeModal === 'colors') handleCreate('/colors', setColors);
                    if (activeModal === 'orderStatuses') handleCreate('/order-status', setOrderStatuses);
                  }}
                  className="px-6 py-3 bg-orange-500 text-white font-bold rounded-xl hover:bg-orange-600 transition-colors"
                >
                  Add
                </button>
              </div>

              <div className="space-y-3">
                {(activeModal === 'categories' ? categories : 
                  activeModal === 'colors' ? colors : 
                  orderStatuses).map((item) => (
                  <div key={item._id || item.id} className="flex justify-between items-center p-4 bg-white border border-gray-100 shadow-sm rounded-xl hover:shadow-md transition-shadow">
                    <span className="font-bold text-gray-700">{item.name}</span>
                    <div className="space-x-2">
                      <button 
                        onClick={() => {
                          const ep = activeModal === 'categories' ? '/categories' : activeModal === 'colors' ? '/colors' : '/order-status';
                          handleEdit(ep, item);
                        }}
                        className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => {
                          const ep = activeModal === 'categories' ? '/categories' : activeModal === 'colors' ? '/colors' : '/order-status';
                          handleDelete(ep, item._id || item.id);
                        }}
                        className="px-3 py-1 text-sm bg-red-50 hover:bg-red-100 text-red-600 rounded-lg font-medium"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
