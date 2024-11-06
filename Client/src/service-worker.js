/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */

import { clientsClaim } from 'workbox-core'
import { ExpirationPlugin } from 'workbox-expiration'
import { precacheAndRoute, createHandlerBoundToURL } from 'workbox-precaching'
import { registerRoute } from 'workbox-routing'
import { StaleWhileRevalidate } from 'workbox-strategies'

clientsClaim()

// Precache all of the assets generated by your build process.
precacheAndRoute(self.__WB_MANIFEST)

// Set up App Shell-style routing
const fileExtensionRegexp = new RegExp('/[^/?]+\\.[^/]+$')
registerRoute(
  ({ request, url }) => {
    if (request.mode !== 'navigate') {
      return false
    }
    if (url.pathname.startsWith('/_')) {
      return false
    }
    if (url.pathname.match(fileExtensionRegexp)) {
      return false
    }
    return true
  },
  createHandlerBoundToURL(process.env.PUBLIC_URL + '/index.html')
)

// Example runtime caching route
registerRoute(
  ({ url }) =>
    url.origin === self.location.origin && url.pathname.endsWith('.png'),
  new StaleWhileRevalidate({
    cacheName: 'images',
    plugins: [new ExpirationPlugin({ maxEntries: 50 })]
  })
)

// Skip waiting and take control of clients immediately
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting()
  }
})

self.addEventListener('install', (event) => {
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  const cacheWhitelist = ['app-v2', 'images'] // Add the names of caches to keep

  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (!cacheWhitelist.includes(cacheName)) {
              return caches.delete(cacheName) // Delete caches not in the whitelist
            }
          })
        )
      })
      .then(() => {
        return self.clients.claim()
      })
  )
})

// Reload the page when the service worker takes control
self.addEventListener('controllerchange', () => {
  window.location.reload()
})

// Custom service worker logic can go here
