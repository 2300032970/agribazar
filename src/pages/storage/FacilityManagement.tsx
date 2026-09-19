import React from 'react';
import { useStore } from '../../context/StoreContext';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { Warehouse, CheckCircle2 } from 'lucide-react';

export const FacilityManagement: React.FC = () => {
  const { storageFacilities } = useStore();

  return (
    <div className="space-y-6 pb-12">
      <div>
        <h1 className="text-2xl font-black text-stone-900 tracking-tight">
          Facility Bay Management
        </h1>
        <p className="text-xs sm:text-sm text-stone-500">
          Monitor refrigeration sensors, bay temperatures, and farmer occupancy allocations
        </p>
      </div>

      <div className="space-y-4">
        {storageFacilities.map((fac) => (
          <Card key={fac.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Badge variant="info">{fac.storageType}</Badge>
                {fac.isVerified && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
              </div>
              <h3 className="text-base font-bold text-stone-900 mt-1">{fac.facilityName}</h3>
              <p className="text-xs text-stone-500">
                Location: {fac.location} • Total: {fac.totalCapacityTonnes} Tonnes • Available: {fac.availableCapacityTonnes} Tonnes
              </p>
            </div>

            <div className="text-left sm:text-right shrink-0">
              <p className="text-base font-black text-stone-900">₹{fac.chargesPerQuintalPerMonth}/qtl/month</p>
              <Badge variant="success">Sensor Live (3.8°C)</Badge>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
