import React from 'react';
import { TaskDoc } from '../../db/schema';
import { TaskFormValues } from '../../validation/schemas';
import TaskDetailHeader from './TaskDetailHeader';
import TaskDetailContent from './TaskDetailContent';
import EmptyTaskDetail from './EmptyTaskDetail';

interface TaskDetailSidebarProps {
  selectedTask: TaskDoc | null;
  isEditing: boolean;
  isUpdating: boolean;
  onEdit: (editing: boolean) => void;
  onSave: (values: TaskFormValues) => void;
  onDelete: (taskId: string) => void;
}

const TaskDetailSidebar: React.FC<TaskDetailSidebarProps> = ({
  selectedTask,
  isEditing,
  isUpdating,
  onEdit,
  onSave,
  onDelete
}) => {
  if (!selectedTask) {
    return <EmptyTaskDetail />;
  }

  return (
    <div className="w-96 bg-white border-l border-slate-200 flex flex-col shadow-sm max-h-screen">
      <TaskDetailHeader
        task={selectedTask}
        isEditing={isEditing}
        onEdit={onEdit}
        onDelete={onDelete}
      />
      
      <TaskDetailContent
        task={selectedTask}
        isEditing={isEditing}
        isUpdating={isUpdating}
        onSave={onSave}
        onCancelEdit={() => onEdit(false)}
      />
    </div>
  );
};

export default TaskDetailSidebar;

