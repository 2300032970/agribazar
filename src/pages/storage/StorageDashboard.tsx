import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';
import { Card } from '../../components/common/Card';
import { StatCard } from '../../components/common/StatCard';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { Warehouse, ThermometerSnowflake, CheckCircle2, TrendingUp } from 'lucide-react';

export const StorageDashboard: React.FC = () => {
  const { storageFacilities, storageBookings } = useStore();
  const navigate = useNavigate();

  return (
    <div className="space-y-6 pb-12">
      <div className="rounded-3xl bg-gradient-to-r from-cyan-900 to-stone-900 text-white p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-300 bg-cyan-950 px-3 py-1 rounded-full border border-cyan-700">
              Storage & Warehousing Provider Portal
            </span>
            <h1 className="text-2xl sm:text-3xl font-black">
              Deccan Cold Chain & Dry Warehouses Ltd
            </h1>
            <p className="text-xs sm:text-sm text-cyan-200">
              IDA Rampur, Warangal • Temperature-Controlled Multi-Commodity Cold Storage
            </p>
          </div>
          <Button
            variant="primary"
            className="bg-cyan-600 hover:bg-cyan-500 text-white shrink-0"
            onClick={() => navigate('/storage/facilities')}
          >
            Manage Facility Bays
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard
          title="Total Capacity"
          value="5,000 T"
          subtitle="Cold storage & dry bays"
          icon={<Warehouse className="w-5 h-5" />}
          color="blue"
        />
        <StatCard
          title="Available Space"
          value="1,420 T"
          subtitle="Ready to allocate"
          icon={<ThermometerSnowflake className="w-5 h-5" />}
          color="emerald"
        />
        <StatCard
          title="Active Bookings"
          value={storageBookings.length}
          subtitle="Farmer produce in store"
          icon={<TrendingUp className="w-5 h-5" />}
          color="amber"
        />
        <StatCard
          title="Cold Room Temp"
          value="3.8°C"
          subtitle="Optimal chill index"
          icon={<CheckCircle2 className="w-5 h-5" />}
          color="purple"
        />
      </div>

      {/* Facilities Overview */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-stone-900">Registered Facilities & Current Occupancy</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {storageFacilities.map((fac) => {
            const occupancy = Math.round(((fac.totalCapacityTonnes - fac.availableCapacityTonnes) / fac.totalCapacityTonnes) * 100);
            return (
              <Card key={fac.id} className="p-5 space-y-3">
                <Badge variant="info">{fac.storageType}</Badge>
                <h3 className="font-bold text-stone-900 text-base">{fac.facilityName}</h3>
                <p className="text-xs text-stone-500">{fac.location}</p>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-stone-600">
                    <span>Occupancy:</span>
                    <span className="font-bold">{occupancy}%</span>
                  </div>
                  <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-cyan-600 h-full" style={{ width: `${occupancy}%` }} />
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};
