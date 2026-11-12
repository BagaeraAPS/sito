/* BagaeraPP: si apre anche senza rete (ultima versione vista) */
const CACHE = "bagaerapp-v2";
self.addEventListener("install", (e) => { e.waitUntil(caches.open(CACHE).then((c) => c.addAll(["./", "./manifest.webmanifest"])).catch(() => {})); self.skipWaiting(); });
self.addEventListener("activate", (e) => { e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim())); });
const firma = (res) => res.headers.get("etag") || res.headers.get("last-modified") || res.headers.get("content-length") || "";
const diversa = (a, b) => { const x = firma(a), y = firma(b); return !!x && !!y && x !== y; };
const salva = (req, res) => { if (res && res.ok) { const c = res.clone(); caches.open(CACHE).then((x) => x.put(req, c)); } return res; };
self.addEventListener("fetch", (e) => {
  const r = e.request; if (r.method !== "GET") return;
  const u = new URL(r.url);
  if (u.origin === location.origin && u.pathname.startsWith("/app/")) {
    /* l'app si apre subito dall'ultima copia salvata; intanto controllo se in rete ce n'è una nuova e, se sì, avviso */
    const copia = caches.match(r).then((x) => x || (r.mode === "navigate" ? caches.match("./") : undefined));
    const rete = fetch(r).then(async (res) => {
      if (res && res.ok) {
        const vecchia = await copia, c = await caches.open(CACHE); await c.put(r, res.clone());
        /* aspetto un attimo: la pagina che si sta aprendo deve essere pronta ad ascoltare */
        if (vecchia && r.mode === "navigate" && diversa(vecchia, res)) { await new Promise((ok) => setTimeout(ok, 2500)); (await self.clients.matchAll({ type: "window", includeUncontrolled: true })).forEach((w) => w.postMessage({ tipo: "versione-nuova" })); }
      }
      return res;
    });
    e.respondWith(copia.then((x) => x || rete).catch(() => rete));
    e.waitUntil(rete.catch(() => {}));
  }
  else if (/gstatic\.com\/firebasejs\/|cdnjs\.cloudflare\.com\/ajax\/libs\/|fonts\.(googleapis|gstatic)\.com/.test(u.href)) e.respondWith(caches.match(r).then((x) => x || fetch(r).then((res) => salva(r, res))));
});

/* notifiche: le manda lo script del consiglio con Firebase Cloud Messaging */
self.addEventListener("push", (e) => {
  let j = {};
  try { j = e.data ? e.data.json() : {}; } catch (er) { j = { data: { testo: e.data ? e.data.text() : "" } }; }
  const d = j.data || (j.notification ? { titolo: j.notification.title, testo: j.notification.body } : j) || {};
  e.waitUntil(self.registration.showNotification(d.titolo || "BagaeraPP", {
    body: d.testo || "", icon: "/apple-touch-icon.png", badge: "/apple-touch-icon.png", lang: "it",
    tag: d.tag || undefined, data: { link: d.link || "" },
  }));
});
self.addEventListener("notificationclick", (e) => {
  e.notification.close();
  const url = new URL("./" + ((e.notification.data && e.notification.data.link) || ""), self.registration.scope).href;
  e.waitUntil(self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((ws) => {
    for (const w of ws) if (w.url.startsWith(self.registration.scope)) return (w.navigate ? w.navigate(url).catch(() => w) : Promise.resolve(w)).then((x) => (x || w).focus());
    return self.clients.openWindow(url);
  }));
});
