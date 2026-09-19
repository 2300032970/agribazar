import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { useLanguage } from '../../context/LanguageContext';
import { StorageFacility } from '../../types';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { 
  Warehouse, 
  MapPin, 
  CheckCircle2, 
  ThermometerSnowflake, 
  ShieldCheck, 
  Calendar, 
  Layers
} from 'lucide-react';

export const StorageDiscovery: React.FC = () => {
  const { storageFacilities, storageBookings, addStorageBooking } = useStore();
  const { t } = useLanguage();

  const [filterType, setFilterType] = useState<string>('All');
  const [selectedFacilityForBooking, setSelectedFacilityForBooking] = useState<StorageFacility | null>(null);
  const [cropToStore, setCropToStore] = useState('Chilli (Dry Teja)');
  const [quantityQtl, setQuantityQtl] = useState(30);
  const [durationMonths, setDurationMonths] = useState(3);
  const [startDate, setStartDate] = useState('2026-09-25');
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const filteredFacilities = storageFacilities.filter(f => 
    filterType === 'All' || f.storageType === filterType
  );

  const handleConfirmStorage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFacilityForBooking) return;

    const total = quantityQtl * durationMonths * selectedFacilityForBooking.chargesPerQuintalPerMonth;
    addStorageBooking({
      farmerId: 'usr_farmer_1',
      farmerName: 'Ramesh Kumar',
      facilityId: selectedFacilityForBooking.id,
      facilityName: selectedFacilityForBooking.facilityName,
      cropName: cropToStore,
      quantityQuintals: quantityQtl,
      durationMonths,
      totalCost: total,
      startDate
    });

    setBookingSuccess(true);
    setTimeout(() => {
      setSelectedFacilityForBooking(null);
      setBookingSuccess(false);
    }, 1800);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 bg-cyan-100 text-cyan-700 rounded-xl">
              <Warehouse className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-stone-900 tracking-tight">
                {t('nav_storage', 'Cold Storage & Warehousing Facilities')}
              </h1>
              <p className="text-xs sm:text-sm text-stone-500">
                Prevent post-harvest distress sales by reserving climate-controlled cold storage and grain silos
              </p>
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center bg-stone-100 p-1 rounded-xl border border-stone-200 text-xs font-bold">
          {['All', 'Cold Storage', 'Dry Ventilated Warehouse', 'Grain Silo'].map(type => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                filterType === type ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              {type === 'Dry Ventilated Warehouse' ? 'Warehouse' : type}
            </button>
          ))}
        </div>
      </div>

      {/* Facilities Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {filteredFacilities.map((fac) => {
          const occupancy = Math.round(((fac.totalCapacityTonnes - fac.availableCapacityTonnes) / fac.totalCapacityTonnes) * 100);

          return (
            <Card key={fac.id} className="p-5 space-y-4 border-stone-200/90 shadow-sm flex flex-col justify-between" hoverable>
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <Badge variant={fac.storageType === 'Cold Storage' ? 'info' : 'neutral'}>
                      {fac.storageType}
                    </Badge>
                    <h3 className="font-bold text-stone-900 text-base mt-1.5">{fac.facilityName}</h3>
                    <p className="text-xs text-stone-500 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-stone-400" />
                      {fac.location}
                    </p>
                  </div>
                  {fac.isVerified && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
                </div>

                {/* Capacity Progress Bar */}
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-100 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-stone-500">Occupancy Rate:</span>
                    <span className="font-bold text-stone-900">{occupancy}% Full</span>
                  </div>
                  <div className="w-full bg-stone-200 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-emerald-600 h-full rounded-full"
                      style={{ width: `${occupancy}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[11px] text-stone-500 pt-0.5">
                    <span>Available: {fac.availableCapacityTonnes} Tonnes</span>
                    <span>Total: {fac.totalCapacityTonnes} T</span>
                  </div>
                </div>

                {/* Badges */}
                <div className="flex flex-wrap gap-1.5 text-[11px]">
                  {fac.temperatureControlled && (
                    <span className="bg-sky-50 text-sky-800 border border-sky-200 px-2 py-0.5 rounded-md font-semibold flex items-center gap-1">
                      <ThermometerSnowflake className="w-3 h-3 text-sky-600" /> Chilled 2°C - 8°C
                    </span>
                  )}
                  {fac.subsidyAvailable && (
                    <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-md font-semibold">
                      NABARD Subsidy Eligible
                    </span>
                  )}
                </div>
              </div>

              {/* Footer */}
              <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                <div>
                  <p className="text-[10px] uppercase font-bold text-stone-400">Monthly Charges</p>
                  <p className="text-lg font-black text-stone-900">₹{fac.chargesPerQuintalPerMonth}<span className="text-xs text-stone-500 font-normal"> /qtl/mo</span></p>
                </div>
                <Button
                  size="sm"
                  variant="primary"
                  onClick={() => setSelectedFacilityForBooking(fac)}
                >
                  Reserve Space
                </Button>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Active Storage Bookings Summary */}
      {storageBookings.length > 0 && (
        <div className="space-y-3 pt-6 border-t border-stone-200">
          <h2 className="text-lg font-bold text-stone-900">Your Active Storage Reservations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {storageBookings.map((b) => (
              <Card key={b.id} className="p-4 flex items-center justify-between gap-4 border-l-4 border-l-cyan-600">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-cyan-800 bg-cyan-50 px-2 py-0.5 rounded">
                      {b.bookingCode}
                    </span>
                    <Badge variant="success">Active Storage</Badge>
                  </div>
                  <h4 className="font-bold text-stone-900 text-sm">{b.facilityName}</h4>
                  <p className="text-xs text-stone-500">
                    Stored: {b.quantityQuintals} Quintals of {b.cropName} • Duration: {b.durationMonths} Months
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-base font-black text-stone-900">₹{b.totalCost.toLocaleString()}</p>
                  <p className="text-[11px] text-stone-400">Since {b.startDate}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Booking Modal */}
      {selectedFacilityForBooking && (
        <Modal
          isOpen={!!selectedFacilityForBooking}
          onClose={() => setSelectedFacilityForBooking(null)}
          title="Reserve Storage Capacity"
          subtitle={`At ${selectedFacilityForBooking.facilityName}`}
          maxWidth="md"
        >
          {bookingSuccess ? (
            <div className="text-center py-6 space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto animate-bounce" />
              <h3 className="text-base font-bold text-stone-900">Storage Bay Confirmed!</h3>
              <p className="text-xs text-stone-500">Receipt generated and sent to your farm ledger.</p>
            </div>
          ) : (
            <form onSubmit={handleConfirmStorage} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Crop to Store</label>
                <input
                  type="text"
                  required
                  value={cropToStore}
                  onChange={e => setCropToStore(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Quantity (Quintals)</label>
                  <input
                    type="number"
                    min="5"
                    required
                    value={quantityQtl}
                    onChange={e => setQuantityQtl(Number(e.target.value))}
                    className="w-full px-3.5 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Duration (Months)</label>
                  <input
                    type="number"
                    min="1"
                    max="12"
                    required
                    value={durationMonths}
                    onChange={e => setDurationMonths(Number(e.target.value))}
                    className="w-full px-3.5 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs flex justify-between items-center">
                <span className="text-stone-500">Calculated Charge:</span>
                <span className="text-base font-black text-stone-900">
                  ₹{(quantityQtl * durationMonths * selectedFacilityForBooking.chargesPerQuintalPerMonth).toLocaleString()}
                </span>
              </div>

              <div className="pt-3 border-t border-stone-200 flex items-center justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setSelectedFacilityForBooking(null)}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary">
                  Confirm & Reserve Space
                </Button>
              </div>
            </form>
          )}
        </Modal>
      )}
    </div>
  );
};
