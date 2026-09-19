import React from 'react';
import clsx from 'clsx';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  onClick,
  hoverable = false
}) => {
  return (
    <div
      onClick={onClick}
      className={clsx(
        "bg-white rounded-2xl border border-stone-200/80 shadow-sm overflow-hidden",
        hoverable && "transition-all duration-200 hover:shadow-md hover:border-emerald-300 hover:-translate-y-0.5 cursor-pointer",
        onClick && "cursor-pointer",
        className
      )}
    >
      {children}
    </div>
  );
};
