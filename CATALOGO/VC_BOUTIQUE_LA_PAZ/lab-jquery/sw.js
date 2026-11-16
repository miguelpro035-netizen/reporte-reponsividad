/* V&C Boutique · lab-jquery — Service Worker independiente (Offline-First) */
const CACHE_NAME = 'vc-lab-jquery-v1.0.0';
const JQUERY_CDN = 'https://code.jquery.com/jquery-3.7.1.min.js';
const ASSETS_TO_CACHE = ['./', './index.html', './styles.css', './script.js', './manifest.json', './assets/images/aretes-dorados.webp', './assets/images/blazer-crema.webp', './assets/images/blusa-satinada.webp', './assets/images/bolso-camel.webp', './assets/images/bolso-negro.webp', './assets/images/camisa-blanca.webp', './assets/images/cardigan-rosa.webp', './assets/images/chaqueta-cuero.webp', './assets/images/falda-satinada.webp', './assets/images/jean-claro.webp', './assets/images/jean-oscuro.webp', './assets/images/pantalon-sastre.webp', './assets/images/sueter-beige.webp', './assets/images/top-marfil.webp', './assets/images/vestido-floral.webp', './assets/images/zapatillas-blancas.webp'];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS_TO_CACHE).then(() => cache.add(JQUERY_CDN).catch(() => {}))).then(() => self.skipWaiting()));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME && k.startsWith('vc-lab')).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET' || (new URL(request.url).origin !== self.location.origin && request.url !== JQUERY_CDN)) return;
  event.respondWith(caches.match(request).then(cached => cached || fetch(request).then(response => {
    if (response && response.ok) { const copy = response.clone(); caches.open(CACHE_NAME).then(c => c.put(request, copy)); }
    return response;
  }).catch(() => request.mode === 'navigate' ? caches.match('./index.html') : new Response('Recurso no disponible sin conexión.', { status: 503 }))));
});
