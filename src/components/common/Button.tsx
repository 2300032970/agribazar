import React from 'react';
import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'success' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  icon,
  children,
  className,
  disabled,
  ...props
}) => {
  const baseClasses = "inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer select-none";

  const sizeClasses = {
    sm: "px-3 py-1.5 text-xs font-semibold gap-1.5",
    md: "px-4 py-2 text-sm gap-2 shadow-sm",
    lg: "px-6 py-3 text-base gap-2.5 shadow-md"
  };

  const variantClasses = {
    primary: "bg-emerald-700 hover:bg-emerald-800 text-white focus:ring-emerald-600 active:scale-[0.98]",
    secondary: "bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 focus:ring-emerald-500",
    outline: "bg-white hover:bg-stone-50 text-stone-700 border border-stone-300 focus:ring-emerald-500",
    danger: "bg-rose-600 hover:bg-rose-700 text-white focus:ring-rose-500",
    success: "bg-green-600 hover:bg-green-700 text-white focus:ring-green-500",
    ghost: "bg-transparent hover:bg-stone-100 text-stone-600 focus:ring-stone-400"
  };

  return (
    <button
      className={clsx(baseClasses, sizeClasses[size], variantClasses[variant], className)}
      disabled={disabled}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </button>
  );
};
