import React from 'react';
import { Target } from 'lucide-react';
import { STATUS_CONFIG } from '../../constants/status';

interface LegendItemProps {
  item: {
    status: keyof typeof STATUS_CONFIG;
    label: string;
    color: string;
    icon: React.ComponentType<{ className?: string }>;
  };
}

const LegendItemComponent: React.FC<LegendItemProps> = ({ item }) => {
  const IconComponent = item.icon;
  
  return (
    <div className="flex items-center space-x-2" role="listitem">
      <div 
        className={`w-4 h-4 ${item.color} rounded-full shadow-sm flex items-center justify-center`}
        aria-label={`${item.label} status indicator`}
      >
        <IconComponent className="w-2 h-2 text-white" aria-hidden="true" />
      </div>
      <span className="text-sm font-medium text-slate-700">
        {item.label}
      </span>
    </div>
  );
};

const FloorPlanLegend: React.FC = () => {
  const legendItems = Object.entries(STATUS_CONFIG).map(([status, config]) => ({
    status: status as keyof typeof STATUS_CONFIG,
    label: config.label,
    color: status === 'NOT_STARTED' ? 'bg-slate-500' :
           status === 'IN_PROGRESS' ? 'bg-blue-500' :
           status === 'DONE' ? 'bg-green-500' :
           status === 'BLOCKED' ? 'bg-red-500' :
           'bg-yellow-500',
    icon: config.icon
  }));

  return (
    <div 
      className="p-4 border-t border-slate-200 bg-gradient-to-r from-slate-50 to-blue-50"
      role="region"
      aria-label="Task status legend"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div 
          className="flex flex-wrap items-center gap-4 sm:gap-6"
          role="list"
          aria-label="Task status indicators"
        >
          {legendItems.map((item) => (
            <LegendItemComponent key={item.status} item={item} />
          ))}
        </div>
        
        <div className="text-sm text-slate-500 flex items-center gap-2 flex-shrink-0">
          <Target className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
          <span className="hidden sm:inline">
            Interactive project management • Click markers for details
          </span>
          <span className="sm:hidden">
            Click markers for details
          </span>
        </div>
      </div>
    </div>
  );
};

export default FloorPlanLegend;
