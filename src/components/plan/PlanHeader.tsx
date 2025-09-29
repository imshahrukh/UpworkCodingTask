import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../../store/userStore';
import { 
  Building2, 
  Users, 
  Target, 
  Eye, 
  EyeOff, 
  LogOut 
} from 'lucide-react';
import Button from '../ui/Button';

interface PlanHeaderProps {
  showTaskList: boolean;
  onToggleTaskList: () => void;
}

const PlanHeader: React.FC<PlanHeaderProps> = ({
  showTaskList,
  onToggleTaskList
}) => {
  const navigate = useNavigate();
  const { currentUser, clearUser } = useUserStore();

  const handleLogout = () => {
    clearUser();
    navigate('/login');
  };

  return (
    <div className="bg-white shadow-lg border-b border-slate-200 flex-shrink-0">
      <div className="max-w-full px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Construction Dashboard</h1>
                <p className="text-sm text-slate-600 flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  Project Management • Task Tracking • Progress Monitoring
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 px-3 py-2 bg-slate-50 rounded-lg border">
              <Users className="w-4 h-4 text-slate-500" />
              <span className="text-sm font-medium text-slate-700">{currentUser?.name}</span>
            </div>
            
            <Button
              onClick={onToggleTaskList}
              icon={showTaskList ? EyeOff : Eye}
              variant="primary"
            >
              {showTaskList ? 'Hide Tasks' : 'Show Tasks'}
            </Button>
            
            <Button
              onClick={handleLogout}
              variant="ghost"
              icon={LogOut}
              size="sm"
            >
              Logout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanHeader;

