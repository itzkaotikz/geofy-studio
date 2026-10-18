// Geofy Studio service worker: app works offline, and always picks up the newest version when online.
const VERSION = 'geofy-1.0.0';
const SHELL = ['./', 'index.html', 'js/app.js', 'manifest.webmanifest'];
const STATIC = ['vendor/d3.min.js', 'vendor/mp4-muxer.min.js', 'data/world.json',
  'fonts/BricolageGrotesque.ttf', 'fonts/HankenGrotesk.ttf', 'fonts/JetBrainsMono.ttf',
  'icons/icon-192.png', 'icons/icon-512.png', 'icons/apple-touch-icon.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll([...SHELL, ...STATIC])));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener('message', e => { if (e.data === 'skip') self.skipWaiting(); });
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  const path = new URL(req.url).pathname;
  const isShell = req.mode === 'navigate' || path.endsWith('/app.js') || path.endsWith('.html') || path.endsWith('.webmanifest');
  if (isShell) {
    // network first: online you always get the latest studio, offline the cached one
    e.respondWith(fetch(req).then(res => { const copy = res.clone(); caches.open(VERSION).then(c => c.put(req, copy)); return res; })
      .catch(() => caches.match(req).then(r => r || caches.match('index.html'))));
  } else {
    e.respondWith(caches.match(req).then(r => r || fetch(req).then(res => { const copy = res.clone(); caches.open(VERSION).then(c => c.put(req, copy)); return res; })));
  }
});
