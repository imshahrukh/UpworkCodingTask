import * as yup from 'yup';
import { 
  VALIDATION_LIMITS, 
  ERROR_MESSAGES, 
  CHECKLIST_STATUSES 
} from '../constants/validation';

export const userLoginSchema = yup.object({
  name: yup
    .string()
    .trim()
    .required(ERROR_MESSAGES.NAME_REQUIRED)
    .min(VALIDATION_LIMITS.USER_NAME.MIN_LENGTH, ERROR_MESSAGES.NAME_MIN_LENGTH)
    .max(VALIDATION_LIMITS.USER_NAME.MAX_LENGTH, ERROR_MESSAGES.NAME_MAX_LENGTH)
    .matches(VALIDATION_LIMITS.USER_NAME.PATTERN, ERROR_MESSAGES.NAME_PATTERN),
});

const checklistItemSchema = yup.object({
  text: yup
    .string()
    .trim()
    .required(ERROR_MESSAGES.CHECKLIST_ITEM_REQUIRED)
    .min(VALIDATION_LIMITS.CHECKLIST_ITEM.MIN_LENGTH, ERROR_MESSAGES.CHECKLIST_ITEM_MIN_LENGTH)
    .max(VALIDATION_LIMITS.CHECKLIST_ITEM.MAX_LENGTH, ERROR_MESSAGES.CHECKLIST_ITEM_MAX_LENGTH),
  status: yup
    .string()
    .oneOf(CHECKLIST_STATUSES, ERROR_MESSAGES.STATUS_REQUIRED)
    .required(ERROR_MESSAGES.STATUS_REQUIRED),
});

export const taskFormSchema = yup.object({
  title: yup
    .string()
    .trim()
    .required(ERROR_MESSAGES.TITLE_REQUIRED)
    .min(VALIDATION_LIMITS.TASK_TITLE.MIN_LENGTH, ERROR_MESSAGES.TITLE_MIN_LENGTH)
    .max(VALIDATION_LIMITS.TASK_TITLE.MAX_LENGTH, ERROR_MESSAGES.TITLE_MAX_LENGTH),
  description: yup
    .string()
    .trim()
    .max(VALIDATION_LIMITS.TASK_DESCRIPTION.MAX_LENGTH, ERROR_MESSAGES.DESCRIPTION_MAX_LENGTH)
    .nullable(),
  checklist: yup
    .array()
    .of(checklistItemSchema)
    .min(VALIDATION_LIMITS.CHECKLIST.MIN_ITEMS, ERROR_MESSAGES.CHECKLIST_MIN_ITEMS)
    .max(VALIDATION_LIMITS.CHECKLIST.MAX_ITEMS, ERROR_MESSAGES.CHECKLIST_MAX_ITEMS),
});

export const quickTaskSchema = yup.object({
  title: yup
    .string()
    .trim()
    .required(ERROR_MESSAGES.TITLE_REQUIRED)
    .min(VALIDATION_LIMITS.TASK_TITLE.MIN_LENGTH, ERROR_MESSAGES.TITLE_MIN_LENGTH)
    .max(VALIDATION_LIMITS.TASK_TITLE.MAX_LENGTH, ERROR_MESSAGES.TITLE_MAX_LENGTH),
});

export type UserLoginFormValues = yup.InferType<typeof userLoginSchema>;
export type TaskFormValues = yup.InferType<typeof taskFormSchema>;
export type QuickTaskFormValues = yup.InferType<typeof quickTaskSchema>;
