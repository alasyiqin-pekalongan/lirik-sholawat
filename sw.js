const cacheName = "aamedia-v2";
const preCache = ["./", "./style.css", "./script.js", "./ScheherazadeNew-Medium.ttf"];

self.addEventListener("install", (e) => {
  e.waitUntil(
    (async () => {
      const cache = await caches.open(cacheName);
      await cache.addAll(preCache);
      console.log("Pre-cache completed");
    })()
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    (async () => {
      const clients = await self.clients.matchAll();
      const isInstalled = clients.some(client => client.url.includes('display-mode=standalone'));

      if (!isInstalled) {
        console.log('Not installed - fetching online-only.');
        return fetch(e.request);
      }

      const cache = await caches.open(cacheName);
      const resCache = await cache.match(e.request);
      
      if (resCache) {
        return resCache;
      }

      try {
        const res = await fetch(e.request);

        // Jika ada update pada index.html, kirim notifikasi
        if (e.request.url.endsWith('index.html')) {
          const oldContent = resCache ? await resCache.text() : '';
          const newContent = await res.clone().text();

          if (oldContent !== newContent) {
            self.registration.showNotification('Ada Lirik Baru Ditambahkan!', {
              body: 'Kami Telah Menambahkan List Sholawat Baru, Silahkan Bisa Update!',
              icon: './aamedia.png',
              tag: 'update-notification'
            });
          }
        }

        cache.put(e.request, res.clone());
        return res;
      } catch (error) {
        console.log('Fetch error:', error);
      }
    })()
  );
});

// Handle notification click event
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((windowClients) => {
      for (const client of windowClients) {
        if (client.url.includes('index.html') && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow('/index.html');
      }
    })
  );
});
