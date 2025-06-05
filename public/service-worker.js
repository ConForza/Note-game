self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("my-pwa-cache").then((cache) => {
      return cache.addAll([
        "/",
        "/index.html",
        "/manifest.json",
        "/bass-a1.png",
        "/bass-a2.png",
        "/bass-b1.png",
        "/bass-b2.png",
        "/bass-c1.png",
        "/bass-c2.png",
        "/bass-c3.png",
        "/bass-d1.png",
        "/bass-d2.png",
        "/bass-e1.png",
        "/bass-e2.png",
        "/bass-f1.png",
        "/bass-f2.png",
        "/bass-g1.png",
        "/bass-g2.png",
        "/note-game.png",
        "/treble-A1.png",
        "/treble-A2.png",
        "/treble-B1.png",
        "/treble-B2.png",
        "/treble-C1.png",
        "/treble-C2.png",
        "/treble-C3.png",
        "/treble-D1.png",
        "/treble-D2.png",
        "/treble-E1.png",
        "/treble-E2.png",
        "/treble-F1.png",
        "/treble-F2.png",
        "/treble-G1.png",
        "/treble-G2.png",
      ]);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
