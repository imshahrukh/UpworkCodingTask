import * as yup from 'yup';
import { ChecklistItemStatus } from '../db/schema';

// User validation schema
export const userLoginSchema = yup.object({
  name: yup
    .string()
    .trim()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must not exceed 50 characters')
    .matches(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces'),
});

// Task validation schema
export const taskSchema = yup.object({
  title: yup
    .string()
    .trim()
    .required('Task title is required')
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title must not exceed 100 characters'),
  description: yup
    .string()
    .trim()
    .max(500, 'Description must not exceed 500 characters')
    .nullable(),
});

// Checklist item validation schema
export const checklistItemSchema = yup.object({
  text: yup
    .string()
    .trim()
    .required('Checklist item text is required')
    .min(1, 'Text must not be empty')
    .max(200, 'Text must not exceed 200 characters'),
  status: yup
    .string()
    .oneOf(
      ['NOT_STARTED', 'IN_PROGRESS', 'BLOCKED', 'FINAL_CHECK_AWAITING', 'DONE'] as ChecklistItemStatus[],
      'Invalid status'
    )
    .required('Status is required'),
});

// Task form validation schema (includes checklist)
export const taskFormSchema = yup.object({
  title: yup
    .string()
    .trim()
    .required('Task title is required')
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title must not exceed 100 characters'),
  description: yup
    .string()
    .trim()
    .max(500, 'Description must not exceed 500 characters')
    .nullable(),
  checklist: yup
    .array()
    .of(checklistItemSchema)
    .min(1, 'At least one checklist item is required')
    .max(20, 'Maximum 20 checklist items allowed'),
});

// Quick task creation schema (for plan view)
export const quickTaskSchema = yup.object({
  title: yup
    .string()
    .trim()
    .required('Task title is required')
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title must not exceed 100 characters'),
});

// Position validation for floor plan tasks
export const positionSchema = yup.object({
  x: yup
    .number()
    .min(0, 'X coordinate must be non-negative')
    .max(1, 'X coordinate must not exceed 1')
    .required('X coordinate is required'),
  y: yup
    .number()
    .min(0, 'Y coordinate must be non-negative')
    .max(1, 'Y coordinate must not exceed 1')
    .required('Y coordinate is required'),
});

// Export types for form values
export type UserLoginFormValues = yup.InferType<typeof userLoginSchema>;
export type TaskFormValues = yup.InferType<typeof taskFormSchema>;
export type ChecklistItemFormValues = yup.InferType<typeof checklistItemSchema>;
export type QuickTaskFormValues = yup.InferType<typeof quickTaskSchema>;
export type PositionFormValues = yup.InferType<typeof positionSchema>;
