import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';
import { useLanguage } from '../../context/LanguageContext';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { 
  Users2, 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  CheckCircle2, 
  Layers, 
  ArrowRight,
  TrendingUp,
  Sparkles
} from 'lucide-react';

export const FPODiscovery: React.FC = () => {
  const { fpos, addNotification } = useStore();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const [selectedFpoForPooling, setSelectedFpoForPooling] = useState<any>(null);
  const [poolingCrop, setPoolingCrop] = useState('Tomato (Processing Grade)');
  const [poolingQuantity, setPoolingQuantity] = useState(25);
  const [joinedSuccess, setJoinedSuccess] = useState(false);

  const handleJoinDrive = (e: React.FormEvent) => {
    e.preventDefault();
    setJoinedSuccess(true);
    addNotification({
      userId: 'usr_farmer_1',
      type: 'sync',
      title: 'Joined FPO Crop Aggregation Drive',
      message: `Pledged ${poolingQuantity} quintals of ${poolingCrop} with ${selectedFpoForPooling.name}.`
    });
    setTimeout(() => {
      setSelectedFpoForPooling(null);
      setJoinedSuccess(false);
    }, 1800);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 bg-teal-100 text-teal-700 rounded-xl">
              <Users2 className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-stone-900 tracking-tight">
                {t('nav_fpos', 'Farmer Producer Organizations (FPOs)')}
              </h1>
              <p className="text-xs sm:text-sm text-stone-500">
                Connect with local cooperatives, pool collective produce, and access bulk buyer contracts
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FPO Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {fpos.map((fpo) => (
          <Card key={fpo.id} className="p-6 space-y-5 border-stone-200/90 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-stone-900">{fpo.name}</h3>
                  {fpo.verificationStatus === 'Verified' && (
                    <Badge variant="success" dot>Govt Verified</Badge>
                  )}
                </div>
                <p className="text-xs text-stone-500 mt-0.5">Reg: {fpo.registrationNumber}</p>
                <p className="text-xs text-stone-600 flex items-center gap-1 mt-1 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-stone-400" />
                  {fpo.location}, {fpo.state}
                </p>
              </div>

              <div className="text-right p-3 bg-teal-50 rounded-2xl border border-teal-100 shrink-0">
                <p className="text-[10px] uppercase font-bold text-teal-800">Members</p>
                <p className="text-xl font-black text-teal-900">{fpo.memberFarmersCount}+</p>
              </div>
            </div>

            {/* Services List */}
            <div className="space-y-1.5 text-xs text-stone-700 bg-stone-50 p-3.5 rounded-2xl border border-stone-100">
              <p className="font-bold text-stone-800 uppercase tracking-wider text-[11px] mb-1">
                FPO Services & Facilities:
              </p>
              {fpo.services.map((svc, i) => (
                <div key={i} className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{svc}</span>
                </div>
              ))}
            </div>

            {/* Active Aggregation Drives */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-stone-800 uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-emerald-600" />
                Active Crop Aggregation Drives:
              </h4>
              
              <div className="space-y-2.5">
                {fpo.activeAggregationDrives.map((drive) => {
                  const percent = Math.round((drive.collectedQuintals / drive.targetQuintals) * 100);
                  return (
                    <div key={drive.id} className="p-3 bg-emerald-50/50 rounded-xl border border-emerald-100 text-xs space-y-1.5">
                      <div className="flex justify-between font-bold text-stone-900">
                        <span>{drive.crop}</span>
                        <span className="text-emerald-800">Target: ₹{drive.targetPricePerQtl.toLocaleString()}/qtl</span>
                      </div>
                      
                      {/* Progress Bar */}
                      <div className="w-full bg-stone-200 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-emerald-600 h-full rounded-full transition-all"
                          style={{ width: `${percent}%` }}
                        />
                      </div>

                      <div className="flex justify-between text-[11px] text-stone-500">
                        <span>Pooled: {drive.collectedQuintals} / {drive.targetQuintals} Qtl ({percent}%)</span>
                        <span>Closing: {drive.closingDate}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Contact & Join Action */}
            <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-3 text-xs">
              <div className="text-stone-500">
                <p className="font-bold text-stone-800">{fpo.contactPerson}</p>
                <p className="text-[11px] font-mono">{fpo.phone}</p>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => navigate('/messages')}
                >
                  Message FPO
                </Button>
                <Button
                  size="sm"
                  variant="primary"
                  onClick={() => setSelectedFpoForPooling(fpo)}
                >
                  Join Aggregation Drive
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Join Aggregation Drive Modal */}
      {selectedFpoForPooling && (
        <Modal
          isOpen={!!selectedFpoForPooling}
          onClose={() => setSelectedFpoForPooling(null)}
          title={`Join Collective Aggregation Drive`}
          subtitle={`With ${selectedFpoForPooling.name}`}
          maxWidth="md"
        >
          {joinedSuccess ? (
            <div className="text-center py-6 space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto animate-bounce" />
              <h3 className="text-base font-bold text-stone-900">Crop Quantity Successfully Pledged!</h3>
              <p className="text-xs text-stone-500">The FPO coordinator will contact you for lot quality inspection and transport pooling.</p>
            </div>
          ) : (
            <form onSubmit={handleJoinDrive} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Select Aggregation Campaign</label>
                <select
                  value={poolingCrop}
                  onChange={e => setPoolingCrop(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                >
                  {selectedFpoForPooling.activeAggregationDrives.map((d: any) => (
                    <option key={d.id} value={d.crop}>
                      {d.crop} (Target: ₹{d.targetPricePerQtl}/qtl)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Pledged Quantity (Quintals)</label>
                <input
                  type="number"
                  min="5"
                  required
                  value={poolingQuantity}
                  onChange={e => setPoolingQuantity(Number(e.target.value))}
                  className="w-full px-3.5 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs text-stone-600">
                <span className="font-bold text-stone-800">Benefit:</span> Bulk aggregation guarantees minimum base price and eliminates middleman mandi commission.
              </div>

              <div className="pt-3 border-t border-stone-200 flex items-center justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setSelectedFpoForPooling(null)}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary">
                  Confirm Pledging
                </Button>
              </div>
            </form>
          )}
        </Modal>
      )}
    </div>
  );
};
