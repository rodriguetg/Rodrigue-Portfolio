/// <reference lib="webworker" />

import { clientsClaim } from 'workbox-core';
import { precacheAndRoute, createHandlerBoundToURL } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate, CacheFirst } from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';

declare const self: ServiceWorkerGlobalScope;

clientsClaim();

// Précache tous les assets générés par le build
precacheAndRoute(self.__WB_MANIFEST);

// Configuration du comportement de navigation par défaut
const fileExtensionRegexp = new RegExp('/[^/?]+\\.[^/]+$');
registerRoute(
  // Retourne false pour les URLs qui ne se terminent pas par une extension de fichier,
  // donc les URLs comme /about seront gérées par le gestionnaire de navigation
  ({ request, url }: { request: Request; url: URL }) => {
    if (request.mode !== 'navigate') {
      return false;
    }

    if (url.pathname.startsWith('/_')) {
      return false;
    }

    if (url.pathname.match(fileExtensionRegexp)) {
      return false;
    }

    return true;
  },
  createHandlerBoundToURL('/index.html')
);

// Cache les images
registerRoute(
  ({ request }) => request.destination === 'image',
  new CacheFirst({
    cacheName: 'images',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 jours
      }),
    ],
  })
);

// Cache le contenu statique (JS, CSS, fonts)
registerRoute(
  ({ request }) =>
    request.destination === 'script' ||
    request.destination === 'style' ||
    request.destination === 'font',
  new StaleWhileRevalidate({
    cacheName: 'static-resources',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxEntries: 32,
        maxAgeSeconds: 24 * 60 * 60, // 24 heures
      }),
    ],
  })
);

// Écoute les messages de mise à jour
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
