import React from 'react';
import { FieldArray } from 'formik';
import { ChecklistItemStatus } from '../../db/schema';
import { v4 as uuidv4 } from 'uuid';
import ChecklistItem from './ChecklistItem';
import Button from '../ui/Button';
import { Plus } from 'lucide-react';

interface ChecklistSectionProps {
  values: any;
}

const ChecklistSection: React.FC<ChecklistSectionProps> = ({ values }) => {
  return (
    <div className="border-t pt-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Checklist Items</h2>
        <span className="text-sm text-gray-500">
          {(values.checklist || []).filter((item: any) => item.status === 'DONE').length} of {(values.checklist || []).length} completed
        </span>
      </div>

      <FieldArray name="checklist">
        {({ push, remove }) => (
          <div className="space-y-4">
            {(values.checklist || []).map((item: any, index: number) => (
              <ChecklistItem
                key={index}
                index={index}
                item={item}
                onRemove={() => remove(index)}
              />
            ))}

            <Button
              type="button"
              onClick={() => push({
                id: uuidv4(),
                text: '',
                status: 'NOT_STARTED' as ChecklistItemStatus,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
              })}
              variant="ghost"
              icon={Plus}
              fullWidth
              className="border-2 border-dashed border-gray-300 hover:border-gray-400"
            >
              Add Checklist Item
            </Button>
          </div>
        )}
      </FieldArray>
    </div>
  );
};

export default ChecklistSection;
