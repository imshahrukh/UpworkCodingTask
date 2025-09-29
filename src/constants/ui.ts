// UI Component Constants

export const BUTTON_VARIANTS = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 shadow-sm hover:shadow-md',
  secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500 shadow-sm hover:shadow-md',
  danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 shadow-sm hover:shadow-md',
  ghost: 'text-slate-600 hover:text-slate-700 hover:bg-slate-100 focus:ring-slate-500 border border-slate-200 hover:border-slate-300'
} as const;

export const BUTTON_SIZES = {
  sm: { withText: 'px-3 py-2 text-sm', iconOnly: 'p-2 text-sm' },
  md: { withText: 'px-4 py-2 text-sm', iconOnly: 'p-3 text-sm' },
  lg: { withText: 'px-6 py-3 text-base', iconOnly: 'p-4 text-base' }
} as const;

export const BADGE_VARIANTS = {
  default: 'bg-gray-50 text-gray-700 border-gray-200',
  success: 'bg-green-50 text-green-700 border-green-200',
  warning: 'bg-yellow-50 text-yellow-700 border-yellow-200',
  danger: 'bg-red-50 text-red-700 border-red-200',
  info: 'bg-blue-50 text-blue-700 border-blue-200'
} as const;

export const BADGE_SIZES = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-xs'
} as const;

export const BADGE_ICON_SIZES = {
  sm: 'w-3 h-3',
  md: 'w-3 h-3'
} as const;

export const CARD_PADDING = {
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-6'
} as const;

export const CARD_SHADOWS = {
  none: '',
  sm: 'shadow-sm',
  md: 'shadow-md',
  lg: 'shadow-lg'
} as const;

export const INPUT_STATES = {
  default: 'border-gray-300 focus:ring-blue-500',
  error: 'border-red-300 focus:ring-red-500'
} as const;

export const SELECT_STATES = {
  default: 'border-gray-300 focus:ring-blue-500 hover:border-gray-400',
  error: 'border-red-300 focus:ring-red-500'
} as const;

export const LOADING_SPINNER_SIZES = {
  sm: 'h-4 w-4',
  md: 'h-6 w-6',
  lg: 'h-8 w-8'
} as const;
