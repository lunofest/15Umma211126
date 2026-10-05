const CACHE_NAME = 'invitacion';

self.addEventListener('install', function () {
    self.skipWaiting();
});

self.addEventListener('activate', function (event) {
    event.waitUntil(
        caches.keys().then(function (nombres) {
            return Promise.all(
                nombres.map(function (nombre) {
                    if (nombre !== CACHE_NAME) {
                        return caches.delete(nombre);
                    }
                })
            );
        }).then(function () {
            return self.clients.claim();
        })
    );
});

self.addEventListener('fetch', function (event) {
    event.respondWith(
        fetch(event.request)
            .then(function (response) {
                if (response && response.ok) {
                    var copia = response.clone();
                    caches.open(CACHE_NAME).then(function (cache) {
                        cache.put(event.request, copia);
                    });
                }
                return response;
            })
            .catch(function () {
                return caches.match(event.request).then(function (respuesta) {
                    return respuesta || Response.error();
                });
            })
    );
});
