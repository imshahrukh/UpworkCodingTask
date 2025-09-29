import React, { useEffect, useRef } from 'react';
import { TaskDoc } from '../../db/schema';
import { FilterType, SortType } from '../../hooks/useTaskFiltering';
import { FILTER_OPTIONS, SORT_OPTIONS } from '../../utils/statusHelpers';
import { 
  ClipboardList, 
  Filter, 
  SortDesc, 
  BarChart3, 
  XCircle, 
  Activity, 
  CheckCircle2 
} from 'lucide-react';
import Card from '../ui/Card';
import Select from '../ui/Select';
import TaskListItem from './TaskListItem';
import EmptyState from '../ui/EmptyState';

interface TaskSidebarProps {
  tasks: TaskDoc[];
  filteredTasks: TaskDoc[];
  selectedTask: TaskDoc | null;
  filter: FilterType;
  sortBy: SortType;
  onFilterChange: (filter: FilterType) => void;
  onSortChange: (sort: SortType) => void;
  onTaskSelect: (task: TaskDoc) => void;
}

const TaskSidebar: React.FC<TaskSidebarProps> = ({
  tasks,
  filteredTasks,
  selectedTask,
  filter,
  sortBy,
  onFilterChange,
  onSortChange,
  onTaskSelect
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const selectedTaskRef = useRef<HTMLDivElement>(null);

  const blockedCount = tasks.filter(t => t.isBlocked).length;
  const activeCount = tasks.filter(t => {
    const completed = t.checklist.filter(item => item.status === 'DONE').length;
    return completed > 0 && completed < t.checklist.length;
  }).length;
  const completedCount = tasks.filter(t => {
    const completed = t.checklist.filter(item => item.status === 'DONE').length;
    return completed === t.checklist.length && t.checklist.length > 0;
  }).length;

  // Auto-scroll to selected task
  useEffect(() => {
    if (selectedTask && selectedTaskRef.current && scrollContainerRef.current) {
      const selectedElement = selectedTaskRef.current;
      const container = scrollContainerRef.current;
      
      // Calculate if the element is visible in the container
      const containerRect = container.getBoundingClientRect();
      const elementRect = selectedElement.getBoundingClientRect();
      
      const isVisible = (
        elementRect.top >= containerRect.top &&
        elementRect.bottom <= containerRect.bottom
      );

      if (!isVisible) {
        // Scroll to center the selected item
        const elementOffsetTop = selectedElement.offsetTop - 200;
        const containerHeight = container.clientHeight;
        const elementHeight = selectedElement.clientHeight;
        
        const scrollTo = elementOffsetTop - (containerHeight / 2) + (elementHeight / 2);
        
        container.scrollTo({
          top: scrollTo,
          behavior: 'smooth'
        });
      }
    }
  }, [selectedTask]);

  return (
    <div className="w-80 bg-white border-r border-slate-200 flex flex-col shadow-sm max-h-screen">
      {/* Task Panel Header - Fixed */}
      <div className="flex-shrink-0 p-5 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-blue-50">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <ClipboardList className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Task Manager</h2>
              <p className="text-xs text-slate-600">{tasks.length} total tasks</p>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="space-y-3">
          <div className="flex gap-2">
            <Select
              icon={Filter}
              value={filter}
              onChange={(e) => onFilterChange(e.target.value as FilterType)}
              options={FILTER_OPTIONS}
              fullWidth
            />
            <Select
              icon={SortDesc}
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value as SortType)}
              options={SORT_OPTIONS}
              fullWidth
            />
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-2 mt-4">
          <Card padding="sm" className="text-center">
            <div className="flex items-center justify-center mb-1">
              <BarChart3 className="w-3 h-3 text-slate-500" />
            </div>
            <div className="text-lg font-bold text-slate-900">{tasks.length}</div>
            <div className="text-xs text-slate-500">Total</div>
          </Card>
          
          <Card padding="sm" className="text-center border-red-200">
            <div className="flex items-center justify-center mb-1">
              <XCircle className="w-3 h-3 text-red-500" />
            </div>
            <div className="text-lg font-bold text-red-600">{blockedCount}</div>
            <div className="text-xs text-red-500">Blocked</div>
          </Card>
          
          <Card padding="sm" className="text-center border-blue-200">
            <div className="flex items-center justify-center mb-1">
              <Activity className="w-3 h-3 text-blue-500" />
            </div>
            <div className="text-lg font-bold text-blue-600">{activeCount}</div>
            <div className="text-xs text-blue-500">Active</div>
          </Card>
          
          <Card padding="sm" className="text-center border-green-200">
            <div className="flex items-center justify-center mb-1">
              <CheckCircle2 className="w-3 h-3 text-green-500" />
            </div>
            <div className="text-lg font-bold text-green-600">{completedCount}</div>
            <div className="text-xs text-green-500">Done</div>
          </Card>
        </div>
      </div>

      {/* Task List - Scrollable */}
      <div 
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto bg-slate-50 min-h-0" 
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: '#cbd5e1 #f1f5f9'
        }}
      >
        {filteredTasks.length === 0 ? (
          <EmptyState
            icon={ClipboardList}
            title="No tasks found"
            description="Try adjusting your filters"
          />
        ) : (
          <div className="p-3 space-y-2">
            {filteredTasks.map((task) => (
              <TaskListItem
                key={task.id}
                ref={selectedTask?.id === task.id ? selectedTaskRef : null}
                task={task}
                isSelected={selectedTask?.id === task.id}
                onClick={() => onTaskSelect(task)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskSidebar;
