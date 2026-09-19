import React from 'react';
import { Card } from './Card';
import clsx from 'clsx';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  color?: 'emerald' | 'amber' | 'blue' | 'rose' | 'purple' | 'teal';
  onClick?: () => void;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  trend,
  color = 'emerald',
  onClick
}) => {
  const iconBgClasses = {
    emerald: 'bg-emerald-100 text-emerald-700',
    amber: 'bg-amber-100 text-amber-700',
    blue: 'bg-sky-100 text-sky-700',
    rose: 'bg-rose-100 text-rose-700',
    purple: 'bg-purple-100 text-purple-700',
    teal: 'bg-teal-100 text-teal-700'
  };

  return (
    <Card
      hoverable={!!onClick}
      onClick={onClick}
      className="p-5 flex flex-col justify-between"
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-xs font-semibold text-stone-500 uppercase tracking-wider">{title}</p>
          <p className="text-2xl font-black text-stone-900 tracking-tight">{value}</p>
        </div>
        <div className={clsx("p-3 rounded-2xl shadow-sm shrink-0", iconBgClasses[color])}>
          {icon}
        </div>
      </div>
      {(subtitle || trend) && (
        <div className="mt-3 pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
          {subtitle && <span className="text-stone-500">{subtitle}</span>}
          {trend && (
            <span className={clsx("font-semibold flex items-center gap-0.5", trend.isPositive ? "text-emerald-600" : "text-rose-600")}>
              {trend.isPositive ? '↑' : '↓'} {trend.value}
            </span>
          )}
        </div>
      )}
    </Card>
  );
};
