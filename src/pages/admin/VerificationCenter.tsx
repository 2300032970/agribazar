import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { ShieldCheck, CheckCircle2, XCircle, FileText, UserCheck } from 'lucide-react';

export const VerificationCenter: React.FC = () => {
  const { professionals, verifyEntity } = useStore();
  const [toast, setToast] = useState<string | null>(null);

  const pendingVerificationItems = [
    {
      id: 'pro_pending_1',
      type: 'professional' as const,
      name: 'Dr. Rameshchandra Murthy',
      roleLabel: 'Agronomist / Entomologist',
      credentials: 'Ph.D. in Entomology, ANGRAU Tirupati (Degree Cert #2019/8812)',
      location: 'Nizamabad, Telangana',
      status: 'Pending'
    },
    {
      id: 'seller_pending_1',
      type: 'seller' as const,
      name: 'Rythu Seva Agro Bio-Inputs',
      roleLabel: 'Certified Seed & Bio-fertilizer Retailer',
      credentials: 'Govt Seed Distribution License #TS-WGL-SEED-2024-912',
      location: 'Kazipet, Warangal',
      status: 'Pending'
    },
    {
      id: 'storage_pending_1',
      type: 'storage' as const,
      name: 'Warangal Mega Cold Storage Yard',
      roleLabel: 'Cold Storage Provider',
      credentials: 'FSSAI License #10020047001481 • 4,000 Tonnes Ammonia Chilling Bay',
      location: 'Enumamula Market Yard',
      status: 'Pending'
    }
  ];

  const [items, setItems] = useState(pendingVerificationItems);

  const handleAction = (item: typeof pendingVerificationItems[0], approve: boolean) => {
    setItems(prev => prev.filter(i => i.id !== item.id));
    verifyEntity(item.type, item.id, approve);
    setToast(`${item.name} credentials have been ${approve ? 'VERIFIED' : 'REJECTED'}.`);
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="space-y-6 pb-12">
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-stone-900 text-white px-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-2 text-xs font-bold animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toast}</span>
        </div>
      )}

      <div>
        <h1 className="text-2xl font-black text-stone-900 tracking-tight">
          Stakeholder Verification Center
        </h1>
        <p className="text-xs sm:text-sm text-stone-500">
          Verify government licenses, educational degrees, and warehouse standards for platform participants
        </p>
      </div>

      <div className="space-y-4">
        {items.length === 0 ? (
          <Card className="p-12 text-center text-stone-500 space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
            <h3 className="text-base font-bold text-stone-800">All Verifications Cleared</h3>
            <p className="text-xs">No pending credentials requiring administrator review.</p>
          </Card>
        ) : (
          items.map((item) => (
            <Card key={item.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-l-4 border-l-amber-500">
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-2">
                  <Badge variant="warning">{item.roleLabel}</Badge>
                  <span className="text-xs font-mono text-stone-400">Application #{item.id}</span>
                </div>
                <h3 className="text-base font-bold text-stone-900">{item.name}</h3>
                <p className="text-xs text-stone-500">{item.location}</p>
                <div className="p-2.5 bg-stone-50 rounded-xl border border-stone-200 text-xs text-stone-700 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-stone-400 shrink-0" />
                  <span>{item.credentials}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0 pt-2 sm:pt-0">
                <Button
                  size="sm"
                  variant="outline"
                  icon={<XCircle className="w-4 h-4 text-rose-600" />}
                  onClick={() => handleAction(item, false)}
                >
                  Reject
                </Button>
                <Button
                  size="sm"
                  variant="primary"
                  icon={<CheckCircle2 className="w-4 h-4 text-emerald-300" />}
                  onClick={() => handleAction(item, true)}
                >
                  Verify & Approve
                </Button>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};
