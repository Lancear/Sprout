import { openDB } from 'idb';

const STORE_NAME = 'ideas';
const GROWTH_INDEX_NAME = 'byGrowth';

const db = openDB('sprout', 1, { 
  upgrade(db) {
    if (!db.objectStoreNames.contains(STORE_NAME)) {
      const store = db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
      store.createIndex(GROWTH_INDEX_NAME, ['growth']);
    }
  },
});

/**
 * @param {import("./domain").Idea} idea 
 */
export async function saveIdea(idea) {
  return (await db).put(STORE_NAME, idea);
}

/**
 * @param {number} id
 * @returns {Promise<import("./domain").Idea>} 
 */
export async function getIdea(id) {
  return (await db).get(STORE_NAME, id);
}

/**
 * @returns {Promise<import("./domain").Idea[]>} 
 */
export async function getAllIdeas() {
  return (await db).getAllFromIndex(STORE_NAME, GROWTH_INDEX_NAME, IDBKeyRange.lowerBound(0));
}
