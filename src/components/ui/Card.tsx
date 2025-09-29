import React from 'react';

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  shadow?: 'none' | 'sm' | 'md' | 'lg';
  border?: boolean;
  hover?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  padding = 'md',
  shadow = 'sm',
  border = true,
  hover = false
}) => {
  const baseClasses = 'bg-white rounded-lg';
  
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };

  const shadowClasses = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg'
  };

  const borderClass = border ? 'border border-slate-200' : '';
  const hoverClass = hover ? 'hover:shadow-md hover:border-slate-300 transition-all duration-200 cursor-pointer' : '';

  const classes = `${baseClasses} ${paddingClasses[padding]} ${shadowClasses[shadow]} ${borderClass} ${hoverClass} ${className}`.trim();

  return (
    <div className={classes}>
      {children}
    </div>
  );
};

export default Card;

