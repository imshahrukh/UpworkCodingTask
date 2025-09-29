import { TaskDoc } from '../db/schema';
import { CHECKLIST_STATUS } from '../constants/status';

export type TaskStatus = 'not-started' | 'in-progress' | 'blocked' | 'completed';

export const getTaskStatus = (task: TaskDoc): TaskStatus => {
  if (task.isBlocked) return 'blocked';
  
  const completedItems = task.checklist.filter(item => item.status === CHECKLIST_STATUS.DONE).length;
  const inProgressItems = task.checklist.filter(item => item.status === CHECKLIST_STATUS.IN_PROGRESS).length;
  const totalItems = task.checklist.length;
  
  if (completedItems === totalItems && totalItems > 0) return 'completed';
  if (completedItems > 0 || inProgressItems > 0) return 'in-progress';
  return 'not-started';
};

export const getTaskProgress = (task: TaskDoc): number => {
  if (task.checklist.length === 0) return 0;
  const completedItems = task.checklist.filter(item => item.status === CHECKLIST_STATUS.DONE).length;
  return Math.round((completedItems / task.checklist.length) * 100);
};

export const getTaskProgressStats = (task: TaskDoc) => {
  const completedItems = task.checklist.filter(item => item.status === CHECKLIST_STATUS.DONE).length;
  const inProgressItems = task.checklist.filter(item => item.status === CHECKLIST_STATUS.IN_PROGRESS).length;
  const totalItems = task.checklist.length;
  
  const progress = totalItems > 0 
    ? Math.round(((completedItems + (inProgressItems * 0.5)) / totalItems) * 100)
    : 0;
  
  return {
    completedItems,
    inProgressItems,
    totalItems,
    progress,
    isComplete: completedItems === totalItems && totalItems > 0
  };
};

export const getStatusColor = (task: TaskDoc): string => {
  if (task.isBlocked) return 'bg-red-500';
  
  const progress = getTaskProgress(task);
  if (progress === 100) return 'bg-green-500';
  if (progress > 50) return 'bg-yellow-500';
  if (progress > 0) return 'bg-blue-500';
  return 'bg-gray-500';
};

export const getStatusText = (task: TaskDoc): string => {
  if (task.isBlocked) return 'Blocked';
  
  const completedItems = task.checklist.filter(item => item.status === CHECKLIST_STATUS.DONE).length;
  const inProgressItems = task.checklist.filter(item => item.status === CHECKLIST_STATUS.IN_PROGRESS).length;
  const totalItems = task.checklist.length;
  
  if (completedItems === totalItems && totalItems > 0) return 'Complete';
  if (completedItems > 0) return `${completedItems}/${totalItems}`;
  if (inProgressItems > 0) return 'Started';
  return 'Not Started';
};

export const sortTasks = (tasks: TaskDoc[], sortBy: 'title' | 'created' | 'status'): TaskDoc[] => {
  return [...tasks].sort((a, b) => {
    switch (sortBy) {
      case 'title':
        return a.title.localeCompare(b.title);
      case 'status':
        return getTaskStatus(a).localeCompare(getTaskStatus(b));
      case 'created':
      default:
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
  });
};

export const filterTasks = (tasks: TaskDoc[], filter: 'all' | 'blocked' | 'completed' | 'in-progress'): TaskDoc[] => {
  switch (filter) {
    case 'blocked':
      return tasks.filter(task => task.isBlocked);
    case 'completed':
      return tasks.filter(task => {
        const completedItems = task.checklist.filter(item => item.status === CHECKLIST_STATUS.DONE).length;
        return completedItems === task.checklist.length && task.checklist.length > 0;
      });
    case 'in-progress':
      return tasks.filter(task => {
        const completedItems = task.checklist.filter(item => item.status === CHECKLIST_STATUS.DONE).length;
        const inProgressItems = task.checklist.filter(item => item.status === CHECKLIST_STATUS.IN_PROGRESS).length;
        return (completedItems > 0 && completedItems < task.checklist.length) || inProgressItems > 0;
      });
    default:
      return tasks;
  }
};

