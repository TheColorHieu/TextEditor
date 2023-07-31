const { offlineFallback, warmStrategyCache } = require('workbox-recipes');
const { CacheFirst } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');

precacheAndRoute(self.__WB_MANIFEST);

const pageCache = new CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

warmStrategyCache({
  urls: ['/index.html', '/'],
  strategy: pageCache,
});

registerRoute(({ request }) => request.mode === 'navigate', pageCache);

// TODO: Implement asset caching
//this is the code for caching the assets
//this allows us to define custom caching strategies for different types of assets
registerRoute(
  //here we are determining the type of assets to cache
  ({ request }) => request.destination === 'script' || request.destination === 'style',
  //here we are defining the caching strategy
  new CacheFirst({
    //here we are defining the name of the cache
    cacheName: 'asset-cache',
    //here we are defining the plugins
    plugins: [
      //here we are defining the cacheable response plugin
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      //here we are defining the expiration plugin
      new ExpirationPlugin({
        //here we are defining the maximum age of the cache
        maxAgeSeconds: 30 * 24 * 60 * 60,
      }),
    ],
  })
);



registerRoute();
