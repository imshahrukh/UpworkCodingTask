import { useState, useCallback } from 'react';
import { addTask, updateTask, deleteTask } from '../db/db';
import { TaskFormValues } from '../validation/schemas';
import { ChecklistItem } from '../db/schema';
import { CHECKLIST_STATUS } from '../constants/status';
import { v4 as uuidv4 } from 'uuid';

export const useTaskOperations = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const createTask = useCallback(async (
    userId: string,
    title: string,
    description?: string,
    position?: { x: number; y: number }
  ) => {
    try {
      setIsCreating(true);
      await addTask(userId, title, description, position);
    } catch (error) {
      console.error('Error creating task:', error);
      throw error;
    } finally {
      setIsCreating(false);
    }
  }, []);

  const saveTask = useCallback(async (taskId: string, values: TaskFormValues) => {
    try {
      setIsUpdating(true);
      
      const processedChecklist: ChecklistItem[] = (values.checklist || []).map((item: any) => ({
        id: item.id || uuidv4(),
        text: String(item.text || ''),
        status: item.status || CHECKLIST_STATUS.NOT_STARTED,
        createdAt: item.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }));

      const updates = {
        title: String(values.title || ''),
        description: values.description ? String(values.description) : undefined,
        checklist: processedChecklist,
        updatedAt: new Date().toISOString(),
        isBlocked: processedChecklist.some(item => item.status === CHECKLIST_STATUS.BLOCKED),
      };

      await updateTask(taskId, updates);
      return updates;
    } catch (error) {
      console.error('Error saving task:', error);
      throw error;
    } finally {
      setIsUpdating(false);
    }
  }, []);

  const removeTask = useCallback(async (taskId: string) => {
    if (!window.confirm('Are you sure you want to delete this task? This action cannot be undone.')) {
      return false;
    }

    try {
      setIsDeleting(taskId);
      await deleteTask(taskId);
      
      // RxDB subscription will automatically update the store
      return true;
    } catch (error) {
      console.error('Error deleting task:', error);
      throw error;
    } finally {
      setIsDeleting(null);
    }
  }, []);

  return {
    createTask,
    saveTask,
    removeTask,
    isCreating,
    isUpdating,
    isDeleting
  };
};

