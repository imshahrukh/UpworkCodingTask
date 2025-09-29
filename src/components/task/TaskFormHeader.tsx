import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../ui/Button';

interface TaskFormHeaderProps {
  isEditing?: boolean;
}

const TaskFormHeader: React.FC<TaskFormHeaderProps> = ({ isEditing = true }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white shadow-sm border-b">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {isEditing ? 'Edit Task' : 'Create Task'}
            </h1>
            <p className="text-gray-600">
              {isEditing ? 'Update task details and manage checklist items' : 'Create a new task'}
            </p>
          </div>
          <div className="flex space-x-3">
            <Button
              onClick={() => navigate('/plan')}
              variant="secondary"
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskFormHeader;
