import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';
import { useLanguage } from '../../context/LanguageContext';
import { Card } from '../../components/common/Card';
import { StatCard } from '../../components/common/StatCard';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { 
  ShoppingBag, 
  Sprout, 
  BadgePercent, 
  TrendingUp, 
  CheckCircle2, 
  Clock, 
  ArrowRight,
  Building2
} from 'lucide-react';

export const BuyerDashboard: React.FC = () => {
  const { cropListings, buyerOffers } = useStore();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const activeListings = cropListings.filter(l => l.status === 'Active');
  const myOffers = buyerOffers.filter(o => o.buyerId === 'usr_buyer_1');
  const acceptedContracts = buyerOffers.filter(o => o.status === 'Accepted');

  return (
    <div className="space-y-6 pb-12">
      {/* Welcome Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-amber-900 to-stone-900 text-white p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-300 bg-amber-950/80 px-3 py-1 rounded-full border border-amber-700">
              Institutional Buyer Portal
            </span>
            <h1 className="text-2xl sm:text-3xl font-black">
              Welcome, Priya Agro Foods Ltd!
            </h1>
            <p className="text-xs sm:text-sm text-stone-300 max-w-xl">
              Source verified Grade A & B crops directly from smallholder farmers across Telangana & Andhra Pradesh without intermediary commissions.
            </p>
          </div>
          <Button
            variant="primary"
            className="bg-amber-600 hover:bg-amber-500 text-white shrink-0"
            onClick={() => navigate('/buyer/crops')}
          >
            Browse Farmer Listings ({activeListings.length})
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard
          title="Active Farmer Lots"
          value={activeListings.length}
          subtitle="Available for bidding"
          icon={<Sprout className="w-5 h-5" />}
          color="emerald"
          onClick={() => navigate('/buyer/crops')}
        />
        <StatCard
          title="My Submitted Bids"
          value={myOffers.length}
          subtitle="Pending or accepted"
          icon={<BadgePercent className="w-5 h-5" />}
          color="amber"
          onClick={() => navigate('/buyer/offers')}
        />
        <StatCard
          title="Confirmed Purchases"
          value={acceptedContracts.length}
          subtitle="Ready for dispatch"
          icon={<CheckCircle2 className="w-5 h-5" />}
          color="blue"
          onClick={() => navigate('/buyer/offers')}
        />
        <StatCard
          title="Total Sourced Value"
          value="₹1,06,000"
          subtitle="Escrow verified"
          icon={<ShoppingBag className="w-5 h-5" />}
          color="purple"
        />
      </div>

      {/* Active Listings Preview */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-stone-900">Fresh Harvest Parcels Available to Bid</h2>
          <Button size="sm" variant="outline" onClick={() => navigate('/buyer/crops')}>
            View Full Catalog
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {activeListings.map((listing) => (
            <Card key={listing.id} className="p-5 flex flex-col justify-between" hoverable onClick={() => navigate('/buyer/crops')}>
              <div className="flex items-start gap-4">
                <img
                  src={listing.imageUrl}
                  alt={listing.crop}
                  className="w-20 h-20 rounded-2xl object-cover border border-stone-200 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-stone-900 text-base">{listing.crop}</h3>
                    <Badge variant="primary">{listing.qualityGrade}</Badge>
                  </div>
                  <p className="text-xs text-stone-500 font-medium">{listing.variety}</p>
                  <p className="text-xs text-stone-600 mt-1">Farmer: {listing.farmerName} • {listing.location.split(',')[0]}</p>
                  <div className="flex items-center gap-3 mt-2 text-xs">
                    <span className="font-bold text-stone-900">Lot: {listing.quantity} {listing.quantityUnit}</span>
                    <span>•</span>
                    <span className="font-black text-emerald-800">Asking: ₹{listing.expectedPrice}/qtl</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-end">
                <Button size="sm" variant="primary">
                  Submit Purchase Counter-Offer
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
