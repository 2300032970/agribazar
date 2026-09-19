import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { Video, Calendar, Clock, CheckCircle2 } from 'lucide-react';

export const ConsultationsList: React.FC = () => {
  const { consultations } = useStore();
  const navigate = useNavigate();

  return (
    <div className="space-y-6 pb-12">
      <div>
        <h1 className="text-2xl font-black text-stone-900 tracking-tight">
          Agronomist Tele-Consultation Queue
        </h1>
        <p className="text-xs sm:text-sm text-stone-500">
          Scheduled video diagnostic sessions and historical recommendations
        </p>
      </div>

      <div className="space-y-4">
        {consultations.map((c) => (
          <Card key={c.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Badge variant={c.status === 'Completed' ? 'success' : 'warning'}>{c.status}</Badge>
                <span className="text-xs font-mono text-stone-400">{c.date} • {c.timeSlot}</span>
              </div>
              <h3 className="text-base font-bold text-stone-900 mt-1">
                {c.cropName} (Farmer: {c.farmerName})
              </h3>
              <p className="text-xs text-stone-600">{c.issueDescription}</p>
            </div>

            <Button
              variant="primary"
              icon={<Video className="w-4 h-4" />}
              onClick={() => navigate(`/consultation/room/${c.id}`)}
            >
              Enter Clinic Room
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};
