const STATIC_CACHE      = 'static-v3';
const DYNAMIC_CACHE     = 'dynamic-v1';
const INMUTABLE_CACHE   = 'inmutable-v1';

const APP_SHELL = [
    '/',
    'index.html',
    'logo.ico',
    'logo192.png',
    'logo512.png',

    'assets/index.es.4ae766cb.js',
    'assets/index.9470fe3e.js',
    
    'assets/index.c7b82c85.css',

    'assets/empty.e6f4ae88.svg',
    'assets/html2canvas.esm.0eae2bf4.js',
    'assets/loading124.cee6c9e1.svg',
    'assets/logo_light.c8c43c01.jpg',
    'assets/purify.es.b862aa1a.js',
    
    'img/logo_light.jpg',
    'svg/empty.svg',
]

const APP_SHEL_INMUTABLE = [
    'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap',
    'https://fonts.googleapis.com/icon?family=Material+Icons',
]

self.addEventListener('install', e => {

    const cacheStatic = caches.open( STATIC_CACHE )
    .then(cache => {
        cache.addAll( APP_SHELL );
    })

    const cacheInmutable = caches.open( INMUTABLE_CACHE )
    .then( cache => {
        cache.addAll( APP_SHEL_INMUTABLE );
    })


    e.waitUntil( Promise.all([cacheStatic, cacheInmutable]) );
});

self.addEventListener('activate', e => {

    const borrado = caches.keys()
    .then(keys => {
        keys.forEach(key => {
            if( key !== STATIC_CACHE && key.includes('static') ){
                caches.delete( key )
            }

            if( key !== DYNAMIC_CACHE && key.includes('dynamic') ){
                caches.delete( key )
            }
        });
    })

    e.waitUntil( borrado );
});

self.addEventListener( 'fetch', e => {
    let respuesta;

    if(e.request.url.includes('chrome-extension')) {
        respuesta = fetch(e.request).then(res => res)
    } else {
        respuesta = caches
            .match( e.request )
            .then( res => {

                if( res ) return res;
                else return fetch( e.request )

            });
    }
    e.respondWith( respuesta );
})