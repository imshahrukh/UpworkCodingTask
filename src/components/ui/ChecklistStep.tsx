import React from 'react';
import { Clock, ArrowRight } from 'lucide-react';
import { ChecklistItem } from '../../db/schema';
import { getStatusConfig } from '../../constants/status';
import Card from './Card';
import Badge from './Badge';
import StatusIcon from './StatusIcon';

interface ChecklistStepProps {
  item: ChecklistItem;
  index: number;
  isLast: boolean;
  isCompleted: boolean;
}

const ChecklistStep: React.FC<ChecklistStepProps> = ({
  item,
  index,
  isLast,
  isCompleted
}) => {
  const config = getStatusConfig(item.status);
  
  return (
    <div className="relative flex items-start gap-4">
      <StatusIcon status={item.status} />
      
      <div className={`flex-1 min-w-0 pb-4 transition-all duration-300 ${
        isCompleted ? 'opacity-75' : 'opacity-100'
      }`}>
        <Card 
          padding="md" 
          className={`transition-all duration-300 hover:shadow-md ${config.cardBg}`}
        >
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <h5 className={`font-semibold mb-2 ${
                isCompleted ? 'line-through text-slate-600' : 'text-slate-900'
              }`}>
                Step {index + 1}: {item.text}
              </h5>
              
              <div className="flex items-center gap-3 flex-wrap">
                <Badge 
                  variant={config.badgeVariant}
                  size="sm"
                >
                  {config.displayText}
                </Badge>
                
                {item.updatedAt && (
                  <span className="text-xs text-slate-500 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {new Date(item.updatedAt).toLocaleDateString()}
                  </span>
                )}
              </div>
            </div>
            
            <div className={`ml-3 flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold ${config.stepNumberBg}`}>
              {index + 1}
            </div>
          </div>
        </Card>
      </div>
      
      {!isLast && (
        <div className="absolute left-12 top-16 flex items-center justify-center w-6 h-6">
          <ArrowRight className={`w-4 h-4 transition-colors duration-300 ${
            isCompleted ? 'text-green-400' : 'text-slate-300'
          }`} />
        </div>
      )}
    </div>
  );
};

export default ChecklistStep;
