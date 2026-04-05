const CACHE_VERSION = 'rw-v2';
const STATIC_CACHE = `${CACHE_VERSION}-static`;
const HTML_CACHE = `${CACHE_VERSION}-html`;

const PRECACHE_STATIC = [
  '/ray.avif',
  '/ray.webp',
  '/ray.png',
  '/logos/agt.avif',
  '/logos/dabdash.avif',
  '/logos/prepped-icon.avif',
];

const PRECACHE_HTML = ['/', '/es/', '/th/'];

self.addEventListener('install', (e) => {
  e.waitUntil(
    Promise.all([
      caches.open(STATIC_CACHE).then((c) => c.addAll(PRECACHE_STATIC)),
      caches.open(HTML_CACHE).then((c) => c.addAll(PRECACHE_HTML)),
    ])
  );
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((k) => !k.startsWith(CACHE_VERSION))
          .map((k) => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);

  // Static assets — cache first, network fallback
  if (/\.(avif|webp|png|jpe?g|svg|woff2?|css|js)$/i.test(url.pathname)) {
    e.respondWith(
      caches.open(STATIC_CACHE).then((c) =>
        c.match(e.request).then(
          (cached) => cached || fetch(e.request).then((res) => {
            c.put(e.request, res.clone());
            return res;
          })
        )
      )
    );
    return;
  }

  // HTML — network first, stale cache fallback
  e.respondWith(
    fetch(e.request)
      .then((res) => {
        const clone = res.clone();
        caches.open(HTML_CACHE).then((c) => c.put(e.request, clone));
        return res;
      })
      .catch(() => caches.match(e.request))
  );
});
