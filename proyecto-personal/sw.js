const CACHE_NAME = "panteras-portfolio-offline-v6";
const ARCHIVOS_CACHE = ["./","./index.html","./diagnostico.html","./styles.css","./diagnostico.css","./app.js","./manifest.json","./icon.svg","./Horario_Miguel_Angel.xlsx","./panter0.jpeg","./panter1.jpeg","./panter2.jpeg","./panter3.jpeg"];
const LIBRERIAS_EXTERNAS = ["https://code.jquery.com/jquery-3.7.1.min.js"];

self.addEventListener("install", event => {
 event.waitUntil((async()=>{
  const cache=await caches.open(CACHE_NAME);
  await Promise.allSettled(ARCHIVOS_CACHE.map(url=>cache.add(url)));
  await Promise.allSettled(LIBRERIAS_EXTERNAS.map(url=>cache.add(url)));
  await self.skipWaiting();
 })());
});
self.addEventListener("activate", event => {
 event.waitUntil((async()=>{
  const keys=await caches.keys();
  await Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k)));
  await self.clients.claim();
 })());
});
// HTML: red primero, caché como respaldo. Recursos estáticos: caché primero.
self.addEventListener("fetch", event => {
 const req=event.request;
 if(req.method!=="GET"||req.headers.has("range")) return;
 const url=new URL(req.url);
 if(/\.(mp3|ogg|wav|m4a|aac|opus|mp4)$/i.test(url.pathname)) return;
 if(url.origin!==self.location.origin){
  if(!LIBRERIAS_EXTERNAS.includes(req.url)) return;
  event.respondWith(caches.match(req).then(c=>c||fetch(req).then(r=>{
   if(r&&r.ok) caches.open(CACHE_NAME).then(cache=>cache.put(req,r.clone())); return r;
  })));
  return;
 }
 if(req.mode==="navigate"){
  event.respondWith(fetch(req).then(r=>{
   if(r&&r.ok) caches.open(CACHE_NAME).then(c=>c.put(req,r.clone())); return r;
  }).catch(()=>caches.match(req).then(c=>c||caches.match("./index.html"))));
 } else {
  event.respondWith(caches.match(req).then(cached=>{
   const red=fetch(req).then(r=>{
    if(r&&r.ok) caches.open(CACHE_NAME).then(c=>c.put(req,r.clone())); return r;
   }).catch(()=>cached);
   return cached||red;
  }));
 }
});
// Background Sync notifica a las páginas abiertas para procesar la cola persistida localmente.
self.addEventListener("sync", event => {
 if(event.tag==="sincronizar-contactos") event.waitUntil(
  self.clients.matchAll({type:"window",includeUncontrolled:true}).then(clients=>{
   clients.forEach(c=>c.postMessage({tipo:"SOLICITAR_SINCRONIZACION"}));
  })
 );
});
