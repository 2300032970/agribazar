import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';
import { useLanguage } from '../../context/LanguageContext';
import { Product, ProductCategory } from '../../types';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { 
  Store, 
  Search, 
  ShoppingCart, 
  Star, 
  MapPin, 
  CheckCircle2, 
  SlidersHorizontal, 
  ArrowUpDown, 
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Truck
} from 'lucide-react';

export const ProductMarketplace: React.FC = () => {
  const { products, addToCart, cart } = useStore();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'distance' | 'priceAsc' | 'rating'>('distance');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [nearbySellersModal, setNearbySellersModal] = useState<Product | null>(null);
  const [addedToast, setAddedToast] = useState<string | null>(null);

  const categories: string[] = ['All', 'Bio-inputs', 'Crop Protection', 'Fertilizers', 'Seeds', 'Equipment'];

  const filteredProducts = products
    .filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            p.applicableCrop.some(c => c.toLowerCase().includes(searchQuery.toLowerCase())) ||
                            p.manufacturer.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCat = selectedCategory === 'All' || p.category === selectedCategory;
      return matchesSearch && matchesCat;
    })
    .sort((a, b) => {
      if (sortBy === 'distance') return a.sellerDistanceKm - b.sellerDistanceKm;
      if (sortBy === 'priceAsc') return a.price - b.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });

  const handleAddToCart = (product: Product, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    addToCart(product, 1);
    setAddedToast(`Added ${product.name} to cart`);
    setTimeout(() => setAddedToast(null), 2500);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Toast Alert */}
      {addedToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-800 text-white px-4 py-2.5 rounded-2xl shadow-xl border border-emerald-500/50 flex items-center gap-2 animate-bounce text-xs font-bold">
          <CheckCircle2 className="w-4 h-4 text-emerald-300" />
          <span>{addedToast}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 bg-purple-100 text-purple-700 rounded-xl">
              <Store className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-stone-900 tracking-tight">
                {t('nav_marketplace', 'Agri-Input & Pesticide Marketplace')}
              </h1>
              <p className="text-xs sm:text-sm text-stone-500">
                Certified bio-inputs, organic pest control, fertilizers & certified seeds from nearby licensed sellers
              </p>
            </div>
          </div>
        </div>

        {/* View Cart Button */}
        <Button
          variant="primary"
          icon={<ShoppingCart className="w-4 h-4" />}
          onClick={() => navigate('/farmer/cart')}
        >
          View Cart ({cart.reduce((sum, i) => sum + i.quantity, 0)} Items)
        </Button>
      </div>

      {/* Category Pills & Filters */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
              selectedCategory === cat
                ? 'bg-emerald-700 text-white shadow-sm'
                : 'bg-white text-stone-600 border border-stone-200 hover:bg-emerald-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Search & Sort Tool Bar */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200/80 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="w-full sm:w-96 relative">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search Trichoderma, neem oil, tomato seeds..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div className="flex items-center gap-2 text-xs w-full sm:w-auto">
          <span className="text-stone-400 font-semibold shrink-0">Sort By:</span>
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value as any)}
            className="px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs font-bold text-stone-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="distance">Nearest Seller First (Distance km)</option>
            <option value="priceAsc">Lowest Price First</option>
            <option value="rating">Top Rated Seller</option>
          </select>
        </div>
      </div>

      {/* Product Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredProducts.map((prod) => (
          <Card
            key={prod.id}
            hoverable
            onClick={() => setSelectedProduct(prod)}
            className="p-4 flex flex-col justify-between group"
          >
            <div className="space-y-3">
              {/* Product Image */}
              <div className="relative h-44 w-full rounded-xl overflow-hidden bg-stone-100">
                <img
                  src={prod.imageUrl}
                  alt={prod.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 left-2 flex gap-1.5">
                  <Badge variant="neutral">{prod.category}</Badge>
                  {prod.isOrganic && (
                    <span className="bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs">
                      100% Bio/Organic
                    </span>
                  )}
                </div>
                {/* Distance Badge */}
                <div className="absolute bottom-2 right-2 bg-stone-900/80 backdrop-blur-md text-white px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-emerald-400" />
                  <span>{prod.sellerDistanceKm} km away</span>
                </div>
              </div>

              {/* Name & Manufacturer */}
              <div>
                <h3 className="font-bold text-stone-900 text-sm group-hover:text-emerald-700 transition-colors line-clamp-1">
                  {prod.name}
                </h3>
                <p className="text-xs text-stone-500">{prod.manufacturer}</p>
              </div>

              {/* Seller & Verification */}
              <div className="p-2.5 bg-stone-50 rounded-xl border border-stone-100 flex items-center justify-between text-xs">
                <div>
                  <p className="font-bold text-stone-800 truncate max-w-[170px]">{prod.sellerName}</p>
                  <p className="text-[10px] text-stone-500">{prod.location}</p>
                </div>
                <div className="flex items-center gap-1 text-amber-600 font-bold text-xs">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  {prod.rating}
                </div>
              </div>

              {/* Crops Handled Chips */}
              <div className="flex flex-wrap gap-1">
                {prod.applicableCrop.map((c, i) => (
                  <span key={i} className="text-[10px] bg-stone-100 text-stone-600 px-2 py-0.5 rounded-md font-medium">
                    {c}
                  </span>
                ))}
              </div>
            </div>

            {/* Price & Action Footer */}
            <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
              <div>
                <p className="text-[10px] uppercase font-bold text-stone-400">Unit: {prod.unit}</p>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-lg font-black text-stone-900">₹{prod.price}</span>
                  {prod.originalPrice && (
                    <span className="text-xs text-stone-400 line-through">₹{prod.originalPrice}</span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={(e) => {
                    e.stopPropagation();
                    setNearbySellersModal(prod);
                  }}
                  title="Compare Nearby Sellers"
                >
                  Nearby
                </Button>
                <Button
                  size="sm"
                  variant="primary"
                  icon={<ShoppingCart className="w-3.5 h-3.5" />}
                  onClick={(e) => handleAddToCart(prod, e)}
                >
                  Add
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Smart Nearby Seller Finder Modal */}
      {nearbySellersModal && (
        <Modal
          isOpen={!!nearbySellersModal}
          onClose={() => setNearbySellersModal(null)}
          title={`Compare Nearby Verified Sellers`}
          subtitle={`Product: ${nearbySellersModal.name}`}
          maxWidth="xl"
        >
          <div className="space-y-4">
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900">
              Comparing licensed suppliers within 25 km of Georai, Warangal with ready in-stock inventory.
            </div>

            {/* List of Simulated Nearby Sellers for this item */}
            <div className="space-y-3">
              {[
                {
                  name: 'Kisan Krishi Kendra (Suresh Patil)',
                  distance: '3.5 km',
                  price: nearbySellersModal.price,
                  stock: '85 packs available',
                  delivery: 'Ready for Pickup or Same-Day Delivery',
                  rating: 4.8,
                  isVerified: true
                },
                {
                  name: 'Annapurna Agro Inputs Store',
                  distance: '7.2 km',
                  price: nearbySellersModal.price + 15,
                  stock: '40 packs available',
                  delivery: 'Delivery Tomorrow',
                  rating: 4.6,
                  isVerified: true
                },
                {
                  name: 'Telangana Rythu Seva Kendra',
                  distance: '12.0 km',
                  price: nearbySellersModal.price - 10,
                  stock: '150 packs available',
                  delivery: 'Delivery in 2 days',
                  rating: 4.9,
                  isVerified: true
                }
              ].map((seller, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-stone-200 bg-white hover:border-emerald-300 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-bold text-stone-900 text-sm">{seller.name}</h4>
                      {seller.isVerified && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-stone-500">
                      <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                        <MapPin className="w-3 h-3" /> {seller.distance}
                      </span>
                      <span>•</span>
                      <span>{seller.stock}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1 text-amber-600 font-bold">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" /> {seller.rating}
                      </span>
                    </div>
                    <p className="text-[11px] text-stone-600 flex items-center gap-1">
                      <Truck className="w-3 h-3 text-stone-400" /> {seller.delivery}
                    </p>
                  </div>

                  <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 shrink-0">
                    <span className="text-lg font-black text-stone-900">₹{seller.price}</span>
                    <Button
                      size="sm"
                      variant="primary"
                      onClick={() => {
                        handleAddToCart(nearbySellersModal);
                        setNearbySellersModal(null);
                      }}
                    >
                      Buy from Seller
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Modal>
      )}

      {/* Product Details Modal */}
      {selectedProduct && (
        <Modal
          isOpen={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
          title={selectedProduct.name}
          subtitle={`Manufacturer: ${selectedProduct.manufacturer}`}
          maxWidth="lg"
        >
          <div className="space-y-4">
            <img
              src={selectedProduct.imageUrl}
              alt={selectedProduct.name}
              className="w-full h-52 object-cover rounded-2xl border border-stone-200 shadow-sm"
            />

            <div className="space-y-2 text-xs">
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-100">
                <p className="font-bold text-stone-800">Product Description:</p>
                <p className="text-stone-600 mt-1 leading-relaxed">{selectedProduct.description}</p>
              </div>

              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100">
                <p className="font-bold text-emerald-950">Usage & Dosage Instructions:</p>
                <p className="text-emerald-800 mt-1 leading-relaxed">{selectedProduct.usage}</p>
              </div>
            </div>

            <div className="pt-3 border-t border-stone-200 flex items-center justify-between">
              <div>
                <p className="text-xs text-stone-400 font-bold uppercase">Price ({selectedProduct.unit})</p>
                <p className="text-xl font-black text-stone-900">₹{selectedProduct.price}</p>
              </div>
              <Button
                variant="primary"
                icon={<ShoppingCart className="w-4 h-4" />}
                onClick={() => {
                  handleAddToCart(selectedProduct);
                  setSelectedProduct(null);
                }}
              >
                Add to Cart
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
