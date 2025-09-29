import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserDoc } from '../db/schema';

interface UserStore {
  currentUser: UserDoc | null;
  isLoading: boolean;
  error: string | null;
  setUser: (user: UserDoc) => void;
  clearUser: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      currentUser: null,
      isLoading: false,
      error: null,
      setUser: (user) => set({ currentUser: user, error: null }),
      clearUser: () => set({ currentUser: null, error: null }),
      setLoading: (loading) => set({ isLoading: loading }),
      setError: (error) => set({ error }),
    }),
    {
      name: 'user-storage', // localStorage key
      partialize: (state) => ({ 
        currentUser: state.currentUser // Only persist currentUser, not loading states
      }),
    }
  )
);
