import React from 'react';
import clsx from 'clsx';

interface BadgeProps {
  variant?: 'success' | 'warning' | 'danger' | 'info' | 'neutral' | 'primary';
  size?: 'sm' | 'md';
  dot?: boolean;
  children: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'neutral',
  size = 'md',
  dot = false,
  children,
  className
}) => {
  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-2.5 py-1 text-xs font-medium"
  };

  const variantClasses = {
    primary: "bg-emerald-100 text-emerald-800 border border-emerald-200",
    success: "bg-green-100 text-green-800 border border-green-200",
    warning: "bg-amber-100 text-amber-900 border border-amber-200",
    danger: "bg-rose-100 text-rose-800 border border-rose-200",
    info: "bg-sky-100 text-sky-800 border border-sky-200",
    neutral: "bg-stone-100 text-stone-700 border border-stone-200"
  };

  const dotColors = {
    primary: "bg-emerald-500",
    success: "bg-green-500",
    warning: "bg-amber-500",
    danger: "bg-rose-500",
    info: "bg-sky-500",
    neutral: "bg-stone-400"
  };

  return (
    <span className={clsx("inline-flex items-center gap-1.5 rounded-full", sizeClasses[size], variantClasses[variant], className)}>
      {dot && <span className={clsx("w-1.5 h-1.5 rounded-full shrink-0", dotColors[variant])} />}
      {children}
    </span>
  );
};
