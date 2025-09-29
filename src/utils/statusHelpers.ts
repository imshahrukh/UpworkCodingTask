import { ChecklistItemStatus } from '../db/schema';
import { 
  Pause, 
  Play, 
  XCircle, 
  Clock, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';

export const STATUS_CONFIG = {
  NOT_STARTED: {
    label: 'Not Started',
    color: 'bg-gray-100 text-gray-800',
    badgeVariant: 'default' as const,
    icon: Pause,
    iconColor: 'text-gray-500'
  },
  IN_PROGRESS: {
    label: 'In Progress',
    color: 'bg-blue-100 text-blue-800',
    badgeVariant: 'info' as const,
    icon: Play,
    iconColor: 'text-blue-500'
  },
  BLOCKED: {
    label: 'Blocked',
    color: 'bg-red-100 text-red-800',
    badgeVariant: 'danger' as const,
    icon: XCircle,
    iconColor: 'text-red-500'
  },
  FINAL_CHECK_AWAITING: {
    label: 'Final Check Awaiting',
    color: 'bg-yellow-100 text-yellow-800',
    badgeVariant: 'warning' as const,
    icon: Clock,
    iconColor: 'text-yellow-500'
  },
  DONE: {
    label: 'Done',
    color: 'bg-green-100 text-green-800',
    badgeVariant: 'success' as const,
    icon: CheckCircle2,
    iconColor: 'text-green-500'
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
  { value: 'NOT_STARTED', label: 'Not Started' },
  { value: 'IN_PROGRESS', label: 'In Progress' },
  { value: 'BLOCKED', label: 'Blocked' },
  { value: 'FINAL_CHECK_AWAITING', label: 'Final Check Awaiting' },
  { value: 'DONE', label: 'Done' }
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

