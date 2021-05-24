importScripts("https://www.gstatic.com/firebasejs/7.16.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/7.16.1/firebase-messaging.js");
importScripts("https://www.gstatic.com/firebasejs/7.16.1/firebase-analytics.js");

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.
firebase.initializeApp({
  messagingSenderId: "995204187228",
  apiKey: "AIzaSyAzoFxe2VaK7wZWXr0cR3ydGJriYUMnaZI",
  projectId: "andreesen-c1560",
  appId: "1:995204187228:web:9f7816228590e7b4ae1299",
});

const staticCacheName = "site-static-v3";
const dynamicCacheName = "site-dynamic-v16";
const assets = [
  "/",
  "/index.html",
  "/js/app.js",
  "/js/ui.js",
  "/js/materialize.min.js",
  "/css/styles.css",
  "/css/materialize.min.css",
  "/img/dish.png",
  "/img/gorjeo.png",
  "/pages/fallback.html",
  "https://fonts.googleapis.com/icon?family=Material+Icons",
  "https://fonts.gstatic.com/s/materialicons/v47/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2",
];

// cache size limit function

const limitCacheSize = (name, size) => {
  caches.open(name).then((cache) => {
    cache.keys().then((keys) => {
      if (keys.length > size) {
        cache.delete(keys[0]).then(limitCacheSize(name, size));
      }
    });
  });
};
// install event
self.addEventListener("install", (evt) => {
  //console.log('service worker installed');
  evt.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      console.log("caching shell assets");
      cache.addAll(assets);
    })
  );
});

// activate event
self.addEventListener("activate", (evt) => {
  //console.log('service worker activated');
  evt.waitUntil(
    caches.keys().then((keys) => {
      //console.log(keys);
      return Promise.all(
        keys
          .filter((key) => key !== staticCacheName && key !== dynamicCacheName)
          .map((key) => caches.delete(key))
      );
    })
  );
});

// fetch event
self.addEventListener("fetch", (evt) => {
  if (evt.request.url.indexOf("firestore.googleapis.com") === -1) {
    evt.respondWith(
      caches
        .match(evt.request)
        .then((cacheRes) => {
          return (
            cacheRes ||
            fetch(evt.request).then((fetchRes) => {
              return caches.open(dynamicCacheName).then((cache) => {
                cache.put(evt.request.url, fetchRes.clone());
                limitCacheSize(dynamicCacheName, 15);
                return fetchRes;
              });
            })
          );
        })
        .catch(() => {
          if (evt.request.url.indexOf(".html") > -1) {
            return caches.match("/pages/fallback.html");
          }
        })
    );
  }
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function (payload) {
  console.log(
    "[sw.js] Received background message ",
    payload
  );
  // Customize notification here
  const notificationTitle = "Background Message Title";
  const notificationOptions = {
    body: "Background Message body.",
  };

  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});