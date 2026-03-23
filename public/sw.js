// FinWise Service Worker
const CACHE_NAME = 'finwise-v2';
const OFFLINE_URL = '/en/offline';

const STATIC_ASSETS = [
  '/',
  '/en/offline',
  '/manifest.json',
  '/icon.svg',
  '/favicon.ico',
];

const CACHE_STRATEGIES = {
  // Cache first, then network
  cacheFirst: async (request, cacheName = CACHE_NAME) => {
    const cache = await caches.open(cacheName);
    const cachedResponse = await cache.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    try {
      const networkResponse = await fetch(request);
      if (networkResponse.ok) {
        cache.put(request, networkResponse.clone());
      }
      return networkResponse;
    } catch {
      return new Response('Offline', { status: 503 });
    }
  },

  // Network first, fallback to cache
  networkFirst: async (request, cacheName = CACHE_NAME) => {
    try {
      const networkResponse = await fetch(request);
      if (networkResponse.ok) {
        const cache = await caches.open(cacheName);
        cache.put(request, networkResponse.clone());
      }
      return networkResponse;
    } catch {
      const cache = await caches.open(cacheName);
      const cachedResponse = await cache.match(request);
      if (cachedResponse) {
        return cachedResponse;
      }
      // Return offline page for navigation requests
      if (request.mode === 'navigate') {
        const offlineResponse = await caches.match(OFFLINE_URL);
        if (offlineResponse) {
          return offlineResponse;
        }
      }
      return new Response('Offline', { status: 503, headers: { 'Content-Type': 'text/plain' } });
    }
  },

  // Stale while revalidate
  staleWhileRevalidate: async (request, cacheName = CACHE_NAME) => {
    const cache = await caches.open(cacheName);
    const cachedResponse = await cache.match(request);

    const fetchPromise = fetch(request).then((networkResponse) => {
      if (networkResponse.ok) {
        cache.put(request, networkResponse.clone());
      }
      return networkResponse;
    }).catch(() => {
      // Return cached response or a 503 response if network fails
      return cachedResponse || new Response('Offline', { status: 503 });
    });

    return cachedResponse || fetchPromise;
  },
};

// Install event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

// Activate event
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});

// Fetch event
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip cross-origin requests
  if (url.origin !== location.origin) {
    return;
  }

  // Skip API calls (handle offline queue separately)
  if (url.pathname.startsWith('/api/')) {
    if (request.method !== 'GET') {
      event.respondWith(
        fetch(request).catch(
          () => new Response('Offline', { status: 503, headers: { 'Content-Type': 'text/plain' } })
        )
      );
      return;
    }
    event.respondWith(CACHE_STRATEGIES.networkFirst(request));
    return;
  }

  // Static assets - cache first
  if (
    url.pathname.startsWith('/_next/static/') ||
    url.pathname.startsWith('/icons/') ||
    url.pathname.match(/\.(png|jpg|jpeg|webp|svg|ico|woff2?)$/)
  ) {
    event.respondWith(CACHE_STRATEGIES.cacheFirst(request));
    return;
  }

  // HTML pages - network first
  if (request.mode === 'navigate') {
    event.respondWith(CACHE_STRATEGIES.networkFirst(request));
    return;
  }

  // Default - stale while revalidate
  event.respondWith(CACHE_STRATEGIES.staleWhileRevalidate(request));
});

// Background sync for offline mutations
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-entries') {
    event.waitUntil(syncOfflineEntries());
  }
});

async function syncOfflineEntries() {
  // This will be called when the device comes back online
  // The actual sync logic is in the main app
  const clients = await self.clients.matchAll();
  clients.forEach((client) => {
    client.postMessage({ type: 'SYNC_ENTRIES' });
  });
}

// Push notifications (for future use)
self.addEventListener('push', (event) => {
  if (!event.data) return;

  const data = event.data.json();
  const options = {
    body: data.body,
    icon: '/icons/icon-192x192.png',
    badge: '/icons/badge-72x72.png',
    vibrate: [100, 50, 100],
    data: {
      url: data.url || '/',
    },
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  event.waitUntil(
    clients.openWindow(event.notification.data.url)
  );
});
