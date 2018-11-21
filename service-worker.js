var cacheName = "osos-v2";
var filesToCache = [
    "/",
    "/index.html",
    "/info.html",
    "/gallery.html",
    "/scripts/app.js",
    "/styles/main.css",
    "/images/bear1.jpg",
    "/images/bear2.jpg",
    "/images/bear3.jpg",
    "/images/bear4.jpg",
    "/images/bear5.jpeg",
    "/images/bear6.jpg",
    "/images/bear7.jpg",
    "/images/bear8.jpg",
    "/images/bear9.jpg"
];

self.addEventListener( 'install', function( e ) {
    console.log( '[ServiceWorker] Install' );
    e.waitUntil(
        caches.open( cacheName ).then( function( cache ) {
            console.log( '[ServiceWorker] Caching app shell' );
            return cache.addAll( filesToCache );
        } )
    );
} );

self.addEventListener( 'activate', function( e ) {
    console.log( '[ServiceWorker] Activate' );
    e.waitUntil(
        caches.keys( ).then( function( keyList ) {
            return Promise.all( keyList.map( function( key ) {
                if ( key != cacheName ) {
                    console.log('[ServiceWorker] Removing old cache', key);
                    return caches.delete( key );
                }
            }));
        })
    );
    return self.clients.claim();
});

self.addEventListener( 'fetch', function( e ) {
    console.log( '[ServiceWorker] Fetch', e.request.url );
    e.respondWith(
        caches.match( e.request ).then( function( response ) {
            return response || fetch( e.request );
        } )
    );
} );