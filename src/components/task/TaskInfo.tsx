import React from 'react';
import { TaskDoc } from '../../db/schema';
import { MapPin, Calendar, Clock, CheckCircle2, XCircle } from 'lucide-react';
import Card from '../ui/Card';

interface TaskInfoProps {
  task: TaskDoc;
}

const TaskInfo: React.FC<TaskInfoProps> = ({ task }) => {
  return (
    <Card padding="lg" className="mt-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Task Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-slate-500" />
          <span className="font-medium text-gray-700">Created:</span>
          <span className="text-gray-600">
            {new Date(task.createdAt).toLocaleString()}
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-slate-500" />
          <span className="font-medium text-gray-700">Last Updated:</span>
          <span className="text-gray-600">
            {new Date(task.updatedAt).toLocaleString()}
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-slate-500" />
          <span className="font-medium text-gray-700">Position:</span>
          <span className="text-gray-600">
            {task.position ? '📍 On floor plan' : 'Not positioned'}
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          {task.isBlocked ? (
            <>
              <XCircle className="w-4 h-4 text-red-500" />
              <span className="font-medium text-gray-700">Status:</span>
              <span className="text-red-600 font-medium">Blocked</span>
            </>
          ) : (
            <>
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              <span className="font-medium text-gray-700">Status:</span>
              <span className="text-green-600 font-medium">Active</span>
            </>
          )}
        </div>
      </div>
    </Card>
  );
};

export default TaskInfo;
