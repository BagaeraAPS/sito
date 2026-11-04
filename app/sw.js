/* BagaeraPP: si apre anche senza rete (ultima versione vista) */
const CACHE = "bagaerapp-v1";
self.addEventListener("install", (e) => { e.waitUntil(caches.open(CACHE).then((c) => c.addAll(["./", "./manifest.webmanifest"])).catch(() => {})); self.skipWaiting(); });
self.addEventListener("activate", (e) => { e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim())); });
const salva = (req, res) => { if (res && res.ok) { const c = res.clone(); caches.open(CACHE).then((x) => x.put(req, c)); } return res; };
self.addEventListener("fetch", (e) => {
  const r = e.request; if (r.method !== "GET") return;
  const u = new URL(r.url);
  if (u.origin === location.origin && u.pathname.startsWith("/app/")) e.respondWith(fetch(r).then((res) => salva(r, res)).catch(() => caches.match(r).then((x) => x || caches.match("./"))));
  else if (/gstatic\.com\/firebasejs\/|cdnjs\.cloudflare\.com\/ajax\/libs\/|fonts\.(googleapis|gstatic)\.com/.test(u.href)) e.respondWith(caches.match(r).then((x) => x || fetch(r).then((res) => salva(r, res))));
});
