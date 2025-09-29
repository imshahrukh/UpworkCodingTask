import React from 'react';
import { LucideIcon } from 'lucide-react';
import Button from './Button';

export interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
  className = ''
}) => {
  return (
    <div className={`text-center p-8 ${className}`}>
      <div className="flex flex-col items-center space-y-3">
        <div className="p-4 bg-slate-100 rounded-full">
          <Icon className="w-8 h-8 text-slate-400" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">{title}</h3>
          <p className="text-slate-600">{description}</p>
        </div>
        {actionLabel && onAction && (
          <Button onClick={onAction} className="mt-4">
            {actionLabel}
          </Button>
        )}
      </div>
    </div>
  );
};

export default EmptyState;

