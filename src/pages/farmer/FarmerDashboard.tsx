import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';
import { useLanguage } from '../../context/LanguageContext';
import { Card } from '../../components/common/Card';
import { StatCard } from '../../components/common/StatCard';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { 
  Sprout, 
  Microscope, 
  GraduationCap, 
  TrendingUp, 
  Truck, 
  BadgePercent, 
  CloudSun, 
  ArrowRight, 
  AlertTriangle,
  Calendar,
  CheckCircle2,
  MapPin,
  Sparkles,
  ShoppingBag
} from 'lucide-react';

export const FarmerDashboard: React.FC = () => {
  const { 
    farmerProfile, 
    crops, 
    buyerOffers, 
    consultations, 
    transportBookings, 
    orders, 
    diseaseDetections,
    marketPrices,
    acceptBuyerOffer
  } = useStore();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const activeCrops = crops.filter(c => c.status === 'Growing' || c.status === 'Ready for Harvest');
  const readyHarvestCrops = crops.filter(c => c.status === 'Ready for Harvest');
  const pendingOffers = buyerOffers.filter(o => o.status === 'Pending');
  const activeShipment = transportBookings[0];
  const latestDetection = diseaseDetections[0];

  return (
    <div className="space-y-6 pb-12">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl agri-gradient text-white p-6 sm:p-8 shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-emerald-800/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-emerald-200 border border-emerald-700/60">
              <MapPin className="w-3.5 h-3.5" />
              <span>{farmerProfile.location}</span>
              <span>•</span>
              <span>{farmerProfile.landArea} Acres</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              Namaste, {farmerProfile.name}! 🙏
            </h1>
            <p className="text-emerald-100 text-sm max-w-xl leading-relaxed">
              {farmerProfile.farmName} is active with {activeCrops.length} cultivated crops. 
              {readyHarvestCrops.length > 0 && ` ${readyHarvestCrops.length} crop lot is ready for harvest and sale!`}
            </p>
          </div>

          {/* Ag-Weather Card */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 text-white min-w-[240px] shrink-0">
            <div className="flex items-center justify-between gap-3 text-xs text-emerald-200">
              <span className="font-semibold">{t('weather_title', 'Ag-Weather Advisory')}</span>
              <CloudSun className="w-5 h-5 text-amber-300" />
            </div>
            <p className="text-2xl font-black mt-1">29°C</p>
            <p className="text-xs text-emerald-100 mt-1 leading-snug">
              Humidity 62% • Ideal weather for harvesting tomato lots and post-harvest drying.
            </p>
          </div>
        </div>
      </div>

      {/* Primary KPI Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
        <StatCard
          title={t('stat_active_crops', 'Active Crops')}
          value={activeCrops.length}
          subtitle="Tomato, Rice, Chilli"
          icon={<Sprout className="w-5 h-5" />}
          color="emerald"
          onClick={() => navigate('/farmer/crops')}
        />
        <StatCard
          title={t('stat_ready_harvest', 'Ready for Harvest')}
          value={readyHarvestCrops.length}
          subtitle="Vaishnavi Tomato"
          icon={<Sparkles className="w-5 h-5" />}
          color="amber"
          onClick={() => navigate('/farmer/sell-crops')}
        />
        <StatCard
          title={t('stat_disease_alerts', 'Disease Alerts')}
          value={latestDetection ? 1 : 0}
          subtitle="Early Blight advisory"
          icon={<AlertTriangle className="w-5 h-5" />}
          color="rose"
          onClick={() => navigate('/farmer/disease-detection')}
        />
        <StatCard
          title={t('stat_pending_consultations', 'Consultations')}
          value={consultations.length}
          subtitle="Dr. Srinivas Rao"
          icon={<GraduationCap className="w-5 h-5" />}
          color="blue"
          onClick={() => navigate('/farmer/professionals')}
        />
        <StatCard
          title={t('stat_buyer_offers', 'Buyer Offers')}
          value={pendingOffers.length}
          subtitle="Highest ₹2,650/qtl"
          icon={<BadgePercent className="w-5 h-5" />}
          color="purple"
          onClick={() => navigate('/farmer/sell-crops')}
        />
        <StatCard
          title={t('stat_in_transit', 'In Transit')}
          value={activeShipment ? 1 : 0}
          subtitle="Mini Truck TS 03"
          icon={<Truck className="w-5 h-5" />}
          color="emerald"
          onClick={() => navigate('/farmer/transport')}
        />
      </div>

      {/* Quick Action Hub */}
      <div className="bg-white rounded-2xl border border-stone-200/80 p-5 shadow-sm">
        <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider mb-3.5">
          Quick Action Hub
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <button
            onClick={() => navigate('/farmer/crops')}
            className="p-3.5 rounded-xl bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-200 text-emerald-950 font-bold text-xs flex flex-col items-center text-center gap-2 transition-all hover:-translate-y-0.5"
          >
            <Sprout className="w-6 h-6 text-emerald-700" />
            <span>Manage Crops</span>
          </button>
          <button
            onClick={() => navigate('/farmer/disease-detection')}
            className="p-3.5 rounded-xl bg-rose-50 hover:bg-rose-100/80 border border-rose-200 text-rose-950 font-bold text-xs flex flex-col items-center text-center gap-2 transition-all hover:-translate-y-0.5"
          >
            <Microscope className="w-6 h-6 text-rose-700" />
            <span>Diagnose Leaf</span>
          </button>
          <button
            onClick={() => navigate('/farmer/professionals')}
            className="p-3.5 rounded-xl bg-sky-50 hover:bg-sky-100/80 border border-sky-200 text-sky-950 font-bold text-xs flex flex-col items-center text-center gap-2 transition-all hover:-translate-y-0.5"
          >
            <GraduationCap className="w-6 h-6 text-sky-700" />
            <span>Consult Expert</span>
          </button>
          <button
            onClick={() => navigate('/farmer/sell-crops')}
            className="p-3.5 rounded-xl bg-amber-50 hover:bg-amber-100/80 border border-amber-200 text-amber-950 font-bold text-xs flex flex-col items-center text-center gap-2 transition-all hover:-translate-y-0.5"
          >
            <BadgePercent className="w-6 h-6 text-amber-700" />
            <span>Sell Produce</span>
          </button>
          <button
            onClick={() => navigate('/farmer/market-prices')}
            className="p-3.5 rounded-xl bg-teal-50 hover:bg-teal-100/80 border border-teal-200 text-teal-950 font-bold text-xs flex flex-col items-center text-center gap-2 transition-all hover:-translate-y-0.5"
          >
            <TrendingUp className="w-6 h-6 text-teal-700" />
            <span>Mandi Prices</span>
          </button>
          <button
            onClick={() => navigate('/farmer/transport')}
            className="p-3.5 rounded-xl bg-orange-50 hover:bg-orange-100/80 border border-orange-200 text-orange-950 font-bold text-xs flex flex-col items-center text-center gap-2 transition-all hover:-translate-y-0.5"
          >
            <Truck className="w-6 h-6 text-orange-700" />
            <span>Book Transport</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Active Crops & Buyer Offers */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Active Crops Overview */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-stone-900">Cultivated Farm Crops</h3>
              <p className="text-xs text-stone-500">Live monitoring of your active crop parcels</p>
            </div>
            <Link
              to="/farmer/crops"
              className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
            >
              <span>View All Crops</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {crops.slice(0, 4).map((crop) => (
              <Card key={crop.id} className="p-4 flex flex-col justify-between" hoverable onClick={() => navigate('/farmer/crops')}>
                <div className="flex items-start gap-3">
                  <img
                    src={crop.imageUrl}
                    alt={crop.cropName}
                    className="w-16 h-16 rounded-xl object-cover border border-stone-200 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-stone-900 text-sm truncate">{crop.cropName}</h4>
                      <Badge
                        variant={
                          crop.status === 'Ready for Harvest'
                            ? 'warning'
                            : crop.status === 'Listed for Sale'
                            ? 'primary'
                            : 'success'
                        }
                        size="sm"
                      >
                        {crop.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-stone-500 truncate">{crop.variety}</p>
                    <p className="text-xs font-semibold text-stone-700 mt-1">
                      {crop.quantity} {crop.quantityUnit} • {crop.landArea} Acres
                    </p>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    Harvest: {crop.expectedHarvestDate}
                  </span>
                  <span className="font-bold text-emerald-700">{crop.qualityGrade}</span>
                </div>
              </Card>
            ))}
          </div>

          {/* Live Shipment Tracking Card */}
          {activeShipment && (
            <div className="p-5 rounded-2xl bg-gradient-to-r from-stone-900 to-stone-800 text-white shadow-md">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Truck className="w-5 h-5 text-amber-400 animate-bounce" />
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
                    Live Shipment In Transit
                  </span>
                </div>
                <span className="text-xs font-mono bg-white/10 px-2.5 py-0.5 rounded-full">
                  {activeShipment.bookingCode}
                </span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h4 className="text-base font-bold">
                    {activeShipment.cropName} ({activeShipment.quantityTonnes} Tonnes)
                  </h4>
                  <p className="text-xs text-stone-300 mt-0.5">
                    Destination: {activeShipment.destinationLocation}
                  </p>
                  <p className="text-xs text-emerald-400 font-semibold mt-1">
                    Checkpoint: {activeShipment.currentCheckpoint}
                  </p>
                </div>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => navigate('/farmer/transport')}
                  className="shrink-0"
                >
                  Track Live Route
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Right 1 Col: High Buyer Offers & Quick Links */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-stone-900">Buyer Bids & Offers</h3>
            <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-bold">
              {pendingOffers.length} New
            </span>
          </div>

          {pendingOffers.length > 0 ? (
            <div className="space-y-3">
              {pendingOffers.map((offer) => (
                <div
                  key={offer.id}
                  className="p-4 rounded-2xl border-2 border-emerald-300 bg-emerald-50/60 shadow-sm space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-200/80 px-2 py-0.5 rounded-md">
                        High Offer Alert
                      </span>
                      <h4 className="text-sm font-bold text-stone-900 mt-1">
                        {offer.buyerCompany}
                      </h4>
                      <p className="text-xs text-stone-500">{offer.buyerName}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-black text-emerald-800">
                        ₹{offer.offeredPrice}/qtl
                      </p>
                      <p className="text-[11px] text-stone-500">
                        Req: {offer.requestedQuantity} Qtl
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-stone-600 bg-white/80 p-2.5 rounded-xl border border-stone-200/80 leading-relaxed">
                    "{offer.notes}"
                  </p>

                  <div className="flex items-center gap-2 pt-1">
                    <Button
                      size="sm"
                      variant="primary"
                      className="flex-1"
                      onClick={() => {
                        acceptBuyerOffer(offer.id);
                        navigate('/farmer/transport');
                      }}
                    >
                      Accept Offer (₹{offer.totalOfferAmount.toLocaleString()})
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => navigate('/farmer/sell-crops')}
                    >
                      Compare
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <Card className="p-6 text-center text-stone-500 space-y-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
              <p className="text-sm font-semibold">No pending offers right now</p>
              <Button size="sm" variant="outline" onClick={() => navigate('/farmer/sell-crops')}>
                List More Harvests
              </Button>
            </Card>
          )}

          {/* Mandi Rate Pulse */}
          <div className="p-4 rounded-2xl bg-white border border-stone-200/80 space-y-3 shadow-sm">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500">
                Today's Mandi Pulse
              </h4>
              <Link to="/farmer/market-prices" className="text-xs font-bold text-emerald-700 hover:underline">
                Compare All
              </Link>
            </div>
            {marketPrices.slice(0, 3).map((mp) => (
              <div key={mp.id} className="flex items-center justify-between py-1.5 border-b border-stone-100 last:border-0 text-xs">
                <div>
                  <p className="font-bold text-stone-800">{mp.crop}</p>
                  <p className="text-[10px] text-stone-500 truncate max-w-[130px]">{mp.marketName.split(' ')[0]} Mandi</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-stone-900">₹{mp.pricePerQuintal}/qtl</p>
                  <p className={`text-[10px] font-semibold ${mp.priceChange >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {mp.priceChange >= 0 ? '+' : ''}{mp.priceChange}%
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
};
