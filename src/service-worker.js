import { build, files, version } from '$service-worker';

const CACHE_NAME = 'sprout-cache-'+ version;
const ASSETS = [
  ...build,
  ...files,
];

self.addEventListener('install', (event) => {
  async function addFilesToCache() {
    const cache = await caches.open(CACHE_NAME);
    await cache.addAll(ASSETS);
  }
 
  event.waitUntil(addFilesToCache());
});

self.addEventListener('activate', (event) => {
  async function deleteOldCaches() {
    for (const key of await caches.keys()) {
      if (key !== CACHE_NAME) await caches.delete(key);
    }
  }
 
  event.waitUntil(deleteOldCaches());
});

self.addEventListener('fetch', (event) => {
  // ignore POST requests etc
  if (event.request.method !== 'GET') return;
 
  async function respond() {
    const url = new URL(event.request.url);
    const cache = await caches.open(CACHE_NAME);
 
    if (ASSETS.includes(url.pathname)) {
      return cache.match(url.pathname);
    }
 
    try {
      const response = await fetch(event.request);
 
      if (response.status === 200) {
        cache.put(event.request, response.clone());
      }
 
      return response;
    } catch {
      return cache.match(event.request);
    }
  }
 
  event.respondWith(respond());
});
