import { ChecklistItemStatus } from '../db/schema';
import { CHECKLIST_STATUS } from './status';

// Database Default Values
export const DEFAULT_CHECKLIST_ITEMS = [
  {
    text: 'Initial inspection',
    status: CHECKLIST_STATUS.NOT_STARTED as ChecklistItemStatus
  },
  {
    text: 'Material verification',
    status: CHECKLIST_STATUS.NOT_STARTED as ChecklistItemStatus
  }
] as const;

// Validation Constants
export const VALIDATION_LIMITS = {
  USER_NAME: {
    MIN_LENGTH: 2,
    MAX_LENGTH: 50,
    PATTERN: /^[a-zA-Z\s]+$/
  },
  TASK_TITLE: {
    MIN_LENGTH: 3,
    MAX_LENGTH: 100
  },
  TASK_DESCRIPTION: {
    MAX_LENGTH: 500
  },
  CHECKLIST_ITEM: {
    MIN_LENGTH: 1,
    MAX_LENGTH: 200
  },
  CHECKLIST: {
    MIN_ITEMS: 1,
    MAX_ITEMS: 20
  }
} as const;

// Status Values
export const CHECKLIST_STATUSES = [
  CHECKLIST_STATUS.NOT_STARTED,
  CHECKLIST_STATUS.IN_PROGRESS, 
  CHECKLIST_STATUS.BLOCKED,
  CHECKLIST_STATUS.FINAL_CHECK_AWAITING,
  CHECKLIST_STATUS.DONE
] as ChecklistItemStatus[];

// Task Status Types
export const TASK_STATUS_TYPES = [
  'all',
  'in-progress',
  'blocked', 
  'completed'
] as const;

export const SORT_TYPES = [
  'created',
  'title',
  'status'
] as const;

// Error Messages
export const ERROR_MESSAGES = {
  REQUIRED: 'This field is required',
  NAME_REQUIRED: 'Name is required',
  NAME_MIN_LENGTH: 'Name must be at least 2 characters',
  NAME_MAX_LENGTH: 'Name must not exceed 50 characters',
  NAME_PATTERN: 'Name can only contain letters and spaces',
  TITLE_REQUIRED: 'Task title is required',
  TITLE_MIN_LENGTH: 'Title must be at least 3 characters',
  TITLE_MAX_LENGTH: 'Title must not exceed 100 characters',
  DESCRIPTION_MAX_LENGTH: 'Description must not exceed 500 characters',
  CHECKLIST_ITEM_REQUIRED: 'Checklist item text is required',
  CHECKLIST_ITEM_MIN_LENGTH: 'Text must not be empty',
  CHECKLIST_ITEM_MAX_LENGTH: 'Text must not exceed 200 characters',
  CHECKLIST_MIN_ITEMS: 'At least one checklist item is required',
  CHECKLIST_MAX_ITEMS: 'Maximum 20 checklist items allowed',
  STATUS_REQUIRED: 'Status is required'
} as const;
