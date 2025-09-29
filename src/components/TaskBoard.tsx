import React, { useEffect, useState } from 'react';
import { useTaskStore } from '../store/taskStore';
import { useUserStore } from '../store/userStore';
import { useNavigate } from 'react-router-dom';
import { deleteTask } from '../db/db';
import { TaskDoc } from '../db/schema';

const TaskBoard: React.FC = () => {
  const { tasks, subscribeToTasks, isLoading, error } = useTaskStore();
  const { currentUser } = useUserStore();
  const navigate = useNavigate();
  const [deletingTaskId, setDeletingTaskId] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'blocked' | 'completed' | 'in-progress'>('all');
  const [sortBy, setSortBy] = useState<'title' | 'created' | 'status'>('created');

  useEffect(() => {
    if (currentUser) {
      subscribeToTasks(currentUser.id);
    }
  }, [currentUser, subscribeToTasks]);

  const handleDeleteTask = async (taskId: string) => {
    if (window.confirm('Are you sure you want to delete this task? This action cannot be undone.')) {
      try {
        setDeletingTaskId(taskId);
        await deleteTask(taskId);
      } catch (error) {
        console.error('Error deleting task:', error);
        alert('Failed to delete task. Please try again.');
      } finally {
        setDeletingTaskId(null);
      }
    }
  };

  const getTaskStatus = (task: TaskDoc) => {
    if (task.isBlocked) return 'blocked';
    
    const completedItems = task.checklist.filter(item => item.status === 'DONE').length;
    const totalItems = task.checklist.length;
    
    if (completedItems === totalItems && totalItems > 0) return 'completed';
    if (completedItems > 0) return 'in-progress';
    return 'not-started';
  };

  const getStatusBadge = (task: TaskDoc) => {
    const status = getTaskStatus(task);
    const completedItems = task.checklist.filter(item => item.status === 'DONE').length;
    const totalItems = task.checklist.length;

    switch (status) {
      case 'blocked':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">Blocked</span>;
      case 'completed':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Complete</span>;
      case 'in-progress':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">{completedItems}/{totalItems} Done</span>;
      default:
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">Not Started</span>;
    }
  };

  const filteredAndSortedTasks = React.useMemo(() => {
    let filtered = tasks;

    // Apply filter
    switch (filter) {
      case 'blocked':
        filtered = tasks.filter(task => task.isBlocked);
        break;
      case 'completed':
        filtered = tasks.filter(task => {
          const completedItems = task.checklist.filter(item => item.status === 'DONE').length;
          return completedItems === task.checklist.length && task.checklist.length > 0;
        });
        break;
      case 'in-progress':
        filtered = tasks.filter(task => {
          const completedItems = task.checklist.filter(item => item.status === 'DONE').length;
          return completedItems > 0 && completedItems < task.checklist.length;
        });
        break;
      default:
        filtered = tasks;
    }

    // Apply sort
    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'status':
          const statusA = getTaskStatus(a);
          const statusB = getTaskStatus(b);
          return statusA.localeCompare(statusB);
        case 'created':
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });
  }, [tasks, filter, sortBy]);

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-sm max-w-md w-full text-center">
          <div className="text-red-500 mb-4">
            <svg className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Error Loading Tasks</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Task Board</h1>
              <p className="text-gray-600">Manage all your construction tasks</p>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => navigate('/plan')}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Floor Plan
              </button>
              <button
                onClick={() => {
                  useUserStore.getState().clearUser();
                  navigate('/login');
                }}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters and Sort */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-4">
              <label className="text-sm font-medium text-gray-700">Filter:</label>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value as any)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Tasks</option>
                <option value="in-progress">In Progress</option>
                <option value="blocked">Blocked</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            
            <div className="flex items-center space-x-4">
              <label className="text-sm font-medium text-gray-700">Sort by:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="created">Date Created</option>
                <option value="title">Title</option>
                <option value="status">Status</option>
              </select>
            </div>
          </div>
        </div>

        {/* Task List */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-flex items-center space-x-2 text-gray-600">
              <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Loading tasks...</span>
            </div>
          </div>
        ) : filteredAndSortedTasks.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <div className="text-gray-400 mb-4">
              <svg className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {filter === 'all' ? 'No tasks yet' : `No ${filter.replace('-', ' ')} tasks`}
            </h3>
            <p className="text-gray-600 mb-6">
              {filter === 'all' 
                ? 'Get started by creating your first task on the floor plan.'
                : 'Try adjusting your filters to see more tasks.'
              }
            </p>
            <button
              onClick={() => navigate('/plan')}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Go to Floor Plan
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredAndSortedTasks.map((task) => (
              <div
                key={task.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{task.title}</h3>
                        {getStatusBadge(task)}
                      </div>
                      
                      {task.description && (
                        <p className="text-gray-600 mb-3">{task.description}</p>
                      )}
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>
                          Created: {new Date(task.createdAt).toLocaleDateString()}
                        </span>
                        <span>•</span>
                        <span>
                          {task.checklist.length} checklist {task.checklist.length === 1 ? 'item' : 'items'}
                        </span>
                        {task.position && (
                          <>
                            <span>•</span>
                            <span>📍 On floor plan</span>
                          </>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 ml-4">
                      <button
                        onClick={() => navigate(`/task/${task.id}`)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteTask(task.id)}
                        disabled={deletingTaskId === task.id}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        {deletingTaskId === task.id ? (
                          <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                        ) : (
                          'Delete'
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Summary Stats */}
        {tasks.length > 0 && (
          <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Summary</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{tasks.length}</div>
                <div className="text-sm text-gray-600">Total Tasks</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">
                  {tasks.filter(t => t.isBlocked).length}
                </div>
                <div className="text-sm text-gray-600">Blocked</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {tasks.filter(t => {
                    const completed = t.checklist.filter(item => item.status === 'DONE').length;
                    return completed > 0 && completed < t.checklist.length;
                  }).length}
                </div>
                <div className="text-sm text-gray-600">In Progress</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {tasks.filter(t => {
                    const completed = t.checklist.filter(item => item.status === 'DONE').length;
                    return completed === t.checklist.length && t.checklist.length > 0;
                  }).length}
                </div>
                <div className="text-sm text-gray-600">Completed</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskBoard;
