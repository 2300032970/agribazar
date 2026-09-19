import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';
import { Card } from '../../components/common/Card';
import { StatCard } from '../../components/common/StatCard';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { 
  ShieldCheck, 
  Users2, 
  Sprout, 
  Store, 
  ShoppingCart, 
  BadgePercent, 
  TrendingUp, 
  CheckCircle2,
  AlertTriangle,
  ArrowRight
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { crops, products, orders, cropListings, buyerOffers, professionals } = useStore();
  const navigate = useNavigate();

  return (
    <div className="space-y-6 pb-12">
      <div className="rounded-3xl bg-gradient-to-r from-stone-900 via-rose-950 to-stone-900 text-white p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-300 bg-rose-950 px-3 py-1 rounded-full border border-rose-800">
              State Agriculture Department • System Administrator
            </span>
            <h1 className="text-2xl sm:text-3xl font-black">
              AgriConnect State Oversight Control
            </h1>
            <p className="text-xs sm:text-sm text-stone-300">
              Supervising digital mandi trade compliance, certified agronomist credentials, and pest outbreak early warnings
            </p>
          </div>
          <Button
            variant="primary"
            className="bg-rose-600 hover:bg-rose-500 text-white shrink-0"
            onClick={() => navigate('/admin/verifications')}
          >
            Verification Center
          </Button>
        </div>
      </div>

      {/* Primary Platform Statistics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard
          title="Total Farmers"
          value="4,850"
          subtitle="Enrolled smallholders"
          icon={<Users2 className="w-5 h-5" />}
          color="emerald"
        />
        <StatCard
          title="Institutional Buyers"
          value="182"
          subtitle="Processing & wholesale"
          icon={<BadgePercent className="w-5 h-5" />}
          color="amber"
        />
        <StatCard
          title="Monitored Crops"
          value={crops.length + 1240}
          subtitle="Active geo-parcels"
          icon={<Sprout className="w-5 h-5" />}
          color="blue"
        />
        <StatCard
          title="Active Agronomists"
          value={professionals.length + 38}
          subtitle="PhD / M.Sc certified"
          icon={<ShieldCheck className="w-5 h-5" />}
          color="purple"
          onClick={() => navigate('/admin/verifications')}
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard
          title="Input Products"
          value={products.length + 140}
          subtitle="Licensed bio-inputs"
          icon={<Store className="w-5 h-5" />}
          color="teal"
        />
        <StatCard
          title="Input Orders"
          value="892"
          subtitle="Delivered to farms"
          icon={<ShoppingCart className="w-5 h-5" />}
          color="emerald"
        />
        <StatCard
          title="Crop Trade Value"
          value="₹4.2 Cr"
          subtitle="Escrow processed"
          icon={<TrendingUp className="w-5 h-5" />}
          color="amber"
        />
        <StatCard
          title="Pending Verifications"
          value="2"
          subtitle="Awaiting admin approval"
          icon={<AlertTriangle className="w-5 h-5" />}
          color="rose"
          onClick={() => navigate('/admin/verifications')}
        />
      </div>

      {/* Disease Outbreak Early Warning Summary */}
      <Card className="p-6 space-y-4 border-2 border-rose-200 bg-rose-50/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-rose-600" />
            <h3 className="font-bold text-stone-900 text-base">Regional Pest & Disease Cluster Map</h3>
          </div>
          <Badge variant="danger">High Alert</Badge>
        </div>
        <p className="text-xs text-stone-600 leading-relaxed">
          AI Vision diagnostic telemetry indicates an 18% surge in <span className="font-bold text-rose-800">Early Blight (Alternaria solani)</span> scans across Warangal Rural and Jangaon over the last 48 hours due to unseasonal morning fog and 82% relative humidity. Agronomists have been notified to advise Trichoderma soil inoculation and canopy thinning.
        </p>
      </Card>
    </div>
  );
};
