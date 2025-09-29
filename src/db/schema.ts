// Type definition for RxDB schema
type RxJsonSchema = {
  title: string;
  version: number;
  primaryKey: string;
  type: string;
  properties: any;
  required: string[];
};

export const userSchema: RxJsonSchema = {
  title: 'user schema',
  version: 0,
  primaryKey: 'id',
  type: 'object',
  properties: {
    id: {
      type: 'string',
      maxLength: 100
    },
    name: {
      type: 'string',
      maxLength: 100
    },
    createdAt: {
      type: 'string',
      format: 'date-time'
    }
  },
  required: ['id', 'name', 'createdAt'],
};

export type ChecklistItemStatus = 'NOT_STARTED' | 'IN_PROGRESS' | 'BLOCKED' | 'FINAL_CHECK_AWAITING' | 'DONE';

export type ChecklistItem = {
  id: string;
  text: string;
  status: ChecklistItemStatus;
  createdAt: string;
  updatedAt: string;
};

export const taskSchema: RxJsonSchema = {
  title: 'task schema',
  version: 0,
  primaryKey: 'id',
  type: 'object',
  properties: {
    id: {
      type: 'string',
      maxLength: 100
    },
    userId: {
      type: 'string',
      maxLength: 100
    },
    title: {
      type: 'string',
      maxLength: 200
    },
    description: {
      type: 'string',
      maxLength: 1000
    },
    position: {
      type: ['object', 'null'],
      properties: {
        x: { type: 'number' },
        y: { type: 'number' }
      }
    },
    checklist: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          text: { type: 'string' },
          status: { type: 'string' },
          createdAt: { type: 'string' },
          updatedAt: { type: 'string' }
        },
        required: ['id', 'text', 'status', 'createdAt', 'updatedAt']
      }
    },
    createdAt: {
      type: 'string',
      format: 'date-time'
    },
    updatedAt: {
      type: 'string',
      format: 'date-time'
    },
    isBlocked: {
      type: 'boolean'
    }
  },
  required: ['id', 'userId', 'title', 'checklist', 'createdAt', 'updatedAt', 'isBlocked'],
};

export type UserDoc = {
  id: string;
  name: string;
  createdAt: string;
};

export type TaskDoc = {
  id: string;
  userId: string;
  title: string;
  description?: string;
  position?: { x: number; y: number };
  checklist: ChecklistItem[];
  createdAt: string;
  updatedAt: string;
  isBlocked: boolean;
};
