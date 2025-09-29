import { ChecklistItemStatus } from '../db/schema';
import { 
  Pause, 
  Play, 
  XCircle, 
  Clock, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';

// Checklist Item Status Constants
export const CHECKLIST_STATUS = {
  NOT_STARTED: 'NOT_STARTED',
  IN_PROGRESS: 'IN_PROGRESS',
  BLOCKED: 'BLOCKED',
  FINAL_CHECK_AWAITING: 'FINAL_CHECK_AWAITING',
  DONE: 'DONE'
} as const;

export const STATUS_CONFIG = {
  [CHECKLIST_STATUS.NOT_STARTED]: {
    label: 'Not Started',
    color: 'bg-gray-100 text-gray-800',
    badgeVariant: 'default' as const,
    icon: Pause,
    iconColor: 'text-gray-500',
    // TaskViewMode specific styles
    circleBg: 'bg-white border-slate-300 shadow-sm',
    cardBg: 'bg-slate-50 border-slate-200 hover:bg-white',
    stepNumberBg: 'bg-slate-100 text-slate-600',
    displayText: '⏸ Not Started'
  },
  [CHECKLIST_STATUS.IN_PROGRESS]: {
    label: 'In Progress',
    color: 'bg-blue-100 text-blue-800',
    badgeVariant: 'info' as const,
    icon: Play,
    iconColor: 'text-blue-500',
    // TaskViewMode specific styles
    circleBg: 'bg-blue-500 border-blue-500 shadow-lg shadow-blue-200 animate-pulse',
    cardBg: 'bg-blue-50 border-blue-200 shadow-sm',
    stepNumberBg: 'bg-blue-100 text-blue-700',
    displayText: '▶ In Progress'
  },
  [CHECKLIST_STATUS.BLOCKED]: {
    label: 'Blocked',
    color: 'bg-red-100 text-red-800',
    badgeVariant: 'danger' as const,
    icon: XCircle,
    iconColor: 'text-red-500',
    // TaskViewMode specific styles
    circleBg: 'bg-red-500 border-red-500 shadow-lg shadow-red-200',
    cardBg: 'bg-red-50 border-red-200',
    stepNumberBg: 'bg-red-100 text-red-700',
    displayText: '⚠ Blocked'
  },
  [CHECKLIST_STATUS.FINAL_CHECK_AWAITING]: {
    label: 'Final Check Awaiting',
    color: 'bg-yellow-100 text-yellow-800',
    badgeVariant: 'warning' as const,
    icon: Clock,
    iconColor: 'text-yellow-500',
    // TaskViewMode specific styles
    circleBg: 'bg-orange-500 border-orange-500 shadow-lg shadow-orange-200',
    cardBg: 'bg-orange-50 border-orange-200',
    stepNumberBg: 'bg-orange-100 text-orange-700',
    displayText: '👁 Final Check'
  },
  [CHECKLIST_STATUS.DONE]: {
    label: 'Done',
    color: 'bg-green-100 text-green-800',
    badgeVariant: 'success' as const,
    icon: CheckCircle2,
    iconColor: 'text-green-500',
    // TaskViewMode specific styles
    circleBg: 'bg-green-500 border-green-500 shadow-lg shadow-green-200',
    cardBg: 'bg-green-50 border-green-200',
    stepNumberBg: 'bg-green-100 text-green-700',
    displayText: '✓ Completed'
  }
} as const;

export const getStatusConfig = (status: ChecklistItemStatus) => {
  return STATUS_CONFIG[status] || {
    label: 'Unknown',
    color: 'bg-gray-100 text-gray-800',
    badgeVariant: 'default' as const,
    icon: AlertCircle,
    iconColor: 'text-gray-400'
  };
};

export const STATUS_OPTIONS = [
  { value: CHECKLIST_STATUS.NOT_STARTED, label: 'Not Started' },
  { value: CHECKLIST_STATUS.IN_PROGRESS, label: 'In Progress' },
  { value: CHECKLIST_STATUS.BLOCKED, label: 'Blocked' },
  { value: CHECKLIST_STATUS.FINAL_CHECK_AWAITING, label: 'Final Check Awaiting' },
  { value: CHECKLIST_STATUS.DONE, label: 'Done' }
];

export const FILTER_OPTIONS = [
  { value: 'all', label: 'All Tasks' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'blocked', label: 'Blocked' },
  { value: 'completed', label: 'Completed' }
];

export const SORT_OPTIONS = [
  { value: 'created', label: 'Date Created' },
  { value: 'title', label: 'Title' },
  { value: 'status', label: 'Status' }
];
