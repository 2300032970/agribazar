import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { useLanguage } from '../../context/LanguageContext';
import { Vehicle, VehicleType, ShipmentStatus } from '../../types';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { 
  Truck, 
  MapPin, 
  Calendar, 
  Weight, 
  Clock, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight,
  PhoneCall,
  PlayCircle,
  Sparkles
} from 'lucide-react';

export const TransportBooking: React.FC = () => {
  const { 
    vehicles, 
    transportBookings, 
    addTransportBooking, 
    updateShipmentStatus 
  } = useStore();
  const { t } = useLanguage();

  const [pickup, setPickup] = useState('Ramesh Prakruthi Farm, Georai, Warangal');
  const [destination, setDestination] = useState('Bowenpally Wholesale Agricultural Market, Hyderabad');
  const [cropName, setCropName] = useState('Tomato (Vaishnavi F1)');
  const [quantityTonnes, setQuantityTonnes] = useState(4.0);
  const [selectedDate, setSelectedDate] = useState('2026-09-20');
  const [distanceKm, setDistanceKm] = useState(145);

  const [selectedVehicleToBook, setSelectedVehicleToBook] = useState<Vehicle | null>(null);
  const [activeBookingForTracking, setActiveBookingForTracking] = useState<any>(transportBookings[0] || null);

  const trackingSteps: ShipmentStatus[] = ['Requested', 'Confirmed', 'Picked Up', 'In Transit', 'Delivered'];

  // Filter vehicles with adequate capacity
  const matchingVehicles = vehicles.map(v => {
    const estFare = Math.round(v.baseRatePerKm * distanceKm);
    const hasCapacity = v.capacityTonnes >= quantityTonnes;
    return {
      ...v,
      estFare,
      hasCapacity
    };
  });

  const handleBookVehicle = (v: any) => {
    const newBooking = addTransportBooking({
      farmerId: 'usr_farmer_1',
      farmerName: 'Ramesh Kumar',
      providerId: v.providerId,
      providerName: v.providerName,
      vehicleType: v.vehicleType,
      cropName,
      quantityTonnes,
      pickupLocation: pickup,
      destinationLocation: destination,
      distanceKm,
      totalFare: v.estFare,
      scheduledDate: selectedDate
    });
    setSelectedVehicleToBook(null);
    setActiveBookingForTracking(newBooking);
  };

  const handleAdvanceTracking = (bookingId: string) => {
    if (!activeBookingForTracking) return;
    const currentIdx = trackingSteps.indexOf(activeBookingForTracking.status);
    if (currentIdx < trackingSteps.length - 1) {
      const nextStatus = trackingSteps[currentIdx + 1];
      const checkpoint = nextStatus === 'Picked Up' ? 'Farmgate Weighment Verified' :
                         nextStatus === 'In Transit' ? 'Crossed Jangaon Toll Plaza (45 km away)' :
                         'Arrived at Bowenpally Mandi Unloading Bay';
      updateShipmentStatus(bookingId, nextStatus, checkpoint);
      setActiveBookingForTracking((prev: any) => ({ ...prev, status: nextStatus, currentCheckpoint: checkpoint }));
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 bg-orange-100 text-orange-700 rounded-xl">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-stone-900 tracking-tight">
                {t('nav_transport', 'Agricultural Logistics & Transport')}
              </h1>
              <p className="text-xs sm:text-sm text-stone-500">
                Match verified tractors, mini-trucks and heavy carriers for farm-to-mandi dispatch
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Simulated Live Shipment Stepper Tracker */}
      {activeBookingForTracking && (
        <Card className="p-6 bg-gradient-to-r from-stone-900 to-stone-800 text-white shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-700 pb-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 bg-amber-950 px-2.5 py-0.5 rounded-full border border-amber-800">
                Live Shipment Tracker ({activeBookingForTracking.bookingCode})
              </span>
              <h3 className="text-xl font-black text-white mt-1">
                {activeBookingForTracking.cropName} ({activeBookingForTracking.quantityTonnes} Tonnes)
              </h3>
              <p className="text-xs text-stone-300">
                {activeBookingForTracking.pickupLocation.split(',')[0]} → {activeBookingForTracking.destinationLocation.split(',')[0]} ({activeBookingForTracking.distanceKm} km)
              </p>
            </div>

            {/* Advance Demo Tracking Trigger */}
            <Button
              size="sm"
              variant="primary"
              icon={<PlayCircle className="w-4 h-4 text-amber-300" />}
              onClick={() => handleAdvanceTracking(activeBookingForTracking.id)}
              disabled={activeBookingForTracking.status === 'Delivered'}
              className="bg-emerald-600 hover:bg-emerald-500 text-white shrink-0"
            >
              {activeBookingForTracking.status === 'Delivered' ? 'Delivery Complete' : 'Advance Tracking Demo Step'}
            </Button>
          </div>

          {/* Stepper Timeline */}
          <div className="grid grid-cols-5 gap-2 text-center">
            {trackingSteps.map((step, idx) => {
              const currentIdx = trackingSteps.indexOf(activeBookingForTracking.status);
              const isPast = idx < currentIdx;
              const isCurrent = idx === currentIdx;

              return (
                <div key={step} className="space-y-2">
                  <div className="flex items-center justify-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                        isPast
                          ? 'bg-emerald-500 text-white'
                          : isCurrent
                          ? 'bg-amber-400 text-stone-900 ring-4 ring-amber-400/30 font-black scale-110'
                          : 'bg-stone-700 text-stone-400'
                      }`}
                    >
                      {isPast ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                    </div>
                  </div>
                  <p className={`text-[11px] font-bold ${isCurrent ? 'text-amber-300' : isPast ? 'text-emerald-400' : 'text-stone-400'}`}>
                    {t(`tracking_${step.toLowerCase().replace(/ /g, '_')}`, step)}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="bg-stone-800/80 p-3.5 rounded-2xl border border-stone-700 text-xs flex items-center justify-between">
            <span className="text-stone-300">
              <span className="font-bold text-amber-300">Current Checkpoint:</span>{' '}
              {activeBookingForTracking.currentCheckpoint || 'Hub Assignment'}
            </span>
            <span className="text-emerald-400 font-mono font-semibold">
              Est: {activeBookingForTracking.estimatedArrival || 'On Schedule'}
            </span>
          </div>
        </Card>
      )}

      {/* Book New Vehicle Form & Instant Matcher */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Booking Form (4 cols) */}
        <div className="lg:col-span-4">
          <Card className="p-5 space-y-4 shadow-sm">
            <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider pb-2 border-b border-stone-100">
              Book Transport Parameters
            </h3>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Pickup Farm Location</label>
              <input
                type="text"
                value={pickup}
                onChange={e => setPickup(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Destination Mandi / Hub</label>
              <select
                value={destination}
                onChange={e => {
                  setDestination(e.target.value);
                  setDistanceKm(e.target.value.includes('Hyderabad') ? 145 : e.target.value.includes('Khammam') ? 110 : 18);
                }}
                className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="Bowenpally Wholesale Agricultural Market, Hyderabad">Bowenpally Mandi, Hyderabad (145 km)</option>
                <option value="Warangal Agricultural Market Committee">Warangal Mandi Yard (18 km)</option>
                <option value="Khammam Agricultural Mandi">Khammam Yard (110 km)</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Crop</label>
                <input
                  type="text"
                  value={cropName}
                  onChange={e => setCropName(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Quantity (Tonnes)</label>
                <input
                  type="number"
                  step="0.5"
                  min="0.5"
                  value={quantityTonnes}
                  onChange={e => setQuantityTonnes(Number(e.target.value))}
                  className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Dispatch Date</label>
              <input
                type="date"
                value={selectedDate}
                onChange={e => setSelectedDate(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </Card>
        </div>

        {/* Matching Vehicles Grid (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-stone-900">
              Matching Transport Providers ({matchingVehicles.length})
            </h3>
            <span className="text-xs text-stone-500">Based on {distanceKm} km route</span>
          </div>

          <div className="space-y-3">
            {matchingVehicles.map((v) => (
              <Card
                key={v.id}
                className={`p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border transition-all ${
                  v.hasCapacity ? 'border-stone-200 hover:border-emerald-400' : 'border-stone-200 opacity-60'
                }`}
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-black text-stone-900">{v.vehicleType}</span>
                    <Badge variant={v.hasCapacity ? 'primary' : 'warning'}>
                      Capacity: {v.capacityTonnes} Tonnes
                    </Badge>
                  </div>
                  <p className="text-xs font-mono text-stone-500">{v.vehicleNumber}</p>
                  <p className="text-xs font-semibold text-stone-700">{v.providerName}</p>
                  
                  <div className="flex items-center gap-4 text-xs text-stone-500 pt-1">
                    <span>Driver: {v.driverName}</span>
                    <span>•</span>
                    <span className="font-mono">{v.driverPhone}</span>
                    <span>•</span>
                    <span className="text-emerald-700 font-bold">₹{v.baseRatePerKm}/km</span>
                  </div>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end justify-between gap-3 shrink-0 pt-3 sm:pt-0 border-t sm:border-t-0 border-stone-100">
                  <div className="text-left sm:text-right">
                    <p className="text-[10px] uppercase font-bold text-stone-400">Total Est. Fare</p>
                    <p className="text-2xl font-black text-stone-900">₹{v.estFare.toLocaleString()}</p>
                  </div>

                  <Button
                    size="sm"
                    variant={v.hasCapacity ? 'primary' : 'outline'}
                    disabled={!v.hasCapacity}
                    onClick={() => handleBookVehicle(v)}
                  >
                    {v.hasCapacity ? 'Book Vehicle' : 'Volume Exceeds'}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
