import React from 'react';
import { Field, ErrorMessage } from 'formik';
import Input from '../ui/Input';

const TaskBasicFields: React.FC = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-900">Task Details</h2>
      
      <div>
        <Field name="title">
          {({ field, meta }: any) => (
            <Input
              {...field}
              label="Task Title *"
              placeholder="Enter task title"
              error={meta.touched && meta.error ? meta.error : undefined}
              fullWidth
            />
          )}
        </Field>
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
  );
};

export default TaskBasicFields;
