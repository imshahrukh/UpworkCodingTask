import React from 'react';
import { Field, ErrorMessage } from 'formik';
import { getStatusConfig, STATUS_OPTIONS } from '../../utils/statusHelpers';
import Select from '../ui/Select';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import Card from '../ui/Card';
import { Trash2 } from 'lucide-react';

interface ChecklistItemProps {
  index: number;
  item: any;
  onRemove: () => void;
}

const ChecklistItem: React.FC<ChecklistItemProps> = ({ index, item, onRemove }) => {
  const statusConfig = getStatusConfig(item.status);
  const StatusIcon = statusConfig.icon;

  return (
    <Card padding="md" border>
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
              <Field name={`checklist.${index}.status`}>
                {({ field }: any) => (
                  <Select
                    {...field}
                    options={STATUS_OPTIONS}
                    className="flex-1"
                  />
                )}
              </Field>
              <Badge variant={statusConfig.badgeVariant} icon={StatusIcon}>
                {statusConfig.label}
              </Badge>
            </div>
            <ErrorMessage
              name={`checklist.${index}.status`}
              component="div"
              className="mt-1 text-sm text-red-600"
            />
          </div>
        </div>

        <Button
          type="button"
          onClick={onRemove}
          variant="danger"
          size="sm"
          icon={Trash2}
          className="flex-shrink-0 mt-6"
        />
      </div>
    </Card>
  );
};

export default ChecklistItem;
