import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { useLanguage } from '../../context/LanguageContext';
import { CropListing } from '../../types';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { 
  Search, 
  MapPin, 
  Calendar, 
  CheckCircle2, 
  Send,
  Building2,
  Filter
} from 'lucide-react';

export const BrowseCrops: React.FC = () => {
  const { cropListings, addBuyerOffer } = useStore();
  const { t } = useLanguage();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCropFilter, setSelectedCropFilter] = useState('All');
  const [biddingListing, setBiddingListing] = useState<CropListing | null>(null);

  const [offeredPrice, setOfferedPrice] = useState(2650);
  const [requestedQuantity, setRequestedQuantity] = useState(40);
  const [buyerNotes, setBuyerNotes] = useState('Premium price for immediate warehouse delivery. Full escrow guaranteed.');
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const activeListings = cropListings.filter(l => {
    const matchesSearch = l.crop.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          l.variety.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          l.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCrop = selectedCropFilter === 'All' || l.crop === selectedCropFilter;
    return matchesSearch && matchesCrop;
  });

  const handleOpenBidding = (listing: CropListing) => {
    setBiddingListing(listing);
    setOfferedPrice(listing.expectedPrice + 100);
    setRequestedQuantity(listing.quantity);
  };

  const handleSubmitOffer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!biddingListing) return;

    addBuyerOffer({
      listingId: biddingListing.id,
      cropName: biddingListing.crop,
      farmerId: biddingListing.farmerId,
      farmerName: biddingListing.farmerName,
      buyerId: 'usr_buyer_1',
      buyerName: 'Kavita Reddy',
      buyerCompany: 'Priya Agro Foods Ltd',
      buyerLocation: 'Bowenpally Wholesale Market, Hyderabad',
      offeredPrice,
      requestedQuantity,
      notes: buyerNotes
    });

    setSubmittedSuccess(true);
    setTimeout(() => {
      setBiddingListing(null);
      setSubmittedSuccess(false);
    }, 1800);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-stone-900 tracking-tight">
          Browse Direct Farmgate Crop Lots
        </h1>
        <p className="text-xs sm:text-sm text-stone-500">
          Source farm-fresh produce directly from smallholder farmers with verified quality grades
        </p>
      </div>

      {/* Search & Filter */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200/80 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="w-full sm:w-96 relative">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search by crop, variety, or district..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto text-xs font-bold">
          {['All', 'Tomato', 'Rice', 'Chilli', 'Cotton'].map(crop => (
            <button
              key={crop}
              onClick={() => setSelectedCropFilter(crop)}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                selectedCropFilter === crop ? 'bg-amber-600 text-white' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              {crop}
            </button>
          ))}
        </div>
      </div>

      {/* Listings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {activeListings.map((listing) => (
          <Card key={listing.id} className="p-4 flex flex-col justify-between" hoverable>
            <div className="space-y-3">
              <div className="relative h-44 rounded-xl overflow-hidden bg-stone-100">
                <img
                  src={listing.imageUrl}
                  alt={listing.crop}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 left-2">
                  <Badge variant="primary">{listing.qualityGrade}</Badge>
                </div>
                <div className="absolute bottom-2 right-2 bg-stone-900/80 text-white px-2.5 py-0.5 rounded-full text-[10px] font-bold">
                  {listing.quantity} {listing.quantityUnit} Lot
                </div>
              </div>

              <div>
                <h3 className="font-bold text-stone-900 text-base">{listing.crop}</h3>
                <p className="text-xs text-stone-500 font-medium">{listing.variety}</p>
                <p className="text-xs text-stone-600 flex items-center gap-1 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-stone-400" />
                  {listing.location}
                </p>
                <p className="text-xs text-stone-500 mt-0.5">Farmer: {listing.farmerName}</p>
              </div>

              <div className="p-2.5 bg-stone-50 rounded-xl border border-stone-100 flex items-center justify-between text-xs">
                <span className="text-stone-500">Asking Price:</span>
                <span className="font-black text-emerald-800 text-sm">₹{listing.expectedPrice}/qtl</span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-stone-100">
              <Button
                size="sm"
                variant="primary"
                className="w-full bg-amber-600 hover:bg-amber-700"
                onClick={() => handleOpenBidding(listing)}
              >
                Submit Price Offer
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Bidding Modal */}
      {biddingListing && (
        <Modal
          isOpen={!!biddingListing}
          onClose={() => setBiddingListing(null)}
          title={`Submit Offer for ${biddingListing.crop} (${biddingListing.variety})`}
          subtitle={`Farmer: ${biddingListing.farmerName} • Asking Price: ₹${biddingListing.expectedPrice}/qtl`}
          maxWidth="md"
        >
          {submittedSuccess ? (
            <div className="text-center py-6 space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto animate-bounce" />
              <h3 className="text-base font-bold text-stone-900">Counter-Offer Submitted to Farmer!</h3>
              <p className="text-xs text-stone-500">Farmer will receive an instant notification to review and accept your contract.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmitOffer} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Your Price Bid (₹/Qtl)</label>
                  <input
                    type="number"
                    min="100"
                    required
                    value={offeredPrice}
                    onChange={e => setOfferedPrice(Number(e.target.value))}
                    className="w-full px-3.5 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Requested Quantity (Qtl)</label>
                  <input
                    type="number"
                    min="1"
                    max={biddingListing.quantity}
                    required
                    value={requestedQuantity}
                    onChange={e => setRequestedQuantity(Number(e.target.value))}
                    className="w-full px-3.5 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Notes / Terms for Farmer</label>
                <textarea
                  rows={2}
                  value={buyerNotes}
                  onChange={e => setBuyerNotes(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs flex justify-between items-center">
                <span className="text-stone-500">Total Contract Value:</span>
                <span className="text-base font-black text-stone-900">
                  ₹{(offeredPrice * requestedQuantity).toLocaleString()}
                </span>
              </div>

              <div className="pt-3 border-t border-stone-200 flex items-center justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setBiddingListing(null)}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary" className="bg-amber-600 hover:bg-amber-700">
                  Submit Bid
                </Button>
              </div>
            </form>
          )}
        </Modal>
      )}
    </div>
  );
};
