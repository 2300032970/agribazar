import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';
import { useLanguage } from '../../context/LanguageContext';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { 
  Bell, 
  CheckCircle2, 
  AlertTriangle, 
  Truck, 
  GraduationCap, 
  BadgePercent, 
  ReceiptText,
  Clock
} from 'lucide-react';

export const NotificationsPage: React.FC = () => {
  const { notifications, markNotificationAsRead } = useStore();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const getIcon = (type: string) => {
    switch (type) {
      case 'disease_alert':
        return <AlertTriangle className="w-5 h-5 text-rose-600" />;
      case 'buyer_offer':
        return <BadgePercent className="w-5 h-5 text-purple-600" />;
      case 'transport':
        return <Truck className="w-5 h-5 text-orange-600" />;
      case 'consultation':
      case 'recommendation':
        return <GraduationCap className="w-5 h-5 text-blue-600" />;
      default:
        return <CheckCircle2 className="w-5 h-5 text-emerald-600" />;
    }
  };

  return (
    <div className="space-y-6 pb-12 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-stone-900 tracking-tight">
            {t('nav_notifications', 'Notification Center')}
          </h1>
          <p className="text-xs sm:text-sm text-stone-500">
            Real-time disease diagnostics, buyer contract bids, dispatch milestones, and advisory alerts
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {notifications.map((n) => (
          <Card
            key={n.id}
            hoverable
            onClick={() => {
              markNotificationAsRead(n.id);
              if (n.linkUrl) navigate(n.linkUrl);
            }}
            className={`p-4 flex items-start gap-4 transition-all ${
              !n.isRead ? 'border-l-4 border-l-emerald-600 bg-emerald-50/20' : 'opacity-85'
            }`}
          >
            <div className="p-2.5 rounded-2xl bg-stone-100 shrink-0">
              {getIcon(n.type)}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <h3 className={`text-sm ${!n.isRead ? 'font-black text-stone-900' : 'font-bold text-stone-700'}`}>
                  {n.title}
                </h3>
                <span className="text-[10px] text-stone-400 shrink-0">{n.timestamp}</span>
              </div>
              <p className="text-xs text-stone-600 mt-1 leading-relaxed">{n.message}</p>
            </div>

            {!n.isRead && (
              <span className="w-2 h-2 rounded-full bg-emerald-600 shrink-0 mt-2" />
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};
