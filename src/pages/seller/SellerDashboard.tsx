import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';
import { Card } from '../../components/common/Card';
import { StatCard } from '../../components/common/StatCard';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { Store, Package, ShoppingCart, TrendingUp, CheckCircle2, ArrowRight } from 'lucide-react';

export const SellerDashboard: React.FC = () => {
  const { products, orders } = useStore();
  const navigate = useNavigate();

  return (
    <div className="space-y-6 pb-12">
      <div className="rounded-3xl bg-gradient-to-r from-purple-900 to-indigo-950 text-white p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-300 bg-purple-950 px-3 py-1 rounded-full border border-purple-700">
              Input Seller Portal
            </span>
            <h1 className="text-2xl sm:text-3xl font-black">
              Kisan Krishi Kendra (Suresh Patil)
            </h1>
            <p className="text-xs sm:text-sm text-purple-200">
              Mandi Road, Warangal • Licensed Bio-Input & Seed Retailer (Lic #TS/WGL/AGRI/884)
            </p>
          </div>
          <Button
            variant="primary"
            className="bg-purple-600 hover:bg-purple-500 text-white shrink-0"
            onClick={() => navigate('/seller/inventory')}
          >
            Manage Product Catalog
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard
          title="Active SKUs"
          value={products.length}
          subtitle="Bio-inputs & seeds"
          icon={<Package className="w-5 h-5" />}
          color="purple"
          onClick={() => navigate('/seller/inventory')}
        />
        <StatCard
          title="Orders Received"
          value={orders.length > 0 ? orders.length : 3}
          subtitle="Farmer farmgate deliveries"
          icon={<ShoppingCart className="w-5 h-5" />}
          color="emerald"
        />
        <StatCard
          title="Today's Sales"
          value="₹4,850"
          subtitle="Direct UPI transfer"
          icon={<TrendingUp className="w-5 h-5" />}
          color="amber"
        />
        <StatCard
          title="Verification Status"
          value="Certified"
          subtitle="State Agri Dept"
          icon={<CheckCircle2 className="w-5 h-5" />}
          color="blue"
        />
      </div>

      {/* Inventory Snapshot */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-stone-900">Your High-Demand Inventory</h2>
          <Button size="sm" variant="outline" onClick={() => navigate('/seller/inventory')}>
            Add New Product
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {products.slice(0, 3).map((p) => (
            <Card key={p.id} className="p-4 space-y-2">
              <div className="flex items-center justify-between">
                <Badge variant="neutral">{p.category}</Badge>
                <span className="text-xs font-bold text-emerald-800">Stock: {p.stock}</span>
              </div>
              <h4 className="font-bold text-stone-900 text-sm">{p.name}</h4>
              <p className="text-xs text-stone-500">Unit: {p.unit} • ₹{p.price}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
