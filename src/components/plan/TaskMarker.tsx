import React, { memo, useMemo } from 'react';
import { TaskDoc } from '../../db/schema';
import { getStatusColor, getStatusText } from '../../utils/taskHelpers';
import { XCircle, CheckCircle2, Activity } from 'lucide-react';

interface TaskMarkerProps {
  task: TaskDoc;
  isSelected: boolean;
  onClick: (e: React.MouseEvent) => void;
}

const TaskMarker: React.FC<TaskMarkerProps> = memo(({
  task,
  isSelected,
  onClick
}) => {
  // Memoize expensive calculations (must be called before early return)
  const markerData = useMemo(() => {
    if (!task.position) return null;
    
    const statusColor = getStatusColor(task);
    const completedCount = task.checklist.filter(item => item.status === 'DONE').length;
    const isCompleted = completedCount === task.checklist.length && task.checklist.length > 0;
    const statusText = getStatusText(task);
    
    return {
      statusColor,
      isCompleted,
      statusText,
      checklistLength: task.checklist.length
    };
  }, [task]);

  if (!task.position || !markerData) return null;

  const position = task.position;

  return (
    <div
      className="absolute transform -translate-x-1/2 -translate-y-1/2 group z-50"
      style={{
        left: `${position.x * 100}%`,
        top: `${position.y * 100}%`,
      }}
    >
      <div
        className={`relative w-6 h-6 rounded-full cursor-pointer shadow-xl border-2 border-white hover:scale-125 transition-all duration-200 ${markerData.statusColor} ${
          isSelected ? 'ring-4 ring-blue-400 ring-opacity-50 scale-110' : ''
        }`}
        onClick={onClick}
      >
        {/* Task Status Icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          {task.isBlocked ? (
            <XCircle className="w-3 h-3 text-white" />
          ) : markerData.isCompleted ? (
            <CheckCircle2 className="w-3 h-3 text-white" />
          ) : (
            <Activity className="w-3 h-3 text-white" />
          )}
        </div>
      </div>
      
      {/* Tooltip - Fixed positioning */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-slate-900 text-white px-3 py-2 rounded-lg text-xs opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none z-[100] shadow-xl min-w-max">
        <div className="font-semibold text-white truncate max-w-[200px]">{task.title}</div>
        <div className="text-slate-300 mt-1 flex items-center gap-2 flex-wrap">
          <span className="truncate">{markerData.statusText}</span>
          <span>•</span>
          <span>{markerData.checklistLength} items</span>
        </div>
        {/* Arrow */}
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-900"></div>
      </div>
    </div>
  );
});

TaskMarker.displayName = 'TaskMarker';

export default TaskMarker;
