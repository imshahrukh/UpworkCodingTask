import React from 'react';
import { TaskDoc } from '../../db/schema';
// import { getStatusConfig } from '../../utils/statusHelpers';
import { 
  BarChart3, 
  ClipboardList, 
  // Settings, 
  // MapPin, 
  Clock,
  CheckCircle2,
  Circle,
  ArrowRight,
  Play,
  // Pause,
  AlertTriangle,
  Eye
} from 'lucide-react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';

interface TaskViewModeProps {
  task: TaskDoc;
}

const TaskViewMode: React.FC<TaskViewModeProps> = ({ task }) => {
  const completedItems = task.checklist.filter(item => item.status === 'DONE').length;
  const totalItems = task.checklist.length;
  const progress = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Progress Overview */}
      <Card padding="md" className="bg-slate-50 border-slate-200">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-blue-600" />
            Progress Overview
          </h4>
          <span className="text-sm font-medium text-slate-600">
            {completedItems}/{totalItems} completed
          </span>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-slate-200 rounded-full h-3 mb-2">
          <div 
            className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        
        <div className="text-sm text-slate-600">
          {progress}% Complete
        </div>
      </Card>

      {/* Advanced Step-by-Step Checklist */}
      <div>
        <div className="flex items-center gap-2 mb-6">
          <ClipboardList className="w-5 h-5 text-slate-600" />
          <h4 className="text-lg font-semibold text-slate-900">Project Steps</h4>
          <Badge variant="default" size="sm">{completedItems} of {totalItems} completed</Badge>
        </div>
        
        <div className="relative">
          {/* Progress Line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-slate-200"></div>
          <div 
            className="absolute left-6 top-0 w-0.5 bg-gradient-to-b from-blue-500 to-green-500 transition-all duration-1000"
            style={{ height: `${(completedItems / totalItems) * 100}%` }}
          ></div>
          
          <div className="space-y-4">
            {task.checklist.map((item, index) => {
              const isCompleted = item.status === 'DONE';
              const isInProgress = item.status === 'IN_PROGRESS';
              const isBlocked = item.status === 'BLOCKED';
              const isFinalCheck = item.status === 'FINAL_CHECK_AWAITING';
              // const isNotStarted = item.status === 'NOT_STARTED';
              
              return (
                <div key={item.id || index} className="relative flex items-start gap-4">
                  {/* Step Circle */}
                  <div className={`relative z-10 flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 ${
                    isCompleted 
                      ? 'bg-green-500 border-green-500 shadow-lg shadow-green-200' 
                      : isInProgress
                      ? 'bg-blue-500 border-blue-500 shadow-lg shadow-blue-200 animate-pulse'
                      : isBlocked
                      ? 'bg-red-500 border-red-500 shadow-lg shadow-red-200'
                      : isFinalCheck
                      ? 'bg-orange-500 border-orange-500 shadow-lg shadow-orange-200'
                      : 'bg-white border-slate-300 shadow-sm'
                  }`}>
                    {isCompleted ? (
                      <CheckCircle2 className="w-6 h-6 text-white" />
                    ) : isInProgress ? (
                      <Play className="w-5 h-5 text-white" />
                    ) : isBlocked ? (
                      <AlertTriangle className="w-5 h-5 text-white" />
                    ) : isFinalCheck ? (
                      <Eye className="w-5 h-5 text-white" />
                    ) : (
                      <Circle className="w-5 h-5 text-slate-400" />
                    )}
                  </div>
                  
                  {/* Step Content */}
                  <div className={`flex-1 min-w-0 pb-4 transition-all duration-300 ${
                    isCompleted ? 'opacity-75' : 'opacity-100'
                  }`}>
                    <Card 
                      padding="md" 
                      className={`transition-all duration-300 hover:shadow-md ${
                        isCompleted 
                          ? 'bg-green-50 border-green-200' 
                          : isInProgress
                          ? 'bg-blue-50 border-blue-200 shadow-sm'
                          : isBlocked
                          ? 'bg-red-50 border-red-200'
                          : isFinalCheck
                          ? 'bg-orange-50 border-orange-200'
                          : 'bg-slate-50 border-slate-200 hover:bg-white'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <h5 className={`font-semibold mb-2 ${
                            isCompleted ? 'line-through text-slate-600' : 'text-slate-900'
                          }`}>
                            Step {index + 1}: {item.text}
                          </h5>
                          
                          <div className="flex items-center gap-3 flex-wrap">
                            <Badge 
                              variant={
                                isCompleted ? 'success' : 
                                isInProgress ? 'info' : 
                                isBlocked ? 'danger' : 
                                isFinalCheck ? 'warning' : 
                                'default'
                              } 
                              size="sm"
                            >
                              {isCompleted ? '✓ Completed' :
                               isInProgress ? '▶ In Progress' :
                               isBlocked ? '⚠ Blocked' :
                               isFinalCheck ? '👁 Final Check' :
                               '⏸ Not Started'}
                            </Badge>
                            
                            {item.updatedAt && (
                              <span className="text-xs text-slate-500 flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {new Date(item.updatedAt).toLocaleDateString()}
                              </span>
                            )}
                          </div>
                        </div>
                        
                        {/* Step Number Badge */}
                        <div className={`ml-3 flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold ${
                          isCompleted 
                            ? 'bg-green-100 text-green-700' 
                            : isInProgress
                            ? 'bg-blue-100 text-blue-700'
                            : isBlocked
                            ? 'bg-red-100 text-red-700'
                            : isFinalCheck
                            ? 'bg-orange-100 text-orange-700'
                            : 'bg-slate-100 text-slate-600'
                        }`}>
                          {index + 1}
                        </div>
                      </div>
                    </Card>
                  </div>
                  
                  {/* Connection Arrow (except for last item) */}
                  {index < task.checklist.length - 1 && (
                    <div className="absolute left-12 top-16 flex items-center justify-center w-6 h-6">
                      <ArrowRight className={`w-4 h-4 transition-colors duration-300 ${
                        isCompleted ? 'text-green-400' : 'text-slate-300'
                      }`} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          
          {/* Completion Celebration */}
          {completedItems === totalItems && totalItems > 0 && (
            <div className="mt-6 text-center">
              <Card padding="lg" className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
                <div className="flex items-center justify-center gap-3 mb-2">
                  <CheckCircle2 className="w-8 h-8 text-green-500" />
                  <h3 className="text-xl font-bold text-green-700">Task Complete! 🎉</h3>
                </div>
                <p className="text-green-600">All steps have been successfully completed.</p>
              </Card>
            </div>
          )}
        </div>
      </div>

      {/* Task Metadata */}
      {/* <Card padding="md" className="bg-slate-50 border-slate-200">
        <h4 className="text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2">
          <Settings className="w-4 h-4" />
          Task Information
        </h4>
        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-slate-600">Created:</span>
            <span className="font-medium text-slate-900">
              {new Date(task.createdAt).toLocaleString()}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-600">Last Updated:</span>
            <span className="font-medium text-slate-900">
              {new Date(task.updatedAt).toLocaleString()}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-600">Position:</span>
            <span className="font-medium text-slate-900 flex items-center gap-1">
              {task.position ? (
                <>
                  <MapPin className="w-3 h-3 text-green-500" />
                  On floor plan
                </>
              ) : (
                <>
                  <MapPin className="w-3 h-3 text-slate-400" />
                  Not positioned
                </>
              )}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-600">Status:</span>
            <Badge variant={task.isBlocked ? 'danger' : 'success'}>
              {task.isBlocked ? 'Blocked' : 'Active'}
            </Badge>
          </div>
        </div>
      </Card> */}
    </div>
  );
};

export default TaskViewMode;
