import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from '../components/Login';
import PlanView from '../components/PlanView';
import TaskBoard from '../components/TaskBoard';
import TaskForm from '../components/TaskForm';
import { useUserStore } from '../store/userStore';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser } = useUserStore();
  
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser } = useUserStore();
  
  if (currentUser) {
    return <Navigate to="/plan" replace />;
  }
  
  return <>{children}</>;
};

const Router: React.FC = () => {
  const { currentUser } = useUserStore();
  
  // Wait for Zustand persist to hydrate before rendering routes
  const [isHydrated, setIsHydrated] = React.useState(false);
  
  React.useEffect(() => {
    // Small delay to ensure persistence has loaded
    const timer = setTimeout(() => setIsHydrated(true), 100);
    return () => clearTimeout(timer);
  }, []);
  
  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }
  
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route 
          path="/login" 
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } 
        />
        
        {/* Protected Routes */}
        <Route 
          path="/plan" 
          element={
            <ProtectedRoute>
              <PlanView />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/tasks" 
          element={
            <ProtectedRoute>
              <TaskBoard />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/task/:id" 
          element={
            <ProtectedRoute>
              <TaskForm />
            </ProtectedRoute>
          } 
        />
        
        {/* Default redirect */}
        <Route path="/" element={<Navigate to={currentUser ? "/plan" : "/login"} replace />} />
        
        {/* Catch all - redirect to login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
