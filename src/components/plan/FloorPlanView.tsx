import React, { useRef, useMemo, useCallback } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { TaskDoc } from '../../db/schema';
import { quickTaskSchema, QuickTaskFormValues } from '../../validation/schemas';
import { 
  Building2, 
  Plus, 
  Target, 
  X, 
  AlertCircle 
} from 'lucide-react';
import Button from '../ui/Button';
import Card from '../ui/Card';
import TaskMarker from './TaskMarker';
import FloorPlanLegend from './FloorPlanLegend';

interface FloorPlanViewProps {
  tasks: TaskDoc[];
  selectedTask: TaskDoc | null;
  isCreating: boolean;
  onTaskCreate: (e: React.MouseEvent<HTMLImageElement>, values: QuickTaskFormValues, resetForm: () => void) => void;
  onTaskSelect: (task: TaskDoc) => void;
}

const FloorPlanView: React.FC<FloorPlanViewProps> = ({
  tasks,
  selectedTask,
  isCreating,
  onTaskCreate,
  onTaskSelect
}) => {
  const imgRef = useRef<HTMLImageElement>(null);

  const initialValues: QuickTaskFormValues = useMemo(() => ({
    title: '',
  }), []);

  const positionedTasks = useMemo(() => 
    tasks.filter(task => task.position), 
    [tasks]
  );

  const handleImageClick = useCallback((e: React.MouseEvent<HTMLImageElement>, values: QuickTaskFormValues, resetForm: () => void) => {
    onTaskCreate(e, values, resetForm);
  }, [onTaskCreate]);

  return (
    <div className="flex-1 flex flex-col bg-white shadow-sm overflow-hidden">
      <div className="flex-shrink-0 p-6 border-b border-slate-200 bg-gradient-to-r from-white to-slate-50">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Building2 className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Interactive Floor Plan</h2>
            <p className="text-sm text-slate-600">Click to place tasks • Professional project visualization</p>
          </div>
        </div>
        
        <Formik
          initialValues={initialValues}
          validationSchema={quickTaskSchema}
          onSubmit={() => {}} 
        >
          {({ values, resetForm, isValid, dirty }) => (
            <Form>
              <div className="space-y-2">
                <div className="flex space-x-3 items-start">
                  <div className="flex-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Plus className="h-4 w-4 text-slate-400" />
                    </div>
                    <Field
                      name="title"
                      type="text"
                      placeholder="Enter task title, then click on floor plan to place it..."
                      className="w-full pl-10 pr-4 py-3 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm"
                      disabled={isCreating}
                    />
                  </div>
                  <Button
                    type="button"
                    onClick={() => resetForm()}
                    disabled={!dirty || isCreating}
                    variant="secondary"
                    icon={X}
                    size="lg"
                    className="h-12 flex-shrink-0"
                  >
                    Clear
                  </Button>
                </div>
                <ErrorMessage name="title">
                  {(errorMessage) => (
                    <div className="text-xs text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3 flex-shrink-0" />
                      {errorMessage}
                    </div>
                  )}
                </ErrorMessage>
              </div>

              <div className="mt-6 relative">
                <div className={`relative rounded-xl border-2 transition-all duration-200 ${
                  isValid && dirty && !isCreating
                    ? 'border-blue-400 shadow-lg cursor-crosshair hover:border-blue-500 hover:shadow-xl'
                    : 'border-slate-300 shadow-sm cursor-default'
                }`}>
                  <img
                    ref={imgRef}
                    src="/assets/image.webp"
                    alt="Interactive Floor Plan"
                    className="max-w-full h-auto rounded-xl"
                    onClick={(e) => {
                      if (isValid && dirty && !isCreating) {
                        handleImageClick(e, values, resetForm);
                      }
                    }}
                  />
                  
                  {/* Instruction Overlay */}
                  {isValid && dirty && !isCreating && (
                    <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-2 rounded-lg shadow-lg text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <Target className="w-4 h-4" />
                        Click to place "{values.title}"
                      </div>
                    </div>
                  )}

                  {positionedTasks.map((task) => (
                    <TaskMarker
                      key={task.id}
                      task={task}
                      isSelected={selectedTask?.id === task.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        onTaskSelect(task);
                      }}
                    />
                  ))}

                  {isCreating && (
                    <div className="absolute inset-0 bg-slate-900 bg-opacity-30 flex items-center justify-center rounded-xl backdrop-blur-sm">
                      <Card padding="md" shadow="lg">
                        <div className="flex items-center space-x-3">
                          <div className="animate-spin rounded-full h-5 w-5 border-2 border-blue-600 border-t-transparent"></div>
                          <span className="text-sm font-medium text-slate-700">Creating task...</span>
                        </div>
                      </Card>
                    </div>
                  )}
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>

      <div className="flex-1 overflow-y-auto min-h-0">
        <FloorPlanLegend />
      </div>
    </div>
  );
};

export default FloorPlanView;
