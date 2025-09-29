import React, { useState, useEffect, useCallback } from 'react';
import { useTaskStore } from '../store/taskStore';
import { useUserStore } from '../store/userStore';
import { TaskDoc } from '../db/schema';
import { QuickTaskFormValues, TaskFormValues } from '../validation/schemas';
import { useTaskOperations } from '../hooks/useTaskOperations';
import { useTaskFiltering } from '../hooks/useTaskFiltering';
import PlanHeader from './plan/PlanHeader';
import TaskSidebar from './plan/TaskSidebar';
import FloorPlanView from './plan/FloorPlanView';
import TaskDetailSidebar from './plan/TaskDetailSidebar';
import LoadingSpinner from './ui/LoadingSpinner';

const PlanView: React.FC = () => {
  const { tasks, subscribeToTasks, isLoading } = useTaskStore();
  const { currentUser } = useUserStore();
  const [selectedTask, setSelectedTask] = useState<TaskDoc | null>(null);
  const [isEditingTask, setIsEditingTask] = useState(false);
  const [showTaskList, setShowTaskList] = useState(true);

  // Custom hooks for operations and filtering
  const { createTask, saveTask, removeTask, isCreating, isUpdating } = useTaskOperations();
  const { filter, setFilter, sortBy, setSortBy, filteredAndSortedTasks } = useTaskFiltering(tasks);

  useEffect(() => {
    if (currentUser) {
      subscribeToTasks(currentUser.id);
    }
    
    // Cleanup subscription on unmount
    return () => {
      const { unsubscribeFromTasks } = useTaskStore.getState();
      unsubscribeFromTasks();
    };
  }, [currentUser, subscribeToTasks]);

  // Debounced task click to prevent rapid state changes
  const debouncedTaskClick = useCallback((task: TaskDoc) => {
    if (!isUpdating) {
      setSelectedTask(task);
      setIsEditingTask(false);
    }
  }, [isUpdating]);

  // Sync selectedTask with the latest data from the store
  useEffect(() => {
    if (selectedTask && tasks.length > 0) {
      const updatedTask = tasks.find(task => task.id === selectedTask.id);
      if (updatedTask && 
          updatedTask.updatedAt !== selectedTask.updatedAt && 
          !isEditingTask) {
        setSelectedTask(updatedTask);
      }
    }
  }, [tasks, selectedTask, isEditingTask]);

  // Event handlers
  const handleTaskCreate = async (
    e: React.MouseEvent<HTMLImageElement>,
    values: QuickTaskFormValues,
    resetForm: () => void
  ) => {
    if (!currentUser || !values.title.trim()) return;
      
    const imgElement = e.currentTarget;
    const rect = imgElement.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;

    try {
      await createTask(currentUser.id, values.title.trim(), undefined, { x, y });
      resetForm();
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const handleTaskSelect = (task: TaskDoc) => {
    debouncedTaskClick(task);
  };

  const handleTaskSave = async (values: TaskFormValues) => {
    if (!selectedTask) return;

    try {
      const updates = await saveTask(selectedTask.id, values);
      
      // Update local state
      const updatedTask = { ...selectedTask, ...updates };
      setSelectedTask(updatedTask);
      
      // Update store
      const { updateTaskInStore } = useTaskStore.getState();
      updateTaskInStore(selectedTask.id, updates);

      setIsEditingTask(false);
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  const handleTaskDelete = async (taskId: string) => {
    try {
      const success = await removeTask(taskId);
      if (success && selectedTask?.id === taskId) {
        setSelectedTask(null);
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex flex-col">
      {/* Header */}
      <PlanHeader
        showTaskList={showTaskList}
        onToggleTaskList={() => setShowTaskList(!showTaskList)}
      />

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Task Panel */}
                {showTaskList && (
          <TaskSidebar
            tasks={tasks}
            filteredTasks={filteredAndSortedTasks}
            selectedTask={selectedTask}
            filter={filter}
            sortBy={sortBy}
            onFilterChange={setFilter}
            onSortChange={setSortBy}
            onTaskSelect={handleTaskSelect}
          />
        )}

        {/* Center - Floor Plan */}
        <FloorPlanView
          tasks={tasks}
          selectedTask={selectedTask}
          isCreating={isCreating}
          onTaskCreate={handleTaskCreate}
          onTaskSelect={handleTaskSelect}
        />

        {/* Right Sidebar - Task Details */}
        <TaskDetailSidebar
          selectedTask={selectedTask}
          isEditing={isEditingTask}
          isUpdating={isUpdating}
          onEdit={setIsEditingTask}
          onSave={handleTaskSave}
          onDelete={handleTaskDelete}
        />
      </div>

      {/* Loading State */}
      {isLoading && (
        <LoadingSpinner
          fullScreen
          text="Loading Dashboard"
        />
      )}
    </div>
  );
};

export default PlanView;