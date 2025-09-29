import React, { forwardRef } from 'react';
import { TaskDoc } from '../../db/schema';
import { getTaskStatus, getTaskProgress } from '../../utils/taskHelpers';
import { 
  MapPin, 
  ClipboardList, 
  Calendar, 
  TrendingUp 
} from 'lucide-react';
import Badge from '../ui/Badge';

interface TaskListItemProps {
  task: TaskDoc;
  isSelected: boolean;
  onClick: () => void;
}

const TaskListItem = forwardRef<HTMLDivElement, TaskListItemProps>(({
  task,
  isSelected,
  onClick
}, ref) => {
  const status = getTaskStatus(task);
  const progress = getTaskProgress(task);
  
  const getBadgeVariant = () => {
    switch (status) {
      case 'blocked': return 'danger';
      case 'completed': return 'success';
      case 'in-progress': return 'info';
      default: return 'default';
    }
  };

  const getBadgeText = () => {
    switch (status) {
      case 'blocked': return 'Blocked';
      case 'completed': return 'Complete';
      case 'in-progress': return `${task.checklist.filter(item => item.status === 'DONE').length}/${task.checklist.length}`;
      default: return 'Not Started';
    }
  };

  return (
    <div
      ref={ref}
      className={`group p-4 rounded-xl cursor-pointer transition-all duration-200 border ${
        isSelected
          ? 'bg-blue-50 border-blue-200 shadow-md ring-1 ring-blue-200'
          : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-sm'
      }`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-slate-900 text-sm truncate pr-2 group-hover:text-blue-600 transition-colors">
            {task.title}
          </h3>
          {task.position && (
            <div className="flex items-center gap-1 mt-1">
              <MapPin className="w-3 h-3 text-slate-400" />
              <span className="text-xs text-slate-500">Positioned</span>
            </div>
          )}
        </div>
        <div className="flex-shrink-0">
          <Badge variant={getBadgeVariant()}>
            {getBadgeText()}
          </Badge>
        </div>
      </div>
      
      {task.description && (
        <p className="text-xs text-slate-600 mb-3 line-clamp-2 leading-relaxed">
          {task.description}
        </p>
      )}
      
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-slate-500">
            <ClipboardList className="w-3 h-3" />
            <span>{task.checklist.length} items</span>
          </div>
          <div className="flex items-center gap-1 text-slate-500">
            <Calendar className="w-3 h-3" />
            <span>{new Date(task.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <TrendingUp className="w-3 h-3 text-blue-500" />
          <span className="text-slate-600 font-medium">{progress}%</span>
        </div>
      </div>
    </div>
  );
});

TaskListItem.displayName = 'TaskListItem';

export default TaskListItem;
