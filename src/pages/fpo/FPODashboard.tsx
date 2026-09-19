import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';
import { Card } from '../../components/common/Card';
import { StatCard } from '../../components/common/StatCard';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { Users2, Layers, ShoppingBag, CheckCircle2, TrendingUp, Plus } from 'lucide-react';

export const FPODashboard: React.FC = () => {
  const { fpos } = useStore();
  const navigate = useNavigate();
  const currentFpo = fpos[0];

  return (
    <div className="space-y-6 pb-12">
      <div className="rounded-3xl bg-gradient-to-r from-teal-900 to-emerald-950 text-white p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-300 bg-teal-950 px-3 py-1 rounded-full border border-teal-700">
              Farmer Producer Organization (FPO) Portal
            </span>
            <h1 className="text-2xl sm:text-3xl font-black">{currentFpo.name}</h1>
            <p className="text-xs sm:text-sm text-teal-200">
              {currentFpo.location} • {currentFpo.memberFarmersCount} Shareholder Farmer Members
            </p>
          </div>
          <Button
            variant="primary"
            className="bg-teal-600 hover:bg-teal-500 text-white shrink-0"
            onClick={() => navigate('/buyer/crops')}
          >
            Connect with Corporate Buyers
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard
          title="Member Farmers"
          value={currentFpo.memberFarmersCount}
          subtitle="Enrolled smallholders"
          icon={<Users2 className="w-5 h-5" />}
          color="teal"
        />
        <StatCard
          title="Aggregation Drives"
          value={currentFpo.activeAggregationDrives.length}
          subtitle="Active collective pools"
          icon={<Layers className="w-5 h-5" />}
          color="emerald"
        />
        <StatCard
          title="Volume Pooled"
          value="855 Qtl"
          subtitle="Tomato & Rice"
          icon={<TrendingUp className="w-5 h-5" />}
          color="amber"
        />
        <StatCard
          title="Status"
          value="Verified"
          subtitle="NABARD / SFAC"
          icon={<CheckCircle2 className="w-5 h-5" />}
          color="blue"
        />
      </div>

      {/* Active Aggregation Drives */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-stone-900">Active Crop Aggregation Quotas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {currentFpo.activeAggregationDrives.map((d) => {
            const percent = Math.round((d.collectedQuintals / d.targetQuintals) * 100);
            return (
              <Card key={d.id} className="p-5 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-stone-900 text-base">{d.crop}</h3>
                    <p className="text-xs text-stone-500">Closing Date: {d.closingDate}</p>
                  </div>
                  <Badge variant="primary">Target: ₹{d.targetPricePerQtl}/qtl</Badge>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs text-stone-600">
                    <span>Progress: {d.collectedQuintals} / {d.targetQuintals} Qtl</span>
                    <span className="font-bold text-emerald-800">{percent}% Pooled</span>
                  </div>
                  <div className="w-full bg-stone-100 h-2.5 rounded-full overflow-hidden">
                    <div
                      className="bg-emerald-600 h-full rounded-full transition-all"
                      style={{ width: `${percent}%` }}
                    />
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
