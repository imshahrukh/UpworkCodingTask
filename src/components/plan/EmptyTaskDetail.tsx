import React from 'react';
import { ClipboardList, Target } from 'lucide-react';
import Card from '../ui/Card';

const EmptyTaskDetail: React.FC = () => {
  return (
    <div className="w-96 bg-white border-l border-slate-200 flex flex-col shadow-sm max-h-screen">
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center p-8">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-slate-100 rounded-full">
              <ClipboardList className="w-12 h-12 text-slate-400" />
            </div>
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">No Task Selected</h3>
          <p className="text-slate-600 mb-1">Select a task to view detailed information</p>
          <p className="text-sm text-slate-500">Click on task markers in the floor plan or items in the task list</p>
          
          <Card padding="md" className="mt-6 bg-blue-50 border-blue-200">
            <div className="flex items-center gap-2 text-blue-700 text-sm">
              <Target className="w-4 h-4" />
              <span className="font-medium">Pro Tip:</span>
            </div>
            <p className="text-blue-600 text-sm mt-1">
              Use the interactive floor plan to visualize and manage your construction tasks efficiently
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EmptyTaskDetail;

