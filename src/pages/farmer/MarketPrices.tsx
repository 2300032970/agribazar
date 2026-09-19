import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';
import { useLanguage } from '../../context/LanguageContext';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { PriceTrendChart } from '../../components/charts/PriceTrendChart';
import { 
  TrendingUp, 
  MapPin, 
  Truck, 
  Calculator, 
  CheckCircle2, 
  ArrowUpRight, 
  Sparkles,
  Info
} from 'lucide-react';

export const MarketPrices: React.FC = () => {
  const { marketPrices } = useStore();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const [selectedCrop, setSelectedCrop] = useState<string>('Tomato');
  const [farmerLotSizeQuintals, setFarmerLotSizeQuintals] = useState<number>(50);

  const availableCrops = ['Tomato', 'Rice', 'Chilli', 'Cotton', 'Maize'];

  const filteredPrices = marketPrices.filter(p => p.crop === selectedCrop);

  // Compute best net return market
  const marketsWithNetReturn = filteredPrices.map(p => {
    const netReturnPerQtl = p.pricePerQuintal - p.transportCostEstimate;
    const totalNetProfit = netReturnPerQtl * farmerLotSizeQuintals;
    return {
      ...p,
      netReturnPerQtl,
      totalNetProfit
    };
  }).sort((a, b) => b.netReturnPerQtl - a.netReturnPerQtl);

  const bestMarket = marketsWithNetReturn[0];

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 bg-teal-100 text-teal-700 rounded-xl">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-stone-900 tracking-tight">
                {t('mandi_price_title', 'Mandi Market Prices & Net Return Calculator')}
              </h1>
              <p className="text-xs sm:text-sm text-stone-500">
                {t('mandi_price_subtitle', 'Compare regional market prices and calculate your true net return after deducting transport costs.')}
              </p>
            </div>
          </div>
        </div>

        {/* Crop Filter Tabs */}
        <div className="flex items-center bg-stone-100 p-1 rounded-xl border border-stone-200">
          {availableCrops.map((crop) => (
            <button
              key={crop}
              onClick={() => setSelectedCrop(crop)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                selectedCrop === crop ? 'bg-white text-emerald-900 shadow-sm' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              {crop}
            </button>
          ))}
        </div>
      </div>

      {/* Net Return Intelligence Formula Banner */}
      <div className="bg-gradient-to-r from-emerald-900 to-green-950 text-white rounded-3xl p-6 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-emerald-300 text-xs font-bold uppercase tracking-wider">
              <Calculator className="w-4 h-4" />
              <span>Smart Net Return Formula</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black">
              Market Price – Transport Cost = Real Net Return
            </h2>
            <p className="text-xs text-emerald-100 max-w-xl leading-relaxed">
              Wholesale prices vary significantly across mandis. A higher price at a distant market (e.g. Hyderabad) is only lucrative if the net gain exceeds transportation expenses.
            </p>
          </div>

          {bestMarket && (
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-emerald-400/30 text-right min-w-[240px]">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-400 text-emerald-950 px-2.5 py-0.5 rounded-full inline-block mb-1">
                {t('best_value_badge', 'Highest Net Profit')}
              </span>
              <p className="text-base font-bold text-white">{bestMarket.marketName.split(' ')[0]} Mandi</p>
              <p className="text-2xl font-black text-emerald-300">
                ₹{bestMarket.netReturnPerQtl.toLocaleString()}/qtl
              </p>
              <p className="text-[11px] text-emerald-200 mt-1">
                Est. Net for {farmerLotSizeQuintals} qtl: ₹{bestMarket.totalNetProfit.toLocaleString()}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Lot Size Slider Controller */}
      <Card className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Calculator className="w-5 h-5 text-emerald-700 shrink-0" />
          <div>
            <h4 className="text-xs font-bold text-stone-900 uppercase">Simulate Your Harvest Lot Size</h4>
            <p className="text-[11px] text-stone-500">Adjust quantity to dynamically calculate total net return across markets</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="range"
            min="10"
            max="250"
            step="5"
            value={farmerLotSizeQuintals}
            onChange={e => setFarmerLotSizeQuintals(Number(e.target.value))}
            className="w-44 accent-emerald-700 cursor-pointer"
          />
          <span className="text-sm font-black text-stone-900 min-w-[80px]">
            {farmerLotSizeQuintals} Quintals
          </span>
        </div>
      </Card>

      {/* Mandi Comparison Table */}
      <div className="bg-white rounded-2xl border border-stone-200/90 overflow-hidden shadow-sm">
        <div className="p-5 border-b border-stone-100 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-stone-900">Regional Mandi Price Comparison</h3>
            <p className="text-xs text-stone-500">Live wholesale market yard rates recorded for {selectedCrop}</p>
          </div>
          <Badge variant="primary">Updated Today</Badge>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 text-stone-500 font-bold uppercase tracking-wider border-b border-stone-200">
              <tr>
                <th className="px-5 py-3.5">{t('col_mandi_name', 'Mandi Location')}</th>
                <th className="px-5 py-3.5">{t('col_distance', 'Distance (km)')}</th>
                <th className="px-5 py-3.5">{t('col_price_quintal', 'Wholesale Price')}</th>
                <th className="px-5 py-3.5">{t('col_price_kg', 'Price / Kg')}</th>
                <th className="px-5 py-3.5">{t('col_transport_cost', 'Transport Cost')}</th>
                <th className="px-5 py-3.5">{t('col_estimated_net_return', 'Estimated Net Return')}</th>
                <th className="px-5 py-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {marketsWithNetReturn.map((mandi, idx) => {
                const isBest = idx === 0;
                return (
                  <tr
                    key={mandi.id}
                    className={`transition-colors ${
                      isBest ? 'bg-emerald-50/50 font-semibold' : 'hover:bg-stone-50/80'
                    }`}
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        {isBest && <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />}
                        <div>
                          <p className="font-bold text-stone-900 text-sm">{mandi.marketName}</p>
                          <p className="text-[11px] text-stone-500">{mandi.district}, {mandi.state}</p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4 text-stone-600">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-stone-400" />
                        {mandi.distanceKmFromFarmer} km
                      </span>
                    </td>

                    <td className="px-5 py-4 font-black text-stone-900 text-sm">
                      ₹{mandi.pricePerQuintal.toLocaleString()}
                      <span className="text-[10px] text-stone-400 font-normal"> /qtl</span>
                    </td>

                    <td className="px-5 py-4 text-stone-700 font-bold">
                      ₹{mandi.pricePerKg}/kg
                    </td>

                    <td className="px-5 py-4 text-rose-700 font-semibold">
                      – ₹{mandi.transportCostEstimate}/qtl
                    </td>

                    <td className="px-5 py-4">
                      <p className="text-base font-black text-emerald-800">
                        ₹{mandi.netReturnPerQtl.toLocaleString()}
                        <span className="text-[10px] text-stone-400 font-normal"> /qtl</span>
                      </p>
                      <p className="text-[11px] text-stone-500">
                        Total: ₹{mandi.totalNetProfit.toLocaleString()}
                      </p>
                    </td>

                    <td className="px-5 py-4 text-right">
                      <Button
                        size="sm"
                        variant={isBest ? 'primary' : 'outline'}
                        icon={<Truck className="w-3.5 h-3.5" />}
                        onClick={() => navigate('/farmer/transport')}
                      >
                        Book Transport
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Historical SVG Trend Chart */}
      <PriceTrendChart cropName={selectedCrop} />
    </div>
  );
};
