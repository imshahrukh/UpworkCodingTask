import React from 'react';
import { LucideIcon } from 'lucide-react';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
  size?: 'sm' | 'md';
  icon?: LucideIcon;
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  icon: Icon,
  className = ''
}) => {
  const baseClasses = 'inline-flex items-center gap-1 rounded-full font-medium border';
  
  const variantClasses = {
    default: 'bg-gray-50 text-gray-700 border-gray-200',
    success: 'bg-green-50 text-green-700 border-green-200',
    warning: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    danger: 'bg-red-50 text-red-700 border-red-200',
    info: 'bg-blue-50 text-blue-700 border-blue-200'
  };

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-xs'
  };

  const iconSizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-3 h-3'
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`.trim();

  return (
    <span className={classes}>
      {Icon && <Icon className={iconSizeClasses[size]} />}
      {children}
    </span>
  );
};

export default Badge;

