var dataCacheName = 'llamas-v2';
var filesToCache = [
    '/',
    '/index.html',
    '/aboutUs.html',
    '/js/app.js',
    '/styles/main.css',
    '/img/llama1.png',
    '/img/llama2.jpg',
    '/img/llama3.jpg',
    '/img/llama4.jpg',
    '/img/llama5.jpg',
    '/img/llama6.jpg',
    '/img/llama7.png'
];

self.addEventListener( 'install', function( e ) {
    console.log( '[ServiceWorker] Install' );
    e.waitUntil(
        caches.open( dataCacheName ).then( function( cache ) {
            console.log( '[ServiceWorker] Caching app shell' );
            return cache.addAll( filesToCache );
        } )
    );
});

self.addEventListener( 'activate', function( e ) {
    console.log( '[ServiceWorker] Activate' );
    e.waitUntil(
      caches.keys( ).then( function( keyList ) {
        return Promise.all( keyList.map( function( key ) {
          if ( key !== dataCacheName ) {
            console.log('[ServiceWorker] Removing old cache', key );
            return caches.delete( key );
          }
        }));
      })
    );
    return self.clients.claim();
});


self.addEventListener('fetch', function(e) {
    console.log('[ServiceWorker] Fetch', e.request.url);
    e.respondWith(
      caches.match(e.request).then(function(response) {
        return response || fetch(e.request);
      })
    );
}); 