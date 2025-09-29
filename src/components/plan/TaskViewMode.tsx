import React from 'react';
import { TaskDoc } from '../../db/schema';
import { BarChart3, ClipboardList } from 'lucide-react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import ProgressBar from '../ui/ProgressBar';
import ChecklistStep from '../ui/ChecklistStep';
import TaskCompletionCard from '../ui/TaskCompletionCard';
import { getTaskProgressStats } from '../../utils/taskHelpers';
import { CHECKLIST_STATUS } from '../../constants/status';

interface TaskViewModeProps {
  task: TaskDoc;
}

const TaskViewMode: React.FC<TaskViewModeProps> = ({ task }) => {
  const { completedItems, inProgressItems, totalItems, progress, isComplete } = getTaskProgressStats(task);
  
  const activeItems = completedItems + inProgressItems;

  return (
    <div className="space-y-6 pb-6">
      <Card padding="md" className="bg-slate-50 border-slate-200">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-blue-600" />
            Progress Overview
          </h4>
        </div>
        
        <ProgressBar 
          progress={progress}
          completedItems={completedItems}
          inProgressItems={inProgressItems}
          totalItems={totalItems}
        />
      </Card>

      <div>
        <div className="flex items-center gap-2 mb-6">
          <ClipboardList className="w-5 h-5 text-slate-600" />
          <h4 className="text-lg font-semibold text-slate-900">Project Steps</h4>
          <Badge variant="default" size="sm">
            {activeItems} active, {completedItems} completed
          </Badge>
        </div>
        
        <div className="relative">
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-slate-200"></div>
          
          {activeItems > 0 && (
            <div 
              className="absolute left-6 top-0 w-0.5 bg-gradient-to-b from-blue-500 to-green-500"
              style={{ 
                height: `${Math.max(0, activeItems * 80)}px`,
                zIndex: 1
              }}
            />
          )}
          
          <div className="space-y-4">
            {task.checklist.map((item, index) => (
              <ChecklistStep
                key={item.id || index}
                item={item}
                index={index}
                isLast={index === task.checklist.length - 1}
                isCompleted={item.status === CHECKLIST_STATUS.DONE}
              />
            ))}
          </div>
          
          {isComplete && <TaskCompletionCard />}
        </div>
      </div>
    </div>
  );
};

export default TaskViewMode;