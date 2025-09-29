import React from 'react';
import { TaskDoc } from '../../db/schema';
import { TaskFormValues } from '../../validation/schemas';
import TaskEditForm from './TaskEditForm';
import TaskViewMode from './TaskViewMode';

interface TaskDetailContentProps {
  task: TaskDoc;
  isEditing: boolean;
  isUpdating: boolean;
  onSave: (values: TaskFormValues) => void;
  onCancelEdit: () => void;
}

const TaskDetailContent: React.FC<TaskDetailContentProps> = ({
  task,
  isEditing,
  isUpdating,
  onSave,
  onCancelEdit
}) => {
  return (
    <div 
      className="flex-1 overflow-y-auto p-6 min-h-0"
      style={{
        scrollbarWidth: 'thin',
        scrollbarColor: '#cbd5e1 #f1f5f9'
      }}
    >
      {isEditing ? (
        <TaskEditForm
          task={task}
          onSave={onSave}
          onCancel={onCancelEdit}
          isUpdating={isUpdating}
        />
      ) : (
        <TaskViewMode task={task} />
      )}
    </div>
  );
};

export default TaskDetailContent;

