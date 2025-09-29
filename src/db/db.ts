// @ts-ignore
import { createRxDatabase, addRxPlugin } from 'rxdb';
// @ts-ignore
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie';
import { userSchema, taskSchema, ChecklistItem, UserDoc, TaskDoc, ChecklistItemStatus } from './schema';
import { v4 as uuidv4 } from 'uuid';
import { Observable } from 'rxjs';

// Type definitions for RxDB (simplified)
type RxDocument<T> = {
  toJSON: () => T;
  patch: (data: any) => Promise<void>;
  remove: () => Promise<void>;
};

type RxCollection<T> = {
  findOne: (selector?: any) => { exec: () => Promise<RxDocument<T> | null> };
  find: (query?: any) => { $: Observable<T[]> };
  insert: (doc: T) => Promise<RxDocument<T>>;
};

type RxDatabase = {
  addCollections: (collections: any) => Promise<void>;
  users: RxCollection<UserDoc>;
  tasks: RxCollection<TaskDoc>;
};

// Add the storage plugin
try {
  // @ts-ignore
  addRxPlugin(getRxStorageDexie());
} catch (e) {
  console.warn('RxDB plugin loading issue:', e);
}

type DatabaseType = RxDatabase;

let dbPromise: Promise<DatabaseType> | null = null;

export async function getDB(): Promise<DatabaseType> {
  if (!dbPromise) {
    // @ts-ignore
    dbPromise = createRxDatabase({
      name: 'constructiondb',
      // @ts-ignore
      storage: getRxStorageDexie(),
      // Disable multiInstance to prevent BroadcastChannel usage
      multiInstance: false,
      // Disable eventReduce to prevent complex object broadcasting
      eventReduce: false,
    }).then(async (db: DatabaseType) => {
      await db.addCollections({
        users: { schema: userSchema },
        tasks: { schema: taskSchema },
      });
      return db;
    });
  }
  return dbPromise!;
}

export async function loginOrCreateUser(name: string): Promise<UserDoc> {
  const db = await getDB();
  
  // Try to find existing user
  const existing = await db.users.findOne({ 
    selector: { name } 
  }).exec();
  
  if (existing) {
    return existing.toJSON();
  }
  
  // Create new user
  const id = uuidv4();
  const userData: UserDoc = {
    id,
    name,
    createdAt: new Date().toISOString()
  };
  
  const newUser = await db.users.insert(userData);
  return newUser.toJSON();
}

export async function getUserTasks(userId: string) {
  const db = await getDB();
  const query = db.tasks.find({ 
    selector: { userId },
    sort: [{ createdAt: 'desc' }]
  });
  return query.$;
}

export async function addTask(
  userId: string, 
  title: string, 
  description?: string,
  position?: { x: number; y: number }
): Promise<void> {
  const db = await getDB();
  const id = uuidv4();
  const now = new Date().toISOString();
  
  const defaultChecklist: ChecklistItem[] = [
    {
      id: uuidv4(),
      text: 'Initial inspection',
      status: 'NOT_STARTED' as ChecklistItemStatus,
      createdAt: now,
      updatedAt: now
    },
    {
      id: uuidv4(),
      text: 'Material verification',
      status: 'NOT_STARTED' as ChecklistItemStatus,
      createdAt: now,
      updatedAt: now
    }
  ];
  
  const taskData: TaskDoc = {
    id,
    userId,
    title,
    description,
    position,
    checklist: defaultChecklist,
    createdAt: now,
    updatedAt: now,
    isBlocked: false
  };
  
  await db.tasks.insert(taskData);
}

export async function updateTask(
  taskId: string, 
  updates: Partial<{
    title: string;
    description: string;
    checklist: ChecklistItem[];
    position: { x: number; y: number };
    isBlocked: boolean;
  }>
): Promise<void> {
  const db = await getDB();
  const task = await db.tasks.findOne(taskId).exec();
  
  if (task) {
    // Serialize all data to ensure no circular references or non-cloneable objects
    const serializedUpdates = JSON.parse(JSON.stringify(updates));
    
    const updatedData = {
      ...serializedUpdates,
      updatedAt: new Date().toISOString()
    };
    
    // Check if any checklist item is blocked
    if (serializedUpdates.checklist) {
      updatedData.isBlocked = serializedUpdates.checklist.some((item: ChecklistItem) => item.status === 'BLOCKED');
    }
    
    await task.patch(updatedData);
  }
}

export async function deleteTask(taskId: string): Promise<void> {
  const db = await getDB();
  const task = await db.tasks.findOne(taskId).exec();
  
  if (task) {
    await task.remove();
  }
}

export async function getTaskById(taskId: string): Promise<TaskDoc | null> {
  const db = await getDB();
  const task = await db.tasks.findOne(taskId).exec();
  return task ? task.toJSON() : null;
}

export async function updateChecklistItem(
  taskId: string,
  itemId: string,
  updates: Partial<ChecklistItem>
): Promise<void> {
  const db = await getDB();
  const task = await db.tasks.findOne(taskId).exec();
  
  if (task) {
    const taskData = task.toJSON();
    const updatedChecklist = taskData.checklist.map((item: ChecklistItem) =>
      item.id === itemId
        ? { ...item, ...updates, updatedAt: new Date().toISOString() }
        : item
    );
    
    await updateTask(taskId, { checklist: updatedChecklist });
  }
}

export async function addChecklistItem(
  taskId: string,
  text: string
): Promise<void> {
  const db = await getDB();
  const task = await db.tasks.findOne(taskId).exec();
  
  if (task) {
    const taskData = task.toJSON();
    const now = new Date().toISOString();
    
    const newItem: ChecklistItem = {
      id: uuidv4(),
      text,
      status: 'NOT_STARTED' as ChecklistItemStatus,
      createdAt: now,
      updatedAt: now
    };
    
    const updatedChecklist = [...taskData.checklist, newItem];
    await updateTask(taskId, { checklist: updatedChecklist });
  }
}

export async function removeChecklistItem(
  taskId: string,
  itemId: string
): Promise<void> {
  const db = await getDB();
  const task = await db.tasks.findOne(taskId).exec();
  
  if (task) {
    const taskData = task.toJSON();
    const updatedChecklist = taskData.checklist.filter((item: ChecklistItem) => item.id !== itemId);
    await updateTask(taskId, { checklist: updatedChecklist });
  }
}
