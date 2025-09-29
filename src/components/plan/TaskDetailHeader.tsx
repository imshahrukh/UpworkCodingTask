import React from 'react';
import { TaskDoc } from '../../db/schema';
import { getTaskStatus } from '../../utils/taskHelpers';
import { 
  ClipboardList, 
  Calendar, 
  MapPin, 
  Edit3, 
  X, 
  Trash2 
} from 'lucide-react';
import Badge from '../ui/Badge';
import Button from '../ui/Button';

interface TaskDetailHeaderProps {
  task: TaskDoc;
  isEditing: boolean;
  onEdit: (editing: boolean) => void;
  onDelete: (taskId: string) => void;
}

const TaskDetailHeader: React.FC<TaskDetailHeaderProps> = ({
  task,
  isEditing,
  onEdit,
  onDelete
}) => {
  const status = getTaskStatus(task);

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
    <div className="flex-shrink-0 p-6 border-b border-slate-200 bg-gradient-to-r from-white to-slate-50">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-100 rounded-lg">
              <ClipboardList className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-xl font-bold text-slate-900 truncate">{task.title}</h3>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant={getBadgeVariant()}>
                  {getBadgeText()}
                </Badge>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-slate-500">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>Created {new Date(task.createdAt).toLocaleDateString()}</span>
            </div>
            {task.position && (
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>Positioned</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex space-x-2 ml-4">
          <Button
            onClick={() => onEdit(!isEditing)}
            variant={isEditing ? 'danger' : 'primary'}
            size="sm"
            icon={isEditing ? X : Edit3}
          />
          <Button
            onClick={() => onDelete(task.id)}
            variant="danger"
            size="sm"
            icon={Trash2}
          />
        </div>
      </div>
      
      {task.description && (
        <div className="bg-slate-50 rounded-lg p-3 border border-slate-200">
          <p className="text-sm text-slate-700 leading-relaxed">{task.description}</p>
        </div>
      )}
    </div>
  );
};

export default TaskDetailHeader;

