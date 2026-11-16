/* DeporZone PWA - Service Worker */
const CACHE = "deporzone-v3";
const ASSETS = [
    "./",
    "index.html",
    "styles.css",
    "script.js",
    "manifest.json",
    "data/canchas.json",
    "images/futsal.svg",
    "images/wally.svg",
    "images/voley.svg",
    "images/basquet.svg",
    "images/tenis.svg",
    "icons/icon-192.png",
    "icons/icon-512.png"
];

self.addEventListener("install", function (event) {
    event.waitUntil(
        caches.open(CACHE).then(function (cache) {
            return cache.addAll(ASSETS);
        }).then(function () { return self.skipWaiting(); })
    );
});

self.addEventListener("activate", function (event) {
    event.waitUntil(
        caches.keys().then(function (keys) {
            return Promise.all(keys.filter(function (k) { return k !== CACHE; })
                .map(function (k) { return caches.delete(k); }));
        }).then(function () { return self.clients.claim(); })
    );
});

self.addEventListener("fetch", function (event) {
    if (event.request.method !== "GET") return;
    const url = new URL(event.request.url);

    // JSON del catálogo: red primero (datos frescos), caché si no hay conexión
    if (url.origin === location.origin && url.pathname.endsWith("canchas.json")) {
        event.respondWith(
            fetch(event.request).then(function (res) {
                const copy = res.clone();
                caches.open(CACHE).then(function (c) { c.put(event.request, copy); });
                return res;
            }).catch(function () { return caches.match(event.request); })
        );
        return;
    }

    // Resto: caché primero, luego red
    event.respondWith(
        caches.match(event.request).then(function (cached) {
            return cached || fetch(event.request).then(function (res) {
                if (res.ok && url.origin === location.origin) {
                    const copy = res.clone();
                    caches.open(CACHE).then(function (c) { c.put(event.request, copy); });
                }
                return res;
            });
        })
    );
});
