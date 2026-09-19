import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Product, ProductCategory } from '../../types';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { Package, Plus, Edit3, Trash2, CheckCircle2 } from 'lucide-react';

export const ManageInventory: React.FC = () => {
  const { products, addProduct, updateProduct } = useStore();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [name, setName] = useState('');
  const [category, setCategory] = useState<ProductCategory>('Bio-inputs');
  const [manufacturer, setManufacturer] = useState('AgriBiotech Organics');
  const [price, setPrice] = useState(240);
  const [stock, setStock] = useState(50);
  const [unit, setUnit] = useState('1 Kg Pack');
  const [usage, setUsage] = useState('Mix 10g per litre water for foliar spray.');

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    addProduct({
      sellerId: 'usr_seller_1',
      sellerName: 'Kisan Krishi Kendra (Suresh Patil)',
      sellerRating: 4.8,
      sellerDistanceKm: 3.5,
      name,
      category,
      manufacturer,
      applicableCrop: ['Tomato', 'Chilli', 'Rice'],
      price,
      unit,
      stock,
      rating: 4.8,
      reviewsCount: 1,
      location: 'Mandi Road, Warangal',
      imageUrl: 'https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?w=400',
      description: 'Certified agro-input product approved for regional farmers.',
      usage,
      isOrganic: category === 'Bio-inputs',
      isVerifiedSeller: true
    });
    setIsAddModalOpen(false);
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-stone-900 tracking-tight">
            Manage Input Catalog & Inventory
          </h1>
          <p className="text-xs sm:text-sm text-stone-500">
            Update retail stock quantities, pricing and add new products
          </p>
        </div>
        <Button
          variant="primary"
          icon={<Plus className="w-4 h-4" />}
          onClick={() => setIsAddModalOpen(true)}
        >
          Add New Product SKU
        </Button>
      </div>

      <div className="bg-white rounded-2xl border border-stone-200/90 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 text-stone-500 font-bold uppercase tracking-wider border-b border-stone-200">
              <tr>
                <th className="px-5 py-3.5">Product Name</th>
                <th className="px-5 py-3.5">Category</th>
                <th className="px-5 py-3.5">Unit</th>
                <th className="px-5 py-3.5">Price</th>
                <th className="px-5 py-3.5">Stock Level</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {products.map((p) => (
                <tr key={p.id} className="hover:bg-stone-50/80">
                  <td className="px-5 py-4 font-bold text-stone-900">{p.name}</td>
                  <td className="px-5 py-4"><Badge variant="neutral">{p.category}</Badge></td>
                  <td className="px-5 py-4 text-stone-600">{p.unit}</td>
                  <td className="px-5 py-4 font-black text-stone-900">₹{p.price}</td>
                  <td className="px-5 py-4">
                    <span className="font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
                      {p.stock} units
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <button
                      onClick={() => updateProduct(p.id, { stock: p.stock + 10 })}
                      className="text-xs font-bold text-emerald-700 hover:underline cursor-pointer"
                    >
                      +10 Stock
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Product Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Agri-Product"
        maxWidth="md"
      >
        <form onSubmit={handleAddProduct} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">Product Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="e.g. Bio-Potash Consortium"
              className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Category</label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value as any)}
                className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="Bio-inputs">Bio-inputs</option>
                <option value="Crop Protection">Crop Protection</option>
                <option value="Fertilizers">Fertilizers</option>
                <option value="Seeds">Seeds</option>
                <option value="Equipment">Equipment</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Unit</label>
              <input
                type="text"
                required
                value={unit}
                onChange={e => setUnit(e.target.value)}
                placeholder="1 L / 1 Kg"
                className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Price (₹)</label>
              <input
                type="number"
                min="1"
                required
                value={price}
                onChange={e => setPrice(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Initial Stock</label>
              <input
                type="number"
                min="1"
                required
                value={stock}
                onChange={e => setStock(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div className="pt-3 border-t border-stone-200 flex items-center justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Add to Catalog
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
