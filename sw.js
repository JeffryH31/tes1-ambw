const CACHE_NAME = "pwa-cache-v1";
const OFFLINE_URL = "offline.html";
self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll([
                "/index.html",
                "/offline.html",
                "/manifest.json"
            ]);
        })
    );
});
self.addEventListener("fetch", event => {
    event.respondWith(
        fetch(event.request)
            .then(response => {
                return caches.open(CACHE_NAME).then(cache => {
                    cache.put(event.request, response.clone());
                    return response;
                });
            })
            .catch(() => caches.match(event.request).then(response => response || caches.match(OFFLINE_URL)))
    );
});