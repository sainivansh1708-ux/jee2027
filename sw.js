const CACHE = 'jee2027-v2';
const ASSETS = [
  '/jee2027/',
  '/jee2027/index.html',
  '/jee2027/manifest.json',
  '/jee2027/icon-192.png',
  '/jee2027/icon-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
  ));
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request).catch(() => caches.match('/jee2027/index.html')))
  );
});
