const CACHE_NAME = "polski-b1-v3";
const FILES_TO_CACHE = [
  "./index.html",
  "./app.js",
  "./data_grammar.js",
  "./data_skills_exams.js",
  "./data_pisanie.js",
  "./data_mowienie.js",
  "./gen_przypadki.js",
  "./gen_rodzaj_liczba.js",
  "./gen_przymiotnik.js",
  "./gen_czasownik.js",
  "./gen_liczebniki.js",
  "./gen_przyimki_zaimki.js",
  "./gen_zdania_zlozone.js",
  "./gen_czytanie.js",
  "./gen_sluchanie.js",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png"
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(FILES_TO_CACHE))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  e.respondWith(
    caches.match(e.request).then((cached) => {
      if (cached) return cached;
      return fetch(e.request)
        .then((response) => {
          if (response && response.status === 200) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(e.request, clone));
          }
          return response;
        })
        .catch(() => cached);
    })
  );
});
