import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import { useParams, useNavigate } from 'react-router-dom';
import { updateTask, getTaskById } from '../db/db';
import { useTaskStore } from '../store/taskStore';
import { taskFormSchema, TaskFormValues } from '../validation/schemas';
import { ChecklistItem, ChecklistItemStatus } from '../db/schema';
import { v4 as uuidv4 } from 'uuid';

const TaskForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { tasks, setSelectedTask } = useTaskStore();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [task, setTask] = useState<any>(null);

  useEffect(() => {
    const loadTask = async () => {
      if (!id) {
        setError('Task ID is required');
        setIsLoading(false);
        return;
      }

      try {
        // First try to get from store
        let taskData = tasks.find(t => t.id === id);
        
        // If not in store, fetch from database
        if (!taskData) {
          taskData = await getTaskById(id) || undefined;
        }

        if (!taskData) {
          setError('Task not found');
        } else {
          setTask(taskData);
          setSelectedTask(taskData);
        }
      } catch (err) {
        console.error('Error loading task:', err);
        setError('Failed to load task');
      } finally {
        setIsLoading(false);
      }
    };

    loadTask();
  }, [id, tasks, setSelectedTask]);

  const initialValues: TaskFormValues = {
    title: task?.title || '',
    description: task?.description || '',
    checklist: task?.checklist || [],
  };

  const handleSubmit = async (values: TaskFormValues) => {
    if (!id) return;

    try {
      setIsSaving(true);
      setError(null);

      // Ensure all checklist items have required fields
      const processedChecklist: ChecklistItem[] = (values.checklist || []).map((item: any) => ({
        ...item,
        id: item.id || uuidv4(),
        createdAt: item.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }));

      await updateTask(id, {
        title: values.title,
        description: values.description || undefined,
        checklist: processedChecklist,
      });

      navigate('/plan');
    } catch (err) {
      console.error('Error saving task:', err);
      setError('Failed to save task. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const getStatusColor = (status: ChecklistItemStatus) => {
    switch (status) {
      case 'NOT_STARTED':
        return 'bg-gray-100 text-gray-800';
      case 'IN_PROGRESS':
        return 'bg-blue-100 text-blue-800';
      case 'BLOCKED':
        return 'bg-red-100 text-red-800';
      case 'FINAL_CHECK_AWAITING':
        return 'bg-yellow-100 text-yellow-800';
      case 'DONE':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: ChecklistItemStatus) => {
    switch (status) {
      case 'NOT_STARTED':
        return '⏸️';
      case 'IN_PROGRESS':
        return '🔄';
      case 'BLOCKED':
        return '🚫';
      case 'FINAL_CHECK_AWAITING':
        return '⏳';
      case 'DONE':
        return '✅';
      default:
        return '❓';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-sm">
          <div className="flex items-center space-x-3">
            <svg className="animate-spin h-6 w-6 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span className="text-gray-700">Loading task...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error || !task) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-sm max-w-md w-full text-center">
          <div className="text-red-500 mb-4">
            <svg className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Error</h3>
          <p className="text-gray-600 mb-4">{error || 'Task not found'}</p>
          <div className="space-x-3">
            <button
              onClick={() => navigate('/tasks')}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Back to Tasks
            </button>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Edit Task</h1>
              <p className="text-gray-600">Update task details and manage checklist items</p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => navigate('/plan')}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6">
            <Formik
              initialValues={initialValues}
              validationSchema={taskFormSchema}
              onSubmit={handleSubmit}
              enableReinitialize
            >
              {({ values, isValid, dirty }) => (
                <Form className="space-y-6">
                  {/* Task Details */}
                  <div className="space-y-4">
                    <h2 className="text-lg font-semibold text-gray-900">Task Details</h2>
                    
                    <div>
                      <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                        Task Title *
                      </label>
                      <Field
                        id="title"
                        name="title"
                        type="text"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                        placeholder="Enter task title"
                      />
                      <ErrorMessage
                        name="title"
                        component="div"
                        className="mt-2 text-sm text-red-600"
                      />
                    </div>

                    <div>
                      <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                        Description
                      </label>
                      <Field
                        as="textarea"
                        id="description"
                        name="description"
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-vertical"
                        placeholder="Enter task description (optional)"
                      />
                      <ErrorMessage
                        name="description"
                        component="div"
                        className="mt-2 text-sm text-red-600"
                      />
                    </div>
                  </div>

                  {/* Checklist */}
                  <div className="border-t pt-6">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-lg font-semibold text-gray-900">Checklist Items</h2>
                      <span className="text-sm text-gray-500">
                        {(values.checklist || []).filter(item => item.status === 'DONE').length} of {(values.checklist || []).length} completed
                      </span>
                    </div>

                    <FieldArray name="checklist">
                      {({ push, remove }) => (
                        <div className="space-y-4">
                          {(values.checklist || []).map((item, index) => (
                            <div key={index} className="border border-gray-200 rounded-lg p-4">
                              <div className="flex items-start space-x-4">
                                <div className="flex-1 space-y-3">
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                      Item Text *
                                    </label>
                                    <Field
                                      name={`checklist.${index}.text`}
                                      type="text"
                                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                      placeholder="Enter checklist item"
                                    />
                                    <ErrorMessage
                                      name={`checklist.${index}.text`}
                                      component="div"
                                      className="mt-1 text-sm text-red-600"
                                    />
                                  </div>

                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                      Status
                                    </label>
                                    <div className="flex items-center space-x-2">
                                      <Field
                                        as="select"
                                        name={`checklist.${index}.status`}
                                        className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                      >
                                        <option value="NOT_STARTED">Not Started</option>
                                        <option value="IN_PROGRESS">In Progress</option>
                                        <option value="BLOCKED">Blocked</option>
                                        <option value="FINAL_CHECK_AWAITING">Final Check Awaiting</option>
                                        <option value="DONE">Done</option>
                                      </Field>
                                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                                        {getStatusIcon(item.status)} {item.status.replace('_', ' ').toLowerCase()}
                                      </span>
                                    </div>
                                    <ErrorMessage
                                      name={`checklist.${index}.status`}
                                      component="div"
                                      className="mt-1 text-sm text-red-600"
                                    />
                                  </div>
                                </div>

                                <button
                                  type="button"
                                  onClick={() => remove(index)}
                                  className="flex-shrink-0 p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                                  title="Remove item"
                                >
                                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                  </svg>
                                </button>
                              </div>
                            </div>
                          ))}

                          <button
                            type="button"
                            onClick={() => push({
                              id: uuidv4(),
                              text: '',
                              status: 'NOT_STARTED' as ChecklistItemStatus,
                              createdAt: new Date().toISOString(),
                              updatedAt: new Date().toISOString(),
                            })}
                            className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 hover:text-gray-700 transition-colors"
                          >
                            <svg className="h-5 w-5 inline mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            Add Checklist Item
                          </button>
                        </div>
                      )}
                    </FieldArray>

                    <ErrorMessage
                      name="checklist"
                      component="div"
                      className="mt-2 text-sm text-red-600"
                    />
                  </div>

                  {/* Form Actions */}
                  <div className="border-t pt-6 flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => navigate('/plan')}
                      className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                      disabled={isSaving}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={!isValid || !dirty || isSaving}
                      className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
                    >
                      {isSaving ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Saving...
                        </>
                      ) : (
                        'Save Changes'
                      )}
                    </button>
                  </div>

                  {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div className="ml-3">
                          <p className="text-sm text-red-800">{error}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </Form>
              )}
            </Formik>
          </div>
        </div>

        {/* Task Info */}
        <div className="mt-6 bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Task Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium text-gray-700">Created:</span>
              <span className="ml-2 text-gray-600">
                {new Date(task.createdAt).toLocaleString()}
              </span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Last Updated:</span>
              <span className="ml-2 text-gray-600">
                {new Date(task.updatedAt).toLocaleString()}
              </span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Position:</span>
              <span className="ml-2 text-gray-600">
                {task.position ? '📍 On floor plan' : 'Not positioned'}
              </span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Status:</span>
              <span className="ml-2">
                {task.isBlocked ? (
                  <span className="text-red-600 font-medium">🚫 Blocked</span>
                ) : (
                  <span className="text-green-600 font-medium">✅ Active</span>
                )}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskForm;
