if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register("/firebase-messaging-sw.js")
      .then((reg) => console.log("Service Worker Registered", reg))
      .catch((err) => console.log("Service Worker not Registered", err));
}

