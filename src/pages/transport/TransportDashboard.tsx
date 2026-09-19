import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';
import { Card } from '../../components/common/Card';
import { StatCard } from '../../components/common/StatCard';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { Truck, MapPin, CheckCircle2, PlayCircle, Clock } from 'lucide-react';

export const TransportDashboard: React.FC = () => {
  const { vehicles, transportBookings, updateShipmentStatus } = useStore();
  const navigate = useNavigate();

  return (
    <div className="space-y-6 pb-12">
      <div className="rounded-3xl bg-gradient-to-r from-orange-900 to-stone-900 text-white p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-orange-300 bg-orange-950 px-3 py-1 rounded-full border border-orange-700">
              Transport Logistics Hub
            </span>
            <h1 className="text-2xl sm:text-3xl font-black">
              Sri Balaji Agri Logistics (Mahesh Yadav)
            </h1>
            <p className="text-xs sm:text-sm text-orange-200">
              NH 163 Bypass, Warangal • Farmgate Pickup & Wholesale Mandi Transit
            </p>
          </div>
          <Button
            variant="primary"
            className="bg-orange-600 hover:bg-orange-500 text-white shrink-0"
            onClick={() => navigate('/transport/fleet')}
          >
            Manage Vehicle Fleet ({vehicles.length})
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard
          title="Active Vehicles"
          value={vehicles.length}
          subtitle="Tractors & mini-trucks"
          icon={<Truck className="w-5 h-5" />}
          color="amber"
          onClick={() => navigate('/transport/fleet')}
        />
        <StatCard
          title="Trip Bookings"
          value={transportBookings.length}
          subtitle="Active & completed"
          icon={<Clock className="w-5 h-5" />}
          color="blue"
        />
        <StatCard
          title="In Transit Now"
          value={transportBookings.filter(b => b.status === 'In Transit').length}
          subtitle="Live tracking enabled"
          icon={<PlayCircle className="w-5 h-5" />}
          color="emerald"
        />
        <StatCard
          title="Driver Rating"
          value="4.8 ★"
          subtitle="Verified logistics"
          icon={<CheckCircle2 className="w-5 h-5" />}
          color="purple"
        />
      </div>

      {/* Trips List */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-stone-900">Farmer Dispatch Trips</h2>
        <div className="space-y-3">
          {transportBookings.map((b) => (
            <Card key={b.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-stone-800 bg-stone-100 px-2 py-0.5 rounded">
                    {b.bookingCode}
                  </span>
                  <Badge variant={b.status === 'Delivered' ? 'success' : 'warning'}>{b.status}</Badge>
                </div>
                <h3 className="font-bold text-stone-900 text-base">
                  {b.cropName} ({b.quantityTonnes} Tonnes)
                </h3>
                <p className="text-xs text-stone-500">
                  {b.pickupLocation.split(',')[0]} → {b.destinationLocation.split(',')[0]} ({b.distanceKm} km)
                </p>
                <p className="text-xs text-emerald-700 font-semibold">Checkpoint: {b.currentCheckpoint}</p>
              </div>

              <div className="text-left sm:text-right shrink-0">
                <p className="text-lg font-black text-stone-900">₹{b.totalFare.toLocaleString()}</p>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => navigate('/farmer/transport')}
                  className="mt-1"
                >
                  View Live Tracking Stepper
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
