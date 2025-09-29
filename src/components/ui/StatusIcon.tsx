import React from 'react';
import { Circle } from 'lucide-react';
import { ChecklistItemStatus } from '../../db/schema';
import { getStatusConfig } from '../../constants/status';

interface StatusIconProps {
  status: ChecklistItemStatus;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const StatusIcon: React.FC<StatusIconProps> = ({
  status,
  size = 'md',
  className = ''
}) => {
  const config = getStatusConfig(status);
  const IconComponent = config.icon;
  
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };
  
  const iconSizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };
  
  const isCompleted = status === 'DONE';
  const isInProgress = status === 'IN_PROGRESS';
  
  return (
    <div 
      className={`relative z-10 flex items-center justify-center ${sizeClasses[size]} rounded-full border-2 transition-all duration-300 ${config.circleBg} ${className}`}
    >
      {isCompleted ? (
        <IconComponent className={`${iconSizeClasses[size]} text-white`} />
      ) : isInProgress ? (
        <IconComponent className={`${iconSizeClasses[size]} text-white`} />
      ) : status === 'BLOCKED' ? (
        <IconComponent className={`${iconSizeClasses[size]} text-white`} />
      ) : status === 'FINAL_CHECK_AWAITING' ? (
        <IconComponent className={`${iconSizeClasses[size]} text-white`} />
      ) : (
        <Circle className={`${iconSizeClasses[size]} text-slate-400`} />
      )}
    </div>
  );
};

export default StatusIcon;
