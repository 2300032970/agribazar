import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Vehicle, VehicleType } from '../../types';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { Truck, Plus, CheckCircle2 } from 'lucide-react';

export const FleetManagement: React.FC = () => {
  const { vehicles, addVehicle } = useStore();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [vehicleType, setVehicleType] = useState<VehicleType>('Mini Truck');
  const [vehicleNumber, setVehicleNumber] = useState('TS 03 UA 8899');
  const [capacityTonnes, setCapacityTonnes] = useState(3.0);
  const [baseRatePerKm, setBaseRatePerKm] = useState(26);
  const [driverName, setDriverName] = useState('Anji Reddy');
  const [driverPhone, setDriverPhone] = useState('+91 98481 55667');

  const handleAddVehicle = (e: React.FormEvent) => {
    e.preventDefault();
    addVehicle({
      providerId: 'usr_transport_1',
      providerName: 'Sri Balaji Agri Logistics',
      vehicleType,
      vehicleNumber,
      capacityTonnes,
      baseRatePerKm,
      location: 'Warangal NH 163',
      isAvailable: true,
      driverName,
      driverPhone,
      rating: 4.8
    });
    setIsAddModalOpen(false);
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-stone-900 tracking-tight">
            Logistics Fleet Management
          </h1>
          <p className="text-xs sm:text-sm text-stone-500">
            Register transport assets, manage capacities and set per-kilometer rates
          </p>
        </div>
        <Button
          variant="primary"
          icon={<Plus className="w-4 h-4" />}
          onClick={() => setIsAddModalOpen(true)}
        >
          Add Vehicle to Fleet
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {vehicles.map((v) => (
          <Card key={v.id} className="p-5 space-y-3">
            <div className="flex items-center justify-between">
              <Badge variant="neutral">{v.vehicleType}</Badge>
              <Badge variant="success">Available</Badge>
            </div>
            <h3 className="font-bold text-stone-900 text-base">{v.vehicleNumber}</h3>
            <div className="space-y-1 text-xs text-stone-600 bg-stone-50 p-3 rounded-xl border border-stone-100">
              <p><span className="font-bold text-stone-800">Payload Capacity:</span> {v.capacityTonnes} Tonnes</p>
              <p><span className="font-bold text-stone-800">Rate:</span> ₹{v.baseRatePerKm} / km</p>
              <p><span className="font-bold text-stone-800">Driver:</span> {v.driverName} ({v.driverPhone})</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Add Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add Vehicle to Fleet"
        maxWidth="md"
      >
        <form onSubmit={handleAddVehicle} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">Vehicle Type</label>
            <select
              value={vehicleType}
              onChange={e => setVehicleType(e.target.value as any)}
              className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="Tractor Trolley">Tractor Trolley</option>
              <option value="Mini Truck">Mini Truck (Tata Ace / Bolero)</option>
              <option value="Lorry / Truck">Lorry / Heavy Truck</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Registration Number</label>
              <input
                type="text"
                required
                value={vehicleNumber}
                onChange={e => setVehicleNumber(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Capacity (Tonnes)</label>
              <input
                type="number"
                step="0.5"
                min="0.5"
                required
                value={capacityTonnes}
                onChange={e => setCapacityTonnes(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Rate per Km (₹)</label>
              <input
                type="number"
                min="10"
                required
                value={baseRatePerKm}
                onChange={e => setBaseRatePerKm(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Driver Name</label>
              <input
                type="text"
                required
                value={driverName}
                onChange={e => setDriverName(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div className="pt-3 border-t border-stone-200 flex items-center justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Register Vehicle
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
