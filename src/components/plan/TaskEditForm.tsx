import React from 'react';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import { TaskDoc, ChecklistItemStatus } from '../../db/schema';
import { TaskFormValues, taskFormSchema } from '../../validation/schemas';
import { STATUS_OPTIONS } from '../../utils/statusHelpers';
import { Save, X } from 'lucide-react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Select from '../ui/Select';

interface TaskEditFormProps {
  task: TaskDoc;
  onSave: (values: TaskFormValues) => void;
  onCancel: () => void;
  isUpdating: boolean;
}

const TaskEditForm: React.FC<TaskEditFormProps> = ({
  task,
  onSave,
  onCancel,
  isUpdating
}) => {
  const initialValues: TaskFormValues = {
    title: task.title,
    description: task.description || '',
    checklist: task.checklist || [],
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={taskFormSchema}
      onSubmit={onSave}
    >
      {({ values, isValid, dirty, submitForm }) => (
        <div className="flex flex-col h-[90%]">
          <Form className="flex-1 space-y-4 overflow-y-auto pb-4">
            <div>
              <Field name="title">
                {({ field, meta }: any) => (
                  <Input
                    {...field}
                    label="Title"
                    error={meta.touched && meta.error ? meta.error : undefined}
                    fullWidth
                  />
                )}
              </Field>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <Field
                as="textarea"
                name="description"
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
              />
              <ErrorMessage name="description" component="div" className="mt-1 text-xs text-red-600" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Checklist</label>
              <FieldArray name="checklist">
                {({ push, remove }) => (
                  <div className="space-y-3">
                    {(values.checklist || []).map((item, index) => (
                      <div key={`checklist-item-${index}`} className="border border-gray-200 rounded-lg p-3">
                        <div className="space-y-2">
                          <Field
                            name={`checklist.${index}.text`}
                            type="text"
                            placeholder="Checklist item text"
                            className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                          />
                          <div className="flex items-center justify-between">
                            <Field name={`checklist.${index}.status`}>
                              {({ field }: any) => (
                                <Select
                                  {...field}
                                  options={STATUS_OPTIONS}
                                  className="text-sm"
                                />
                              )}
                            </Field>
                            <Button
                              type="button"
                              onClick={() => remove(index)}
                              variant="danger"
                              size="sm"
                            >
                              Remove
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    <Button
                      type="button"
                      onClick={() => push({
                        text: '',
                        status: 'NOT_STARTED' as ChecklistItemStatus,
                      })}
                      variant="ghost"
                      fullWidth
                    >
                      + Add Checklist Item
                    </Button>
                  </div>
                )}
              </FieldArray>
            </div>
          </Form>

          <div className="flex-shrink-0 border-t border-gray-200 bg-white p-4 mt-4">
            <div className="flex space-x-3">
              <Button
                type="button"
                onClick={submitForm}
                disabled={!isValid || !dirty || isUpdating}
                variant="primary"
                icon={Save}
                isLoading={isUpdating}
                fullWidth
              >
                Save Changes
              </Button>
              <Button
                type="button"
                onClick={onCancel}
                variant="ghost"
                icon={X}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default TaskEditForm;
