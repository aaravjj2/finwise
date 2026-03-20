import { openDB, type DBSchema, type IDBPDatabase } from 'idb';
import type { FinancialEntry, SavingsGoal, SyncQueueItem, SyncItemType, SyncAction } from '@/types';

interface FinWiseDB extends DBSchema {
  sync_queue: {
    key: string;
    value: SyncQueueItem;
    indexes: { 'by-timestamp': number };
  };
  cached_entries: {
    key: string;
    value: FinancialEntry;
    indexes: { 'by-date': string };
  };
  cached_goals: {
    key: string;
    value: SavingsGoal;
  };
  conversations: {
    key: string;
    value: {
      id: string;
      title: string;
      messages: { role: string; content: string; timestamp: number }[];
      updatedAt: number;
    };
  };
}

const DB_NAME = 'finwise-offline';
const DB_VERSION = 1;

let dbPromise: Promise<IDBPDatabase<FinWiseDB>> | null = null;

export async function getDB(): Promise<IDBPDatabase<FinWiseDB>> {
  if (!dbPromise) {
    dbPromise = openDB<FinWiseDB>(DB_NAME, DB_VERSION, {
      upgrade(db) {
        // Sync queue store
        const syncQueue = db.createObjectStore('sync_queue', { keyPath: 'id' });
        syncQueue.createIndex('by-timestamp', 'timestamp');

        // Cached financial entries
        const entries = db.createObjectStore('cached_entries', { keyPath: 'id' });
        entries.createIndex('by-date', 'date');

        // Cached savings goals
        db.createObjectStore('cached_goals', { keyPath: 'id' });

        // Cached conversations
        db.createObjectStore('conversations', { keyPath: 'id' });
      },
    });
  }
  return dbPromise;
}

// Sync Queue Operations
export async function addToSyncQueue(
  type: SyncItemType,
  action: SyncAction,
  payload: unknown
): Promise<string> {
  const db = await getDB();
  const id = crypto.randomUUID();
  const item: SyncQueueItem = {
    id,
    type,
    action,
    payload,
    timestamp: Date.now(),
    retries: 0,
  };
  await db.add('sync_queue', item);
  return id;
}

export async function queueMutation(type: SyncItemType, payload: unknown): Promise<string> {
  return addToSyncQueue(type, 'create', payload);
}

export async function getSyncQueue(): Promise<SyncQueueItem[]> {
  const db = await getDB();
  return db.getAllFromIndex('sync_queue', 'by-timestamp');
}

export async function removeSyncItem(id: string): Promise<void> {
  const db = await getDB();
  await db.delete('sync_queue', id);
}

export async function updateSyncItem(item: SyncQueueItem): Promise<void> {
  const db = await getDB();
  await db.put('sync_queue', item);
}

// Process sync queue when online
export async function processSyncQueue(): Promise<void> {
  if (!navigator.onLine) return;

  const items = await getSyncQueue();

  for (const item of items) {
    try {
      await syncItem(item);
      await removeSyncItem(item.id);
    } catch (error) {
      console.error('Sync failed for item:', item.id, error);
      // Increment retry count
      if (item.retries < 3) {
        await updateSyncItem({ ...item, retries: item.retries + 1 });
      } else {
        // Remove after max retries
        await removeSyncItem(item.id);
      }
    }
  }
}

async function syncItem(item: SyncQueueItem): Promise<void> {
  const endpoints: Record<SyncItemType, string> = {
    financial_entry: '/api/entries',
    savings_goal: '/api/goals',
    progress: '/api/progress',
    message: '/api/messages',
  };

  const endpoint = endpoints[item.type];
  if (!endpoint) return;

  const method = item.action === 'delete' ? 'DELETE' : item.action === 'update' ? 'PUT' : 'POST';

  const response = await fetch(endpoint, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item.payload),
  });

  if (!response.ok) {
    throw new Error(`Sync failed: ${response.status}`);
  }
}

// Cached Entries Operations
export async function cacheEntry(entry: FinancialEntry): Promise<void> {
  const db = await getDB();
  await db.put('cached_entries', entry);
}

export async function getCachedEntries(): Promise<FinancialEntry[]> {
  const db = await getDB();
  return db.getAll('cached_entries');
}

export async function getCachedEntriesByDateRange(
  startDate: string,
  endDate: string
): Promise<FinancialEntry[]> {
  const db = await getDB();
  const range = IDBKeyRange.bound(startDate, endDate);
  return db.getAllFromIndex('cached_entries', 'by-date', range);
}

// Cached Goals Operations
export async function cacheGoal(goal: SavingsGoal): Promise<void> {
  const db = await getDB();
  await db.put('cached_goals', goal);
}

export async function getCachedGoals(): Promise<SavingsGoal[]> {
  const db = await getDB();
  return db.getAll('cached_goals');
}

// Conversation Cache
export async function cacheConversation(
  id: string,
  title: string,
  messages: { role: string; content: string; timestamp: number }[]
): Promise<void> {
  const db = await getDB();
  await db.put('conversations', {
    id,
    title,
    messages,
    updatedAt: Date.now(),
  });
}

export async function getCachedConversation(
  id: string
): Promise<{ id: string; title: string; messages: { role: string; content: string; timestamp: number }[] } | undefined> {
  const db = await getDB();
  return db.get('conversations', id);
}

// Listen for online event
if (typeof window !== 'undefined') {
  window.addEventListener('online', () => {
    processSyncQueue();
  });

  // Listen for sync messages from service worker
  navigator.serviceWorker?.addEventListener('message', (event) => {
    if (event.data?.type === 'SYNC_ENTRIES') {
      processSyncQueue();
    }
  });
}
