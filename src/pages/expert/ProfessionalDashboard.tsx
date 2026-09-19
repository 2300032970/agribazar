import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';
import { Card } from '../../components/common/Card';
import { StatCard } from '../../components/common/StatCard';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { GraduationCap, Users2, FileText, Video, CheckCircle2, Clock } from 'lucide-react';

export const ProfessionalDashboard: React.FC = () => {
  const { consultations, recommendations } = useStore();
  const navigate = useNavigate();

  return (
    <div className="space-y-6 pb-12">
      <div className="rounded-3xl bg-gradient-to-r from-blue-900 to-indigo-950 text-white p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-300 bg-blue-950 px-3 py-1 rounded-full border border-blue-700">
              Agronomist & Expert Portal
            </span>
            <h1 className="text-2xl sm:text-3xl font-black">
              Dr. K. Srinivas Rao, Ph.D.
            </h1>
            <p className="text-xs sm:text-sm text-blue-200">
              PJTSAU Agricultural Research Station, Warangal • Senior Plant Pathologist
            </p>
          </div>
          <Button
            variant="primary"
            className="bg-emerald-600 hover:bg-emerald-700 text-white shrink-0"
            icon={<Video className="w-4 h-4" />}
            onClick={() => navigate('/consultation/room/cons_1')}
          >
            Open Tele-Clinic Room
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard
          title="Active Queries"
          value={consultations.length}
          subtitle="Farmer appointments"
          icon={<Clock className="w-5 h-5" />}
          color="blue"
        />
        <StatCard
          title="Issued Prescriptions"
          value={recommendations.length}
          subtitle="Bio-input advisories"
          icon={<FileText className="w-5 h-5" />}
          color="emerald"
        />
        <StatCard
          title="Farmers Assisted"
          value="142"
          subtitle="Across Warangal"
          icon={<Users2 className="w-5 h-5" />}
          color="purple"
        />
        <StatCard
          title="Rating"
          value="4.9 ★"
          subtitle="Top rated expert"
          icon={<CheckCircle2 className="w-5 h-5" />}
          color="amber"
        />
      </div>

      {/* Consultation Requests */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-stone-900">Incoming Farmer Consultations</h2>
        <div className="space-y-3">
          {consultations.map((c) => (
            <Card key={c.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <img
                  src={c.cropImageUrl || 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=200'}
                  alt={c.cropName}
                  className="w-16 h-16 rounded-xl object-cover border border-stone-200 shrink-0"
                />
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-stone-900 text-base">{c.cropName}</h3>
                    <Badge variant="warning">{c.status}</Badge>
                  </div>
                  <p className="text-xs text-stone-500 font-medium">Farmer: {c.farmerName} • Slot: {c.timeSlot}</p>
                  <p className="text-xs text-stone-700 bg-stone-50 p-2 rounded-lg border border-stone-100">
                    "{c.issueDescription}"
                  </p>
                </div>
              </div>

              <Button
                variant="primary"
                icon={<Video className="w-4 h-4" />}
                onClick={() => navigate(`/consultation/room/${c.id}`)}
              >
                Join Consultation
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
