import { create } from 'zustand';
import { getUserTasks } from '../db/db';
import { TaskDoc } from '../db/schema';
import { Subscription } from 'rxjs';

export type Task = TaskDoc;

interface TaskStore {
  tasks: Task[];
  isLoading: boolean;
  error: string | null;
  subscription: Subscription | null;
  
  subscribeToTasks: (userId: string) => void;
  unsubscribeFromTasks: () => void;
}

export const useTaskStore = create<TaskStore>((set, get) => ({
      tasks: [],
      isLoading: false,
      error: null,
      subscription: null,

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
}));
