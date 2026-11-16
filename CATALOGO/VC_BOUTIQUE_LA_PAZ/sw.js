/* V&C Boutique — PWA Offline-First */
const CACHE_NAME = 'vc-boutique-v1.2.0';
const JQUERY_CDN = 'https://code.jquery.com/jquery-3.7.1.min.js';
const CORE_ASSETS = [
  './', './index.html', './styles.css', './script.js', './manifest.json',
  './data/products.json', './icons/icon-192.png', './icons/icon-512.png',
  './assets/images/blazer-crema.webp','./assets/images/pantalon-sastre.webp','./assets/images/blusa-satinada.webp','./assets/images/jean-oscuro.webp',
  './assets/images/sueter-beige.webp','./assets/images/vestido-floral.webp','./assets/images/camisa-blanca.webp','./assets/images/cardigan-rosa.webp',
  './assets/images/chaqueta-cuero.webp','./assets/images/jean-claro.webp','./assets/images/falda-satinada.webp','./assets/images/top-marfil.webp',
  './assets/images/bolso-camel.webp','./assets/images/bolso-negro.webp','./assets/images/aretes-dorados.webp','./assets/images/zapatillas-blancas.webp'
];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(CORE_ASSETS).then(() => cache.add(JQUERY_CDN).catch(() => {}))).then(() => self.skipWaiting()));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET' || (new URL(request.url).origin !== self.location.origin && request.url !== JQUERY_CDN)) return;
  event.respondWith(caches.match(request).then(cached => {
    if (cached) return cached;
    return fetch(request).then(response => {
      if (response && response.ok) { const copy = response.clone(); caches.open(CACHE_NAME).then(cache => cache.put(request, copy)); }
      return response;
    }).catch(() => {
      if (request.mode === 'navigate') return caches.match('./index.html');
      return new Response('Recurso no disponible sin conexión.', { status: 503, headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
    });
  }));
});
self.addEventListener('sync', event => {
  if (event.tag === 'vc-pending-orders') event.waitUntil(notifyClients('SYNC_AVAILABLE'));
});
async function notifyClients(message) {
  const clientsList = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
  clientsList.forEach(client => client.postMessage({ type: message, note: 'Los registros permanecen guardados localmente hasta conectar un backend.' }));
}
self.addEventListener('message', event => {
  if (event.data?.type === 'SKIP_WAITING') self.skipWaiting();
});
