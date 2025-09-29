import { create } from 'zustand';
import { getUserTasks } from '../db/db';
import { TaskDoc } from '../db/schema';
import { Subscription } from 'rxjs';

export type Task = TaskDoc;

interface TaskStore {
  tasks: Task[];
  selectedTask: Task | null;
  isLoading: boolean;
  error: string | null;
  subscription: Subscription | null;
  
  setTasks: (tasks: Task[]) => void;
  setSelectedTask: (task: Task | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  subscribeToTasks: (userId: string) => void;
  unsubscribeFromTasks: () => void;
  addTaskToStore: (task: Task) => void;
  updateTaskInStore: (taskId: string, updates: Partial<Task>) => void;
  removeTaskFromStore: (taskId: string) => void;
}

export const useTaskStore = create<TaskStore>((set, get) => ({
      tasks: [],
      selectedTask: null,
      isLoading: false,
      error: null,
      subscription: null,

      setTasks: (tasks) => set({ tasks, error: null }),
      
      setSelectedTask: (task) => set({ selectedTask: task }),
      
      setLoading: (loading) => set({ isLoading: loading }),
      
      setError: (error) => set({ error }),

  subscribeToTasks: (userId) => {
    const { subscription } = get();
    
    if (subscription) {
      subscription.unsubscribe();
    }
    
    set({ isLoading: true });
    
    try {
      getUserTasks(userId).then((observable) => {
        let newSubscription: Subscription;
        
        newSubscription = observable.subscribe({
          next: (tasks: Task[]) => {
            const cleanTasks = tasks.map(task => ({
              id: task.id,
              userId: task.userId,
              title: task.title,
              description: task.description,
              position: task.position,
              checklist: task.checklist,
              createdAt: task.createdAt,
              updatedAt: task.updatedAt,
              isBlocked: task.isBlocked
            }));
            
            set({ 
              tasks: cleanTasks, 
              isLoading: false, 
              error: null,
              subscription: newSubscription 
            });
          },
          error: (error: any) => {
            console.error('Error subscribing to tasks:', error);
            set({ 
              error: 'Failed to load tasks', 
              isLoading: false,
              subscription: null
            });
          }
        });
      }).catch((error: any) => {
        console.error('Error getting tasks observable:', error);
        set({ 
          error: 'Failed to get tasks', 
          isLoading: false 
        });
      });
    } catch (error) {
      console.error('Error setting up task subscription:', error);
      set({ 
        error: 'Failed to setup task subscription', 
        isLoading: false 
      });
    }
  },

  unsubscribeFromTasks: () => {
    const { subscription } = get();
    if (subscription) {
      subscription.unsubscribe();
      set({ subscription: null });
    }
  },

  addTaskToStore: (task) => {
    const { tasks } = get();
    set({ tasks: [task, ...tasks] });
  },

  updateTaskInStore: (taskId, updates) => {
    const { tasks, selectedTask } = get();
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, ...updates } : task
    );
    
    const updatedSelectedTask = selectedTask?.id === taskId
      ? { ...selectedTask, ...updates }
      : selectedTask;
    
    set({ 
      tasks: updatedTasks,
      selectedTask: updatedSelectedTask
    });
  },

  removeTaskFromStore: (taskId) => {
    const { tasks, selectedTask } = get();
    const filteredTasks = tasks.filter(task => task.id !== taskId);
    const updatedSelectedTask = selectedTask?.id === taskId ? null : selectedTask;
    
    set({ 
      tasks: filteredTasks,
      selectedTask: updatedSelectedTask
    });
  },
}));
