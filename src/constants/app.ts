// Application Configuration Constants

export const APP_CONFIG = {
  NAME: 'Task Manager',
  VERSION: '1.0.0',
  DESCRIPTION: 'Construction Tasks Management Application'
} as const;

// Route Paths
export const ROUTES = {
  LOGIN: '/login',
  PLAN: '/plan',
  HOME: '/'
} as const;

// Local Storage Keys
export const STORAGE_KEYS = {
  USER: 'task-manager-user',
  THEME: 'task-manager-theme',
  SETTINGS: 'task-manager-settings'
} as const;

// Database Configuration
export const DB_CONFIG = {
  NAME: 'task-manager-db',
  VERSION: 1,
  COLLECTIONS: {
    USERS: 'users',
    TASKS: 'tasks'
  }
} as const;

// UI Configuration
export const UI_CONFIG = {
  ANIMATION_DURATION: 200,
  DEBOUNCE_DELAY: 300,
  SCROLL_BEHAVIOR: 'smooth' as ScrollBehavior,
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  SUPPORTED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
} as const;

// Task Configuration
export const TASK_CONFIG = {
  DEFAULT_POSITION: { x: 0, y: 0 },
  MARKER_SIZE: 40,
  MARKER_COLORS: {
    DEFAULT: '#3B82F6',
    SELECTED: '#1D4ED8',
    COMPLETED: '#10B981',
    BLOCKED: '#EF4444'
  }
} as const;

// Floor Plan Configuration
export const FLOOR_PLAN_CONFIG = {
  MIN_ZOOM: 0.5,
  MAX_ZOOM: 3,
  DEFAULT_ZOOM: 1,
  GRID_SIZE: 20,
  SNAP_THRESHOLD: 10
} as const;
