import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';
import { useLanguage } from '../../context/LanguageContext';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { 
  BadgePercent, 
  Plus, 
  TrendingUp, 
  MapPin, 
  Calendar, 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  ArrowRight,
  Truck,
  Building2,
  PhoneCall
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const SellCrops: React.FC = () => {
  const { 
    cropListings, 
    addCropListing, 
    buyerOffers, 
    acceptBuyerOffer, 
    rejectBuyerOffer,
    crops 
  } = useStore();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const [isListingModalOpen, setIsListingModalOpen] = useState(false);
  const [selectedCropToSell, setSelectedCropToSell] = useState('Tomato');
  const [variety, setVariety] = useState('Vaishnavi F1 Hybrid');
  const [quantity, setQuantity] = useState(50);
  const [quantityUnit, setQuantityUnit] = useState('Quintals');
  const [expectedPrice, setExpectedPrice] = useState(2500);
  const [qualityGrade, setQualityGrade] = useState<'Grade A' | 'Grade B' | 'Grade C'>('Grade A');
  const [harvestDate, setHarvestDate] = useState('2026-09-22');
  const [description, setDescription] = useState('Premium red tomatoes graded Grade A, directly harvested from our Georai farm.');

  const handleCreateListing = (e: React.FormEvent) => {
    e.preventDefault();
    addCropListing({
      farmerId: 'usr_farmer_1',
      farmerName: 'Ramesh Kumar',
      farmerPhone: '+91 98480 12345',
      crop: selectedCropToSell,
      variety,
      quantity,
      quantityUnit,
      qualityGrade,
      expectedPrice,
      location: 'Georai, Warangal, Telangana',
      harvestDate,
      imageUrl: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=500&auto=format&fit=crop&q=80',
      description
    });
    setIsListingModalOpen(false);
  };

  const handleAcceptOffer = (offerId: string) => {
    acceptBuyerOffer(offerId);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 bg-amber-100 text-amber-700 rounded-xl">
              <BadgePercent className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-stone-900 tracking-tight">
                {t('nav_sell_crops', 'Crop Marketplace & Buyer Offers')}
              </h1>
              <p className="text-xs sm:text-sm text-stone-500">
                List harvested parcels for wholesale buyers, compare competitive bids & lock in high prices
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            icon={<TrendingUp className="w-4 h-4" />}
            onClick={() => navigate('/farmer/market-prices')}
          >
            Check Mandi Rates
          </Button>
          <Button
            variant="primary"
            icon={<Plus className="w-4 h-4" />}
            onClick={() => setIsListingModalOpen(true)}
          >
            List Crop for Sale
          </Button>
        </div>
      </div>

      {/* Incoming Buyer Bids Spotlight */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-stone-900">Incoming Buyer Offers</h2>
            <p className="text-xs text-stone-500">Institutional food companies and wholesale traders bidding on your listings</p>
          </div>
          <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
            {buyerOffers.filter(o => o.status === 'Pending').length} Pending Review
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {buyerOffers.map((offer) => {
            const isPending = offer.status === 'Pending';
            const isAccepted = offer.status === 'Accepted';

            return (
              <Card
                key={offer.id}
                className={`p-5 space-y-4 border-2 ${
                  isAccepted
                    ? 'border-emerald-500 bg-emerald-50/40 shadow-md'
                    : isPending
                    ? 'border-amber-400 bg-amber-50/30 shadow-sm'
                    : 'border-stone-200 opacity-60'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 bg-white px-2 py-0.5 rounded border border-stone-200">
                        {offer.cropName}
                      </span>
                      <Badge
                        variant={isAccepted ? 'success' : isPending ? 'warning' : 'danger'}
                      >
                        {offer.status}
                      </Badge>
                    </div>
                    <h3 className="text-base font-bold text-stone-900 mt-1 flex items-center gap-1.5">
                      <Building2 className="w-4 h-4 text-stone-500 shrink-0" />
                      {offer.buyerCompany}
                    </h3>
                    <p className="text-xs text-stone-500">{offer.buyerName} • {offer.buyerLocation.split(',')[0]}</p>
                  </div>

                  <div className="text-right">
                    <p className="text-xl font-black text-emerald-800">
                      ₹{offer.offeredPrice}/qtl
                    </p>
                    <p className="text-xs text-stone-500 font-medium">
                      Qty: {offer.requestedQuantity} Qtl
                    </p>
                  </div>
                </div>

                <div className="p-3 bg-white rounded-xl border border-stone-200/80 text-xs text-stone-600 leading-relaxed">
                  <span className="font-bold text-stone-800">Buyer Note: </span>
                  "{offer.notes}"
                </div>

                <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
                  <div className="text-xs">
                    <span className="text-stone-400">Total Contract Value:</span>{' '}
                    <span className="font-black text-stone-900 text-sm">
                      ₹{offer.totalOfferAmount.toLocaleString()}
                    </span>
                  </div>

                  {isPending ? (
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => rejectBuyerOffer(offer.id)}
                      >
                        Decline
                      </Button>
                      <Button
                        size="sm"
                        variant="primary"
                        onClick={() => handleAcceptOffer(offer.id)}
                      >
                        Accept Offer
                      </Button>
                    </div>
                  ) : isAccepted ? (
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" /> Agreed
                      </span>
                      <Button
                        size="sm"
                        variant="primary"
                        icon={<Truck className="w-3.5 h-3.5" />}
                        onClick={() => navigate('/farmer/transport')}
                      >
                        Arrange Transport
                      </Button>
                    </div>
                  ) : null}
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Active Crop Listings Created by Farmer */}
      <div className="space-y-3 pt-6 border-t border-stone-200">
        <h2 className="text-lg font-bold text-stone-900">Your Active Marketplace Listings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {cropListings.map((listing) => (
            <Card key={listing.id} className="p-4 space-y-3">
              <div className="relative h-40 rounded-xl overflow-hidden bg-stone-100">
                <img
                  src={listing.imageUrl}
                  alt={listing.crop}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 left-2">
                  <Badge variant={listing.status === 'Active' ? 'primary' : 'neutral'}>
                    {listing.status}
                  </Badge>
                </div>
                <div className="absolute bottom-2 right-2 bg-stone-900/80 text-white px-2 py-0.5 rounded text-[10px] font-bold">
                  {listing.qualityGrade}
                </div>
              </div>

              <div>
                <h3 className="font-bold text-stone-900 text-base">{listing.crop} ({listing.variety})</h3>
                <p className="text-xs text-stone-500">{listing.location}</p>
              </div>

              <div className="flex items-center justify-between text-xs bg-stone-50 p-2.5 rounded-xl border border-stone-100">
                <div>
                  <span className="text-stone-400 block text-[10px] uppercase font-bold">Volume</span>
                  <span className="font-black text-stone-900">{listing.quantity} {listing.quantityUnit}</span>
                </div>
                <div className="text-right">
                  <span className="text-stone-400 block text-[10px] uppercase font-bold">Expected Price</span>
                  <span className="font-black text-emerald-800 text-sm">₹{listing.expectedPrice}/qtl</span>
                </div>
              </div>

              <p className="text-xs text-stone-600 line-clamp-2">{listing.description}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* Create Listing Modal */}
      <Modal
        isOpen={isListingModalOpen}
        onClose={() => setIsListingModalOpen(false)}
        title="List Harvested Crop for Sale"
        subtitle="Publish your parcel to institutional food buyers, aggregators, and wholesale dealers"
        maxWidth="lg"
      >
        <form onSubmit={handleCreateListing} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Crop</label>
              <select
                value={selectedCropToSell}
                onChange={e => setSelectedCropToSell(e.target.value)}
                className="w-full px-3.5 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              >
                <option value="Tomato">Tomato</option>
                <option value="Rice">Rice (Paddy)</option>
                <option value="Chilli">Chilli</option>
                <option value="Cotton">Cotton</option>
                <option value="Maize">Maize</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Variety / Hybrid</label>
              <input
                type="text"
                required
                value={variety}
                onChange={e => setVariety(e.target.value)}
                className="w-full px-3.5 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Quantity</label>
              <input
                type="number"
                min="1"
                required
                value={quantity}
                onChange={e => setQuantity(Number(e.target.value))}
                className="w-full px-3.5 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Unit</label>
              <select
                value={quantityUnit}
                onChange={e => setQuantityUnit(e.target.value)}
                className="w-full px-3.5 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              >
                <option value="Quintals">Quintals</option>
                <option value="Tonnes">Tonnes</option>
                <option value="Bags">Bags (50kg)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Asking Price (₹/Qtl)</label>
              <input
                type="number"
                min="100"
                required
                value={expectedPrice}
                onChange={e => setExpectedPrice(Number(e.target.value))}
                className="w-full px-3.5 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Quality Grade</label>
              <select
                value={qualityGrade}
                onChange={e => setQualityGrade(e.target.value as any)}
                className="w-full px-3.5 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              >
                <option value="Grade A">Grade A (Premium Retail Quality)</option>
                <option value="Grade B">Grade B (Standard Market Quality)</option>
                <option value="Grade C">Grade C (Processing Quality)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Ready Harvest Date</label>
              <input
                type="date"
                required
                value={harvestDate}
                onChange={e => setHarvestDate(e.target.value)}
                className="w-full px-3.5 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">Listing Description</label>
            <textarea
              rows={2}
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="w-full px-3.5 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          <div className="pt-3 border-t border-stone-200 flex items-center justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setIsListingModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Publish Listing
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
