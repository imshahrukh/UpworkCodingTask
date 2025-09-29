import React from 'react';
import { LucideIcon } from 'lucide-react';
import { BADGE_VARIANTS, BADGE_SIZES, BADGE_ICON_SIZES } from '../../constants/ui';

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
  
  const variantClasses = BADGE_VARIANTS[variant];
  const sizeClasses = BADGE_SIZES[size];
  const iconSizeClass = BADGE_ICON_SIZES[size];

  const classes = `${baseClasses} ${variantClasses} ${sizeClasses} ${className}`.trim();

  return (
    <span className={classes}>
      {Icon && <Icon className={iconSizeClass} />}
      {children}
    </span>
  );
};

export default Badge;

