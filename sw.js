const CACHE = 'shell-v1';
const SHELL = ['/', '/manifest.webmanifest', '/icons/icon-192.png', '/icons/icon-512.png', '/icons/icon-180.png'];
self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)));
});
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.map(k => k !== CACHE && caches.delete(k)))));
});
self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);
  if (url.origin === self.location.origin) {
    e.respondWith(caches.match(e.request).then(res => res || fetch(e.request)));
  }
});
