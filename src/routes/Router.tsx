import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from '../components/Login';
import PlanView from '../components/PlanView';
import { useUserStore } from '../store/userStore';

const ROUTES_CONFIG = {
  public: [
    {
      path: '/login',
      component: Login,
      exact: true
    }
  ],
  protected: [
    {
      path: '/plan',
      component: PlanView,
      exact: true
    }
  ],
  redirects: [
    {
      from: '/',
      to: (currentUser: any) => currentUser ? '/plan' : '/login'
    },
    {
      from: '*',
      to: '/login'
    }
  ]
};

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
  
  const [isHydrated, setIsHydrated] = React.useState(false);
  
  React.useEffect(() => {
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
        {ROUTES_CONFIG.public.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={
              <PublicRoute>
                <route.component />
              </PublicRoute>
            }
          />
        ))}
        
        {ROUTES_CONFIG.protected.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={
              <ProtectedRoute>
                <route.component />
              </ProtectedRoute>
            }
          />
        ))}
        
        {/* Redirect Routes */}
        {ROUTES_CONFIG.redirects.map((redirect, index) => (
          <Route
            key={`redirect-${index}`}
            path={redirect.from}
            element={
              <Navigate 
                to={typeof redirect.to === 'function' ? redirect.to(currentUser) : redirect.to} 
                replace 
              />
            }
          />
        ))}
      </Routes>¬
    </BrowserRouter>
  );
};

export default Router;
