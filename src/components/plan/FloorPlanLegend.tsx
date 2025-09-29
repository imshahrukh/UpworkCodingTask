import React from 'react';
import { Pause, Activity, CheckCircle2, XCircle, Target } from 'lucide-react';

const FloorPlanLegend: React.FC = () => {
  return (
    <div className="p-4 border-t border-slate-200 bg-gradient-to-r from-slate-50 to-blue-50">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-slate-500 rounded-full shadow-sm flex items-center justify-center">
              <Pause className="w-2 h-2 text-white" />
            </div>
            <span className="text-sm font-medium text-slate-700">Not Started</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-blue-500 rounded-full shadow-sm flex items-center justify-center">
              <Activity className="w-2 h-2 text-white" />
            </div>
            <span className="text-sm font-medium text-slate-700">In Progress</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-green-500 rounded-full shadow-sm flex items-center justify-center">
              <CheckCircle2 className="w-2 h-2 text-white" />
            </div>
            <span className="text-sm font-medium text-slate-700">Complete</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-red-500 rounded-full shadow-sm flex items-center justify-center">
              <XCircle className="w-2 h-2 text-white" />
            </div>
            <span className="text-sm font-medium text-slate-700">Blocked</span>
          </div>
        </div>
        <div className="text-sm text-slate-500 flex items-center gap-2">
          <Target className="w-4 h-4" />
          Interactive project management • Click markers for details
        </div>
      </div>
    </div>
  );
};

export default FloorPlanLegend;
