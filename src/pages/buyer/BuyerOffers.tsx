import React from 'react';
import { useStore } from '../../context/StoreContext';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { CheckCircle2, Clock, XCircle, Building2, PhoneCall } from 'lucide-react';

export const BuyerOffers: React.FC = () => {
  const { buyerOffers } = useStore();

  return (
    <div className="space-y-6 pb-12">
      <div>
        <h1 className="text-2xl font-black text-stone-900 tracking-tight">
          Buyer Purchase Offers & Contracts
        </h1>
        <p className="text-xs sm:text-sm text-stone-500">
          Track submitted purchase bids, farmer acceptance status, and procurement contracts
        </p>
      </div>

      <div className="space-y-4">
        {buyerOffers.map((offer) => (
          <Card key={offer.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-stone-900 bg-stone-100 px-2.5 py-0.5 rounded">
                  {offer.cropName}
                </span>
                <Badge variant={offer.status === 'Accepted' ? 'success' : offer.status === 'Pending' ? 'warning' : 'danger'}>
                  {offer.status}
                </Badge>
              </div>

              <h3 className="text-base font-bold text-stone-900 mt-1">
                Farmer: {offer.farmerName}
              </h3>
              <p className="text-xs text-stone-500">
                Quantity: {offer.requestedQuantity} Quintals • Bid: ₹{offer.offeredPrice}/qtl
              </p>
              <p className="text-xs text-stone-600 italic">"{offer.notes}"</p>
            </div>

            <div className="text-left sm:text-right shrink-0">
              <p className="text-[10px] uppercase font-bold text-stone-400">Total Purchase Value</p>
              <p className="text-xl font-black text-stone-900">₹{offer.totalOfferAmount.toLocaleString()}</p>
              <p className="text-[11px] text-stone-400 font-mono">{offer.createdAt}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
