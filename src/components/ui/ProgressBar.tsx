import React from 'react';

interface ProgressBarProps {
  progress: number;
  completedItems: number;
  inProgressItems?: number;
  totalItems: number;
  showText?: boolean;
  className?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  completedItems,
  inProgressItems = 0,
  totalItems,
  showText = true,
  className = ''
}) => {
  return (
    <div className={`space-y-2 ${className}`}>
      <div className="w-full bg-slate-200 rounded-full h-3">
        <div 
          className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full transition-all duration-500"
          style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
        />
      </div>
      
      {showText && (
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-600">
            {progress}% Complete
          </span>
          <span className="font-medium text-slate-600">
            {completedItems} completed{inProgressItems > 0 ? `, ${inProgressItems} in progress` : ''}
          </span>
        </div>
      )}
    </div>
  );
};

export default ProgressBar;
