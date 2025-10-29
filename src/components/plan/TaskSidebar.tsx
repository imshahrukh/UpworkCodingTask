import React, { useEffect, useRef } from 'react';
import { TaskDoc } from '../../db/schema';
import { FilterType, SortType } from '../../hooks/useTaskFiltering';
import { FILTER_OPTIONS, SORT_OPTIONS } from '../../utils/statusHelpers';
import { CHECKLIST_STATUS } from '../../constants/status';
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
    const completed = t.checklist.filter(item => item.status === CHECKLIST_STATUS.DONE).length;
    const inProgress = t.checklist.filter(item => item.status === CHECKLIST_STATUS.IN_PROGRESS).length;
    return (completed > 0 && completed < t.checklist.length) || inProgress > 0;
  }).length;
  const completedCount = tasks.filter(t => {
    const completed = t.checklist.filter(item => item.status === CHECKLIST_STATUS.DONE).length;
    return completed === t.checklist.length && t.checklist.length > 0;
  }).length;

  useEffect(() => {
    if (selectedTask && selectedTaskRef.current && scrollContainerRef.current) {
      const selectedElement = selectedTaskRef.current;
      const container = scrollContainerRef.current;

      const containerRect = container.getBoundingClientRect();
      const elementRect = selectedElement.getBoundingClientRect();

      const isVisible = (
        elementRect.top >= containerRect.top &&
        elementRect.bottom <= containerRect.bottom
      );

      if (!isVisible) {
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

        <div className="space-y-3">
          <div className="space-y-2">
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

        <div className="mt-4">
          <Card padding="md" className="bg-gradient-to-r from-slate-50 to-blue-50 border-slate-200">
            <div className="grid grid-cols-4 gap-4">
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <BarChart3 className="w-5 h-5 text-slate-600 flex-shrink-0" />
                </div>
                <div className="text-2xl font-bold text-slate-900 mb-1">{tasks.length}</div>
                <div className="text-sm text-slate-600 font-medium">Total</div>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <XCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                </div>
                <div className="text-2xl font-bold text-red-600 mb-1">{blockedCount}</div>
                <div className="text-sm text-red-600 font-medium">Blocked</div>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Activity className="w-5 h-5 text-blue-500 flex-shrink-0" />
                </div>
                <div className="text-2xl font-bold text-blue-600 mb-1">{activeCount}</div>
                <div className="text-sm text-blue-600 font-medium">Active</div>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                </div>
                <div className="text-2xl font-bold text-green-600 mb-1">{completedCount}</div>
                <div className="text-sm text-green-600 font-medium">Done</div>
              </div>
            </div>
          </Card>
        </div>
      </div>

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
          <div className="p-3 pb-24 space-y-2">
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
